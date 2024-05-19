# Introduction

This repository is for Equine Castration reserarch app.

This currently consists of a .NET backend that interacts with a PostgreSQL database and React Native app.

## Getting Started

## Prerequisites

1. **.NET SDK** `8.x`
   - The backend API is .NET8
1. **Node.js** `>=16.9`
   - `16.9` and newer include **Corepack**
1. **Enable [Corepack](https://nodejs.org/api/corepack.html)**
   - Simply run `corepack enable` in your cli
1. Docker

## Database setup

The application stack interacts with a PostgreSQL Server database, and uses code-first migrations for managing the database schema.

The repository contains a `docker-compose` for the database, so just run `docker-compose up -d` to start it running.

When setting up a new environment, or running a newer version of the codebase if there have been schema changes, you need to run migrations against your database server.

The easiest way is using the dotnet cli:

1. If you haven't already, install the local Entity Framework tooling

   - Anywhere in the repo: `dotnet tool restore`

1. Navigate to the same directory as `EquineCastration.csproj`
1. Run migrations:

   - `dotnet ef database update`
   - The above runs against the default local server, using the connection string in `appsettings.Development.json`
   - You can specify a connection string with the `--connection "<connection string>"` option

## Working with JavaScript

This monorepo uses [pnpm](https://pnpm.io) workspaces to manage JS dependencies and scripts.

Basically, where you might normally use `npm` or `yarn`, please use `pnpm` commands instead.

You don't need to install anything special; Corepack will.

A brief [pnpm cheatsheet](#-pnpm-cheatsheet) is provided later in this document.

## 📁 Repository contents

Areas within this repo include:

- Application Source Code
  - .NET8 backend API `EquineCastration`
  - Azure Functions App `Functions`
  - React (Vite) frontend web app `client-app`
  - React Native frontend mobile app `react-native-app`

## Backend Configuration

Notes on configuration values that can be provided, and their defaults.

The backend app can be configured in any standard way an ASP.NET Core application can. Typically from the Azure Portal (Environment variables) or an `appsettings.json`.

```yaml
OutboundEmail:
  ServiceName: Equine Castratin
  FromName: No Reply
  FromAddress: noreply@example.com
  ReplyToAddress: ""
  Provider: local

  # If Provider == "local"
  LocalPath: /temp

  # If Provider == "sendgrid"
  SendGridApiKey: ""

  # If Provider == "smtp"
  SmtpHost: "" # SMTP host name
  SmtpPort: # SMTP port
  SmtpUsername: "" # SMTP username
  SmtpPassword: "" # SMTP password
  SmtpSecureSocketEnum: # for example, assign 2 to implement SslOnConnect
  # Secure socket options
  # 1 - Auto
  # 2 - SslOnConnect
  # 3 - StartTls
  # 4 - StartTlsWhenAvailable

  # More information can be found here
  # http://www.mimekit.net/docs/html/T_MailKit_Security_SecureSocketOptions.htm

Registration:
  UseRules: # Bool. If set to 'true', the registration rules is applied.

# URL to download app from app store.
AppDownloadUrl:
  Android: ""
  iOS: ""

AppRequestHeader:
  CheckHeader: # Boolean. If set to 'true', the backend checks the request header for a specific app identifier during API calls that originate from a different host. This is to restrict API calls to either the mobile app or the same host where the backend is deployed.
  Name: "" # The name of the request header to check, e.g. 'X-App-Identifier'.
  Value: "" # The expected value of the header. Incoming requests must have this value in the specified header to be accepted.

Worker:
  ApiKey: "" # The unique key used to authenticate the worker.
```
