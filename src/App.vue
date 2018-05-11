<template>
  <div id="app">
    <LayoutTopBar />

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
import LayoutTopBar from './components/LayoutTopBar.vue';
import LeftNav from './components/LeftNav.vue';
import NeedLogin from './components/NeedLogin.vue';

export default {
  name: 'App',
  components:{
    LayoutTopBar,
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
