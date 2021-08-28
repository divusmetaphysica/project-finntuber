<template>
  <div>
    <h1>List of Finnish VTubers</h1>
    <div class="row" v-for="ft in info()" :key="ft.name">
      <div class="column">
        <img :src="ft.profile_image_url" />
      </div>
      <div class="column">
        <b>
          <a :href="ft.channel">{{ ft.name }} </a>
        </b>
        {{ ft.type }}
      </div>
      <div class="column">{{ ft.short_description }}</div>
    </div>
  </div>
</template>

<script>
import * as db from "../../finntubers.json";
import { loadTwitchInfo } from "./twitchIntegration.js";

export default {
  name: "ListingComponent",
  props: {
    talents: db,
  },
  methods: {
    info() {
      return loadTwitchInfo(db.default);
    },
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
img {
  width: 50%;
  height: auto;
}
</style>
