<template lang="html">
  <div class="component_deposit">
    <div v-if="!modalStore.depositEmpty">
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
      <div class="table_with_tab_wrap">
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
        <keep-alive>
          <component
            v-bind:is="('table-'+currentTab)"
            >
          </component>
        </keep-alive>
      </div>
      <!--<TableDeposit />-->
      <!--<TableDepositlog />-->
    </div>

    <!--押金為0-->
    <div v-else class="empty_deposit im_empty_wrap eqcalc">
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
import TableDepositlog from './TableDepositlog.vue';

export default {
  name:'HeartDeposit',
  data() {
    return {
      center:'center',
      currentTab:'deposit',  //deposit,depositlog
      //se:[_.dateAgo(0),_.dateAgo(0)],  //dateragne(start and end)
      card:{
        availableDeposite:'*****',
        refundableDeposit:'*****',
        availableBattery:'*****',
        usedBattery:'*****'
      },
      eyenameDeposit:'eye',
      eyenameRefund:'eye'
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
    'modalStore.needShop':function(val){
      if(!val){
        this.fetchDataCard();
      }
    },
    'modalStore.statusTopUp':function(val){
      if(!val){
        this.fetchDataCard();
      }
    },
    'modalStore.statusRefund':function(val){
      if(!val){
        this.fetchDataCard();
      }
    }
  },
  components:{
    FormTopUp,
    StatusTopUp,
    FormRefund,
    StatusRefund,
    TableDeposit,
    TableDepositlog
  },
  methods: {
    fetchDataCard:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.accountBaseInfo,function(objRps){
        vueThis.card.availableDeposite=objRps.result.availableDeposite;
        vueThis.card.refundableDeposit=objRps.result.refundableDeposit;
        vueThis.card.availableBattery=objRps.result.availableBattery;
        vueThis.card.usedBattery=objRps.result.usedBattery;
      });
    },
    handleTopUp:function(){
      this.$store.commit('showTopUp');
    },
    handleRefund:function(){
      this.$store.commit('showRefund');
    },
    switchEye:function(iconName){
      this[iconName]=this[iconName]==='eye'?'eye-slash':'eye';
    }
  },
  created:function(){
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
  .table_with_tab_wrap{
    position:relative;
  }
  .tab_wrap{
    position:absolute;
    left:15px;
    top:0;
  }
</style>
