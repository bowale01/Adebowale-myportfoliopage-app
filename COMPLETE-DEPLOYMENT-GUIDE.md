# Complete AWS Deployment Guide: Portfolio Website with CI/CD
## Step-by-Step Documentation - Everything We Achieved

> **⚠️ DOCUMENTATION NOTE:** This guide contains example values (IP addresses like 184.72.153.228, instance IDs, security group IDs, etc.) from the original deployment for reference purposes. These are public infrastructure identifiers that are meant to be publicly accessible and pose no security risk. When following this guide, replace these with your own values from your AWS deployment.

**Project:** Adeleke Adebowale Julius Portfolio Website  
**Final URL:** https://adelekeadebowale.com  
**Date Completed:** January 27, 2026

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [AWS CLI Configuration](#aws-cli-configuration)
3. [Creating EC2 SSH Key Pair](#creating-ec2-ssh-key-pair)
4. [Deploying Infrastructure with Terraform](#deploying-infrastructure-with-terraform)
5. [Setting Up EC2 Instance](#setting-up-ec2-instance)
6. [Configuring GitHub Repository](#configuring-github-repository)
7. [Setting Up GitHub Actions CI/CD](#setting-up-github-actions-cicd)
8. [Domain Registration and DNS](#domain-registration-and-dns)
9. [SSL/HTTPS Configuration](#ssl-https-configuration)
10. [Testing and Verification](#testing-and-verification)
11. [Maintenance and Troubleshooting](#maintenance-and-troubleshooting)

---

## Prerequisites

### What You Need Before Starting:
- ✅ AWS Account (https://aws.amazon.com)
- ✅ Docker Hub Account (https://hub.docker.com)
- ✅ GitHub Account (https://github.com)
- ✅ Domain name budget (~$12/year)
- ✅ Windows PC with PowerShell

### Software Installation:
1. **AWS CLI**
   ```powershell
   # Download from: https://aws.amazon.com/cli/
   # Verify installation:
   aws --version
   ```

2. **Terraform**
   ```powershell
   # Download from: https://www.terraform.io/downloads
   # Verify installation:
   terraform --version
   ```

3. **Git**
   ```powershell
   # Download from: https://git-scm.com/downloads
   # Verify installation:
   git --version
   ```

---

## 1. AWS CLI Configuration

### Step 1.1: Create IAM User

1. Log into AWS Console: https://console.aws.amazon.com
2. Go to **IAM** → **Users** → **Create user**
3. Username: `debolek` (or your preferred name)
4. Click **Next**
5. Select **Attach policies directly**
6. Add these policies:
   - `AmazonEC2FullAccess`
   - `AmazonVPCFullAccess`
   - `AmazonRoute53FullAccess` (for DNS)
7. Click **Create user**

### Step 1.2: Create Access Keys

1. Click on the newly created user
2. Go to **Security credentials** tab
3. Scroll to **Access keys** → **Create access key**
4. Select **Command Line Interface (CLI)**
5. Check confirmation box → **Create access key**
6. **COPY BOTH:**
   - Access key ID (starts with AKIA...)
   - Secret access key (long random string)
   - ⚠️ **Save these securely - you can't see the secret again!**

### Step 1.3: Configure AWS CLI

```powershell
# Run this command:
aws configure

# Enter when prompted:
AWS Access Key ID: [paste your Access Key ID]
AWS Secret Access Key: [paste your Secret Access Key]
Default region name: us-east-1
Default output format: json
```

### Step 1.4: Verify Configuration

```powershell
# Should show your IAM user details:
aws sts get-caller-identity
```

**Expected output:**
```json
{
    "UserId": "AIDA...",
    "Account": "743508003148",
    "Arn": "arn:aws:iam::743508003148:user/debolek"
}
```

---

## 2. Creating EC2 SSH Key Pair

### Step 2.1: Generate Key Pair

```powershell
# Navigate to your project directory:
cd C:\Users\debol\Desktop\ADEBOWALE-PORTFOLIOPAGE

# Create the SSH key pair:
aws ec2 create-key-pair --key-name debolek-ec2-access --query 'KeyMaterial' --output text > debolek-ec2-access.pem
```

### Step 2.2: Fix Line Endings (Windows)

```powershell
# Convert Windows line endings to Unix format:
(Get-Content debolek-ec2-access.pem -Raw) -replace "`r`n","`n" | Set-Content -Path debolek-ec2-access.pem -NoNewline -Force
```

### Step 2.3: Verify Key File

```powershell
# Check file exists:
ls debolek-ec2-access.pem

# Should show file with ~3414 bytes
```

⚠️ **Important:** Keep this `.pem` file safe! It's your only way to SSH into the EC2 instance.

---

## 3. Deploying Infrastructure with Terraform

### Step 3.1: Review Infrastructure Code

**File: `infra/main.tf`** (already created)

This file defines:
- VPC with CIDR 10.0.0.0/16
- Public subnet in us-east-1a
- Internet Gateway
- Route table and associations
- Security group allowing:
  - SSH (port 22)
  - HTTP (port 80)
  - HTTPS (port 443)
  - Custom ports 3000, 3001, 3002
- EC2 t2.micro instance (Ubuntu 22.04)

**File: `infra/variables.tf`**
```hcl
variable "key_name" {
  description = "SSH key pair name"
  type        = string
  default     = "debolek-ec2-access"
}
```

**File: `infra/outputs.tf`**
```hcl
output "ec2_public_ip" {
  value = aws_instance.portfolio.public_ip
}

output "ssh_command" {
  value = "ssh ubuntu@${aws_instance.portfolio.public_ip}"
}
```

### Step 3.2: Initialize Terraform

```powershell
cd infra
terraform init
```

**Expected output:**
```
Terraform has been successfully initialized!
```

### Step 3.3: Review Infrastructure Plan

```powershell
terraform plan
```

This shows what will be created:
- 1 VPC
- 1 Subnet
- 1 Internet Gateway
- 1 Route Table
- 1 Security Group
- 1 EC2 Instance
- 1 Route Table Association

**Total:** 7 resources to create

### Step 3.4: Deploy Infrastructure

```powershell
terraform apply
```

Type `yes` when prompted.

**Deployment time:** ~2-3 minutes

**Expected output:**
```
Apply complete! Resources: 7 added, 0 changed, 0 destroyed.

Outputs:
ec2_public_ip = "184.72.153.228"
ssh_command = "ssh ubuntu@184.72.153.228"
```

⚠️ **SAVE THE PUBLIC IP!** You'll need it throughout the setup.

---

## 4. Setting Up EC2 Instance

### Step 4.1: Test SSH Connection

```powershell
cd ..
ssh -i debolek-ec2-access.pem -o StrictHostKeyChecking=no ubuntu@184.72.153.228 "echo 'Connected successfully'"
```

**Expected output:**
```
Connected successfully
```

### Step 4.2: Install Docker

```powershell
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo apt-get update -y && sudo apt-get install -y docker.io docker-compose"
```

**Installation time:** ~2-3 minutes

### Step 4.3: Configure Docker

```powershell
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo systemctl start docker && sudo systemctl enable docker && sudo usermod -aG docker ubuntu && docker --version"
```

**Expected output:**
```
Docker version 28.2.2
```

### Step 4.4: Install Nginx

```powershell
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo apt-get install -y nginx && sudo systemctl start nginx && sudo systemctl enable nginx && nginx -v"
```

**Expected output:**
```
nginx version: nginx/1.24.0
```

### Step 4.5: Configure Nginx for Domain

```powershell
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 @"
sudo bash -c 'cat > /etc/nginx/sites-available/adelekeadebowale.com << EOF
server {
    listen 80;
    server_name adelekeadebowale.com www.adelekeadebowale.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \\\$http_upgrade;
        proxy_set_header Connection \"upgrade\";
        proxy_set_header Host \\\$host;
        proxy_cache_bypass \\\$http_upgrade;
    }
}
EOF
'
"@
```

### Step 4.6: Enable Nginx Site

```powershell
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo ln -sf /etc/nginx/sites-available/adelekeadebowale.com /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx"
```

**Expected output:**
```
nginx: configuration file test is successful
```

### Step 4.7: Install Certbot (for SSL later)

```powershell
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo apt-get update && sudo apt-get install -y certbot python3-certbot-nginx"
```

---

## 5. Configuring GitHub Repository

### Step 5.1: Initialize Git Repository

```powershell
cd C:\Users\debol\Desktop\ADEBOWALE-PORTFOLIOPAGE

# Initialize git:
git init

# Stage all files:
git add .

# Create initial commit:
git commit -m "Initial commit - Portfolio app with multi-environment deployment setup"
```

### Step 5.2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Adebowale-myportfoliopage-app` (or your choice)
3. Description: "Professional portfolio with AWS deployment"
4. Set to **Public** (to showcase your work)
5. **DO NOT** initialize with README (you already have files)
6. Click **Create repository**

### Step 5.3: Connect and Push to GitHub

```powershell
# Set main branch:
git branch -M main

# Add remote:
git remote add origin https://github.com/bowale01/Adebowale-myportfoliopage-app.git

# Push code:
git push -u origin main
```

---

## 6. Setting Up GitHub Actions CI/CD

### Step 6.1: Create Docker Hub Access Token

1. Log into Docker Hub: https://hub.docker.com
2. Go to **Account Settings** → **Security**
3. Click **New Access Token**
4. Description: `Portfolio-AWS-Deployment`
5. Access permissions: **Read, Write & Delete**
6. Click **Generate**
7. **COPY THE TOKEN** (you can only see it once!)

### Step 6.2: Add GitHub Secrets

1. Go to your repository: https://github.com/bowale01/Adebowale-myportfoliopage-app
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**

**Add these 4 secrets:**

| Secret Name | Value | Notes |
|-------------|-------|-------|
| `EC2_HOST` | `184.72.153.228` | Your EC2 public IP |
| `EC2_SSH_KEY` | *[Content of debolek-ec2-access.pem]* | Full key including BEGIN/END lines |
| `DOCKERHUB_USERNAME` | `debolek` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | *[Token from Step 6.1]* | Docker Hub access token |

**To get EC2_SSH_KEY value:**
```powershell
Get-Content debolek-ec2-access.pem -Raw
```

Copy the entire output including:
```
-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----
```

### Step 6.3: Verify GitHub Actions Workflows

Your repository already has these workflows in `.github/workflows/`:

1. **deploy-prod.yml** - Deploys to production (port 3000) when pushing to `main`
2. **deploy-dev.yml** - Deploys to dev (port 3001) when pushing to `develop`
3. **deploy-staging.yml** - Deploys to staging (port 3002) when pushing to `staging`

### Step 6.4: Trigger First Deployment

```powershell
# Make an empty commit to trigger deployment:
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

### Step 6.5: Monitor Deployment

1. Go to: https://github.com/bowale01/Adebowale-myportfoliopage-app/actions
2. Watch the "Deploy to Production" workflow
3. Should turn green (✓) in 2-5 minutes

**What happens during deployment:**
1. ✅ Checks out code
2. ✅ Builds Docker image
3. ✅ Pushes to Docker Hub (debolek/portfolio:latest)
4. ✅ SSHs into EC2
5. ✅ Pulls latest image
6. ✅ Stops old container
7. ✅ Starts new container on port 3000

---

## 7. Domain Registration and DNS

### Step 7.1: Create Route 53 Hosted Zone

```powershell
aws route53 create-hosted-zone --name adelekeadebowale.com --caller-reference $(Get-Date -Format 'yyyyMMddHHmmss')
```

**Save the nameservers from output:**
```
ns-1547.awsdns-01.co.uk
ns-993.awsdns-60.net
ns-1159.awsdns-16.org
ns-458.awsdns-57.com
```

### Step 7.2: Register Domain

**Option A: Via AWS Console (Recommended)**
1. Go to: https://console.aws.amazon.com/route53/domains/home
2. Search for: `adelekeadebowale.com`
3. Click **Add to cart** (~$12/year)
4. Fill in contact information
5. Complete purchase

**Option B: Via AWS CLI**
```powershell
aws route53domains check-domain-availability --domain-name adelekeadebowale.com --region us-east-1
```

### Step 7.3: Update Domain Nameservers

After registration, update nameservers to match hosted zone:

```powershell
aws route53domains update-domain-nameservers --domain-name adelekeadebowale.com --nameservers Name=ns-1547.awsdns-01.co.uk Name=ns-993.awsdns-60.net Name=ns-1159.awsdns-16.org Name=ns-458.awsdns-57.com --region us-east-1
```

### Step 7.4: Create DNS Records

Create file `dns-records.json`:
```json
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "adelekeadebowale.com",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [{"Value": "184.72.153.228"}]
      }
    },
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "www.adelekeadebowale.com",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [{"Value": "184.72.153.228"}]
      }
    }
  ]
}
```

Apply DNS records:
```powershell
aws route53 change-resource-record-sets --hosted-zone-id Z024039033MV7UFQBN5FU --change-batch file://dns-records.json
```

### Step 7.5: Wait for DNS Propagation

**Time required:** 15 minutes to 2 hours

**Check DNS status:**
```powershell
Resolve-DnsName adelekeadebowale.com -Type A
```

**When ready, you'll see:**
```
Name: adelekeadebowale.com
Address: 184.72.153.228
```

---

## 8. SSL/HTTPS Configuration

### Step 8.1: Verify DNS is Working

```powershell
# DNS must return your IP before SSL will work:
Resolve-DnsName adelekeadebowale.com -Type A
```

### Step 8.2: Install SSL Certificate

```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot --nginx -d adelekeadebowale.com -d www.adelekeadebowale.com --email debolek4dem@gmail.com --agree-tos --redirect --non-interactive"
```

**What this does:**
1. ✅ Contacts Let's Encrypt
2. ✅ Verifies domain ownership
3. ✅ Downloads SSL certificate
4. ✅ Configures Nginx for HTTPS
5. ✅ Sets up HTTP → HTTPS redirect
6. ✅ Configures auto-renewal (every 90 days)

**Expected output:**
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/adelekeadebowale.com/fullchain.pem
...
Congratulations! You have successfully enabled HTTPS
```

### Step 8.3: Test Auto-Renewal

```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot renew --dry-run"
```

**Expected output:**
```
Congratulations, all simulated renewals succeeded
```

---

## 9. Testing and Verification

### Step 9.1: Test All URLs

**1. Direct IP Access:**
```powershell
Start-Process "http://184.72.153.228"
```
✅ Should show your portfolio

**2. IP with Port:**
```powershell
Start-Process "http://184.72.153.228:3000"
```
✅ Should show your portfolio

**3. Domain (HTTP):**
```powershell
Start-Process "http://adelekeadebowale.com"
```
✅ Should redirect to HTTPS

**4. Domain (HTTPS):**
```powershell
Start-Process "https://adelekeadebowale.com"
```
✅ Should show your portfolio with green padlock

**5. With WWW:**
```powershell
Start-Process "https://www.adelekeadebowale.com"
```
✅ Should show your portfolio

### Step 9.2: Verify Docker Container

```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker ps"
```

**Expected output:**
```
CONTAINER ID   IMAGE                      STATUS          PORTS
dc2924860eb3   debolek/portfolio:latest   Up 2 hours      0.0.0.0:3000->80/tcp
```

### Step 9.3: Check Container Logs

```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker logs portfolio --tail 20"
```

Should show Nginx access logs.

### Step 9.4: Verify CI/CD Pipeline

1. Make a small change to your portfolio
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Test deployment pipeline"
   git push origin main
   ```
3. Watch deployment: https://github.com/bowale01/Adebowale-myportfoliopage-app/actions
4. Verify changes appear on https://adelekeadebowale.com

---

## 10. Maintenance and Troubleshooting

### Common Commands

**Check EC2 Status:**
```powershell
aws ec2 describe-instances --instance-ids i-0d3ae9925f9d0fd1b --query 'Reservations[0].Instances[0].State.Name'
```

**Restart Docker Container:**
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker restart portfolio"
```

**View Nginx Logs:**
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo tail -f /var/log/nginx/access.log"
```

**Check SSL Certificate:**
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot certificates"
```

**Manual SSL Renewal:**
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot renew"
```

### Troubleshooting

**Problem: Can't SSH into EC2**
```powershell
# Fix line endings:
(Get-Content debolek-ec2-access.pem -Raw) -replace "`r`n","`n" | Set-Content -Path debolek-ec2-access.pem -NoNewline -Force
```

**Problem: Website not accessible**
```bash
# Check if Docker container is running:
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker ps"

# Restart if needed:
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker restart portfolio"
```

**Problem: HTTPS not working**
```bash
# Check Nginx configuration:
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo nginx -t"

# Reload Nginx:
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo systemctl reload nginx"
```

**Problem: GitHub Actions failing**
1. Check secrets are correctly set
2. Verify Docker Hub credentials
3. Check EC2 SSH key is complete (includes BEGIN/END lines)

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        GITHUB                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  GitHub Actions (CI/CD)                              │   │
│  │  - Build Docker image                                │   │
│  │  - Push to Docker Hub                                │   │
│  │  - Deploy to EC2                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     DOCKER HUB                               │
│  - debolek/portfolio:latest                                  │
│  - debolek/portfolio:dev                                     │
│  - debolek/portfolio:staging                                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                         AWS                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Route 53 (DNS)                                      │   │
│  │  - adelekeadebowale.com → 184.72.153.228            │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  VPC (10.0.0.0/16)                                   │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Public Subnet (10.0.1.0/24)                   │  │   │
│  │  │  ┌──────────────────────────────────────────┐  │  │   │
│  │  │  │  EC2 Instance (t2.micro)                 │  │  │   │
│  │  │  │  - Ubuntu 22.04                          │  │  │   │
│  │  │  │  - Nginx (80, 443)                       │  │  │   │
│  │  │  │  - Docker Container (3000, 3001, 3002)   │  │  │   │
│  │  │  │  - Let's Encrypt SSL                     │  │  │   │
│  │  │  └──────────────────────────────────────────┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │  Security Group: SSH, HTTP, HTTPS, 3000-3002         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                 │
│  https://adelekeadebowale.com                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| EC2 t2.micro | $8-10/month | Free tier: 750 hrs/month for 12 months |
| Route 53 Hosted Zone | $0.50/month | Per hosted zone |
| Domain Registration | $12/year | One-time, renews annually |
| Route 53 Queries | ~$0.40/month | First 1M queries free, then $0.40/million |
| **Total** | **~$10-11/month** | **~$1/month with free tier** |

---

## ✅ What We Achieved

### Infrastructure
- ✅ Production-grade AWS infrastructure
- ✅ Infrastructure as Code (Terraform)
- ✅ Secure VPC with proper networking
- ✅ EC2 instance with Docker
- ✅ Nginx reverse proxy
- ✅ SSL/HTTPS with auto-renewal
- ✅ Custom domain with DNS

### CI/CD Pipeline
- ✅ Automated Docker builds
- ✅ Multi-environment deployments (dev, staging, prod)
- ✅ GitHub Actions workflows
- ✅ Docker Hub integration

### Security
- ✅ IAM user with least privilege
- ✅ SSH key authentication only
- ✅ Security groups configured properly
- ✅ Secrets stored securely in GitHub
- ✅ No sensitive data in repository
- ✅ HTTPS enforced

### Professional Portfolio
- ✅ React application
- ✅ Responsive design
- ✅ Professional contact information
- ✅ Projects showcase
- ✅ Skills section
- ✅ Certifications display

---

## 📝 Repository Structure

```
ADEBOWALE-PORTFOLIOPAGE/
├── .github/
│   └── workflows/
│       ├── deploy-prod.yml      # Production deployment
│       ├── deploy-dev.yml        # Dev deployment
│       └── deploy-staging.yml    # Staging deployment
├── infra/
│   ├── main.tf                   # Terraform infrastructure
│   ├── variables.tf              # Terraform variables
│   └── outputs.tf                # Terraform outputs
├── nginx-config/
│   └── portfolio-nginx.conf      # Nginx configuration
├── public/                       # Static assets
├── src/                          # React source code
│   └── Pages/
│       └── Home/                 # Portfolio components
├── .gitignore                    # Git ignore rules
├── Dockerfile                    # Docker configuration
├── package.json                  # Node.js dependencies
├── README.md                     # Project documentation
└── DEPLOYMENT_GUIDE.md           # This guide
```

---

## 🎓 Key Learnings

### DevOps Skills Demonstrated:
1. **Cloud Infrastructure:** AWS VPC, EC2, Route 53, Security Groups
2. **Infrastructure as Code:** Terraform for reproducible infrastructure
3. **Containerization:** Docker for application packaging
4. **CI/CD:** GitHub Actions for automated deployments
5. **Web Servers:** Nginx as reverse proxy
6. **Security:** SSL/TLS, IAM, SSH keys, secrets management
7. **DNS Management:** Route 53 for domain configuration
8. **Linux Administration:** Ubuntu server management
9. **Version Control:** Git and GitHub workflows
10. **Networking:** VPC, subnets, routing, security groups

---

## 🚀 Next Steps / Future Enhancements

### Potential Improvements:
1. **Load Balancer:** Add AWS ALB for high availability
2. **Auto Scaling:** Configure EC2 auto-scaling groups
3. **Monitoring:** Add CloudWatch, Prometheus, Grafana
4. **Logging:** Centralized logging with ELK stack
5. **Backup:** Automated EC2 snapshots
6. **CDN:** CloudFront for faster content delivery
7. **Database:** Add RDS for dynamic content
8. **Container Orchestration:** Migrate to ECS or EKS
9. **Blue-Green Deployment:** Zero-downtime deployments
10. **Infrastructure Testing:** Terraform testing with Terratest

---

## 📞 Support and Contact

**Portfolio Owner:** Adeleke Adebowale Julius  
**Website:** https://adelekeadebowale.com  
**GitHub:** @bowale01  
**LinkedIn:** linkedin.com/in/debolek  
**Email:** debolek4dem@gmail.com

---

## 🏆 Conclusion

This guide documented the complete process of deploying a production-grade portfolio website on AWS with:

- ✅ **Scalable infrastructure** using AWS EC2, VPC, and Route 53
- ✅ **Automated CI/CD** with GitHub Actions
- ✅ **Containerized application** using Docker
- ✅ **Secure HTTPS** with Let's Encrypt
- ✅ **Custom domain** with DNS management
- ✅ **Professional presentation** for job applications

**Total Setup Time:** ~2-3 hours  
**Deployment Status:** ✅ LIVE and OPERATIONAL  
**Date Completed:** January 27, 2026

---

**End of Documentation**
