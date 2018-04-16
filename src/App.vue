<template>
  <div id="app">
    <TopBar />

    <el-row>
      <el-col id="left_nav_wrap">
        <LeftNav />
      </el-col>
      <el-col id="main_wrap">
        <router-view />
        <footer class="copyright">
          <p>客服：400-618-7238 2018 ◎深圳易马达科技有限公司版权所有 </p>
        </footer>
      </el-col>
    </el-row>

    <NeedLogin />
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import LeftNav from './components/LeftNav.vue';
import NeedLogin from './components/NeedLogin.vue';

export default {
  name: 'App',
  components:{
    TopBar,
    LeftNav,
    NeedLogin
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
