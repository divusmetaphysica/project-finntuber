import axios from 'axios';

const oAuthToken = {
  token: process.env.API_TOKEN,
  client_id: process.env.CLIENT_ID,
};

const addInfo = (toArray, fromArray) => toArray.map(entry => {
  const infoEntry = fromArray.find(x => x.login == entry.channel_name);
  if (infoEntry !== undefined && infoEntry !== null) {
    entry.short_description = infoEntry.description;
    entry.profile_image_url = infoEntry.profile_image_url;
    entry.name = infoEntry.display_name
  }
  return entry
})

export const loadTwitchInfo = (arr) => {
  const user_ids = arr
    .filter(x => x.channel_name !== undefined && x.channel_name !== null)
    .map(x => `login=${x.channel_name}`).join("&");

  const config = {
    headers: {
      "Authorization": `Bearer ${oAuthToken.token}`,
      "Client-Id": `${oAuthToken.client_id}`
    }
  }

  axios
    .get("https://api.twitch.tv/helix/users?" + user_ids, config)
    .then(x => addInfo(arr, x.data.data))
    .catch(x => console.log(x));
  return arr
}
