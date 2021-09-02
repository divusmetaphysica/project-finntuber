<template>
  <div class="page">
    <h1>List of Finnish VTubers</h1>
    <div class="vtuberList">
    <div class="vtuber" v-for="ft in activeTalents" :key="ft.name">
      <img :src="ft.profile_image_url"/>
      <div class="vtuberInfo">
        <b>
          <a :href="ft.channel">{{ ft.name }} </a>
        </b><br/>
        <div class="description">
          {{ trimDescription(ft.description) }}
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import * as db from "../assets/finntubersV2.json";

export default {
  name: "ListingComponent",
  props: {
    talents: db,
  },
  methods: {
    trimDescription: function(desc) {
      const limit = 135;
      if(desc !== null && desc.length > limit) {
        return (desc.substring(0, limit) + "...");
      }
      return desc;
    }
  },
  computed: {
    activeTalents: function () {
      return this.talents.filter(i => i.channel !== null);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap');
.page {
  padding-bottom: 50px;
}
h1 {
  color: #3299d9;
  text-align: center;
  padding: 50px;
  font-family: 'Dosis', sans-serif;
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
  color: #3299d9;
  text-decoration: none;
  font-family: 'Dosis', sans-serif;
  font-size: 18px;
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
  width: 100px;
  height: 100px;
  padding: 5px 0px;
}
.vtuberList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 1600px;
}
.vtuber {
  display: flex;
  align-items: center;
  width: 300px;
  height: 130px;
  border: 2px solid #173F5F;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  margin: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7)
}
.vtuberInfo {
  padding-left: 10px;
  align-self: flex-start;
}
.description {
  font-size: 12px;
  padding-top: 5px;
}
</style>
