<template>
  <div class="table_wrap">
    <h3 class="title">
      <div class="table_wrap-search">
        <div class="table_wrap-search_wrap">
          <el-input @input="imSearch()" class="table_wrap-input_serach" placeholder="请输入套餐名称" v-model="search" suffix-icon="el-icon-search"></el-input>
        </div>
      </div>
      <div class="time_range">
        <el-date-picker
          v-model="se"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          >
        </el-date-picker>
        <el-button @click="resetSearch()" class="table_wrap-btn_reset" type="warning">重置</el-button>
      </div>
    </h3>
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


      <div class="table_wrap_pagination" v-show="total">
        <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" @current-change="handleCurrentChange">
          <!-- 分页 -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'TableDeposit',
  data(){
    return ({
      deposit:[],
      se:[],  //dateragne(start and end)
      arrFilterType:[
        {text:'分配',value:1},
        {text:'回收',value:2}
      ],
      type:null,
      total:0,
      pickerOptions:{
        disabledDate:function(dateObj){
          return (dateObj.getTime()>_.dateAgo(0));
        }
      },
      loadingDepositLog:true,
      pageNum:1
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    },
    'modalStore.statusTopUp':function(val){
      if(!val){
        this.fetchData();
      }
    },
    'modalStore.statusRefund':function(val){
      if(!val){
        this.fetchData();
      }
    },
    se:{
      handler:function(){
        this.fetchData();
      }
    },
    pageNum:function(){
      this.fetchData();
    }
  },
  methods:{
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingDepositLog=true;

      var startTime=null;
      var endTime=null;
      if(vueThis.se.length){
        startTime=vueThis.se[0].getTime();
        endTime=vueThis.se[1].getTime();
      }
      var sendData={
        advancedParam:JSON.stringify({
          startTime:startTime,
          endTime:endTime,
          type:vueThis.type  //1-分配押金 2-回收押金
        }),
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      vueThis.$rqs(vueThis.$yApi.depositLog,function(objRps){
        vueThis.loadingDepositLog=false;
        vueThis.total=objRps.result.total;
        vueThis.deposit=objRps.result.list;
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (_.toSlash(new Date(window.Number(v)),{T:false}).slice(0,19));
          }
          if(k==='type'){
            return (['','分配','回收'][v]);
          }
        }
      });
    },
    resetSearch:function(){
      this.se=[];
    },
    handleFilterType:function(obj){
      var vueThis=this;
      var sumType=(_.sum(Object.values(obj)[0])); //0,1,2
      if(sumType===1 || sumType===2){
        vueThis.type=sumType;
      }else{
        vueThis.type=null;
      }
      vueThis.fetchData();
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
    }
  },
  created:function(){
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
  .table_wrap{
    background: #FFF;
    margin-top: 10px;
    min-height: calc(100vh - 252px);
  }
  .time_range{
    float:right;
  }
</style>
