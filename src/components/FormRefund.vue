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
        <el-form :model="formRefund" ref="vueform" :rules="rules">
          <el-form-item label="退还数量" :label-width="formLabelWidth" prop="batteryNum">
            <el-input-number 
              v-model="formRefund.batteryNum" 
              :min="1" 
              :max="max" 
              @input.native="handleIN"
              >
            </el-input-number>
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
      rules:{
        batteryNum:[
          {required:true,message:'请输入',trigger:'blur'},
          {type:'integer',message:'请输入一个整数',trigger:'blur'}
        ]
      },
      price:0,
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
      var num=+this.formRefund.batteryNum;
      if(num===undefined || window.isNaN(num)){
        num=0;
      }
      var objNum=new Number(num*+this.price);
      return (objNum.toFixed(2));
    },
    max:function(){
      return Math.floor(this.refundableDeposit/this.price);
    },
    title:function(){
      return ('每个虚拟电池退还押金 '+this.price+' 元');
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
    handleComfirm:_.debounce(function() {
      var vueThis=this;
      vueThis.$refs.vueform.validate((valid) => {
        if(valid){
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
        }
      });
    }, 1000),
    handleIN:function(ev){
      this.formRefund.batteryNum=ev.target.value;
    },
    userQuery:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userQuery,function(objRps){
        var objNum=new Number(+objRps.result.batteryAmount);
        vueThis.price=objNum.toFixed(2);
      });
    }
  },  //methods
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
