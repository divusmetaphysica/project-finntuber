const axios = require('axios');

const oAuthToken = {
    token: process.env.API_TOKEN,
    client_id: process.env.CLIENT_ID,
};

const loadTwitchInfo = async (arr) => {
    const user_ids = arr.map(x => `login=${x}`).join("&");

    const config = {
        headers: {
            "Authorization": `Bearer ${oAuthToken.token}`,
            "Client-Id": `${oAuthToken.client_id}`
        }
    }

    let results = new Object();

    await axios
        .get("https://api.twitch.tv/helix/users?" + user_ids, config)
        .then(x => x.data.data.forEach(y => results[y.login] = y))
        .catch(x => console.log(x));

    return results;
}

module.exports = async function (context, req) {
    const logins = (req.query.logins || (req.body && req.body.logins));
    context.log(`Requesting twitch data for ${logins}`);

    const responseData = await loadTwitchInfo(logins.split(","));
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseData
    };
}