<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="分配套餐"
      :visible.sync="modalStore.setCombo"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formSetCombo" :rules="rules" ref="form">
          
          <el-form-item label="人数" :label-width="formLabelWidth">
            <span class="total_select">
              {{formSetCombo.userIDs.length}}
            </span>
          </el-form-item>
          <el-form-item label="套餐方案" :label-width="formLabelWidth" prop="packageID">
            <el-select v-model="formSetCombo.packageID" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.setCombo = false">取 消</el-button>
        <el-button type="primary" @click="modalStore.setCombo = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'FormSetCombo',
  data:function(){
    return ({
      formSetCombo:{
        userIDs:[],
        packageID:'',
        groupCode:''
      },
      rules:{
        packageID:[
          {required:true,message:'请选择套餐方案',trigger:'blur'}
        ]
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
  .total_select{
    color:mediumturquoise;
  }
</style>
