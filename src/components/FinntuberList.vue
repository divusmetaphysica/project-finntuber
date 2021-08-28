<template>
  <div>
    <h1>List of Finnish VTubers</h1>
    <div class="row" v-for="ft in finntubers" :key="ft.name">
      <!-- <div class="column">
        <link ref="{{ ti.twitch_info.profile_image_url }}" />
      </div> -->
      <div class="column">
        <b>
          <a href="{{ ft.channel }}">{{ ft.name }} </a>
        </b>
        {{ ft.type }}
      </div>
      <!-- <div class="column">{{ ft.twitch_info.description }}</div> -->
    </div>
  </div>
</template>

<script>
import * as db from "../../finntubers.json";
// import axios from "axios";

// const oAuthToken = {
//   token: "ed5bqclqh3ya32kqg12x8kui38chtk",
//   client_id: "pjdodziokew6n0yphlgh78011ty6a9",
// };

// const loadTwitchInfo = async (db) => {
//   let fetchedData = [];

//   let user_ids = db.default
//     .filter((x) => x.channel_name != null && x.channel_name != undefined)
//     .map((x) => `login=${x.channel_name.toLowerCase()}`)
//     .join("&");

//   const config = {
//     headers: {
//       Authorization: `Bearer ${oAuthToken.token}`,
//       "Client-Id": oAuthToken.client_id,
//     },
//   };

//   await axios
//     .get(`https://api.twitch.tv/helix/users?${user_ids}`, config)
//     .then((x) => {
//       console.log(x.data.data);
//       x.data.data.forEach((element) => fetchedData.push(element));
//     })
//     .catch((x) => console.log(x))
//     .finally(() => console.log("Finished user fetch"));

//   const result = db.default.map((x) => {
//     if (x.channel_name != null || x.channel_name != undefined) {
//       x.twitch_info = fetchedData.find((y) => y.login === x.channel_name);
//     }
//     return x;
//   });
//   console.log(result);
//   return result;
// };
export default {
  name: "Finntubers",
  props: {
    finntubers: db,
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
