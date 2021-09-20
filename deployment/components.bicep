targetScope = 'resourceGroup'

param project string
param apiToken string

var location = resourceGroup().location
var swaName = '${project}-swa'
var kvName = '${project}-kv'

resource kv 'Microsoft.KeyVault/vaults@2021-06-01-preview' = {
  name: kvName
  location: location
  properties: {
    sku: {
      family: 'A'
      name: 'standard'
    }
    tenantId: subscription().tenantId
  }
}

resource swa 'Microsoft.Web/staticSites@2021-01-15' = {
  name: swaName
  location: location
  properties: {
    repositoryUrl: 'https://github.com/divusmetaphysica/project-finntuber'
    branch: 'infra'
    repositoryToken: apiToken
    buildProperties: {
      appLocation: 'app'
      apiLocation: 'api'
      appBuildCommand: 'npm run build'
      apiBuildCommand: 'npm run build'
      outputLocation: 'dist'
    }
  }
  identity: {
    type: 'SystemAssigned'
  }
  dependsOn: [
    kv
  ]
}
