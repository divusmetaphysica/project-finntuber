<template>
  <div class="content">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    document.title = 'Project Finntubers'
  },
}
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
  background-color: #d1e9ff; /* TODO remove after real banner has been added */
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
  font-family: 'Dosis', sans-serif;
  text-shadow:
    -4px -4px 0 #fff,
    0 -4px 0 #fff,
    4px -4px 0 #fff,
    4px 0 0 #fff,
    4px 4px 0 #fff,
    0 4px 0 #fff,
    -4px 4px 0 #fff,
    -4px 0 0 #fff;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
