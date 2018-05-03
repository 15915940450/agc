<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="用户设置"
      :visible.sync="modalStore.setUser"
      width="390px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formSetUser">

          <el-form-item label="群组" :label-width="formLabelWidth">
            <el-input v-model="formSetUser.name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="免费天数" :label-width="formLabelWidth">
            <el-input v-model="formSetUser.name" auto-complete="off" placeholder="剩余可分配天数 100 天"></el-input>
          </el-form-item>
          <el-form-item label="可用电池数" :label-width="formLabelWidth">
            <el-input v-model="formSetUser.name" auto-complete="off" placeholder="剩余可分配天数 100 天"></el-input>
          </el-form-item>
          <el-form-item label="电动车" :label-width="formLabelWidth">
            <el-input v-model="formSetUser.name" auto-complete="off" placeholder="剩余可分配天数 100 天"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.setUser = false">取 消</el-button>
        <el-button type="primary" @click="modalStore.setUser = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'FormSetUser',
  data:function(){
    return ({
      formSetUser:{
        name:'',
        region:''
      },
      formLabelWidth:'100px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  }
};
</script>

<style lang="css" scoped>
</style>
