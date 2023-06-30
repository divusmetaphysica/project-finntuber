import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import timeago from "vue-timeago3";

createApp(App)
  .use(router)
  .use(timeago)
  .mount("#app");
