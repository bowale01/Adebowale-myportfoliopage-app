# Multi-Environment NGINX Configuration

This directory contains NGINX reverse proxy configuration for managing multiple deployment environments (development, staging, production) with SSL/TLS support.

## Files

- **portfolio-nginx.conf**: Main NGINX configuration file for reverse proxy and subdomain routing
- **setup-instructions.md**: Step-by-step guide to set up NGINX with SSL certificates

## Architecture

```
Internet → Route 53 DNS → EC2 Instance
                              ↓
                          NGINX (Port 80/443)
                              ↓
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
    Dev Container    Staging Container   Prod Container
      (Port 3001)      (Port 3002)        (Port 3000)
```

## Quick Start

1. **Update DNS Records**: Point subdomains to your EC2 IP
2. **Install NGINX**: `sudo apt install nginx`
3. **Copy Config**: Upload `portfolio-nginx.conf` to EC2
4. **Install Certbot**: Get SSL certificates for all domains
5. **Enable Site**: Create symlink in `/etc/nginx/sites-enabled/`
6. **Reload NGINX**: `sudo systemctl reload nginx`

## Environment Mapping

| Subdomain | Port | Container | Branch |
|-----------|------|-----------|--------|
| dev.yourdomain.com | 3001 | portfolio-dev | develop |
| staging.yourdomain.com | 3002 | portfolio-staging | staging |
| yourdomain.com | 3000 | portfolio | main |

## Features

✅ SSL/TLS encryption for all environments  
✅ Automatic HTTP to HTTPS redirect  
✅ Subdomain-based environment routing  
✅ Proxy headers for proper request forwarding  
✅ WWW to non-WWW redirect for production  
✅ Auto-renewal of SSL certificates via Certbot

## Prerequisites

- Domain name registered and configured in Route 53
- EC2 instance with public IP
- Security groups allowing ports 80, 443, 3000, 3001, 3002
- Docker containers running on respective ports

See `setup-instructions.md` for detailed deployment steps.
