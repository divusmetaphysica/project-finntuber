const finntubers = require("../finntubers.json");

const oAuthToken = {
  token: process.env.API_TOKEN,
  client_id: process.env.CLIENT_ID,
};

const loadTwitchInfo = (arr) => {
  let data = []
  let user_ids = arr.map(x => `user_login=${x.channel_name}`).join("&");
  const header = {
    "Authorization": "Bearer" + oAuthToken.token,
    "Client-Id": oAuthToken.client_id
  }
  axios
    .get("https://api.twitch.tv/helix/?" + user_ids, header)
    .then(x = data.push(x))
    .catch(x => console.log(x));
  return data
};

let list = loadTwitchInfo(finntubers);
console.log(list);