// stores/streamers.js
import axios from 'axios';
import { defineStore } from 'pinia';

const notMissing = (x) => x != undefined && x != null && x !== "";

export const useStreamersStore = defineStore('streamers', {
  state: () => {
    return {
      id: 0,
      timerId: null,
      streamers: [],
      refreshInterval: (10 * 60 * 1000),
      chunkSize: 100
    };
  },
  getters: {
    activeStreamers: (state) => state.streamers.filter((i) => i.channel !== null),
    streamerCount: (state) => state.streamers.filter((i) => i.channel !== null).length,
    currentlyStreaming: (state) => state.streamers.filter((i) => i.channel !== null).every((ft) => ft.stream == undefined),
  },
  actions: {
    async initializeStreamers(sorting) {
      if (this.streamers.length === 0) {
        let streamers = (await import("../assets/finntubers.json")).default;
        console.log("Loaded static streamer info.");

        const logins = streamers
          .filter((x) => notMissing(x.channel) && x.channel.includes("twitch"))
          .map((x) => x.id)
          .filter(notMissing);

        for (let i = 0; i < logins.length; i += this.chunkSize) {
          let loginsPart = logins.slice(i, i + this.chunkSize).join(",");
          await axios
            .get(`/api/twitch?ids=${loginsPart}`)
            .then((response) => {
              if (response.status === 200) {
                streamers = streamers.map((y) =>
                  Object.assign(y, response.data[y.id])
                );
                console.log("Loaded Twitch user info.");
              }
            })
            .catch((x) => console.log(x));
        }
        this.streamers = streamers;
        this.sortStreamers(sorting);
      }
    },
    async updateStreamerInfo(sorting) {
      const logins = this.streamers
        .filter((x) => notMissing(x.channel) && x.channel.includes("twitch"))
        .map((x) => x.id)
        .filter(notMissing);

      for (let i = 0; i < logins.length; i += this.chunkSize) {
        let loginsPart = logins.slice(i, i + this.chunkSize).join(",");
        await axios
          .get(`/api/twitch?ids=${loginsPart}`)
          .then((response) => {
            if (response.status === 200) {
              this.streamers = this.streamers.map((y) =>
                Object.assign(y, response.data[y.id])
              );
              console.log("Loaded Twitch user info.");
            }
          })
          .catch((x) => console.log(x));
      }
      this.sortStreamers(sorting);
    },
    sortStreamers(newVal) {
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
      this.streamers = this.streamers.sort((a, b) => {
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
      const streamers = this.streamers
      let nowLive = streamers
        .filter((ft) => ft.stream != undefined)
        .sort((a, b) => (a.stream.started_at > b.stream.started_at ? -1 : 1));
      let hasVods = streamers
        .filter((ft) => ft.stream == undefined && ft.video != undefined)
        .sort((a, b) => (a.video.published_at > b.video.published_at ? -1 : 1));
      let noData = streamers.filter(
        (ft) => ft.stream == undefined && ft.video == undefined
      );
      this.$patch({ streamers: nowLive.concat(hasVods, noData) });
    },
    setFetchTimer() {
      if (this.timerId === null) {
        this.timerId = setInterval(this.updateStreamerInfo, this.refreshInterval);
        setTimeout(() => {
          clearInterval(this.timerId);
          console.log("stop");
        }, 12 * this.refreshInterval);
      }
    }
  }
})
