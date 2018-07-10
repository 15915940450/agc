<template>
  <div class="table_wrap">
    <h3 class="title">
      <div class="tab_wrap">
        <template>
          <el-tabs v-model="currentTab">
            <el-tab-pane label="押金记录" name="deposit">
            </el-tab-pane>
            <el-tab-pane label="分配记录" name="depositlog">
            </el-tab-pane>
          </el-tabs>
        </template>
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
    <div v-loading="loadingDepositList">
      <!-- 押金记录表格 -->
      <div class="table_wrap_real">
        <el-table
          :data="deposit" stripe
          style="width: 100%" class="table_wrap-table" size="medium">
          <!-- medium / small / mini -->
          <el-table-column
            label="ID"
            prop="tradeId"
            width="190"
            >
          </el-table-column>
            <el-table-column
              label="时间"
              width="170"
              >
              <template slot-scope="scope">
                <span v-html="scope.row.createTime"></span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              prop="type"
              >
            </el-table-column>
            <el-table-column
              label="金额(元)"
              prop="amount">
            </el-table-column>
            <el-table-column
              label="数量(个)"
              prop="batteryNum">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              >
            </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="table_wrap_pagination">
        <el-pagination
           :background="true"
           layout="total,->,jumper,prev,pager,next"
           :total="total"
           :current-page="pageNum"
           @current-change="handleCurrentChange"
           >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'TableDeposit',
  data(){
    return ({
      currentTab:'deposit',
      deposit:[],
      se:[],  //dateragne(start and end)
      total:0,
      pickerOptions:{
        disabledDate:function(dateObj){
          return (dateObj.getTime()>_.dateAgo(0));
        }
      },
      loadingDepositList:true,
      pageNum:1
    });
  },
  watch:{
    se:{
      handler:function(){
        this.fetchData();
      }
    },
    pageNum:function(){
      this.fetchData();
    },
    currentTab:function(val){
      console.log(val);
    }
  },
  methods:{
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingDepositList=true;

      var startTime=null;
      var endTime=null;
      if(vueThis.se.length){
        startTime=vueThis.se[0].getTime();
        endTime=vueThis.se[1].getTime();
      }
      var sendData={
        startTime:startTime,
        endTime:endTime,
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      vueThis.$rqs(vueThis.$yApi.depositList,function(objRps){
        vueThis.loadingDepositList=false;
        vueThis.total=objRps.result.total;
        vueThis.deposit=objRps.result.list;
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (v.slice(0,-2));
          }
          if(k==='type'){
            return (['','充值','退款'][v]);
          }
          if(k==='status'){
            return (['','待确认','成功','待审核','已拒绝','待退款','已退款','失败','已拒绝'][v]);
          }
        }
      });
    },
    resetSearch:function(){
      this.se=[];
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
  .tab_wrap{
    float:left;
  }
  .time_range{
    float:right;
  }
</style>
