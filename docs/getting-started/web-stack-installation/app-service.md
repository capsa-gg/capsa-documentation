---
sidebar_position: 1
---

# App Service deployment

The App Service deployment is the most straight-forward way of deploying Capsa. Therefore, it is the recommended approach for deploying Capsa in the cloud.

App Services allow you to deploy Docker images to a container, without the hassle of managing servers yourself, or messing with Kubernetes configurations.

:::tip You can also run the Docker images yourself
If you are not using a cloud provider, or your cloud provider's App Service is less straight-forward, or if you simply prefer to run the Docker containers on your own server, you can run the Docker images in Docker.

When deploying with Docker, simply make sure that the proper environment variables are set, setting `-p 8080:8080` for server and `-p 3000:3000` for the web app, with a reverse proxy for enabling TLS and outside traffic on the HTTP(S) ports.
:::
