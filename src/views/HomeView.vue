<template>
  <header>
    <div class="banner">
      <h1>List of Finnish VTubers</h1>
    </div>
    <nav>
      <div class="tab">
        <router-link to="/">NOW LIVE</router-link>
      </div>
      <div class="tab">
        <router-link to="/browse">BROWSE</router-link>
      </div>
      <div class="tab">
        <router-link to="/faq">FAQ</router-link>
      </div>
    </nav>
  </header>
  <div class="page-content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style>
header {
  margin-bottom: -10px;
}

.banner {
  height: 300px;
  display: flex;
  flex-direction: column;
  font-size: 28px;
  z-index: 1;
  margin-bottom: -100px;
  padding-top: 20px;
}

nav {
  display: flex;
  justify-content: center;
  z-index: 2;
}

.tab {
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tab a {
  background-color: #d1e9ff;
  border: 10px solid white;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  width: 200px;
  height: 80px;
  font-family: "Dosis", sans-serif;
  text-decoration: none;
  font-size: 24px;
  color: #075484;
  text-align: center;
  padding: 14px 0;
}

.tab a.router-link-exact-active {
  z-index: 10;
}

.page-content {
  height: 100%;
  background-image: linear-gradient(180deg, #d1e9ff 0%, #3299d9 100%);
  border-top: 10px solid white;
  padding-top: 50px;
  position: relative;
  z-index: 3;
}
</style>
