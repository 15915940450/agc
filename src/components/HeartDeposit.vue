<template lang="html">
  <div class="component_deposit">
    <div v-if="(deposit.length || loadingDepositList)">
      <el-row :gutter="10">

        <!-- 押金 -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="16">
                <div class="left_part">
                  <div>我的押金(元)</div>
                  <p>{{eyeDeposit}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="right_part">
                  <div>
                    <a href="javascript:;" class="im_card-top_up" @click="handleTopUp()">充值</a>
                  </div>
                  <p>
                    <a href="javascript:;" @click="switchEye('eyenameDeposit')" class="eye_icon_wrap">
                      <icon :name="eyenameDeposit" scale="1.3"></icon>
                    </a>
                  </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 可退押金 -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="16">
                <div class="left_part">
                  <div>可退押金(元)</div>
                  <p>{{eyeRefund}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="right_part">
                  <div>
                    <a href="javascript:;" class="im_card-refund" @click="handleRefund()">退款</a>
                  </div>
                  <p>
                    <a href="javascript:;" @click="switchEye('eyenameRefund')" class="eye_icon_wrap">
                      <icon :name="eyenameRefund" scale="1.3"></icon>
                    </a>
                  </p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 可用电池数(个) -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="24">
                <div class="left_part">
                  <div>可用电池数(个)</div>
                  <p>{{card.availableBattery}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 已用电池数(个) -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="24">
                <div class="left_part">
                  <div>已用电池数(个)</div>
                  <p>{{card.usedBattery}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>

      </el-row>

      <div class="table_wrap">
        <h3 class="title">押金记录</h3>
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
                prop="type" :formatter="formatter">
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
                prop="status" :formatter="formatter">
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="table_wrap_pagination">
            <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>
    <div v-if="(!deposit.length && !loadingDepositList)" class="empty_deposit im_empty_wrap eqcalc">
      <h3 class="title">我的押金</h3>
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/deposit_empty.jpeg" />
        <p class="im_empty_p">您还没有押金哦！</p>
        <el-button type="primary" @click="handleTopUp()">充值</el-button>
      </div>
    </div>

    <!-- 充值模态 -->
    <FormTopUp />
    <StatusTopUp />
    <FormRefund :refundable-deposit="card.refundableDeposit" />
    <StatusRefund />
  </div>
</template>

<script>
import {mapState} from 'vuex';
import FormTopUp from './FormTopUp.vue';
import StatusTopUp from './StatusTopUp.vue';
import FormRefund from './FormRefund.vue';
import StatusRefund from './StatusRefund.vue';

export default {
  name:'HeartDeposit',
  data() {
    return {
      center:'center',
      total:0,
      deposit:[],
      loadingDepositList:true,
      card:{
        availableDeposite:'*****',
        refundableDeposit:'*****',
        availableBattery:'*****',
        usedBattery:'*****'
      },
      eyenameDeposit:'eye',
      eyenameRefund:'eye',

      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1),
      statusZHType:['','充值','退款'], //押金类型 1充值，2退款
      statusZH:['','待确认','成功','待审核','已拒绝','待退款','已退款','失败','已拒绝']
    };
  },
  computed:{
    ...mapState(['agent','modalStore']),
    eyeDeposit:function(){
      return (this.eyenameDeposit==='eye-slash'?this.card.availableDeposite:'*****');
    },
    eyeRefund:function(){
      return (this.eyenameRefund==='eye-slash'?this.card.refundableDeposit:'*****');
    }
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
        this.fetchDataCard();
      }
    },
    'modalStore.statusTopUp':function(val){
      if(!val){
        this.fetchData();
        this.fetchDataCard();
      }
    },
    'modalStore.statusRefund':function(val){
      if(!val){
        this.fetchData();
        this.fetchDataCard();
      }
    },
    pageNum:function(){
      this.fetchData();
    }
  },
  components:{
    FormTopUp,
    StatusTopUp,
    FormRefund,
    StatusRefund
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingDepositList=true;
      var sendData={
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
        }
      });
    },
    fetchDataCard:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.accountBaseInfo,function(objRps){
        vueThis.card.availableDeposite=objRps.result.availableDeposite;
        vueThis.card.refundableDeposit=objRps.result.refundableDeposit;
        vueThis.card.availableBattery=objRps.result.availableBattery;
        vueThis.card.usedBattery=objRps.result.usedBattery;
      });
    },
    formatter:function(row, column, cellValue){
      if(column.property==='type'){
        return (this.statusZHType[cellValue]);
      }
      if(column.property==='status'){
        return (this.statusZH[cellValue]);
      }
    },
    handleTopUp:function(){
      this.$store.commit('showTopUp');
    },
    handleRefund:function(){
      this.$store.commit('showRefund');
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      this.$router.push('/deposit/'+val);
    },
    switchEye:function(iconName){
      this[iconName]=this[iconName]==='eye'?'eye-slash':'eye';
    }
  },
  created:function(){
    this.fetchData();
    this.fetchDataCard();
  }
};
</script>

<style lang="css" scoped>
  .im_card{
    background: #FFF;
    max-height: 88px;
    height: 88px;
    padding: 15px;
    border-radius: 5px;
    box-sizing:border-box;
    box-shadow:2px 0px 8px rgba(204,204,204,1);
  }
  .left_part p{
    /*font-family:Arial;*/
    font-size: 22px;
    margin: 14px 0 0 0;
  }
  .right_part{
    text-align: right;
  }

  .table_wrap{
    background: #FFF;
    margin-top: 10px;
    min-height: calc(100vh - 252px);
  }
</style>
