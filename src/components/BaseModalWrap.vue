<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="新建用户"
      :visible.sync="modalStore.newUser"
      width="30%"
      center>
      <div class="modal_wrap-body">
        <el-form :model="baseModalForm">
          <el-form-item label="电动车SN" :label-width="formLabelWidth">
            <el-input size="small" v-model="baseModalForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="车类型" :label-width="formLabelWidth">
            <el-select size="small" v-model="baseModalForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 用户手机号,城市,用户群组,返还金额 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="modalStore.newUser = false">取 消</el-button>
        <el-button size="small" type="primary" @click="modalStore.newUser = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'BaseModalWrap',
  data:function(){
    // console.log(JSON.stringify((this.$store.state.modalStore)));
    // {"needLogin":false,"newUser":true}
    return ({
      baseModalForm:{
        name:'',
        region:''
      },
      formLabelWidth:'80px'
    });
  },
  computed:{
    // needLogin:function(){
    //   return this.$store.state.modalStore.needLogin;
    // },
    // newUser:function(){
    //   return this.$store.state.modalStore.newUser;
    // }
    ...mapState(['modalStore'])
  }
};
</script>

<style lang="css" scoped>
</style>
