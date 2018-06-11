<template lang="html">
  <div class="component_combo eqcalc">
    <h3 class="title with_sub">
      套餐管理
      <p>
        在此页面查看拥有的套餐，分配套餐给用户时会消耗套餐的数量，数量可购买。
        <a href="javascript:;">购买记录</a>
      </p>
    </h3>
    
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
  .component_combo{
    background: white;
  }
  h3.title.with_sub{
    height: 80px;
    position: relative;
  }
  h3.title.with_sub p{
    position: absolute;
    left: 0;
    bottom: 0;
    padding:0 15px;
    margin: 0;
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
  }
  h3.title.with_sub a{
    float: right;
    font-weight: 500;
  }
</style>