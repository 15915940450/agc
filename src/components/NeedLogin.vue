<template lang="html">
  <div class="need_login">

    <el-dialog :visible.sync="dialogFormVisible" :width="width" :custom-class="customClass" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :modal="false">
      <h2 class="project_name">代理商管理后台</h2>
      <!-- 表单开始 -->
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.phone" auto-complete="off" placeholder="请输入手机号码" class="need_login-phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码" class="need_login-password"></el-input>
        </el-form-item>
        <el-form-item class="need_login-vcode">
          <el-input v-model="form.validateCode" auto-complete="off" placeholder="请输入验证码"></el-input>
          <img src="../assets/validateCode.jpeg" height="30" />
        </el-form-item>
        <el-form-item>
          <p class="need_login-hint">* 手机号码不正确</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="dialogFormVisible = false" id="btn_login">登录</el-button>
      </div>
    </el-dialog>

    <p class="kefu">客服：400-618-7238     2018 ◎深圳易马达科技有限公司版权所有</p>
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
        phone: '',
        password: ''
      }
    };
  }
};
</script>

<style lang="css" scoped>
.need_login .el-dialog__wrapper{
  background: #333;
}
#btn_login{
  width:100%;
  margin-bottom: 40px;
}
.project_name{
  font-size: 26px;
  font-weight: 300;
  margin-bottom: 30px;
  margin-top: 30px;
  color: #333;
  text-align: center;
}
.need_login-vcode{
  position: relative;
}
.need_login-vcode img{
  position: absolute;
  right:5px;
  top:5px;
}
.need_login-hint{
  color:red;
  font-size: 12px;
}
.kefu{
  position: fixed;
  bottom: 20px;
  left: 0;
  color:#FFF;
  font-size: 16px;
  z-index: 10000;
  width: 100%;
  text-align: center;
}
</style>
