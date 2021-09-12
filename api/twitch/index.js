const axios = require('axios');
const twitchUsersUrl = "https://api.twitch.tv/helix/users";
const twitchStreamsUrl = "https://api.twitch.tv/helix/streams";

const config = {
    headers: {
        "Authorization": `Bearer ${process.env.API_TOKEN}`,
        "Client-Id": `${process.env.CLIENT_ID}`
    }
}

const loadTwitchInfo = async (arr) => {
    let results = new Object();

    const userIDs = arr.map(userName => `login=${userName}`).join("&");
    await axios
        .get(`${twitchUsersUrl}?${userIDs}`, config)
        .then(x => x.data.data.forEach(y => results[y.login] = y))
        .catch(x => console.log(x));

    return results;
}

const loadTwitchStreams = async (arr) => {
    let results = new Object();

    const userIDs = arr.map(userName => `user_login=${userName}`).join("&");
    await axios
        .get(`${twitchStreamsUrl}?${userIDs}`, config)
        .then(x => x.data.data.forEach(y => results[y.user_login] = y))
        .catch(x => console.log(x));

    return results;
}

module.exports = async function (context, req) {
    const logins = (req.query.logins || (req.body && req.body.logins));
    context.log(`Requesting twitch data for ${logins}`);

    const userNames = logins.split(",")
    const info = await loadTwitchInfo(userNames);
    const streams = await loadTwitchStreams(userNames);
    Object.entries(streams).forEach(entry => info[entry[0]]["stream"] = entry[1])

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: info
    };
}