<template lang="html">
  <div class="component_joy">
    kjd
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartJoy',
  data:function(){
    return ({
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  methods:{
    fetchData:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.accountBaseInfo,function(objRps){
        Object.keys(objRps.result).forEach(function(v){
          vueThis[v]=objRps.result[v];
        });
      });
    }
  },
  created:function(){
    this.fetchData();
  } //created
};
</script>

<style lang="css" scoped>

</style>
