<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="用户设置"
      :visible.sync="modalStore.setUser"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formSetUser" :rules="rules" ref="formSetUser">

          <el-form-item prop="groupCode" label="群组" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.groupCode" placeholder="请选择" @change="handleGroupSelectChange()">
              <el-option
                v-for="item in optionsGroups"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="userName" label="用户昵称" :label-width="formLabelWidth">
            <el-input placeholder="请输入用户的昵称" v-model="formSetUser.userName"></el-input>
          </el-form-item>


          <el-form-item prop="depositId" label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.depositId" placeholder="请选择" :disabled="disabledDeposit">
              <el-option key="-1" label="空" value=""></el-option>
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="(item.id+'')">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="formitem_freeday" prop="freeDayInput" :label-width="formLabelWidth">
            <label class="formitem_label_freeday" for="freeDayInput">
              免费天数

              <el-tooltip placement="top">
                <div slot="content">
                  代理商赠送 {{agentFreeDays}} 天
                  <br/>
                  活动赠送 {{freeDays}} 天
                </div>
                <i class="el-icon-info"></i>
              </el-tooltip>

            </label>
            <el-input-number
              v-model="formSetUser.freeDayInput"
              :min="0"
              :max="maxFD"
              @input.native="handleIN"
              >
            </el-input-number>
            <small>(剩余 <strong :class="{red:(computedFreeDays<=0)}">{{computedFreeDays}}</strong> 天)</small>
          </el-form-item>

          <el-form-item prop="scooterSNs" label="中控（SN)" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.scooterSNs" multiple filterable placeholder="请选择">
              <el-option
                v-for="item in optionsEVs"
                :key="item.sn"
                :label="item.sn"
                :value="item.sn">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('formSetUser')">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="handleComfirm('formSetUser')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'FormSetUser',
  props:['name','groupCode','depositID','freeDays','agentFreeDays','scooters','phone'],
  data:function(){
    //自定义校验规则
    var zh2length10=function(rule,value,callback){
      console.log(value);
      if(_.zh2length(value)>20){
        callback(new Error('10个汉字或20个字母数字以内'));
      }else if(value!=='' && !/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)){
        callback(new Error('只能输入字母、数字、汉字'));
      }else{
        callback();
      }
    };
    return ({
      rules:{
        groupCode:[
          {required:true,message:'请选择一个群组',trigger:'change'}
        ],
        userName:[
          {validator:zh2length10,trigger:'blur'}
        ],
        freeDayInput:[
          {required:true,message:'请输入',trigger:'blur'},
          {type:'integer',message:'请输入一个整数',trigger:'blur'}
        ]
      },
      formSetUser:{
        scooterSNs:[],
        freeDayInput:0, //輸入框的免費天數值
        groupCode:'',
        userName:'',
        depositId:'',
        phone:''
      },
      disabledDeposit:this.$route.params.type==='1'?true:false, //可退群组内用户，不可修改押金方案，其他可以修改(//1=可退 2=不可退)
      freeDaysRps:0,  //rqs返回的值
      optionsEVs:[],
      optionsGroups:[],
      options_depositListScheme: [],
      // [{"id":7,"code":7,"name":"租两颗电池","deposit":1798,"num":2},{"id":11,"code":11,"name":"租一颗电池","deposit":999,"num":1},{"id":13,"code":13,"name":"租一颗电池","deposit":500,"num":1}]
      loading:false,
      formLabelWidth:'100px'
    });
  },
  computed:{
    maxFD:function(){
      if(this.agentFreeDays===undefined){
        return 0;
      }else{
        return (this.agentFreeDays+this.freeDaysRps);
      }
    },
    computedFreeDays:function(){
      //this.maxFD:用戶可被分配的最大免費天數
      //this.computedFreeDays:實時提示的用戶剩餘免費天數
      //this.formSetUser.freeDayInput:輸入框的免費天數
      //hint提示的值
      if(this.formSetUser.freeDayInput===undefined){
        return this.maxFD;
      }else{
        return (this.maxFD-this.formSetUser.freeDayInput);
      }
    },

    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.setUser':function(val){
      var vueThis=this;
      if(val){
        //群组
        vueThis.formSetUser.groupCode=vueThis.groupCode;
        //用户昵称
        vueThis.formSetUser.userName=vueThis.name==='─'?'':vueThis.name;
        //押金方案
        //console.log(vueThis.depositID);
        vueThis.formSetUser.depositId=''+vueThis.depositID;  //7
        vueThis.fetchOptionsScheme('depositListScheme');
        //免费天数
        vueThis.formSetUser.freeDayInput=window.Number(vueThis.agentFreeDays);  //輸入框的免費天數
        vueThis.fetchUserQuery(); //rqs免費天數，即設置對話框初始值
        //中控（SN)
        vueThis.formSetUser.scooterSNs=vueThis.scooters;
        //手機號碼
        vueThis.formSetUser.phone=vueThis.phone;
      }
    }
  },
  methods:{
    fetchUserQuery:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userQuery,function(objRps){
        vueThis.freeDaysRps=window.Number(objRps.result.freeDays);
      });
    },
    fetchGroupList:function(){
      var vueThis=this;
      var advancedParam=JSON.stringify({
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:969
      };
      vueThis.$rqs(vueThis.$yApi.groupList,function(objRps){
        vueThis.optionsGroups=objRps.result.list;
      },{
        objSendData:sendData
      });
    },
    fetchOptionsScheme:function(type,done){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:vueThis.formSetUser.groupCode
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:96900000
      };
      vueThis.$rqs(vueThis.$yApi[type],function(objRps){
        if(type==='depositListScheme'){
          vueThis.options_depositListScheme=objRps.result.list;
        }
        if(type==='packageListScheme'){
          vueThis.options_packageListScheme=objRps.result.list;
        }
        if(done){
          done(objRps);
        }
      },{
        objSendData:sendData
      });
    },
    handleCancel:function(refName){
      this.$refs[refName].resetFields();
      this.$store.commit('hideSetUser');
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        // console.log(valid);
        if(valid){
          var sendData={
            groupCode:vueThis.formSetUser.groupCode,
            depositId:vueThis.formSetUser.depositId,
            freeDay:vueThis.formSetUser.freeDayInput?vueThis.formSetUser.freeDayInput:0,
            scooterSNs:vueThis.formSetUser.scooterSNs,
            phone:vueThis.formSetUser.phone,
            userName:vueThis.formSetUser.userName
          };
          vueThis.loading=true;
          vueThis.$rqs(vueThis.$yApi.userSet,function(){
            vueThis.$store.commit('hideSetUser');
            vueThis.$store.commit('showBaseStatus');
          },{
            objSendData:sendData
          });
        }
      });
    },
    fetchEVlist:function(){
      var vueThis=this;
      var sendData={
        pageNum:1,
        pageSize:96900000
      };
      vueThis.$rqs(vueThis.$yApi.scooterList,function(objRps){
        vueThis.optionsEVs=objRps.result.list;
      },{
        objSendData:sendData
      });
    },
    handleGroupSelectChange:function(){
      var vueThis=this;
      vueThis.fetchOptionsScheme('depositListScheme');
      /*
      this.fetchOptionsScheme('depositListScheme',function(){
        var isFind=vueThis.options_depositListScheme.find(function(v){
          return (window.Number(v.id)===window.Number(vueThis.formSetUser.depositId));
        });
        if(!isFind){
          vueThis.formSetUser.depositId='';
        }
      });
      */
    },
    handleIN:function(ev){
      this.formSetUser.freeDayInput=ev.target.value;
    }
  },  //methods
  created:function(){
    this.fetchEVlist();
    this.fetchGroupList();
    // console.log(this.$route.params);

  }
};
</script>

<style lang="css" scoped>
.formitem_freeday{
  position: relative;
}
.formitem_label_freeday{
  width: 88px;
  display: inline-block;
  text-align: right;
  position: absolute;
  left: -100px;
  top: 0;
}
</style>
