<template lang="html">
  <div>
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">
          <small>群组管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>修改手机</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="im_snow">
      <div class="im_snow_title">
        <el-row>
          <el-col :span="6">
            <h3 class="title">修改手机号</h3>
          </el-col>
          <el-col :span="18">
            <div class="title_link">
              <router-link to="/user/changephonehistory/1">修改记录</router-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="im_form">
        <el-form :inline="true" :model="formGetChangePhoneInfo" :rules="rules" ref="formGetChangePhoneInfo">
          <el-form-item label="旧手机号码:" prop="userPhone">
            <el-input v-model="formGetChangePhoneInfo.userPhone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="新手机号码:" prop="phone">
            <el-input v-model="formGetChangePhoneInfo.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="im_info" v-show="infoDetail">
        <!-- <el-form> -->
        <el-card class="box-card">
          
          <div slot="header">
            <table width="100%" class="im_info_table">
              <tbody>
                <tr>
                  <td>ID</td>
                  <td>{{twoUsers[0].id}}</td>
                  <td>ID</td>
                  <td>{{twoUsers[1].id}}</td>
                </tr>
                <!-- 手機號碼，所屬代理商，所在群組，錢包餘額，押金，套餐，免費天數，綁定中控，綁定電池 -->
                <tr>
                  <td>手机号码</td>
                  <td>{{twoUsers[0].phone}}</td>
                  <td>手机号码</td>
                  <td>{{twoUsers[1].phone}}</td>
                </tr>
                <!-- limit1 -->
                <tr>
                  <td>
                    所属代理商
                  </td>
                  <td>{{twoUsers[0].agentName}}</td>
                  <td>
                    <div class="hint_3">
                      <el-tooltip v-show="limit1" effect="dark" content="不能修改其他代理商的用户" placement="right-end">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                    所属代理商
                  </td>
                  <td>{{twoUsers[1].agentName}}</td>
                </tr>
                <tr>
                  <td>所在群组</td>
                  <td>{{twoUsers[0].groupName}}</td>
                  <td>所在群组</td>
                  <td>{{twoUsers[1].groupName}}</td>
                </tr>
                <!-- limit6 -->
                <tr>
                  <td>钱包余额</td>
                  <td>{{twoUsers[0].amount}} 元</td>
                  <td>
                    <div class="hint_3">
                      <el-tooltip v-show="limit6" effect="dark" content="有余额不能修改" placement="right-end">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                    钱包余额
                  </td>
                  <td>{{twoUsers[1].amount}} 元</td>
                </tr>
                <!-- limit2,3 -->
                <tr>
                  <td>
                    <div class="hint_1">
                      <el-tooltip v-show="limit2" effect="dark" content="线上交押金的用户必须先退押金" placement="right-end">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                    押金
                  </td>
                  <td>
                    <span v-if="typeof(twoUsers[0].depositDO)==='object'">
                      【
                      {{twoUsers[0].depositDO.depositName}}
                      /
                      {{twoUsers[0].depositDO.amount}}
                      元/
                      {{twoUsers[0].depositDO.num}}
                      颗电池/
                      {{twoUsers[0].depositDO.typeZH}}
                      】
                    </span>
                    <span v-else>
                      ─
                    </span>
                  </td>
                  <td>
                    <div class="hint_3">
                      <el-tooltip v-show="limit3" effect="dark" content="有押金没有退还" placement="right-end">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                    押金
                  </td>
                  <td>
                    <span v-if="typeof(twoUsers[1].depositDO)==='object'">
                      【
                      {{twoUsers[1].depositDO.depositName}}
                      /
                      {{twoUsers[1].depositDO.amount}}
                      元/
                      {{twoUsers[1].depositDO.num}}
                      颗电池/
                      {{twoUsers[1].depositDO.typeZH}}
                      】
                    </span>
                    <span v-else>
                      ─
                    </span>
                  </td>
                </tr>
                <!-- limit7 -->
                <tr>
                  <td>套餐</td>
                  <td>
                    <ul v-if="twoUsers[0].validPackage.length">
                      <li v-for="item in twoUsers[0].validPackage" :key="item.id">
                        【
                        {{item.name}}
                        /
                        {{item.typeZH}}
                        /
                        {{item.price}}
                        元 /
                        {{item.times}}
                        次 /
                        {{item.duration}}
                        天】
                      </li>
                    </ul>
                    <span v-else>
                      ─
                    </span>
                  </td>
                  <td>
                    套餐
                    <div class="hint_3">
                      <el-tooltip v-show="limit7" effect="dark" content="有套餐不能修改" placement="right-end">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                  </td>
                  <td>
                    <ul v-if="twoUsers[1].validPackage.length">
                      <li v-for="item in twoUsers[1].validPackage" :key="item.id">
                        【
                        {{item.name}}
                        /
                        {{item.typeZH}}
                        /
                        {{item.price}}
                        元 /
                        {{item.times}}
                        次 /
                        {{item.duration}}
                        天】
                      </li>
                    </ul>
                    <span v-else>
                      ─
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>免费天数</td>
                  <td>{{twoUsers[0].freeDays}}</td>
                  <td>免费天数</td>
                  <td>{{twoUsers[1].freeDays}}</td>
                </tr>
                <!-- limit4 -->
                <tr>
                  <td>绑定中控</td>
                  <td>
                    <ul v-if="twoUsers[0].scootersList.length">
                      <li v-for="item in twoUsers[0].scootersList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                    <span v-else>
                      ─
                    </span>
                  </td>
                  <td>
                    <div class="hint_3">
                      <el-tooltip v-show="limit4" effect="dark" content="有中控未解绑" placement="right-end">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                    绑定中控
                  </td>
                  <td>
                    <ul v-if="twoUsers[1].scootersList.length">
                      <li v-for="item in twoUsers[1].scootersList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                    <span v-else>
                      ─
                    </span>
                  </td>
                </tr>
                <!-- limit5 -->
                <tr>
                  <td>绑定电池</td>
                  <td>
                    <ul v-if="twoUsers[0].batteriesList.length">
                      <li v-for="item in twoUsers[0].batteriesList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                    <span v-else>
                      ─
                    </span>
                  </td>
                  <td>
                    <div class="hint_3">
                      <el-tooltip v-show="limit5" effect="dark" content="有电池未解绑" placement="right-end">
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </div>
                    绑定电池
                  </td>
                  <td>
                    <ul v-if="twoUsers[1].batteriesList.length">
                      <li v-for="item in twoUsers[1].batteriesList" :key="item.id">
                        {{item.sn}}
                      </li>
                    </ul>
                    <span v-else>
                      ─
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="remark_wrap">
              <el-input
                placeholder="请输入备注内容，20字以内"
                v-model="remark"
                :maxlength="20"
                clearable>
              </el-input>
            </div>
          </div>
          <div class="im_info_footer">

            <el-button 
              @click="handleModify()" 
              :disabled="canNOTmodify" 
              type="danger"
              >
              修改
            </el-button>
          </div>
          
        </el-card>
        <!-- </el-form> -->
      </div>
    </div>

    <div class="modal_wrap">
      <el-dialog
        title="填写验证码"
        :visible.sync="modalChangePhoneYZM"
        width="330px"
        :show-close="false"
        :close-on-click-modal="false"
        center
        >
        <div class="modal_wrap-body">
          <p>已经发送验证码至手机 {{formGetChangePhoneInfo.phone}}</p>
          <el-form
            :inline="true"
            :model="changePhone"
            :rules="authCodeRules"
            ref="changePhone"
            >
            <el-form-item prop="authCode">
              <el-input
                v-model="changePhone.authCode"
                class="input_yzm"
                placeholder="请输入验证码"
                >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                plain
                round
                size="mini"
                :disabled="canNOTsms"
                @click="handleReSMS()"
                >
                重发
                <span v-if="canNOTsms">（{{timeReSMS}}s）</span>
              </el-button>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel()">取 消</el-button>
          <el-button type="primary" @click="handleSubmit()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
var numTimer;
var defaultUser={
  id:'─',   //id
  amount:'─',   //钱包余额
  phone:'─', // 电话
  groupCode:'─', // 群组code
  groupName:'─', // 群组name
  freeDays:'─', // 免费天数
  agentId:'─', // 代理商id
  agentName:'─', // 代理商name
  depositDO:'─',
  validPackage:[],
  scootersList:[],
  batteriesList:[]
};
export default {
  name:'HeartUserChangePhone',
  data:function(){
    return ({
      changePhone:{
        authCode:''
      },
      authCodeRules:{
        authCode:[
          {required:true,message:'验证码不能为空',trigger:'blur'}
        ]
      },
      timeReSMS:59,
      infoDetail:false,
      formGetChangePhoneInfo:{
        userPhone:'', //旧用户手机
        phone:''  //新用户手机
      },
      rules:{
        userPhone:[{type:'string',required:true,pattern:/^1\d{10}$/,message:'请输入正确的手机号码',trigger:'blur'}],
        phone:[{type:'string',required:true,pattern:/^1\d{10}$/,message:'请输入正确的手机号码',trigger:'blur'}]
      },
      twoUsers:[
        Object.assign({},defaultUser),Object.assign({},defaultUser)
      ],
      modalChangePhoneYZM:false,
      remark:''
    });
  },
  computed:{
    canNOTsms:function(){
      return (this.timeReSMS!==60);
    },
    //1.所属代理商:agentId
    limit1:function(){
      var bLimit1=false;

      var numAgentId=+this.twoUsers[1].agentId; //0,NaN,224
      //&& && (...)
      numAgentId && numAgentId!==+window.sessionStorage.headerid && (bLimit1=true);

      return bLimit1;
    },
    limit2:function(){
      return (this.twoUsers[0] && typeof(this.twoUsers[0].depositDO)==='object' && this.twoUsers[0].depositDO.type===1);
    },
    limit3:function(){
      return (this.twoUsers[1] && typeof(this.twoUsers[1].depositDO)==='object');
    },
    limit4:function(){
      return (this.twoUsers[1] && typeof(this.twoUsers[1].scootersList)==='object' && this.twoUsers[1].scootersList.length);
    },
    limit5:function(){
      return (this.twoUsers[1] && typeof(this.twoUsers[1].batteriesList)==='object' && this.twoUsers[1].batteriesList.length);
    },
    limit6:function(){
      //餘額
      return (this.twoUsers[1] && +this.twoUsers[1].amount);
    },
    limit7:function(){
      return (this.twoUsers[1] && typeof(this.twoUsers[1].validPackage)==='object' && this.twoUsers[1].validPackage.length);
    },
    canNOTmodify:function(){
      //不可修改
      var b=window.Boolean(this.limit1 || this.limit2 || this.limit3 || this.limit4 || this.limit5 || this.limit6 || this.limit7);
      return b;
    }
  },
  methods:{
    onSubmit:function(){
      var vueThis=this;
      vueThis.$refs['formGetChangePhoneInfo'].validate((valid) => {
        if(valid){
          vueThis.infoDetail=false;
          var sendData={
            userPhone:vueThis.formGetChangePhoneInfo.userPhone,
            phone:vueThis.formGetChangePhoneInfo.phone,
          };
          vueThis.$rqs(vueThis.$yApi.getChangePhoneInfo,function(objRps){
            if(objRps.result.length){
              if(objRps.result.length===1){
                objRps.result[1]=Object.assign({},defaultUser,{
                  phone:vueThis.formGetChangePhoneInfo.phone
                });
              }
              vueThis.twoUsers=objRps.result;
              vueThis.infoDetail=true;
            }
          },{
            objSendData:sendData,
            reviver:function(k,v){
              //押金
              if(k==='depositDO' && v){
                if(window.Number(v.type)===1){
                  v.typeZH='线上';
                }else{
                  v.typeZH='线下';
                }
              }
              //套餐
              if(k==='validPackage' && v.length){
                v=v.map(function(obj){
                  if(window.Number(obj.type)===0){
                    obj.typeZH='月套餐';
                  }else if(window.Number(obj.type)===1){
                    obj.typeZH='次套餐';
                  }else{
                    obj.typeZH='免费套餐';
                  }
                  return obj;
                });
              }
              return v;
            } //reviver
          });
        }
      });
    },
    handleModify:function(){
      var vueThis=this;
      vueThis.$confirm('修改后，新手机号码原本的免费天数将会失效；此操作不可撤销，确定修改吗？','提示',{
        type:'warning'
      }).then(() => {
        //點擊了確定
        vueThis.nextYZM();
      }).catch(() => {

      });
    },
    nextYZM:function(){
      var vueThis=this;
      var sendData={
        phone:vueThis.formGetChangePhoneInfo.phone, //新
        userPhone:vueThis.formGetChangePhoneInfo.userPhone
      };
      vueThis.$rqs(vueThis.$yApi.sendDuanxin,function(){
        //验证码已发送
        vueThis.timeReSMS=59;
        vueThis.modalChangePhoneYZM=true;
        window.clearInterval(numTimer);
        numTimer=window.setInterval(function(){
          if(vueThis.timeReSMS<=0){
            window.clearInterval(numTimer);
            vueThis.timeReSMS=60;
          }else{
            vueThis.timeReSMS--;
          }
        },1000);
      },{
        objSendData:sendData
      });
    },
    //已輸入驗證碼，確認修改
    handleSubmit:function(){
      var vueThis=this;
      vueThis.$refs['changePhone'].validate((valid) => {
        if(valid){
          var sendData={
            userPhone:vueThis.formGetChangePhoneInfo.userPhone,
            phone:vueThis.formGetChangePhoneInfo.phone,
            authCode:vueThis.changePhone.authCode.trim(),
            remark:vueThis.remark
          };
          vueThis.$rqs(vueThis.$yApi.changePhone,function(objRps){
            vueThis.resetModal();
            vueThis.formGetChangePhoneInfo.userPhone='';
            vueThis.formGetChangePhoneInfo.phone='';
            vueThis.infoDetail=false;
            vueThis.$message(objRps.msg);
          },{
            objSendData:sendData
          });
        }
      });
    },
    handleCancel:function(){
      this.resetModal();
    },
    handleReSMS:function(){
      this.nextYZM();
    },
    resetModal:function(){
      var vueThis=this;
      vueThis.modalChangePhoneYZM=false;
      vueThis.changePhone.authCode='';
      vueThis.$refs['changePhone'].clearValidate();
    }

  },
  created:function(){
  }
};
</script>

<style lang="css" scoped>
  .im_snow_title{
    border-bottom:1px solid #F8F8FF;
  }
  .title_link{
    height:50px;
    line-height:50px;
    text-align:right;
    padding-right:15px;
  }
  .im_form{
    padding:50px 15px 20px;
  }
  .im_info{
    padding:0 15px;
    margin-bottom:20px;
  }
  .im_info_table tbody td{
    padding:8px 0;
    vertical-align:top;
    position:relative;
  }
  .im_info_table tbody td .hint_1,.im_info_table tbody td .hint_3{
    position:absolute;
    left:0;
    top:10px;
    color:#E00;
    width:300px;
  }
  .im_info_table tbody td .hint_3{
    left:20px;
  }

  /*表格1234列*/
  .im_info_table tbody td:nth-child(1){
    color:#666;
    width:90px;
    max-width:90px;
    padding-left:20px;
  }
  .im_info_table tbody td:nth-child(2){
    border-right:1px solid #EEE;
    width:360px;
    max-width:360px;
  }
  .im_info_table tbody td:nth-child(3){
    color:#666;
    padding-left:40px;
    width:90px;
    max-width:90px;
  }
  .im_info_table tbody td:nth-child(4){
    width:360px;
    max-width:360px;
  }
  .im_info_table ul,.im_info_table li{
    margin:0;
    padding:0;
    list-style:none;
  }
  .im_info_footer{
    text-align:right;
  }
  .input_yzm{
    width:120px;
  }
  .remark_wrap{
    padding-top: 40px;
    margin-left: 20px;
  }
</style>
