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
            <el-select v-model="formSetUser.depositId" multiple placeholder="请选择">
              <!-- 199不限次/¥199/月卡套餐/30天/2000次 -->
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="freeDay" label="免费天数" :label-width="formLabelWidth">
            <el-input-number v-model="formSetUser.freeDay" :min="0" :max="9999"></el-input-number>
          </el-form-item>

          <!-- <el-form-item label="可用电池数" :label-width="formLabelWidth">
            <el-input v-model.number="formSetUser.name" auto-complete="off" placeholder="剩余可分配电池 100 天"></el-input>
          </el-form-item> -->

          <el-form-item prop="scooterSN" label="车牌号(SN)" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.scooterSN" multiple filterable placeholder="请选择">
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
  props:['name','groupCode','depositCode','freeDays','scooters','phone'],
  data:function(){
    return ({
      formSetUser:{
        scooterSN:[],
        freeDay:-1,
        groupCode:'',
        depositId:[],
        phone:''
      },
      rules:{
        groupCode:[
          {required:true,message:'请选择一个群组',trigger:'change'}
        ],
        depositId:[
          {required:true,message:'请选择一个或多个押金方案',trigger:'change'}
        ],
        freeDay:[
          {required:true,message:'免费天数不能为空',trigger:'change'}
        ],
        scooterSN:[
          {required:true,message:'请选择一辆电动车',trigger:'change'}
        ]
      },
      optionsEVs:[],
      optionsGroups:[],
      options_depositListScheme: [],
      loading:false,
      formLabelWidth:'100px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.setUser':function(val){
      // console.log(window.Number(this.freeDays));
      if(val){
        this.formSetUser.name=this.name;
        this.formSetUser.groupCode=this.groupCode;
        this.formSetUser.depositId=this.depositCode;
        this.formSetUser.freeDay=window.Number(this.freeDays);
        // this.formSetUser.scooterSN=['G5A1A100702'];
        this.formSetUser.scooterSN=this.scooters;
        this.formSetUser.phone=this.phone;
      }
    }
  },
  methods:{
    fetchGroupList:function(){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        agentId:window.sessionStorage.agentid
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
        }
      });
    },
    fetchOptionsScheme:function(type){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:null
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:96900000
      };
      ajaxs.imPostJson(urls[type],sendData,function(objRps){
        // console.log(JSON.stringify(objRps));
        if(objRps.code===1000){
          if(type==='depositListScheme'){
            vueThis.options_depositListScheme=objRps.result.list;
          }
          if(type==='packageListScheme'){
            vueThis.options_packageListScheme=objRps.result.list;
          }
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
            scooterSN:vueThis.formSetUser.scooterSN,
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
            }
          });
        }
      });

    },
    fetchEVlist:function(){
      var vueThis=this;
      var sendData={
        phone:''+window.sessionStorage.agentphone,
        pageNum:1,
        pageSize:96900000
      };
      //请求地址
      ajaxs.imPostForm(urls.evsList,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.optionsEVs=objRps.result.list;
        }
      });
    }
  },  //methods
  created:function(){
    this.fetchOptionsScheme('depositListScheme');
    this.fetchEVlist();
    this.fetchGroupList();
  }
};
</script>

<style lang="css" scoped>
</style>
