using '../main.bicep'

param location = 'uksouth'

param serviceName = 'equinecastration'
param env = 'uat'

param backendAppSettings = union(
  loadYamlContent('base.appsettings.yaml'),
  {

  }
)
