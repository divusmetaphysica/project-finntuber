import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import timeago from "vue-timeago3";
import { createPinia } from 'pinia'

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(timeago)
  .mount("#app");
