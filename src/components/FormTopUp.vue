<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.topUp"
      width="300px"
      :show-close="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formTopUp">
          <el-form-item label="电池数量" :label-width="formLabelWidth">
            <!-- <el-input size="small" v-model="formTopUp.batteryNum" auto-complete="off"></el-input> -->
            <el-input-number v-model="formTopUp.batteryNum" :min="1"></el-input-number>
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
          <!-- 用户手机号,城市,用户群组,返还金额 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleComfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormTopUp',
  data:function(){
    // console.log(JSON.stringify((this.$store.state.modalStore)));
    return ({
      formTopUp:{
        batteryNum:0,
        payType:'1'
      },

      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      return (window.Number(this.modalStore.batteryAmount) * window.Number(this.formTopUp.batteryNum));
    },
    title:function(){
      return ('每颗虚拟电池充值押金 '+this.modalStore.batteryAmount+' 元');
    }
  },
  methods:{
    handleCancel:function(){
      var vueThis=this;
      vueThis.$store.commit('hideTopUp');
    },
    topUp:function(sendData){
      // 充值操作
      var vueThis=this;
      if(window.sessionStorage.agentphone){
        //else:没有用户手机则不发送请求
        ajaxs.imPostJson(urls.topUp,sendData,function(objRps){
          // console.log(objRps);
          if(objRps.code===1000){
            var ecYap=window.encodeURIComponent(JSON.stringify({
              amount:window.Number(vueThis.amount), //pay
              batteryNum:window.Number(vueThis.formTopUp.batteryNum), //pay
              tradeId:''+objRps.result.tradeId, //pay
              qrCode:objRps.result.qrCode //pay
            }));
            //跳往支付页面(监听充值状态)，显示是否成功
            vueThis.$store.commit('hideTopUp');
            vueThis.$store.commit('showStatusTopUp');
            //保存链接到存贮
            var payurl='';

            //pay=>qrCode
            if(vueThis.formTopUp.payType==='1'){
              // 支付宝
              payurl=window.encodeURI('/pay_ali.html?yap='+ecYap);
            }else{
              payurl=window.encodeURI('/pay_wx.html?yap='+ecYap);
            }
            window.sessionStorage.setItem('payurl',payurl);
            window.open(payurl);
          }
        });
      }
    },
    handleComfirm:function(){
      var vueThis=this;
      var yap={
        phone:''+window.sessionStorage.agentphone,
        type:1,
        payType:window.Number(vueThis.formTopUp.payType),  //支付类型 1支付宝，2微信
        amount:window.Number(vueThis.amount), //pay
        batteryNum:window.Number(vueThis.formTopUp.batteryNum), //pay
        status:1
      };
      vueThis.topUp(yap);
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
