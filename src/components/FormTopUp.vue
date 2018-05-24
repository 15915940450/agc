<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.topUp"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formTopUp" ref="formTopUp">

          <el-form-item label="电池数量" :label-width="formLabelWidth">
            <!-- <el-input size="small" v-model="formTopUp.batteryNum" auto-complete="off"></el-input> -->
            <el-input-number v-model="formTopUp.batteryNum" :min="1" @input.native="handleIN"></el-input-number>
          </el-form-item>
          <el-form-item label="充值金额" :label-width="formLabelWidth">
            <strong class="amount">{{amount.toFixed(2)}}</strong>元
          </el-form-item>
          <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-radio-group v-model="formTopUp.payType" size="small">
              <el-radio label="1" border>支付宝</el-radio>
              <el-radio label="2" border>微信</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <a :href="payurl" target="_blank" @click="handleComfirm()">
          <el-button type="primary">确 定</el-button>
        </a>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'FormTopUp',
  data:function(){
    return ({
      formTopUp:{
        batteryNum:1,
        payType:'1'
      },
      numTimerCheckTrade:969,

      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      var num=this.formTopUp.batteryNum;
      if(num===undefined){
        num=0;
      }
      return (window.Number(this.modalStore.batteryAmount) * window.Number(num));
    },
    title:function(){
      return ('每颗虚拟电池充值押金 '+this.modalStore.batteryAmount+' 元');
    },
    payurl:function(){
      var payurl='';
      var objSendData={
        phone:''+window.localStorage.agentphone,
        type:1,
        payType:window.Number(this.formTopUp.payType),  //支付类型 1支付宝，2微信
        amount:window.Number(this.amount),
        batteryNum:window.Number(this.formTopUp.batteryNum),
        status:1
      };
      //stringify, then encodeURIComponent
      var yap=window.encodeURIComponent(JSON.stringify(objSendData));

      if(this.formTopUp.payType==='1'){
        payurl=window.encodeURI('/pay_ali.html?yap='+yap);
      }else{
        payurl=window.encodeURI('/pay_wx.html?yap='+yap);
      }
      /*==payurl
      /pay_ali.html?yap=%257B%2522phone%2522%253A%252215915900000%2522%252C%2522type%2522%253A1%252C%2522payType%2522%253A1%252C%2522amount%2522%253A0.5%252C%2522batteryNum%2522%253A1%252C%2522status%2522%253A1%257D
      */
      if(window.location.hostname==='localhost'){
        // http://localhost/agc/dist/pay_ali.html
        payurl='http://localhost/agc/dist'+payurl;
      }

      return (payurl);
    }
  },
  watch:{
    'modalStore.statusTopUp':function(val){
      if(!val){
        this.formTopUp.batteryNum=1;
        this.formTopUp.payType='1';
        window.clearInterval(this.numTimerCheckTrade);
      }else{
        this.listenTradeCheck();
      }
    }
  },
  methods:{
    handleCancel:function(){
      var vueThis=this;
      vueThis.formTopUp.batteryNum=1;
      vueThis.formTopUp.payType='1';
      vueThis.$store.commit('hideTopUp');
    },
    handleComfirm:function(){
      var vueThis=this;
      //跳往支付页面(监听充值状态)，显示是否成功
      vueThis.$store.commit('hideTopUp');
      vueThis.$store.commit('showStatusTopUp');
      //set item payurl
      window.sessionStorage.setItem('payurl',vueThis.payurl);
    },
    handleIN:function(ev){
      this.formTopUp.batteryNum=ev.target.value;
    },
    listenTradeCheck:function(){
      var vueThis=this;
      vueThis.numTimerCheckTrade=window.setInterval(function(){
        if(window.sessionStorage && window.sessionStorage.tradeCheck==='1'){
          window.sessionStorage.removeItem('tradeCheck');
          vueThis.$store.commit('hideStatusTopUp');
          window.clearInterval(vueThis.numTimerCheckTrade);
        }
      },900);
    }
  }
};
</script>

<style lang="css" scoped>
.amount{
  color: #FF6666;
  margin-right: 10px;
}
</style>
