<template>
  <div>
    <LayoutTopBar />

    <el-row>
      <el-col id="left_nav_wrap">
        <LayoutNavMaster />
      </el-col>
      <el-col id="main_wrap">
        <router-view />
        <footer class="copyright">
          <p class="kefu">
            <span class="kefu_phone">客服：400-618-7238</span>
            <span class="kefu_copy">2018 &copy;深圳易马达科技有限公司版权所有</span>
          </p>
        </footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LayoutTopBar from './LayoutTopBar.vue';
import LayoutNavMaster from './LayoutNavMaster.vue';

export default {
  name: 'App',
  components:{
    LayoutTopBar,
    LayoutNavMaster
  }
};
</script>

<style>
  #app {
    width: 1200px;
    margin:0 auto;
    background: #FFF;
    box-shadow: 0px 0px 2px 2px rgba(0,0,0,.1);
  }
  #app._port1590_{
    width: 1070px;
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
