---
sidebar_position: 5
---

# Unreal Engine plugin setup

The Capsa plugin works with Unreal Engine 5.4 and later and works with the engine built from source as well as the precompiled engine, though the source-engine is necessary to make dedicated server builds.

## Prerequisites

- Capsa web stack deployed (`CapsaServerURL`)
- Capsa Environment Key (`CapsaEnvironmentKey`)

## Adding the plugin to your game

To add the plugin to your game, check which version your Capsa web stack is running (this is shown in the bottom left of the web panel), download the corresponding plugin version from [here](https://github.com/capsa-gg/capsa-plugin-unreal-engine/tags).

When you have the .zip file, extract this into a newly created `.\Plugins\Capsa` directory.

After you have added the plugin files, compile and launch the editor, then enable the plugin. You can now start configuring the plugin.

## Configuring the plugin

The plugin must be configured to point to your Capsa API server to store the logs. You can configure the plugins either in the Unreal Editor, or in the .ini files directly.

Regardless of which method you choose, you will need at least the `CapsaServerURL` and `CapsaEnvironmentKey` set to get the Capsa plugin to work, as documented in [Plugin Configuration](../configuration/plugin-config.md).

After adding the Capsa plugin configuration, make sure to commit the plugin files, as well as the configuration files, to version control.

### Unreal Editor

Compile and launch the editor after you have added the plugin files.

Go to `ProjectSettings`->`Engine`->`Capsa Settings`. In here you can configure the plugin. After making changes, you might have to restart the editor for the changes to take effect.

### DefaultEngine configuration file

You can manually add the configuration in the `DefaultEngine.ini` file, as documented in [Plugin Configuration](../configuration/plugin-config.md).

We recommend the following settings as a starting point:

```ini
[/Script/CapsaCore.CapsaSettings]
CapsaServerURL=<your Capsa API server, without the protocol prefix>
Protocol=https
CapsaEnvironmentKey=<your default Capsa environment key>
bUseCompression=True
bWriteToDiskPlain=False
bWriteToDiskCompressed=False
```

After setting the correct configuration, compile your project.

### Overriding environment variables

In case your setup requires overwrites of certain configuration values for different build types, there are several options. You can add configuration files that override the base config, as explained [here](https://dev.epicgames.com/documentation/en-us/unreal-engine/configuration-files-in-unreal-engine#configurationfilehierarchy) in the Unreal Engine documentation, but this might not be the best fit for your use case.

Alternatively, with some engine changes as documented in [this article](https://medium.com/disruptivegames/config-injection-during-unreal-engine-4-builds-87e02b7ecc09), you can use UAT ini-overrides. Overrides take the form of `-ini:Engine:[SettingsKey]:Variable=Value`. You can then add these override arguments into your build scripts or CI-configuration.

In the future, we might add other ways to override the environment variables to make this process easier.

## Configuring logging verbosity

If, for debugging purposes, you desire to have more verbose logging for certain categories, this can be done in the `DefaultEngine.ini` file, under the `[Core.Log]` section. For example:

```ini
[Core.Log]
LogNet=Verbose
LogInit=All
LogConfig=Verbose
PIE=Verbose
Cmd=All
```

These are examples of build-in log categories, but you can also use your custom categories. For example, to enable all logs for Capsa, we use the following for development:

```ini
; This is used for Capsa plugin development
LogCapsaCore=All
LogCapsaLog=All
```

## Enabling Capsa in Shipping

Enabling logging in Shipping comes with risks, it is recommended you research and understand these risks before enabling logging in Shipping builds. There is no guarantee this will work flawlessly or require additional steps as things could be differently set up in your game.

To enable logging in shipping builds, you need to modify your projects `<ProjectName>.target.cs` file.

In the constructor add:

```c#
bUseLoggingInShipping = true;
```

Additionally, if building from source, also add:

```c#
BuildEnvironment = TargetBuildEnvironment.Unique
```

Or if building from precompiled binaries, add:

```c#
bOverrideBuildEnvironment = true;
```

After adding this, make sure to set the `WITH_CAPSA_LOG_ENABLED` definition to `1` in your project, using either 

```cs
GlobalDefinitions.Add("WITH_CAPSA_LOG_ENABLED=1");
``` 

or by changing the source code of the plugin from 

```cpp
#ifndef WITH_CAPSA_LOG_ENABLED
#define WITH_CAPSA_LOG_ENABLED !(UE_BUILD_SHIPPING || UE_BUILD_TEST)
#endif
```

to 

```cpp
#ifndef WITH_CAPSA_LOG_ENABLED
#define WITH_CAPSA_LOG_ENABLED 1
#endif
```

## Ready for use!

The Capsa plugin is now configured! In the sidebar, under "Using Capsa" you can find various guides for using the plugin with Unreal Engine, like [Linking logs](../using-capsa/linking-logs.md), [Adding metadata](../using-capsa/adding-metadata.md) and [Integrating plugin](../using-capsa/integrating-plugin.md).
