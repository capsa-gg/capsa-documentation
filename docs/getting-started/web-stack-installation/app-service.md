---
sidebar_position: 1
---

# App Service deployment

TODO: Write

:::tip You can also run the Docker images yourself
If you are not using a cloud provider, or your cloud provider's App Service is less straight-forward, or if you simply prefer to run the Docker containers on your own server, you can run the Docker images in Docker.

When deploying with Docker, simply make sure that the proper environment variables are set, setting `-p 8080:8080` for server and `-p 3000:3000` for the web app, with a reverse proxy for enabling TLS and outside traffic on the HTTP(S) ports.
:::
