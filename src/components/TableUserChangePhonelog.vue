<template>
  <div class="table_wrap">
    <div v-loading="loadingData">
      <div class="table_wrap_real">
        <el-table
          :data="log"
          size="medium"
          stripe
          class="table_wrap-table"
          width="100%"
          >


          <el-table-column
            label="ID"
            prop="id"
            width="90"
            >
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="createTime"
            >
          </el-table-column>
          <el-table-column
            label="用户ID"
            prop="agentId"
            >
          </el-table-column>
          <el-table-column
            label="旧手机号码"
            prop="oldPhone"
            >
          </el-table-column>
          <el-table-column
            label="新手机号码"
            prop="newPhone"
            >
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
  name:'TableUserChangePhonelog',
  data:function(){
    return ({
      total:5,
      changePhoneHistoryEmpty:true,
      loadingData:true,
      log:[
        /*
        {
          "id":1, //id
          "oldPhone": "15820480937", // 老用户电话
          "newPhone": "15826519061", // 新用户电话
          "agentId": 155,// 代理商id
          "createTime": 1532679890000, //时间搓
          "userId": 1// 用户id
        }
        */
      ],
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
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
    pageNum:function(){
      this.fetchData();
    }
  },
  methods:{
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingData=true;
      var sendData={
        pageSize:vueThis.$yApi.defaultPS,
        pageNum:vueThis.pageNum
      };
      vueThis.$rqs(vueThis.$yApi.changePhoneLog,function(objRps){
        vueThis.loadingData=false;
        vueThis.total=objRps.result.total;
        vueThis.log=objRps.result.list;
        if(!vueThis.total){
          vueThis.$store.commit('setEmptyChangePhoneLog');
        }else{
          vueThis.$store.commit('setChangePhoneLog');
        }
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (_.toSlash(v).slice(0,19));
          }
        }
      });
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      this.$router.push('/user/changephonehistory/'+val);
    }
  },
  created:function(){
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
</style>
