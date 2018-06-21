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
      <!-- table wrap -->
      <div class="table_wrap">
        <el-row>
          <el-col :span="6">
            <h3 class="title">购买记录</h3>
          </el-col>
          <el-col :span="18">
            <div class="table_wrap-search">
              <div class="table_wrap-search_wrap">
                <el-input @input="imSearch()" class="table_wrap-input_serach" placeholder="请输入套餐名称" v-model="search" suffix-icon="el-icon-search"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <div v-loading="loadingUserList">
          <!-- v-loading="loadingUserList" -->
          <!-- 用户列表表格 -->
          <div class="table_wrap_real">
            <el-table
              :data="users" size="medium" stripe
              class="table_wrap-table"
              width="100%"
              >


              <el-table-column
                label="#"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                label="时间"
                prop="createTime">
              </el-table-column>
              <el-table-column
                label="套餐名称"
                prop="discountName">
              </el-table-column>
              <el-table-column
                label="数量(个)"
                prop="number">
              </el-table-column>
              <el-table-column
                label="单价(元)"
                prop="price">
              </el-table-column>
              <el-table-column
                label="金额(元)"
                prop="amount">
              </el-table-column>

            </el-table>
          </div>
          

          <div class="table_wrap_pagination">
            <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" @current-change="handleCurrentChange">
              <!-- 分页 -->
            </el-pagination>
          </div>
        </div>

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

export default {
  name:'HeartComboHistory', /* HeartComboHistory is copy from HeartUser */
  data:function(){
    return ({
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
