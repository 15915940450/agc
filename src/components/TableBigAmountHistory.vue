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
            label="申请时间"
            prop="createTime"
            >
          </el-table-column>
          <el-table-column
            label="业务类型"
            prop="payType"
            >
          </el-table-column>
          <el-table-column
            label="申请金额(元)"
            prop="amount"
            >
          </el-table-column>
          <el-table-column
            label="状态"
            >
            <template slot-scope="scope">
              <span 
                :class="scope.row.checkStatus | statusNum"
                >
                {{scope.row.checkStatus | statusZh}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
              <el-button type="text" @click="toDetail(scope.row.id)">查看</el-button>
            </template>

            
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
  name:'TableBigAmountHistory',
  data:function(){
    return ({
      total:0,
      loadingData:true,
      log:[
        /*
        {
            "id":123,  // 押金id
            "payType":3, //3大额支付 充值电池押金
            "amount":42132, // 申请金额
            "batteryNum":23,   //购买电池数
            "checkStatus":1,  //0 待审批,1同意,2拒绝
            "remark":"好的", //备注
            "attachment": "http://imgcn.immotor.com/power/power/img/1509614587556filename.jpg", //附件
            "cityName":"深圳市", //城市名
            "agentCompany":"深圳", //代理名公司
            "actualPayer":"深圳市万年青有限公司", //实际付款人
            "payVoucher":"http://imgcn.immotor.com/power/power/img/1509614587556filename.jpg", //付款凭单
            "price":23, //单价
            "createTime":"2018-3-9 22:11:33.0" //创建时间
        }
        */
      ],
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  filters:{
    statusZh:function(v){
      return (['待审核','同意','拒绝'][v]);
    },
    statusNum:function(v){
      return ('status'+v);
    }
  },
  watch:{
    'modalStore.needShop':function(val){
      if(!val){
        this.fetchData();
      }
    },
		'modalStore.bigAmountHistoryEmpty':function(val){
		  if(!val){
		    this.fetchData();
		  }
		}
  },
  methods:{
    toDetail:function(id){
      this.$router.push({
        path:'/bigamount/'+id
      });
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
        vueThis.log=objRps.result.list;
        if(!vueThis.total){
          vueThis.$store.commit('setEmptyBigAmountHistory');
        }else{
          vueThis.$store.commit('setBigAmountHistory');
        }
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='createTime'){
            return (v.slice(0,-2));
          }
          if(k==='payType'){
            return (['','','','充值电池押金'][v]);
          }
          // if(k==='checkStatus'){
          //   return (['待审核','同意','拒绝'][v]);
          // }
        }
      });
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      this.$router.push('/bigamount/history/'+val);
      this.fetchData();
    }
  },
  created:function(){
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
.status0{
}
.status1{
  color:#41b883;
}
.status2{
  color:#fb654c;
}
</style>
