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
                :label="(item.name)"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="depositId" label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.depositId" placeholder="请选择" :disabled="disabledDeposit">
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
            <el-input-number 
              v-model="formSetUser.freeDay" 
              :min="0" 
              :max="maxFD"
              >
            </el-input-number>
            <small>(剩余 <strong :class="{red:(computedFreeDays<=0)}">{{computedFreeDays}}</strong> 天)</small>
          </el-form-item>

          <!-- <el-form-item label="可用电池数" :label-width="formLabelWidth">
            <el-input v-model.number="formSetUser.name" auto-complete="off" placeholder="剩余可分配电池 100 天"></el-input>
          </el-form-item> -->

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
  props:['name','groupCode','depositID','freeDays','scooters','phone'],
  data:function(){
    return ({
      rules:{
        groupCode:[
          {required:true,message:'请选择一个群组',trigger:'change'}
        ],
        freeDay:[
          {required:true,message:'请输入',trigger:'blur'},
          {type:'integer',message:'请输入一个整数',trigger:'blur'}
        ]
      },
      formSetUser:{
        scooterSNs:[],
        freeDay:-1,
        groupCode:'',
        depositId:'',
        phone:''
      },
      disabledDeposit:this.$route.params.type==='1'?true:false, //可退群组内用户，不可修改押金方案，其他可以修改(//1=可退 2=不可退)
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
    computedFreeDays:function(){
      // console.log(this.formSetUser.freeDay);
      if(this.formSetUser.freeDay===undefined){
        return this.maxFD;
      }else{
        return (this.maxFD-this.formSetUser.freeDay);
      }
    },

    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.setUser':function(val){
      var vueThis=this;
      if(val){
        this.formSetUser.name=this.name;
        this.formSetUser.groupCode=this.groupCode;


        this.fetchOptionsScheme('depositListScheme',function(){
          var isFind=vueThis.options_depositListScheme.find(function(v){
            return (window.Number(v.id)===window.Number(vueThis.depositID));
          });
          if(!isFind){
            vueThis.formSetUser.depositId='';
          }else{
            vueThis.formSetUser.depositId=''+vueThis.depositID;  //7
          }
        });


        this.formSetUser.freeDay=window.Number(this.freeDays);
        // this.formSetUser.scooterSNs=['G5A1A100702'];
        this.formSetUser.scooterSNs=this.scooters;
        this.formSetUser.phone=this.phone;
      }
    }
  },
  methods:{
    fetchBaseInfo:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userQuery,function(objRps){
        vueThis.agentFreeDays=window.Number(objRps.result.freeDays);
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
        done();
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
            freeDay:vueThis.formSetUser.freeDay?vueThis.formSetUser.freeDay:0,
            scooterSNs:vueThis.formSetUser.scooterSNs,
            phone:vueThis.formSetUser.phone
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
      this.fetchOptionsScheme('depositListScheme',function(){
        var isFind=vueThis.options_depositListScheme.find(function(v){
          return (window.Number(v.id)===window.Number(vueThis.formSetUser.depositId));
        });
        if(!isFind){
          vueThis.formSetUser.depositId='';
        }
      });
    }
  },  //methods
  created:function(){
    this.fetchBaseInfo();
    
    this.fetchEVlist();
    this.fetchGroupList();
    // console.log(this.$route.params);

  }
};
</script>

<style lang="css" scoped>
</style>
