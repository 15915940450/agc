<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="创建群组"
      :visible.sync="modalStore.groupCreate"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formGroupCreate">
          <el-form-item label="电动车SN" :label-width="formLabelWidth">
            <el-input v-model="formGroupCreate.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="车类型" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 用户手机号,城市,用户群组,返还金额 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.groupCreate = false">取 消</el-button>
        <el-button type="primary" @click="modalStore.groupCreate = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'DemoModal',
  data:function(){
    return ({
      formGroupCreate:{
        name:'',
        region:''
      },
      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  }
};
</script>

<style lang="css" scoped>
</style>
