# AWS Deployment Guide - Portfolio Multi-Environment Setup

This guide will walk you through deploying your React portfolio to AWS with a complete multi-environment CI/CD pipeline.

## Prerequisites

Before you begin, ensure you have:

- [ ] AWS Account with appropriate permissions
- [ ] AWS CLI installed and configured
- [ ] Terraform installed (v1.0+)
- [ ] Docker Hub account
- [ ] GitHub account with this repository
- [ ] Domain name (optional, but recommended for production)
- [ ] SSH key pair for EC2 access

## Step 1: Configure AWS CLI

```bash
# Install AWS CLI (if not already installed)
# Windows: https://aws.amazon.com/cli/
# Or use: pip install awscli

# Configure your AWS credentials
aws configure

# You'll be prompted for:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (use: us-east-1)
# - Default output format (use: json)
```

## Step 2: Create EC2 Key Pair

```bash
# Create a new SSH key pair in AWS
aws ec2 create-key-pair --key-name debolek-ec2-access --query 'KeyMaterial' --output text > debolek-ec2-access.pem

# Set proper permissions (Mac/Linux)
chmod 400 debolek-ec2-access.pem

# For Windows, use PowerShell:
# icacls debolek-ec2-access.pem /inheritance:r
# icacls debolek-ec2-access.pem /grant:r "%USERNAME%:R"
```

**Note**: Keep this `.pem` file secure! You'll need it to SSH into your EC2 instance.

## Step 3: Deploy Infrastructure with Terraform

```bash
# Navigate to the infra directory
cd infra

# Initialize Terraform
terraform init

# Review the infrastructure plan
terraform plan

# Apply the infrastructure (creates VPC, EC2, Security Groups, etc.)
terraform apply

# Type 'yes' when prompted

# Save the EC2 public IP from the output
# Example output:
# ec2_public_ip = "54.123.456.789"
```

**Important**: Save the EC2 public IP address - you'll need it for the next steps!

## Step 4: Configure DNS (If Using a Custom Domain)

If you have a domain name:

1. Go to AWS Route 53 Console
2. Create a hosted zone for your domain
3. Create A records:
   - `yourdomain.com` → Your EC2 Public IP
   - `*.yourdomain.com` (wildcard) → Your EC2 Public IP
   
   Or create individual records:
   - `dev.yourdomain.com` → Your EC2 Public IP
   - `staging.yourdomain.com` → Your EC2 Public IP
   - `www.yourdomain.com` → Your EC2 Public IP

4. Update your domain registrar's nameservers to use Route 53's nameservers

## Step 5: Set Up GitHub Repository Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | For pushing Docker images |
| `DOCKERHUB_TOKEN` | Your Docker Hub access token | Create at hub.docker.com/settings/security |
| `EC2_HOST` | Your EC2 public IP | From Terraform output |
| `EC2_SSH_KEY` | Contents of your .pem file | Copy entire content of debolek-ec2-access.pem |

To get your Docker Hub token:
1. Go to https://hub.docker.com/settings/security
2. Click "New Access Token"
3. Name it (e.g., "portfolio-cicd")
4. Copy the token (you won't see it again!)

To add your SSH key:
```bash
# Copy the contents of your .pem file
cat debolek-ec2-access.pem
# Copy the entire output and paste as EC2_SSH_KEY secret
```

## Step 6: Set Up EC2 Instance

```bash
# SSH into your EC2 instance
ssh -i debolek-ec2-access.pem ubuntu@YOUR_EC2_IP

# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu

# Exit and reconnect for group changes to take effect
exit

# SSH back in
ssh -i debolek-ec2-access.pem ubuntu@YOUR_EC2_IP

# Verify Docker installation
docker --version
docker ps
```

## Step 7: Install and Configure NGINX (Optional - for subdomain routing)

Only needed if you're using a custom domain with subdomains:

```bash
# Install NGINX
sudo apt install nginx -y

# Install Certbot for SSL certificates
sudo apt install certbot python3-certbot-nginx -y

# Exit EC2 for now
exit
```

## Step 8: Create Git Branches

```bash
# Navigate back to your project root
cd c:\Users\debol\Desktop\ADEBOWALE-PORTFOLIOPAGE

# Create and push develop branch
git checkout -b develop
git push -u origin develop

# Create and push staging branch
git checkout -b staging
git push -u origin staging

# Return to main branch
git checkout main
```

## Step 9: Deploy to Production

```bash
# Make sure you're on the main branch
git checkout main

# Commit and push (this triggers the production CI/CD pipeline)
git add .
git commit -m "Initial production deployment"
git push origin main
```

This will automatically:
1. Build your Docker image
2. Push to Docker Hub
3. SSH into EC2
4. Pull and run the container on port 3000

## Step 10: Verify Deployment

Check GitHub Actions:
1. Go to your repository on GitHub
2. Click "Actions" tab
3. Watch the "Deploy to Production" workflow

Access your application:
- **Without domain**: `http://YOUR_EC2_IP:3000`
- **With domain (after DNS propagates)**: `http://yourdomain.com`

## Step 11: Deploy to Dev and Staging

```bash
# Deploy to development
git checkout develop
git add .
git commit -m "Deploy to development"
git push origin develop

# Deploy to staging
git checkout staging
git add .
git commit -m "Deploy to staging"
git push origin staging
```

Access your environments:
- **Development**: `http://YOUR_EC2_IP:3001`
- **Staging**: `http://YOUR_EC2_IP:3002`
- **Production**: `http://YOUR_EC2_IP:3000`

## Step 12: Set Up SSL (If Using Custom Domain)

```bash
# SSH into EC2
ssh -i debolek-ec2-access.pem ubuntu@YOUR_EC2_IP

# Upload NGINX config
# (From your local machine first)
scp -i debolek-ec2-access.pem nginx-config/portfolio-nginx.conf ubuntu@YOUR_EC2_IP:/tmp/

# Back in EC2, update the config with your domain
sudo nano /tmp/portfolio-nginx.conf
# Replace all instances of "yourdomain.com" with your actual domain

# Move to NGINX directory
sudo mv /tmp/portfolio-nginx.conf /etc/nginx/sites-available/portfolio-nginx.conf

# Remove default config and enable your config
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/portfolio-nginx.conf /etc/nginx/sites-enabled/

# Test NGINX configuration
sudo nginx -t

# Obtain SSL certificates (wait for DNS to propagate first!)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d dev.yourdomain.com
sudo certbot --nginx -d staging.yourdomain.com

# Reload NGINX
sudo systemctl reload nginx
```

## Final URLs

After everything is set up:

| Environment | URL with Domain | URL without Domain |
|-------------|-----------------|-------------------|
| **Production** | https://yourdomain.com | http://YOUR_EC2_IP:3000 |
| **Staging** | https://staging.yourdomain.com | http://YOUR_EC2_IP:3002 |
| **Development** | https://dev.yourdomain.com | http://YOUR_EC2_IP:3001 |

## Troubleshooting

### GitHub Actions Failing?
- Check GitHub Secrets are set correctly
- Verify EC2_SSH_KEY has the complete .pem file content
- Check Docker Hub credentials

### Can't SSH into EC2?
```bash
# Check security group allows SSH (port 22)
aws ec2 describe-security-groups --group-ids YOUR_SG_ID

# Verify key pair permissions
chmod 400 debolek-ec2-access.pem
```

### Containers Not Running?
```bash
# SSH into EC2 and check
docker ps -a
docker logs portfolio
docker logs portfolio-dev
docker logs portfolio-staging
```

### NGINX Errors?
```bash
# Check NGINX logs
sudo tail -f /var/log/nginx/error.log

# Test configuration
sudo nginx -t

# Restart NGINX
sudo systemctl restart nginx
```

### DNS Not Resolving?
```bash
# Check DNS propagation (can take up to 48 hours)
nslookup yourdomain.com
dig yourdomain.com

# Use online tools: https://www.whatsmydns.net/
```

## Cost Estimation

Approximate monthly costs:
- **EC2 t2.micro**: $8-10/month (free tier eligible for 1 year)
- **Route 53 Hosted Zone**: $0.50/month
- **Data Transfer**: $0.09/GB (first 100GB free per month)
- **Total**: ~$10-15/month (after free tier)

## Next Steps

1. ✅ Set up monitoring with CloudWatch
2. ✅ Configure auto-backups for EC2
3. ✅ Set up CloudWatch alarms for high CPU/memory
4. ✅ Enable AWS WAF for additional security
5. ✅ Consider using AWS ECR instead of Docker Hub
6. ✅ Set up automated database backups (if using DB)

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Check EC2 system logs: `ssh into EC2 → sudo journalctl -u docker`
3. Review NGINX logs: `sudo tail -f /var/log/nginx/error.log`
4. Check container logs: `docker logs <container-name>`

---

**Congratulations! 🎉** Your portfolio is now deployed on AWS with a complete multi-environment CI/CD pipeline!
