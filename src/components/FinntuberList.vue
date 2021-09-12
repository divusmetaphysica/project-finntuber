<template>
  <div class="page">
    <h1>List of Finnish VTubers</h1>
    <div class="vtuberList">
      <div class="vtuber" v-for="ft in activeTalents" :key="ft.name">
        <a :href="ft.channel">
          <img :src="ft.profile_image_url" />

          <template v-if="ft.stream != undefined">
            <div class="live-status">
              <div id="circle"></div>
              <b style="color: red">LIVE</b>
            </div>
          </template>
        </a>

        <div class="vtuberInfo">
          <b
            ><a :href="ft.channel">{{ ft.name }} </a>
          </b>
          <br />
          <div class="description">
            {{ ft.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const notMissing = (x) => x != undefined && x != null && x !== "";

export default {
  name: "ListingComponent",
  data() {
    return {
      talents: [],
    };
  },
  async mounted() {
    const talents = (await import("../assets/finntubers.json")).default;
    const logins = talents
      .map((x) => x.channel_name)
      .filter(notMissing)
      .join(",");

    await axios
      .get(`/api/twitch?logins=${logins}`)
      .then((response) => {
        if (response.status === 200) {
          talents.forEach((y) =>
            Object.assign(y, response.data[y.channel_name])
          );
        }
      })
      .catch((x) => console.log(x));

    this.talents = talents;
    console.log(this.talents);
  },
  computed: {
    activeTalents: function () {
      return this.talents.filter((i) => i.channel !== null);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap");
.page {
  padding-bottom: 50px;
}
h1 {
  color: #3299d9;
  text-align: center;
  padding: 50px;
  font-family: "Dosis", sans-serif;
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
  font-family: "Dosis", sans-serif;
  font-size: 18px;
}
#div {
  display: flex;
  justify-content: center;
}
img {
  width: 100px;
  height: 100px;
  /* padding: 5px 0px; */
  border-radius: 10px;
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
  height: 150px;
  border: 2px solid #173f5f;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  margin: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
}
.vtuberInfo {
  padding-left: 10px;
  align-self: flex-start;
}
.description {
  font-size: 12px;
  padding-top: 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.live-status {
  border: 2px solid red;
  border-radius: 12px;
  text-align: center;
  font-size: 10px;
}
#circle {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  display: inline-block;
  margin-inline: 0px 5px;
}
</style>
