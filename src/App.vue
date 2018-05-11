<template>
  <div id="app">
    <LayoutTopBar />

    <el-row>
      <el-col id="left_nav_wrap">
        <LayoutNavMaster />
      </el-col>
      <el-col id="main_wrap">
        <router-view />
        <footer class="copyright">
          <p>客服：400-618-7238 2018 ◎深圳易马达科技有限公司版权所有 </p>
        </footer>
      </el-col>
    </el-row>

    <LayoutLogin />
  </div>
</template>

<script>
import LayoutTopBar from './components/LayoutTopBar.vue';
import LayoutNavMaster from './components/LayoutNavMaster.vue';
import LayoutLogin from './components/LayoutLogin.vue';

export default {
  name: 'App',
  components:{
    LayoutTopBar,
    LayoutNavMaster,
    LayoutLogin
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
  #app a{
    color:#fc8181;
    text-decoration: none;
    transition:all 0.2s ease-out;
    font-weight: 300;
    outline:none;
  }
  #app a:hover{
    color: #ff3333;
    outline:none;
  }
  #app a:active{
    outline:none;
  }
</style>
