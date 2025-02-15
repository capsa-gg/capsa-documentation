---
sidebar_position: 1
---

# Plugin configuration

The configuration options of the Unreal Engine plugin. All options can be overwritten based on the environment and build target.

| Field                        | Required | Default                       | Description                                                                                                   |
| ---------------------------- | -------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| CapsaServerURL               | x        |                               | The URL where the log server is hosted                                                                        |
| CapsaEnvironmentKey          | x        |                               | Token used by the log server to identify the game title and environment                                       |
| Protocol                     |          | https                         | Protocol to use to connect to the Capsa API server                                                            |
| LogTickRate                  |          | 1 second                      | Tick rate for saving buffered lines to the core subsystem, `GLog->AddOutputDevice` not called if value `<=` 0 |
| MaxTimeBetweenLogFlushes     |          | 5/10 minutes                  | Maximum time between log flushes, default 10 minutes for editor builds, 5 minutes for other builds            |
| MaxLogLinesBetweenLogFlushes |          | 1000                          | Maximum amount of lines between log flushes                                                                   |
| bUseCompression              |          | true                          | Use compression when sending logs to the API server                                                           |
| bWriteToDiskPlain            |          | true                          | Save logs to disk in plain text                                                                               |
| bWriteToDiskCompressed       |          | false                         | Save logs to disk compressed                                                                                  |
| bAutoAddCapsaComponent       |          | true                          | Attach a replicated component to link client/server logs                                                      |
| AutoAddClass                 |          | `APlayerState::StaticClass()` | Class to use to attach `CapsaComponent` to                                                                    |

## Configurations

The configuration can be set in the `DefaultEngine.ini` file.

### Recommended configuration

The recommended configuration, with the `CapsaServerURL` and `CapsaEnvironmentKey` replaced.

```ini
[/Script/CapsaCore.CapsaSettings]
CapsaServerURL=localhost:5000
Protocol=https
CapsaEnvironmentKey=00000000-0000-0000-0000-0000
bUseCompression=True
bWriteToDiskPlain=False
bWriteToDiskCompressed=False
```

### Development config

Configuration that can be used for Capsa development for testing Capsa internals:

```ini
[/Script/CapsaCore.CapsaSettings]
CapsaServerURL=localhost:5000
Protocol=http
CapsaEnvironmentKey=00000000-0000-0000-0000-0000
bUseCompression=True
bWriteToDiskPlain=True
bWriteToDiskCompressed=True
```

## Enabling verbose logging
