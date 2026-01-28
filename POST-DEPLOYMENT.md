# Post-Deployment Checklist for adelekeadebowale.com

> **⚠️ DOCUMENTATION NOTE:** This guide includes example values (IP: 184.72.153.228, etc.) from the original deployment. These are public infrastructure identifiers included for reference only. Replace with your own values when using these commands.

## ✅ Completed
- [x] AWS EC2 instance deployed
- [x] Docker & Nginx configured
- [x] GitHub Actions CI/CD pipeline setup
- [x] Domain adelekeadebowale.com registered
- [x] Route 53 DNS configured
- [x] Nameservers updated

## ⏳ Waiting for DNS Propagation (15-60 minutes)

### Check DNS Status
Run this command to check if DNS is ready:
```powershell
Resolve-DnsName adelekeadebowale.com -Type A
```

Expected result: `184.72.153.228`

## 🔒 Setup SSL/HTTPS (Run after DNS works)

Once DNS resolves correctly, run this command to get free SSL certificate:

```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot --nginx -d adelekeadebowale.com -d www.adelekeadebowale.com --email debolek4dem@gmail.com --agree-tos --redirect --non-interactive"
```

This will:
- Get a free SSL certificate from Let's Encrypt
- Auto-configure Nginx for HTTPS
- Redirect HTTP → HTTPS automatically
- Auto-renew certificate every 90 days

## 🌐 Your Portfolio URLs

After DNS propagates and SSL is set up:
- **Production (HTTPS):** https://adelekeadebowale.com
- **With www:** https://www.adelekeadebowale.com
- **Direct IP:** http://184.72.153.228:3000

## 🚀 Deployment Process

**Automatic deployments via GitHub Actions:**
- Push to `main` → Deploys to production (port 3000)
- Push to `develop` → Deploys to dev (port 3001)
- Push to `staging` → Deploys to staging (port 3002)

## 💰 AWS Costs (Estimated)

- EC2 t2.micro: ~$8-10/month (Free tier: 750 hours/month for 12 months)
- Route 53 hosted zone: $0.50/month
- Domain registration: $12/year
- **Total: ~$10-11/month** (or ~$1/month with free tier)

## 🔧 Maintenance

**SSL Certificate Auto-Renewal:**
Certbot automatically renews certificates. Test with:
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "sudo certbot renew --dry-run"
```

**Check Docker Containers:**
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker ps"
```

**View Container Logs:**
```bash
ssh -i debolek-ec2-access.pem ubuntu@184.72.153.228 "docker logs portfolio --tail 50"
```

## 📞 Contact on Portfolio
- Website: https://adelekeadebowale.com
- GitHub: @bowale01
- LinkedIn: linkedin.com/in/debolek
- Email: debolek4dem@gmail.com

---
**Last Updated:** January 27, 2026
**Status:** DNS propagation in progress
