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
            <strong class="amount">{{amount}}</strong>元
          </el-form-item>
          <el-form-item label="车类型" :label-width="formLabelWidth">
            <el-select size="small" v-model="formTopUp.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 用户手机号,城市,用户群组,返还金额 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel()">取 消</el-button>
        <el-button size="small" type="primary" @click="handleComfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'FormTopUp',
  data:function(){
    // console.log(JSON.stringify((this.$store.state.modalStore)));
    return ({
      formTopUp:{
        batteryNum:0,
        region:''
      },

      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      return (window.Number(this.modalStore.batteryAmount) * window.Number(this.formTopUp.batteryNum)).toFixed(2);
    },
    title:function(){
      return ('每颗虚拟电池充值押金 '+this.modalStore.batteryAmount+' 元');
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
