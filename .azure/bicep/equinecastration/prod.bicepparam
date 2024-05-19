using '../main.bicep'

param location = 'uksouth'

param serviceName = 'equinecastration'
param env = 'prod'

param appServicePlanSku = 'B3'

param backendAppSettings = loadYamlContent('base.appsettings.yaml')
