<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <FinntuberList name="List of Finnish VTubers" />
</template>

<script>
import FinntuberList from "./components/FinntuberList.vue";

export default {
  name: "App",
  components: {
    FinntuberList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
