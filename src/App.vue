<template>
  <div class="page">
    <h1>List of Finnish VTubers</h1>
    <Tabs>
      <Tab title="NOW LIVE"><NowLive /></Tab>
      <Tab title="BROWSE"><FinntuberList name="List of Finnish VTubers"/></Tab>
      <Tab title="FAQ"><Faq /></Tab>
    </Tabs>

    <div class="bottom-banner">
      <div>Maintainer: @divinemetaphys on Twitter</div>
      <div>Designer: @mariel_vt on Twitter</div>
    </div>
  </div>
</template>

<script>
import Faq from "./components/Faq.vue";
import FinntuberList from "./components/FinntuberList.vue";
import NowLive from "./components/NowLive.vue";
import Tab from "./components/Tab.vue";
import Tabs from "./components/Tabs.vue";

export default {
  name: "App",
  data() {
    return { tabs: [] };
  },
  created() {
    document.title = "Project Finntubers";
  },
  components: {
    Faq,
    FinntuberList,
    NowLive,
    Tab,
    Tabs,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.page {
  padding-bottom: 50px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: linear-gradient(180deg, #d1e9ff 0%, #3299d9 100%);
}
h1 {
  color: #3299d9;
  text-align: center;
  padding: 50px;
  font-family: "Dosis", sans-serif;
}
.bottom-banner {
  color: snow;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
