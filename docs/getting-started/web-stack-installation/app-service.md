---
sidebar_position: 1
---

# App Service deployment

The App Service deployment is the most straight-forward way of deploying Capsa. Therefore, it is the recommended approach for deploying Capsa in the cloud.

App Services allow you to deploy Docker images to a container, without the hassle of managing servers yourself, or messing with Kubernetes configurations.

:::info You can also run the Docker images manually
If you are not using a cloud provider, or your cloud provider's App Service is less straight-forward, or if you simply prefer to run the Docker containers on your own server, you can run the Docker images in Docker.

When deploying with Docker, simply make sure that the proper environment variables are set, setting `-p 5000:5000` for server and `-p 3000:3000` for the web app, with a reverse proxy for enabling TLS and outside traffic on the HTTP(S) ports.
:::

_This guide shows how to configure Capsa for the DigitalOcean App Platform, but different cloud platforms are similar enough to follow and adjust_

## Two applications

Because the web stack will run under two different domains, you will probably have to create two different applications.

For this guide, we are setting up `api.demo.capsa.gg` and `web.demo.capsa.gg`.

## Generating the secrets

Before we proceed, we should make sure that we have all secrets required to configure the server. For generating the private/public keys, see [Generating Keypair](./index.md#generating-publicprivate-keypair). Don't delete the Capsa just yet, we will need it in a bit.

We will be using the base64 encoded private key, as the DigitalOcean App Platform does not support mounting files to disk. We can do this with `cat jwk.kwy | base64`.

## API Server

First, we will create the API server. We create a new App, and point to the GitHub Container Registry, `capsa-gg/capsa-server` with tag `latest`. Don't worry about setting any other settings yet, we will override this in a bit with the App Spec. We just need to create _an_ app now we will call it `capsa-server`.

We are using the following App Spec:

```yml
name: capsa-server
alerts:
  - rule: DEPLOYMENT_FAILED
  - rule: DOMAIN_FAILED
databases: # Note: this is a development database, you can set a production database instead and change the variables
  - engine: PG
    name: psql
domains:
  - domain: api.demo.capsa.gg # REPLACEME
    type: PRIMARY
    zone: capsa.gg
features:
  - buildpack-stack=ubuntu-22
ingress:
  rules:
    - component:
        name: api
      match:
        path:
          prefix: /
region: ams
jobs:
  - image:
      registry: capsa-gg
      registry_type: GHCR
      repository: capsa-server
      tag: latest # REPLACEME with the latest tag
    instance_count: 1
    instance_size_slug: basic-xxs
    kind: PRE_DEPLOY
    name: db-migrations
    run_command: ./capsa db migrate -d up
    envs:
      - key: API_PORT
        scope: RUN_AND_BUILD_TIME
        value: "5000"
      - key: API_HOSTNAME
        scope: RUN_AND_BUILD_TIME
        value: localhost
services:
  - name: api
    instance_count: 1
    instance_size_slug: basic-xxs
    http_port: 8080
    run_command: ./capsa server start
    image:
      registry: capsa-gg
      registry_type: GHCR
      repository: capsa-server
      tag: latest # REPLACEME with the latest tag
    health_check:
      http_path: /v1/status
    envs:
      - key: API_PORT
        scope: RUN_AND_BUILD_TIME
        value: ${_self.PRIVATE_PORT}
      - key: API_HOSTNAME
        scope: RUN_AND_BUILD_TIME
        value: ${_self.PUBLIC_URL}
    alerts:
      - operator: GREATER_THAN
        rule: CPU_UTILIZATION
        value: 75
        window: FIVE_MINUTES
      - operator: GREATER_THAN
        rule: MEM_UTILIZATION
        value: 75
        window: FIVE_MINUTES
      - operator: GREATER_THAN
        rule: RESTART_COUNT
        value: 2
        window: FIVE_MINUTES
envs:
  - key: DEVELOPMENT
    scope: RUN_TIME
    value: "false"
  - key: JWK_PRIVATE_KEY_BASE64
    scope: RUN_AND_BUILD_TIME
    value: |-
      <REPLACEME>
  - key: API_PROTOCOL
    scope: RUN_AND_BUILD_TIME
    value: https
  - key: WEBAPP_HOSTNAME
    scope: RUN_AND_BUILD_TIME
    value: web.demo.capsa.gg # REPLACEME
  - key: DB_HOST
    scope: RUN_AND_BUILD_TIME
    value: ${psql.HOSTNAME}
  - key: DB_USER
    scope: RUN_AND_BUILD_TIME
    value: ${psql.USERNAME}
  - key: DB_PASS
    scope: RUN_AND_BUILD_TIME
    value: ${psql.PASSWORD}
  - key: DB_PORT
    scope: RUN_AND_BUILD_TIME
    value: ${psql.PORT}
  - key: DB_NAME
    scope: RUN_AND_BUILD_TIME
    value: ${psql.DATABASE}
  - key: DB_SSL
    scope: RUN_AND_BUILD_TIME
    value: "true"
  - key: EMAIL_SENDER_NAME
    scope: RUN_AND_BUILD_TIME
    value: Capsa
  - key: EMAIL_SENDER_EMAIL
    scope: RUN_AND_BUILD_TIME
    value: <REPLACEME>
  - key: BREVO_API_KEY
    scope: RUN_AND_BUILD_TIME
    value: <REPLACEME>
  - key: BLOBSTORAGE_ENDPOINT
    scope: RUN_AND_BUILD_TIME
    value: https://ams3.digitaloceanspaces.com # REPLACEME
  - key: BLOBSTORAGE_REGION
    scope: RUN_AND_BUILD_TIME
    value: ams3 # REPLACEME
  - key: BLOBSTORAGE_KEY
    scope: RUN_AND_BUILD_TIME
    value: <REPLACEME>
  - key: BLOBSTORAGE_SECRET
    scope: RUN_AND_BUILD_TIME
    value: <REPLACEME>
  - key: BLOBSTORAGE_BUCKET
    scope: RUN_AND_BUILD_TIME
    value: <REPLACEME>
  - key: LOG_RETENTION_DAYS
    scope: RUN_AND_BUILD_TIME
    value: "30"
  - key: LOG_MAX_DURATION_HOURS
    scope: RUN_AND_BUILD_TIME
    value: "48"
```

A few notes on this App Spec:

- Replace all lines that contain REPLACEME with the correct values
- If the domain you are hosting Capsa on is not managed by DigitalOcean, remove the `zone: yourdomain.com` line under `domains`. You can follow the instructions in DigitalOcean to connect your domain

Change the App Spec and save it under [Your Capsa Server App] > Settings > App Spec.

:::info You can encrypt secret variables
It is recommended to mark variables as encrypted when the app is running correctly. You can do this by doing to the `api` component of the app, opening the editor for environment variables, and selecting "Encrypt". This way only the app can read them, and they cannot be retrieved in the DigitalOcean panel.
:::

### Database

DigitalOcean will automatically generate a development database with the spec above. This is fine for using Capsa in a smalls setting, but it might be good to use a managed database instead, in which case you need to change the database environemnt variables to point to that database.

### Database migrations (optional)

:::info Migrations are running automatically in App Service
Under the `jobs` key, you can see the database migration job, this will run before every deploy.

If you prefer to do the database migrations manually, follow the below instructions, otherwise, skip this section.
:::

Convert the App Spec environment variables to a local yml configuration ([Server Config reference](../../configuration/server-config.md)). You can find the connection parameters for the database in the DigitalOcean app.

Use the `capsa` binary (used for private key generation) to run the migrations:

```sh
./capsa db migrate -d up
```

### Create an admin user

To create an admin user, run:

```sh
./capsa user add -e youremail -f FirstName -l LastName -r Admin
```

Don't open the email you receive just yet, we first need to set up the web app!

## Web app

Setting up the web app is more straight-forward. We don't have to generate any credentials, we only have to know the server URL. We create another App Service, called `capsa-web`, again pointing to the GitHub Container Registry, `capsa-gg/capsa-web` with tag `latest` this time.

We are using this App Spec as a template:

```yml
name: capsa-web
region: ams
alerts:
  - rule: DEPLOYMENT_FAILED
domains:
  - domain: web.demo.capsa.gg
    type: PRIMARY
    zone: capsa.gg
features:
  - buildpack-stack=ubuntu-22
ingress:
  rules:
    - component:
        name: admin
      match:
        path:
          prefix: /
services:
  - name: admin
    http_port: 3000
    instance_count: 1
    instance_size_slug: basic-xxs
    image:
      registry: capsa-gg
      registry_type: GHCR
      repository: capsa-web
      tag: latest # REPLACEME with the latest tag
    health_check:
      http_path: /api/status
    alerts:
      - operator: GREATER_THAN
        rule: CPU_UTILIZATION
        value: 75
        window: FIVE_MINUTES
      - operator: GREATER_THAN
        rule: MEM_UTILIZATION
        value: 75
        window: FIVE_MINUTES
      - operator: GREATER_THAN
        rule: RESTART_COUNT
        value: 2
        window: FIVE_MINUTES
    envs:
      - key: SERVER_URL
        scope: RUN_AND_BUILD_TIME
        value: https://api.demo.capsa.gg # REPLACEME
```

A few notes on this App Spec:

- Replace all lines that contain REPLACEME with the correct values
- If the domain you are hosting Capsa on is not managed by DigitalOcean, remove the `zone: yourdomain.com` line under `domains`. You can follow the instructions in DigitalOcean to connect your domain

Change the App Spec and save it under [Your Capsa Web App] > Settings > App Spec.

## Validate deployment

To see whether the deployment was successful, run the following commands with your domains:

- **Server**: `curl https://api.demo.capsa.gg/v1/status` and `curl https://api.demo.capsa.gg/.well-known/jwks.json`
- **Web**: `curl https://web.demo.capsa.gg/api/status`

You can now open the link in the email you have received to set up your password and continue to manage your Capsa installation from the web app.

### Connecting domains

If you are managing your domain for Capsa in DigitalOcean (the nameservers pointing to DigitalOcean), the domain will be connected automatically. Otherwise, follow the instructions shown in the DigitalOcean panel to connect your domains.

It might take a few minutes for DNS changes to resolve and TLS certificates to be added.

:::tip Need a helping hand?
If you got stuck deploying Capsa, feel free to reach out to [capsa@lucianonooijen.com](mailto:capsa@lucianonooijen.com) for support. We are happy to help you getting Capsa up and running!
:::
