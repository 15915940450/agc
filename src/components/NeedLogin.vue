<template lang="html">
  <div class="need_login">
    <el-dialog :visible.sync="modalStore.needLogin" :width="width" :custom-class="customClass" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :modal="false">
      <img class="login_logo" src="../assets/e_logo.png" alt="immotor" width="58" />
      <h2 class="project_name">代理商管理后台</h2>
      <!-- <input v-model.trim="formLogin.phone"> -->
      <!-- 表单开始 -->
      <el-form ref="formLogin" :model="formLogin" size="small" :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model.number="formLogin.phone" @input="hintMsg=''" auto-complete="on" placeholder="请输入手机号码" class="need_login-phone" autofocus="true"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="formLogin.password" @input="hintMsg=''" auto-complete="off" placeholder="请输入密码" class="need_login-password"></el-input>
        </el-form-item>
        <!-- 验证码:need_vcode依赖于sendLoginCount（初始化为0,响应到达一次则加加,登录成功则清零） -->
        <el-form-item prop="validateCode" class="need_login-vcode" v-if="need_vcode">
          <el-input v-model="formLogin.validateCode" @input="hintMsg=''" auto-complete="off" placeholder="请输入验证码"></el-input>
          <img class="v_img" :loading="true" title="看不清，换一张" :src="vImg" height="30" @click="updateVimg()" />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="formLogin.isRemember">下次自动登录</el-checkbox>
        </el-form-item>
        <!-- ajax响应后提示框 -->
        <el-form-item class="need_login-hint_wrap">
          <p class="need_login-hint" v-if="hintMsg">* {{hintMsg}}</p>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="loginSend('formLogin')" id="btn_login">登录</el-button>
      </div>

      <p class="kefu">客服：400-618-7238     2018 ◎深圳易马达科技有限公司版权所有</p>
    </el-dialog>

  </div>
</template>

<script>
import {mapState} from 'vuex';
// import {mapState,mapMutations} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

//5次则需要验证码
/* localStorage的值是字符串类型，而this.sendLoginCount则需保证是数字类型 */
// console.log(window.localStorage.sendLoginCount);  //undefined
var sendLoginCount=window.localStorage.sendLoginCount?window.Number(window.localStorage.sendLoginCount):0;
// console.log({name:sendLoginCount});

export default {
  name:'NeedLogin',
  data() {
    return {
      width:'380px',
      customClass:'onelogin',
      sendLoginCount:sendLoginCount,
      hintMsg:'',
      loading:false,
      vImg:'',
      formLogin: {
        phone: '',
        password: '',
        isRemember:0,
        validateCode:''
      },
      rules:{
        phone: [
          {type:'number',required:true,min:10000000000,max:99999999999,message:'手机号必须为11位数字',trigger:'change'}
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'blur'}
        ],
        validateCode:[
          {required:true,message:'验证码不能为空',trigger:'blur'}
        ]
      }
    };
  },
  computed:{
    ...mapState(['modalStore']),
    need_vcode:function(){
      var bNeedVcode=false;
      if(this.sendLoginCount>=5){
        bNeedVcode=true;
      }
      return (bNeedVcode);
    }
  },
  watch:{
    need_vcode:function(val){
      //首次更新验证码
      if(val){
        this.updateVimg();
      }
    }
  },
  methods:{
    //登录接口=> /user/login
    loginSend:function(refName){
      var vueThis=this;
      this.$refs[refName].validate((valid) => {
        if (valid) {
          vueThis.loading=true;
          //发送ajax请求,带上用户输入的手机号和密码
          var sendData={
            phone:''+this.formLogin.phone,
            password:''+this.formLogin.password,
            isRemember:window.Number(this.formLogin.isRemember),
            validateCode:''+this.formLogin.validateCode
          };
          // console.log(JSON.stringify(sendData));
          // return false;
          ajaxs.imPostForm(urls.login,sendData,function(objRps){
            //响应已到达
            vueThis.loading=false;

            // console.log(window.localStorage.sendLoginCount);
            // console.log(vueThis.sendLoginCount);
            vueThis.handleLoginRps(objRps);
          },{
            imLogin:true
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
        //失败
        this.hintMsg=objRps.msg;
        this.sendLoginCount++;
        //失败就更换验证码，以防不停试密码
        if(this.need_vcode){
          this.updateVimg();
        }

        window.localStorage.setItem('sendLoginCount',''+this.sendLoginCount);
      }
    },
    handleSuccess:function(objRps){
      //设置登录信息,手机号必须
      window.sessionStorage.setItem('agentphone',objRps.result.phone);
      this.$store.commit('hideLogin');

      //清空密码,验证码次数(localStorage),清空验证码输入，验证码图片更换
      this.formLogin.password='';
      this.formLogin.validateCode='';
      this.vImg='';
      this.sendLoginCount=0;
      window.localStorage.removeItem('sendLoginCount');
      // this.$refs['formLogin'].clearValidate();

      //电池单价
      this.$store.commit('setBatteryAmount',objRps.result.batteryAmount);

      //设置完整登录用户信息
      window.sessionStorage.setItem('agentname',objRps.result.name);
      window.sessionStorage.setItem('agentid',objRps.result.id);
      window.sessionStorage.setItem('grouptype',objRps.result.groupType);
      this.$store.commit('setAgent',{
        phone:objRps.result.phone,
        name:objRps.result.name,
        id:objRps.result.id
      });
    },
    updateVimg:function(){
      this.vImg=urls.validateCode+'?n='+(Math.random()+'').substring(3,15);
    }
  }, //methods
  created:function(){
    if(this.need_vcode){
      this.updateVimg();
    }
  }
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
  .v_img{
    cursor: pointer;
    min-width: 50px;
  }
</style>
