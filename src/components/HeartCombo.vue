<template lang="html">
  <div class="component_combo eqcalc">
    <h3 class="title">套餐管理</h3>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartGroup',
  data:function(){
    return ({

    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  }
};
</script>

<style lang="css" scoped>
  
</style>