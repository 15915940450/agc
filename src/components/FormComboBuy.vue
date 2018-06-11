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
        <el-form :model="formComboBuy">
          
          <el-form-item label="中控" :label-width="formLabelWidth">
            <el-input v-model="formComboBuy.name" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.comboBuy = false">取 消</el-button>
        <el-button type="primary" @click="modalStore.comboBuy = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'FormComboBuy',
  data:function(){
    return ({
      title:'请输入数量，每份价格元',
      formComboBuy:{
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
