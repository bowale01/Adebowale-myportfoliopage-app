import React from "react";
import { Link } from "react-router-dom";
import "./IaCBlogPost.css";

export default function IaCBlogPost() {
  return (
    <div className="blog-post-page">
      <div className="blog-post-container">
        <Link to="/#Blog" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Blog
        </Link>

        <header className="blog-post-header">
          <span className="blog-post-category" style={{ color: "#f59e0b" }}>TERRAFORM / IaC</span>
          <h1 className="blog-post-title">Infrastructure as Code: A Practical Guide to Terraform on AWS</h1>
          <div className="blog-post-meta">
            <span><i className="fas fa-user"></i> Adeleke Adebowale</span>
            <span><i className="fas fa-calendar"></i> March 2026</span>
            <span><i className="fas fa-tags"></i> IaC, Terraform, AWS, DevOps</span>
          </div>
        </header>

        <div className="blog-post-body">

          <h2>Introduction</h2>
          <p>
            If you've ever manually clicked through the AWS console to spin up a VPC, configure subnets, attach an
            internet gateway, and then had to do it all over again for a staging environment — you already understand
            the problem Infrastructure as Code solves.
          </p>
          <p>
            Manual infrastructure is slow, error-prone, and impossible to reproduce consistently. IaC fixes this by
            treating your infrastructure the same way you treat application code: version-controlled, peer-reviewed,
            and repeatable.
          </p>

          <h2>What is Infrastructure as Code?</h2>
          <p>
            IaC is the practice of defining and managing your infrastructure through machine-readable configuration
            files rather than manual processes. Instead of logging into a console and clicking "Create VPC", you write
            a file that describes the VPC you want, and a tool reads that file and makes it happen.
          </p>
          <p>There are two main approaches:</p>
          <ul>
            <li><strong>Declarative</strong> — You describe <em>what</em> you want, and the tool figures out <em>how</em> to get there. Terraform, CloudFormation, and Kubernetes manifests are declarative.</li>
            <li><strong>Imperative</strong> — You describe <em>how</em> to do it, step by step. Ansible playbooks and shell scripts are imperative.</li>
          </ul>
          <p>For cloud infrastructure provisioning, declarative wins. You describe the end state and let the tool handle the rest.</p>

          <h2>Why Terraform?</h2>
          <div className="blog-table-wrapper">
            <table className="blog-table">
              <thead>
                <tr>
                  <th>Tool</th><th>Approach</th><th>Cloud Support</th><th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Terraform</td><td>Declarative</td><td>Multi-cloud</td><td>Any cloud, consistent workflow</td></tr>
                <tr><td>CloudFormation</td><td>Declarative</td><td>AWS only</td><td>Deep AWS integration</td></tr>
                <tr><td>Pulumi</td><td>Imperative</td><td>Multi-cloud</td><td>Developers who prefer real code</td></tr>
                <tr><td>Ansible</td><td>Imperative</td><td>Any</td><td>Config management</td></tr>
                <tr><td>CDK</td><td>Imperative</td><td>AWS only</td><td>TypeScript/Python on AWS</td></tr>
              </tbody>
            </table>
          </div>
          <p>Terraform wins for most teams because it works across AWS, Azure, GCP with the same syntax, the HCL is readable, and the <code>plan</code> command shows you exactly what will change before anything touches your infrastructure.</p>

          <h2>Core Terraform Concepts</h2>

          <h3>Providers</h3>
          <p>A provider is a plugin that lets Terraform talk to a specific platform. Always pin provider versions:</p>
          <pre><code>{`terraform {
  required_version = ">= 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"  # Allow 5.x but not 6.x
    }
  }
}

provider "aws" {
  region = var.aws_region
}`}</code></pre>

          <h3>Resources</h3>
          <p>Resources are the actual infrastructure objects you're creating:</p>
          <pre><code>{`resource "aws_vpc" "ad_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "ad-managed-vpc" }
}`}</code></pre>

          <h3>Variables</h3>
          <p>Variables make your code reusable. Mark sensitive ones with <code>sensitive = true</code>:</p>
          <pre><code>{`variable "ad_admin_password" {
  description = "Password for the directory Administrator account"
  sensitive   = true  # Terraform masks this in all output and logs
}

variable "ad_edition" {
  default = "Standard"
  validation {
    condition     = contains(["Standard", "Enterprise"], var.ad_edition)
    error_message = "Edition must be 'Standard' or 'Enterprise'."
  }
}`}</code></pre>

          <h3>State</h3>
          <p>
            Terraform keeps a state file (<code>terraform.tfstate</code>) that maps your config to real-world resources.
            Never commit state to Git — it contains sensitive data. Use remote state instead.
          </p>

          <h2>Project Structure</h2>
          <p>Split resources into logical files by concern:</p>
          <pre><code>{`ad-managed-terraform/
├── main.tf              # Provider config, terraform block
├── variables.tf         # All input variable definitions
├── vpc.tf               # VPC, subnets, routing
├── security_groups.tf   # Security group rules
├── ec2.tf               # EC2 instances, IAM roles
├── directory.tf         # The AD directory resource
├── outputs.tf           # Values to expose after apply
└── terraform.tfvars     # Actual values (gitignored)`}</code></pre>

          <h2>Building a Real Network: VPC and Subnets</h2>
          <p>The network topology for an AWS Managed Active Directory deployment:</p>
          <pre><code>{`VPC (10.1.0.0/16)
├── Public Subnet (10.1.10.0/24)      → Management instance (RDP)
├── Private Subnet AZ1 (10.1.1.0/24) → Managed DC endpoint
├── Private Subnet AZ2 (10.1.2.0/24) → Managed DC endpoint
├── Internet Gateway                  → Public subnet internet
└── NAT Gateway                       → Private subnet outbound-only`}</code></pre>
          <p>Domain Controllers should never be internet-facing. Private subnets with no inbound internet route is non-negotiable.</p>
          <pre><code>{`resource "aws_vpc" "ad_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = { Name = "ad-managed-vpc" }
}

resource "aws_subnet" "private_az1" {
  vpc_id            = aws_vpc.ad_vpc.id
  cidr_block        = var.private_subnet_az1_cidr
  availability_zone = data.aws_availability_zones.available.names[0]
  tags = { Name = "ad-managed-private-subnet-az1" }
}

resource "aws_subnet" "private_az2" {
  vpc_id            = aws_vpc.ad_vpc.id
  cidr_block        = var.private_subnet_az2_cidr
  availability_zone = data.aws_availability_zones.available.names[1]
  tags = { Name = "ad-managed-private-subnet-az2" }
}`}</code></pre>
          <p>
            Notice <code>data.aws_availability_zones.available.names[0]</code> — this dynamically fetches available AZs.
            Never hardcode AZ names like <code>us-east-1a</code>. Data sources keep your code portable.
          </p>

          <h2>Security Groups</h2>
          <p>Least privilege — open only what's needed:</p>
          <pre><code>{`resource "aws_security_group" "management" {
  name   = "ad-managed-management-sg"
  vpc_id = aws_vpc.ad_vpc.id

  ingress {
    description = "RDP - Admin access from restricted CIDR"
    from_port   = 3389
    to_port     = 3389
    protocol    = "tcp"
    cidr_blocks = [var.management_allowed_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}</code></pre>

          <h2>EC2 with IAM and SSM</h2>
          <p>Using SSM lets you connect to instances without opening extra ports — smaller attack surface:</p>
          <pre><code>{`resource "aws_iam_role" "management_ssm" {
  name = "ad-managed-mgmt-ssm-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_instance" "management" {
  ami                  = var.windows_ami
  instance_type        = "t3.small"
  iam_instance_profile = aws_iam_instance_profile.management_ssm.name

  root_block_device {
    volume_size = 50
    volume_type = "gp3"
    encrypted   = true  # Always
  }
}`}</code></pre>

          <h2>Managed vs Self-Managed AD</h2>
          <p>
            Self-managed AD means you provision EC2 instances, run PowerShell via user data to install the AD role,
            and manage everything yourself — OS, patching, replication, DNS.
          </p>
          <p>
            AWS Managed AD means you declare an <code>aws_directory_service_directory</code> resource and AWS handles
            the Domain Controllers. Your security group only needs RDP for the management instance. The operational
            complexity drops dramatically.
          </p>
          <p>Self-managed requires you to open every AD port manually: DNS (53), Kerberos (88), RPC (135), LDAP (389), SMB (445), LDAPS (636), Global Catalog (3268-3269), and RPC dynamic ports (49152-65535). With Managed AD, AWS handles all of that on their side.</p>

          <h2>The Terraform Workflow</h2>
          <pre><code>{`# 1. Initialise - download providers and modules
terraform init

# 2. Plan - show what will change, nothing is created yet
terraform plan

# 3. Apply - create/update/delete resources to match config
terraform apply

# 4. Destroy - tear everything down (use with care)
terraform destroy`}</code></pre>
          <p><code>terraform plan</code> is your best friend. Always review it before applying — especially for changes that show resources being destroyed and recreated.</p>

          <h2>Remote State</h2>
          <p>The standard AWS pattern is S3 for storage and DynamoDB for locking:</p>
          <pre><code>{`terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket"
    key            = "ad-managed/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}`}</code></pre>
          <p>Set this up before you have a team. Migrating state later is painful.</p>

          <h2>IaC Best Practices</h2>
          <ul>
            <li><strong>Version everything.</strong> Every <code>.tf</code> file goes in Git. Infrastructure changes go through pull requests.</li>
            <li><strong>Pin your versions.</strong> Both the Terraform CLI and provider versions. Unpinned versions mean a <code>terraform init</code> six months from now might pull a breaking change.</li>
            <li><strong>Never commit secrets.</strong> Use <code>sensitive = true</code>, AWS Secrets Manager, or environment variables. Your <code>terraform.tfvars</code> should always be in <code>.gitignore</code>.</li>
            <li><strong>Tag everything.</strong> Every resource needs at minimum a <code>Name</code> and <code>Environment</code> tag.</li>
            <li><strong>Scan for security issues.</strong> Tools like <code>checkov</code> and <code>tfsec</code> catch misconfigurations before you deploy.</li>
          </ul>
          <pre><code>{`terraform fmt -recursive   # Format all .tf files
tflint                     # Lint
checkov -d .               # Security scan
tfsec .`}</code></pre>

          <h2>CI/CD for Infrastructure</h2>
          <p>Infrastructure changes should go through the same review process as application code:</p>
          <pre><code>{`name: Terraform
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Terraform Plan
        run: terraform plan -out=tfplan
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    environment: production  # Requires manual approval
    steps:
      - name: Terraform Apply
        run: terraform apply tfplan`}</code></pre>
          <p>
            The key pattern: <code>plan</code> runs on every PR so reviewers can see what will change.
            <code>apply</code> only runs on merge to main, with a human approval gate.
          </p>

          <h2>Terragrunt: Terraform at Scale</h2>
          <p>
            Terraform is powerful, but as your infrastructure grows across multiple environments and AWS accounts,
            you start hitting repetition problems. Every environment needs the same backend config, the same provider
            block, the same module calls — just with different variable values. That's where Terragrunt comes in.
          </p>
          <p>
            Terragrunt is a thin wrapper around Terraform that adds DRY (Don't Repeat Yourself) patterns, making it
            practical to manage large multi-environment, multi-account infrastructure.
          </p>

          <h3>The Problem Terragrunt Solves</h3>
          <p>Without Terragrunt, a typical multi-environment setup means copying the same files everywhere:</p>
          <pre><code>{`environments/
├── dev/
│   ├── main.tf        # Duplicate
│   ├── backend.tf     # Duplicate (different bucket key)
│   └── terraform.tfvars
├── staging/
│   ├── main.tf        # Duplicate
│   ├── backend.tf     # Duplicate
│   └── terraform.tfvars
└── prod/
    ├── main.tf        # Duplicate
    ├── backend.tf     # Duplicate
    └── terraform.tfvars`}</code></pre>
          <p>One missed update and dev drifts from prod. Terragrunt fixes this.</p>

          <h3>Terragrunt Project Structure</h3>
          <pre><code>{`infrastructure/
├── terragrunt.hcl             # Root config — shared backend, provider
├── modules/
│   └── vpc/                   # Reusable Terraform module
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
└── environments/
    ├── dev/vpc/terragrunt.hcl
    ├── staging/vpc/terragrunt.hcl
    └── prod/vpc/terragrunt.hcl`}</code></pre>

          <h3>Root terragrunt.hcl</h3>
          <p>Define the remote state backend once — all environments inherit it:</p>
          <pre><code>{`remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket         = "my-terraform-state"
    key            = "\${path_relative_to_include()}/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = var.aws_region
}
EOF
}`}</code></pre>
          <p>
            <code>path_relative_to_include()</code> automatically sets the S3 key to the environment path — dev state
            goes to <code>environments/dev/vpc/terraform.tfstate</code>, prod to <code>environments/prod/vpc/terraform.tfstate</code>.
            No manual configuration per environment.
          </p>

          <h3>Environment terragrunt.hcl</h3>
          <p>Each environment just points to the module and sets its own values:</p>
          <pre><code>{`# environments/prod/vpc/terragrunt.hcl

include "root" {
  path = find_in_parent_folders()  # Picks up the root terragrunt.hcl
}

terraform {
  source = "../../../modules/vpc"
}

inputs = {
  aws_region   = "us-east-1"
  vpc_cidr     = "10.0.0.0/16"
  environment  = "prod"
  cluster_name = "prod-eks"
}`}</code></pre>
          <p>No backend config, no provider block — all inherited from root. The module is defined once and reused everywhere.</p>

          <h3>Running Terragrunt</h3>
          <pre><code>{`terragrunt plan              # Plan a single environment
terragrunt apply             # Apply a single environment

terragrunt run-all plan      # Plan ALL environments at once
terragrunt run-all apply     # Apply ALL environments in dependency order`}</code></pre>
          <p><code>run-all</code> detects dependencies between modules and applies them in the correct order automatically.</p>

          <h3>Terragrunt vs Terraform Workspaces</h3>
          <div className="blog-table-wrapper">
            <table className="blog-table">
              <thead>
                <tr><th>Feature</th><th>Workspaces</th><th>Terragrunt</th></tr>
              </thead>
              <tbody>
                <tr><td>State isolation</td><td>Shared backend, different keys</td><td>Fully separate backends</td></tr>
                <tr><td>Code reuse</td><td>Same code, different vars</td><td>Modules + DRY config</td></tr>
                <tr><td>Multi-account</td><td>Awkward</td><td>First-class support</td></tr>
                <tr><td>Dependency management</td><td>Manual</td><td>Automatic with run-all</td></tr>
                <tr><td>Blast radius</td><td>High</td><td>Low (isolated per env)</td></tr>
              </tbody>
            </table>
          </div>
          <p>Workspaces work fine for simple projects. Once you're managing multiple AWS accounts or more than two environments, Terragrunt is the better choice.</p>

          <h2>Common Pitfalls</h2>
          <ul>
            <li><strong>State file conflicts.</strong> Set up remote state with DynamoDB locking from day one.</li>
            <li><strong>Hardcoded secrets.</strong> Use <code>sensitive</code> variables or Secrets Manager.</li>
            <li><strong>Not using <code>.gitignore</code>.</strong> Always exclude <code>*.tfstate</code>, <code>*.tfvars</code>, <code>.terraform/</code>.</li>
            <li><strong>Unexpected destroys.</strong> Always read the plan output carefully. Look for lines with <code># will be destroyed</code>.</li>
            <li><strong>Over-engineering modules too early.</strong> Write flat code first, then extract modules when you see genuine repetition.</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Infrastructure as Code is not just a DevOps trend — it's the baseline expectation for any team running
            cloud infrastructure at scale. The ability to version, review, test, and reproduce your infrastructure is
            what separates reliable systems from fragile ones.
          </p>
          <p>
            The best way to get comfortable with Terraform is to use it on something real. Take an existing piece of
            infrastructure you manage manually and write the Terraform for it. That feedback loop is where the learning happens.
          </p>

          <div className="blog-post-resources">
            <h2>Resources</h2>
            <ul>
              <li><a href="https://terragrunt.gruntwork.io/docs/" target="_blank" rel="noreferrer">Terragrunt Documentation</a></li>
              <li><a href="https://developer.hashicorp.com/terraform/docs" target="_blank" rel="noreferrer">Terraform Documentation</a></li>
              <li><a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs" target="_blank" rel="noreferrer">AWS Provider Registry</a></li>
              <li><a href="https://github.com/aquasecurity/tfsec" target="_blank" rel="noreferrer">tfsec — Terraform Security Scanner</a></li>
              <li><a href="https://www.checkov.io/" target="_blank" rel="noreferrer">checkov — Policy-as-Code</a></li>
              <li><a href="https://www.runatlantis.io/" target="_blank" rel="noreferrer">Atlantis — Terraform PR Automation</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
