<template>
  <div id="app">
    <TopBar />
    <router-view />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';

export default {
  name: 'App',
  components:{
    TopBar
  }
};
</script>

<style>
html,body{
  margin:0;
  padding:0;
  background:#FFF;
}
#app {
  font-family: 'PingFang SC', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
