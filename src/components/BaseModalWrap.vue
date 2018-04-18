<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="新建用户"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <div class="modal_wrap-body">
        <el-form :model="baseModalForm">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input size="small" v-model="baseModalForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select size="small" v-model="baseModalForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name:'BaseModalWrap',
  data:function(){
    return ({
      centerDialogVisible:true,
      baseModalForm:{
        name:'',
        region:''
      },
      formLabelWidth:'80px'
    });
  }
};
</script>

<style lang="css" scoped>
</style>
