<template lang="html">
  <div class="component_bigamounthistory">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/bigamount' }">
          <small>大额充值</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>申请记录</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <section class="im_snow" v-if="!modalStore.changePhoneLogEmpty">
      <div class="im_snow_title">
        <el-row>
          <el-col :span="6">
            <h3 class="title">申请记录</h3>
          </el-col>
          <el-col :span="18">
            <div class="title_link">
            </div>
          </el-col>
        </el-row>
      </div>

      <TableBigAmountHistory />
    </section>

    <!-- empty -->
    <div class="im_snow" v-else>
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/empty_combo_his.png" />
        <p class="im_empty_p">暂无申请记录.</p>
      </div>
    </div>

  </div>
</template>
<script>
import {mapState} from 'vuex';
import TableBigAmountHistory from './TableBigAmountHistory.vue';

export default {
  name:'HeartBigAmountHistory',
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
    TableBigAmountHistory
  },
  methods: {
  },
  created:function(){
  }
};
</script>
<style lang="css" scoped>

</style>