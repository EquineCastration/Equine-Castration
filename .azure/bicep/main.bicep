// This deploys an entire environment stack
// It reuses some shared resources within a resource group (e.g. prod / non-prod)
// and then deploys and configures environment specific resources
// based on parameters passed through
// for a given service and environment combination (e.g. equinecastration dev)

// this module creates all equinecastration resource except:
// - postgres db

import { referenceSecret } from 'br/DrsUtils:functions:v1'
import { ConnectionStringDictionary } from 'br/DrsUtils:types:v1'

type ServiceNames = 'equinecastration'
param serviceName ServiceNames

type Environments = 'dev' | 'qa' | 'uat' | 'prod'
param env Environments

param backendAppName string = '${env}-${serviceName}-api'
param backendAppSettings object = {}

param workerAppName string = '${env}-${serviceName}-worker'
param workerAppSettings object = {}

param keyVaultName string = '${serviceName}-${env}-kv'

param location string = resourceGroup().location

param sharedEnv string = 'shared'
var sharedPrefix = serviceName

param appServicePlanSku string = 'B1'

// Shared Resources
// ensure they are present,
// even though they might be there
// due to sharing with other environments

// log analytics workspace
module la 'br/DrsComponents:log-analytics-workspace:v1' = {
  name: 'la-ws-${uniqueString(sharedPrefix)}'
  params: {
    location: location
    logAnalyticsWorkspaceName: '${sharedPrefix}-la-ws'
    tags: {
      ServiceScope: serviceName
      Environment: sharedEnv
    }
  }
}

// App Service Plan
module asp 'br/DrsComponents:app-service-plan:v1' = {
  name: 'asp'
  params: {
    location: location
    aspName: '${sharedPrefix}-asp'
    sku: appServicePlanSku
    tags: {
      ServiceScope: serviceName
      Environment: sharedEnv
    }
  }
}

// Per Environment Resources

// Environment Key Vault pre-existing and populated
resource kv 'Microsoft.KeyVault/vaults@2019-09-01' existing = {
  name: keyVaultName
}

// Create a storage account for worker operations
// And add its connection string to keyvault :)
// Blob and Queue reads/writes/triggers use this account
module workerStorage 'br/DrsComponents:storage-account:v1' = {
  name: 'storage-${uniqueString(workerAppName)}'
  params: {
    location: location
    baseAccountName: 'worker'
    keyVaultName: kv.name
    uniqueStringSource: workerAppName
    tags: {
      ServiceScope: serviceName
      Environment: env
    }
  }
}


// Create the Backend App and related bits
// App Insights
// App Service
// Hostnames
module backend 'br/DrsComponents:app-service:v1' = {
  name: 'backend-${uniqueString(backendAppName)}'
  params: {
    location: location
    appName: backendAppName
    aspName: asp.outputs.name
    logAnalyticsWorkspaceName: la.outputs.name
    tags: {
      ServiceScope: serviceName
      Environment: env
    }
  }
}
// Create the Worker App and related bits
// App Insights
// App Service
// Hostnames
module worker 'br/DrsComponents:app-service:v1' = {
  name: 'worker-${uniqueString(workerAppName)}'
  params: {
    location: location
    appName: workerAppName
    aspName: asp.outputs.name
    appServiceKind: 'Linux Function App'
    logAnalyticsWorkspaceName: la.outputs.name
    tags: {
      ServiceScope: serviceName
      Environment: env
    }
  }
}

// Grant frontend Key Vault access
module frontendKvAccess 'br/DrsConfig:keyvault-access:v2' = {
  name: 'kvAccess-${uniqueString(frontend.name)}'
  params: {
    keyVaultName: kv.name
    principalId: frontend.outputs.identity.principalId
  }
}
// Grant backend Key Vault access
module backendKvAccess 'br/DrsConfig:keyvault-access:v2' = {
  name: 'kvAccess-${uniqueString(backend.name)}'
  params: {
    keyVaultName: kv.name
    principalId: backend.outputs.identity.principalId
  }
}
// Grant worker Key Vault access
module workerKvAccess 'br/DrsConfig:keyvault-access:v2' = {
  name: 'kvAccess-${uniqueString(worker.name)}'
  params: {
    keyVaultName: kv.name
    principalId: worker.outputs.identity.principalId
  }
}

// Config (App Settings, Connection strings) here now that Key Vault links will resolve
// Overrides for environments come through as params

// Shared configs are defined inline here
var appInsightsSettings = {
  // App Insights
  ApplicationInsightsAgent_EXTENSION_VERSION: '~2'
  XDT_MicrosoftApplicationInsights_Mode: 'recommended'
  DiagnosticServices_EXTENSION_VERSION: '~3'
  APPINSIGHTS_PROFILERFEATURE_VERSION: '1.0.0'
  APPINSIGHTS_SNAPSHOTFEATURE_VERSION: '1.0.0'
  InstrumentationEngine_EXTENSION_VERSION: '~1'
  SnapshotDebugger_EXTENSION_VERSION: '~1'
  XDT_MicrosoftApplicationInsights_BaseExtensions: '~1'
}

var friendlyEnvironmentNames = {
  dev: 'Dev'
  qa: 'QA'
  uat: 'UAT'
  prod: 'Production'
}

var dbConnectionStrings = {
  Default: {
    type: 'SQLServer'
    value: referenceSecret(keyVaultName, 'db-connection-string')
  }
}

// Backend App Service
var baseBackendSettings = {
  DOTNET_Environment: friendlyEnvironmentNames[env]

  // App Identifier.
  AppRequestHeader__AppIdentifier: reference(kv.name, 'app-identifier')

  // Worker api key
  Worker__ApiKey: referenceSecret(kv.name, 'worker-api-key')

  // Email settings
  OutboundEmail__Provider: 'smtp'
  OutboundEmail__FromEmail: referenceSecret(kv.name, 'email-from')
  OutboundEmail__SmtpHost: referenceSecret(kv.name, 'smpt-host')
  OutboundEmail__SmtpPort: referenceSecret(kv.name, 'smpt-port')
  OutboundEmail__SmtpUsername: referenceSecret(kv.name, 'smpt-username')
  OutboundEmail__SmtpPassword: referenceSecret(kv.name, 'smpt-password')
  OutboundEmail__SmtpSecureSocketEnum: referenceSecret(kv.name, 'smpt-secure-socket-enum')

  // Registration settings
  Registration__UseRules: 'false'
}

module backendSiteConfig 'br/DrsConfig:webapp:v1' = {
  name: 'siteConfig-${uniqueString(backend.name)}'
  params: {
    appName: backend.outputs.name
    appSettings: union(appInsightsSettings, baseBackendSettings, backendAppSettings)
    connectionStrings: dbConnectionStrings
  }
}

// Worker Functions App
var baseWorkerSettings = {
  APPLICATIONINSIGHTS_CONNECTION_STRING: worker.outputs.appInsights.connectionString
  WEBSITES_ENABLE_APP_SERVICE_STORAGE: false
  AzureWebJobsStorage: referenceSecret(kv.name, workerStorage.outputs.connectionStringKvRef)

  Backend__ApiUrl: referenceSecret(kv.name, 'backend-api-url')
  Backend__ApiKey: referenceSecret(kv.name, 'backend-api-key')
}


module workerSiteConfig 'br/DrsConfig:functionapp:v1' = {
  name: 'siteConfig-${uniqueString(worker.name)}'
  params: {
    appName: worker.outputs.name
    appSettings: union(appInsightsSettings, baseWorkerSettings, workerAppSettings)
  }
}
