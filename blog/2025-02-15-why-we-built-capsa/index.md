---
slug: why-we-built-capsa
title: Why we built Capsa
authors: [luciano]
tags: [development]
---

Let's start by saying that Unreal Engine is a great tool that can be used to build great games, from indie to AAA. No wonder it's so widely used for such a wide variety of games (as well as for television and movies, it's even used by some government agencies).

With our dayjobs, our focus is on the multiplayer/online aspects of game development. And although Unreal Engine is great to work with, we have noticed a few shortcomings in tooling.

One of these shortcomings has to do with logging. Collaborating effectively on bugs or issues arising duing playtests can be a very big challenge. The most common way to address these issues is to share log files in chats or in project management software. The larger a team is, the greater these challenges are.

<!-- truncate -->

## Existing tools

There are various tools available for crash reporting and error handling, which will all help, but if you're trying to find the cause of a bug, you often don't have a crash report available and you need to work with the log files you download from project management or chat software. If you work with playtesters, they'll have to manually send these files to you and if it's a client/server bug, you'll be digging through two very long files side by side, which is not a lot of fun.

Some AAA studio's working with Unreal Engine might have an integrated solution for this made in-house, but for most games, you'll still have to rely on working your way through the log files, if you have them, or try and replicate the bug to see what the log output might have been. Cumbersome, to say the least.

With most types of software development, logging tools are readily available but when we were looking for a similar solution for Unreal Engine, we couldn't find anything that would work. Some remote logging or log viewer plugins are available, but there were no complete solutions to be found.

## Building Capsa

With the knowledge that we with our dayjobs need a solution for this and that it can improve the workflows of other teams as well, we decided to build something ourselves. With several of our colleages having experience in web development, it was a great fit to build a solution like this.

Capsa is this solution. So in short, Capsa is a result of "scratching our own itch".

## Open-source

We know this is a solution we need but we also wanted to make Capsa available for others to use without requiring tons of changes to the game code or a lot of maintenance overhead. It might have been possible to build a SaaS-offering out of Capsa, but this is not the direction we wanted to take, so we have chosen a copyleft open-source licence instead. The web-stack is AGPL-3.0 licenced. The Unreal Engine plugin does have a permissive MIT-license, so you can incorporate it into your game without any licencing issues.

By choosing this approach to licencing, everyone can use Capsa however they like, make changes if they want to, but the product cannot be incorporated into a proprietary offering without sharing the changes made back to the other users of Capsa.

We will continue to add features to Capsa when we feel like we need them, and these features will be publically available as well. We have some ideas about new features that would make Capsa even more useful, so stay tuned for that.

![Capsa Logo](../logo-by.png)
