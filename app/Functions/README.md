# Equine Castration Owner Survey function app

This project contains the Azure functions for Equine Castration

Currently, these are:

- `SendSurveyNotification`

## `SendSurveyNotification`

This job runs once a day at 11am in order to check which non deceased cases are due an owner survey.
This is done by iterating through every case, taking the discharge date and adding on the number of days provided by each survey type.
If the current date matches the sum of the days and discharge date, then we send an email to the owner of the horse.

## Development

### Prerequisites

- Docker
- .NET SDK `8.x`

### Running the functions

Your IDE should recognise the functions, and be able to run them.

If you're using the command line, run `func start`.

## Configuration

The following values are needed to configure the application, in Azure Portal these are the environment variables.
In local development a `local.settings.json` file is required, with the following values.

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated"
  },
  "Backend": {
    "ApiUrl": "http://localhost:5735/api/"
  },
  "ConnectionStrings": {
    "Default": "Host=localhost;Username=postgres;Port=5432;Password=example;Database=equine-castration"
  }
}
```
