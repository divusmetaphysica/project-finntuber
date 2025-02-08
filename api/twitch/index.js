const axios = require("axios");
const auth = require("./authentication");

const TWITCH_USERS_URL = "https://api.twitch.tv/helix/users";
const TWITCH_STREAMS_URL = "https://api.twitch.tv/helix/streams";
const TWITCH_VIDEOS_URL = "https://api.twitch.tv/helix/videos";

const makeConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
  };
};

/**
 * Query the user info from Twitch.
 *
 * @param {Array{String}} userLogins
 * @param {Object} authHeader
 * @returns Streamer data.
 */
const loadTwitchInfo = async (userIds, authHeader) => {
  let results = new Object();
  const logins = userIds.map((userName) => `id=${userName}`).join("&");

  await axios
    .get(`${TWITCH_USERS_URL}?${logins}`, authHeader)
    .then((x) => x.data.data.forEach((y) => (results[y.login] = y)))
    .catch(async (error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          results = error.response.data;
        } else {
          // Fallthrough if it is not authorization related
          console.log(error.response.data);
          console.log(error.response.headers);
          console.log(error.config);
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.config);
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(error.config);
        console.log(error);
      }
    });

  return results;
};

/**
 * Load Twitch stream info for the provided logins.
 *
 * @param {Array{String}} userLogins, contains appendable userlogin string
 * @param {Object} authHeader, authentication header
 * @returns Streaming info.
 */
const loadTwitchStreams = async (userIds, authHeader) => {
  let results = new Object();
  const logins = userIds.map((userName) => `user_id=${userName}`).join("&");

  await axios
    .get(`${TWITCH_STREAMS_URL}?${logins}`, authHeader)
    .then((x) => x.data.data.forEach((y) => (results[y.user_login] = y)))
    .catch((x) => console.log(x.toJSON()));

  return results;
};

/**
 * Load the latest Twitch VOD info for the provided logins.
 *
 * @param {Array{String}} userLogins, contains appendable userlogin string
 * @param {Object} authHeader, authentication header
 * @returns The latest VOD info.
 */

const loadTwitchVideos = async (userIds, authHeader) => {
  let results = new Object();
  const logins = userIds.map((userName) => `user_id=${userName}`).join("&");

  await axios
    .get(`${TWITCH_VIDEOS_URL}?${logins}&first=1`, authHeader)
    .then((x) => x.data.data.forEach((y) => (results[y.user_login] = y)))
    .catch((x) => console.log(x.toJSON()));

  return results;
};

module.exports = async function(context, req) {
  const logins = req.query.ids || (req.body && req.body.ids);
  context.log(`Requesting twitch data for ${logins}`);

  // Construct authentication headers for Axios.
  let accessToken = await auth.getCurrentToken();
  let authHeader = makeConfig(accessToken);
  const userIds = logins.split(",");

  // Initial call, if it fails to Unauthorized return the error and refresh
  // access token. With the new token attempt to get user info again.
  let info = await loadTwitchInfo(userIds, authHeader);

  if (info.status != undefined && info.status == 401) {
    accessToken = await auth.getNewAccessToken();
    context.log("Updated new Access Token to KeyVault.");
    authHeader = makeConfig(accessToken);

    info = await loadTwitchInfo(userIds, authHeader);
  }

  let streams = await loadTwitchStreams(userIds, authHeader);
  Object.entries(streams).forEach(
    (entry) => (info[entry[0]]["stream"] = entry[1])
  );

  let videos = await loadTwitchVideos(userIds, authHeader);
  Object.entries(videos).forEach(
    (entry) => (info[entry[0]]["video"] = entry[1])
  );

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: info,
  };
};
