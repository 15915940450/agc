<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.comboBuy"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formComboBuy" ref="vueform" :rules="rules">
          
          <el-form-item label="套餐名称" :label-width="formLabelWidth">
            <strong>{{discount_name}}</strong>
          </el-form-item>

          <el-form-item label="数量(个)" :label-width="formLabelWidth" prop="number">
            <el-input-number 
              v-model="formComboBuy.number" 
              :min="1" 
              :max="9999" 
              @input.native="handleIN"
              >
            </el-input-number>
          </el-form-item>

          <el-form-item label="金额(元)" :label-width="formLabelWidth">
            <strong class="amount">{{amount}}</strong>
          </el-form-item>

          <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-radio-group v-model="formComboBuy.payType" size="small">
              <el-radio label="1" class="pay_radio" border>支付宝</el-radio>
              <el-radio label="2" class="pay_radio" border>微信</el-radio>
            </el-radio-group>
          </el-form-item>


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <a :href="payurl" :target="target" @click="handleComfirm()">
          <el-button type="primary">确 定</el-button>
        </a>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'FormComboBuy',
  props:['agentPrice','name','code'],
  data:function(){
    return ({
      rules:{
        number:[
          {required:true,message:'请输入',trigger:'blur'},
          {type:'integer',message:'请输入一个整数',trigger:'blur'}
        ]
      },
      title:'',
      discount_name:'',
      formComboBuy:{
        number:1,
        payType:'1'
      },
      discountCode:0,
      numTimerCheckTrade:969,
      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      var num=+this.formComboBuy.number;
      if(num===undefined || window.isNaN(num)){
        num=0;
      }
      var objNum=new Number(num*+this.agentPrice);
      return (objNum.toFixed(2));
    },
    payurl:function(){
      var payurl='javascript:;';
      
      if(window.Number.isInteger(window.Number(this.formComboBuy.number))){
        var objNum=new Number(this.amount);
        var objSendData={
          phone:''+window.localStorage.agentphone,
          discountCode:this.discountCode,
          payType:window.Number(this.formComboBuy.payType),  //支付类型 1支付宝，2微信
          number:window.Number(this.formComboBuy.number),
          amount:objNum.toFixed(2),
          discountName:this.discount_name,
          agentId:window.sessionStorage.headerid,
          from:'comboBuy'
        };
        //stringify, then encodeURIComponent
        var yap=window.encodeURIComponent(JSON.stringify(objSendData));

        if(this.formComboBuy.payType==='1'){
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
      }

      return (payurl);
    },
    target:function(){
      var target='';
      if(window.Number.isInteger(window.Number(this.formComboBuy.number))){
        target='_blank';
      }
      return target;
    }
  },
  watch:{
    'modalStore.comboBuy':function(val){
      if(val){
        this.title='请输入数量，每份价格 '+this.agentPrice+' 元';
        this.discount_name=this.name;
        this.discountCode=this.code;
      }
    },
    'modalStore.statusTopUp':function(val){
      var vueThis=this;
      if(!val){
        vueThis.formComboBuy.number=1;
        vueThis.formComboBuy.payType='1';
        window.clearInterval(vueThis.numTimerCheckTrade);
      }else{
        vueThis.listenTradeCheck();
      }
    }
  },
  methods:{
    rFs:function(){
      var vueThis=this;
      vueThis.formComboBuy.number=1;
      vueThis.formComboBuy.payType='1';
      vueThis.$store.commit('hideComboBuy');
    },
    handleCancel:function(){
      this.rFs();
    },
    handleIN:function(ev){
      this.formComboBuy.number=ev.target.value;
    },
    handleComfirm:function(){
      var vueThis=this;
      vueThis.$refs.vueform.validate((valid) => {
        if(valid){
          vueThis.rFs();
          //跳往支付页面(监听充值状态)，显示是否成功
          vueThis.$store.commit('showStatusTopUp');
          //set item payurl
          window.sessionStorage.setItem('payurl',vueThis.payurl);
        }
      });
    },
    listenTradeCheck:function(){
      var vueThis=this;
      vueThis.numTimerCheckTrade=window.setInterval(function(){
        if(window.localStorage && window.localStorage.tradeCheck==='1'){
          window.localStorage.removeItem('tradeCheck');
          vueThis.$store.commit('hideStatusTopUp');
        }
      },900);
    }
  }
};
</script>

<style lang="css" scoped>
  .amount{
    color: #FF6666;
  }
</style>
