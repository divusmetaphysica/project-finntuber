var location = resourceGroup().location

resource stg 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  name: 'projfinn${uniqueString(resourceGroup().id)}'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Cool'
    allowBlobPublicAccess: false
    allowSharedKeyAccess: true
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
}

resource stgCon 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-04-01' = {
  name: '${stg.name}/default/data'
  dependsOn: [
    stg
  ]
}

output blobEndpoint string = 'https://${stg.name}.blob.${environment().suffixes.storage}'
output dataBlobEndpoint string = 'https://${stg.name}.blob.${environment().suffixes.storage}/data'

//SAS to download all blobs in account
output allBlobDownloadSAS string = listAccountSAS(stg.name, '2021-04-01', {
  signedProtocol: 'https'
  signedResourceTypes: 'sco'
  signedPermission: 'rl'
  signedServices: 'b'
  signedExpiry: '2022-07-01T00:00:00Z'
}).accountSasToken

//SAS to upload blobs to just the mycontainer container.
output dataUploadSAS string = listServiceSAS(stg.name, '2021-04-01', {
  canonicalizedResource: '/blob/${stg.name}/data'
  signedResource: 'c'
  signedProtocol: 'https'
  signedPermission: 'rwl'
  signedServices: 'b'
  signedExpiry: '2022-07-01T00:00:00Z'
}).serviceSasToken
