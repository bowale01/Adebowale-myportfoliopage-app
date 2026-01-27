# NGINX Multi-Environment Setup Instructions

## Prerequisites
- EC2 instance running Ubuntu
- Domain name configured in Route 53
- Docker installed and containers running

## Step 1: Install NGINX

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 2: Configure DNS in Route 53

Create A records pointing to your EC2 public IP:
- `yourdomain.com` → EC2 IP
- `www.yourdomain.com` → EC2 IP
- `dev.yourdomain.com` → EC2 IP
- `staging.yourdomain.com` → EC2 IP

Or use a wildcard record:
- `*.yourdomain.com` → EC2 IP

## Step 3: Upload NGINX Configuration

```bash
# Copy the configuration file to your EC2 instance
scp -i your-key.pem nginx-config/portfolio-nginx.conf ubuntu@YOUR_EC2_IP:/tmp/

# SSH into your EC2 instance
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# Move config to NGINX directory
sudo mv /tmp/portfolio-nginx.conf /etc/nginx/sites-available/portfolio-nginx.conf

# Update the domain names in the config
sudo nano /etc/nginx/sites-available/portfolio-nginx.conf
# Replace all instances of "yourdomain.com" with your actual domain

# Remove default configuration
sudo rm /etc/nginx/sites-enabled/default

# Create symlink to enable the site
sudo ln -s /etc/nginx/sites-available/portfolio-nginx.conf /etc/nginx/sites-enabled/

# Test NGINX configuration
sudo nginx -t
```

## Step 4: Install Certbot for SSL Certificates

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificates for all domains
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d dev.yourdomain.com
sudo certbot --nginx -d staging.yourdomain.com

# Certbot will automatically configure SSL in your NGINX config
```

## Step 5: Reload NGINX

```bash
sudo systemctl reload nginx
```

## Step 6: Set Up Auto-Renewal for SSL Certificates

```bash
# Test renewal
sudo certbot renew --dry-run

# The cron job is automatically set up by Certbot
# To verify: sudo systemctl status certbot.timer
```

## Step 7: Verify Setup

Test each environment:
- **Production**: https://yourdomain.com
- **Staging**: https://staging.yourdomain.com
- **Development**: https://dev.yourdomain.com

## Troubleshooting

### Check NGINX Status
```bash
sudo systemctl status nginx
```

### View NGINX Logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check Container Status
```bash
docker ps -a
```

### Restart NGINX
```bash
sudo systemctl restart nginx
```

### Check Port Availability
```bash
sudo netstat -tulpn | grep -E ':(80|443|3000|3001|3002)'
```

## Environment URLs Summary

| Environment | Branch | Port | URL |
|-------------|--------|------|-----|
| Development | develop | 3001 | https://dev.yourdomain.com |
| Staging | staging | 3002 | https://staging.yourdomain.com |
| Production | main | 3000 | https://yourdomain.com |

## Security Notes

- All HTTP traffic is redirected to HTTPS
- TLS 1.2 and 1.3 are enabled
- Strong cipher suites are configured
- SSL certificates auto-renew every 90 days
