# tortuga-scheduler

# Cheat sheet!

Packages to install/commands to run

## Installing Node.js

```bash
# First get the package
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -

# Install the package
sudo apt-get install -y nodejs

# Install any global dependencies
sudo npm install -g gulp babel-cli pm2 webpack yo

```

## Install Nginx and setup nginx

### Install Nginx

```bash
# Install the package
sudo apt-get install nginx
```

### Setup reverse proxy

```bash
# Open the default site in vim
sudo vi /etc/nginx/sites-available/default
```

Edit the file to resemble this (but possibly change the URL and PORT):

```
server {
        listen 80;

        location / {
                proxy_pass http://127.0.0.1:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}

```

After the file is saved, run the below command.

NOTE: Make sure there's something listening on, in this case, http://127.0.0.1:8080.

```bash
# Restart bash
sudo service nginx restart
```