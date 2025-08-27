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
- **Filter, search, and link logs**: filter by log category or severity to only see the logs you need
- **Merged client-server logs**: out-of-the-box client/server linked logs
- **Easy-to-use management**: manage titles, environments and users in the web panel
- **Minimal setup, no code changes**: works out of the box without game code impact
- **Cloud-native, so host anywhere**: start in the morning and have Capsa ready to use before lunch
- **Optimized for performance**: little impact on game performance and no huge cloud bills
- **Open-source**: web stack AGPL3.0 and UE plugin MIT licenced, so no vendor lock-in
- **Dark-mode support**: don't burn your eyes by enabling dark-mode in the web panel

## Built for Unreal Engine

Capsa extends rather than replaces Unreal Engine functionality so you don't have to replace any `UE_LOG` calls with Capsa code. The plugin integrates smoothly into your Unreal Engine game, with minimal configuration and no game code changes needed to work. Capsa does not require any engine changes to work.

## See Capsa in action

<iframe width="560" height="315" src="https://www.youtube.com/embed/hmLBERUPXJk?si=wrK4hzr-WXeAqWIW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Try Capsa Today

Capsa v0.1 is now available. We’d love your feedback—whether you’ve tried it or just have thoughts on the concept.

- **Docs & Setup**: [capsa.gg](https://capsa.gg/docs/getting-started/)
- **GitHub**: [github.com/capsa-gg](https://github.com/capsa-gg)
- **Video guides for setup**: [YouTube Playlist](https://youtube.com/playlist?list=PL9RL1sP7V5kYQ_gtJaBacAklts1p_lIk_&si=kUWiI_kyQZfWGIkJ)
- **Feedback & Questions**: [capsa@lucianonooijen.com](mailto:capsa@lucianonooijen.com)

If this sounds useful, give the repo a ⭐ on GitHub and let us know what you think!
