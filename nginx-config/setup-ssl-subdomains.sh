#!/bin/bash

# Create dev subdomain NGINX config
sudo tee /etc/nginx/sites-available/dev.adelekeadebowale.com > /dev/null <<'EOF'
server {
    server_name dev.adelekeadebowale.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
EOF

# Create staging subdomain NGINX config
sudo tee /etc/nginx/sites-available/staging.adelekeadebowale.com > /dev/null <<'EOF'
server {
    server_name staging.adelekeadebowale.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 80;
}
EOF

# Enable the sites
sudo ln -sf /etc/nginx/sites-available/dev.adelekeadebowale.com /etc/nginx/sites-enabled/
sudo ln -sf /etc/nginx/sites-available/staging.adelekeadebowale.com /etc/nginx/sites-enabled/

# Test NGINX configuration
sudo nginx -t

# Reload NGINX
sudo systemctl reload nginx

# Update SSL certificate to include subdomains
sudo certbot certonly --nginx --non-interactive --agree-tos --expand \
  -d adelekeadebowale.com \
  -d www.adelekeadebowale.com \
  -d dev.adelekeadebowale.com \
  -d staging.adelekeadebowale.com

# Run certbot to automatically configure SSL for all domains
sudo certbot --nginx --non-interactive --agree-tos \
  -d dev.adelekeadebowale.com \
  -d staging.adelekeadebowale.com

# Reload NGINX again to apply SSL
sudo systemctl reload nginx

echo "SSL setup complete! Your subdomains should now be secured."
