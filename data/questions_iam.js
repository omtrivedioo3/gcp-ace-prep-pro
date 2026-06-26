/* ==========================================================================
   Question Bank Part 1: IAM & Access Security (Questions 1 - 60)
   ========================================================================== */

window.QUESTION_BANK = window.QUESTION_BANK || [];

window.QUESTION_BANK.push(
    {
        id: 1,
        topic: "iam",
        difficulty: "Medium",
        question: "Your company is planning to migrate its on-premises workloads to Google Cloud. The Chief Security Officer specifies that development teams must be able to view logs and instances in the production project, but must not be permitted to create, modify, or delete any resources in production. How should you configure IAM policies?",
        options: [
            "Grant the development group the Viewer role at the organization level.",
            "Grant the development group the roles/viewer role on the production project.",
            "Create a custom role with compute.instances.get permissions and bind it to each developer individually.",
            "Grant the development group the roles/editor role on the production project with an IAM deny policy for creation."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> The predefined <code>roles/viewer</code> role provides read-only access to existing resources and data within Google Cloud. Binding this predefined role at the production project level to a Google Group representing developers adheres to the principle of least privilege and reduces management overhead.<br><br>⚖️ <strong>Service Comparison:</strong> Primitive roles (Viewer/Editor/Owner) apply project-wide. Granting at the Organization level would over-permission users across all projects. Custom roles add maintenance overhead when a standard predefined role fits perfectly."
    },
    {
        id: 2,
        topic: "iam",
        difficulty: "Hard",
        question: "You have an application running on an on-premises server outside of Google Cloud. This application needs to access a Cloud Storage bucket inside your Google Cloud project. You want to implement the most secure authentication mechanism without embedding long-lived credentials in source code. What should you do?",
        options: [
            "Export a service account JSON key file, transfer it to the on-premises server, and set the GOOGLE_APPLICATION_CREDENTIALS environment variable.",
            "Configure Workload Identity Federation between your on-premises identity provider and Google Cloud IAM.",
            "Create a Google account for the server, run gcloud auth login on the on-premises machine, and grant IAM bucket access.",
            "Whitelist the on-premises server's external IP address in Cloud Storage firewall settings."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Workload Identity Federation allows external identities (like AWS, Azure, or on-premises Active Directory/OIDC providers) to authenticate directly to Google Cloud without downloading long-lived JSON service account keys.<br><br>⚖️ <strong>Service Comparison:</strong> Service Account JSON keys pose severe leakage and key-rotation security risks. IP whitelisting lacks cryptographic identity verification, and human Google user login is inappropriate for automated server workloads."
    },
    {
        id: 3,
        topic: "iam",
        difficulty: "Easy",
        question: "A junior cloud administrator needs to list all IAM policy bindings for a project named 'production-web-app' using the Google Cloud SDK. Which command should they execute?",
        options: [
            "gcloud iam service-accounts list --project=production-web-app",
            "gcloud projects get-iam-policy production-web-app",
            "gcloud resource-manager projects describe production-web-app",
            "gcloud config set project production-web-app && gcloud iam roles list"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> The command <code>gcloud projects get-iam-policy [PROJECT_ID]</code> retrieves the complete IAM policy (members and role bindings) attached to the specified project resource.<br><br>⚖️ <strong>Service Comparison:</strong> <code>gcloud iam service-accounts list</code> only enumerates service accounts, not human bindings or assigned roles. <code>gcloud projects describe</code> returns project metadata (name, labels, project number), not IAM security policies."
    },
    {
        id: 4,
        topic: "iam",
        difficulty: "Medium",
        question: "You want to grant a data analyst access to query datasets in BigQuery across multiple projects within a specific department folder. To minimize administrative effort and maintain consistent permissions, where and how should you assign the role?",
        options: [
            "Assign roles/bigquery.dataViewer and roles/bigquery.user to the user on each project individually.",
            "Assign roles/bigquery.dataViewer and roles/bigquery.user to a Google Group at the Folder level.",
            "Assign roles/bigquery.admin at the Organization level.",
            "Create a service account in each project, grant it BigQuery permissions, and give the user Service Account Token Creator role."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Permissions granted at higher levels of the resource hierarchy (Folder or Organization) flow down and are inherited by all child resources (Projects). Managing users via Google Groups simplifies onboarding and governance.<br><br>⚖️ <strong>Service Comparison:</strong> Project-level binding requires repetitive manual updates when new projects are spawned. Organization-level assignment grants excessively broad access across unrelated departments."
    },
    {
        id: 5,
        topic: "iam",
        difficulty: "Hard",
        question: "An application deployed on a Compute Engine instance requires permissions to write metric data to Cloud Monitoring and publish messages to a Pub/Sub topic. Currently, the instance uses the default compute service account with basic Editor permissions. How should you secure this configuration?",
        options: [
            "Create a user-managed service account, grant it only roles/monitoring.metricWriter and roles/pubsub.publisher, and attach it to the instance.",
            "Modify the default compute service account IAM policy to remove Editor role and add Viewer role.",
            "Keep the default service account, but generate a JSON key and embed it inside the application container.",
            "Attach the Organization Administrator role to the VM so it can dynamically request OAuth2 access tokens."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Using the default Compute Engine service account with Editor privileges violates least privilege. You should always create a dedicated user-managed service account assigned only the specific predefined roles required by the workload.<br><br>⚖️ <strong>Service Comparison:</strong> Predefined least-privilege roles restrict lateral blast radius upon compromise. The primitive Editor role allows creating/deleting resources across the entire project."
    },
    {
        id: 6,
        topic: "iam",
        difficulty: "Medium",
        question: "You are setting up billing alarms for a new project. You need to give an accounting contractor the ability to view billing account reports and budgets, but restrict them from modifying alerting thresholds or linking/unlinking projects. Which IAM role is appropriate?",
        options: [
            "roles/billing.admin",
            "roles/billing.user",
            "roles/billing.viewer",
            "roles/resourcemanager.organizationViewer"
        ],
        correctAnswer: 2,
        explanation: "💡 <strong>Explanation:</strong> <code>roles/billing.viewer</code> provides read-only access to view billing account costs, reports, and budgets without allowing changes to billing account configurations or project linkages.<br><br>⚖️ <strong>Service Comparison:</strong> <code>roles/billing.admin</code> allows modifying payment instruments and linking projects. <code>roles/billing.user</code> allows linking new projects to the billing account."
    },
    {
        id: 7,
        topic: "iam",
        difficulty: "Easy",
        question: "What is the primary difference between primitive roles (Owner, Editor, Viewer) and predefined IAM roles in Google Cloud?",
        options: [
            "Primitive roles apply only to Cloud Storage, whereas predefined roles apply globally across all Google Cloud services.",
            "Primitive roles offer broad, coarse-grained permissions across all project resources, while predefined roles provide fine-grained permissions tailored to specific services.",
            "Predefined roles can only be assigned to service accounts, while primitive roles are restricted to human user accounts.",
            "Primitive roles incur additional billing charges, while predefined IAM roles are free to use."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Primitive roles grant expansive permissions across almost all resources in a project. Google strongly recommends using predefined roles, which group granular API permissions curated for specific job functions.<br><br>⚖️ <strong>Service Comparison:</strong> Predefined roles map directly to specific GCP services (e.g. Storage Object Viewer vs Compute Instance Admin), whereas Primitive roles grant sweeping project-wide read/write capabilities."
    },
    {
        id: 8,
        topic: "iam",
        difficulty: "Hard",
        question: "You need to create a custom IAM role that combines permissions to restart Compute Engine VMs and view Cloud Storage bucket metadata. Which gcloud command creates a custom role at the organization level?",
        options: [
            "gcloud iam roles create custom_operator --organization=123456789 --file=role_def.yaml",
            "gcloud projects add-iam-policy-binding 123456789 --role=custom_operator",
            "gcloud iam service-accounts create custom_operator --org=123456789",
            "gcloud organizations add-iam-policy-binding 123456789 --member=role/custom_operator"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>gcloud iam roles create [ROLE_ID] --organization=[ORG_ID] --file=[YAML_FILE]</code> creates an organization-level custom IAM role defined in the specified YAML manifest file.<br><br>⚖️ <strong>Service Comparison:</strong> Custom roles can be created at either the Organization or Project level. Organization-level custom roles are selectable across any child project, whereas project-level custom roles are confined to that project."
    },
    {
        id: 9,
        topic: "iam",
        difficulty: "Medium",
        question: "Your team uses Cloud Identity to synchronize user identities from Microsoft Active Directory. An employee leaves the company and their AD account is disabled. What happens to their Google Cloud IAM access?",
        options: [
            "Their Google Cloud access remains active until their SSH keys expire after 90 days.",
            "Cloud Identity directory sync suspends their Google account, immediately revoking their access to Google Cloud resources.",
            "The project owner receives an email prompt asking whether to remove the user from IAM bindings.",
            "The user can still log in to the Google Cloud Console using cached OAuth tokens for up to 30 days."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> When Google Cloud Directory Sync (GCDS) disables or suspends a user in the federated source provider (Active Directory), Cloud Identity suspends the corresponding Google account, immediately invalidating access.<br><br>⚖️ <strong>Service Comparison:</strong> Federated Cloud Identity centralized lifecycles ensure instantaneous offboarding across all cloud resources, unlike unmanaged Gmail accounts which remain active indefinitely."
    },
    {
        id: 10,
        topic: "iam",
        difficulty: "Hard",
        question: "A developer requires permission to impersonate a specific service account ('deployer@app.iam.gserviceaccount.com') to trigger continuous deployment pipelines. Which role must be granted to the developer on that target service account?",
        options: [
            "roles/iam.serviceAccountKeyAdmin",
            "roles/iam.serviceAccountUser",
            "roles/iam.securityAdmin",
            "roles/editor"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Granting <code>roles/iam.serviceAccountUser</code> on a specific service account allows a human user or another entity to impersonate or attach that service account to compute resources.<br><br>⚖️ <strong>Service Comparison:</strong> <code>roles/iam.serviceAccountKeyAdmin</code> allows downloading long-lived JSON keys, whereas <code>Service Account User</code> enables runtime impersonation without key extraction."
    },
    {
        id: 11,
        topic: "iam",
        difficulty: "Medium",
        question: "You want to store database API passwords securely and allow your application to fetch them at runtime. You also need automatic secret rotation notifications via Cloud Pub/Sub. Which Google Cloud service should you use?",
        options: [
            "Google Cloud KMS (Key Management Service)",
            "Secret Manager",
            "Cloud Storage encrypted with Customer-Supplied Encryption Keys (CSEK)",
            "Compute Engine metadata server custom attributes"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Secret Manager is Google Cloud's dedicated service for securely storing API keys, passwords, and certificates with versioning, IAM access control, and built-in integration with Pub/Sub for rotation alerts.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud KMS encrypts data bytes (key wrapping) but does not store payload secrets or handle payload versioning. Secret Manager handles encrypted payload persistence."
    },
    {
        id: 12,
        topic: "iam",
        difficulty: "Easy",
        question: "Which IAM hierarchy order correctly depicts resource permission inheritance from highest to lowest level?",
        options: [
            "Project -> Folder -> Organization -> Resource",
            "Organization -> Folder -> Project -> Resource",
            "Folder -> Organization -> Project -> Resource",
            "Resource -> Project -> Folder -> Organization"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Google Cloud hierarchy follows: Organization (Root) -> Folders (Optional departments) -> Projects -> Individual Resources (VMs, buckets, topics). Permissions flow downward.<br><br>⚖️ <strong>Service Comparison:</strong> Child resources inherit all permissions from parents. You cannot revoke an inherited permission at a lower project level; you must remove it at the parent level or use IAM Deny."
    },
    {
        id: 13,
        topic: "iam",
        difficulty: "Hard",
        question: "You suspect that an unauthorized user attempted to access sensitive customer files stored in a Cloud Storage bucket named 'archive-data'. Which audit log log-type should you analyze in Cloud Logging to investigate read attempts?",
        options: [
            "Admin Activity audit logs",
            "Data Access audit logs (DATA_READ)",
            "System Event audit logs",
            "VPC Flow Logs"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Data Access audit logs record API operations that read configuration or metadata, as well as API calls that read/write user-provided resource data (e.g. `storage.objects.get`).<br><br>⚖️ <strong>Service Comparison:</strong> Admin Activity logs record administrative configuration changes (e.g. creating a bucket or altering IAM), whereas Data Access logs capture object payload reads."
    },
    {
        id: 14,
        topic: "iam",
        difficulty: "Medium",
        question: "You need to ensure that no IAM service account keys can be exported or created across your entire Google Cloud Organization to enforce Workload Identity. Which tool should you use?",
        options: [
            "VPC Service Controls ingress rules",
            "Organization Policies (constraints/iam.disableServiceAccountKeyCreation)",
            "Cloud Armor web application firewall rules",
            "IAM Deny policies applied to the primitive Editor role"
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> Organization Policies provide centralized governance across your cloud resource hierarchy. Enforcing <code>constraints/iam.disableServiceAccountKeyCreation</code> blocks user creation of service account JSON keys.<br><br>⚖️ <strong>Service Comparison:</strong> IAM defines *who* can do *what*, whereas Organization Policies define absolute guardrails on *what configurations are allowable* across the cloud hierarchy."
    },
    {
        id: 15,
        topic: "iam",
        difficulty: "Medium",
        question: "A project has an IAM policy binding granting 'roles/storage.objectViewer' to 'allAuthenticatedUsers'. Who can read objects inside this project's Cloud Storage buckets?",
        options: [
            "Only authenticated users belonging to your company's Google Workspace domain.",
            "Any user on the internet who has authenticated with any Google account (including personal Gmail accounts).",
            "Only service accounts created within that specific project.",
            "Any anonymous user making unauthenticated HTTP requests over the public internet."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> <code>allAuthenticatedUsers</code> is a special identifier representing anyone who is authenticated with a Google account or service account across the entire internet.<br><br>⚖️ <strong>Service Comparison:</strong> <code>allUsers</code> includes anonymous unauthenticated internet visitors. To restrict strictly to your corporate domain, use <code>domain:example.com</code>."
    },
    {
        id: 16,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to protect BigQuery datasets and Cloud Storage buckets from exfiltration by ensuring that even if a service account key is stolen, the data cannot be accessed from outside your corporate network perimeter. What should you configure?",
        options: [
            "VPC Service Controls service perimeter",
            "Cloud NAT private IP mapping",
            "Identity-Aware Proxy (IAP) TCP forwarding",
            "VPC firewall deny rules for port 443"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VPC Service Controls create a secure perimeter around Google Cloud managed API services. API requests originating from outside the perimeter are blocked even with valid IAM credentials.<br><br>⚖️ <strong>Service Comparison:</strong> VPC firewalls govern packet traffic on VM interfaces (Layer 3/4), whereas VPC Service Controls govern Google API endpoint calls (Storage/BigQuery APIs)."
    },
    {
        id: 17,
        topic: "iam",
        difficulty: "Easy",
        question: "Which predefined role allows a user to create, modify, and delete virtual machine instances in Compute Engine, but does NOT allow them to grant IAM permissions to other users?",
        options: [
            "roles/compute.admin",
            "roles/owner",
            "roles/iam.securityAdmin",
            "roles/compute.networkAdmin"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>roles/compute.admin</code> provides full control over Compute Engine resources without granting IAM modification privileges.<br><br>⚖️ <strong>Service Comparison:</strong> <code>roles/owner</code> grants broad project access plus IAM policy management. <code>roles/compute.admin</code> confines authority strictly to compute virtual machines."
    },
    {
        id: 18,
        topic: "iam",
        difficulty: "Medium",
        question: "How can you grant temporary access to a Google Cloud project resource that automatically expires after 8 hours during a critical production incident?",
        options: [
            "Create a temporary user account and run a cron job to delete it after 8 hours.",
            "Use IAM Conditions with a timestamp attribute expression (e.g., request.time < timestamp('...')).",
            "Issue a signed URL for the entire Google Cloud project.",
            "Modify the user's OAuth refresh token lifespan in Google Workspace console."
        ],
        correctAnswer: 1,
        explanation: "💡 <strong>Explanation:</strong> IAM Conditions enable conditional role bindings based on attributes such as request date/time, IP address prefix, or target resource name. Specifying an expiry timestamp ensures permissions automatically lapse.<br><br>⚖️ <strong>Service Comparison:</strong> IAM Conditions automate expiration at the identity policy layer, whereas Signed URLs are strictly temporary cryptographic object links for Cloud Storage."
    },
    {
        id: 19,
        topic: "iam",
        difficulty: "Hard",
        question: "When creating a custom IAM role, you notice that some desired permissions are marked as 'Testing' or 'Supported'. Can you include permissions marked as 'Testing' in production custom roles?",
        options: [
            "Yes, but Google does not guarantee backwards compatibility or stability for testing permissions.",
            "No, gcloud will reject custom role creation if testing permissions are included.",
            "Yes, testing permissions automatically transition to supported status after 14 days.",
            "No, testing permissions can only be applied inside projects labeled as 'development'."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Permissions in 'Testing' stage can be included in custom roles, but Google warns that they might experience breaking changes, removal, or unexpected behavior without prior notice.<br><br>⚖️ <strong>Service Comparison:</strong> 'Supported' permissions are backed by SLA stability guarantees, while 'Testing' permissions are early-stage beta API permissions."
    },
    {
        id: 20,
        topic: "iam",
        difficulty: "Medium",
        question: "You want to verify which IAM roles grant the specific API permission `resourcemanager.projects.delete`. Which gcloud command should you use?",
        options: [
            "gcloud iam roles query --permission=resourcemanager.projects.delete",
            "gcloud iam permissions list --filter=resourcemanager.projects.delete",
            "gcloud iam roles list --show-deleted",
            "gcloud projects get-iam-policy --search-permissions"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> The command <code>gcloud iam roles query --permission=[PERMISSION_STRING]</code> searches and lists all predefined and custom roles that contain the specified API permission.<br><br>⚖️ <strong>Service Comparison:</strong> <code>gcloud iam roles list</code> enumerates role titles, whereas <code>roles query</code> inspects internal API permission strings."
    },
    {
        id: 21,
        topic: "iam",
        difficulty: "Medium",
        question: "You need to audit all service account keys in your Google Cloud organization older than 90 days to enforce regular rotation policies. Which service provides centralized visibility into key expiration and usage metrics across projects?",
        options: [
            "Asset Inventory (Cloud Asset API) query or IAM Policy Troubleshooter",
            "Cloud Storage object lifecycle logs",
            "VPC Service Controls perimeter logs",
            "Secret Manager key rotation engine"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Asset Inventory provides inventory and search capabilities across your organization's resources and IAM policies, allowing administrators to scan for active service account keys.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Asset Inventory searches historical resource state across organizational scopes, while Cloud Logging tracks immediate real-time API request events."
    },
    {
        id: 22,
        topic: "iam",
        difficulty: "Easy",
        question: "A colleague is unable to access a newly created Cloud Storage bucket even though they have the primitive Editor role on the project. What is the most likely reason?",
        options: [
            "An organization policy or IAM condition blocks their access, or the bucket uses IAM Conditions restricting access by IP or time.",
            "Primitive roles do not grant storage permissions.",
            "Bucket permissions require a 24-hour propagation delay.",
            "They must first SSH into a Compute Engine instance in the same region."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> While primitive roles grant broad access, explicit IAM Conditions, Organization Policy constraints, or VPC Service Controls perimeters can override or restrict access even for project Editors or Owners.<br><br>⚖️ <strong>Service Comparison:</strong> Organization Policies and Deny rules act as hierarchical boundaries overriding standard IAM allow grants."
    },
    {
        id: 23,
        topic: "iam",
        difficulty: "Hard",
        question: "You need to securely provide authentication credentials to an application running inside an on-premises Kubernetes cluster so it can call Google Cloud BigQuery APIs. You want to avoid storing JSON key files on disk. What architecture should you implement?",
        options: [
            "Workload Identity Federation configured with Kubernetes OpenID Connect (OIDC) tokens.",
            "Store a service account JSON key inside a Kubernetes Secret encoded in Base64.",
            "Map a static external IP address and add it to BigQuery IP whitelist.",
            "Run gcloud auth application-default login during the pod init container stage."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> By configuring Workload Identity Federation with your Kubernetes cluster's OIDC issuer, on-premises pods can trade their projected Kubernetes service account tokens directly for short-lived Google Cloud OAuth 2.0 tokens.<br><br>⚖️ <strong>Service Comparison:</strong> Workload Identity Federation eliminates long-lived credentials, whereas Kubernetes Base64 Secrets can still be decoded and extracted from cluster storage."
    },
    {
        id: 24,
        topic: "iam",
        difficulty: "Medium",
        question: "Your team wants to prevent users from accidentally deleting or disabling critical organization-level logging projects. Which resource protection mechanism should you apply to the production logging project?",
        options: [
            "Enable liens (gcloud resource-manager liens create) on the project.",
            "Set the project billing budget threshold to 0%.",
            "Remove the project Owner role and assign only primitive Viewer role to all users.",
            "Store the project inside a hidden folder."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> A resource lien applied to a project prevents accidental deletion. As long as a lien exists on a project, any request to delete the project will fail until the lien is explicitly removed.<br><br>⚖️ <strong>Service Comparison:</strong> Resource Liens block deletion API requests, whereas IAM roles manage general modification access."
    },
    {
        id: 25,
        topic: "iam",
        difficulty: "Medium",
        question: "An external contractor needs access to SSH into a specific Compute Engine VM instance in your development project for debugging, but must not be allowed to SSH into any other VMs in the project. Which IAM role should you grant them on that specific instance resource?",
        options: [
            "roles/compute.osLogin or roles/compute.osAdminLogin granted on the instance resource.",
            "roles/compute.instanceAdmin.v1 granted at the project level.",
            "roles/owner granted at the folder level.",
            "roles/iam.serviceAccountKeyAdmin granted on the VM's service account."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Binding `roles/compute.osLogin` directly to the specific VM instance resource in IAM ensures the contractor can SSH only into that designated machine.<br><br>⚖️ <strong>Service Comparison:</strong> Project-level IAM bindings grant permissions across all VMs in the project. Resource-level IAM bindings isolate permissions to that exact target instance."
    },
    {
        id: 26,
        topic: "iam",
        difficulty: "Easy",
        question: "Which IAM role is required to link a Google Cloud project to a billing account?",
        options: [
            "roles/billing.user on the billing account and roles/resourcemanager.projectBillingManager on the project.",
            "roles/billing.viewer on the billing account.",
            "roles/iam.securityAdmin on the project.",
            "roles/compute.admin on the billing account."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> To link a project to a billing account, a user needs `roles/billing.user` on the billing account and `roles/resourcemanager.projectBillingManager` (or project owner/editor) on the project.<br><br>⚖️ <strong>Service Comparison:</strong> Billing User authorizes linking resource projects to financial payment instruments, while Project Billing Manager manages the linkage within the project."
    },
    {
        id: 27,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to delegate administration of a specific folder named 'Marketing' to a team lead so they can create projects and grant IAM roles to users inside that folder only. Which roles should you assign to the team lead at the 'Marketing' folder level?",
        options: [
            "roles/resourcemanager.folderAdmin and roles/resourcemanager.projectCreator on the folder.",
            "roles/owner at the organization level.",
            "roles/iam.roleAdmin on the organization root.",
            "roles/compute.admin on the folder."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `roles/resourcemanager.folderAdmin` allows managing IAM policies and folder contents, while `roles/resourcemanager.projectCreator` allows creating new projects within that specific folder scope.<br><br>⚖️ <strong>Service Comparison:</strong> Folder Admin delegates hierarchical autonomy without granting organization-wide privileges."
    },
    {
        id: 28,
        topic: "iam",
        difficulty: "Medium",
        question: "When should you choose to create a Custom IAM Role instead of using a Predefined IAM Role?",
        options: [
            "When no single predefined role provides the exact least-privilege combination of permissions required by an internal auditing compliance mandate.",
            "When you want to avoid paying monthly IAM licensing charges.",
            "When you need to grant full root access to an organization owner.",
            "When deploying applications on Cloud Run instead of GKE."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Custom IAM roles should be created when existing predefined roles provide too many or too few permissions, allowing organizations to strictly adhere to least privilege.<br><br>⚖️ <strong>Service Comparison:</strong> Predefined roles are automatically updated and maintained by Google when new API capabilities emerge. Custom roles require manual lifecycle maintenance by your cloud security team."
    },
    {
        id: 29,
        topic: "iam",
        difficulty: "Medium",
        question: "You suspect that an IAM policy change caused an outage by revoking access to a core service account. Which tool allows you to simulate and inspect whether a specific user or service account has permission to call an API on a specific resource?",
        options: [
            "Policy Troubleshooter",
            "Cloud Profiler",
            "Network Intelligence Center",
            "VPC Flow Logs"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Policy Troubleshooter takes an email address, resource URI, and permission string, evaluating current IAM policy bindings across the hierarchy to explain why access is allowed or denied.<br><br>⚖️ <strong>Service Comparison:</strong> Policy Troubleshooter inspects IAM security bindings, whereas Network Intelligence Center inspects packet routing and firewalls."
    },
    {
        id: 30,
        topic: "iam",
        difficulty: "Easy",
        question: "What is the recommended practice for managing API authentication keys when using Google Cloud client libraries inside a Compute Engine instance?",
        options: [
            "Use Application Default Credentials (ADC) attached to the instance's service account instead of downloading API keys or JSON files.",
            "Hardcode API keys inside the application source repository.",
            "Store JSON keys inside the /tmp directory with world-readable permissions.",
            "Create a new human Gmail account and paste its OAuth token into environmental variables."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Application Default Credentials (ADC) automatically discover the compute environment's attached service account metadata server, eliminating the need to manage static credentials.<br><br>⚖️ <strong>Service Comparison:</strong> ADC leverages automatic metadata tokens. Manual JSON keys introduce severe vulnerability risks if committed to version control."
    },
    {
        id: 31,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to enforce MFA (Multi-Factor Authentication) and 2-Step Verification for all corporate employees logging into the Google Cloud Console. Where must this security policy be enforced?",
        options: [
            "In Google Workspace / Cloud Identity Admin Console security settings.",
            "Inside the Compute Engine VPC firewall rules.",
            "Using a gcloud iam service-accounts update command.",
            "Inside the Cloud Storage bucket encryption settings."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Human user identity authentication policies, including password complexity, session length, and 2-Step Verification (MFA), are centrally managed inside the Cloud Identity or Google Workspace Admin Console.<br><br>⚖️ <strong>Service Comparison:</strong> Cloud Identity manages identity authentication factors (MFA), whereas Google Cloud IAM manages authorization permissions."
    },
    {
        id: 32,
        topic: "iam",
        difficulty: "Medium",
        question: "A team lead created a custom role at the project level, but wants to make it available across all 50 projects in the organization. How can they achieve this?",
        options: [
            "Re-create the custom role at the Organization level so it is inherited across all projects.",
            "Export the role as an SSH key and attach it to each VM.",
            "Create a VPC peering connection between all projects.",
            "Grant the primitive Editor role to all users in the 50 projects."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Custom roles defined at the project level cannot be referenced by other projects. Defining the custom role at the Organization level makes it globally selectable across any folder or project.<br><br>⚖️ <strong>Service Comparison:</strong> Organization-level roles centralize policy definitions, preventing configuration drift across multi-project organizations."
    },
    {
        id: 33,
        topic: "iam",
        difficulty: "Medium",
        question: "You need to prevent developers from creating Compute Engine instances with external public IP addresses to comply with internal network security guidelines. Which Organization Policy constraint should you enforce?",
        options: [
            "constraints/compute.vmExternalIpAccess",
            "constraints/iam.allowedPolicyMemberDomains",
            "constraints/storage.publicAccessPrevention",
            "constraints/sql.restrictPublicIp"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Enforcing `constraints/compute.vmExternalIpAccess` with a deny-all rule blocks creation or modification of VM instances configured with external public IPv4 addresses across the target scope.<br><br>⚖️ <strong>Service Comparison:</strong> VPC firewalls block inbound packets to external IPs, whereas Organization Policies prevent the physical provisioning of external IP addresses entirely."
    },
    {
        id: 34,
        topic: "iam",
        difficulty: "Easy",
        question: "Which gcloud command binds the predefined role `roles/pubsub.subscriber` to a service account `my-sa@my-project.iam.gserviceaccount.com` on a project named `my-project`?",
        options: [
            "gcloud projects add-iam-policy-binding my-project --member=serviceAccount:my-sa@my-project.iam.gserviceaccount.com --role=roles/pubsub.subscriber",
            "gcloud iam service-accounts grant my-sa --role=subscriber",
            "gcloud pubsub subscriptions create my-sa --project=my-project",
            "gcloud config set role roles/pubsub.subscriber for my-sa"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `gcloud projects add-iam-policy-binding [PROJECT_ID] --member=[MEMBER_TYPE]:[ID] --role=[ROLE]` is the standard syntax for attaching an IAM role binding at the project level.<br><br>⚖️ <strong>Service Comparison:</strong> <code>add-iam-policy-binding</code> appends a member without overwriting existing policies, whereas <code>set-iam-policy</code> overwrites the entire IAM manifest."
    },
    {
        id: 35,
        topic: "iam",
        difficulty: "Hard",
        question: "You have configured Identity-Aware Proxy (IAP) to secure an internal web application deployed on App Engine. Which IAM role must you grant to users so they can pass through the IAP authentication prompt and view the app?",
        options: [
            "roles/iap.httpsResourceAccessor",
            "roles/compute.networkViewer",
            "roles/owner",
            "roles/appengine.deployer"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `roles/iap.httpsResourceAccessor` (IAP-secured Web App User) grants authenticated principals permission to access HTTP resources secured by Google Identity-Aware Proxy.<br><br>⚖️ <strong>Service Comparison:</strong> IAP provides identity-based zero-trust edge authentication before requests ever reach the underlying App Engine or Compute Engine backend."
    },
    {
        id: 36,
        topic: "iam",
        difficulty: "Medium",
        question: "What is the primary function of Google Cloud KMS (Key Management Service)?",
        options: [
            "To generate, rotate, and manage cryptographic keys used for Customer-Managed Encryption Keys (CMEK) across cloud storage and database services.",
            "To store plaintext user passwords for web applications.",
            "To issue SSL/TLS certificates for Cloud Load Balancers automatically.",
            "To manage SSH access keys for Linux VM instances."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud KMS allows customers to generate, use, rotate, and destroy symmetric and asymmetric cryptographic encryption keys to protect data at rest via CMEK integration.<br><br>⚖️ <strong>Service Comparison:</strong> Default Google-Managed Encryption Keys handle rotation invisibly. CMEK via Cloud KMS gives you explicit cryptographic ownership and auditability."
    },
    {
        id: 37,
        topic: "iam",
        difficulty: "Easy",
        question: "If a user is granted the `roles/viewer` role at the Organization level, but granted the `roles/editor` role on Project A, what level of access do they have on Project A?",
        options: [
            "Editor access on Project A (IAM policies are additive and unioned across hierarchies).",
            "Viewer access on Project A (Organization level permissions override project permissions).",
            "No access (conflicting roles cancel each other out).",
            "Owner access."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> IAM permissions in Google Cloud are strictly additive. If a user receives Viewer at the organization level and Editor at the project level, they possess the union of both sets of permissions on that project.<br><br>⚖️ <strong>Service Comparison:</strong> Additive permissions ensure that local project access cannot be diminished by parent policies unless an explicit IAM Deny policy is applied."
    },
    {
        id: 38,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to automate secret retrieval in a Cloud Run service using Secret Manager. What environment configuration is recommended to minimize latency and improve security?",
        options: [
            "Mount the secret directly as an environment variable or volume reference in the Cloud Run service configuration and grant `roles/secretmanager.secretAccessor` to the service account.",
            "Download the secret using curl inside the container entrypoint script on every request.",
            "Embed the secret plaintext value inside the Dockerfile during `docker build`.",
            "Store the secret in a public GitHub Gist and fetch it at startup."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Run natively supports referencing Secret Manager secrets as environment variables or mounted files. Granting `roles/secretmanager.secretAccessor` allows secure injection at runtime.<br><br>⚖️ <strong>Service Comparison:</strong> Runtime secret mounting prevents secrets from appearing in container registry layers or source code repositories."
    },
    {
        id: 39,
        topic: "iam",
        difficulty: "Medium",
        question: "Which audit log type records administrative actions that modify resource configurations or metadata, such as creating a VM instance or changing an IAM policy binding?",
        options: [
            "Admin Activity audit logs (always enabled and free of charge).",
            "Data Access audit logs.",
            "VPC Flow Logs.",
            "System Event audit logs."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Admin Activity audit logs capture API calls that alter resource configuration or metadata. They are enabled by default for all services and retained for 400 days without incurring ingestion charges.<br><br>⚖️ <strong>Service Comparison:</strong> System Event logs record Google-initiated system actions (like live VM migrations), whereas Admin Activity logs capture user-initiated mutations."
    },
    {
        id: 40,
        topic: "iam",
        difficulty: "Easy",
        question: "You need to share a Cloud Storage bucket containing public documentation with any internet user without requiring them to authenticate. Which principal identifier should you bind to `roles/storage.objectViewer`?",
        options: [
            "allUsers",
            "allAuthenticatedUsers",
            "public-internet@google.com",
            "anonymous-visitors"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> `allUsers` represents anyone on the internet, including unauthenticated users. Binding `roles/storage.objectViewer` to `allUsers` makes the bucket objects publicly accessible.<br><br>⚖️ <strong>Service Comparison:</strong> <code>allAuthenticatedUsers</code> requires the visitor to log in with a valid Google account, whereas <code>allUsers</code> allows complete anonymous access."
    },
    {
        id: 41,
        topic: "iam",
        difficulty: "Medium",
        question: "You are designing an IAM hierarchy for a multi-tenant corporate environment. You need to segregate billing and access policies between two independent subsidiaries owned by your holding company. What resource hierarchy node should you establish below the root Organization?",
        options: [
            "Create separate Folders for each subsidiary within the Organization root.",
            "Create a separate GCP Organization for each subsidiary.",
            "Use labels on Compute Engine instances.",
            "Create two separate VPC networks in a single project."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Folders represent departments or subsidiaries within a single Google Cloud Organization. Assigning folder-level IAM roles and billing policies cleanly segregates subsidiary resources.<br><br>⚖️ <strong>Service Comparison:</strong> Folders allow centralized parent oversight while delegating administrative autonomy, avoiding the massive overhead of managing dual independent root Organizations."
    },
    {
        id: 42,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to grant a CI/CD service account permission to deploy App Engine versions, but restrict it from modifying VPC network firewall rules or IAM policies. Which predefined role is most appropriate?",
        options: [
            "roles/appengine.deployer",
            "roles/editor",
            "roles/owner",
            "roles/iam.securityAdmin"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>roles/appengine.deployer</code> grants permission to create and deploy App Engine application versions and static files without granting network or IAM modification rights.<br><br>⚖️ <strong>Service Comparison:</strong> The primitive Editor role grants expansive permissions across compute, networking, and storage, violating least privilege for dedicated CI/CD deployment pipelines."
    },
    {
        id: 43,
        topic: "iam",
        difficulty: "Medium",
        question: "What is the recommended approach for giving an automated script running on an Amazon EC2 instance access to read data from Google Cloud BigQuery?",
        options: [
            "Use Workload Identity Federation to exchange AWS IAM credentials for short-lived Google Cloud access tokens.",
            "Download a Google Cloud Service Account JSON private key and store it on the EC2 root filesystem.",
            "Open BigQuery access to `allUsers`.",
            "Create a VPN tunnel between AWS and Google Cloud and send unauthenticated HTTP requests."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Workload Identity Federation directly validates AWS IAM roles via OIDC/SAML trust federation, issuing temporary GCP OAuth tokens without requiring downloaded JSON keys.<br><br>⚖️ <strong>Service Comparison:</strong> Federation removes long-lived static secrets from external clouds, eliminating credential exposure during AWS host compromises."
    },
    {
        id: 44,
        topic: "iam",
        difficulty: "Easy",
        question: "Which gcloud command lists all active organization policies enforced on a specific project named `prod-backend`?",
        options: [
            "gcloud resource-manager org-policies list --project=prod-backend",
            "gcloud iam policies list --project=prod-backend",
            "gcloud organizations describe prod-backend",
            "gcloud projects get-iam-policy prod-backend"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>gcloud resource-manager org-policies list --project=[PROJECT_ID]</code> displays all boolean and list constraints actively governing the target project.<br><br>⚖️ <strong>Service Comparison:</strong> <code>get-iam-policy</code> returns identity role bindings (who has access), whereas <code>org-policies list</code> returns governance restrictions (what settings are permitted)."
    },
    {
        id: 45,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to ensure that developers can only grant IAM roles to Google accounts that belong to your official corporate domain `mycompany.com`. Which Organization Policy constraint should you configure?",
        options: [
            "constraints/iam.allowedPolicyMemberDomains",
            "constraints/iam.disableServiceAccountKeyCreation",
            "constraints/compute.restrictXpnProjectLienRemoval",
            "constraints/storage.publicAccessPrevention"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Enforcing <code>constraints/iam.allowedPolicyMemberDomains</code> restricts IAM role bindings exclusively to identities managed within your designated Cloud Identity or Workspace directory domains.<br><br>⚖️ <strong>Service Comparison:</strong> Domain restriction constraints prevent developers from accidentally granting project access to external personal Gmail accounts or unauthorized contractor domains."
    },
    {
        id: 46,
        topic: "iam",
        difficulty: "Medium",
        question: "How does Cloud Identity differ from Google Workspace when managing cloud users?",
        options: [
            "Cloud Identity provides Identity and Access Management (user accounts, groups, MFA) without requiring paid Google Workspace productivity apps (Gmail, Drive, Docs).",
            "Cloud Identity stores data in BigQuery, while Google Workspace stores data in Cloud SQL.",
            "Cloud Identity is exclusively for service accounts, whereas Workspace is for human accounts.",
            "Cloud Identity requires physical security keys, while Workspace uses passwords."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Cloud Identity is Google Cloud's standalone Identity as a Service (IDaaS) solution, providing directory management, MFA, and SSO without requiring paid productivity software licensing.<br><br>⚖️ <strong>Service Comparison:</strong> Workspace bundles enterprise email and office productivity apps with identity management; Cloud Identity Free provides the core identity engine for cloud governance."
    },
    {
        id: 47,
        topic: "iam",
        difficulty: "Easy",
        question: "Which predefined role grants read-only visibility into Google Cloud resource configurations across all services in a project without allowing read access to underlying data (such as Cloud Storage object payload contents or BigQuery table rows)?",
        options: [
            "roles/viewer",
            "roles/browser",
            "roles/iam.roleViewer",
            "roles/resourcemanager.projectViewer"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> The primitive/predefined <code>roles/viewer</code> role grants read access to resource metadata and configuration state across GCP services.<br><br>⚖️ <strong>Service Comparison:</strong> <code>roles/browser</code> grants read access strictly to project hierarchy metadata (browsing project lists in console), without granting permission to view service resources like VMs or buckets."
    },
    {
        id: 48,
        topic: "iam",
        difficulty: "Hard",
        question: "An engineer needs to inspect Cloud Audit Logs to verify who deleted a Cloud SQL database instance yesterday. Which log category records this event?",
        options: [
            "Admin Activity Audit Logs",
            "Data Access Audit Logs",
            "System Event Logs",
            "Policy Denied Logs"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Deleting a database instance is an administrative resource mutation event captured automatically inside <strong>Admin Activity Audit Logs</strong>.<br><br>⚖️ <strong>Service Comparison:</strong> Data Access logs capture SQL queries executed inside the database, whereas Admin Activity logs record lifecycle modifications to the database instance itself."
    },
    {
        id: 49,
        topic: "iam",
        difficulty: "Medium",
        question: "You want to automate secret rotation for a database password stored in Secret Manager. What component triggers the rotation Cloud Function when the rotation interval expires?",
        options: [
            "Cloud Pub/Sub notification topic linked to the secret's rotation schedule.",
            "Compute Engine cron daemon.",
            "VPC Flow Log event trap.",
            "Cloud Router BGP keepalive."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Secret Manager integrates natively with Cloud Pub/Sub. When a scheduled rotation window approaches, Secret Manager publishes an automated message to a Pub/Sub topic, triggering a subscribed Cloud Function to update the database.<br><br>⚖️ <strong>Service Comparison:</strong> Pub/Sub event-driven rotation eliminates polling overhead and ensures decentralized, reliable asynchronous password updates."
    },
    {
        id: 50,
        topic: "iam",
        difficulty: "Medium",
        question: "What is the primary security benefit of utilizing IAM Recommender recommendations in the Google Cloud Console?",
        options: [
            "It uses machine learning to analyze historical API access patterns and recommends revoking over-privileged roles, automatically shrinking permission profiles toward least privilege.",
            "It automatically patches Linux kernel vulnerabilities.",
            "It encrypts Cloud Storage buckets with double 4096-bit RSA keys.",
            "It blocks DDoS traffic arriving from foreign IP addresses."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> IAM Recommender monitors active API calls over a 90-day window and flags role bindings that grant unused permissions, suggesting safer least-privilege replacements.<br><br>⚖️ <strong>Service Comparison:</strong> IAM Recommender reduces human policy drift by identifying excess privileges, whereas Security Command Center scans for active misconfigurations and vulnerabilities."
    },
    {
        id: 51,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to restrict access to a production project so that even project Owners cannot disable Cloud Audit Logging or modify sink export configurations. How should you implement this?",
        options: [
            "Create an organization-level IAM Deny policy blocking `logging.sinks.delete` and `logging.sinks.update` for all principals except a designated security admin group.",
            "Send an email warning to all developers.",
            "Set the project budget to $0.",
            "Store the logs inside an unmanaged Compute Engine instance."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> IAM Deny policies evaluated at the Organization or Folder level take absolute precedence over any IAM Allow grants, preventing even project Owners from tampering with audit sinks.<br><br>⚖️ <strong>Service Comparison:</strong> Standard IAM Allow roles cannot prevent an Owner from modifying resources. IAM Deny policies provide definitive immutable guardrails."
    },
    {
        id: 52,
        topic: "iam",
        difficulty: "Easy",
        question: "Which service account type is created and managed automatically by Google Cloud services to run internal infrastructure processing on your behalf (such as the Google APIs Service Agent)?",
        options: [
            "Google-managed Service Agents / Service Accounts",
            "User-managed Service Accounts",
            "Default Compute Engine Service Accounts",
            "External Federated Service Accounts"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Google-managed Service Agents (e.g. `service-[PROJECT_NUMBER]@gcp-sa-...`) are provisioned automatically when APIs are enabled to perform background tasks like disk snapshotting or Pub/Sub pushing.<br><br>⚖️ <strong>Service Comparison:</strong> User-managed service accounts are created and tailored by developers for application workloads. Service Agents are operated exclusively by Google internal controllers."
    },
    {
        id: 53,
        topic: "iam",
        difficulty: "Medium",
        question: "You want to prevent service accounts from being granted primitive roles (Owner, Editor, Viewer) across your production folder. Which security mechanism achieves this?",
        options: [
            "Enforce the `constraints/iam.automaticIamGrantsForDefaultServiceAccounts` or custom Organization Policy constraint restricting primitive role assignments.",
            "Delete all service accounts.",
            "Disable the IAM API.",
            "Format the folder with an encrypted SSH passphrase."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Organization Policy constraints allow organizations to mandate least privilege by blocking primitive role assignments to automated service identities.<br><br>⚖️ <strong>Service Comparison:</strong> Organization policies enforce proactive prevention during role binding API calls, whereas audit logs provide reactive post-incident detection."
    },
    {
        id: 54,
        topic: "iam",
        difficulty: "Hard",
        question: "You deploy a web web app on Compute Engine that needs to read secrets from Secret Manager. To adhere to least privilege, which predefined IAM role should be bound to the VM's attached service account?",
        options: [
            "roles/secretmanager.secretAccessor",
            "roles/secretmanager.admin",
            "roles/owner",
            "roles/viewer"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>roles/secretmanager.secretAccessor</code> grants exact permission to access secret payload data (`secretmanager.versions.access`) without permitting modification or deletion of secret versions.<br><br>⚖️ <strong>Service Comparison:</strong> <code>roles/secretmanager.admin</code> allows destroying secrets and modifying IAM policies, creating an unnecessary security vulnerability on application compute nodes."
    },
    {
        id: 55,
        topic: "iam",
        difficulty: "Medium",
        question: "When configuring a VPC Service Controls service perimeter, what happens if an authenticated user inside your corporate network attempts to download a file from a Cloud Storage bucket located *outside* the protected perimeter?",
        options: [
            "The download request is blocked by egress perimeter controls unless an explicit Egress Rule authorizes the outbound data transfer.",
            "The file downloads normally because VPC Service Controls only inspect inbound requests.",
            "The bucket is automatically deleted.",
            "The user's Google account is suspended."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> VPC Service Controls govern both Ingress (inbound API requests) and Egress (outbound data movement). Egress rules prevent data exfiltration to external unauthorized buckets.<br><br>⚖️ <strong>Service Comparison:</strong> Standard IAM allows data access anywhere credentials are valid. VPC Service Controls enforce network location boundaries regardless of credential validity."
    },
    {
        id: 56,
        topic: "iam",
        difficulty: "Easy",
        question: "Which gcloud command displays the IAM policy attached to an organization with ID `987654321`?",
        options: [
            "gcloud organizations get-iam-policy 987654321",
            "gcloud iam organizations describe 987654321",
            "gcloud resource-manager orgs policy 987654321",
            "gcloud config get-iam 987654321"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>gcloud organizations get-iam-policy [ORG_ID]</code> retrieves the root IAM policy bindings governing the entire organization hierarchy.<br><br>⚖️ <strong>Service Comparison:</strong> <code>organizations get-iam-policy</code> inspects root identity permissions, whereas <code>projects get-iam-policy</code> inspects localized project scopes."
    },
    {
        id: 57,
        topic: "iam",
        difficulty: "Hard",
        question: "You want to grant temporary emergency elevated access (Break-Glass access) to senior DevOps engineers during severe outages, with all actions strictly audited and automatic revocation after 4 hours. What Google Cloud access pattern should you implement?",
        options: [
            "Use Privileged Access Manager (PAM) or IAM Conditions with time-bound role entitlements that require justification logging upon activation.",
            "Share the root account password in a Slack channel.",
            "Create permanent Owner bindings for all DevOps engineers.",
            "Disable Cloud Logging during incident troubleshooting."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Privileged Access Manager (PAM) and time-bound IAM Conditions provide just-in-time elevated access with mandatory audit justifications and self-expiring role bindings.<br><br>⚖️ <strong>Service Comparison:</strong> Just-in-time elevated access eliminates standing permanent root privileges, drastically reducing attack surface during daily operations."
    },
    {
        id: 58,
        topic: "iam",
        difficulty: "Medium",
        question: "What is the primary role of Google Cloud Directory Sync (GCDS)?",
        options: [
            "To one-way synchronize users, groups, and organizational units from an on-premises LDAP/Active Directory server into Google Cloud Identity or Workspace.",
            "To replicate Cloud Storage buckets across dual regions.",
            "To sync Spanner database tables with MySQL.",
            "To backup Compute Engine persistent disks."
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> GCDS performs scheduled one-way synchronization from on-premises directories to Google Cloud Identity, ensuring corporate identity changes mirror seamlessly into cloud access policies.<br><br>⚖️ <strong>Service Comparison:</strong> GCDS syncs identities one-way without modifying Active Directory, ensuring on-premises infrastructure remains the definitive identity source of truth."
    },
    {
        id: 59,
        topic: "iam",
        difficulty: "Easy",
        question: "Which predefined IAM role allows an administrator to create, update, and delete service accounts within a project?",
        options: [
            "roles/iam.serviceAccountAdmin",
            "roles/iam.serviceAccountUser",
            "roles/iam.securityReviewer",
            "roles/compute.viewer"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> <code>roles/iam.serviceAccountAdmin</code> grants authority to create, modify, and delete service accounts within a project hierarchy.<br><br>⚖️ <strong>Service Comparison:</strong> <code>Service Account Admin</code> manages the service account identity lifecycle, whereas <code>Service Account User</code> allows attaching existing service accounts to compute resources."
    },
    {
        id: 60,
        topic: "iam",
        difficulty: "Hard",
        question: "You have an external third-party SIEM system that ingests audit logs from Google Cloud via Cloud Pub/Sub. To secure the subscription, which role should be granted to the SIEM service account on the specific audit log Pub/Sub topic?",
        options: [
            "roles/pubsub.subscriber",
            "roles/pubsub.publisher",
            "roles/pubsub.admin",
            "roles/owner"
        ],
        correctAnswer: 0,
        explanation: "💡 <strong>Explanation:</strong> Granting <code>roles/pubsub.subscriber</code> allows the SIEM service account to pull messages from subscriptions attached to the log ingestion topic.<br><br>⚖️ <strong>Service Comparison:</strong> <code>Publisher</code> allows writing messages into topics. <code>Subscriber</code> allows consuming messages from topics, strictly enforcing least privilege for data consumers."
    }
);
