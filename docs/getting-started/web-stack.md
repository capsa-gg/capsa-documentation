---
sidebar_position: 3
---

# Installing the Web Stack

Capsa is built on top of cloud-native technologies.

Therefore, Capsa can be deployed in many different ways.

Often the easiest route is relying on a cloud vendor's App Service, where you can deploy a Docker image easily without hassle.

The Capsa documentation covers three different routes:

1. Installation using an [App Service](./web-stack-installation/app-service.md) (_recommended_)
2. Installation from scratch on a [Linux server](./web-stack-installation/linux.md)
3. Installation using [Kubernetes](./web-stack-installation/kubernetes.md)

These can be found in the sidebar.

:::tip Got stuck?
If you got stuck deploying Capsa, feel free to reach out to [luciano@companiongroup.io](mailto:luciano@companiongroup.io) for support. We are happy to help you getting Capsa up and running!
:::

## Generating public/private keypair

Capsa uses a private/public keypair to generate the JWTs forr both the Unreal Engine client and the users of the Web panel.

Before starting your installation, make sure you generate these keys.

You can use any tool to generate a RSA keyset, preferably with 4096 bits, though this has been built into the Capsa server binary as well.

First, download the server binary from the [Releases](https://github.com/capsa-gg/capsa/releases) on Github. Extract the zip file.

Verify with

```sh
./path_to_capsa version
```

Which should print the current version. Generating the keys can be done with the following command:

```
./path_to_capsa jwk generate-keyset
```

To save the files to disk, run the same command, but with the `-w` flag. You should now have `jwk.key` and `jwk.pub` for the private and public key respectively stored to disk.

:::warning These are sensitive files
Make sure to keep these files safe, preferably deleting them after deployment. Do not share them as plain text. These keys are used to generate authentication tokens.
:::

## Obtaining API Keys

For transactional emails, Capsa uses Brevo. The free tier allows up to 300 emails per day, which should be sufficient for most installations of Capsa.

:::info Verify your Brevo account
After creating an account, you have to verify your domain before you can send emails from Brevo.
:::

For storing log chunks, you can use any S3-compatible storage provider, as long as you have the following credentials:

```yaml
blobstorage_endpoint: string
blobstorage_region: string
blobstorage_key: string
blobstorage_secret: string
blobstorage_bucket: string
```

## Notes

- The web app and API server should be running on different hostnames. We suggest using api.domain.tld and web.domain.tld.
- Because the web app caches the JWK from the API server, make sure the API server is deployed first before deploying the web panel.
