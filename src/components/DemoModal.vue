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
          
          <el-form-item label="中控" :label-width="formLabelWidth">
            <el-input v-model="formGroupCreate.name" auto-complete="off"></el-input>
          </el-form-item>

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
