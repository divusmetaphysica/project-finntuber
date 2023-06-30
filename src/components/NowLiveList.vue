<template>
  <div class="page">
    <div class="vtuberList">
      <template v-for="ft in activeTalents" :key="ft.name">
        <div class="vtuber" v-if="ft.stream != undefined">
          <a :href="ft.channel">
            <img :src="ft.stream.thumbnail_url" />
          </a>

          <div class="vtuberInfo">
            <b>
              <a :href="ft.channel">{{ ft.name }} </a>
            </b>
            <div>{{ ft.stream.title }}</div>
            <div>{{ ft.stream.game_name }}</div>
            <div class="tags">
              <span class="tag" v-for="t in ft.stream.tags" :key="t">
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </template>
      <div v-show="activeTalents.every((ft) => ft.stream == undefined)">
        No streamers currently online.
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const refreshInterval = 10 * 60 * 1000;
const notMissing = (x) => x != undefined && x != null && x !== "";

export default {
  name: "ListingComponent",
  data() {
    return {
      talents: [],
      timerId: null,
    };
  },
  async mounted() {
    const talents = (await import("../assets/finntubers.json")).default;
    console.log("Loaded static streamer info.");
    this.talents = talents;

    await this.updateStreamerInfo();

    this.timerId = setInterval(this.updateStreamerInfo, refreshInterval);
    setTimeout(() => {
      clearInterval(this.timerId);
      console.log("stop");
    }, 12 * refreshInterval);
  },
  computed: {
    activeTalents: function() {
      return this.talents.filter((i) => i.channel !== null);
    },
  },
  methods: {
    async updateStreamerInfo() {
      const logins = this.talents
        .filter((x) => notMissing(x.channel) && x.channel.includes("twitch"))
        .map((x) => x.id)
        .filter(notMissing);

      // const chunked = async (array, chunkSize) =>
      //   Array(Math.ceil(array.length / chunkSize))
      //     .fill()
      //     .map((_, index) => index * chunkSize)
      //     .map((begin) => array.slice(begin, begin + chunkSize));
      for (let i = 0; i < logins.length; i += 20) {
        let loginsPart = logins.slice(i, i + 20).join(",");
        await axios
          .get(`/api/twitch?ids=${loginsPart}`)
          .then((response) => {
            if (response.status === 200) {
              this.talents.forEach((y) =>
                Object.assign(y, response.data[y.channel_name])
              );
              console.log("Loaded Twitch user info.");
            }
          })
          .catch((x) => console.log(x));
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap");
.page {
  padding-bottom: 50px;
  color: midnightblue;
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
  width: 100%;
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
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  margin: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
}
.vtuberInfo {
  padding-left: 10px;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}
.vtuberInfo > :first-child {
  margin-top: 5px;
}
.vtuberInfo > :not(:last-child) {
  margin-bottom: 10px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
.tag {
  font-size: 12px;
  color: snow;
  background-color: #3299d9;
  padding: 5px 10px;
  border-radius: 20px;
  margin-bottom: 5px;
}

.tag:not(:last-child) {
  margin-right: 5px;
}

@media (min-width: 769px) {
  .vtuber {
    flex-direction: row;
    width: 650px;
    height: 200px;
  }

  img {
    width: 320px;
  }
  .vtuberInfo > :first-child {
    margin-top: 0px;
  }
  .vtuberInfo > :not(:last-child) {
    margin-bottom: 0px;
  }
}
</style>
