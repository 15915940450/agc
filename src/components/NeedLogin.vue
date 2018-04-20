<template lang="html">
  <div class="need_login">
    <el-dialog :visible.sync="modalStore.needLogin" :width="width" :custom-class="customClass" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :modal="false">
      <img class="login_logo" src="../assets/login_logo.png" alt="immotor" width="56" />
      <h2 class="project_name">代理商管理后台</h2>
      <!-- <input v-model.trim="formLogin.phone"> -->
      <!-- 表单开始 -->
      <el-form ref="formLogin" :model="formLogin" size="small" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model.number="formLogin.phone" @input="hintMsg=''" auto-complete="off" placeholder="请输入手机号码" class="need_login-phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="formLogin.password" @input="hintMsg=''" auto-complete="off" placeholder="请输入密码" class="need_login-password"></el-input>
        </el-form-item>
        <el-form-item class="need_login-vcode" v-if="need_vcode">
          <el-input v-model="formLogin.validateCode" @input="hintMsg=''" auto-complete="off" placeholder="请输入验证码"></el-input>
          <img src="../assets/validateCode.jpeg" height="30" />
        </el-form-item>
        <el-form-item class="need_login-hint_wrap">
          <p class="need_login-hint" v-if="hintMsg">* {{hintMsg}}</p>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginSend('formLogin')" id="btn_login">登录</el-button>
      </div>

      <p class="kefu">客服：400-618-7238     2018 ◎深圳易马达科技有限公司版权所有</p>
    </el-dialog>

  </div>
</template>

<script>
import {mapState} from 'vuex';
// import {mapState,mapMutations} from 'vuex';
import {urls,imPostForm} from '../api/urls.js';

export default {
  name:'NeedLogin',
  data() {
    return {
      width:'380px',
      customClass:'onelogin',
      need_vcode:false,
      hintMsg:'',
      formLogin: {
        phone: '',
        password: '',
        validateCode:''
      },
      rules:{
        phone: [
          {type:'number',required:true,min:10000000000,max:99999999999,message:'手机号必须为11位数字',trigger:'change'}
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'change'}
        ]
      }
    };
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    //登录接口=> /user/login
    loginSend:function(refName){
      var vueThis=this;
      this.$refs[refName].validate((valid) => {
        if (valid) {
          //发送ajax请求,带上用户输入的手机号和密码
          var sendData={
            phone:''+this.formLogin.phone,
            password:''+this.formLogin.password
          };
          imPostForm(urls.login,sendData,function(objRps){
            vueThis.handleLoginRps(objRps);
          });
        } else {
          _.logErr('error submit!!');
          return false;
        }
      });
    },
    handleLoginRps:function(objRps){
      switch (objRps.code) {
      case 1000:  //登录成功
        this.handleSuccess(objRps);
        break;
      default:
        this.hintMsg=objRps.msg;
      }
    },
    handleSuccess:function(objRps){
      //设置登录信息,手机号必须
      window.sessionStorage.setItem('agentphone',objRps.result.phone);
      this.$store.commit('hideLogin');
      //清空密码
      this.formLogin.password='';

      //设置完整登录用户信息
      window.sessionStorage.setItem('agentname',objRps.result.name);
      window.sessionStorage.setItem('agentid',objRps.result.id);
      this.$store.commit('setAgent',{
        phone:objRps.result.phone,
        name:objRps.result.name,
        id:objRps.result.id
      });
    }
  } //methods
};
</script>

<style lang="css" scoped>
.need_login .el-dialog__wrapper{
  background: #333 url(../assets/bg_login.png) no-repeat center center;
}
.login_logo{
  display: block;
  margin:0 auto;
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
  right:4px;
  top:4px;
  max-height: 24px;
}
.need_login-hint_wrap{
  height: 32px;
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
