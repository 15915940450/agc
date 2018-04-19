<template lang="html">
  <div class="component_sys">
    <h3 class="title">修改密码</h3>
    <div class="form_wrap">
      <el-form size="small" label-position="top" label-width="80px" :model="formLabelAlign">
        <el-form-item label="旧密码">
          <el-input v-model="formLabelAlign.name" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formLabelAlign.region" type="password"></el-input>
        </el-form-item>
        <el-form-item label="再输一次新密码">
          <el-input v-model="formLabelAlign.type" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn_wrap">
            <el-button type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'CSys',
  data:function(){
    return ({
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    });
  }
};
</script>

<style lang="css" scoped>
.component_sys{
  background: #FFF;
}
.form_wrap{
  width: 390px;
  padding-left: 50px;
  padding-top: 10px;
  padding-bottom: 30px;
}
.btn_wrap{
  margin-top: 50px;
}
</style>
