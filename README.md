# Introduction

This repository is for Equine Castration app.

This currently consists of a .NET backend that interacts with a PostgreSQL database and React Native app.

## Getting Started

## Prerequisites

1. **.NET SDK** `8.x`
   - The backend API is .NET8
1. **Node.js** `>=16.9`
   - `16.9` and newer include **Corepack**
1. **Enable [Corepack](https://nodejs.org/api/corepack.html)**
   - Simply run `corepack enable` in your cli
1. [Set up development environment](https://docs.expo.dev/guides/local-app-development/#android) for React Native
   - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
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
  - .NET8 backend API
  - React (Vite) frontend web app
  - React Native frontend mobile app

## App Configuration

The react native app can be configured in any standard way a Node application can. Once can configure it locally with `.env.development.local`.

```bash
LOCAL_PUBLIC_API=http://localhost:5735
```

Note: To enable interaction between a React Native app on an Android emulator/virtual device and a backend in a local dev environment, execute `adb reverse tcp:[port] tcp:[port]`. Ensure that the port matches the port where the local backend is running.
