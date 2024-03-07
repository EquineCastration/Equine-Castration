# Equine Castration Owner Survey function app

This project contains the Azure functions for Equine Castration

Currently, these are:

- `SendSurveyNotification`

## `SendSurveyNotification`

This job runs once a day in order to check which non deceased cases are due an owner survey.
This is done by iterating through every case, taking the discharge date and adding on the number of days provided by each survey type.
If the current date matches the sum of the days and disharge date, then we send an email to the owner of the horse.

## Development

### Prerequisites

- Docker
- .NET SDK `8.x`

### Running the functions

Run the Azurite from the repo root docker-compose: `docker-compose up -d`

Your IDE should recognise the functions, and be able to run them.

If you're using the command line, run `func start`.

## Configuration

The following values are needed to configure the application, in Azure Portal these are the environment variables.
In local development a `local.settings.json` file is required, with the following values.

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "AzureWebJobsEnv": "Development"
    },
     "ConnectionStrings": {
        "postgres": "Host=localhost;Username=postgres;Port=5432;Password=example;Database=equine-castration"
    }
}
```
