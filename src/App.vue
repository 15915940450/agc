<template>
  <div id="app" :class="{_port1590_:port1590}">
    <router-view />
    

    <LayoutLogin />
  </div>
</template>

<script>
import LayoutLogin from './components/LayoutLogin.vue';

export default {
  name: 'App',
  data:function(){
    return ({
      port1590:false
      // port1590:(window.location.port==='1590')
    });
  },
  components:{
    LayoutLogin
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
