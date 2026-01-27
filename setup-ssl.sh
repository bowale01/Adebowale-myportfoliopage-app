#!/bin/bash
# SSL Setup Script for adelekeadebowale.com
# Run this after DNS has propagated (1-2 hours after domain registration)

echo "Installing SSL certificate for adelekeadebowale.com..."

# Get SSL certificate from Let's Encrypt
sudo certbot --nginx \
  -d adelekeadebowale.com \
  -d www.adelekeadebowale.com \
  --non-interactive \
  --agree-tos \
  --email adeleke@example.com \
  --redirect

# Test certificate auto-renewal
sudo certbot renew --dry-run

echo "SSL setup complete! Your site is now available at:"
echo "✅ https://adelekeadebowale.com"
echo "✅ https://www.adelekeadebowale.com"
