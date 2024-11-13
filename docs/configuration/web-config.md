---
sidebar_position: 2
---

# Web stack configuration

TODO: Update

## Server configuration

The configuration options of the Log Server, these can be set in a config.yml file or with environment variables

## General

| Field              | Example                 | Description                                                    |
| ------------------ | ----------------------- | -------------------------------------------------------------- |
| development        | false                   | Enable development mode                                        |
| api_port           | 5000                    | Port to run the REST API on                                    |
| api_hostname       | http://localhost:5000   | The hostname that the server runs on                           |
| webapp_hostname    | http://localhost:3000   | The hostname that the webapp runs on                           |
| jwt_secret_unreal  | very_secret             | Value used to sign JWTs for log clients                        |
| jwt_secret_web     | very_secret             | Value used to sign JWTs for web panel                          |
| db_host            | localhost               | Database hostname                                              |
| db_port            | 5432                    | Database port                                                  |
| db_name            | capsadb                 | Database name                                                  |
| db_user            | capsauser               | Database user                                                  |
| db_pass            | capsapass               | Database password for user                                     |
| db_ssl             | false                   | Indicate if ssl should be used when connecting to the database |
| email_sender_name  | Capsa Logserver         | The 'From' name for sent emails                                |
| email_sender_email | capsa@companiongroup.io | The 'From' email address for sent emails                       |
| sendinblue_api_key | -                       | The API key from SendInBlue to send transactional emails       |

Reference: https://github.com/lucianonooijen/genesis/blob/master/server/config.example.yml

## Application specific

| Field                  | Example | Description                                                                                                                                                                        |
| ---------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| log_retention_days     | 30      | Amount of days logs should be retained                                                                                                                                             |
| log_max_duration_hours | 48      | Set for how long a single log session can persist, will be used to set the duration of tokens for logging tokens, this should be longer than the maximum dedicated server duration |

## TODO

- Support JWKs instead of regular JWTs
- Determine whether v0.1 release will be have support for multiple clouds/mailers
