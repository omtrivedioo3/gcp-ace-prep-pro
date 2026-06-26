/* ==========================================================================
   Question Bank Part 3: Cloud Storage & Database Options (Questions 121 - 180)
   ========================================================================== */

window.QUESTION_BANK = window.QUESTION_BANK || [];

window.QUESTION_BANK.push(
    {
        id: 121,
        topic: "storage",
        difficulty: "Medium",
        question: "Your media company generates 500 GB of high-definition raw video files daily. The files are frequently accessed during the first 30 days for post-production editing. After 30 days, access drops significantly to once per quarter. After 365 days, files must be retained for 7 years for regulatory compliance but are almost never read. How should you automate storage class transitions to minimize storage bill?",
        options: [
            "Configure Object Lifecycle Management rules to transition objects from Standard to Nearline after 30 days, and to Archive after 365 days.",
            "Write a Cloud Function triggered by Cloud Scheduler that downloads files and uploads them into new buckets.",
            "Store all objects in Coldline storage from day one to lock in low monthly per-gigabyte costs.",
            "Enable Cloud Storage Object Versioning and set deletion policies to 90 days."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Object Lifecycle Management automates cost optimization by automatically transitioning storage tiers (Standard -> Nearline -> Archive) based on object age conditions without manual script intervention.<br><br>⚖️ <strong>Service Comparison:</strong> Manual script copying incurs network egress and operational overhead. Object Lifecycle Management handles tier migration seamlessly at zero compute charge."
    },
    {
        id: 122,
        topic: "storage",
        difficulty: "Hard",
        question: "You are designing a transactional e-commerce platform that requires a relational SQL database with global horizontal read/write scalability across three continents, zero downtime maintenance, and strict ACID consistency (serializable transactions). Which Google Cloud database engine should you choose?",
        options: [
            "Cloud SQL for PostgreSQL with read replicas",
            "Cloud Spanner",
            "Cloud Bigtable",
            "Cloud Firestore in Datastore mode"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Cloud Spanner is Google Cloud's fully managed, enterprise-grade, globally distributed relational database service that combines ACID transactions and SQL semantics with horizontal scaling and 99.999% availability.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud SQL is limited by single-server vertical scaling boundaries. Cloud Spanner scales relational ACID transactions horizontally across global data centers."
    },
    {
        id: 123,
        topic: "storage",
        difficulty: "Medium",
        question: "You have a Cloud SQL MySQL database instance serving production traffic. To prevent regional data center outages from causing application downtime, you need to configure automated failover to a standby instance in a different zone. What setting must you enable?",
        options: [
            "High Availability (HA) Regional configuration",
            "Cross-region asynchronous read replicas",
            "Cloud SQL Automated Backups with point-in-time recovery",
            "VPC network peering with custom BGP routing"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Enabling High Availability (HA) configures the Cloud SQL instance as Regional, maintaining a synchronized standby instance in a different zone within the same region using synchronous disk replication.<br><br>⚖️ <strong>Service Comparison:</strong> Read replicas provide asynchronous read-only scaling. HA regional configurations provide synchronous multi-zone failover protection against zonal failures."
    },
    {
        id: 124,
        topic: "storage",
        difficulty: "Hard",
        question: "Your IoT application ingests 200,000 time-series sensor data records per second with sub-10 millisecond latency requirements. The data will be queried by key-range scans for real-time analytics. Which wide-column NoSQL database service is built for this performance profile?",
        options: [
            "Cloud Bigtable",
            "Cloud Firestore",
            "Memorystore for Redis",
            "BigQuery BI Engine"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Bigtable is a sparsely populated, distributed wide-column NoSQL database engineered for high-throughput single-digit millisecond latency workloads like IoT telemetry.<br><br>⚖️ <strong>Service Comparison:</strong> Firestore handles web/mobile document hierarchies. Bigtable handles massive write-heavy analytical NoSQL ingestion scaling to millions of QPS."
    },
    {
        id: 125,
        topic: "storage",
        difficulty: "Easy",
        question: "You want to grant external clients temporary authorization to upload images directly into a private Cloud Storage bucket for exactly 15 minutes without providing them with Google account credentials. What mechanism should you use?",
        options: [
            "Signed URLs generated with a service account private key",
            "IAM Bucket Policy Only with public anonymous access",
            "Cloud Storage CORS (Cross-Origin Resource Sharing) XML file",
            "OAuth 2.0 Client ID web application secrets"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Signed URLs provide time-bound cryptographic access to perform specific operations (GET, PUT, DELETE) on Cloud Storage objects without exposing long-lived IAM keys.<br><br>⚖️ <strong>Service Comparison:</strong> Public IAM buckets expose data permanently to all internet visitors. Signed URLs restrict access strictly to authorized bearers for precise minute windows."
    },
    {
        id: 126,
        topic: "storage",
        difficulty: "Medium",
        question: "You are analyzing multi-terabyte log tables in BigQuery. Queries are currently scanning entire tables, resulting in slow query performance and high data-processing charges. Most queries filter by the `event_timestamp` column. How should you optimize the table structure?",
        options: [
            "Partition the BigQuery table by the `event_timestamp` column.",
            "Export the BigQuery table to CSV files stored in Nearline Cloud Storage.",
            "Add a secondary B-Tree relational index on the `event_timestamp` column.",
            "Increase the BigQuery query concurrency limit in project settings."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Table Partitioning divides large tables into segments based on a date/timestamp column. Queries filtering on the partition key scan significantly less data, cutting costs.<br><br>⚖️ <strong>Service Comparison:</strong> BigQuery does not use traditional B-Tree indices. Table partitioning and clustering physically segregate data blocks to minimize query scan volume."
    },
    {
        id: 127,
        topic: "storage",
        difficulty: "Hard",
        question: "A mobile gaming application requires a hierarchical document database capable of real-time client SDK live synchronization, offline data persistence on mobile devices, and ACID transactions across multiple documents. Which database service fits these requirements?",
        options: [
            "Cloud Firestore in Native mode",
            "Cloud SQL for SQL Server",
            "Cloud Bigtable",
            "Cloud Storage Mobile SDK"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Firestore in Native mode is a NoSQL document database built specifically for web and mobile client synchronization, featuring offline caching support.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud SQL lacks native mobile client SDK offline sync. Firestore provides direct client connection libraries with offline SQLite caching."
    },
    {
        id: 128,
        topic: "storage",
        difficulty: "Medium",
        question: "You need to copy 50 TB of archive files from an on-premises NAS storage system into Google Cloud Storage over a 100 Mbps internet connection. Calculating network transfer times reveals this will take over 45 days. What is the fastest and most reliable Google-recommended transfer method?",
        options: [
            "Order a Storage Transfer Appliance (physical hardware shipping device) from Google.",
            "Run gsutil -m cp in an automated retry loop across multiple workstations.",
            "Compress the files into 50 GB ZIP archives and email them to Google Cloud support.",
            "Use Cloud Interconnect to dynamically boost ISP bandwidth to 10 Gbps."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> For large-scale offline data migrations where available network bandwidth makes online transfer impractical (>20 TB over slow links), Google provides the Transfer Appliance.<br><br>⚖️ <strong>Service Comparison:</strong> Online Storage Transfer Service transfers files over internet links. Transfer Appliance utilizes physical rack-mountable shipping hardware to bypass bandwidth limits."
    },
    {
        id: 129,
        topic: "storage",
        difficulty: "Easy",
        question: "Which Cloud Storage bucket feature ensures that once an object is written, it cannot be deleted or overwritten for a user-specified retention period, satisfying SEC Rule 17a-4 WORM (Write Once, Read Many) compliance?",
        options: [
            "Bucket Lock with Retention Policy",
            "Object Versioning",
            "Customer-Managed Encryption Keys (CMEK)",
            "Uniform Bucket-Level Access"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Configuring a retention policy on a Cloud Storage bucket and locking it via Bucket Lock enforces strict WORM compliance, permanently preventing deletion.<br><br>⚖️ <strong>Service Comparison:</strong> Object Versioning retains historical copies when files are overwritten. Bucket Lock prevents overwriting or deleting files entirely until retention periods expire."
    },
    {
        id: 130,
        topic: "storage",
        difficulty: "Hard",
        question: "You are configuring read replicas for a high-traffic Cloud SQL PostgreSQL instance. You want analytical reporting queries sent to the read replica to avoid impacting primary database performance. Which statement regarding Cloud SQL read replicas is true?",
        options: [
            "Read replicas can be placed in different geographical regions than the primary instance to serve global users with lower read latency.",
            "Read replicas automatically handle write queries by redirecting them synchronously to the master instance.",
            "Read replicas require manual daily synchronization using pg_dump exports.",
            "You can create a maximum of 1 read replica per Cloud SQL primary instance."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud SQL supports cross-region read replicas, enabling read-heavy workloads (BI dashboards, reporting tools) in disparate geographical locations to query data locally.<br><br>⚖️ <strong>Service Comparison:</strong> Read replicas process read-only SELECT queries asynchronously. High Availability (HA) standbys remain passive until failover occurs."
    },
    {
        id: 131,
        topic: "storage",
        difficulty: "Medium",
        question: "What is the primary difference between Cloud Storage Nearline and Coldline storage classes?",
        options: [
            "Nearline has a minimum storage duration of 30 days and higher storage cost / lower access retrieval cost, whereas Coldline has a 90-day minimum duration and lower storage cost / higher access retrieval cost.",
            "Nearline is for structured SQL data, whereas Coldline is for NoSQL documents.",
            "Nearline objects can be downloaded via HTTPS, whereas Coldline objects require FTP.",
            "Coldline has a 24-hour retrieval latency window, whereas Nearline is instant."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> All Google Cloud Storage classes offer millisecond retrieval latency. They differ strictly in pricing tradeoffs between monthly storage costs and retrieval charges.<br><br>⚖️ <strong>Service Comparison:</strong> Standard = frequent access (0-day min). Nearline = monthly access (30-day min). Coldline = quarterly access (90-day min). Archive = annual access (365-day min)."
    },
    {
        id: 132,
        topic: "storage",
        difficulty: "Easy",
        question: "Which gcloud gsutil command synchronizes a local directory named `/local/data` into a Cloud Storage bucket named `gs://my-archive-bucket` without deleting existing files in the bucket?",
        options: [
            "gsutil rsync -r /local/data gs://my-archive-bucket",
            "gsutil cp -all /local/data gs://my-archive-bucket",
            "gcloud storage buckets sync /local/data gs://my-archive-bucket",
            "gsutil mv /local/data gs://my-archive-bucket"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `gsutil rsync -r [SOURCE] [DEST]` recursively synchronizes content between directories and cloud buckets, transferring only new or modified files.<br><br>⚖️ <strong>Service Comparison:</strong> <code>gsutil cp</code> copies files blindly. <code>gsutil rsync</code> compares checksums and timestamps, uploading strictly delta differences."
    },
    {
        id: 133,
        topic: "storage",
        difficulty: "Hard",
        question: "You have an application using Cloud Bigtable. Performance monitoring reveals severe hot-spotting where a single node handles 95% of read/write requests while other nodes sit idle. What schema design mistake causes Bigtable hot-spotting?",
        options: [
            "Using monotonically increasing or sequential identifiers (like timestamps or auto-incrementing user IDs) as the row key prefix.",
            "Enabling SSD storage instead of HDD storage.",
            "Creating more than one column family per table.",
            "Compressing text values before inserting into cells."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Bigtable sorts data lexicographically by row key. Using sequential values forces all new writes into the exact same physical node range, destroying distributed balancing.<br><br>⚖️ <strong>Service Comparison:</strong> Relational SQL databases handle auto-incrementing primary keys easily. Distributed NoSQL engines like Bigtable require hashed or UUID row key prefixes to distribute load across shards."
    },
    {
        id: 134,
        topic: "storage",
        difficulty: "Medium",
        question: "You want to import a 10 GB SQL dump file (`backup.sql`) residing in Cloud Storage into a running Cloud SQL MySQL database instance. Which command accomplishes this?",
        options: [
            "gcloud sql import sql [INSTANCE_NAME] gs://my-bucket/backup.sql --database=[DB_NAME]",
            "gsutil cp gs://my-bucket/backup.sql cloudsql://[INSTANCE_NAME]",
            "kubectl exec mysql-pod -- mysql < backup.sql",
            "gcloud compute instances attach-disk [INSTANCE_NAME] --disk=backup.sql"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `gcloud sql import sql` instructs the managed Cloud SQL service to ingest and execute a SQL dump file directly from a specified Cloud Storage bucket URI.<br><br>⚖️ <strong>Service Comparison:</strong> Direct mysql client piping over external internet connections risks timeouts. Managed Cloud Storage import runs securely over internal Google high-speed infrastructure."
    },
    {
        id: 135,
        topic: "storage",
        difficulty: "Medium",
        question: "What is the recommended caching database service in Google Cloud for sub-millisecond in-memory session store management and gaming leaderboards?",
        options: [
            "Memorystore for Redis (or Memcached)",
            "Cloud Spanner",
            "Cloud Storage Archive tier",
            "BigQuery ML"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Memorystore provides fully managed in-memory data store caching service powered by Redis or Memcached, delivering sub-millisecond latency for high-speed lookups.<br><br>⚖️ <strong>Service Comparison:</strong> Disk-backed databases (Cloud SQL/Firestore) read from persistent storage. Memorystore caches data entirely in RAM for lightning-fast application responsiveness."
    },
    {
        id: 136,
        topic: "storage",
        difficulty: "Hard",
        question: "You need to enforce uniform access controls across all objects in a Cloud Storage bucket, ignoring legacy object-level Access Control Lists (ACLs). How should you configure the bucket?",
        options: [
            "Enable Uniform Bucket-Level Access (UBLA).",
            "Disable IAM roles at the organization level.",
            "Convert the bucket to dual-region replication.",
            "Set object ACLs to world-readable."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Enforcing Uniform Bucket-Level Access disables granular per-object ACLs, unifying security permissions exclusively under standard Google Cloud IAM policy governance.<br><br>⚖️ <strong>Service Comparison:</strong> Fine-grained ACLs permit file-by-file exceptions that easily cause security blind spots. Uniform Bucket-Level Access ensures IAM policies govern 100% of bucket objects."
    },
    {
        id: 137,
        topic: "storage",
        difficulty: "Easy",
        question: "Which data migration service automates continuous replication of databases from on-premises MySQL or Oracle servers into Cloud SQL with minimal downtime?",
        options: [
            "Database Migration Service (DMS)",
            "BigQuery Data Transfer Service",
            "Storage Transfer Service",
            "Cloud Data Fusion"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Database Migration Service (DMS) streamlines heterogeneous and homogeneous database migrations into Cloud SQL and Spanner using continuous change data capture (CDC).<br><br>⚖️ <strong>Service Comparison:</strong> Storage Transfer Service moves unstructured file objects. Database Migration Service replicates relational database tables and transaction logs continuously."
    },
    {
        id: 138,
        topic: "storage",
        difficulty: "Medium",
        question: "In BigQuery, what is the architectural difference between Table Partitioning and Table Clustering?",
        options: [
            "Partitioning divides tables into dedicated storage segments based on a single date/timestamp or integer column; Clustering sorts and colocates data within partitions based on up to 4 user-defined columns.",
            "Clustering splits tables across regions, while partitioning divides CPU cores.",
            "Partitioning works only on NoSQL data, while clustering works on SQL data.",
            "Clustering increases query billing costs, while partitioning doubles query latency."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Combining Partitioning (coarse segmentation by date) with Clustering (fine-grained sorting by filtering columns) maximizes BigQuery scan efficiency.<br><br>⚖️ <strong>Service Comparison:</strong> Partitioning acts as macro-filtering (skipping entire date segments). Clustering acts as micro-filtering within segments (sorting by user IDs or categories)."
    },
    {
        id: 139,
        topic: "storage",
        difficulty: "Hard",
        question: "You accidentally deleted a critical file in a Cloud Storage bucket that had Object Versioning enabled. How can you restore the deleted object?",
        options: [
            "List the object versions using gsutil ls -a, locate the archived version prior to the delete marker, and copy it back using gsutil cp.",
            "Call Google Cloud Billing support to reverse the transaction.",
            "The file is permanently lost; object versioning protects only against overwrites.",
            "Execute gcloud storage buckets rollback --time=1h."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> When Object Versioning is active, deleting an object inserts a noncurrent delete marker. You can inspect archived noncurrent generations and restore them at any time.<br><br>⚖️ <strong>Service Comparison:</strong> Without Object Versioning, file deletions are immediate and irreversible. With Versioning enabled, deleted objects become non-current historical generations."
    },
    {
        id: 140,
        topic: "storage",
        difficulty: "Medium",
        question: "Which Cloud Storage location type provides maximum availability and geographic redundancy by synchronously replicating data across two geographic regions (e.g. Iowa and South Carolina)?",
        options: [
            "Dual-region (or Multi-region) bucket configuration",
            "Single regional zone bucket",
            "Local SSD persistent volume",
            "Cloud NAT edge bucket"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Dual-region storage buckets replicate objects across two distinct geographical areas, guaranteeing continuous availability even during catastrophic regional disasters.<br><br>⚖️ <strong>Service Comparison:</strong> Regional buckets store data in a single geographic place. Dual-region buckets provide geo-redundant disaster resilience across dual continental hubs."
    },
    {
        id: 141,
        topic: "storage",
        difficulty: "Medium",
        question: "You want to query data stored in CSV files in Cloud Storage directly from BigQuery without importing or loading the data into native BigQuery storage tables. What BigQuery feature allows this?",
        options: [
            "External Data Sources (Federated Queries)",
            "Materialized Views",
            "BigQuery BI Engine caching",
            "Cloud Spanner interleave joins"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> BigQuery External Tables (federated queries) read and execute SQL analytics directly against raw CSV, JSON, or Parquet files residing in Cloud Storage.<br><br>⚖️ <strong>Service Comparison:</strong> Native BigQuery tables store data internally for maximum query speed. External tables allow querying external files directly without duplicating storage charges."
    },
    {
        id: 142,
        topic: "storage",
        difficulty: "Hard",
        question: "You are setting up automated daily backups for a Cloud SQL database. You need the ability to restore the database to any specific second within the past 7 days (Point-In-Time Recovery). What requirement must be met?",
        options: [
            "Automated daily backups must be enabled AND binary logging (point-in-time recovery) must be activated.",
            "The database instance must be scaled to 16 vCPUs.",
            "The Cloud SQL instance must use public IP addresses.",
            "You must export CSV snapshots hourly via cron jobs."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Point-In-Time Recovery (PITR) in Cloud SQL relies on continuous binary log archiving combined with automated daily base snapshots.<br><br>⚖️ <strong>Service Comparison:</strong> Standard daily backups allow restoring only to exact daily snapshot timestamps. PITR binary logs allow rolling forward to any specific second before a catastrophic query occurred."
    },
    {
        id: 143,
        topic: "storage",
        difficulty: "Easy",
        question: "What is the maximum storage duration retention limit for objects stored in the Cloud Storage Archive storage class?",
        options: [
            "There is no maximum retention limit; objects remain archived indefinitely until explicitly deleted (with a 365-day minimum storage billing requirement).",
            "Exactly 7 years.",
            "30 days.",
            "100 gigabytes."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Archive storage provides ultra-low cost long-term retention without maximum time constraints, though deleting items before 365 days incurs early deletion charges.<br><br>⚖️ <strong>Service Comparison:</strong> Coldline requires 90 days minimum retention. Archive requires 365 days minimum retention, offering the absolute lowest monthly per-GB rate."
    },
    {
        id: 144,
        topic: "storage",
        difficulty: "Medium",
        question: "How can you encrypt Cloud SQL databases using your own encryption keys managed inside Google Cloud KMS?",
        options: [
            "Select Customer-Managed Encryption Keys (CMEK) during Cloud SQL instance provisioning and authorize the Cloud SQL service account to use the KMS key.",
            "Upload a text file containing the key password into the root database directory.",
            "Cloud SQL supports only Google-managed default encryption keys.",
            "Run a python script to encrypt rows before SQL insertion."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> CMEK integration allows customers to control key lifecycle, rotation, and revocation for Cloud SQL, Spanner, BigQuery, and Cloud Storage.<br><br>⚖️ <strong>Service Comparison:</strong> Default encryption manages keys transparently. CMEK gives regulatory auditors proof that you maintain absolute cryptographic control over database encryption."
    },
    {
        id: 145,
        topic: "storage",
        difficulty: "Hard",
        question: "In Cloud Spanner, what schema design concept allows you to physically colocate child table rows alongside their corresponding parent table row inside the same physical storage node to accelerate JOIN queries?",
        options: [
            "Table Interleaving (`INTERLEAVE IN PARENT`)",
            "Foreign key cascade delete constraints",
            "Secondary B-Tree index partitions",
            "NoSQL document embedding"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Defining `INTERLEAVE IN PARENT` forces Cloud Spanner to physically store child table rows contiguously with parent rows, executing parent-child joins with zero network hops.<br><br>⚖️ <strong>Service Comparison:</strong> Traditional SQL joins scatter reads across disparate hard disk sectors. Spanner table interleaving physically bundles parent/child records in the same storage shard."
    },
    {
        id: 146,
        topic: "storage",
        difficulty: "Easy",
        question: "Which Google Cloud database service is serverless, fully managed, and specifically tailored for interactive ad-hoc SQL analytics across petabytes of enterprise data warehouse tables?",
        options: [
            "BigQuery",
            "Cloud SQL for MySQL",
            "Memorystore for Redis",
            "Cloud Datastore"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> BigQuery is Google's flagship serverless enterprise data warehouse capable of scanning petabytes of structured and semi-structured data in seconds.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud SQL handles OLTP operational online transaction processing. BigQuery handles OLAP analytical online processing across massive petabyte data warehouses."
    },
    {
        id: 147,
        topic: "storage",
        difficulty: "Medium",
        question: "You want to share a BigQuery dataset with an external partner company without giving them direct access to underlying tables containing Personally Identifiable Information (PII). How should you expose the sanitized data?",
        options: [
            "Create an Authorized View that selects only non-PII columns and grant the partner access exclusively to that view.",
            "Email them a snapshot CSV file every morning.",
            "Create an IAM deny policy on the specific PII columns.",
            "Give them primitive Viewer role on the entire GCP project."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Authorized Views allow query access to specific analytical subsets or aggregations without granting read permissions on underlying base tables.<br><br>⚖️ <strong>Service Comparison:</strong> Direct table permissions expose all columns. Authorized Views securely filter out confidential columns at the database execution layer."
    },
    {
        id: 148,
        topic: "storage",
        difficulty: "Hard",
        question: "You need to prevent Cloud Storage buckets from being accessible via the public internet across your entire organization, ensuring no developer can accidentally grant `allUsers` read access. What Organization Policy constraint achieves this?",
        options: [
            "Enforce `constraints/storage.publicAccessPrevention` with enforcement set to True.",
            "Disable all VPC firewall rules.",
            "Delete the default service accounts.",
            "Set bucket quotas to 0 bytes."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `constraints/storage.publicAccessPrevention` acts as a hard organization-wide guardrail overriding any existing or future public IAM bindings on buckets.<br><br>⚖️ <strong>Service Comparison:</strong> Individual bucket IAM audits require constant scanning. Organization Policies establish automated preventative guardrails blocking public sharing across all buckets."
    },
    {
        id: 149,
        topic: "storage",
        difficulty: "Medium",
        question: "Which service automates scheduled batch data transfers from Amazon S3 buckets or HTTP/HTTPS endpoints directly into Google Cloud Storage?",
        options: [
            "Storage Transfer Service",
            "Transfer Appliance physical shipment",
            "Cloud Pub/Sub streaming topic",
            "Cloud Interconnect BGP link"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Storage Transfer Service manages online scheduled transfers, filtering, and checksum validations between external cloud storage providers (S3/Azure) and GCS.<br><br>⚖️ <strong>Service Comparison:</strong> BigQuery Data Transfer Service imports external data into BigQuery analytics tables. Storage Transfer Service imports unstructured files into Cloud Storage buckets."
    },
    {
        id: 150,
        topic: "storage",
        difficulty: "Easy",
        question: "What happens during Cloud SQL maintenance windows when high availability (HA) is enabled?",
        options: [
            "The primary instance fails over to the standby regional replica with a brief disconnection (typically under 60 seconds), applying updates with minimal downtime.",
            "The database goes completely offline for 12 hours.",
            "All data tables are locked in read-only mode for 3 days.",
            "Maintenance windows never occur on HA instances."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> On HA Cloud SQL deployments, maintenance patching triggers an automatic switchover to the standby zone, keeping application interruptions to a matter of seconds.<br><br>⚖️ <strong>Service Comparison:</strong> Single-zone non-HA instances go entirely offline during patching reboots. Regional HA instances switch over to standby zones to preserve SLA continuity."
    },
    {
        id: 151,
        topic: "storage",
        difficulty: "Hard",
        question: "You need to set up a policy so that videos stored in a specific Cloud Storage Regional bucket are moved to Coldline after 90 days, and then deleted after one year from their creation. How should you set up the policy?",
        options: [
            "Use Cloud Storage Object Lifecycle Management using Age conditions with SetStorageClass to Coldline after 90 days and Delete action after 365 days.",
            "Use Object Lifecycle Management setting SetStorageClass to 90 days and Delete action to 275 days (365-90).",
            "Write a cron script running `gsutil rewrite` after 90 days.",
            "Export the storage logs into BigQuery."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Lifecycle age conditions evaluate the total age of an object from its creation date. Setting SetStorageClass at 90 days and Delete at 365 days correctly handles the exact lifecycle milestones.<br><br>⚖️ <strong>Service Comparison:</strong> Age rules evaluate cumulative time since object birth, not time spent within an intermediate storage tier."
    },
    {
        id: 152,
        topic: "storage",
        difficulty: "Medium",
        question: "You want to run a single caching HTTP reverse proxy on GCP for a latency-sensitive website. This reverse proxy consumes almost no CPU, requires a 30-GB in-memory cache, and 2 GB for system processes. To minimize costs, which solution should you choose?",
        options: [
            "Create a Cloud Memorystore for Redis instance with 32-GB capacity.",
            "Run it on Compute Engine, choosing a custom instance type with 6 vCPUs and 32 GB of memory.",
            "Package it in a container image and run on GKE using n1-standard-32 instances.",
            "Run on Compute Engine n1-standard-1 with a 32 GB SSD persistent disk."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Memorystore provides managed in-memory caching tailored precisely for high-speed key-value session stores without paying for unused VM CPU cores.<br><br>⚖️ <strong>Service Comparison:</strong> Custom VMs require manual Redis patching and OS management. Fully managed Memorystore abstracts maintenance while delivering sub-millisecond caching speeds."
    },
    {
        id: 153,
        topic: "storage",
        difficulty: "Easy",
        question: "You need to run an important query in BigQuery but expect it to look through billions of records. You want to find out how much it will cost to run before executing it on-demand. What should you do?",
        options: [
            "Use the console query validator or run a dry run query (`bq query --dry_run`) to estimate the number of bytes read, then calculate dollars using the GCP Pricing Calculator.",
            "Run a `SELECT COUNT(*)` query first.",
            "Switch to flat-rate pricing for 5 minutes.",
            "Look at the billing invoice tomorrow morning."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Dry run queries calculate the precise gigabytes scanned by SQL queries at zero cost, empowering developers to estimate financial charges before execution.<br><br>⚖️ <strong>Service Comparison:</strong> `SELECT COUNT(*)` still scans table data and incurs billing charges. `--dry_run` evaluates table metadata without scanning actual bytes."
    },
    {
        id: 154,
        topic: "storage",
        difficulty: "Hard",
        question: "You built an application using Cloud Spanner. Your support team needs to monitor database environment performance and metrics but should not have access to view sensitive table row data. Which IAM role should you grant?",
        options: [
            "roles/monitoring.viewer (or roles/spanner.viewer)",
            "roles/spanner.databaseUser",
            "roles/spanner.databaseReader",
            "roles/editor"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Granting `roles/monitoring.viewer` or `roles/spanner.viewer` allows support staff to inspect cluster health and CPU metrics without permitting data queries against database tables.<br><br>⚖️ <strong>Service Comparison:</strong> `spanner.databaseReader` grants permission to execute SELECT queries reading table contents. `monitoring.viewer` isolates visibility strictly to operational telemetry graphs."
    },
    {
        id: 155,
        topic: "storage",
        difficulty: "Medium",
        question: "Your company uses Cloud Storage to store application backup files for disaster recovery purposes. You want to follow Google's recommended practices for backup archives accessed less than once a year. Which storage option should you use?",
        options: [
            "Archive Storage (or Coldline Storage)",
            "Multi-Regional Standard Storage",
            "Regional Standard Storage",
            "Nearline Storage"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Archive and Coldline storage provide ultra-low monthly storage costs specifically tailored for disaster recovery backups accessed rarely.<br><br>⚖️ <strong>Service Comparison:</strong> Standard storage is optimized for hot daily web assets. Coldline/Archive slash monthly storage fees by up to 80% for long-term cold vault archives."
    },
    {
        id: 156,
        topic: "storage",
        difficulty: "Easy",
        question: "You need to grant access for three users so they can view and edit table data inside a specific Cloud Spanner database instance. What is the most efficient best practice?",
        options: [
            "Create a Google Group containing the three users, and grant `roles/spanner.databaseUser` to the group.",
            "Bind `roles/spanner.databaseUser` to each user individually via CLI commands.",
            "Grant primitive Editor role on the entire GCP project.",
            "Share the database root password via encrypted email."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Managing IAM policies via Google Groups simplifies onboarding and offboarding, ensuring centralized identity governance without repeated individual binding edits.<br><br>⚖️ <strong>Service Comparison:</strong> Individual IAM bindings clutter policy manifests and increase audit difficulty. Group-based IAM bindings decouple security governance from personnel changes."
    },
    {
        id: 157,
        topic: "storage",
        difficulty: "Hard",
        question: "You have sensitive data stored in three Cloud Storage buckets with data access logging enabled. You want to verify activities for a particular user, identifying which files they viewed and what metadata labels were added. What tool should you use?",
        options: [
            "Filter Data Access Audit Logs in the Cloud Logging (formerly Stackdriver) activity logs interface.",
            "View the bucket storage properties tab in the Cloud Console.",
            "Create a trace in Cloud Trace.",
            "Look at the Cloud Billing invoice reports."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Logging provides comprehensive filtering syntax allowing auditors to query Data Access logs by principal email, method name, and target bucket URI.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Trace inspects microservice execution latency waterfall graphs. Cloud Logging records explicit security audit histories and API access records."
    },
    {
        id: 158,
        topic: "storage",
        difficulty: "Medium",
        question: "You are building an application that stores relational data from users worldwide. Your CTO is concerned about scaling because user base growth is unpredictable. You need a relational database solution scaling seamlessly with minimal configuration changes. What should you select?",
        options: [
            "Cloud Spanner",
            "Cloud SQL",
            "Cloud Firestore",
            "Cloud Datastore"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Spanner combines relational SQL structure with horizontal sharding across global nodes, absorbing unpredictable user growth effortlessly.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud SQL requires manual vertical sharding or instance upgrades when encountering monolithic limits. Cloud Spanner scales relational compute capacity out horizontally on demand."
    },
    {
        id: 159,
        topic: "storage",
        difficulty: "Easy",
        question: "What is the primary architectural difference between Cloud Firestore in Native mode and Cloud Firestore in Datastore mode?",
        options: [
            "Native mode supports real-time client SDK synchronization and mobile offline persistence; Datastore mode optimizes for massive server-side backend scaling and backward compatibility with legacy Datastore.",
            "Native mode is relational SQL, while Datastore mode is wide-column NoSQL.",
            "Datastore mode is deprecated.",
            "Native mode requires manual SSD provisioning."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Firestore Native mode caters to mobile/web client synchronization. Datastore mode caters to server-to-server high throughput web applications.<br><br>⚖️ <strong>Service Comparison:</strong> Choose Native mode when building reactive web/mobile apps. Choose Datastore mode when migrating legacy backend server workloads requiring high write throughput."
    },
    {
        id: 160,
        topic: "storage",
        difficulty: "Hard",
        question: "You need to export Cloud Storage bucket usage metrics and daily billing ingestion logs into BigQuery for automated SQL anomaly detection. What should you configure?",
        options: [
            "Enable Cloud Billing Data Export to BigQuery and set up Cloud Storage Storage Transfer logs.",
            "Write an App Engine script downloading daily CSV summaries.",
            "Take screenshots of the storage dashboard.",
            "Enable DNS signing on the bucket."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Automated Cloud Billing exports stream daily granular cost and usage telemetry directly into BigQuery tables for automated SQL auditing.<br><br>⚖️ <strong>Service Comparison:</strong> Manual CSV downloads provide static historical lookbacks. BigQuery streaming exports enable automated real-time financial anomaly alerting."
    }
);
