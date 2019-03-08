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

    <section class="im_snow" v-if="!bigAmountHistoryEmpty">
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

      <TableBigAmountHistory :log="log" :loading="loadingData" :pn="pageNum" :total="total" @son-page-num-change="handleCurrentChange" />
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
      total:0,
      loadingData:true,
      log:[],
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
    });
  },
  computed:{
    ...mapState(['agent','modalStore']),
    bigAmountHistoryEmpty:function(){
      return (!this.total);
    }
  },
  watch:{
    // deep watcher
    // 'modalStore.needShop':function(val){
    //   if(!val){
    //     this.fetchData();
    //   }
    // }
  },
  components:{
    TableBigAmountHistory
  },
  methods: {

    handleCurrentChange:function(val){
      this.pageNum=val;
      this.$router.push('/bigamount/history/'+val);
      this.fetchData();
    },
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingData=true;
      var sendData={
        pageSize:vueThis.$yApi.defaultPS,
        pageNum:vueThis.pageNum,
        advancedParam:JSON.stringify({
          id:null
        })
      };
      vueThis.$rqs(vueThis.$yApi.getBigAmountHistory,function(objRps){
        // _.logErr(objRps);
        vueThis.loadingData=false;
        vueThis.total=objRps.result.total;
        console.log(vueThis.total+Math.random());
        vueThis.log=objRps.result.list;
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (v.slice(0,-2));
          }
          if(k==='payType'){
            return (['','','','充值电池押金'][v]);
          }
          if(k==='amount'){
            var objNum=new Number(v);
            return (objNum.toFixed(2));
          }
        }
      });
    }
  },
  created:function(){
    this.fetchData();
  }
};
</script>
<style lang="css" scoped>

</style>