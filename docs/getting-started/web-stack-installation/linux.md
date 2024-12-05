---
sidebar_position: 2
---

# Linux server deployment

Capsa can be deployed to any Linux server environment. The Linux deployment is building Capsa locally and not using the generated binaries from GitHub.

:::info This guide is written for Ubuntu
This guide is made with **Ubuntu 24.04 LTS** with no software installed on it yet. Any distro should work however, so feel free to adopt this guide for your prefered Linux distribution.

_Windows deployments should also work, but are not officially supported._
:::

Before you get started, SSH into your server and `sudo su` to run commands as root.

## DNS settings

Before starting the installation, make sure that the proper DNS-records have been set for your domain.

In this example, we are using `api.demo.capsa.gg` and `web.demo.capsa.gg`, so replace this with your domain names as you desire.

## Requirements

To install the required software, run

```sh
apt install git make
snap install go --classic
snap install node --classic --channel=22
```

Verify the installations with

```sh
go version
node --version
```

, so make sure that the folders are created:

```sh
mkdir -p /opt/capsa-server
mkdir -p /opt/capsa-web
```

## Cloning the repo

This guide will use `/opt/capsa` as a working directory. Before cloning, run `cd /opt`.

```sh
git clone https://github.com/capsa-gg/capsa.git capsa
```

Will clone the repository to `/opt/capsa`.

## Building the project

First, we will build the server with

```sh
cd /opt/capsa/server
make build
```

After building the server, check if it exists with `file /opt/capsa/server/capsa`, which should show that the server is a 64-bit, statically-linked executable.

We want to copy this file outside of the repository:

```sh
mkdir -p /opt/capsa-server
cp /opt/capsa/server/capsa /opt/capsa-server
```

For building the web application, run

```sh
cd /opt/capsa/web
npm install
npm run build
```

This will generate a standalone build. By running `ls .next/standalone/` should see

```sh
node_modules  package.json  server.js
```

Now we want to add the files to the right directory:

```sh
cp -r /opt/capsa/web/.next/standalone /opt/capsa-web
cp -r /opt/capsa/web/.next/static /opt/capsa-web/.next/static
cp -r /opt/capsa/web/public /opt/capsa-web/public
ls /opt/capsa-web
```

Where the `ls` command should output the same as before.

## Setting the configuration

Run `cp /opt/capsa/server/config.example.yml /opt/capsa-server/config.yml`

Now use your favourite code editor to change the values of the `config.yml` file. For instructions on this, see [Server Configuration](../../configuration/server-config.md).

:::info Check the port
This guide assumes that port `5000` will be used to run the service.
:::

To generate the private key file, you can run

```sh
cd /opt/capsa-server
./capsa jwk generate-keyset -w
```

For this guide, we can use the `jwk.key`, and set the `jwk_private_key_path` instead of using the `jwk_private_key_base64` variable. For more details on the key generation, see [Generating Keypair](../web-stack.md#generating-publicprivate-keypair).

:::warning Take proper care of your secrets
Make sure you keep the private key and other configuration variables secure!
:::

## Database migrations

Before we can run the application, we need to run the database migrations.

:::info Run migrations when updating Capsa
Whenever you are updating Capsa, make sure to also run the database migrations.
:::

Migrate the database to the latest version with:

```sh
cd /opt/capsa-server
./capsa db migrate -d up
```

This should give log output with `database migrated successfully`.

## Creating a user to run the services

It is good practice to use a non-privileged user to run your services on Linux. The following command will create a user called `capsa`. If you want to use another username, adjust the systemd configurations accordingly.

```sh
groupadd capsa
sudo useradd -m -s /bin/bash -g capsa capsa
```

We also want to make sure all file permissions are set correctly:

```sh
chown -R capsa:capsa /opt/capsa-web
chown -R root:capsa /opt/capsa-server
chmod +r capsa jwk.key
```

## Running the server as a service

To run the Capsa API server as a service using systemd, create a file `/etc/systemd/system/capsa-server.service` with the following contents:

```ini
# /etc/systemd/system/capsa-server.service
[Unit]
Description=Capsa Server
After=network.target

[Service]
Type=simple
User=capsa
Group=capsa
ExecStart=/opt/capsa-server/capsa server start
WorkingDirectory=/opt/capsa-server
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Reload systemd and start the service with

```sh
sudo systemctl daemon-reload
sudo systemctl enable capsa-server.service
sudo systemctl start capsa-server.service
```

Run `systemctl status capsa-server` to see if the server is running correctly.

To verify that the server is actually running, you can run `curl http://localhost:5000/v1/status`.

## Running the web app as a service

To run the Capsa Web app as a service using systemd, create a file `/etc/systemd/system/capsa-web.service` with the following contents:

```ini
# /etc/systemd/system/capsa-web.service
[Unit]
Description=Capsa Web
After=network.target

[Service]
Type=simple
User=capsa
Group=capsa
ExecStart=/snap/bin/node /opt/capsa-web/server.js
WorkingDirectory=/opt/capsa-web
Restart=on-failure
Environment=SERVER_URL=https://api.demo.capsa.gg

[Install]
WantedBy=multi-user.target
```

:::info Set the correct server url
Make sure to change the `SERVER_URL` environment variable to the correct URL.
:::

Reload systemd and start the service with

```sh
sudo systemctl daemon-reload
sudo systemctl enable capsa-web.service
sudo systemctl start capsa-web.service
```

Run `systemctl status capsa-web` to see if the server is running correctly.

:::warning Do not open the web app yet
The web app requires the server to be available via the domain in the config. Wait just a bit until the application is available. Otherwise, you might have to restart the web app service in order to reload the configuration.
:::

## Using Nginx as a reverse proxy

The API server and webapp are exposed on ports `5000` and `3000` respectively. We can use Nginx as a reverse proxy to expose the applications on port `80`.

```
apt install -y nginx
unlink /etc/nginx/sites-enabled/default
```

Will install Nginx and disable the default website. We can now create a new configuration in `/etc/nginx/sites-available/capsa.conf` with the following configuration:

:::info Set the correct hostnames and ports
Make sure to change the `server_name` to your domain. If your Capsa installation runs on different ports, make sure to also update these.
:::

```conf
# /etc/nginx/sites-available/capsa.conf

# API Server
server {
    listen 80 http2;
    # listen [::]:80; # Uncomment for IPv6
    server_name api.demo.capsa.gg;

    access_log /var/log/nginx/capsa-server.access.log;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Web app
server {
    listen 80 http2;
    # listen [::]:80; # Uncomment for IPv6
    server_name web.demo.capsa.gg;

    access_log /var/log/nginx/capsa-web.access.log;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Now enable the site and restart Nginx with

```sh
ln -s /etc/nginx/sites-available/capsa.conf /etc/nginx/sites-enabled/
systemctl restart nginx
```

## Setting up HTTPS with Certbot

We can use certbot to automatically generate a free TLS certificate.

:::info Make sure your domain is configured
This step requires your server IP to be set as A-records for the desired domain names. Without this, no TLS certificates can be reacted
:::

Install the required packages with

```sh
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot
```

Now request the certificates, adding `-d` arguments for the domains that you want to request certificates for.

```sh
certbot --nginx -d api.demo.capsa.gg -d web.demo.capsa.gg
```

You will be asked for some details before the request for the certificates is made. Certbot will also take care off changing the Nginx configuration and adding atomatic renewal. To test the automatic renewal, run

```sh
certbot renew --dry-run
```

## Validate deployment

To see whether the deployment was successful, run the following commands with your domains:

- **Server**: `curl https://api.demo.capsa.gg/v1/status` and `curl https://api.demo.capsa.gg/.well-known/jwks.json`
- **Web**: `curl https://web.demo.capsa.gg/api/status`

:::warning This is not a Linux security guide
This guide does not cover securing your Linux server, as this is different per cloud provider.

Make sure to properly secure your server with tools like `fail2ban`, disabling root login, disabling SSH with passwords, `ufw` and such.
:::

## Creating the first admin user and environment

To create an admin user, run

```sh
cd /opt/capsa-server
./capsa user add -e youremail -f FirstName -l LastName -r Admin
```

You will now receive an email that allows you to set your password.

## Title and environment (optional)

:::info You can do this with the web app
Title and environment management is available in the web app as well.
:::

To add a title and environment, in our case "Capsa" and "Demo", run

```sh
cd /opt/capsa-server
./capsa title add -n "Capsa"
./capsa env add -n "Demo" -t "Capsa"
```

The key for sending logs from Unreal Engine is now visible on the homepage of the web app, or when running `./capsa env list`.

## Capsa is installed

Congratulations! Capsa is now set up and running correctly!

:::tip Need a helping hand?
If you got stuck deploying Capsa, feel free to reach out to [luciano@companiongroup.io](mailto:luciano@companiongroup.io) for support. We are happy to help you getting Capsa up and running!
:::
