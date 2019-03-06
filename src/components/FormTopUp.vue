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
        <el-form :model="formTopUp" ref="formTopUp" :rules="rules">

          <el-form-item label="电池数量" :label-width="formLabelWidth" prop="batteryNum">
            <el-input-number 
              v-model="formTopUp.batteryNum" 
              :min="1" 
              :max="9999" 
              @input.native="handleIN"
              >
            </el-input-number>
          </el-form-item>
          <el-form-item label="充值金额" :label-width="formLabelWidth">
            <strong class="amount">{{amount}}</strong>元
          </el-form-item>
          <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-radio-group v-model="formTopUp.payType" size="small">
              <el-radio label="1" border class="pay_radio">支付宝</el-radio>
              <el-radio label="2" border class="pay_radio">微信</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <a :href="payurl" :target="target" @click="handleComfirm('formTopUp')">
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
      rules:{
        batteryNum:[
          {required:true,message:'请输入',trigger:'blur'},
          {type:'integer',message:'请输入一个整数',trigger:'blur'}
        ]
      },
      formTopUp:{
        batteryNum:1,
        payType:'1'
      },
      price:0,
      numTimerCheckTrade:969,

      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      var num=+this.formTopUp.batteryNum;
      if(num===undefined || window.isNaN(num)){
        num=0;
      }
      var objNum=new Number(num*+this.price);
      return (objNum);
    },
    title:function(){
      return ('每颗虚拟电池充值押金 '+this.price+' 元');
    },
    payurl:function(){
      var payurl='javascript:;';
      //validate 是整数
      if(window.Number.isInteger(window.Number(this.formTopUp.batteryNum))){
        var objNum=new Number(this.amount);
        var objSendData={
          phone:''+window.localStorage.agentphone,
          type:1,
          payType:window.Number(this.formTopUp.payType),  //支付类型 1支付宝，2微信
          amount:objNum.toFixed(2),
          batteryNum:window.Number(this.formTopUp.batteryNum),
          agentId:window.sessionStorage.headerid,
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
      } //end if
      

      return (payurl);
    },
    target:function(){
      var target='';
      if(window.Number.isInteger(window.Number(this.formTopUp.batteryNum))){
        target='_blank';
      }
      return target;
    }
  },
  watch:{
    'modalStore.statusTopUp':function(val){
      var vueThis=this;
      if(!val){
        vueThis.formTopUp.batteryNum=1;
        vueThis.formTopUp.payType='1';
        window.clearInterval(vueThis.numTimerCheckTrade);
      }else{
        vueThis.listenTradeCheck();
      }
    }

  },
  methods:{
    rFs:function(){
      var vueThis=this;
      vueThis.formTopUp.batteryNum=1;
      vueThis.formTopUp.payType='1';
      vueThis.$refs.formTopUp.resetFields();
      vueThis.$store.commit('hideTopUp');
    },
    handleCancel:function(){
      this.rFs();
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          vueThis.rFs();
          //跳往支付页面(监听充值状态)，显示是否成功
          vueThis.$store.commit('showStatusTopUp');
          //set item payurl
          window.sessionStorage.setItem('payurl',vueThis.payurl);
        }
      });
    },
    handleIN:function(ev){
      this.formTopUp.batteryNum=ev.target.value;
    },
    listenTradeCheck:function(){
      var vueThis=this;
      vueThis.numTimerCheckTrade=window.setInterval(function(){
        if(window.localStorage && window.localStorage.tradeCheck==='1'){
          window.localStorage.removeItem('tradeCheck');
          vueThis.$store.commit('hideStatusTopUp');
        }
      },900);
    },
    userQuery:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userQuery,function(objRps){
        var objNum=+objRps.result.batteryAmount;
        vueThis.price=objNum.toFixed(2);
      });
    }
  },
  created:function(){
    this.userQuery();
  }
};
</script>

<style lang="css" scoped>
.amount{
  color: #FF6666;
  margin-right: 10px;
}
</style>
