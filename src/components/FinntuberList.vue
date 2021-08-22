<template>
  <div>
    <h1>List of Finnish VTubers</h1>
    <div class="row" v-for="ft in finntubers" :key="ft.name">
      <div class="column">
        <b>
          <a href="{{ ft.channel }}">{{ ft.name }}</a>
        </b>
      </div>
      <div class="column">{{ ft.type }}</div>
      <div class="column">{{ ft.short_description }}</div>
    </div>
  </div>

  <div>
    <div v-for="ti in twitch_info" :key="ti.name">
      <div>{{ ti }}</div>
    </div>
  </div>
</template>

<script>
import * as db from "../../finntubers.json";
import axios from "axios";

const oAuthToken = {
  token: "",
  client_id: "",
};

const loadTwitchInfo = (arr) => {
  let data = [];
  console.log(arr);
  let user_ids = arr.default
    .filter((x) => x.channel_name != null)
    .map((x) => `login=${x.channel_name}`)
    .join("&");

  const config = {
    headers: {
      Authorization: `Bearer ${oAuthToken.token}`,
      "Client-Id": oAuthToken.client_id,
    },
  };

  axios
    .get(`https://api.twitch.tv/helix/users?${user_ids}`, config)
    .then((x) => data.push(x))
    .catch((x) => console.log(x));
  return data;
};

export default {
  name: "Finntubers",
  props: {
    finntubers: db,
    twitch_info: loadTwitchInfo(db),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: darkblue;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  list-style: none;
  margin: 0 10px;
  padding: 0;
  float: inline-start;
  text-align: center;
}
li:after {
  content: "\A";
  white-space: pre;
}
a {
  color: #42b983;
  text-decoration: none;
}
.table-no-borders {
  border-collapse: collapse;
}
.table-td {
  text-align: left;
}
#div {
  display: flex;
  justify-content: center;
}
.table {
  align-self: center;
}
.row {
  display: table;
  width: 100%; /*Optional*/
  table-layout: fixed; /*Optional*/
  border-spacing: 10px; /*Optional*/
}
.column {
  display: table-cell;
}
</style>

    <!-- <table class="table table-no-borders">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ft in finntubers" :key="ft.name">
          <td class="table-td">
            <b>
              <a href="{{ ft.channel }}">{{ ft.name }}</a>
            </b>
          </td>
          <td class="table-td">{{ ft.type }}</td>
          <td>{{ ft.short_description }}</td>
        </tr>
      </tbody>
    </table> -->
    <!-- <ul id="list-finntubers" class="">
      <li v-for="ft in finntubers" :key="ft.name">
        <b>
          <a href="{{ ft.channel }}">{{ ft.name }}</a>
        </b>
      </li>
    </ul> -->
