<template lang="html">
  <div class="search_user eqcalc">
    <h3 class="title">用户查询</h3>
    <div class="search_wrap">
      <img src="../assets/search_user.png" alt="search_user" />

      <!-- el-autocomplete -->
      <el-input
        class="search_input"
        placeholder="输入手机号码查询用户"
        suffix-icon="el-icon-search"
        autofocus="true"
        auto-complete="on"
        >
      </el-input>
      <p class="latest_add">
        最近添加： 
        <a href="javascript:;">13800138000</a>
        <a href="javascript:;">13800138000</a>
      </p>
    </div>
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
.search_user{
  background: #FFF;
}
.latest_add a{
  margin-right: 16px;
}
.search_wrap{
  width: 330px;
  display: block;
  margin:0 auto;
  text-align: center;
  margin-top:calc(50vh - 71px - 50px - 144px);
}
.search_input{
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>