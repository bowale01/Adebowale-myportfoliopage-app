# Architecture Diagrams

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DEVELOPER                                       │
│                                                                              │
│  Local Development → Git Push → GitHub Repository                           │
│                                                                              │
└─────────────────────┬───────────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GITHUB ACTIONS (CI/CD)                               │
│                                                                              │
│  Workflow Triggered:                                                         │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  1. Checkout code                                                     │  │
│  │  2. Build Docker image (React app → Production build)                │  │
│  │  3. Login to Docker Hub                                              │  │
│  │  4. Push image: debolek/portfolio:latest                             │  │
│  │  5. SSH to EC2 instance                                              │  │
│  │  6. Pull latest image                                                │  │
│  │  7. Stop old container                                               │  │
│  │  8. Start new container                                              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└──────────────────────┬──────────────────────┬────────────────────────────────┘
                       │                      │
                       ▼                      ▼
        ┌──────────────────────┐   ┌──────────────────────┐
        │   DOCKER HUB          │   │   AWS EC2            │
        │                       │   │                       │
        │ debolek/portfolio:    │   │  Ubuntu 22.04        │
        │ - latest (prod)       │──▶│  Docker Engine       │
        │ - dev                 │   │  Nginx               │
        │ - staging             │   │  Let's Encrypt       │
        └──────────────────────┘   └──────────────────────┘
                                              │
                                              ▼
                       ┌──────────────────────────────────────┐
                       │      AWS ROUTE 53 (DNS)              │
                       │                                      │
                       │  adelekeadebowale.com → 184.72.153.228│
                       │  www.adelekeadebowale.com → 184.72... │
                       └──────────────────────────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │   END USERS     │
                                    │                 │
                                    │ Browser Access  │
                                    └─────────────────┘
```

## AWS Infrastructure Details

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        AWS REGION: us-east-1                               │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  VPC: 10.0.0.0/16                                                 │    │
│  │  Name: debolek-portfolio-vpc                                      │    │
│  │                                                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐    │    │
│  │  │  Public Subnet: 10.0.1.0/24                              │    │    │
│  │  │  Availability Zone: us-east-1a                           │    │    │
│  │  │                                                           │    │    │
│  │  │  ┌─────────────────────────────────────────────────┐    │    │    │
│  │  │  │  EC2 Instance (t2.micro)                        │    │    │    │
│  │  │  │  - Instance ID: i-0d3ae9925f9d0fd1b            │    │    │    │
│  │  │  │  - Public IP: 184.72.153.228                   │    │    │    │
│  │  │  │  - Private IP: 10.0.1.13                       │    │    │    │
│  │  │  │  - AMI: Ubuntu 22.04                           │    │    │    │
│  │  │  │                                                 │    │    │    │
│  │  │  │  Services Running:                              │    │    │    │
│  │  │  │  ┌──────────────────────────────────────────┐  │    │    │    │
│  │  │  │  │  NGINX (Reverse Proxy)                   │  │    │    │    │
│  │  │  │  │  - Port 80 (HTTP)                        │  │    │    │    │
│  │  │  │  │  - Port 443 (HTTPS)                      │  │    │    │    │
│  │  │  │  │  - SSL: Let's Encrypt                    │  │    │    │    │
│  │  │  │  │    ↓ Proxy to                            │  │    │    │    │
│  │  │  │  └──────────────────────────────────────────┘  │    │    │    │
│  │  │  │  ┌──────────────────────────────────────────┐  │    │    │    │
│  │  │  │  │  Docker Containers                       │  │    │    │    │
│  │  │  │  │  - portfolio (prod): localhost:3000      │  │    │    │    │
│  │  │  │  │  - portfolio-dev: localhost:3001         │  │    │    │    │
│  │  │  │  │  - portfolio-staging: localhost:3002     │  │    │    │    │
│  │  │  │  └──────────────────────────────────────────┘  │    │    │    │
│  │  │  └─────────────────────────────────────────────────┘    │    │    │
│  │  │                                                           │    │    │
│  │  │  Security Group: debolek-web-sg                          │    │    │
│  │  │  ┌─────────────────────────────────────────────────┐    │    │    │
│  │  │  │  Inbound Rules:                                 │    │    │    │
│  │  │  │  - Port 22 (SSH) from 0.0.0.0/0                │    │    │    │
│  │  │  │  - Port 80 (HTTP) from 0.0.0.0/0               │    │    │    │
│  │  │  │  - Port 443 (HTTPS) from 0.0.0.0/0             │    │    │    │
│  │  │  │  - Port 3000 (Production) from 0.0.0.0/0       │    │    │    │
│  │  │  │  - Port 3001 (Dev) from 0.0.0.0/0              │    │    │    │
│  │  │  │  - Port 3002 (Staging) from 0.0.0.0/0          │    │    │    │
│  │  │  │                                                 │    │    │    │
│  │  │  │  Outbound Rules:                                │    │    │    │
│  │  │  │  - All traffic to 0.0.0.0/0                    │    │    │    │
│  │  │  └─────────────────────────────────────────────────┘    │    │    │
│  │  └──────────────────────────────────────────────────────────┘    │    │
│  │                                                                    │    │
│  │  Internet Gateway: igw-028e90021954d1c7c                         │    │
│  │  Route Table: rtb-012436612c825579f                              │    │
│  │  - Route: 0.0.0.0/0 → Internet Gateway                           │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## Request Flow Diagram

```
┌─────────────┐
│   USER      │
│   Browser   │
└─────┬───────┘
      │
      │ 1. Request: https://adelekeadebowale.com
      │
      ▼
┌──────────────────────┐
│   AWS Route 53       │
│   (DNS Resolution)   │
└──────┬───────────────┘
       │
       │ 2. Returns: 184.72.153.228
       │
       ▼
┌────────────────────────────────┐
│   Internet Gateway             │
│   Routes to VPC                │
└────────┬───────────────────────┘
         │
         │ 3. Forwards to EC2
         │
         ▼
┌────────────────────────────────┐
│   Security Group               │
│   Checks: Port 443 allowed     │
└────────┬───────────────────────┘
         │
         │ 4. Allows HTTPS traffic
         │
         ▼
┌────────────────────────────────┐
│   NGINX (Port 443)             │
│   - SSL/TLS Termination        │
│   - Certificate Validation     │
└────────┬───────────────────────┘
         │
         │ 5. Decrypts HTTPS
         │    Proxies to localhost:3000
         │
         ▼
┌────────────────────────────────┐
│   Docker Container             │
│   - React App (Production)     │
│   - Listening on port 3000     │
│   - Nginx inside container     │
│     serving static files       │
└────────┬───────────────────────┘
         │
         │ 6. Returns HTML/CSS/JS
         │
         ▼
┌────────────────────────────────┐
│   NGINX (Reverse Proxy)        │
│   - Adds headers               │
│   - Applies caching rules      │
└────────┬───────────────────────┘
         │
         │ 7. Encrypted response
         │
         ▼
┌────────────────────────────────┐
│   USER Browser                 │
│   Displays Portfolio Website   │
└────────────────────────────────┘
```

## Deployment Flow Diagram

```
┌───────────────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT PIPELINE                                 │
│                                                                            │
│  Developer Action                                                          │
│  └─ git push origin main                                                   │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  STAGE 1: Code Checkout                                          │    │
│  │  - GitHub Actions triggers on push                               │    │
│  │  - Checks out repository code                                    │    │
│  │  - Sets up build environment                                     │    │
│  └────────────────────────┬─────────────────────────────────────────┘    │
│                            │                                              │
│                            ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  STAGE 2: Docker Build                                           │    │
│  │  - npm install (install dependencies)                            │    │
│  │  - npm run build (create optimized production build)             │    │
│  │  - docker build (create container image)                         │    │
│  │  - Tags: debolek/portfolio:latest                                │    │
│  └────────────────────────┬─────────────────────────────────────────┘    │
│                            │                                              │
│                            ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  STAGE 3: Push to Registry                                       │    │
│  │  - docker login (using DOCKERHUB_TOKEN secret)                   │    │
│  │  - docker push debolek/portfolio:latest                          │    │
│  │  - Image available for EC2 to pull                               │    │
│  └────────────────────────┬─────────────────────────────────────────┘    │
│                            │                                              │
│                            ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  STAGE 4: Deploy to EC2                                          │    │
│  │  - SSH to EC2 (using EC2_SSH_KEY secret)                         │    │
│  │  - docker pull debolek/portfolio:latest                          │    │
│  │  - docker stop portfolio (stop old container)                    │    │
│  │  - docker rm portfolio (remove old container)                    │    │
│  │  - docker run -d --name portfolio -p 3000:80 \                   │    │
│  │      --restart unless-stopped debolek/portfolio:latest           │    │
│  └────────────────────────┬─────────────────────────────────────────┘    │
│                            │                                              │
│                            ▼                                              │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  STAGE 5: Live Website                                           │    │
│  │  - New container running on port 3000                            │    │
│  │  - Nginx proxies traffic to container                            │    │
│  │  - Users see updated website immediately                         │    │
│  │  - Zero downtime deployment                                      │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                            │
│  Total Deployment Time: 2-5 minutes                                       │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## Multi-Environment Setup

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         GIT BRANCHES                                        │
│                                                                             │
│  ┌─────────────┐      ┌──────────────┐      ┌──────────────┐             │
│  │   develop   │      │   staging    │      │     main     │             │
│  │  (feature)  │      │   (testing)  │      │ (production) │             │
│  └──────┬──────┘      └──────┬───────┘      └──────┬───────┘             │
│         │                     │                      │                     │
│         │ push                │ push                 │ push                │
│         ▼                     ▼                      ▼                     │
│  ┌─────────────┐      ┌──────────────┐      ┌──────────────┐             │
│  │ deploy-dev  │      │deploy-staging│      │ deploy-prod  │             │
│  │ workflow    │      │  workflow    │      │  workflow    │             │
│  └──────┬──────┘      └──────┬───────┘      └──────┬───────┘             │
│         │                     │                      │                     │
│         ▼                     ▼                      ▼                     │
│  ┌─────────────┐      ┌──────────────┐      ┌──────────────┐             │
│  │ Docker Tag: │      │ Docker Tag:  │      │ Docker Tag:  │             │
│  │    dev      │      │   staging    │      │   latest     │             │
│  └──────┬──────┘      └──────┬───────┘      └──────┬───────┘             │
│         │                     │                      │                     │
└─────────┼─────────────────────┼──────────────────────┼─────────────────────┘
          │                     │                      │
          ▼                     ▼                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        EC2 INSTANCE                                          │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │ Container: dev   │  │Container:staging │  │ Container: prod  │         │
│  │ Port: 3001       │  │ Port: 3002       │  │ Port: 3000       │         │
│  │ URL: :3001       │  │ URL: :3002       │  │ URL: :80, :443   │         │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘         │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SECURITY LAYERS                                     │
│                                                                              │
│  Layer 1: AWS IAM                                                            │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  - IAM User: debolek                                                │    │
│  │  - Policies: EC2FullAccess, VPCFullAccess, Route53FullAccess       │    │
│  │  - Access Keys: Stored locally, not in GitHub                      │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Layer 2: VPC & Network                                                      │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  - Private VPC: 10.0.0.0/16                                         │    │
│  │  - Public Subnet: 10.0.1.0/24                                       │    │
│  │  - Internet Gateway: Controlled routing                             │    │
│  │  - Security Groups: Firewall rules                                  │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Layer 3: Security Groups (Firewall)                                         │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  Inbound:                                                            │    │
│  │  ✅ SSH (22) - For administration                                   │    │
│  │  ✅ HTTP (80) - Redirects to HTTPS                                  │    │
│  │  ✅ HTTPS (443) - Encrypted traffic                                 │    │
│  │  ✅ 3000-3002 - Application ports                                   │    │
│  │  ❌ All other ports blocked by default                              │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Layer 4: SSH Authentication                                                 │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  - Key-based authentication only                                    │    │
│  │  - Private key: debolek-ec2-access.pem (never committed to Git)    │    │
│  │  - Password authentication: DISABLED                                │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Layer 5: SSL/TLS Encryption                                                 │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  - Certificate Authority: Let's Encrypt                             │    │
│  │  - Certificate Type: Domain Validated (DV)                          │    │
│  │  - Protocol: TLS 1.2+                                               │    │
│  │  - Auto-renewal: Every 90 days                                      │    │
│  │  - HTTP → HTTPS redirect: ENFORCED                                  │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Layer 6: GitHub Secrets                                                     │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  - EC2_HOST: Encrypted at rest                                      │    │
│  │  - EC2_SSH_KEY: Encrypted at rest                                   │    │
│  │  - DOCKERHUB_USERNAME: Encrypted at rest                            │    │
│  │  - DOCKERHUB_TOKEN: Encrypted at rest                               │    │
│  │  - Never exposed in logs or outputs                                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  Layer 7: Container Isolation                                                │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  - Docker containers: Isolated processes                            │    │
│  │  - No root access required                                          │    │
│  │  - Restart policy: unless-stopped                                   │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

**Created:** January 27, 2026  
**Project:** Adeleke Adebowale Julius Portfolio  
**Infrastructure:** AWS Cloud with Terraform
