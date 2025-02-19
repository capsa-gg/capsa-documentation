---
sidebar_position: 3
---

# Web app configuration

_This page contains documentation about configuration options, to read the installation guide, click [here](../getting-started/getting-started.md)_

The configuration options of the Capsa Web App, these should be added as environment variables.

## Required fields

Without the required fields, the web app will not run.

| Field      | Example                   | Description                          |
| ---------- | ------------------------- | ------------------------------------ |
| SERVER_URL | https://api.demo.capsa.gg | The hostname that the server runs on |

## Optional fields

These fields can be left empty.

These fields can be set, but are not required to run the application.

| Field             | Example | Description                                                           |
| ----------------- | ------- | --------------------------------------------------------------------- |
| SENTRY_DSN        | -       | Optional Sentry DNS, if this value is set, Sentry will be initialized |
| SENTRY_AUTH_TOKEN | -       | Token that Sentry uses to upload source maps in CI pipelines          |
| SENTRY_ORG        | -       | Sentry organisation                                                   |
| SENTRY_PROJECT    | -       | Sentry project                                                        |

Note: Sentry is used internally for developing and testing Capsa, but not enabled in builds. If you wish to enable Sentry logging errors to your own Sentry setup you can do so, but there is no requirement for it.
