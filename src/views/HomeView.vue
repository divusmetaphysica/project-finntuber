<template>
  <header>
    <h1>List of Finnish VTubers</h1>
    <nav>
      <div class="tab">
        <router-link to="/">Now live</router-link>
      </div>
      <div class="tab">
        <router-link to="/browse">Browse</router-link>
      </div>
      <div class="tab">
        <router-link to="/faq">FAQ</router-link>
      </div>
    </nav>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
header {
  margin-bottom: 50px;
}
nav {
  display: flex;
  justify-content: center;
}

.tab {
  margin: 0 10px;
}
</style>
