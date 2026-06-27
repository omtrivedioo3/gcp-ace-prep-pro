/* ==========================================================================
   GCP ACE Prep Pro - Application Logic & State Management (300Q Edition)
   ========================================================================== */

// Ensure global bank exists
window.QUESTION_BANK = window.QUESTION_BANK || [];

// App State
const state = {
    currentMode: 'study', // 'study' | 'exam'
    currentPage: 1,
    itemsPerPage: 15,
    filteredQuestions: [],
    
    // Filters
    searchQuery: '',
    topicFilter: 'all',
    difficultyFilter: 'all',
    statusFilter: 'all',
    
    // User Progress (persisted via localStorage)
    solved: JSON.parse(localStorage.getItem('gcp_ace_solved') || '{}'), // { id: 'correct' | 'incorrect' }
    userAnswers: JSON.parse(localStorage.getItem('gcp_ace_user_answers') || '{}'), // { id: optionIndex }
    bookmarks: new Set(JSON.parse(localStorage.getItem('gcp_ace_bookmarks') || '[]')),
    examHistory: JSON.parse(localStorage.getItem('gcp_ace_exam_history') || '[]'), // [ { date, score, total, passed } ]
    
    // Exam State
    exam: {
        active: false,
        questions: [],
        answers: {}, // { qId: selectedOptionIdx }
        flags: new Set(),
        currentIdx: 0,
        timerInterval: null,
        timeRemaining: 7200 // 120 mins in seconds
    }
};

// Initialize DOM elements when loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Check if question bank loaded properly
    if (!window.QUESTION_BANK || window.QUESTION_BANK.length === 0) {
        document.getElementById('questions-container').innerHTML = `
            <div class="loading-spinner">
                ⚠️ Question bank loading... If this persists, verify data scripts are included.
            </div>`;
        return;
    }

    // Sort question bank by id just in case
    window.QUESTION_BANK.sort((a, b) => a.id - b.id);

    // Deterministically shuffle options based on question ID so Option A is not always the correct answer
    window.QUESTION_BANK.forEach(q => {
        let seed = q.id * 9301 + 49297;
        const random = () => {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
        const correctText = q.options[q.correctAnswer];
        for (let i = q.options.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
        }
        q.correctAnswer = q.options.indexOf(correctText);
    });

    setupEventListeners();
    applyFilters();
    updateHeaderStats();
}

/* ==========================================================================
   Event Listeners Setup
   ========================================================================== */
function setupEventListeners() {
    // Mode Switchers
    document.getElementById('btn-study-mode').addEventListener('click', () => switchMode('study'));
    document.getElementById('btn-exam-mode').addEventListener('click', () => switchMode('exam'));
    document.getElementById('btn-recap-mode').addEventListener('click', () => switchMode('recap'));

    // Recap tabs switching
    const recapTabs = document.getElementById('recap-tabs');
    if (recapTabs) {
        recapTabs.addEventListener('click', (e) => {
            if (e.target.classList.contains('recap-tab-btn')) {
                document.querySelectorAll('.recap-tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderCheatSheet(e.target.dataset.vertical);
            }
        });
    }

    // Dashboard Modal Controls
    document.getElementById('btn-show-dashboard').addEventListener('click', showDashboardModal);
    document.getElementById('btn-close-dashboard').addEventListener('click', hideDashboardModal);
    document.getElementById('dashboard-modal').addEventListener('click', (e) => {
        if (e.target.id === 'dashboard-modal') hideDashboardModal();
    });

    // Search Input
    const searchInput = document.getElementById('search-input');
    const clearSearch = document.getElementById('clear-search');
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        clearSearch.classList.toggle('hidden', state.searchQuery === '');
        state.currentPage = 1;
        applyFilters();
    });
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        state.searchQuery = '';
        clearSearch.classList.add('hidden');
        state.currentPage = 1;
        applyFilters();
    });

    // Topic Pills
    document.getElementById('topic-filters').addEventListener('click', (e) => {
        if (e.target.classList.contains('topic-pill')) {
            document.querySelectorAll('.topic-pill').forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            state.topicFilter = e.target.dataset.topic;
            state.currentPage = 1;
            applyFilters();
        }
    });

    // Dropdown Filters
    document.getElementById('difficulty-filter').addEventListener('change', (e) => {
        state.difficultyFilter = e.target.value;
        state.currentPage = 1;
        applyFilters();
    });
    document.getElementById('status-filter').addEventListener('change', (e) => {
        state.statusFilter = e.target.value;
        state.currentPage = 1;
        applyFilters();
    });

    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => {
        if (state.currentPage > 1) {
            state.currentPage--;
            renderStudyQuestions();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(state.filteredQuestions.length / state.itemsPerPage);
        if (state.currentPage < totalPages) {
            state.currentPage++;
            renderStudyQuestions();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Reset Progress
    document.getElementById('reset-progress-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all solved progress, bookmarks, and mock exam history?')) {
            localStorage.clear();
            state.solved = {};
            state.userAnswers = {};
            state.bookmarks = new Set();
            state.examHistory = [];
            applyFilters();
            updateHeaderStats();
            hideDashboardModal();
            alert('Local storage progress reset successfully!');
        }
    });

    // Exam Controls
    document.getElementById('btn-start-exam').addEventListener('click', startMockExam);
    document.getElementById('btn-finish-exam').addEventListener('click', submitMockExam);
    document.getElementById('btn-retake-exam').addEventListener('click', startMockExam);
    document.getElementById('btn-review-exam').addEventListener('click', showExamReview);
    document.getElementById('exam-prev-btn').addEventListener('click', () => navExam(-1));
    document.getElementById('exam-next-btn').addEventListener('click', () => navExam(1));
    document.getElementById('exam-flag-btn').addEventListener('click', toggleExamFlag);
}

/* ==========================================================================
   Progress Tracker Modal Logic
   ========================================================================== */
function showDashboardModal() {
    const modal = document.getElementById('dashboard-modal');
    modal.classList.remove('hidden');

    const total = window.QUESTION_BANK.length;
    const correctCount = Object.values(state.solved).filter(s => s === 'correct').length;
    const wrongCount = Object.values(state.solved).filter(s => s === 'incorrect').length;
    const attempted = correctCount + wrongCount;
    const acc = attempted > 0 ? Math.round((correctCount / attempted) * 100) : 0;

    document.getElementById('dash-accuracy').textContent = `${acc}%`;
    document.getElementById('dash-correct').textContent = correctCount;
    document.getElementById('dash-wrong').textContent = wrongCount;
    document.getElementById('dash-exams-count').textContent = state.examHistory.length;

    // Domain breakdown
    const domains = {
        iam: { name: '🔐 IAM & Security', total: 0, solved: 0 },
        compute: { name: '💻 Compute & GKE', total: 0, solved: 0 },
        storage: { name: '🗄️ Storage & Databases', total: 0, solved: 0 },
        networking: { name: '🌐 Networking & VPC', total: 0, solved: 0 },
        operations: { name: '📊 Monitoring & Operations', total: 0, solved: 0 }
    };

    window.QUESTION_BANK.forEach(q => {
        if (domains[q.topic]) {
            domains[q.topic].total++;
            if (state.solved[q.id] === 'correct') domains[q.topic].solved++;
        }
    });

    const barsContainer = document.getElementById('dash-domain-bars');
    barsContainer.innerHTML = Object.keys(domains).map(key => {
        const d = domains[key];
        const pct = d.total > 0 ? Math.round((d.solved / d.total) * 100) : 0;
        return `
            <div class="domain-progress-row">
                <div class="domain-info">
                    <span>${d.name}</span>
                    <strong>${d.solved} / ${d.total} (${pct}%)</strong>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // Exam history
    const histContainer = document.getElementById('dash-exam-history');
    if (state.examHistory.length === 0) {
        histContainer.innerHTML = '<p class="empty-text" style="color: var(--text-muted);">No mock exams completed yet. Take a timed mock exam to record your score history!</p>';
    } else {
        histContainer.innerHTML = state.examHistory.slice().reverse().map(ex => `
            <div class="exam-history-item">
                <div>
                    <strong style="color: ${ex.passed ? 'var(--secondary)' : 'var(--danger)'}">${ex.passed ? 'PASSED 🎉' : 'FAILED'}</strong>
                    <span style="display: block; font-size: 0.8rem; color: var(--text-muted);">${ex.date}</span>
                </div>
                <div style="font-size: 1.2rem; font-weight: 700; font-family: var(--font-code);">
                    ${ex.score} / ${ex.total} (${Math.round((ex.score / ex.total) * 100)}%)
                </div>
            </div>
        `).join('');
    }
}

function hideDashboardModal() {
    document.getElementById('dashboard-modal').classList.add('hidden');
}

/* ==========================================================================
   Mode Switching
   ========================================================================== */
function switchMode(mode) {
    state.currentMode = mode;
    document.getElementById('btn-study-mode').classList.toggle('active', mode === 'study');
    document.getElementById('btn-exam-mode').classList.toggle('active', mode === 'exam');
    document.getElementById('btn-recap-mode').classList.toggle('active', mode === 'recap');
    
    document.getElementById('study-view').classList.toggle('hidden', mode !== 'study');
    document.getElementById('exam-view').classList.toggle('hidden', mode !== 'exam');
    document.getElementById('recap-view').classList.toggle('hidden', mode !== 'recap');

    if (mode === 'exam' && !state.exam.active) {
        document.getElementById('exam-intro-screen').classList.remove('hidden');
        document.getElementById('exam-active-screen').classList.add('hidden');
        document.getElementById('exam-results-screen').classList.add('hidden');
    }

    if (mode === 'recap') {
        const activeTab = document.querySelector('.recap-tab-btn.active') || document.querySelector('.recap-tab-btn[data-vertical="storage"]');
        if (activeTab) {
            renderCheatSheet(activeTab.dataset.vertical);
        }
    }
}

/* ==========================================================================
   Quick Recap & Visual Cheat Sheets Rendering
   ========================================================================== */
function renderCheatSheet(vertical) {
    const container = document.getElementById('recap-content-container');
    if (!window.CHEAT_SHEETS || !window.CHEAT_SHEETS[vertical]) {
        container.innerHTML = '<div class="loading-spinner">⚠️ Cheat sheet data loading...</div>';
        return;
    }

    const data = window.CHEAT_SHEETS[vertical];

    // Build Flowchart Steps
    const stepsHTML = data.flowchart.steps.map((step, idx) => {
        const arrow = idx < data.flowchart.steps.length - 1 ? '<span class="flow-arrow">→</span>' : '';
        return `
            <div class="flow-step" style="border-left-color: ${step.color};">
                ${step.label}
            </div>
            ${arrow}
        `;
    }).join('');

    // Build Service Cards Grid
    const cardsHTML = data.services.map(svc => `
        <div class="service-card" style="border-top: 4px solid ${svc.color};">
            <div class="service-header">
                <h3 class="service-title">${svc.name}</h3>
                <span class="service-badge" style="background: ${svc.color}22; color: ${svc.color}; border: 1px solid ${svc.color}66;">${svc.badge}</span>
            </div>
            
            <div class="service-section">
                <span class="service-label">💡 Primary Use Case</span>
                <p style="color: var(--text-primary);">${svc.useCase}</p>
            </div>

            <div class="service-section">
                <span class="service-label">✨ Killer Unique Feature</span>
                <div class="feature-box">${svc.uniqueFeature}</div>
            </div>

            <div class="service-section">
                <span class="service-label">🎯 When to Use (Exam Rule)</span>
                <div class="when-box">${svc.whenToUse}</div>
            </div>

            <div class="service-section">
                <span class="service-label">⚠️ Exam Gotcha / Pro-Tip</span>
                <div class="gotcha-box">${svc.gotcha}</div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="flowchart-card">
            <div class="flowchart-title">🔀 ${data.flowchart.title}</div>
            <div class="flow-steps">${stepsHTML}</div>
        </div>
        <div class="service-grid">${cardsHTML}</div>
    `;
}

/* ==========================================================================
   Study Mode: Filter & Render Logic
   ========================================================================== */
function applyFilters() {
    state.filteredQuestions = window.QUESTION_BANK.filter(q => {
        // Topic Match
        if (state.topicFilter === 'bookmarked') {
            if (!state.bookmarks.has(q.id)) return false;
        } else if (state.topicFilter !== 'all') {
            if (q.topic !== state.topicFilter) return false;
        }

        // Difficulty Match
        if (state.difficultyFilter !== 'all' && q.difficulty !== state.difficultyFilter) {
            return false;
        }

        // Status Match
        const status = state.solved[q.id] || 'unanswered';
        if (state.statusFilter !== 'all' && status !== state.statusFilter) {
            return false;
        }

        // Search Query Match
        if (state.searchQuery) {
            const matchText = (q.question + ' ' + q.options.join(' ') + ' ' + q.explanation).toLowerCase();
            if (!matchText.includes(state.searchQuery)) return false;
        }

        return true;
    });

    renderStudyQuestions();
    updateHeaderStats();
}

function renderStudyQuestions() {
    const container = document.getElementById('questions-container');
    const showingCount = document.getElementById('showing-count');
    showingCount.textContent = state.filteredQuestions.length;

    if (state.filteredQuestions.length === 0) {
        container.innerHTML = `
            <div class="q-card" style="text-align: center; padding: 3rem;">
                <h3>No questions matched your filter criteria</h3>
                <p style="color: var(--text-muted); margin-top: 0.5rem;">Try clearing your search query or switching filters.</p>
            </div>`;
        document.getElementById('pagination-controls').classList.add('hidden');
        return;
    }

    document.getElementById('pagination-controls').classList.remove('hidden');

    // Calculate Slice
    const totalPages = Math.ceil(state.filteredQuestions.length / state.itemsPerPage);
    if (state.currentPage > totalPages) state.currentPage = 1;
    
    document.getElementById('current-page').textContent = state.currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('prev-page').disabled = state.currentPage === 1;
    document.getElementById('next-page').disabled = state.currentPage === totalPages;

    const startIdx = (state.currentPage - 1) * state.itemsPerPage;
    const currentSlice = state.filteredQuestions.slice(startIdx, startIdx + state.itemsPerPage);

    // Build HTML
    container.innerHTML = currentSlice.map(q => buildQuestionCardHTML(q)).join('');

    // Attach Interactive Event Listeners for the rendered slice
    currentSlice.forEach(q => {
        const card = document.getElementById(`qcard-${q.id}`);
        if (!card) return;

        // Option click handlers
        const optionBtns = card.querySelectorAll('.option-btn');
        optionBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => handleOptionSelect(q, idx));
        });

        // Bookmark toggle
        const bmBtn = card.querySelector('.bookmark-btn');
        bmBtn.addEventListener('click', () => toggleBookmark(q.id, bmBtn));

        // Toggle Explanation button
        const expBtn = card.querySelector('.toggle-exp-btn');
        const expBox = card.querySelector('.explanation-box');
        if (expBtn) {
            expBtn.addEventListener('click', () => {
                const isHidden = expBox.classList.contains('hidden');
                expBox.classList.toggle('hidden', !isHidden);
                expBtn.textContent = isHidden ? '🙈 Hide Explanation & Comparison' : '💡 Show Explanation & Comparison';
            });
        }
    });
}

function buildQuestionCardHTML(q) {
    const status = state.solved[q.id];
    const userAns = state.userAnswers[q.id];
    const isBookmarked = state.bookmarks.has(q.id);

    let statusClass = '';
    if (status === 'correct') statusClass = 'solved-correct';
    if (status === 'incorrect') statusClass = 'solved-incorrect';

    const letters = ['A', 'B', 'C', 'D'];
    const topicLabels = {
        iam: '🔐 IAM & Security',
        compute: '💻 Compute & GKE',
        storage: '🗄️ Storage & DBs',
        networking: '🌐 Networking & VPC',
        operations: '📊 Monitoring & Ops'
    };

    const optionsHTML = q.options.map((opt, idx) => {
        let btnClass = 'option-btn';
        if (userAns !== undefined) {
            btnClass += ' disabled';
            if (idx === q.correctAnswer) btnClass += ' correct';
            else if (idx === userAns && userAns !== q.correctAnswer) btnClass += ' wrong';
        }
        return `
            <button class="${btnClass}" data-idx="${idx}">
                <span class="option-letter">${letters[idx]}</span>
                <span class="option-text">${opt}</span>
            </button>
        `;
    }).join('');

    return `
        <div class="q-card ${statusClass}" id="qcard-${q.id}">
            <div class="q-header">
                <div class="q-meta">
                    <span class="q-number">Q#${q.id}</span>
                    <span class="q-topic-tag">${topicLabels[q.topic] || q.topic}</span>
                    <span class="q-difficulty diff-${q.difficulty}">${q.difficulty}</span>
                </div>
                <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" title="Bookmark question">
                    ${isBookmarked ? '★' : '☆'}
                </button>
            </div>
            <div class="q-text">${q.question}</div>
            <div class="q-options">${optionsHTML}</div>
            <div class="q-footer">
                <button class="toggle-exp-btn">${userAns !== undefined ? '🙈 Hide Explanation & Comparison' : '💡 Show Explanation & Comparison'}</button>
                <div class="explanation-box ${userAns !== undefined ? '' : 'hidden'}">
                    <div class="exp-title">💡 Detailed Explanation & Service Comparison</div>
                    <div>${q.explanation}</div>
                </div>
            </div>
        </div>
    `;
}

function handleOptionSelect(q, selectedIdx) {
    if (state.userAnswers[q.id] !== undefined) return; // Already answered

    const isCorrect = selectedIdx === q.correctAnswer;
    state.solved[q.id] = isCorrect ? 'correct' : 'incorrect';
    state.userAnswers[q.id] = selectedIdx;

    // Save to local storage
    localStorage.setItem('gcp_ace_solved', JSON.stringify(state.solved));
    localStorage.setItem('gcp_ace_user_answers', JSON.stringify(state.userAnswers));

    // Re-render single card state or update classes directly
    const card = document.getElementById(`qcard-${q.id}`);
    if (card) {
        card.classList.add(isCorrect ? 'solved-correct' : 'solved-incorrect');
        const btns = card.querySelectorAll('.option-btn');
        btns.forEach((btn, idx) => {
            btn.classList.add('disabled');
            if (idx === q.correctAnswer) btn.classList.add('correct');
            else if (idx === selectedIdx && !isCorrect) btn.classList.add('wrong');
        });
        card.querySelector('.explanation-box').classList.remove('hidden');
        card.querySelector('.toggle-exp-btn').textContent = '🙈 Hide Explanation & Comparison';
    }

    updateHeaderStats();
}

function toggleBookmark(qId, btnElem) {
    if (state.bookmarks.has(qId)) {
        state.bookmarks.delete(qId);
        btnElem.classList.remove('bookmarked');
        btnElem.textContent = '☆';
    } else {
        state.bookmarks.add(qId);
        btnElem.classList.add('bookmarked');
        btnElem.textContent = '★';
    }
    localStorage.setItem('gcp_ace_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
    updateHeaderStats();
    if (state.topicFilter === 'bookmarked') applyFilters();
}

function updateHeaderStats() {
    const total = window.QUESTION_BANK.length;
    const solvedCount = Object.keys(state.solved).length;
    const correctCount = Object.values(state.solved).filter(s => s === 'correct').length;
    
    document.getElementById('stat-total-q').textContent = total;
    document.getElementById('stat-solved').textContent = solvedCount;
    document.getElementById('bookmark-count').textContent = state.bookmarks.size;

    const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    document.getElementById('mastery-percent').textContent = `${percent}%`;
    document.getElementById('mastery-bar').style.width = `${percent}%`;
}

/* ==========================================================================
   Mock Exam Mode Logic
   ========================================================================== */
function startMockExam() {
    // Pick 50 random questions across all domains
    const pool = [...window.QUESTION_BANK];
    const shuffled = pool.sort(() => 0.5 - Math.random());
    state.exam.questions = shuffled.slice(0, Math.min(50, pool.length));
    state.exam.answers = {};
    state.exam.flags = new Set();
    state.exam.currentIdx = 0;
    state.exam.timeRemaining = 7200; // 2 hours
    state.exam.active = true;

    document.getElementById('exam-intro-screen').classList.add('hidden');
    document.getElementById('exam-results-screen').classList.add('hidden');
    document.getElementById('exam-active-screen').classList.remove('hidden');

    renderExamPalette();
    renderExamQuestion();
    startExamTimer();
}

function startExamTimer() {
    if (state.exam.timerInterval) clearInterval(state.exam.timerInterval);
    state.exam.timerInterval = setInterval(() => {
        state.exam.timeRemaining--;
        updateTimerDisplay();
        if (state.exam.timeRemaining <= 0) {
            clearInterval(state.exam.timerInterval);
            alert('⏳ Time is up! Submitting your exam automatically.');
            submitMockExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const hrs = Math.floor(state.exam.timeRemaining / 3600);
    const mins = Math.floor((state.exam.timeRemaining % 3600) / 60);
    const secs = state.exam.timeRemaining % 60;
    const display = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('exam-timer').textContent = `⏳ ${display}`;
}

function renderExamPalette() {
    const palette = document.getElementById('exam-palette');
    palette.innerHTML = state.exam.questions.map((q, idx) => {
        let cls = 'palette-item';
        if (idx === state.exam.currentIdx) cls += ' active';
        if (state.exam.answers[q.id] !== undefined) cls += ' answered';
        if (state.exam.flags.has(q.id)) cls += ' flagged';
        return `<button class="${cls}" data-idx="${idx}">${idx + 1}</button>`;
    }).join('');

    palette.querySelectorAll('.palette-item').forEach(btn => {
        btn.addEventListener('click', () => {
            state.exam.currentIdx = parseInt(btn.dataset.idx);
            renderExamPalette();
            renderExamQuestion();
        });
    });
}

function renderExamQuestion() {
    const q = state.exam.questions[state.exam.currentIdx];
    document.getElementById('exam-q-current').textContent = state.exam.currentIdx + 1;
    
    const isFlagged = state.exam.flags.has(q.id);
    const flagBtn = document.getElementById('exam-flag-btn');
    flagBtn.textContent = isFlagged ? '🏳️ Flagged' : '🏳️ Flag for Review';
    flagBtn.style.background = isFlagged ? 'rgba(245, 158, 11, 0.4)' : '';

    const letters = ['A', 'B', 'C', 'D'];
    const selectedAns = state.exam.answers[q.id];

    const optionsHTML = q.options.map((opt, idx) => {
        const isSel = selectedAns === idx;
        return `
            <button class="option-btn ${isSel ? 'correct' : ''}" data-idx="${idx}" style="${isSel ? 'border-color: var(--primary) !important; background: rgba(66,133,244,0.2) !important;' : ''}">
                <span class="option-letter" style="${isSel ? 'background: var(--primary); color: white;' : ''}">${letters[idx]}</span>
                <span class="option-text">${opt}</span>
            </button>
        `;
    }).join('');

    document.getElementById('exam-question-container').innerHTML = `
        <div class="q-card" style="border-color: var(--border-color);">
            <div class="q-header">
                <div class="q-meta">
                    <span class="q-number">Question #${state.exam.currentIdx + 1}</span>
                    <span class="q-topic-tag">${q.topic.toUpperCase()}</span>
                </div>
            </div>
            <div class="q-text">${q.question}</div>
            <div class="q-options">${optionsHTML}</div>
        </div>
    `;

    document.querySelectorAll('#exam-question-container .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.idx);
            state.exam.answers[q.id] = idx;
            renderExamPalette();
            renderExamQuestion();
        });
    });
}

function navExam(step) {
    const newIdx = state.exam.currentIdx + step;
    if (newIdx >= 0 && newIdx < state.exam.questions.length) {
        state.exam.currentIdx = newIdx;
        renderExamPalette();
        renderExamQuestion();
    }
}

function toggleExamFlag() {
    const q = state.exam.questions[state.exam.currentIdx];
    if (state.exam.flags.has(q.id)) state.exam.flags.delete(q.id);
    else state.exam.flags.add(q.id);
    renderExamPalette();
    renderExamQuestion();
}

function submitMockExam() {
    if (!confirm('Are you sure you want to finish and submit your exam?')) return;
    
    clearInterval(state.exam.timerInterval);
    state.exam.active = false;

    document.getElementById('exam-active-screen').classList.add('hidden');
    document.getElementById('exam-results-screen').classList.remove('hidden');

    // Grade Exam
    let correctCount = 0;
    const domainScores = { iam: { c:0, t:0 }, compute: { c:0, t:0 }, storage: { c:0, t:0 }, networking: { c:0, t:0 }, operations: { c:0, t:0 } };
    
    state.exam.questions.forEach(q => {
        const userAns = state.exam.answers[q.id];
        const isCorrect = userAns === q.correctAnswer;
        if (isCorrect) correctCount++;
        if (!domainScores[q.topic]) domainScores[q.topic] = { c:0, t:0 };
        domainScores[q.topic].t++;
        if (isCorrect) domainScores[q.topic].c++;

        // Save into study mode progress too!
        if (userAns !== undefined) {
            state.solved[q.id] = isCorrect ? 'correct' : 'incorrect';
            state.userAnswers[q.id] = userAns;
        }
    });

    localStorage.setItem('gcp_ace_solved', JSON.stringify(state.solved));
    localStorage.setItem('gcp_ace_user_answers', JSON.stringify(state.userAnswers));
    updateHeaderStats();

    const percent = Math.round((correctCount / state.exam.questions.length) * 100);
    const passed = percent >= 70;

    // Record exam history in localStorage
    const now = new Date();
    state.examHistory.push({
        date: now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: correctCount,
        total: state.exam.questions.length,
        passed: passed
    });
    localStorage.setItem('gcp_ace_exam_history', JSON.stringify(state.examHistory));

    document.getElementById('score-percent').textContent = `${percent}%`;
    document.getElementById('score-correct').textContent = correctCount;
    const verdict = document.getElementById('score-verdict');
    verdict.textContent = passed ? 'PASSED 🎉' : 'FAILED';
    verdict.style.color = passed ? 'var(--secondary)' : 'var(--danger)';
    document.getElementById('score-circle').style.borderColor = passed ? 'var(--secondary)' : 'var(--danger)';

    const domainNames = {
        iam: '🔐 IAM & Access Security',
        compute: '💻 Compute & Container Engines',
        storage: '🗄️ Cloud Storage & Database Options',
        networking: '🌐 VPC Networks & Connectivity',
        operations: '📊 Monitoring & Operations Suite'
    };

    document.getElementById('domain-breakdown').innerHTML = Object.keys(domainScores).map(dom => {
        const d = domainScores[dom];
        const p = d.t > 0 ? Math.round((d.c / d.t) * 100) : 0;
        return `<div class="domain-row"><span>${domainNames[dom] || dom}</span><strong>${d.c}/${d.t} (${p}%)</strong></div>`;
    }).join('');
}

function showExamReview() {
    const reviewList = document.getElementById('exam-review-list');
    reviewList.classList.remove('hidden');
    
    reviewList.innerHTML = `
        <h3 style="margin: 1.5rem 0;">Exam Question Review & Service Comparisons</h3>
        ` + state.exam.questions.map(q => {
            const userAns = state.exam.answers[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const letters = ['A', 'B', 'C', 'D'];

            return `
                <div class="q-card ${isCorrect ? 'solved-correct' : 'solved-incorrect'}">
                    <div class="q-header">
                        <div class="q-meta">
                            <span class="q-number">Q#${q.id}</span>
                            <span class="q-topic-tag">${q.topic.toUpperCase()}</span>
                        </div>
                    </div>
                    <div class="q-text">${q.question}</div>
                    <p style="margin-bottom: 0.5rem; font-size: 0.9rem;">Your Answer: <strong style="color: ${isCorrect ? 'var(--secondary)' : 'var(--danger)'}">${userAns !== undefined ? letters[userAns] + '. ' + q.options[userAns] : 'Did not answer'}</strong></p>
                    <p style="margin-bottom: 1rem; font-size: 0.9rem;">Correct Answer: <strong style="color: var(--secondary)">${letters[q.correctAnswer]}. ${q.options[q.correctAnswer]}</strong></p>
                    <div class="explanation-box">
                        <div class="exp-title">💡 Explanation & Comparison</div>
                        <div>${q.explanation}</div>
                    </div>
                </div>
            `;
        }).join('');
}
