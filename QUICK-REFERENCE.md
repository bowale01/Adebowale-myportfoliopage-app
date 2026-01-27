# Quick Reference Card - Portfolio Deployment

## 🔗 Important URLs
- **Portfolio:** https://adelekeadebowale.com
- **GitHub Repo:** https://github.com/bowale01/Adebowale-myportfoliopage-app
- **GitHub Actions:** https://github.com/bowale01/Adebowale-myportfoliopage-app/actions
- **AWS Console:** https://console.aws.amazon.com
- **Docker Hub:** https://hub.docker.com/r/debolek/portfolio

## 📊 Infrastructure Details
- **EC2 Instance ID:** i-0d3ae9925f9d0fd1b
- **Public IP:** 184.72.153.228
- **Instance Type:** t2.micro
- **Region:** us-east-1 (US East - N. Virginia)
- **VPC ID:** vpc-0f86e47d77926ce6a
- **Security Group:** sg-0b899636ff5bdad9f

## 🔑 Access Information
- **SSH Key:** debolek-ec2-access.pem (local file)
- **IAM User:** debolek
- **Docker Hub User:** debolek

## 🚀 Common Commands

### SSH into EC2
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228
```

### Check Docker Containers
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker ps"
```

### View Container Logs
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker logs portfolio --tail 50"
```

### Restart Container
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker restart portfolio"
```

### Check Nginx Status
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo systemctl status nginx"
```

### Test Nginx Config
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo nginx -t"
```

### Reload Nginx
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo systemctl reload nginx"
```

### Check SSL Certificate
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot certificates"
```

### Renew SSL (Manual)
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot renew"
```

### Test SSL Auto-Renewal
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot renew --dry-run"
```

## 📦 Deployment Process

### Deploy to Production
```powershell
git add .
git commit -m "Your commit message"
git push origin main
```
Deploys to: http://184.72.153.228:3000

### Deploy to Dev
```powershell
git checkout -b develop  # first time
git push origin develop
```
Deploys to: http://184.72.153.228:3001

### Deploy to Staging
```powershell
git checkout -b staging  # first time
git push origin staging
```
Deploys to: http://184.72.153.228:3002

## 🔧 Terraform Commands

### Navigate to Terraform Directory
```powershell
cd infra
```

### See Current State
```powershell
terraform show
```

### Plan Changes
```powershell
terraform plan
```

### Apply Changes
```powershell
terraform apply
```

### Destroy Infrastructure (⚠️ CAREFUL!)
```powershell
terraform destroy
```

### Get Outputs
```powershell
terraform output
```

## 🌐 DNS Commands

### Check DNS Resolution
```powershell
Resolve-DnsName adelekeadebowale.com -Type A
```

### Check WWW DNS
```powershell
Resolve-DnsName www.adelekeadebowale.com -Type A
```

### List Route 53 Hosted Zones
```powershell
aws route53 list-hosted-zones
```

## 🐳 Docker Commands

### Pull Latest Image
```bash
docker pull debolek/portfolio:latest
```

### Build Image Locally
```powershell
docker build -t debolek/portfolio:latest .
```

### Run Container Locally
```powershell
docker run -d -p 3000:80 --name portfolio debolek/portfolio:latest
```

### Stop Container
```bash
docker stop portfolio
```

### Remove Container
```bash
docker rm portfolio
```

### View All Images
```bash
docker images
```

## 📝 GitHub Secrets (Already Configured)

| Secret Name | Purpose |
|-------------|---------|
| EC2_HOST | EC2 instance IP address |
| EC2_SSH_KEY | Private SSH key for EC2 access |
| DOCKERHUB_USERNAME | Docker Hub login |
| DOCKERHUB_TOKEN | Docker Hub access token |

## 🔍 Monitoring & Debugging

### Check EC2 Instance Status
```powershell
aws ec2 describe-instances --instance-ids i-0d3ae9925f9d0fd1b
```

### View Nginx Access Logs
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo tail -f /var/log/nginx/access.log"
```

### View Nginx Error Logs
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo tail -f /var/log/nginx/error.log"
```

### Check Disk Space
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "df -h"
```

### Check Memory Usage
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "free -h"
```

### Check Running Processes
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "top -bn1 | head -20"
```

## 🛠️ Troubleshooting

### Problem: Can't Access Website
1. Check if container is running: `docker ps`
2. Check Nginx status: `sudo systemctl status nginx`
3. Check security groups allow traffic
4. Check DNS resolution

### Problem: GitHub Actions Failing
1. Verify all 4 secrets are set correctly
2. Check Docker Hub credentials
3. Verify EC2 SSH key is complete

### Problem: SSH Not Working
1. Fix line endings:
   ```powershell
   (Get-Content debolek-ec2-access.pem -Raw) -replace "`r`n","`n" | Set-Content -Path debolek-ec2-access.pem -NoNewline -Force
   ```
2. Verify security group allows SSH (port 22)

### Problem: SSL Not Working
1. Verify DNS is resolving correctly
2. Check certificate: `sudo certbot certificates`
3. Test Nginx config: `sudo nginx -t`
4. Reload Nginx: `sudo systemctl reload nginx`

## 💰 Monthly Costs
- EC2 t2.micro: $8-10/month (Free tier: 750 hrs/month)
- Route 53 Hosted Zone: $0.50/month
- Domain: $12/year (~$1/month)
- **Total: ~$10-11/month** (or ~$1/month with free tier)

## 📞 Support
- **Email:** debolek4dem@gmail.com
- **GitHub:** @bowale01
- **LinkedIn:** linkedin.com/in/debolek

---
**Last Updated:** January 27, 2026
