<template>
  <div class="table_wrap">
    <h3 class="title">
      用户套餐记录({{userPhone}})
      <div class="adv">
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

        <el-button 
          @click="resetSE()" 
          class="table_wrap-btn_reset" 
          type="warning"
          >
          清空
        </el-button>
      </div>
    </h3>
    <div v-loading="loadingUsercomboList">
      <!-- 表格 -->
      <div class="table_wrap_real">
        <el-table
          :data="usercombo" size="medium" stripe
          class="table_wrap-table"
          width="100%"
          >

          <el-table-column
            label="套餐ID"
            prop="id"
            >
          </el-table-column>
          <el-table-column
            label="套餐名称"
            prop="packageName">
          </el-table-column>
          <el-table-column
            label="套餐类型"
            prop="type">
          </el-table-column>
          <el-table-column
            label="价格(元)"
            prop="price">
          </el-table-column>
          <el-table-column
            label="颗数"
            prop="times">
          </el-table-column>
          <el-table-column
            label="创建日期"
            prop="createTime">
          </el-table-column>
          <el-table-column
            label="结束日期"
            prop="finishTime">
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status">
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
      userPhone:'',
      se:[],  //dateragne(start and end)
      usercombo:[
        // {
        //   "id": "00ac16323a9a48149f0e349681cf8631",
        //   "userName": "张三丰",
        //   "userPhone": "13823791641",
        //   "packageName": "不限量免费骑",
        //   "price": 120.2,
        //   "residue": 10,
        //   "status": "有效",
        //   "type": "次卡",
        //   "createTime": "1500276243000",
        //   "finishTime": "1500276244000",
        //   "times": 100//总次数
        // }
      ],
      total:0,
      pickerOptions:{
        disabledDate:function(dateObj){
          return (dateObj.getTime()>_.dateAgo(0));
        }
      },
      loadingUsercomboList:true,
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
      // vueThis.loadingUsercomboList=false;
      vueThis.loadingUsercomboList=true;

      var startTime=null;
      var endTime=null;
      if(vueThis.se.length){
        startTime=vueThis.se[0].getTime();
        endTime=vueThis.se[1].getTime();
      }
      var advancedParam=JSON.stringify({
        userPhone:vueThis.userPhone,
        startTime:startTime,
        endTime:endTime
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      // return;
      vueThis.$rqs(vueThis.$yApi.userCombo,function(objRps){
        // _.logErr(objRps);
        vueThis.loadingUsercomboList=false;
        vueThis.total=objRps.result.total;
        vueThis.usercombo=objRps.result.list;

        if(!startTime && !endTime && !vueThis.total){
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
    handleCurrentChange:function(val){
      this.pageNum=val;
    },
    resetSE:function(){
      this.se=[];
    }
  },
  created:function(){
    // console.log(this.$route.params.userphone);
    this.userPhone=this.$route.params.userphone;
    this.pageNum=+this.$route.params.pn || 1;
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
