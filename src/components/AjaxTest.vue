<template lang="html">
  <div class="ajax_test">
    <ul>
      <li><a href="">kkk</a></li>
      <li><a href="">ooo</a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
      <li><a href=""></a></li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue';
import rqs from '../api/index.js';
Vue.prototype.$rqs=rqs;



// //comments and componentnames(router s) and notify | 1000


// arr=['abc','def','g','hi','jklmn']
export default {
  name:'AjaxTest',
  data() {
    return {
      thilina:'kkk'
    };
  },
  methods:{
    load:function(){

      this.$rqs('http://119.23.133.72:8764/agent/account/baseInfo','POSTform',function(rps){console.log(rps);},{
        objSendData:{
          phone:15915900000
        }});
    }
  },
  created:function(){
    this.load();
  }
};


</script>

<style lang="css" scoped>
</style>
