const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

// Build the URL to reach your key vault
const URL = process.env.VAULT_URL;
const SECRET_NAME = "TwitchAccessToken";

// DefaultAzureCredential expects the following three environment variables:
// * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// * AZURE_CLIENT_SECRET: The client secret for the registered application
const credential = new DefaultAzureCredential();

// Lastly, create our secrets client and connect to the service
const client = new SecretClient(URL, credential);

const getCurrentKey = async () => {
  const secret = await client.getSecret(SECRET_NAME);
  return secret.value;
}
const setNewKey = async (newKey) => await client.setSecret(SECRET_NAME, newKey);

module.exports = {
  getCurrentKey: getCurrentKey,
  setNewKey: setNewKey
}
// async function main() {
//   const latestSecret = await getCurrentKey();
//   console.log(`Latest version of the secret ${SECRET_NAME}: `, latestSecret);
// }

// main();