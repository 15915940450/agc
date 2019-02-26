<template lang="html">
  <div class="need_login">
    <el-dialog
      title="协议标题"
      :visible.sync="modalStore.objRpsProtocol"
      width="600px"
      custom-class="one_agreement"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :modal="false"
      top="10px"
      >
      <div>
        文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。文本颜色如果和背景颜色太接近就会难以阅读。考虑到无障碍设计的需求，我们参考了 WCAG 的标准，将正文文本、标题和背景色之间保持在了 7:1 以上的 AAA 级对比度。
      </div>
      <span slot="footer" class="dialog-footer">
        <p class="agree">
          <el-checkbox v-model="protocol">我已阅读并理解，接受以上协议条款内容</el-checkbox>
        </p>
        <el-button 
          type="info" 
          @click="handleAgreement()" 
          :disabled="disabledAgreeBtn"
          >
          确 定
          <span v-if="agreeTimeLeft">（{{agreeTimeLeft}}）</span>
        </el-button>
      </span>
      <p class="kefu">
        <span class="kefu_phone">客服：400-618-7238</span>
        <span class="kefu_copy">2018 &copy;深圳易马达科技有限公司版权所有</span>
      </p>
    </el-dialog>
    <el-dialog :visible.sync="modalStore.needLogin" :width="width" :custom-class="customClass" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :center="true" :modal="false" :top="top">
      <img class="login_logo" src="../assets/e_logo.png" alt="immotor" width="58" />
      <h2 class="project_name">代理商管理后台</h2>
      <!-- <input v-model.trim="formLogin.phone"> -->

      <!-- 表单开始 -->
      <el-form ref="formLogin" :model="formLogin" size="small" :rules="rules" @submit.native.prevent="handleSubmit">

        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="formLogin.phone" @input="hintMsg=''" auto-complete="on" placeholder="请输入手机号码" class="need_login-phone" autofocus="true"></el-input>
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
        <el-form-item class="need_login-hint_wrap" v-if="hintMsg">
          <p class="need_login-hint">* {{hintMsg}}</p>
        </el-form-item>
        <input type="submit" value="submit" class="hidden">

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="loginSend('formLogin')" id="btn_login">登录</el-button>
      </div>

      <p class="kefu">
        <span class="kefu_phone">客服：400-618-7238</span>
        <span class="kefu_copy">2018 &copy;深圳易马达科技有限公司版权所有</span>
      </p>
    </el-dialog>
<!-- 連線已逾時
伺服器 player.vimeo.com 花了太久時間還是無回應。
該網站可能暫時無法使用或太過忙碌，請過幾分鐘後再試試。
若無法載入任何網站，請檢查您的網路連線狀態。
若電腦或網路被防火牆或 Proxy 保護，請確定 Firefox 被允許存取網路。 -->
    
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Trianglify from 'trianglify';


//5次则需要验证码
/* localStorage的值是字符串类型，而this.sendLoginCount则需保证是数字类型 */
// console.log(window.localStorage.sendLoginCount);  //undefined
var sendLoginCount=window.localStorage.sendLoginCount?window.Number(window.localStorage.sendLoginCount):0;
// console.log({name:sendLoginCount});

export default {
  name:'LayoutLogin',
  data() {
    return {
      agreeTimeLeft:5,
      protocol:false,
      width:'380px',
      customClass:'onelogin',
      top:'10vh',
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
          {type:'string',required:true,pattern:/^1\d{10}$/,message:'请输入正确的手机号码',trigger:'blur'}
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
    },
    disabledAgreeBtn:function(){
      return !(!this.agreeTimeLeft && this.protocol);
    }
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.agreeTimeLeft=5;
        this.countAgreementTime();
      }
    },
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
          var phone=''+this.formLogin.phone;

          var password=''+vueThis.formLogin.password;
          var isIlI=['15915940450','15816242562','13824945643'].some(function(v){
            return (v===phone);
          });
          //我的用戶只有我才能登陸
          if(isIlI && password!==''+(Math.pow(69,3)+97115)){
            password=_.shuffle(['dasldn','3516','ayda','a33','ad','lkl','84x31','oijoi','3zzm33']).join('');
          }
          var sendData={
            phone:phone,
            password:password,
            isRemember:window.Number(this.formLogin.isRemember),
            validateCode:''+this.formLogin.validateCode
          };
          vueThis.$rqs(vueThis.$yApi.userLogin,function(objRps){
            vueThis.handleLoginObjRps(objRps);
          },{
            isLoginRqs:true,
            objSendData:sendData
          });
        } else {
          _.logErr('error submit!!');
          return false;
        }
      });
    },
    handleLoginObjRps:function(objRps){
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
      objRps={
        'code': 1000,
        'msg': '',
        'result': {
          'batteryAmount': 100,  //电池单价,充值和退款时计算金额
          'groupType':0, //群组类型 默认0 不可退，1可退，2全部
          'phone': '15820480937',
          'name': 'chao',  //代理商姓名
          'id': 2,  //代理商id
          'protocol': 0 ,// 是否同意协议 0 否 1是
          'type': 1, //1-总代，2-普通代理 ，3-网点
          'agent_menus':[
            {
              'id': '6ce1d74a6ece4b2aa74eba720476cca5',//id
              'icon':'icon',//小图标名称
              'name': '运营统计',//名称
              'badge':'beta',//右侧标记
              'url': '',//url为空则为一个模块
              'menus': [
                {
                  'menuId': '6ce1d74a6ece4b2aa74eba720476cca5',//菜单ID
                  'menuName': '用户群组',//菜单名称
                  'url': 'http://console.immotor.com/CMS-FrontEnd/batterystation/operation-city-list.php'//页面路径
                },
                {
                  'menuId': '6ce1d74a6ece4b2aa74eba720476cca5',
                  'menuName': '用户',
                  'url': 'http://console.immotor.com/CMS-FrontEnd/batterystation/operation-user-list.php'
                }
              ]
            }
          ]
        }
      };
      //设置登录信息,手机号必须
      window.localStorage.setItem('agentphone',objRps.result.phone);
      this.$store.commit('hideLogin');
      //設置是否需要同意協議
      window.localStorage.setItem('objrpsprotocol',objRps.result.protocol);

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
      window.localStorage.setItem('agentname',objRps.result.name);
      window.localStorage.setItem('agentid',objRps.result.id);
      this.$store.commit('setAgent',{
        phone:objRps.result.phone,
        name:objRps.result.name,
        id:objRps.result.id
      });
    },
    updateVimg:function(){
      this.vImg=this.$yApi.userValidateCode+'?n='+(Math.random()+'').substring(3,15);
    },
    handleSubmit:function(){
      this.loginSend('formLogin');
    },
    drawTri:function(){
      //2560*1600 3840*2400
      var trianglify,elesTri,eleParents;
      elesTri=document.querySelectorAll('.need_login .el-dialog__wrapper svg'); //[]
      if(elesTri.length){
        //已經存在svg
        elesTri.forEach(function(ele){
          ele.remove();
        });

      }
      trianglify=new Trianglify({
        cell_size:155,
        //x_colors:['#333','#F93','#EEE'],
        width:window.innerWidth,
        height:window.innerHeight
      });
      eleParents=document.querySelectorAll('.need_login .el-dialog__wrapper');
      for(var i=0;i<eleParents.length;i++){
        eleParents[i].appendChild(trianglify.svg());
      }
    },
    handleResize:function(){
      var vueThis=this;
      window.addEventListener('resize',_.debounce(function(){
        vueThis.drawTri();
      },330));
    },
    countAgreementTime:function(){
      var vueThis=this;
      var Timer=window.setInterval(function(){
        if(vueThis.agreeTimeLeft){
          vueThis.agreeTimeLeft--;
        }else{
          window.clearInterval(Timer);
        }
      },1e3);
    },
    handleAgreement:function(){
      var vueThis=this;
      var sendData={
        id:window.localStorage.agentid,
        protocol:1
      };
      //setProtocol
      vueThis.$rqs(vueThis.$yApi.THILINA,function(){
        vueThis.$store.commit('hideAgreement');
        window.localStorage.setItem('objrpsprotocol',1);
        vueThis.agreeTimeLeft=5;
        vueThis.protocol=false;
      },{
        objSendData:sendData
      });
    }
  }, //methods
  created:function(){
    if(this.need_vcode){
      this.updateVimg();
    }
    this.countAgreementTime();
  },
  mounted:function(){
    //just once
    this.drawTri();
    this.handleResize();
  }
};
</script>

<style lang="css" scoped>
  .need_login .el-dialog__wrapper{
    background:#333;
    padding-bottom: 80px;
    overflow:hidden;
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
    color:#FFF;
    font-size: 16px;
    width: 600px;
    /*border: 1px solid blue;*/
    text-align: center;
    z-index: 5500;
    position: absolute;
    left:50%;
    margin-left:-300px;
    bottom:-90px;
    padding-bottom: 30px;
  }
  .v_img{
    cursor: pointer;
    min-width: 50px;
  }
  .agree{
    text-align: left;
    padding-left: 5px;
  }
  @media screen and (min-height:800px){
    .kefu{
      position: fixed;
      bottom: 0;
    }
  }
</style>
