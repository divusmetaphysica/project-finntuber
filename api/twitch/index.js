const axios = require('axios');
const vault = require("./keyVaultQuery");

const TWITCH_USERS_URL = "https://api.twitch.tv/helix/users";
const TWITCH_STREAMS_URL = "https://api.twitch.tv/helix/streams";
const TWITCH_AUTH_URL = "https://id.twitch.tv/oauth2/token";
// ?client_id=<your client ID>
// &client_secret=<your client secret>
// &grant_type=client_credentials

/**
 * Construct the Authorization header for Axios query for Twitch queries.
 *
 * @param {String} accessToken
 * @returns Ready Axios header
 */
const authHeader = (accessToken) => {
    return {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": `${process.env.TWITCH_CLIENT_ID}`
        }
    }
}

/**
 * Load Access Token from environment variable if it exists, otherwise
 * from the Azure KeyVault.
 *
 * @returns Current secret if found.
 */
const getAccessToken = async () => {
    if (process.env.TWITCH_ACCESS_TOKEN) {
        return process.env.TWITCH_ACCESS_TOKEN;
    } else {
        let accessToken = await vault
            .getCurrentSecret()
            .catch(x => console.log(x));
        return accessToken;
    }
}

/**
 *
 * @returns
 */
const newAccessToken = async () => {
    let accessToken = null;
    const params = {
        params: {
            client_id=process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            grant_type: "client_credentials"
        }
    }
    await axios
        .post(TWITCH_AUTH_URL, null, params)
        .then(
            x => { accessToken = x.data.access_token },
            x => console.log(x)
        )
        .catch(x => console.log(x));

    if (accessToken != null && accessToken != undefined) {
        await vault.setNewSecret(accessToken);
        console.log("Set new access token to Key Vault");
    }
    return accessToken;
}

/**
 *
 * @param {Object} config
 * @param {Array{String}} arr
 * @returns
 */
const loadTwitchInfo = async (config, arr) => {
    let results = new Object();

    const userIDs = arr.map(userName => `login=${userName}`).join("&");
    await axios
        .get(`${TWITCH_USERS_URL}?${userIDs}`, config)
        .then(x => x.data.data.forEach(y => results[y.login] = y))
        .catch(x => console.log(x));

    return results;
}

//
const loadTwitchStreams = async (config, arr) => {
    let results = new Object();

    const userIDs = arr.map(userName => `user_login=${userName}`).join("&");
    await axios
        .get(`${TWITCH_STREAMS_URL}?${userIDs}`, config)
        .then(x => x.data.data.forEach(y => results[y.user_login] = y))
        .catch(x => console.log(x));

    return results;
}

module.exports = async function (context, req) {
    const logins = (req.query.logins || (req.body && req.body.logins));
    context.log(`Requesting twitch data for ${logins}`);

    const userNames = logins.split(",");
    let accessToken = await getAccessToken();
    let config = authHeader(accessToken);

    const info = await loadTwitchInfo(config, userNames);
    const streams = await loadTwitchStreams(config, userNames);
    Object.entries(streams).forEach(entry => info[entry[0]]["stream"] = entry[1]);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: info
    };
}