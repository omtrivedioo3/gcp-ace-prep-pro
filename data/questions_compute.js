/* ==========================================================================
   Question Bank Part 2: Compute Engine, GKE & Cloud Run (Questions 61 - 120)
   ========================================================================== */

window.QUESTION_BANK = window.QUESTION_BANK || [];

window.QUESTION_BANK.push(
    {
        id: 61,
        topic: "compute",
        difficulty: "Medium",
        question: "You have deployed a fault-tolerant batch processing application on Compute Engine. The workload can tolerate interruptions and runs intermittently throughout the night. You want to minimize compute costs by up to 91%. Which VM configuration should you choose?",
        options: [
            "Reserved VM instances with a 3-year committed use discount.",
            "Spot VMs (formerly Preemptible VMs).",
            "Sole-tenant nodes configured in automatic restart mode.",
            "E2 shared-core micro instances with persistent SSDs."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Spot VMs offer deep discounts (up to 91% compared to standard on-demand rates) for workloads that can withstand compute preemptions when Google Cloud requires capacity elsewhere.<br><br>⚖️ <strong>Service Comparison:</strong> Committed Use Discounts require 1-3 year contract commitments for steady workloads. Spot VMs offer steeper savings without contracts for fault-tolerant batch tasks."
    },
    {
        id: 62,
        topic: "compute",
        difficulty: "Hard",
        question: "Your containerized stateless API experiences sudden, unpredictable spikes in traffic from zero to 10,000 requests per second. You need a managed serverless platform that automatically scales instances up and scales down to zero when idle to save billing costs. Which compute option is most suitable?",
        options: [
            "Google Kubernetes Engine (GKE) Standard Cluster with static node pools.",
            "Compute Engine Managed Instance Group with CPU utilization autoscaling.",
            "Cloud Run fully managed environment.",
            "App Engine Flexible environment configured with manual scaling."
        ],
        correctAnswer: 2,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run is Google Cloud's premier serverless container platform. It automatically scales stateless containerized apps out to handle concurrency spikes and scales down to zero instances during idle periods.<br><br>⚖️ <strong>Service Comparison:</strong> GKE Standard and Compute Engine MIGs maintain baseline VM running costs even when idle. Cloud Run bills down to the 100-millisecond increment only during request handling."
    },
    {
        id: 63,
        topic: "compute",
        difficulty: "Medium",
        question: "You need to execute a custom bash script automatically every time a Compute Engine instance boots up to install monitoring agents and fetch configuration files from Cloud Storage. How should you pass this script during VM creation?",
        options: [
            "Pass the script file path via the --metadata startup-script parameter in gcloud.",
            "Connect via SSH after creation and append the script to /etc/crontab.",
            "Create an IAM OS Login profile with executable script tags.",
            "Format the script as a Cloud Function and link it to the VM's internal IP."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Using <code>--metadata startup-script=[SCRIPT]</code> instructs the Compute Engine guest environment to execute initialization instructions automatically on every boot cycle.<br><br>⚖️ <strong>Service Comparison:</strong> Startup scripts execute automatically with root privileges during provisioning, eliminating manual post-deployment SSH configuration steps."
    },
    {
        id: 64,
        topic: "compute",
        difficulty: "Hard",
        question: "You are managing a GKE cluster running microservices. During peak business hours, memory utilization across application pods increases significantly, causing out-of-memory crash loops. Which Kubernetes controller should you implement to automatically adjust pod CPU and memory resource requests based on historical usage?",
        options: [
            "Horizontal Pod Autoscaler (HPA)",
            "Vertical Pod Autoscaler (VPA)",
            "Cluster Autoscaler (CA)",
            "Node Auto-Provisioning (NAP)"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Vertical Pod Autoscaler (VPA) analyzes historical resource consumption and automatically adjusts CPU and memory resource requests/limits for container pods, preventing OOM evictions.<br><br>⚖️ <strong>Service Comparison:</strong> HPA scales pod *replica counts* horizontally when load spikes. VPA scales individual pod *memory/CPU allocations* vertically."
    },
    {
        id: 65,
        topic: "compute",
        difficulty: "Easy",
        question: "What is the primary architectural difference between Google Kubernetes Engine (GKE) Autopilot mode and GKE Standard mode?",
        options: [
            "Autopilot supports only Windows server containers, while Standard supports Linux containers.",
            "In Autopilot mode, Google fully manages worker nodes, cluster infrastructure, and scaling, billing per pod resource request; in Standard mode, you manage node pools and pay for VM capacity.",
            "Standard mode requires manual kubectl installations, whereas Autopilot removes the need for kubectl API commands.",
            "Autopilot clusters cannot connect to VPC networks or Cloud Storage."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> GKE Autopilot abstracts underlying infrastructure management. Google provisions, scales, patches, and secures node worker pools automatically, billing purely for pod compute requests.<br><br>⚖️ <strong>Service Comparison:</strong> GKE Standard offers OS-level node customization and billing per VM node. Autopilot enforces production hardening and bills per requested pod CPU/memory."
    },
    {
        id: 66,
        topic: "compute",
        difficulty: "Medium",
        question: "You need to deploy a managed instance group (MIG) across multiple zones in the us-central1 region to guarantee high availability. Which MIG distribution shape policy ensures instances are spread evenly across all available zones?",
        options: [
            "BALANCED distribution shape",
            "EVEN distribution shape",
            "ANY distribution shape",
            "TARGET_POOL distribution shape"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> The <code>EVEN</code> target distribution shape forces the regional Managed Instance Group to maintain an identical number of VM instances across all specified zones.<br><br>⚖️ <strong>Service Comparison:</strong> <code>EVEN</code> distribution guarantees strict zone symmetry during outages. <code>BALANCED</code> distributes workloads across zones while permitting minor temporary imbalances during autoscaling events."
    },
    {
        id: 67,
        topic: "compute",
        difficulty: "Hard",
        question: "You are preparing a live update for a mission-critical web application hosted on a Managed Instance Group. You want to update the underlying instance template without dropping active user connections or causing downtime. Which rolling update strategy should you select?",
        options: [
            "Proactive rolling update with maxSurge set to 1 and maxUnavailable set to 0.",
            "Opportunistic update with automatic instance reboot enabled.",
            "Delete all existing VM instances simultaneously and let autoscaler recreate them.",
            "Execute gcloud compute instances reset on each VM sequentially."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Setting <code>maxSurge > 0</code> and <code>maxUnavailable = 0</code> ensures the updater spins up new instances running the updated template before draining and terminating old instances, guaranteeing zero capacity drop.<br><br>⚖️ <strong>Service Comparison:</strong> Proactive updates immediately rollout changes across instances. Opportunistic updates wait passively until instances are recreated for other reasons."
    },
    {
        id: 68,
        topic: "compute",
        difficulty: "Medium",
        question: "A microservice deployed on Cloud Run requires concurrent execution where up to 80 incoming HTTP requests are processed simultaneously within a single container instance. How should you configure this?",
        options: [
            "Set the --concurrency parameter flag to 80 during gcloud run deploy.",
            "Create 80 separate Cloud Run revisions and put them behind an HTTP load balancer.",
            "Modify the Dockerfile ENTRYPOINT to fork 80 background worker daemons.",
            "Cloud Run supports only 1 request per container instance; concurrency cannot be altered."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run supports container concurrency up to 1000 simultaneous requests per instance (default is 80). Configuring <code>--concurrency=80</code> optimizes hardware efficiency and minimizes cold starts.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Functions (1st gen) process exactly 1 request per instance. Cloud Run processes up to 1000 concurrent requests per instance, dramatically lowering container spawning overhead."
    },
    {
        id: 69,
        topic: "compute",
        difficulty: "Easy",
        question: "Which gcloud command scales an existing deployment named 'frontend-web' in a GKE cluster to 5 replica pods?",
        options: [
            "kubectl scale deployment frontend-web --replicas=5",
            "gcloud container clusters scale frontend-web --nodes=5",
            "gcloud compute instance-groups managed resize frontend-web --size=5",
            "kubectl autoscale deployment frontend-web --min=5 --max=5"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Kubernetes workloads inside GKE are managed via the standard Kubernetes CLI: <code>kubectl scale deployment [NAME] --replicas=[COUNT]</code>.<br><br>⚖️ <strong>Service Comparison:</strong> <code>kubectl scale</code> adjusts container pod replica counts within Kubernetes. <code>gcloud container clusters resize</code> adjusts the underlying physical VM worker node pool counts."
    },
    {
        id: 70,
        topic: "compute",
        difficulty: "Hard",
        question: "You host an application on App Engine Standard environment. Due to compliance mandates, the application must connect privately to an on-premises Oracle database over Cloud VPN without traversing the public internet. What network component should you configure?",
        options: [
            "Serverless VPC Access connector",
            "Cloud NAT public IP gateway",
            "App Engine firewall rules enabling port 1521",
            "External HTTP(S) Load Balancer with NEGs"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> A Serverless VPC Access connector enables serverless environments (App Engine Standard, Cloud Run, Cloud Functions) to send internal traffic directly into your VPC network, reaching private IPs across Cloud VPN or Interconnect.<br><br>⚖️ <strong>Service Comparison:</strong> Serverless VPC Access bridges serverless platforms into private internal VPC subnets. Cloud NAT routes private internal instances out to the public internet."
    },
    {
        id: 71,
        topic: "compute",
        difficulty: "Medium",
        question: "You need to guarantee physical isolation for your virtual machines due to compliance requirements requiring that no other GCP customer shares the same physical server hardware. What compute feature should you use?",
        options: [
            "Sole-tenant nodes",
            "Shielded VMs",
            "Confidential VMs",
            "Preemptible VMs"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Sole-tenant nodes provide dedicated physical server hardware exclusively for your project, isolating your VMs from other Google Cloud customers for regulatory compliance.<br><br>⚖️ <strong>Service Comparison:</strong> Shielded VMs protect bootloader integrity against rootkits. Confidential VMs encrypt memory during processing. Sole-tenant nodes provide dedicated physical server hardware isolation."
    },
    {
        id: 72,
        topic: "compute",
        difficulty: "Medium",
        question: "You want to protect boot disks against kernel rootkits and bootloader tampering. Which VM security configuration verifies digital signatures of boot components at startup?",
        options: [
            "Shielded VMs with Secure Boot enabled.",
            "Customer-Supplied Encryption Keys (CSEK).",
            "VPC Service Controls bridge perimeter.",
            "OS Login IAM enforcement."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Shielded VMs leverage cryptographic features such as Secure Boot, Virtual Trusted Platform Module (vTPM), and integrity monitoring to defend against boot-level malware.<br><br>⚖️ <strong>Service Comparison:</strong> CSEK encrypts disk blocks at rest. Secure Boot cryptographically validates OS bootloader digital signatures before kernel initialization."
    },
    {
        id: 73,
        topic: "compute",
        difficulty: "Hard",
        question: "An application running on a Compute Engine instance experiences occasional disk I/O bottlenecks during heavy database writes. The instance currently uses a 100 GB Standard Persistent Disk (pd-standard). How can you increase the disk throughput and IOPS without rebuilding the instance?",
        options: [
            "Resize the persistent disk to a larger capacity (e.g. 500 GB or 1 TB) or change the disk type to SSD (pd-ssd), as persistent disk IOPS scale directly with disk size.",
            "Enable hyper-threading in the VM OS metadata.",
            "Format the persistent disk with FAT32 filesystem.",
            "Create an external network load balancer pointing to the disk."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Performance (IOPS and throughput) of Google Cloud Persistent Disks scales dynamically based on disk capacity and disk tier. Increasing disk size or migrating to SSD elevates I/O capacity immediately.<br><br>⚖️ <strong>Service Comparison:</strong> Standard persistent disks (`pd-standard`) provide economical HDD sequential storage. SSD persistent disks (`pd-ssd`) provide high-IOPS random access performance."
    },
    {
        id: 74,
        topic: "compute",
        difficulty: "Easy",
        question: "Which compute platform allows you to run event-driven snippets of code (Node.js, Python, Go) in response to Cloud Storage object creation or Pub/Sub messages without provisioning servers or containers?",
        options: [
            "Cloud Functions",
            "Compute Engine unmanaged instance groups",
            "Google Kubernetes Engine bare-metal",
            "Cloud Dataproc cluster"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Functions is Google's event-driven serverless Functions-as-a-Service (FaaS) platform designed for lightweight single-purpose code triggers.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Run executes custom container packages with arbitrary binaries. Cloud Functions deploys source code snippets directly against pre-packaged language runtimes."
    },
    {
        id: 75,
        topic: "compute",
        difficulty: "Medium",
        question: "You need to capture an exact point-in-time state of a persistent disk to create backup clones or transfer data to another zone. What compute resource should you create?",
        options: [
            "Persistent Disk Snapshot",
            "VPC Flow Log archive",
            "Instance template boot manifest",
            "Cloud Storage lifecycle object"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Persistent Disk Snapshots create incremental point-in-time backups of disk volumes, allowing rapid restore or duplication across zones.<br><br>⚖️ <strong>Service Comparison:</strong> Machine Images capture multiple attached disks plus VM metadata simultaneously. Disk Snapshots capture individual block volumes incrementally."
    },
    {
        id: 76,
        topic: "compute",
        difficulty: "Hard",
        question: "In GKE, you want to ensure that specific database pods are always scheduled onto dedicated memory-optimized nodes, preventing general web application pods from consuming that hardware. What Kubernetes feature should you configure?",
        options: [
            "Taints and Tolerations on the nodes and pods.",
            "Horizontal Pod Autoscaler target CPU limits.",
            "VPC native pod IP aliasing ranges.",
            "Kubernetes ClusterRoleBinding ingress policies."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Applying a Taint to a node repels all pods that do not possess a matching Toleration, ensuring dedicated hardware isolation for specialized database container workloads.<br><br>⚖️ <strong>Service Comparison:</strong> NodeAffinity attracts pods toward specific labeled nodes. Taints repulse unqualified pods away from specialized nodes."
    },
    {
        id: 77,
        topic: "compute",
        difficulty: "Medium",
        question: "You want to automate the OS patching process across 200 Linux VM instances running in Compute Engine without logging into each machine manually. Which Google Cloud service orchestrates this?",
        options: [
            "VM Manager (OS Patch Management service)",
            "Cloud Deployment Manager YAML scripts",
            "Google Cloud Directory Sync daemon",
            "App Engine traffic splitting router"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VM Manager offers automated OS Patch Management, OS Inventory Management, and OS Configuration Management across fleets of Compute Engine VM instances.<br><br>⚖️ <strong>Service Comparison:</strong> VM Manager automates OS maintenance inside running VMs. Deployment Manager provisions the underlying VM compute resources."
    },
    {
        id: 78,
        topic: "compute",
        difficulty: "Easy",
        question: "Can you change the machine type (e.g. from e2-medium to n2-standard-4) of a running Compute Engine instance without restarting it?",
        options: [
            "No, the instance must first be stopped (powered off) before altering its machine type.",
            "Yes, machine type changes take effect instantly while the OS is running.",
            "Yes, but only if the VM has a local SSD attached.",
            "No, machine types are permanently locked upon initial creation."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> To change CPU or RAM allocations (machine type), the VM instance must be put into the `TERMINATED` (stopped) state before applying the alteration.<br><br>⚖️ <strong>Service Comparison:</strong> Persistent disk storage sizing can be expanded dynamically while VMs run. CPU/RAM machine type modifications require stopping the instance."
    },
    {
        id: 79,
        topic: "compute",
        difficulty: "Hard",
        question: "Your containerized web service deployed on Cloud Run receives traffic from external clients. You want to route 10% of production traffic to a new experimental revision (v2) while keeping 90% on the stable revision (v1). How can you configure this?",
        options: [
            "Use Cloud Run Traffic Splitting in the console or gcloud CLI to allocate percentage tags (90% to v1, 10% to v2).",
            "Deploy two separate load balancers with different DNS A records.",
            "Create a Kubernetes ingress rule inside Cloud Run console.",
            "Modify the client mobile app to randomly select between two endpoints."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run natively features built-in Traffic Splitting, enabling fine-grained canary deployments and A/B testing across multiple service revisions.<br><br>⚖️ <strong>Service Comparison:</strong> Traffic splitting in Cloud Run or App Engine routes percentages natively without requiring complex external load balancer configurations."
    },
    {
        id: 80,
        topic: "compute",
        difficulty: "Medium",
        question: "Which gcloud command creates a new Compute Engine virtual machine named `web-server` in zone `us-central1-a` using an `e2-medium` machine type?",
        options: [
            "gcloud compute instances create web-server --zone=us-central1-a --machine-type=e2-medium",
            "gcloud compute vms start web-server --region=us-central1 --type=e2-medium",
            "gcloud container clusters create web-server --zone=us-central1-a",
            "gcloud run deploy web-server --instance-type=e2-medium"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>gcloud compute instances create [NAME] --zone=[ZONE] --machine-type=[TYPE]</code> is the foundational command for provisioning VM instances.<br><br>⚖️ <strong>Service Comparison:</strong> <code>compute instances create</code> provisions virtual machines. <code>container clusters create</code> provisions Kubernetes orchestration clusters."
    },
    {
        id: 81,
        topic: "compute",
        difficulty: "Hard",
        question: "You have a GKE cluster running VPC-native networking. You notice that newly created pods are stuck in `Pending` state with errors indicating that IP addresses cannot be allocated. What should you check first?",
        options: [
            "Check if the secondary IP range assigned for Pods in the VPC subnet has exhausted all available IP addresses.",
            "Verify whether Cloud NAT is configured on the master node.",
            "Check if the cluster has enabled legacy ABAC authentication.",
            "Restart the local computer Docker daemon."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> In VPC-native GKE clusters, pods receive IP addresses directly from a secondary CIDR range on the VPC subnet. If this secondary range is exhausted, new pods cannot be scheduled.<br><br>⚖️ <strong>Service Comparison:</strong> Routes-based GKE clusters allocate pod IPs from internal routing tables. VPC-native clusters allocate pod IPs directly from secondary VPC subnet CIDRs."
    },
    {
        id: 82,
        topic: "compute",
        difficulty: "Medium",
        question: "What is the key characteristic of App Engine Flexible environment compared to App Engine Standard environment?",
        options: [
            "App Engine Flexible runs containers on Compute Engine virtual machines, supporting custom runtimes, background threads, and persistent disk access.",
            "App Engine Flexible scales down to zero instances instantly and charges per millisecond.",
            "App Engine Flexible does not support custom domain SSL certificates.",
            "App Engine Flexible restricts coding languages strictly to Python 2.7 and Java 8."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> App Engine Flexible provisions containerized workloads running on Compute Engine VMs, offering flexibility for custom Docker runtimes and background tasks.<br><br>⚖️ <strong>Service Comparison:</strong> App Engine Standard starts instances in milliseconds and scales to zero when idle. App Engine Flexible takes minutes to start new VMs and requires at least 1 running instance."
    },
    {
        id: 83,
        topic: "compute",
        difficulty: "Easy",
        question: "You want to ensure that if a physical hardware failure occurs on the Google host machine running your VM, Compute Engine automatically moves your VM to healthy host hardware without terminating the OS session. What setting governs this behavior?",
        options: [
            "On Host Maintenance set to Migrate VM instances (Live Migration).",
            "Preemptible VM toggle enabled.",
            "Automatic Restart set to False.",
            "Shielded VM vTPM validation."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Google Cloud Live Migration keeps VM instances running across host software updates and hardware failures by transparently transferring memory state to alternate host hardware.<br><br>⚖️ <strong>Service Comparison:</strong> Automatic Restart reboots a VM after it crashes. Live Migration transparently moves running VMs without dropping active memory sessions."
    },
    {
        id: 84,
        topic: "compute",
        difficulty: "Medium",
        question: "A high-performance computing (HPC) financial simulation requires 64 physical CPU cores and low inter-node latency. You want all VMs deployed close to each other in the same physical server rack. Which placement policy should you use?",
        options: [
            "Compact Resource Placement Policy",
            "Spread Resource Placement Policy",
            "Regional Managed Instance Group balanced shape",
            "Multi-zone Sole Tenant node deployment"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> A Compact placement policy forces Compute Engine to place virtual machines in close physical proximity within the same network fabric cluster to minimize inter-VM network latency.<br><br>⚖️ <strong>Service Comparison:</strong> Spread placement separates VMs across distinct hardware racks for high availability. Compact placement colocates VMs in the same rack for ultra-low latency HPC."
    },
    {
        id: 85,
        topic: "compute",
        difficulty: "Hard",
        question: "You want to expose a Kubernetes service inside your GKE cluster to external internet users using a Google Cloud External HTTP(S) Load Balancer. What type of Kubernetes service resource should you create?",
        options: [
            "Service of type ClusterIP paired with an Ingress object.",
            "Service of type NodePort with no Ingress.",
            "Service of type ExternalName pointing to 127.0.0.1.",
            "Pod Disruption Budget manifest."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Creating a Kubernetes Ingress object backed by a ClusterIP or NodePort service triggers GKE's Ingress Controller to automatically provision an External HTTP(S) Load Balancer.<br><br>⚖️ <strong>Service Comparison:</strong> Service type <code>LoadBalancer</code> creates a Layer 4 Network Load Balancer. An <code>Ingress</code> object creates a Layer 7 HTTP(S) Load Balancer with URL path routing."
    },
    {
        id: 86,
        topic: "compute",
        difficulty: "Medium",
        question: "You are building a custom instance template for a Managed Instance Group. You want the instances to automatically install the latest application code from a git repository upon startup. Where should you define this behavior in the instance template?",
        options: [
            "In the Metadata section using the key `startup-script`.",
            "In the VPC firewall rules tags field.",
            "Inside the IAM service account permission bindings.",
            "In the persistent disk encryption configuration."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Startup scripts defined in instance metadata execute automatically with root privileges during the boot cycle of every instance spawned by the MIG.<br><br>⚖️ <strong>Service Comparison:</strong> Custom metadata keys store arbitrary application strings. The specific `startup-script` metadata key triggers automated execution during boot."
    },
    {
        id: 87,
        topic: "compute",
        difficulty: "Easy",
        question: "Which compute option charges exclusively for actual execution time down to the 100-millisecond increment, completely eliminating costs when no incoming traffic exists?",
        options: [
            "Cloud Functions and Cloud Run",
            "Compute Engine dedicated instances",
            "GKE Standard Cluster node pools",
            "Sole-tenant reserved nodes"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Serverless offerings like Cloud Run and Cloud Functions scale to zero when idle and meter compute billing solely during active request processing.<br><br>⚖️ <strong>Service Comparison:</strong> Serverless computes bill strictly for active request processing duration. Standard virtual machines bill continuously as long as they remain powered on."
    },
    {
        id: 88,
        topic: "compute",
        difficulty: "Hard",
        question: "You deploy a microservice on Cloud Run that processes background video conversion tasks taking up to 45 minutes per request. However, requests terminate abruptly after 15 minutes. What is causing this failure?",
        options: [
            "Cloud Run request timeout parameter is exceeding the maximum allowable timeout limit (which defaults to 5 minutes and caps at 60 minutes).",
            "Cloud Run does not support container CPU allocations exceeding 1 core.",
            "VPC Service Controls automatically kill connections older than 10 minutes.",
            "App Engine flexible firewall rules block long polling."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run HTTP request timeouts default to 300 seconds (5 mins). For long-running tasks, you must explicitly increase `--timeout` up to the 3600-second (60 mins) limit.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Functions 1st gen timeout caps at 9 minutes. Cloud Run supports prolonged request timeouts up to 60 minutes."
    },
    {
        id: 89,
        topic: "compute",
        difficulty: "Medium",
        question: "How can you securely connect to a private Compute Engine VM (no external IP) from the Google Cloud Console web interface without configuring VPN or bastion hosts?",
        options: [
            "Use IAP (Identity-Aware Proxy) Desktop TCP forwarding / SSH in browser.",
            "Enable FTP port 21 in VPC firewall.",
            "Temporarily attach a public static IPv4 address.",
            "Email the root password to project administrators."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> IAP TCP forwarding tunneling allows authenticated IAM principals to establish encrypted SSH or RDP sessions directly from the browser to private internal VMs.<br><br>⚖️ <strong>Service Comparison:</strong> Bastion host jump-boxes require paying for an extra running VM and exposing external ssh ports. IAP establishes secure tunneling without external IPs."
    },
    {
        id: 90,
        topic: "compute",
        difficulty: "Easy",
        question: "What is the purpose of a Kubernetes Namespace within a GKE cluster?",
        options: [
            "To logically isolate cluster resources, quotas, and access control between different teams or environments (e.g. dev vs prod) within the same physical cluster.",
            "To encrypt network traffic traversing public internet cables.",
            "To create hardware partitions across distinct geographical data centers.",
            "To substitute for Google Cloud IAM billing projects."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Kubernetes namespaces provide virtual cluster partitioning inside a single GKE cluster, enabling resource quotas and role-based access isolation.<br><br>⚖️ <strong>Service Comparison:</strong> GCP Projects isolate cloud billing and IAM hierarchies. Kubernetes Namespaces isolate microservice applications inside a single GKE cluster."
    },
    {
        id: 91,
        topic: "compute",
        difficulty: "Hard",
        question: "You want to automate autoscaling of a Managed Instance Group based on a custom metric published to Cloud Monitoring (e.g. active queue message depth in Pub/Sub). How should you configure the autoscaler?",
        options: [
            "Select 'Monitoring metric' autoscaling signal and specify the custom metric identifier and target utilization threshold.",
            "MIG autoscaling supports only CPU utilization; custom metrics cannot be used.",
            "Write a cron job on a separate VM to execute gcloud resize commands every minute.",
            "Configure a horizontal pod autoscaler inside Cloud Storage."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Compute Engine Managed Instance Groups natively support autoscaling based on standard CPU metrics, load balancing serving capacity, or arbitrary custom metrics streamed into Cloud Monitoring.<br><br>⚖️ <strong>Service Comparison:</strong> CPU autoscaling triggers when processor utilization climbs. Custom metric autoscaling scales proactively based on external business queues before CPU spikes."
    },
    {
        id: 92,
        topic: "compute",
        difficulty: "Medium",
        question: "You need to run a containerized app on Compute Engine without installing and managing Kubernetes clusters. How can you deploy a container directly onto a VM?",
        options: [
            "Specify a container image URL (e.g. from Artifact Registry) during VM creation using the Container-Optimized OS.",
            "You cannot run containers on Compute Engine; you must use GKE or Cloud Run.",
            "Format the Dockerfile as a Windows `.exe` installer.",
            "Upload the container image into Cloud SQL storage."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Compute Engine supports deploying containers directly onto VMs running Google's lightweight Container-Optimized OS image via the `--container-image` flag.<br><br>⚖️ <strong>Service Comparison:</strong> Container-Optimized OS provides a minimal Linux OS optimized strictly for running Docker containers on single VMs without Kubernetes clustering overhead."
    },
    {
        id: 93,
        topic: "compute",
        difficulty: "Easy",
        question: "Which gcloud command lists all running container clusters in your default project?",
        options: [
            "gcloud container clusters list",
            "gcloud compute instances list",
            "gcloud run services list",
            "kubectl get pods --all-namespaces"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>gcloud container clusters list</code> displays all provisioned GKE clusters along with their location, master version, and operational status.<br><br>⚖️ <strong>Service Comparison:</strong> <code>container clusters list</code> queries GKE cluster management API. <code>kubectl get clusters</code> is invalid because Kubernetes manages pods/services inside a cluster, not parent clusters."
    },
    {
        id: 94,
        topic: "compute",
        difficulty: "Hard",
        question: "You want to ensure zero data loss when terminating a stateful VM instance. You need the persistent disk to remain intact even after the VM instance is deleted. What disk property should you check?",
        options: [
            "Ensure the disk auto-delete property is set to false (disabled).",
            "Set the disk encryption key to public rotation mode.",
            "Format the disk as an ephemeral local RAM drive.",
            "Enable Spot VM preemption protection."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> By default, boot disks have `auto-delete=true`. To preserve persistent data volumes upon VM instance deletion, uncheck or configure `auto-delete=false`.<br><br>⚖️ <strong>Service Comparison:</strong> Ephemeral Local SSDs are permanently erased when VMs terminate. Persistent Disks with `auto-delete=false` persist independently beyond VM deletion."
    },
    {
        id: 95,
        topic: "compute",
        difficulty: "Medium",
        question: "You are designing a disaster recovery architecture for a Managed Instance Group. If an entire Google Cloud zone goes offline, how does a Regional Managed Instance Group respond?",
        options: [
            "It automatically redistributes and launches replacement VM instances in remaining healthy zones within the same region.",
            "It deletes all backups across the organization.",
            "It pauses serving traffic for 24 hours until manual override occurs.",
            "It migrates the VPC network to AWS automatically."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Regional MIGs provide multi-zone high availability. If one zone suffers an outage, the autoscaler automatically provisions capacity in remaining active zones.<br><br>⚖️ <strong>Service Comparison:</strong> Zonal MIGs are confined to a single availability zone. Regional MIGs span multiple zones across a region for automated disaster failover."
    },
    {
        id: 96,
        topic: "compute",
        difficulty: "Medium",
        question: "What is the recommended artifact repository service in Google Cloud for storing, scanning, and managing container images and OCI artifacts?",
        options: [
            "Artifact Registry (the successor to Container Registry)",
            "Google Drive shared folder",
            "Cloud Storage Nearline cold archive",
            "Memorystore caching bucket"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Artifact Registry is Google Cloud's fully managed universal package manager and container image repository, providing IAM integration and vulnerability scanning.<br><br>⚖️ <strong>Service Comparison:</strong> Container Registry (`gcr.io`) is deprecated in favor of Artifact Registry (`pkg.dev`), which supports standard Maven, npm, Python, and Docker packages."
    },
    {
        id: 97,
        topic: "compute",
        difficulty: "Hard",
        question: "A developer complains that their Cloud Run container crashes on startup with the error `Container failed to listen on port`. What universal requirement must Cloud Run containers satisfy?",
        options: [
            "The web server inside the container must listen for incoming HTTP requests on the port defined by the `$PORT` environment variable.",
            "The container must open UDP port 53 for DNS signing.",
            "The container must run as the root operating system user.",
            "The Dockerfile must include an SSH daemon on port 22."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run dynamically injects the `$PORT` environment variable (typically 8080) at runtime. Container applications must bind to this exact port to receive traffic.<br><br>⚖️ <strong>Service Comparison:</strong> GKE containers can expose any port specified in service manifests. Cloud Run requires web servers to bind dynamically to the `$PORT` environment variable."
    },
    {
        id: 98,
        topic: "compute",
        difficulty: "Easy",
        question: "Which feature allows you to clone the hardware specs, OS image, startup scripts, and labels of an existing VM to rapidly create duplicate instances?",
        options: [
            "Create instance template or 'Create similar' machine cloning option.",
            "Cloud NAT routing mirror.",
            "VPC subnet range splitting.",
            "App Engine version promotion."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Compute Engine allows capturing existing VM configurations into reusable Instance Templates or using the 'Create similar' action in the console.<br><br>⚖️ <strong>Service Comparison:</strong> Snapshots clone raw disk block volumes. Instance Templates clone complete VM compute specs, metadata, and disk blueprints."
    },
    {
        id: 99,
        topic: "compute",
        difficulty: "Medium",
        question: "What is the purpose of Kubernetes ConfigMaps and Secrets in GKE?",
        options: [
            "To decouple configuration variables, passwords, and API keys from container image code, allowing dynamic injection into running pods.",
            "To encrypt network packets traversing VPC routers.",
            "To compress video file uploads inside Cloud Storage.",
            "To assign billing IAM roles to external auditors."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> ConfigMaps store non-confidential key-value pairs, while Secrets store sensitive data (tokens/keys), keeping container images portable across environments.<br><br>⚖️ <strong>Service Comparison:</strong> Hardcoding config in Docker images forces rebuilding containers for every environment change. ConfigMaps inject environment variables dynamically at pod boot."
    },
    {
        id: 100,
        topic: "compute",
        difficulty: "Hard",
        question: "You want to run high-throughput machine learning inference models on Compute Engine. Which specialized hardware accelerator can you attach to your VM instances?",
        options: [
            "NVIDIA GPUs or Google Cloud TPUs (Tensor Processing Units)",
            "Local SSD RAM drives only",
            "Cloud DNS caching nodes",
            "Cloud Router BGP AS chips"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Google Cloud supports attaching high-performance NVIDIA graphics processing units (GPUs) and proprietary Tensor Processing Units (TPUs) to accelerate AI/ML workloads.<br><br>⚖️ <strong>Service Comparison:</strong> Standard CPUs excel at sequential logic computation. GPUs and TPUs excel at massively parallel matrix multiplication required for deep neural networks."
    },
    {
        id: 101,
        topic: "compute",
        difficulty: "Medium",
        question: "You need a dynamic way of provisioning VMs on Compute Engine where exact hardware specifications are declared in a dedicated configuration file following Google best practices. Which method should you use?",
        options: [
            "Deployment Manager or Terraform declarative IaC manifests.",
            "Cloud Composer Apache Airflow workflows.",
            "Manual ClickOps in Cloud Console.",
            "App Engine Cron scheduled triggers."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Infrastructure as Code tools (Terraform / Deployment Manager) provision immutable infrastructure dynamically based on version-controlled manifest files.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Composer orchestrates data processing workflows (ETL). Terraform/Deployment Manager orchestrates cloud infrastructure resource provisioning."
    },
    {
        id: 102,
        topic: "compute",
        difficulty: "Hard",
        question: "You need to set up permissions for a set of Compute Engine instances to enable them to write data into a particular Cloud Storage bucket following least privilege. What should you do?",
        options: [
            "Create a dedicated user-managed service account, grant it the `roles/storage.objectCreator` role on that specific bucket, and attach it to the instances.",
            "Use the default compute service account with broad `cloud-platform` scope.",
            "Grant primitive Editor role to all VM instances.",
            "Download a JSON service account key onto the VM local filesystem."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Creating a custom service account assigned strictly `roles/storage.objectCreator` ensures instances can upload files without being able to overwrite or delete existing files.<br><br>⚖️ <strong>Service Comparison:</strong> `storage.objectCreator` permits writing new objects. `storage.objectAdmin` permits reading, writing, and deleting objects across the bucket."
    },
    {
        id: 103,
        topic: "compute",
        difficulty: "Medium",
        question: "You are creating a GKE cluster with Cluster Autoscaler enabled. You need each worker node to run a dedicated logging daemon pod that forwards node telemetry to an external security analyzer. How should you deploy this daemon?",
        options: [
            "Deploy the logging pod as a Kubernetes DaemonSet object.",
            "Deploy the pod in a StatefulSet object.",
            "Reference the pod inside a standard Deployment manifest with 10 replicas.",
            "Hardcode the pod inside an instance template startup script."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> A DaemonSet guarantees that exactly one copy of a pod runs on every physical worker node in the cluster, automatically launching onto new nodes provisioned by the autoscaler.<br><br>⚖️ <strong>Service Comparison:</strong> Deployments run stateless pod replicas across arbitrary nodes. DaemonSets ensure exactly one pod per physical node for logging and monitoring agents."
    },
    {
        id: 104,
        topic: "compute",
        difficulty: "Easy",
        question: "You create a new GKE cluster and want to ensure that worker nodes automatically receive security patches and minor version upgrades without human intervention. Which feature should you verify is active?",
        options: [
            "Node Auto-Upgrades",
            "Node Auto-Repair",
            "Shielded VM vTPM",
            "Binary Authorization"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Node Auto-Upgrades keep cluster worker node software updated to match the master Kubernetes plane version automatically during maintenance windows.<br><br>⚖️ <strong>Service Comparison:</strong> Node Auto-Repair reboots or recreates unhealthy worker nodes that fail health checks. Node Auto-Upgrades updates node operating systems and Kubernetes software."
    },
    {
        id: 105,
        topic: "compute",
        difficulty: "Hard",
        question: "You want to configure 10 Compute Engine instances for high availability during host maintenance events. Instances should automatically restart if they crash and migrate seamlessly during Google host updates. What configuration meets these criteria?",
        options: [
            "Create an instance template setting `Automatic Restart` to ON and `On-host maintenance` to Migrate VM instance (Live Migration). Add template to a Managed Instance Group.",
            "Set `Automatic Restart` to OFF and `On-host maintenance` to Terminate VM instances.",
            "Use Spot VMs with preemption warnings enabled.",
            "Format local SSD persistent disks with auto-delete set to true."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Pairing `Automatic Restart=ON` with `Live Migration` ensures instances survive hardware maintenance without interruption and restart automatically upon unexpected OS crashes.<br><br>⚖️ <strong>Service Comparison:</strong> Terminate on maintenance shuts down VMs during patching. Live Migration moves running VM states to healthy hosts transparently."
    },
    {
        id: 106,
        topic: "compute",
        difficulty: "Medium",
        question: "You have a single binary application that you want to run on GCP and automatically scale based on underlying CPU usage. Your organizational policy strictly mandates deploying on raw virtual machines directly. What architecture should you use?",
        options: [
            "Create an instance template and use it in a Compute Engine Managed Instance Group configured with CPU utilization autoscaling.",
            "Deploy the binary inside a GKE cluster with HPA enabled.",
            "Run the binary inside Cloud Run serverless containers.",
            "Deploy the binary on App Engine Flexible environment."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Managed Instance Groups provide raw VM scaling capabilities governed by CPU utilization thresholds, adhering strictly to VM deployment policies.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Run and GKE abstract virtual machines into container platforms. MIGs provide raw, OS-level virtual machine scaling."
    },
    {
        id: 107,
        topic: "compute",
        difficulty: "Easy",
        question: "You have a virtual machine running out of memory currently configured with 2 vCPUs and 4 GB RAM. You want to upgrade it to 8 GB RAM with minimal downtime. What steps should you take?",
        options: [
            "Stop the VM instance, edit the machine type to increase memory to 8 GB (or select a custom machine type), and start the VM instance.",
            "Rely on live migration to add memory while the VM is running.",
            "Add metadata `required-memory=8GB` using gcloud.",
            "Create an external TCP load balancer pointing to the VM."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VM machine type re-sizing (changing CPU or RAM allocations) requires putting the instance into a `TERMINATED` stopped state before applying changes.<br><br>⚖️ <strong>Service Comparison:</strong> Persistent disk capacity expands hot while running. RAM/CPU motherboard allocations require cold instance restarting."
    },
    {
        id: 108,
        topic: "compute",
        difficulty: "Hard",
        question: "You have a Dockerfile that you need to deploy onto a Google Kubernetes Engine cluster. What exact sequence of steps should you execute?",
        options: [
            "Build a container image from the Dockerfile, push it to Artifact Registry (or Container Registry), create a Kubernetes Deployment YAML manifest pointing to that image URI, and run `kubectl apply -f deployment.yaml`.",
            "Run `gcloud app deploy dockerfile` directly against the cluster.",
            "Run `kubectl app deploy dockerfile` in Cloud Shell.",
            "Upload the Dockerfile to Cloud Storage and run `gcloud compute instances start`."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Kubernetes clusters orchestrate pre-built container images stored in container registries; they do not build container images directly from raw Dockerfiles.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Build compiles raw source code into container images. GKE runs compiled container images pulled from registries."
    },
    {
        id: 109,
        topic: "compute",
        difficulty: "Medium",
        question: "You are using Deployment Manager to create a GKE cluster and want to create a Kubernetes DaemonSet in the same deployment YAML. How can Deployment Manager interact with Kubernetes APIs directly?",
        options: [
            "Add the GKE cluster's Kubernetes API as a new Type Provider in Deployment Manager, and use that type provider to declare the DaemonSet resource.",
            "Use Compute Engine startup scripts to curl Kubernetes manifests.",
            "Put the DaemonSet YAML inside the billing account metadata.",
            "Deployment Manager cannot interact with Kubernetes resources under any circumstances."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Deployment Manager Type Providers allow extending declarative orchestration to interact directly with third-party REST APIs, including GKE cluster Kubernetes APIs.<br><br>⚖️ <strong>Service Comparison:</strong> Standard Deployment Manager provisions GCP cloud hardware. Type Providers allow provisioning API-driven application objects like Kubernetes Pods."
    },
    {
        id: 110,
        topic: "compute",
        difficulty: "Medium",
        question: "You want to run a single caching HTTP reverse proxy consuming almost zero CPU but requiring a 30 GB in-memory cache and 2 GB for system memory. To minimize billing costs, how should you run this reverse proxy?",
        options: [
            "Create a Cloud Memorystore for Redis instance with 32 GB capacity (or run on a custom Compute Engine VM with 6 vCPUs and 32 GB memory tailored exactly to need).",
            "Deploy on an oversized `n1-standard-32` instance with 128 GB RAM.",
            "Run inside an E2-micro free tier VM with 1 GB RAM.",
            "Deploy on Cloud Spanner multi-node cluster."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Right-sizing compute memory allocations via custom machine types or using dedicated caching platforms like Memorystore prevents paying for unused CPU cores.<br><br>⚖️ <strong>Service Comparison:</strong> Pre-packaged standard VM types bundle fixed CPU-to-RAM ratios. Custom machine types let you pay strictly for the exact memory gigabytes required."
    },
    {
        id: 111,
        topic: "compute",
        difficulty: "Easy",
        question: "What is the primary function of Google Cloud Run jobs vs Cloud Run services?",
        options: [
            "Cloud Run services run continuously listening for incoming web requests on HTTPS endpoints; Cloud Run jobs run finite batch tasks to completion and terminate.",
            "Cloud Run jobs are for SQL databases, while services are for NoSQL.",
            "Cloud Run jobs require bare-metal servers, while services run on virtual machines.",
            "Cloud Run services are deprecated."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run services scale dynamically to serve web traffic on HTTPS URLs. Cloud Run jobs execute run-to-completion batch processing tasks (like nightly data processing).<br><br>⚖️ <strong>Service Comparison:</strong> Services listen indefinitely for web traffic. Jobs execute a specific workload from start to finish and shut down."
    },
    {
        id: 112,
        topic: "compute",
        difficulty: "Hard",
        question: "You want to configure Autohealing for a Managed Instance Group so that unresponsive VMs are automatically deleted and recreated if an HTTP health check fails 3 consecutive times with a 10-second interval. Where do you configure this?",
        options: [
            "In the Managed Instance Group configuration, attach an Autohealing health check configured with check interval 10s and unhealthy threshold 3.",
            "Create a network load balancer target pool health check.",
            "Write a bash cron script executing ping checks.",
            "Configure Cloud Monitoring uptime checks to delete VM instances via webhooks."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> MIG Autohealing utilizes dedicated application health checks. If an instance fails the threshold, the MIG controller self-heals by terminating and replacing the broken instance.<br><br>⚖️ <strong>Service Comparison:</strong> Load Balancer health checks simply stop directing user web traffic to broken instances. MIG Autohealing physically destroys and replaces broken instances."
    },
    {
        id: 113,
        topic: "compute",
        difficulty: "Medium",
        question: "You need to deploy a Jenkins build server using the fewest manual installation steps possible. What Google Cloud solution should you use?",
        options: [
            "Launch the pre-packaged Jenkins deployment solution directly from Google Cloud Marketplace.",
            "Download Jenkins Java WAR files and deploy onto App Engine Standard.",
            "Provision a bare-metal Linux VM and compile Jenkins from source code via SSH.",
            "Run Jenkins inside Cloud Functions."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Google Cloud Marketplace provides pre-configured, hardened, click-to-deploy virtual machine solutions for popular software like Jenkins, WordPress, and LAMP stacks.<br><br>⚖️ <strong>Service Comparison:</strong> Manual VM setup requires managing OS dependencies and installation scripts. Marketplace solutions provision turn-key verified architectures instantly."
    },
    {
        id: 114,
        topic: "compute",
        difficulty: "Easy",
        question: "Which feature of Compute Engine ensures that virtual machines running on host servers undergoing physical hardware maintenance are migrated seamlessly to alternate host hardware without rebooting?",
        options: [
            "Live Migration",
            "Automatic Restart",
            "Spot VM preemption",
            "Shielded Secure Boot"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Live Migration transparently moves running virtual machine state across physical server host infrastructure during Google maintenance windows.<br><br>⚖️ <strong>Service Comparison:</strong> Spot VMs terminate during host constraints. Standard VMs with Live Migration survive host patching without dropping user connections."
    },
    {
        id: 115,
        topic: "compute",
        difficulty: "Hard",
        question: "You have a Windows Server VM running on Compute Engine. How do you obtain the initial login credentials to connect via RDP using the Cloud Console?",
        options: [
            "Click 'Set Windows password' in the VM instance console, generate a username and password, verify firewall rule allows TCP port 3389, and connect via RDP.",
            "Use SSH on port 22 with standard Linux keys.",
            "Connect using Telnet on port 23.",
            "Windows VMs do not require passwords."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Windows instances require generating administrative Windows credentials via the console metadata server and establishing Remote Desktop Protocol (RDP) sessions over TCP port 3389.<br><br>⚖️ <strong>Service Comparison:</strong> Linux instances authenticate via SSH cryptographic key pairs on port 22. Windows instances authenticate via RDP encrypted user credentials on port 3389."
    },
    {
        id: 116,
        topic: "compute",
        difficulty: "Medium",
        question: "You want to deploy an application packaged as a Docker container that receives very few HTTP requests per day. To minimize monthly cloud billing costs, which platform should you choose?",
        options: [
            "Cloud Run (scales to zero when idle, billing only during request processing).",
            "GKE Standard Cluster with 3 E2-standard worker nodes.",
            "Compute Engine dedicated 24/7 VM instance.",
            "App Engine Flexible environment with 2 core instances."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run scales container instances down to zero during inactive hours, eliminating compute billing entirely when traffic is absent.<br><br>⚖️ <strong>Service Comparison:</strong> App Engine Flexible and GKE Standard maintain minimum baseline running VM instances 24/7. Cloud Run eliminates baseline running costs."
    },
    {
        id: 117,
        topic: "compute",
        difficulty: "Easy",
        question: "What is the purpose of Kubernetes StatefulSets in GKE?",
        options: [
            "To manage stateful applications requiring stable network identities, persistent storage volumes, and ordered deployment/scaling (such as database clusters).",
            "To run stateless web frontends.",
            "To execute one-off batch cron scripts.",
            "To configure firewall rules."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> StatefulSets guarantee unique, persistent pod identifiers (`pod-0`, `pod-1`) and dedicated stable volume attachments across pod restarts.<br><br>⚖️ <strong>Service Comparison:</strong> Deployments create interchangeable, anonymous stateless pods. StatefulSets maintain strict ordinal ordering and storage persistence for stateful databases."
    },
    {
        id: 118,
        topic: "compute",
        difficulty: "Hard",
        question: "You want to ensure that a critical backend processing VM inside a Managed Instance Group is always running, but exactly only ONE instance should ever exist per GCP project. How should you configure autoscaling?",
        options: [
            "Set autoscaling to ON (or OFF), set minimum instances to 1, and set maximum instances to exactly 1.",
            "Set minimum instances to 0 and maximum to 100.",
            "Use unmanaged instance groups.",
            "Enable preemption."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Setting both minimum and maximum instance limits to 1 forces the MIG self-healing controller to maintain exactly one running VM at all times.<br><br>⚖️ <strong>Service Comparison:</strong> Unmanaged instance groups lack auto-healing. Managed instance groups capped at max=1 ensure singleton application resilience."
    },
    {
        id: 119,
        topic: "compute",
        difficulty: "Medium",
        question: "You need to switch between two different Google Cloud accounts and projects using the `gcloud` command line interface frequently. What is the cleanest way to manage this?",
        options: [
            "Create named configurations using `gcloud config configurations create [NAME]` and switch between them using `gcloud config configurations activate [NAME]`.",
            "Delete and re-install Google Cloud SDK every morning.",
            "Manually edit hidden `.boto` files in text editors.",
            "Use two separate physical laptop computers."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `gcloud config configurations` allows maintaining isolated developer profiles (account email, target project, default compute zone) and toggling rapidly between them.<br><br>⚖️ <strong>Service Comparison:</strong> Re-running `gcloud init` constantly wastes time. Named configurations provide instant workspace switching."
    },
    {
        id: 120,
        topic: "compute",
        difficulty: "Easy",
        question: "Which compute platform provides fully managed serverless execution of containerized web applications while allowing granular control over CPU/memory limits up to 8 vCPUs and 32 GB RAM per instance?",
        options: [
            "Cloud Run (2nd gen execution environment)",
            "Cloud Functions 1st gen",
            "App Engine Standard micro instances",
            "Cloud Dataproc serverless"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run supports robust machine allocations up to 8 vCPUs and 32 GB memory per container instance, accommodating demanding serverless workloads.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Functions 1st gen is restricted to lightweight functions. Cloud Run accommodates heavy containerized backend processing."
    }
);
