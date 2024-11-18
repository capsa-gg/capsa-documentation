---
sidebar_position: 2
---

# Linux server deployment

Capsa can be deployed to any Linux server environment. Windows deployments should also work, but are not officially supported.

:::info This guide is written for Ubuntu
This guide is made with Ubuntu 24.04 LTS. Any distro should work however, so feel free to adopt this guide for your prefered Linux distribution.
:::

## Requirements

To install the required software, run

```sh
TODO: golang, nodejs, git
```

## Cloning the repo

```sh
TODO: Git checkout
TODO: Checkout tag
```

## Building the project

```sh
TODO: commands
```

For our example, we want to serve the application from `/opt/capsa`, so we run

```sh
TODO: cp
```

## Setting the configuration

TODO

## Database migrations

TODO

## Running the server as a service

TODO

## Running the web app as a service

TODO

:::warning Do not open the web app yet
The web app requires the server to be available via the domain in the config. Wait just a bit until the application is available. Otherwise, you might have to restart the web app service in order to reload the configuration.
:::

## Using Nginx as a reverse proxy

TODO

## Setting up HTTPS with Certbot

:::info
This step requires your server IP to be set as A-records for the desired domain names. Without this, no TLS certificates can be reacted
:::

TODO

## Validate deployment

To see whether the deployment was successful, run:

- **Server**: `curl https://<apihostname>/v1/status` and `curl https://<apihostname>/.well-known/jwks.json`
- **Web**: `curl https://<webhostname>/auth/login`
