---
sidebar_position: 3
---

# Kubernetes deployment

This guide will help you set up Capsa in a production environment using Kubernetes.

:::warning Are you sure you want to use Kubernetes?
This is not a general guide to setting up or managing Kubernetes. Every cloud provider has a slightly different way of setting up traffic from and to the cluster. Consult your cloud vendor's documentation about specifics and use this guide for the Capsa-specific details.

We advice you to only use Kubernetes for hosting Capsa if you are already running multiple services in Kubernetes in production and feel confident owning the deployed Capsa cluster.
:::

## Requirements

Please make sure you have the following configured:

- `kubectl` installed on your machine with the `current-context` pointing to the cluster you want to deploy to
- The [capsa web stack repository](https://github.com/capsa-gg/capsa) cloned to disk, a tagged release is recommended
- A private/public keyset as described in [Generating Keypair](../web-stack.md#generating-publicprivate-keypair)

## Preparation

Create new namespace for Capsa, this guide assumes that the namespace you want to deploy to is `capsa`.

```sh
kubectl create namespace capsa
```

:::info Self-managed Kubernetes TLS
If you are not relying on a cloud vendor for incoming traffic and want to enable TLS, please [install cert-manager](https://cert-manager.io/docs/installation/).
:::

_Change your directory with `cd deployment/helm/capsa`, which is used for the rest of this guide_

## Setting environment variables

Run `cp values.yaml values.prod.yaml` to copy the values file to a file that can be edited, and is gitignored. Now change the environment variables in `values.prod.yaml` to the correct values as described in.

:::danger Take proper care of your secrets
Do not commit these changes to your repository, even if the repository is private. Secrets should never be checked into version control.
:::

## Database migrations

Before we can run the application, we need to run the database migrations.

:::info Run migrations when updating Capsa
Whenever you are updating Capsa, make sure to also run the database migrations.
:::

Migrate the database to the latest version by running the `capsa-server` image with the environment variables available nad performing the following command:

```sh
./capsa db migrate -d up
```

This should give log output with `database migrated successfully`.

You can automate this command to run on each deployment if you prefer.

## Allowing outside traffic

Please add a load balancer or ingress that allows outside traffic to access the services on the hostnames specified in your `values.prod.yaml` file.

:::info The Capsa Helm Chart is not complete
Due to variances with different cloud vendors, the Helm charts provided do not have an ingress or load balancer configured.

Please add the required resources yourself according to the documentation of your cloud vendor and your setup.
:::

## Validate the configuration

To check whether everything is ready for deployment, run

```sh
helm lint -f values.prod.yaml -n capsa
```

You can further inspect your configuration by running

```sh
helm template capsa . -f values.prod.yaml -n capsa
```

## Apply the configuration

To deploy the Helm chart to Kubernetes, run:

```sh
helm install capsa . -n capsa -f values.prod.yaml
```

## Validate deployment

To see whether the deployment was successful, run:

- **Server**: `curl https://<apihostname>/v1/status` and `curl https://<apihostname>/.well-known/jwks.json`
- **Web**: `curl https://<webhostname>/auth/login`

## Create your admin user

You can create the first admin user by running the `capsa-server` image with the environment variables available nad performing the following command:

```sh
./capsa user add -e youremail -f FirstName -l LastName
```

TODO: admin permissions

If the mailing provider is set up correctly, you will receive a link to set up a password. In the web app you can add additional user accounts and configure titles and environments.

## Capsa is installed

Congratulations! Capsa is now set up and running correctly!
