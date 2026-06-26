/* ==========================================================================
   Question Bank Part 4: Networking, VPC & Connectivity (Questions 181 - 240)
   ========================================================================== */

window.QUESTION_BANK = window.QUESTION_BANK || [];

window.QUESTION_BANK.push(
    {
        id: 181,
        topic: "networking",
        difficulty: "Medium",
        question: "Your company has a 3-tier solution running on Compute Engine (Web Tier #1, App Tier #2, DB Tier #3). Each tier has a dedicated IAM service account attached to its VM instances. You need to allow TCP port 8080 communication strictly from Tier #1 to Tier #2, and from Tier #2 to Tier #3 following Google best practices. What should you do?",
        options: [
            "Create an ingress firewall rule targeting Tier #2 service account allowing TCP:8080 from source Tier #1 service account. Create a second ingress rule targeting Tier #3 service account allowing TCP:8080 from source Tier #2 service account.",
            "Create ingress firewall rules targeting IP CIDR subnet ranges allowing all protocols.",
            "Create egress firewall rules allowing TCP:8080 to all targets.",
            "Use network tags `tier1`, `tier2`, `tier3` and open port 8080 to `0.0.0.0/0`."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Target Service Accounts provide the most robust, identity-based filtering for VPC firewall rules. Unlike network tags, service account assignment is strictly governed by IAM roles.<br><br>⚖️ <strong>Service Comparison:</strong> Network tags can be modified by anyone with instance edit permissions, risking accidental firewall breaches. Service accounts bind firewall rules securely to IAM identity authorization."
    },
    {
        id: 182,
        topic: "networking",
        difficulty: "Hard",
        question: "You need to expose a globally distributed web application hosted on Compute Engine instance groups across us-central1 and europe-west1 to users worldwide using a single static IPv4 address. The load balancer must terminate SSL/TLS connections and automatically route client requests to the closest geographic region with available capacity. Which load balancer should you deploy?",
        options: [
            "Global External HTTP(S) Load Balancer",
            "Regional External TCP Proxy Load Balancer",
            "Internal TCP/UDP Load Balancer",
            "Network Load Balancer (target pools)"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> The Global External HTTP(S) Load Balancer operates as a Layer 7 proxy using Anycast routing. It provides a single global IP address, terminates SSL at the network edge, and directs requests to the nearest healthy backend region.<br><br>⚖️ <strong>Service Comparison:</strong> Regional Load Balancers require different IP addresses per geographic region. Global HTTP(S) Load Balancers use edge Anycast to route global user requests to the nearest regional data center using one IP."
    },
    {
        id: 183,
        topic: "networking",
        difficulty: "Medium",
        question: "Your company connects its data center to Google Cloud using a Cloud VPN tunnel. You want routing changes (such as new subnet additions on either end) to propagate automatically across the VPN tunnel without requiring manual static route updates. Which protocol and Google Cloud service must be configured?",
        options: [
            "Cloud Router configured with Border Gateway Protocol (BGP)",
            "Cloud DNS private forwarding zones",
            "VPC network peering export/import custom routes",
            "Cloud NAT static gateway mapping"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Router enables dynamic routing using BGP over Cloud VPN tunnels or Cloud Interconnect lines, automatically exchanging route updates when topology shifts occur.<br><br>⚖️ <strong>Service Comparison:</strong> Static routing requires manual intervention every time network topologies change. Dynamic BGP routing via Cloud Router discovers new subnets automatically without tunnel downtime."
    },
    {
        id: 184,
        topic: "networking",
        difficulty: "Hard",
        question: "You have production and test workloads that you want to deploy on Compute Engine. Production VMs need to be in a different subnet than test VMs. All VMs must be able to reach each other over internal IP without creating additional routes or VPN tunnels. Which configuration meets these requirements?",
        options: [
            "Create a single custom VPC network with 2 subnets created in different regions (or the same region) with non-overlapping CIDR ranges.",
            "Create 2 separate custom VPC networks and bridge them with an external HTTP load balancer.",
            "Create a Shared VPC Host project and disable internal routing.",
            "Deploy all VMs in the default VPC network using identical IP addresses."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Subnets within a single Google Cloud VPC network inherently route traffic between each other using internal private IP addresses globally without requiring extra gateways or static routes.<br><br>⚖️ <strong>Service Comparison:</strong> Separate VPC networks isolate communication entirely unless VPC Peering is explicitly configured. Subnets within the same VPC communicate natively across internal Google fabric."
    },
    {
        id: 185,
        topic: "networking",
        difficulty: "Easy",
        question: "You have an instance group serving a public HTTPS web application that you want to load balance. You want the load balancer to terminate client SSL sessions following Google best practices. Which load balancer should you configure?",
        options: [
            "Configure an External HTTP(S) Load Balancer.",
            "Configure an Internal TCP/UDP Load Balancer.",
            "Configure an External TCP Proxy Load Balancer.",
            "Configure a Network Load Balancer target pool."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> External HTTP(S) Load Balancers operate at Layer 7, terminating SSL/TLS sessions at Google's edge locations and inspecting HTTP headers for intelligent request distribution.<br><br>⚖️ <strong>Service Comparison:</strong> Layer 4 Network Load Balancers pass raw TCP encrypted packets directly to backend VMs. HTTP(S) Load Balancers offload cryptographic SSL decryption at the network edge."
    },
    {
        id: 186,
        topic: "networking",
        difficulty: "Medium",
        question: "You need to create a custom VPC with a single subnet. You want the subnet's internal IP address CIDR block range to be as large as possible according to RFC 1918 private networking specifications. Which CIDR range should you use?",
        options: [
            "10.0.0.0/8 (provides 16,777,214 usable private IP addresses)",
            "172.16.0.0/12 (provides 1,048,574 private IP addresses)",
            "192.168.0.0/16 (provides 65,534 private IP addresses)",
            "0.0.0.0/0 (represents the universal internet default route)"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> RFC 1918 reserves `10.0.0.0/8` as the largest private IPv4 network block, yielding over 16.7 million distinct internal IP addresses for cloud subnets.<br><br>⚖️ <strong>Service Comparison:</strong> `/16` blocks provide 65k addresses, suitable for medium VPCs. `/8` blocks provide maximum address capacity for massive enterprise multi-region cloud networks."
    },
    {
        id: 187,
        topic: "networking",
        difficulty: "Hard",
        question: "You have VM instances running inside a private subnet with no external public IP addresses assigned. These VMs need to download software packages and security updates securely from public internet repositories. What Google Cloud service should you implement?",
        options: [
            "Cloud NAT (Network Address Translation) paired with Cloud Router",
            "Identity-Aware Proxy (IAP) TCP forwarding",
            "Private Google Access enabled on the subnet",
            "VPC peering with an external internet gateway project"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud NAT allows VM instances without external public IP addresses to initiate outbound internet connections for downloading updates while preventing inbound internet connections from reaching private VMs.<br><br>⚖️ <strong>Service Comparison:</strong> Private Google Access routes traffic strictly to internal Google APIs (`storage.googleapis.com`). Cloud NAT provides outbound connectivity to external general internet repositories."
    },
    {
        id: 188,
        topic: "networking",
        difficulty: "Medium",
        question: "Your enterprise requires a direct, dedicated physical fiber connection between your on-premises data center and Google Cloud colocation facilities to support sustained data transfers exceeding 20 Gbps with 99.99% availability SLA. Which hybrid connectivity service meets these criteria?",
        options: [
            "Dedicated Cloud Interconnect",
            "Partner Cloud Interconnect",
            "High Availability (HA) Cloud VPN over public internet",
            "Carrier Peering direct edge connection"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Dedicated Cloud Interconnect provides direct physical 10 Gbps or 100 Gbps Ethernet circuit connections between your on-premises routing equipment and Google's edge network, bypassing public internet.<br><br>⚖️ <strong>Service Comparison:</strong> HA Cloud VPN encrypts traffic over variable public internet links up to 3 Gbps per tunnel. Dedicated Interconnect provides guaranteed dedicated physical fiber bandwidth up to 100 Gbps."
    },
    {
        id: 189,
        topic: "networking",
        difficulty: "Easy",
        question: "Which network identifier allows two independent VPC networks within the same or different Google Cloud projects to connect directly using internal IP addresses without incurring internet egress bandwidth charges?",
        options: [
            "VPC Network Peering",
            "Cloud Router BGP AS prepending",
            "External VPN tunneling proxy",
            "Proxy ARP bridging"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VPC Network Peering establishes internal routing connectivity between two VPC networks, allowing workloads to communicate using private RFC 1918 IPs across high-speed low-latency Google fabric.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud VPN encrypts packets and routes through external gateway interfaces. VPC Peering merges private IP routing tables natively across high-speed internal fabric."
    },
    {
        id: 190,
        topic: "networking",
        difficulty: "Hard",
        question: "You manage internal domain name resolution for microservices within your VPC using Cloud DNS private zones. You need on-premises servers connected via Cloud VPN to resolve these internal `.internal.mycompany.com` DNS records hosted on Cloud DNS. How should you configure Cloud DNS?",
        options: [
            "Create a Cloud DNS Inbound Server Policy to allocate internal IP addresses that on-premises DNS servers can forward queries to.",
            "Create a Cloud DNS Outbound Server Policy pointing to public internet root resolvers.",
            "Export Cloud DNS zone files to an on-premises BIND server weekly using cron.",
            "Enable DNSSEC on the private managed zone."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> A Cloud DNS Inbound Server Policy provisions internal IP endpoints inside your VPC. On-premises DNS servers configure conditional forwarding rules pointing to these endpoints across Cloud VPN/Interconnect.<br><br>⚖️ <strong>Service Comparison:</strong> Outbound DNS policies forward queries from Google Cloud out to on-premises nameservers. Inbound DNS policies allow on-premises nameservers to query Google Cloud DNS."
    },
    {
        id: 191,
        topic: "networking",
        difficulty: "Medium",
        question: "What is the primary difference between a Google Cloud Shared VPC and VPC Network Peering?",
        options: [
            "Shared VPC allows centralized network administration where multiple service projects share subnets inside a single host project VPC; Peering connects two completely independent VPC networks with decentralized administration.",
            "Shared VPC encrypts traffic, while Peering transmits plaintext.",
            "Shared VPC requires dedicated fiber lines, whereas Peering works over WiFi.",
            "Peering allows overlapping CIDR blocks, while Shared VPC prevents IP routing."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Shared VPC centralizes network governance under a Host Project while granting Service Projects permission to deploy instances into shared subnets. VPC Peering links distinct VPCs without shared governance.<br><br>⚖️ <strong>Service Comparison:</strong> Shared VPC unifies billing and firewall administration under one Host project. VPC Peering maintains separate project governance while allowing internal network traffic exchange."
    },
    {
        id: 192,
        topic: "networking",
        difficulty: "Easy",
        question: "Can a single Google Cloud VPC network span across multiple geographic regions (such as `us-central1` and `europe-west1`)?",
        options: [
            "Yes, Google Cloud VPC networks are global resources, while individual subnets within the VPC are regional.",
            "No, VPC networks are strictly confined to a single availability zone.",
            "No, you must create a separate VPC network for every region and bridge them with VPN tunnels.",
            "Yes, but global VPCs charge a $100 daily maintenance fee."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Unlike legacy cloud providers where VPCs are regional, Google Cloud VPCs are inherently global software-defined networks capable of containing regional subnets worldwide.<br><br>⚖️ <strong>Service Comparison:</strong> Legacy clouds require setting up complex inter-region VPC peering bridges. Google Cloud VPCs provide global internal communication across regions natively out of the box."
    },
    {
        id: 193,
        topic: "networking",
        difficulty: "Hard",
        question: "You deploy an Internal TCP/UDP Load Balancer to distribute traffic among backend database VMs in `us-east1`. Can VM instances located in `us-west1` within the same VPC network access this internal load balancer VIP?",
        options: [
            "Yes, provided Global Access is enabled on the internal load balancer configuration.",
            "No, internal load balancers are strictly regional and cannot be accessed from outside their deployment region.",
            "Yes, but only if you configure Cloud NAT.",
            "No, unless you enable Cloud Armor web application firewall."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Enabling Global Access on an Internal Load Balancer allows client VMs from any region within the VPC network to access the internal VIP.<br><br>⚖️ <strong>Service Comparison:</strong> By default, Internal Load Balancers accept traffic strictly from clients within the same region. Enabling Global Access lifts regional barriers across the VPC."
    },
    {
        id: 194,
        topic: "networking",
        difficulty: "Medium",
        question: "You want to inspect network metadata headers (source/destination IP, port, protocol) for all packets entering and leaving a specific VPC subnet to investigate potential security anomalies. What monitoring feature should you enable?",
        options: [
            "VPC Flow Logs",
            "Cloud Armor DDoS alerts",
            "Uptime Check ping traceroute",
            "App Engine request trace logs"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VPC Flow Logs record a sample of network packet metadata traversing Compute Engine VM instances, aiding network forensic analysis and traffic optimization.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Logging captures application log strings. VPC Flow Logs capture TCP/UDP packet networking metadata, socket destinations, and byte transfer volumes."
    },
    {
        id: 195,
        topic: "networking",
        difficulty: "Medium",
        question: "Which web application firewall (WAF) and DDoS mitigation service integrates seamlessly with Google Cloud External HTTP(S) Load Balancers to defend against SQL injection and Layer 7 attacks?",
        options: [
            "Google Cloud Armor",
            "VPC Service Controls",
            "Cloud Identity-Aware Proxy",
            "Secret Manager firewall"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Google Cloud Armor provides enterprise DDoS defense and Layer 7 WAF security policies directly at the edge Anycast load balancing layer.<br><br>⚖️ <strong>Service Comparison:</strong> VPC firewalls block Layer 3/4 IP addresses and ports. Cloud Armor inspects Layer 7 HTTP request headers, blocking XSS and SQL injection payloads at edge locations."
    },
    {
        id: 196,
        topic: "networking",
        difficulty: "Hard",
        question: "Two VPC networks, `VPC-A` and `VPC-B`, are connected via VPC Peering. `VPC-B` is also peered with `VPC-C`. Can VM instances in `VPC-A` communicate directly with instances in `VPC-C` across the peered connections?",
        options: [
            "No, VPC Network Peering is non-transitive; `VPC-A` must peer directly with `VPC-C` or route through a multi-NIC bridge or VPN.",
            "Yes, routing transitive jumps occur automatically across peering bridges.",
            "Yes, provided all three VPCs share identical firewall rules.",
            "No, unless you upgrade all subnets to IPv6."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VPC Network Peering in Google Cloud does not support transitive peering. Traffic cannot hop across an intermediary VPC.<br><br>⚖️ <strong>Service Comparison:</strong> Transitive peering requires deploying custom multi-NIC routing VM appliances or establishing direct mesh peering relationships between all target VPCs."
    },
    {
        id: 197,
        topic: "networking",
        difficulty: "Easy",
        question: "Which gcloud command lists all firewall rules configured inside the current Google Cloud project?",
        options: [
            "gcloud compute firewall-rules list",
            "gcloud network rules display",
            "gcloud vpc firewalls get",
            "gcloud iam policies list --type=firewall"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>gcloud compute firewall-rules list</code> enumerates all ingress and egress firewall rules, displaying priority, action, network, and target tags.<br><br>⚖️ <strong>Service Comparison:</strong> <code>firewall-rules list</code> inspects network packet rules. <code>org-policies list</code> inspects organizational governance policies."
    },
    {
        id: 198,
        topic: "networking",
        difficulty: "Medium",
        question: "You want to configure High Availability (HA) Cloud VPN between your on-premises gateway and Google Cloud, guaranteeing 99.99% SLA. How many public IP addresses and interfaces does HA VPN require on the Google Cloud side?",
        options: [
            "Two external public IP addresses (one for each interface on the HA VPN gateway resource).",
            "A single static IP address shared across all tunnels.",
            "Zero external IPs; HA VPN operates exclusively over private fiber lines.",
            "Four separate IPv6 addresses."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> An HA Cloud VPN gateway automatically provisions two external IPv4 addresses (one per interface) to establish redundant tunnels supporting 99.99% uptime.<br><br>⚖️ <strong>Service Comparison:</strong> Classic VPN uses a single public IP address supporting 99.9% SLA. HA VPN uses dual independent external IP interfaces to achieve 99.99% SLA reliability."
    },
    {
        id: 199,
        topic: "networking",
        difficulty: "Hard",
        question: "You have an application running on GKE that needs to connect to an external third-party API that restricts access via IP whitelisting. You want all outbound requests from your GKE pods to emerge from a single, static public IP address. How should you configure this?",
        options: [
            "Deploy Cloud NAT with a static reserved external IP address attached to the GKE cluster's VPC subnet.",
            "Assign a static external IP address to every individual GKE pod manifest.",
            "Enable Global Access on an Internal Load Balancer.",
            "Configure Cloud DNS routing policies pointing to the external API."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud NAT translates outbound internal IP traffic from GKE worker nodes into a deterministic, statically reserved public Cloud NAT IP address suitable for third-party whitelisting.<br><br>⚖️ <strong>Service Comparison:</strong> Assigning external public IPs to individual worker nodes creates ephemeral changing IP pools. Cloud NAT centralizes egress traffic under one static, predictable IP."
    },
    {
        id: 200,
        topic: "networking",
        difficulty: "Easy",
        question: "What is the priority numerical range for Google Cloud VPC firewall rules, and which rule takes precedence when two conflicting rules match the same traffic?",
        options: [
            "Priority ranges from 0 to 65535; the lowest numerical value has the highest precedence (e.g. priority 100 overrides priority 1000).",
            "Priority ranges from 1 to 10; the highest number wins.",
            "Firewall rules are evaluated alphabetically by rule name.",
            "Allow rules always override Deny rules regardless of priority number."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VPC firewall rules use integers from 0 to 65535. Lower integers represent higher priority, executing before rules with larger numerical priority values.<br><br>⚖️ <strong>Service Comparison:</strong> Rule priority numerical order dictates execution. If priority numbers match, Deny rules take precedence over Allow rules."
    }
);
