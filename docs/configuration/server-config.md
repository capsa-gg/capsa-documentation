---
sidebar_position: 2
---

# Server configuration

The configuration options of the Log Server, these can be set in a config.yml file or with environment variables.

:::info Using environment variables?
The `Field` in the table below is used for configuring the server application using `config.yml`. If you are using environment variables, change the name of the `Field` into uppercase (`api_port` to `API_PORT`) and store all values as strings.
:::

## Required fields

All of the fields are required, unless stated in the description

| Field                  | Example                  | Description                                                                     |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------------- |
| development            | false                    | Enable development mode, recommended to be off                                  |
| api_port               | 5000                     | Port to run the REST API on, guides use port 5000                               |
| api_protocol           | https                    | The protocol that the webapp runs on, should be https in production             |
| api_hostname           | api.demo.capsa.gg        | The hostname that the server runs on, http/https prefix will be stripped        |
| webapp_hostname        | web.demo.capsa.gg        | The hostname that the webapp runs on, for generating email links, without https |
| jwk_private_key_path   | jwk.key                  | Path to signing private key, must be set if jwk_private_key_base64 is empty     |
| jwk_private_key_base64 | `cat jwk.key \| base64`  | Private key in base64, must be set if jwk_private_key_path is empty             |
| db_host                | localhost                | Database hostname                                                               |
| db_port                | 5432                     | Database port                                                                   |
| db_name                | capsadb                  | Database name                                                                   |
| db_user                | capsauser                | Database user                                                                   |
| db_pass                | -                        | Database password for user                                                      |
| db_ssl                 | false                    | Indicate if ssl should be used when connecting to the database                  |
| blobstorage_endpoint   | https://ams3.example.com | Endpoint for S3-compatible blob storage, used for storing log chunks            |
| blobstorage_region     | ams3                     | Reguion for blob storage                                                        |
| blobstorage_key        | -                        | Key for accessing blob storage                                                  |
| blobstorage_secret     | -                        | Secret for accessing blob storage                                               |
| blobstorage_bucket     | capsa-chunks             | Bucket name to store log chunks in                                              |
| email_sender_name      | Capsa Logserver          | The 'From' name for sent emails                                                 |
| email_sender_email     | no-reply@capsa.gg        | The 'From' email address for sent emails                                        |
| brevo_api_key          | -                        | The API key from Brevo to send transactional emails                             |
| log_retention_days     | 30                       | Amount of days after which logs should be deleted                               |
| log_max_duration_hours | 48                       | Max log session duration (should be less than max dedicated server lifetime)    |

Note: you should either set `jwk_private_key_path` or `jwk_private_key_base64`, the server will not start if you set neither or both.

## Optional fields

These fields can be set, but are not required to run the application.

| Field      | Example | Description                                                           |
| ---------- | ------- | --------------------------------------------------------------------- |
| sentry_dsn | -       | Optional Sentry DNS, if this value is set, Sentry will be initialized |

## Example yaml

```yml
# Application configuration
development: true
api_port: 5000
api_protocol: https
api_hostname: api.demo.capsa.gg
webapp_hostname: https://web.demo.capsa.gg

# JWK
jwk_private_key_path: jwk.key
# jwt_private_key_base64: TmljZSB0cnksIHNraWRkeQo= # Commented out as we are using the path

# Database configuration - local
db_host: localhost
db_port: 5433
db_name: capsadb
db_user: capsauser
db_pass: capsapass
db_ssl: false

# Blob storage
blobstorage_endpoint: ams3.digitaloceanspaces.com
blobstorage_region: ams3
blobstorage_key: <omitted>
blobstorage_secret: <omitted>
blobstorage_bucket: capsa-storage

# Email configuration
email_sender_name: Capsa
email_sender_email: no-reply@capsa.gg
brevo_api_key: <omitted>

#Application logic configuration
log_retention_days: 30
log_max_duration_hours: 48
```

## Example .env

```dotenv
# Application configuration
DEVELOPMENT=true
API_PORT=5000
API_PROTOCOL=http
API_HOSTNAME=https://api.capsa.dev/
WEBAPP_HOSTNAME=localhost:3000

# JWK
# JWK_PRIVATE_KEY_PATH=jwk.key # Commented out, we are using the base64 value
JWT_PRIVATE_KEY_BASE64=TmljZSB0cnksIHNraWRkeQo=

# Database configuration - local
DB_HOST=localhost
DB_PORT=5433
DB_NAME=capsadb
DB_USER=capsauser
DB_PASS=capsapass
DB_SSL=false

# Blob storage
BLOBSTORAGE_ENDPOINT=ams3.digitaloceanspaces.com
BLOBSTORAGE_REGION=ams3
BLOBSTORAGE_KEY=<omitted>
BLOBSTORAGE_SECRET=<omitted>
BLOBSTORAGE_BUCKET=capsa-storage

# Email configuration
EMAIL_SENDER_NAME=Capsa
EMAIL_SENDER_EMAIL=no-reply@capsa.gg
BREVO_API_KEY=<omitted>

# Application logic configuration
LOG_RETENTION_DAYS=30
LOG_MAX_DURATION_HOURS=48

```
