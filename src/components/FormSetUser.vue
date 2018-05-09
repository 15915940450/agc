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
            <el-select v-model="formSetUser.groupCode" placeholder="请选择">
              <el-option
                v-for="item in optionsGroups"
                :key="item.code"
                :label="(item.name)"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="depositId" label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.depositId" placeholder="请选择">
              <el-option key="-1" label="空" value=""></el-option>
              <!-- 199不限次/¥199/月卡套餐/30天/2000次 -->
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="(item.id+'')">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="freeDay" label="免费天数" :label-width="formLabelWidth">
            <el-input-number v-model="formSetUser.freeDay" :min="0" :max="maxFD">
            </el-input-number>
            <small>(剩余 <strong :class="{red:(agentFreeDays<=0)}">{{agentFreeDays}}</strong> 天)</small>
          </el-form-item>

          <!-- <el-form-item label="可用电池数" :label-width="formLabelWidth">
            <el-input v-model.number="formSetUser.name" auto-complete="off" placeholder="剩余可分配电池 100 天"></el-input>
          </el-form-item> -->

          <el-form-item prop="scooterSNs" label="车牌号(SN)" :label-width="formLabelWidth">
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
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormSetUser',
  props:['name','groupCode','depositID','freeDays','scooters','phone'],
  data:function(){
    return ({
      formSetUser:{
        scooterSNs:[],
        freeDay:-1,
        groupCode:'',
        depositId:'',
        phone:''
      },
      rules:{
        groupCode:[
          {required:true,message:'请选择一个群组',trigger:'change'}
        ],
        // depositId:[
        //   {required:true,message:'请选择押金方案',trigger:'change'}
        // ],
        freeDay:[
          {required:true,message:'免费天数不能为空',trigger:'change'}
        ],
        scooterSNs:[
          {required:true,message:'请选择电动车',trigger:'change'}
        ]
      },
      agentFreeDays:0,
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
      return (this.freeDays+this.agentFreeDays);
    },
    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.setUser':function(val){
      var vueThis=this;
      if(val){
        // console.log(Math.random());
        this.formSetUser.name=this.name;
        this.formSetUser.groupCode=this.groupCode;

        var isFind=vueThis.options_depositListScheme.find(function(v){
          return (window.Number(v.id)===window.Number(vueThis.depositID));
        });
        // console.log(JSON.stringify(isFind));  //undefined
        if(!isFind){
          vueThis.formSetUser.depositId='';
        }else{
          vueThis.formSetUser.depositId=''+vueThis.depositID;  //7
        }

        this.formSetUser.freeDay=window.Number(this.freeDays);
        // this.formSetUser.scooterSNs=['G5A1A100702'];
        this.formSetUser.scooterSNs=this.scooters.map(function(v){
          return (v.sn);
        });
        this.formSetUser.phone=this.phone;
      }
    }
  },
  methods:{
    fetchBaseInfo:function(){
      var vueThis=this;
      var sendData={
        phone:''+window.localStorage.agentphone
      };
      ajaxs.imPostForm(urls.baseInfo,sendData,function(objRps){
        if(objRps.code===1000){
          vueThis.agentFreeDays=window.Number(objRps.result.freeDays);
        }else{
          vueThis.$notify.error({
            title: '提示',
            message:objRps.msg,
            offset: 50,
            duration: 5000  //0
          });
        }
      });
    },
    fetchGroupList:function(){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        agentId:window.localStorage.agentid
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:969
      };
      ajaxs.imGet(urls.groupList,sendData,function(objRps){
        // console.log(JSON.stringify(objRps));
        if(objRps.code===1000){
          vueThis.optionsGroups=objRps.result.list;
        }else{
          vueThis.$notify.error({
            title: '提示',
            message:objRps.msg,
            offset: 50,
            duration: 5000  //0
          });
        }
      });
    },
    fetchOptionsScheme:function(type){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:window.Number(vueThis.$route.params.groupcode)
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:96900000
      };
      ajaxs.imGet(urls[type],sendData,function(objRps){
        // console.log(JSON.stringify(objRps));
        if(objRps.code===1000){
          if(type==='depositListScheme'){
            vueThis.options_depositListScheme=objRps.result.list;
            // console.log(JSON.stringify(vueThis.options_depositListScheme));
          }
          if(type==='packageListScheme'){
            vueThis.options_packageListScheme=objRps.result.list;
          }
        }else{
          vueThis.$notify.error({
            title: '提示',
            message:objRps.msg,
            offset: 50,
            duration: 5000  //0
          });
        }
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
            freeDay:vueThis.formSetUser.freeDay,
            scooterSNs:vueThis.formSetUser.scooterSNs,
            phone:vueThis.formSetUser.phone
          };
          // console.log(JSON.stringify(sendData));
          vueThis.loading=true;
          ajaxs.imPostJson(urls.setUser,sendData,function(objRps){
            // console.log(objRps);
            // return ;
            vueThis.loading=false;
            if(objRps.code===1000){
              vueThis.$store.commit('hideSetUser');
              vueThis.$store.commit('showBaseStatus');
            }else{
              vueThis.$notify.error({
                title: '提示',
                message:objRps.msg,
                offset: 50,
                duration: 5000  //0
              });
            }
          });
        }
      });
    },
    fetchEVlist:function(){
      var vueThis=this;
      var sendData={
        phone:''+window.localStorage.agentphone,
        pageNum:1,
        pageSize:96900000
      };
      //请求地址
      ajaxs.imPostForm(urls.evsList,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.optionsEVs=objRps.result.list;
        }else{
          vueThis.$notify.error({
            title: '提示',
            message:objRps.msg,
            offset: 50,
            duration: 5000  //0
          });
        }
      });
    }
  },  //methods
  created:function(){
    this.fetchBaseInfo();
    this.fetchOptionsScheme('depositListScheme');
    this.fetchEVlist();
    this.fetchGroupList();
  }
};
</script>

<style lang="css" scoped>
</style>
