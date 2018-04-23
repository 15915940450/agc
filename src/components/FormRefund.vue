<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.refund"
      width="300px"
      :show-close="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formRefund">
          <el-form-item label="退还数量" :label-width="formLabelWidth">
            <!-- <el-input size="small" v-model="formRefund.batteryNum" auto-complete="off"></el-input> -->
            <el-input-number v-model="formRefund.batteryNum" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="退还金额" :label-width="formLabelWidth">
            <strong class="amount">{{amount.toFixed(2)}}</strong>元
          </el-form-item>
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
  name:'FormRefund',
  data:function(){
    // console.log(JSON.stringify((this.$store.state.modalStore)));
    return ({
      formRefund:{
        batteryNum:0
      },

      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      return (window.Number(this.modalStore.batteryAmount) * window.Number(this.formRefund.batteryNum));
    },
    title:function(){
      return ('每个虚拟电池退还押金 '+this.modalStore.batteryAmount+' 元');
    }
  },
  methods:{
    handleCancel:function(){
      var vueThis=this;
      vueThis.$store.commit('hideRefund');
    },
    handleComfirm:function(){
      var vueThis=this;
      var sendRefund={
        phone:''+window.sessionStorage.agentphone,
        type:2,
        batteryNum:window.Number(vueThis.formRefund.batteryNum), //pay
        amount:window.Number(vueThis.amount), //pay
        status:3
      };
      ajaxs.imPostJson(urls.refund,sendRefund,function(objRps){
        if(objRps.code===1000){
          vueThis.$store.commit('hideRefund');
          vueThis.$store.commit('showStatusRefund');
        }
      });
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
