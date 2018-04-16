<template lang="html">
  <div class="need_login">

    <el-dialog :visible.sync="dialogFormVisible" :width="width" :custom-class="customClass" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :modal="false">
      <el-form :model="form">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-date"
          v-model="input6">
        </el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name:'NeedLogin',
  data() {
    return {
      dialogFormVisible: true,
      width:'380px',
      customClass:'onelogin',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    };
  }
};
</script>

<style lang="css" scoped>
.need_login .el-dialog__wrapper{
  background: #333;
}
</style>
