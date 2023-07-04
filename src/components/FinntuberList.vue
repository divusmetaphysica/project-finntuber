<template>
  <div class="finntuberList">
    <div class="infoBar">
      <div>Total streamers: {{ activeTalents.length }}</div>
      <div>
        <label for="sort-select">Sort by </label>
        <select v-model="sorting" id="sort-select">
          <option value="lastlive">Last live</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
    </div>
    <div class="vtuberList">
      <div class="vtuber" v-for="ft in activeTalents" :key="ft.name">
        <div class="vtuberMainInfo">
          <a :href="ft.channel">
            <img :src="ft.profile_image_url" />
          </a>

          <div class="vtuberInfo">
            <b>
              <a :href="ft.channel">{{ ft.name }} </a>
            </b>
            <br />
            <div class="description">
              {{ ft.description }}
            </div>
          </div>
        </div>
        <template v-if="ft.stream != undefined">
          <a :href="ft.channel">
            <div class="live-status">
              <div id="circle"></div>
              <b style="color: red">LIVE</b>
            </div>
          </a>
        </template>
        <template v-if="ft.stream == undefined && ft.video != undefined">
          <div class="last-live">
            Last live: <timeago :datetime="ft.video.published_at" />
          </div>
        </template>
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
      sorting: "lastlive",
    };
  },
  async mounted() {
    const talents = (await import("../assets/finntubers.json")).default;
    console.log("Loaded static streamer info.");
    this.talents = talents;
    this.sortTalents(this.sorting);

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
      this.sortTalents(this.sorting);
    },
    sortTalents(newVal) {
      switch (newVal) {
        case "alphabetical":
          this.sortAlphabetical();
          break;
        case "lastlive":
          this.sortLastLive();
          break;
        default:
          break;
      }
    },
    sortAlphabetical() {
      this.talents = this.talents.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    sortLastLive() {
      // Most recently started streams first, then most recent vods, then the rest
      let nowLive = this.talents
        .filter((ft) => ft.stream != undefined)
        .sort((a, b) => (a.stream.started_at > b.stream.started_at ? -1 : 1));
      let hasVods = this.talents
        .filter((ft) => ft.stream == undefined && ft.video != undefined)
        .sort((a, b) => (a.video.published_at > b.video.published_at ? -1 : 1));
      let noData = this.talents.filter(
        (ft) => ft.stream == undefined && ft.video == undefined
      );
      this.talents = nowLive.concat(hasVods, noData);
    },
  },
  watch: {
    sorting(newVal) {
      this.sortTalents(newVal);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap");
.finntuberList {
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
.infoBar {
  margin: 0 auto;
  padding: 0px 10px 36px 10px;
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  font-family: "Dosis", sans-serif;
  font-size: 18px;
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
  justify-content: center;
  width: 300px;
  height: 150px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  margin: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
}
.vtuberMainInfo {
  display: flex;
  align-items: center;
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
  word-break: break-word;
}
.live-status {
  border: 2px solid red;
  border-radius: 12px;
  text-align: center;
  font-size: 10px;
  padding-top: 2px;
  width: 100px;
}
.last-live {
  font-size: 12px;
  padding-top: 2px;
}
#circle {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  display: inline-block;
  margin-inline: 0px 5px;
}

@media (min-width: 657px) {
  .infoBar {
    max-width: 640px;
  }
}

@media (min-width: 977px) {
  .infoBar {
    max-width: 960px;
  }
}

@media (min-width: 1297px) {
  .infoBar {
    max-width: 1280px;
  }
}

@media (min-width: 1617px) {
  .infoBar {
    max-width: 1600px;
  }
}
</style>
