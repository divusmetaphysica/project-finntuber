targetScope = 'subscription'

param projectName string = 'project-finntubers-test'
param location string = 'northeurope'
param apiToken string

resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: '${projectName}-rg'
  location: location
}

module storage 'storage.bicep' = {
  scope: resourceGroup(rg.name)
  name: 'storage'
}

module components 'components.bicep' = {
  name: 'components'
  params: {
    project: projectName
    apiToken: apiToken
  }
  scope: resourceGroup(rg.name)
}

//Create the full url for our account download SAS.
output blobDownloadSAS string = '${storage.outputs.blobEndpoint}/?${storage.outputs.allBlobDownloadSAS}'

//Create the full url for our container upload SAS.
output myContainerUploadSAS string = '${storage.outputs.dataBlobEndpoint}?${storage.outputs.dataUploadSAS}'
