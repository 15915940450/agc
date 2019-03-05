<template>
  <div class="table_wrap">
    <h3 class="title">
      <div class="adv">
        <el-input
          class="table_wrap-input_serach"
          @input="imSearch()"
          placeholder="请输入套餐名称"
          v-model="search"
          suffix-icon="el-icon-search"
          >
        </el-input>
        <el-date-picker
          class="table_wrap-input_daterange"
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
      <!-- 表格 -->
      <div class="table_wrap_real">
        <el-table
          :data="users" size="medium" stripe
          class="table_wrap-table"
          width="100%"
          >


          <el-table-column
            label="序号/ID"
            prop="id"
            >
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
  name:'TableCombo',
  data(){
    return ({
      se:[],  //dateragne(start and end)
      search:null,
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
      total:0,
      pickerOptions:{
        disabledDate:function(dateObj){
          return (dateObj.getTime()>_.dateAgo(0).getTime());
        }
      },
      loadingUserList:true,
      pageNum:1
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needShop':function(val){
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
      vueThis.loadingUserList=true;

      var startTime=null;
      var endTime=null;
      if(vueThis.se.length){
        startTime=vueThis.se[0].getTime();
        endTime=vueThis.se[1].getTime();
      }
      var advancedParam=JSON.stringify({
        startTime:startTime,
        endTime:endTime,
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

        if(!vueThis.search && !startTime && !endTime && !vueThis.total){
          vueThis.$store.commit('setEmptyCombo');
        }else{
          vueThis.$store.commit('setCombo');
        }
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (v.slice(0,-2));
          }
        }
      });
    },
    resetSearch:function(){
      this.se=[];
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
    },
    imSearch:_.debounce(function(){
      this.fetchData();
    },690)
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
  .adv{
    float:right;
  }
  .table_wrap-input_serach{
    width:190px;
  }
  .table_wrap-input_daterange{
    position:relative;
    top:1px;
  }
</style>
