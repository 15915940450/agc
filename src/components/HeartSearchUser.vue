<template lang="html">
  <div class="search_user">
    HeartSearchUser
  </div>
</template>
<script>
import {mapState} from 'vuex';

export default {
  name:'HeartSearchUser',
  data:function(){
    return ({
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    // deep watcher
    'modalStore.needLogin':function(val){
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
<style lang="css">

</style>