import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NowLive from "../views/NowLive.vue";
import Browse from "../views/Browse.vue";
import Faq from "../views/Faq.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    children: [
      { path: "", component: NowLive },
      { path: "browse", component: Browse },
      { path: "faq", component: Faq },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
