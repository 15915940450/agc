<template lang="html">
  <div class="">
    demo
  </div>
</template>
<script>
import {mapState} from 'vuex';

export default {
  name:'',
  data:function(){
    return ({
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    // deep watcher
    'modalStore.needShop':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  components:{
  },
  methods: {
  },
  created:function(){
  }
};
</script>
<style lang="css" scoped>

</style>