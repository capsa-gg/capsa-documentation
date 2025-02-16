---
slug: announcing-capsa
title: Announcing Capsa v0.1
authors: [luciano, mark]
tags: [release]
---

Working with Unreal Engine logs has always been a challenge for developers, especially for multiplayer games. Often, logs are shared through Slack, Discord or uploaded to Jira and downloaded locally to manually correlate client and server logs to try and see where things went wrong. This is a very cumbersome and frustrating process for developers.

**Capsa is here to change that.**

Capsa is an open-source cloud logging solution built to seamlessly integrate with Unreal Engine. It automatically collects logs from your game and makes them accessible in a structured, searchable, and shareable way. No more digging through local log files; just open your browser and get the insights you need.

<!-- truncate -->

To read more about why we built Capsa, read [Why we built Capsa](../2025-02-15-why-we-built-capsa/index.md).

## What makes Capsa great

- **Logs with syntax highlighting and sharable links**: find what you need and share a direct link
- **Filter, search, and link logs**: Filter by log category or severity to only see the logs you need
- **Merged client-server logs**: with just a few click read client-server interactions
- **Easy-to-use management**: manage titles, environments and users in the web panel
- **Minimal setup, no code changes**: works out of the box without game code impact
- **Cloud-native, so host anywhere**: deploy in a way that makes sense for your organization
- **Optimized for performance**: little impact on game performance and no huge cloud bills
- **Open-source**: web stack AGPL3.0 and UE plugin MIT licenced, so no vendor lock-in
- **Dark-mode support**: don't burn your eyes by enabling dark-mode in the web panel

## Built for Unreal Engine

Capsa extends rather than replaces Unreal Engine functionality so you don't have to replace any `UE_LOG` calls with Capsa code. The plugin integrates smoothly into your Unreal Engine game, with minimal configuration and no game code changes needed to work. Capsa does not require any engine changes to work.

## See Capsa in action

TODO: add video

## Try Capsa Today

Capsa v0.1 is now available. We’d love your feedback—whether you’ve tried it or just have thoughts on the concept.

- **Docs & Setup**: [capsa.gg](https://capsa.gg/docs/getting-started/)
- **GitHub**: [github.com/capsa-gg/capsa](https://github.com/capsa-gg/capsa)
- **Video guides for setup**: TODO: setup and usage guide videos
- **Integration demo game**: TODO: demo game integrated with Capsa
- **Feedback & Questions**: Email [luciano@companiongroup.io](mailto:luciano@companiongroup.io)

If this sounds useful, give the repo a ⭐ on GitHub and let us know what you think!
