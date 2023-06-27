<template>
  <div class="content">
    <router-view />
  </div>
  <div class="bottom-banner">
    <div>Maintainer: @divinemetaphys on Twitter</div>
    <div>Designer: @mariel_vt on Twitter</div>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    document.title = "Project Finntubers";
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #d1e9ff; /* TODO remove */
  color: #2c3e50;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
h1 {
  color: #3299d9;
  text-align: center;
  padding: 50px;
  font-family: "Dosis", sans-serif;
}
.content {
  flex: 1;
}
.bottom-banner {
  color: snow;
  text-align: center;
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
