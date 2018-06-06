<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.refund"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formRefund">
          <el-form-item label="退还数量" :label-width="formLabelWidth">
            <el-input-number v-model="formRefund.batteryNum" :min="1" :max="max" @input.native="handleIN"></el-input-number>
          </el-form-item>
          <el-form-item label="退还金额" :label-width="formLabelWidth">
            <strong class="amount">{{amount}}</strong>元
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleComfirm()" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'FormRefund',
  data:function(){
    // console.log(JSON.stringify((this.$store.state.modalStore)));
    return ({
      formRefund:{
        batteryNum:1
      },
      loading:false,

      formLabelWidth:'80px'
    });
  },
  props:['refundableDeposit'],
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      var num=this.formRefund.batteryNum;
      if(num===undefined){
        num=0;
      }
      return (window.Number(this.modalStore.batteryAmount) * window.Number(num)).toFixed(2);
    },
    max:function(){
      return Math.floor(this.refundableDeposit/this.modalStore.batteryAmount);
    },
    title:function(){
      return ('每个虚拟电池退还押金 '+this.modalStore.batteryAmount+' 元');
    }
  },
  watch:{
    'modalStore.statusRefund':function(val){
      if(!val){
        this.formRefund.batteryNum=1;
      }
    }
  },
  methods:{
    handleCancel:function(){
      var vueThis=this;
      vueThis.formRefund.batteryNum=1;
      vueThis.$store.commit('hideRefund');
    },
    handleComfirm:function(){
      var vueThis=this;
      vueThis.loading=true;
      var sendRefund={
        type:2,
        batteryNum:window.Number(vueThis.formRefund.batteryNum), //pay
        amount:vueThis.amount, //pay
        status:3
      };
      vueThis.$rqs(vueThis.$yApi.tradeRefund,function(){
        vueThis.$store.commit('hideRefund');
        vueThis.$store.commit('showStatusRefund');
      },{
        objSendData:sendRefund
      });
    },
    handleIN:function(ev){
      this.formRefund.batteryNum=ev.target.value;
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
