---
sidebar_position: 1
---

# Capsa

> **capsa** _f_ (_genitive_ capsae); first declension
>
> 1. A box, case, holder, repository; especially a cylindrical container for books; bookcase.

_From [Wikitionary](https://en.wiktionary.org/wiki/capsa#Latin)_

---

Let's discover **Capsa in less than 5 minutes**.

When you're ready to get started, you can check out **[installing Capsa for your project](./getting-started/getting-started.md)**.

## TL;DR:

Capsa makes Unreal Engine logs great to work with. No more sharing logs in Jira, Slack or Discord, but stored in the cloud, with link sharing built-in, filtering logs, switching to server logs and much more.

As everyone knows, logs in Unreal Engine are a pain in the ~~redacted~~ to work with, especially when collaborating with a larger team. Capsa makes this part not just bearable, but a great developer experience, so you can focus on what you're best at: making games!

Capsa is made to extend Unreal Engine and does not try to replace it's functionality. The web stack is built to be cloud agnostic and can be deployed anywhere.

## Capsa features

- **Online logs**: Logs in Unreal Engine are sent automatically to the cloud
- **Open in browser**: have your browser open the log in Capsa directly from Unreal Engine
- **Filter for log lines**: hide/show only certain categories or severities
- **Link sharing**: you can share links to specific views, so others see exactly what you see
- **Title/environment management**: categorize logs in a way that makes sense
- **Linked logs**: find related logs, for example reading logs of the server you are connected to
- **Metadata**: store any metadata you want for your logs, fe. user ids or game modes
- **Dark mode support**: don't burn your eyes reading logs in the web app
- **Automatic log deletion**: set a threshold after when logs need to be removed
- **Performance**: properly written code that won't impact game performance

Oh, and every part of Capsa is open-source! So don't worry about vendor lock-ins.

### On the roadmap

- **Unified log view**: read client and server logs at the same time
- **One-click deployment**: one-click deployment to DigitalOcean apps for the web stack
- **MFA**: further secure access to the Capsa web app with multi-factor authentication
- **Log comments**: place comments on logs to add context

There is more great stuff coming later!

## Impact on game code

Capsa is made the way Unreal Engine plugins should be written: easy to add, easy to remove. So if you find out that Capsa is not for you or your team, you don't have to refactor game-code to remove it.

The plugin is mostly self-contained, add and enable the plugin, add a few options to your `.ini` configuration following the [Plugin Setup](./getting-started/unreal-engine-plugin.md), and you've got logs stored in the cloud!

Some additional features require _additions_ but not _refactors_ of game code. Adding metadata for example can be done through a single function call, and the plugin handles the rest.

## Running the Capsa web stack in the cloud

If you're building games, you don't want to spend days setting up cloud infrastructure. That is why Capsa is made to be cloud-native and super easy to set up and cheap to host. During development, you should be able to self-host Capsa for less than $50 per month.

We offer various guides for [Setting up the web stack](./getting-started/web-stack.md), to host the Capsa server and web app in a way that makes sense for your team.

## What you need to start with Capsa

We've built Capsa in a way to make it as easy as possible to set up. All you need to get started with Capsa is access to a server environment and half a day of time.

If you are using Unreal Engine and have a server to host the Capsa web stack on with permissions to add a few DNS records, you have all you need to get started with Capsa.

:::tip Need a helping hand?
If you got stuck deploying Capsa, feel free to reach out to [luciano@companiongroup.io](mailto:luciano@companiongroup.io) for support.

We are happy to help you getting Capsa up and running!
:::

## Terminology

Some important terminology used in the Capsa documentation

| Term        | Description                                                                    |
| ----------- | ------------------------------------------------------------------------------ |
| User        | Person who is allowed to log into the online environment to list and view logs |
| Admin       | Person who is allowed to manage the Capsa instance                             |
| Client      | An UnrealEngine game sending logs to Capsa                                     |
| Log         | A complete log from a client                                                   |
| Log chuck   | A part of the log sent during flushing                                         |
| Log session | Same as "Log"                                                                  |
