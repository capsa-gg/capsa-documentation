---
sidebar_position: 1
---

# Plugin configuration

TODO: Update

The configuration options of the Unreal Engine plugin. All options can be overwritten based on the environment and build target.

| Field                 | Required | Default     | Description                                                                   |
| --------------------- | -------- | ----------- | ----------------------------------------------------------------------------- |
| LogEnableUploads      |          | true        | Allows disabling log uploads on certain platforms                             |
| LogServerUrl          | x        |             | The URL where the log server is hosted                                        |
| LogServerToken        | x        |             | Token used by the log server to identify the game title and environment       |
| FlushLogLineThreshold |          | tbd         | The amount of log lines collected before triggering a flush                   |
| FlushTimeThresholdSec |          | tbd         | The amount of time before triggering a flush                                  |
| MinimumLogSeverity    |          | VeryVerbose | Configuring the minimum log level, any log lines under this will be discarded |
|                       |          |             |                                                                               |
