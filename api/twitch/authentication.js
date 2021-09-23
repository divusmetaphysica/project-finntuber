const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const axios = require("axios");

const TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/token";
const KEYVAULT_URL = `https://${process.env.VAULT_NAME}.vault.azure.net`;
const SECRET_NAME = "TwitchAccessToken";

const credential = new DefaultAzureCredential();
const client = new SecretClient(KEYVAULT_URL, credential);

/**
 * Load the Twitch access token from Azure Keyvault.
 *
 * @returns Current Twitch access token.
 */
const getCurrentToken = async () => {
  // This is a development default, to make it simpler
  if (process.env.TWITCH_ACCESS_TOKEN) {
    return process.env.TWITCH_ACCESS_TOKEN;
  } else {
    const latestSecret = await client.getSecret(SECRET_NAME).catch(console.log);
    if (latestSecret !== null && latestSecret !== undefined && latestSecret.value !== undefined) {
      return latestSecret.value;
    }
  }
}

/**
 * Update secret value to the Key Vault
 *
 * @param {String} newToken.
 * @returns Set response.
 */
const setNewToken = async (newToken) => {
  return await client.setSecret(SECRET_NAME, newToken).catch(console.log);
}

/**
 * Perform Client OAuth credential.
 *
 * @returns New Twitch Access Token.
 */
const getNewAccessToken = async () => {
  let accessToken = null;

  const args = {
    params: {
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials"
    }
  }
  await axios
    .post(TWITCH_AUTH_URL, null, args)
    .then(x => { accessToken = x.data; })
    .catch(console.log);

  if (accessToken !== null && accessToken !== "") {
    await setNewToken(accessToken.access_token);
  }
  return accessToken.access_token;
}

module.exports = {
  getCurrentToken: getCurrentToken,
  getNewAccessToken: getNewAccessToken
}