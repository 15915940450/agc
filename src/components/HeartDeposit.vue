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
        <!-- 可用虚拟电池数(个) -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="24">
                <div class="left_part">
                  <div>可用虚拟电池数(个)</div>
                  <p>{{card.availableBattery}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 已用虚拟电池数(个) -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="24">
                <div class="left_part">
                  <div>已用虚拟电池数(个)</div>
                  <p>{{card.usedBattery}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>

      </el-row>

      <!--記錄表格-->
      <TableDeposit />
    </div>

    <!--押金為0-->
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
import TableDeposit from './TableDeposit.vue';

export default {
  name:'HeartDeposit',
  data() {
    return {
      activeTabName:'deposit',
      center:'center',
      pickerOptions:{
        disabledDate:function(dateObj){
          return (dateObj.getTime()>_.dateAgo(0));
        }
      },
      se:[],  //dateragne(start and end)
      //se:[_.dateAgo(0),_.dateAgo(0)],  //dateragne(start and end)
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
    se:{
      // deep:true,
      handler:function(){
        this.fetchData();
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
    StatusRefund,
    TableDeposit
  },
  methods: {
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
    handleTabClick:function(tab,event){
      //console.log(tab);
      console.log(this.activeTabName);
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

  .tab_wrap{
    float:left;
  }
  .time_range{
    float:right;
  }
</style>
