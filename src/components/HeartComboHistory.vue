<template lang="html">
  <!-- this page is copy from heartuser -->
  <div class="component_user">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/combo' }">
          <small>套餐管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>购买记录</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="user_list" v-if="(users.length || !isNotSearch || loadingUserList)">
      <!--記錄表格-->
      <div class="table_with_tab_wrap">
        <div class="tab_wrap">
          <template>
            <el-tabs v-model="currentTab">
              <el-tab-pane label="套餐记录" name="combo">
              </el-tab-pane>
              <el-tab-pane label="分配记录" name="combolog">
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
        <keep-alive>
          <component
            v-bind:is="('table-'+currentTab)"
            >
          </component>
        </keep-alive>
      </div>
    </div>

    <!-- empty -->
    <div v-if="(!users.length && isNotSearch && !loadingUserList)" class="empty_user im_empty_wrap">
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/empty_combo_his.png" />
        <p class="im_empty_p">暂无购买记录.</p>
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex';
import TableCombo from './TableCombo.vue';
import TableCombolog from './TableCombolog.vue';

export default {
  name:'HeartComboHistory', /* HeartComboHistory is copy from HeartUser */
  data:function(){
    return ({
      currentTab:'combo',
      total:0,
      search:null,
      isNotSearch:true,

      users:[
        // {
        //     "discountName":"欢电套餐", //套餐名
        //     "price":"6", // 单价
        //     "amount":"12", // 付款价格
        //     "number":"2", // 数量
        //     "createTime":"2018-06-06 09:53:57", // 时间
        //     "phone":"15820480937", // 电话
        //     "status":"1" // 状态  1待确认 2 成功 ，3失败

        // }
      ],
      loadingUserList:true,
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    pageNum:function(){
      this.fetchData();
    },
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingUserList=true;
      var advancedParam=JSON.stringify({
        discountName:vueThis.search || null
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      vueThis.$rqs(vueThis.$yApi.comboHistory,function(objRps){
        // _.logErr(objRps);
        vueThis.loadingUserList=false;
        vueThis.total=objRps.result.total;
        vueThis.users=objRps.result.list;
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (v.slice(0,-2));
          }
        }
      });
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      this.$router.push('/combo/history/'+val);
    },
    imSearch:_.debounce(function(){
      this.isNotSearch=false;
      this.fetchData();
    },690)
  },
  created:function(){
    this.fetchData();
    // console.log(this.$route.params);
  }
};
</script>

<style lang="css" scoped>
  .user_list{
    background: #FFF;
  }
</style>
