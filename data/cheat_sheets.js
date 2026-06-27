/* ==========================================================================
   GCP ACE Prep Pro - Visual Cheat Sheets & Quick Recap Data (Exam Oriented)
   ========================================================================== */

window.CHEAT_SHEETS = {
    storage: {
        title: "🗄️ Cloud Storage & Database Options",
        subtitle: "Mastering data persistence, relational scaling, SLAs, CLI commands, and NoSQL selection.",
        flowchart: {
            title: "Decision Flowchart: Which Storage Service to Choose?",
            steps: [
                { label: "Structured Relational SQL?", color: "#4285F4" },
                { label: "Need Global Horizontal Scaling? → Choose Spanner", color: "#34A853" },
                { label: "Regional / Single-Region SQL? → Choose Cloud SQL", color: "#FBBC05" },
                { label: "NoSQL Document Data? → Choose Firestore", color: "#EA4335" },
                { label: "High-Throughput IoT / Analytics? → Choose Bigtable", color: "#8ab4f8" },
                { label: "Unstructured Files / Objects? → Choose Cloud Storage", color: "#a855f7" }
            ]
        },
        services: [
            {
                name: "Cloud Storage (GCS)",
                badge: "Object Storage",
                color: "#4285F4",
                useCase: "Unstructured data like images, videos, backups, archives, and static website hosting.",
                uniqueFeature: "Supports 4 storage classes (Standard, Nearline, Coldline, Archive) with Object Lifecycle Management for automatic cost optimization.",
                whenToUse: "Use Standard for frequently accessed files (<30 days); Nearline (≥30 days); Coldline (≥90 days); Archive (≥365 days).",
                command: "gsutil mb -c nearline -l us-central1 gs://my-bucket-name",
                keyPoints: [
                    "⏱️ Minimum storage durations: Nearline (30d), Coldline (90d), Archive (365d). Early deletion incurs early retrieval fees!",
                    "🔐 Signed URLs allow granting temporary read/write access to unauthenticated users without exposing IAM keys.",
                    "🔄 Changing bucket storage class only affects NEW objects. To update existing objects, use Lifecycle rules or rewrite object metadata."
                ],
                gotcha: "Remember: Changing storage class does not change bucket location. Bucket names must be globally unique across all GCP customers!"
            },
            {
                name: "Cloud SQL",
                badge: "Relational RDBMS",
                color: "#FBBC05",
                useCase: "Traditional web applications, ERPs, and CMS platforms needing MySQL, PostgreSQL, or SQL Server.",
                uniqueFeature: "Fully managed regional relational database with automated backups, point-in-time recovery, and High Availability (HA) failover.",
                whenToUse: "Use when data fits in a single region (up to 64TB) and requires standard SQL compliance without global multi-master writes.",
                command: "gcloud sql instances create my-db --tier=db-custom-2-7680 --availability-type=REGIONAL",
                keyPoints: [
                    "🚀 Read Replicas scale read queries asynchronously across zones/regions (up to 18 replicas).",
                    "🛡️ High Availability (HA) configuration provisions a standby instance in a different zone; failover preserves the exact same connection IP.",
                    "💾 Backups take an instance snapshot. Automated backups require binary logging enabled for MySQL point-in-time recovery."
                ],
                gotcha: "Read replicas scale read queries; HA failover instances protect against zonal failures (same IP failover)."
            },
            {
                name: "Cloud Spanner",
                badge: "Global Relational",
                color: "#34A853",
                useCase: "Mission-critical financial systems, global supply chains, and large-scale gaming leaderboards.",
                uniqueFeature: "The only fully managed relational database providing unlimited horizontal scaling, strong global consistency, and 99.999% SLA.",
                whenToUse: "Use when you outgrow Cloud SQL (>64TB) or require multi-region active-active synchronous transactional writes.",
                command: "gcloud spanner instances create my-spanner --config=regional-us-central1 --nodes=3",
                keyPoints: [
                    "🏆 Industry-leading SLA: 99.99% for regional instances and 99.999% (Five Nines) for multi-region instances.",
                    "⚛️ Powered by Google's TrueTime API (atomic clocks and GPS receivers) to guarantee serializable global transactions.",
                    "📈 Scales horizontally by adding processing nodes without sharding downtime."
                ],
                gotcha: "Spanner is expensive! Never recommend Spanner for small regional apps or simple blogging sites."
            },
            {
                name: "Cloud Firestore",
                badge: "NoSQL Document",
                color: "#EA4335",
                useCase: "Mobile apps, web apps, user profiles, product catalogs, and real-time offline synchronization.",
                uniqueFeature: "Serverless NoSQL document database with ACID transactions, hierarchical collections, and built-in real-time listener SDKs.",
                whenToUse: "Use for flexible JSON-like document schemas requiring automatic multi-region serverless scaling.",
                command: "gcloud firestore databases create --region=us-central1",
                keyPoints: [
                    "⚡ Performance scales with the size of your result set, NOT the total size of the database collection!",
                    "📱 Built-in live synchronization pushes data updates instantly to connected mobile/web client SDKs.",
                    "🔥 Native mode replaces Cloud Datastore; Datastore mode offers backwards compatibility."
                ],
                gotcha: "Queries cannot perform complex relational joins or multi-property inequality filtering without composite indexes."
            },
            {
                name: "Cloud Bigtable",
                badge: "Wide-Column NoSQL",
                color: "#8ab4f8",
                useCase: "IoT telemetry sensor streaming, ad-tech clickstream analytics, time-series metrics, and financial ticker graphs.",
                uniqueFeature: "Low-latency (<10ms), petabyte-scale wide-column NoSQL engine powered by Apache HBase interface.",
                whenToUse: "Use when writing massive volumes of single-keyed data (>1TB) requiring sub-millisecond analytical reads.",
                command: "cbt createinstance my-instance my-cluster us-central1-b 3 SSD",
                keyPoints: [
                    "📊 Ideal for flat, high-throughput time-series data (>1 TB). Not recommended for data under 1 TB.",
                    "🔑 Row-key schema design is the most critical exam topic: never use monotonically increasing IDs (like timestamps) as row prefixes!",
                    "⚡ Uses HDD or SSD storage; SSD is strongly recommended for low-latency random reads."
                ],
                gotcha: "Requires careful row-key schema design (avoid monotonically increasing keys like timestamps to prevent hot-spotting)."
            },
            {
                name: "Persistent Disk & Filestore",
                badge: "Block & File Share",
                color: "#a855f7",
                useCase: "VM OS boot disks (Persistent Disk) vs multi-writer NFS shared network storage (Filestore).",
                uniqueFeature: "Persistent Disks can be dynamically resized without rebooting VMs. Filestore provides POSIX-compliant shared NFS v3 shares.",
                whenToUse: "Use Regional Persistent Disk for synchronous zonal VM failover; use Filestore for shared enterprise file systems.",
                command: "gcloud compute disks create my-disk --size=200GB --type=pd-ssd --zone=us-central1-a",
                keyPoints: [
                    "💽 Standard Persistent Disks can be attached in Read-Only mode to multiple VMs, but Read-Write mode is restricted to 1 VM.",
                    "🔄 Regional Persistent Disks synchronously replicate block data across two zones in the same region.",
                    "📁 Filestore is managed NFS, allowing concurrent read/write access across hundreds of Compute Engine VMs or GKE pods."
                ],
                gotcha: "Standard Persistent Disks cannot be mounted read-write to multiple VMs simultaneously in Read-Write mode (use Filestore instead)."
            }
        ]
    },
    compute: {
        title: "💻 Compute & Container Engines",
        subtitle: "Selecting the optimal compute abstraction based on control, SLAs, commands, and scaling automation.",
        flowchart: {
            title: "Decision Flowchart: Which Compute Service to Choose?",
            steps: [
                { label: "Need OS / Kernel Level Control? → Choose Compute Engine (VMs)", color: "#4285F4" },
                { label: "Containerized Microservices? → Choose Cloud Run or GKE", color: "#34A853" },
                { label: "Serverless Stateless Containers? → Choose Cloud Run", color: "#FBBC05" },
                { label: "Complex Kubernetes Orchestration? → Choose GKE", color: "#8ab4f8" },
                { label: "Source-Code Web Apps? → Choose App Engine", color: "#EA4335" },
                { label: "Event-Driven Snippets? → Choose Cloud Functions", color: "#a855f7" }
            ]
        },
        services: [
            {
                name: "Compute Engine (GCE)",
                badge: "Virtual Machines (IaaS)",
                color: "#4285F4",
                useCase: "Legacy application migrations, custom OS kernels, specialized GPU training, and databases requiring root disk access.",
                uniqueFeature: "Custom machine types (tailor CPU/RAM ratios), Live Migration (zero downtime maintenance), and Spot/Preemptible VMs (up to 91% discount).",
                whenToUse: "Use when you need full control over the operating system, network interfaces, or persistent block storage.",
                command: "gcloud compute instances create my-vm --machine-type=e2-medium --zone=us-central1-a --preemptible",
                keyPoints: [
                    "⚡ Spot / Preemptible VMs shut down with a 30-second warning (ACPI shutdown signal); max 24-hour runtime for Preemptible.",
                    "🛡️ Managed Instance Groups (MIGs) provide auto-healing, auto-scaling, and rolling updates across multiple instances.",
                    "💰 Committed Use Discounts (CUDs) offer up to 57% savings for 1 or 3-year term commitments."
                ],
                gotcha: "Spot VMs can be preempted at any time with a 30-second warning. Always use Managed Instance Groups (MIGs) for auto-scaling."
            },
            {
                name: "Cloud Run",
                badge: "Serverless Containers",
                color: "#34A853",
                useCase: "Stateless REST APIs, webhooks, microservices, and scheduled event-driven container processing.",
                uniqueFeature: "Scales instantly from zero to thousands of container instances in seconds, billing strictly per 100 milliseconds of active CPU request time.",
                whenToUse: "Use for containerized workloads that do not require complex cluster management or background persistent daemon states.",
                command: "gcloud run deploy my-app --image=gcr.io/my-proj/app --platform=managed --allow-unauthenticated",
                keyPoints: [
                    "0️⃣ Can scale down to zero instances when idle, resulting in $0 cost during low-traffic periods.",
                    "⏱️ Gen 2 runtime supports execution timeouts up to 60 minutes (3600 seconds) for long-running batch requests.",
                    "🌐 Automatically provisions HTTPS certificates and custom domain mappings out of the box."
                ],
                gotcha: "Containers must be stateless! Any data written to the container local filesystem is lost when the instance scales down."
            },
            {
                name: "Google Kubernetes Engine (GKE)",
                badge: "Container Orchestration",
                color: "#8ab4f8",
                useCase: "Complex microservices architectures, service meshes (Anthos/Istio), stateful StatefulSets, and hybrid cloud containers.",
                uniqueFeature: "Offers Standard mode (full control over node pools) and Autopilot mode (Google manages cluster infrastructure and node sizing).",
                whenToUse: "Use when deploying interconnected containers requiring custom networking, persistent volumes, or multi-cluster orchestration.",
                command: "gcloud container clusters create my-cluster --enable-autopilot --region=us-central1",
                keyPoints: [
                    "🤖 GKE Autopilot manages node provisioning, security patching, and bin-packing; you pay only for pod CPU/memory requests.",
                    "🔄 Horizontal Pod Autoscaler (HPA) scales pods based on CPU/RAM; Cluster Autoscaler scales physical VM node pools.",
                    "🔐 Workload Identity is the recommended secure mechanism for GKE pods to authenticate to GCP APIs."
                ],
                gotcha: "In GKE Autopilot, node-level SSH access and privileged container configurations are restricted for security."
            },
            {
                name: "App Engine (GAE)",
                badge: "Serverless PaaS",
                color: "#FBBC05",
                useCase: "Rapid web application development where developers only want to push code (Python, Java, Node, Go, PHP).",
                uniqueFeature: "Standard Environment offers instant scaling to zero in secure sandboxes; Flexible Environment runs Docker containers on managed VMs.",
                whenToUse: "Use Standard for pure source-code web apps with unpredictable traffic; use Flexible when needing custom system libraries.",
                command: "gcloud app deploy app.yaml --project=my-project-id",
                keyPoints: [
                    "📦 Standard environment boots in seconds and scales to zero; Flexible environment takes minutes to boot and requires at least 1 running VM.",
                    "⏱️ Standard requests timeout after 60 seconds; Flexible environment allows up to 60 minutes.",
                    "🔀 Traffic splitting allows canary deployments (e.g. routing 10% of traffic to a v2 version)."
                ],
                gotcha: "App Engine Standard does not allow writing to local disk (except /tmp) and enforces strict request timeouts."
            },
            {
                name: "Cloud Functions",
                badge: "Function as a Service",
                color: "#EA4335",
                useCase: "Event-driven glue code, Cloud Storage file upload triggers, Pub/Sub message processing, and lightweight webhooks.",
                uniqueFeature: "Single-purpose asynchronous functions executed automatically in response to GCP infrastructure events.",
                whenToUse: "Use for lightweight event listeners or background triggers without managing application servers or routing containers.",
                command: "gcloud functions deploy my-func --runtime=nodejs18 --trigger-topic=my-pubsub-topic",
                keyPoints: [
                    "⚡ Eventarc triggers allow functions to react to over 90+ GCP audit log event sources.",
                    "⏱️ Gen 1 max timeout is 9 minutes (540s); Gen 2 max timeout is 60 minutes (powered by Cloud Run).",
                    "📦 Functions can be triggered via HTTP webhooks or asynchronous Cloud Events (Storage object finalize, Pub/Sub publish)."
                ],
                gotcha: "Gen 2 Cloud Functions are powered under the hood by Cloud Run and Eventarc, allowing up to 60-minute execution timeouts!"
            }
        ]
    },
    iam: {
        title: "🔐 IAM & Access Security Hierarchy",
        subtitle: "Enforcing least privilege, identity federation, CLI bindings, and hierarchical boundaries.",
        flowchart: {
            title: "GCP Resource Hierarchy & Inheritance Flow",
            steps: [
                { label: "Organization Root (Global Domain Policy)", color: "#EA4335" },
                { label: "Folders (Departments / Subsidiaries)", color: "#FBBC05" },
                { label: "Projects (Billing & Isolation Boundary)", color: "#34A853" },
                { label: "Resources (VMs, Buckets, BigQuery Tables)", color: "#4285F4" }
            ]
        },
        services: [
            {
                name: "Resource Hierarchy & Inheritance",
                badge: "Core Architecture",
                color: "#EA4335",
                useCase: "Structuring multi-tenant corporate clouds, isolating billing accounts, and applying cascading policies.",
                uniqueFeature: "Permissions flow downward: IAM grants applied at the Organization or Folder level are automatically inherited by all child Projects.",
                whenToUse: "Always structure corporate environments with Folders representing departments (e.g. Finance, Dev) to prevent policy drift.",
                command: "gcloud resource-manager folders create --display-name=Marketing --organization=123456789",
                keyPoints: [
                    "➕ IAM policies are unioned across levels: if you grant Viewer at Org and Editor at Project, the user has Editor on the project.",
                    "🔒 Resource Liens (`gcloud resource-manager liens create`) block accidental project deletion until the lien is removed.",
                    "🗑️ Deleted projects enter a 30-day recovery window before permanent destruction."
                ],
                gotcha: "IAM permissions are strictly additive! You cannot revoke a permission at a lower project level if it was granted at a parent folder level."
            },
            {
                name: "IAM Role Types",
                badge: "Access Control",
                color: "#4285F4",
                useCase: "Authorizing human users, groups, and automated identities to invoke Google Cloud APIs.",
                uniqueFeature: "Primitive (Owner/Editor/Viewer - too broad); Predefined (Curated service roles like Storage Object Viewer); Custom (Tailored API permissions).",
                whenToUse: "Always assign Predefined roles for least privilege. Use Custom roles only when compliance mandates specific granular restrictions.",
                command: "gcloud projects add-iam-policy-binding my-proj --member=user:om@google.com --role=roles/viewer",
                keyPoints: [
                    "🚫 IAM Deny policies evaluated at Organization/Folder level override any IAM Allow grants across all child projects.",
                    "👥 Assigning roles to Google Groups instead of individual users drastically simplifies onboarding and offboarding management.",
                    "🔍 Policy Troubleshooter analyzes why an API call was permitted or blocked for a specific principal."
                ],
                gotcha: "Never assign the primitive Editor or Owner roles to service accounts in production environments!"
            },
            {
                name: "Service Accounts & Workload Identity",
                badge: "Machine Auth",
                color: "#34A853",
                useCase: "Enabling applications on VMs, GKE pods, or external clouds (AWS/On-prem) to authenticate to GCP APIs.",
                uniqueFeature: "Workload Identity Federation allows external identities (AWS IAM, Kubernetes OIDC) to trade tokens for GCP access without JSON keys.",
                whenToUse: "Use Application Default Credentials (ADC) inside GCP; use Workload Identity Federation for external servers.",
                command: "gcloud iam service-accounts create my-sa --display-name='Backend Processing SA'",
                keyPoints: [
                    "🔑 Grant `roles/iam.serviceAccountUser` to human developers so they can attach service accounts to VMs or deployment pipelines.",
                    "🛡️ Workload Identity Federation exchanges external AWS/Azure/OIDC JWT tokens for temporary GCP access tokens.",
                    "⚠️ JSON key files pose severe credential leakage risks if committed to GitHub repositories."
                ],
                gotcha: "Downloading Service Account JSON keys poses severe credential leakage risks. Block key creation using Organization Policies."
            },
            {
                name: "VPC Service Controls (VPC-SC)",
                badge: "API Data Perimeter",
                color: "#8ab4f8",
                useCase: "Preventing data exfiltration from Cloud Storage or BigQuery even if an attacker steals valid IAM credentials.",
                uniqueFeature: "Creates a secure network perimeter around Google managed API services, blocking API calls originating from unauthorized external networks.",
                whenToUse: "Configure VPC-SC perimeters around sensitive production projects containing confidential PII or financial datasets.",
                command: "gcloud access-context-manager perimeters create my_perimeter --title='Prod Perimeter' --resources=projects/12345",
                keyPoints: [
                    "🛡️ Governs API traffic at Layer 7: blocks access to `storage.googleapis.com` from outside IPs even with valid IAM tokens.",
                    "🌉 Ingress / Egress rules allow controlled data exchange across perimeter boundaries for authorized external networks.",
                    "🧪 Dry Run mode allows testing perimeter rules without blocking live production traffic."
                ],
                gotcha: "VPC firewalls govern VM packet traffic (Layer 3/4); VPC Service Controls govern Google API endpoint access (Layer 7)."
            },
            {
                name: "Organization Policies",
                badge: "Hierarchical Guardrails",
                color: "#FBBC05",
                useCase: "Restricting allowable cloud configurations across all projects (e.g. disable external public IPs on VMs).",
                uniqueFeature: "Defines absolute guardrails on *what configurations are allowable*, overriding user permissions.",
                whenToUse: "Enforce boolean constraints like `constraints/compute.vmExternalIpAccess` or `constraints/iam.disableServiceAccountKeyCreation`.",
                command: "gcloud resource-manager org-policies describe constraints/compute.vmExternalIpAccess --project=my-proj",
                keyPoints: [
                    "🛡️ Enforced during API mutation requests: blocks resource creation if it violates organizational constraints.",
                    "🌐 Common constraints: restricting allowed deployment regions (`constraints/gcp.resourceLocations`) or allowed identity domains.",
                    "📜 Can be enforced at Organization, Folder, or Project nodes with inheritance rules."
                ],
                gotcha: "IAM controls *who* can call an API; Organization Policies control *what resource configurations* are permitted to exist."
            }
        ]
    },
    networking: {
        title: "🌐 Networking, VPC & Connectivity",
        subtitle: "Architecting global virtual private clouds, load balancers, firewalls, and CLI networking.",
        flowchart: {
            title: "Decision Flowchart: Which Load Balancer to Choose?",
            steps: [
                { label: "HTTP(S) Web Traffic? → Choose Global External Application Load Balancer", color: "#4285F4" },
                { label: "SSL / TCP / UDP Protocols? → Choose Network Load Balancer", color: "#34A853" },
                { label: "Internal Microservices? → Choose Internal Application Load Balancer", color: "#FBBC05" },
                { label: "Hybrid On-Prem Connectivity? → Choose Cloud Interconnect (Dedicated)", color: "#8ab4f8" }
            ]
        },
        services: [
            {
                name: "Virtual Private Cloud (VPC)",
                badge: "Global Network",
                color: "#4285F4",
                useCase: "Connecting VM instances, Kubernetes clusters, and serverless networks in a unified private IP space.",
                uniqueFeature: "GCP VPCs are global resources! Subnets are regional resources. VMs in different regions can communicate via internal private IPs.",
                whenToUse: "Use Custom mode VPCs for production environments to retain full control over IP CIDR allocations and prevent overlap.",
                command: "gcloud compute networks create my-custom-vpc --subnet-mode=custom",
                keyPoints: [
                    "🌍 VPCs span all GCP regions globally; subnets are bound to a single specific region.",
                    "🔗 VPC Peering connects two VPCs securely via internal IP, but peering is non-transitive (A peered to B and B peered to C does NOT peer A to C).",
                    "🌉 Shared VPC allows a central host project to share subnets with multiple service projects for unified billing."
                ],
                gotcha: "Auto-mode VPCs automatically create subnets in every GCP region, which can cause IP collision during VPN peering."
            },
            {
                name: "Cloud Load Balancing",
                badge: "Traffic Distribution",
                color: "#34A853",
                useCase: "Distributing user traffic across multi-region backends with auto-scaling and DDoS protection (Cloud Armor).",
                uniqueFeature: "Global External Application Load Balancer operates at Layer 7 with a single Anycast IP address routing users to the nearest healthy region.",
                whenToUse: "Use Application Load Balancers for HTTP(S); use Network Load Balancers (L4 Passthrough) for TCP/UDP or ultra-low latency.",
                command: "gcloud compute backend-services create my-backend --global --protocol=HTTP --port-name=http",
                keyPoints: [
                    "🛡️ Cloud Armor web application firewall (WAF) attaches to External Application Load Balancers to block SQLi/XSS/DDoS.",
                    "🏥 Health checks continually ping backend VMs; unhealthy instances are automatically pulled from load balancing rotation.",
                    "🌐 Global load balancers require Premium Network Tier. Regional load balancers operate on Standard Tier."
                ],
                gotcha: "Global load balancers require Premium Network Tier. Regional load balancers operate on Standard Tier."
            },
            {
                name: "Cloud NAT & Private Google Access",
                badge: "Egress & Private APIs",
                color: "#FBBC05",
                useCase: "Allowing private VMs (without external public IPs) to download OS updates or access Google Cloud APIs securely.",
                uniqueFeature: "Cloud NAT translates outbound private VM traffic to public IPs; Private Google Access routes internal VM calls directly to Google APIs.",
                whenToUse: "Enable Private Google Access on subnets so private VMs can reach Cloud Storage buckets without traversing the public internet.",
                command: "gcloud compute routers nats create my-nat --router=my-router --nat-all-subnet-ip-ranges --auto-allocate-nat-external-ips",
                keyPoints: [
                    "🔄 Cloud NAT operates at the regional level and relies on Cloud Router to perform dynamic NAT IP allocation.",
                    "🔒 Private Google Access allows internal private IPs to reach Google APIs (like `storage.googleapis.com`) via default gateways.",
                    "🚫 Cloud NAT is strictly for outbound internet connections; it blocks unsolicited inbound external connections."
                ],
                gotcha: "Cloud NAT only supports outbound (egress) connections. It cannot accept unsolicited inbound connections from the internet."
            },
            {
                name: "Hybrid Connectivity (VPN vs Interconnect)",
                badge: "On-Prem Bridge",
                color: "#8ab4f8",
                useCase: "Bridging on-premises corporate data centers with Google Cloud VPC networks.",
                uniqueFeature: "Cloud VPN HA provides 99.99% SLA over encrypted public internet IPsec tunnels; Cloud Interconnect provides dedicated physical fiber links (10 Gbps / 100 Gbps).",
                whenToUse: "Use HA VPN for quick deployment (<3 Gbps); use Dedicated Interconnect for mission-critical high-bandwidth throughput.",
                command: "gcloud compute vpn-tunnels create my-tunnel --peer-address=198.51.100.1 --shared-secret=secret123 --ike-version=2",
                keyPoints: [
                    "🏆 HA VPN requires dual redundant external IP tunnels and dynamic BGP routing via Cloud Router for 99.99% SLA.",
                    "⚡ Dedicated Interconnect provides 10 Gbps or 100 Gbps physical fiber circuits connecting directly in colocation facilities.",
                    "🤝 Partner Interconnect allows connecting through third-party service providers at lower bandwidth increments (50 Mbps to 10 Gbps)."
                ],
                gotcha: "Both HA VPN and Cloud Interconnect require Cloud Router enabled with dynamic BGP routing for SLA guarantees."
            },
            {
                name: "VPC Firewall Rules",
                badge: "Packet Filtering",
                color: "#EA4335",
                useCase: "Filtering inbound (ingress) and outbound (egress) TCP/UDP traffic to specific VM instance targets.",
                uniqueFeature: "Targets can be defined using Network Tags (e.g. `web-server`) or Service Accounts (more secure).",
                whenToUse: "Always target firewall rules using Service Accounts in enterprise environments to prevent developers from bypassing rules via tag edits.",
                command: "gcloud compute firewall-rules create allow-http --allow=tcp:80 --target-tags=web-server --source-ranges=0.0.0.0/0",
                keyPoints: [
                    "🛡️ Firewall rules are stateful: if an inbound request is permitted ingress, the response outbound traffic is automatically allowed.",
                    "🔢 Priority numbers range from 0 (highest priority) to 65535 (lowest priority default deny).",
                    "👥 Service Accounts are more secure target identifiers than Network Tags because IAM controls who can attach service accounts."
                ],
                gotcha: "Firewall rules are stateful! If traffic is permitted ingress, response egress traffic is automatically allowed regardless of egress deny rules."
            }
        ]
    },
    operations: {
        title: "📊 Cloud Operations & Monitoring Suite",
        subtitle: "Observability, logging commands, alert policies, and performance tracing gotchas.",
        flowchart: {
            title: "Operations Suite Lifecycle Flow",
            steps: [
                { label: "Cloud Logging (Centralize & Filter Logs)", color: "#4285F4" },
                { label: "Log Sinks (Export to BigQuery or GCS)", color: "#34A853" },
                { label: "Cloud Monitoring (Metrics & Alerting)", color: "#FBBC05" },
                { label: "Cloud Trace & Profiler (Latency Optimization)", color: "#8ab4f8" }
            ]
        },
        services: [
            {
                name: "Cloud Logging & Log Sinks",
                badge: "Centralized Logs",
                color: "#4285F4",
                useCase: "Ingesting system logs, application console logs, and audit records across all GCP resources.",
                uniqueFeature: "Log Sinks allow exporting filtered log streams in real-time to Cloud Storage (long-term archive), BigQuery (SQL analytics), or Pub/Sub (SIEM alert triggers).",
                whenToUse: "Always create an aggregated Log Sink at the Organization level to capture compliance logs centrally.",
                command: "gcloud logging sinks create my-bq-sink bigquery.googleapis.com/projects/my-proj/datasets/audit_logs --log-filter='severity>=ERROR'",
                keyPoints: [
                    "🆓 Admin Activity audit logs are enabled by default, free of charge, and retained for 400 days.",
                    "📊 Data Access audit logs record user reads/writes (like querying BigQuery or reading GCS objects) and incur ingestion charges.",
                    "🎯 Exclusion filters allow dropping noisy informational debug logs before ingestion to save billing costs."
                ],
                gotcha: "Admin Activity audit logs are free and retained for 400 days; Data Access logs can generate massive volume and incur storage charges."
            },
            {
                name: "Cloud Monitoring",
                badge: "Metrics & Alerts",
                color: "#34A853",
                useCase: "Tracking CPU utilization, disk read/write IOPS, network throughput, and custom application metrics.",
                uniqueFeature: "Supports Alerting Policies configured with notification channels (Email, Slack, SMS, Webhooks, PagerDuty).",
                whenToUse: "Install the Ops Agent on Compute Engine VMs to collect detailed system memory metrics and third-party application logs.",
                command: "curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh && sudo bash add-google-cloud-ops-agent-repo.sh --also-install",
                keyPoints: [
                    "⚠️ By default, Compute Engine only reports CPU, network, and disk metrics. Memory (RAM) requires the Ops Agent installed!",
                    "📈 Uptime Checks ping HTTP/HTTPS/TCP endpoints globally from multiple locations to verify public availability.",
                    "🔔 Alerting policies trigger notifications when metrics cross threshold conditions for a specified duration window."
                ],
                gotcha: "By default, Compute Engine only reports CPU and disk metrics. Memory (RAM) utilization requires the Ops Agent installed!"
            },
            {
                name: "Cloud Trace",
                badge: "Distributed Tracing",
                color: "#FBBC05",
                useCase: "Inspecting request latency bottlenecks across multi-tier microservices and serverless architectures.",
                uniqueFeature: "Collects latency trace data from HTTP requests passing through load balancers, Cloud Run, and database calls.",
                whenToUse: "Use Cloud Trace when debugging why a specific API endpoint or user checkout flow is experiencing slow response times.",
                command: "gcloud trace reports list --limit=10",
                keyPoints: [
                    "🧵 Generates waterfall latency graphs showing exact timing spans for every microservice step in a transaction flow.",
                    "🔗 Trace headers (`X-Cloud-Trace-Context`) must be propagated across HTTP requests to stitch distributed spans together.",
                    "🤖 Natively integrated with Cloud Run, App Engine, and GKE Ingress controllers."
                ],
                gotcha: "Trace headers (`X-Cloud-Trace-Context`) must be propagated across service calls to stitch distributed spans together."
            },
            {
                name: "Cloud Profiler",
                badge: "Continuous Profiling",
                color: "#8ab4f8",
                useCase: "Identifying resource-intensive functions consuming excessive CPU cycles or heap memory allocation in production.",
                uniqueFeature: "Uses statistical sampling to analyze running application code with virtually zero CPU overhead (<1%).",
                whenToUse: "Use Profiler to optimize cloud infrastructure costs by discovering inefficiencies in server code logic.",
                command: "npm install @google-cloud/profiler # (Then require inside Node.js startup script)",
                keyPoints: [
                    "🔥 Generates interactive Flame Graphs visualizing which function calls consume the most CPU time or memory allocations.",
                    "⚡ Low-overhead statistical sampling (<1% CPU impact) makes it safe to run continuously in live production environments.",
                    "🛠️ Supports Java, Python, Go, and Node.js applications deployed on VMs, GKE, or Cloud Run."
                ],
                gotcha: "Supported across Java, Python, Go, and Node.js. Works across GKE, Compute Engine, and serverless containers."
            },
            {
                name: "Error Reporting",
                badge: "Exception Tracking",
                color: "#EA4335",
                useCase: "Aggregating and deduplicating application crashes, unhandled exceptions, and stack traces.",
                uniqueFeature: "Automatically groups similar errors and notifies developers instantly when a new crash spike occurs.",
                whenToUse: "Integrate Error Reporting SDKs into web backends to maintain real-time visibility into production stability.",
                command: "gcloud error-reporting events report --message='CRITICAL: Database connection pool exhausted' --service=payment-svc",
                keyPoints: [
                    "🚨 Automatically groups identical stack traces into single error tracking tickets to prevent notification fatigue.",
                    "📬 Sends instant email alerts when a newly introduced software version triggers a new crash spike.",
                    "📜 Recognizes standard JSON log formats containing `@type: type.googleapis.com/google.devtools.clouderrorreporting...`."
                ],
                gotcha: "Relies on formatted JSON logs or dedicated exception API calls to recognize stack trace line numbers correctly."
            }
        ]
    }
};
