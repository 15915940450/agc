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
      <!-- 用户列表表格 -->
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
            label="手机号码"
            prop="phone">
          </el-table-column>
          <el-table-column
            label="套餐剩余(份)"
            prop="remainNumber">
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
  name:'TableCombolog',
  data(){
    return ({
      se:[],  //dateragne(start and end)
      search:null,
      users:[
        /*
        {
    			"id": 1, //ID
    			"createTime": 1512104184000, //操作时间
    			"phone": "13823791641", //被操作人手机号码
    			"discountName": "租一颗电池 ￥999一颗",
    			"remainNumber": 123, //剩余份数
    			"number":1//分配数量
	    	}
        */
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
      vueThis.$rqs(vueThis.$yApi.comboLog,function(objRps){
        // _.logErr(objRps);
        vueThis.loadingUserList=false;
        vueThis.total=objRps.result.total;
        vueThis.users=objRps.result.list;
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (_.toSlash(v).slice(0,19));
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
      this.isNotSearch=false;
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
