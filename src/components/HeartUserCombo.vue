<template lang="html">
  <div class="component_usercombo">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">
          <small>群组管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>查看用户</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>用户套餐记录</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <section class="usercombo_list">
      <TableUsercombo />
    </section>

  </div>
</template>
<script>
import {mapState} from 'vuex';
import TableUsercombo from './TableUsercombo.vue';

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
    // 'modalStore.needLogin':function(val){
    //   if(!val){
    //     this.fetchData();
    //   }
    // }
  },
  components:{
    TableUsercombo
  },
  methods: {
  },
  created:function(){
  }
};
</script>
<style lang="css">

</style>