<template>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-image: linear-gradient(180deg, #d1e9ff 0%, #3299d9 100%);
}
</style>
