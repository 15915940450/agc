<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="群组设置"
      :visible.sync="modalStore.groupSet"
      width="460px"
      :show-close="false"
      :close-on-click-modal="false"
      center>


      <div class="modal_wrap-body">
        <el-form :model="formGroupSet" :rules="rules" ref="formGroupSet">
          <el-form-item prop="name" label="群组名称" :label-width="formLabelWidth">
            <el-input v-model="formGroupSet.name" auto-complete="off" placeholder="限字母、数字、汉字，不超过10个字"></el-input>
          </el-form-item>
          <el-form-item prop="canRefund" label="群组类型" :label-width="formLabelWidth">
            <el-select v-model="formGroupSet.canRefund" placeholder="请选择" disabled>
              <el-option label="可退押金" value="1"></el-option>
              <el-option label="不可退押金" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="depositScheme" label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupSet.depositScheme" multiple placeholder="请选择">
              <!-- 199不限次/¥199/月卡套餐/30天/2000次 -->
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="packageScheme" label="套餐方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupSet.packageScheme" multiple placeholder="请选择">
              <!-- 199不限次/¥199/月卡套餐/30天/2000次 -->
              <el-option
                v-for="item in options_packageListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.price+' / '+typePackage[item.type]+' / '+item.duration+'天 / '+item.count+' 次')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('formGroupSet')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormGroupSet',
  props:['code','name','deposits','packages','type'],
  data:function(){
    return ({
      formGroupSet:{
        name:'',
        canRefund:'',
        depositScheme:[],
        packageScheme:[],
        groupCode:-1,
        agentId:window.localStorage.agentid
      },
      rules:{
        name:[
          {required:true,message:'群组名称不能为空',trigger:'blur'}
        ],
        // canRefund:[
        //   {required:true,message:'请选择群组类型',trigger:'change'}
        // ],
        depositScheme:[
          {required:true,message:'请选择一个或多个押金方案',trigger:'change'}
        ],
        packageScheme:[
          {required:true,message:'请选择一个或多个套餐方案',trigger:'change'}
        ]
      },
      typePackage:['月套卡','次套卡','免费套餐'],
      options_depositListScheme: [],
      options_packageListScheme: [],
      loading:false,

      formLabelWidth:'85px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.groupSet':function(val){
      if(val){
        this.formGroupSet.name=this.name;
        this.formGroupSet.canRefund=this.type+'';
        this.formGroupSet.depositScheme=this.deposits?this.deposits.map(function(v){return window.Number(v);}):[];
        this.formGroupSet.packageScheme=this.deposits?this.packages.map(function(v){return window.Number(v);}):[];
        this.formGroupSet.groupCode=this.code;
      }
    }
  },
  methods:{
    fetchOptionsScheme:function(type){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:null
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:969
      };
      ajaxs.imPostJson(urls[type],sendData,function(objRps){
        if(objRps.code===1000){
          if(type==='depositListScheme'){
            vueThis.options_depositListScheme=objRps.result.list;
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
    handleCancel:function(){
      // console.log(JSON.stringify(this.formGroupSet));  // resetFields,clearValidate
      this.$refs['formGroupSet'].resetFields();
      this.$store.commit('hideGroupSet');
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        // console.log(valid);
        if(valid){
          var sendData={
            name:vueThis.formGroupSet.name,
            depositScheme:vueThis.formGroupSet.depositScheme,
            packageScheme:vueThis.formGroupSet.packageScheme,
            agentId:window.localStorage.agentid,
            cityCode:0,
            // canRefund:window.Number(vueThis.formGroupSet.canRefund),
            groupCode:vueThis.formGroupSet.groupCode
          };
          // console.log(JSON.stringify(sendData));
          vueThis.loading=true;
          ajaxs.imPostJson(urls.groupSet,sendData,function(objRps){
            // console.log(objRps);
            vueThis.loading=false;
            if(objRps.code===1000){
              vueThis.$store.commit('hideGroupSet');
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

    }

  },  //methods
  created:function(){
    this.fetchOptionsScheme('depositListScheme');
    this.fetchOptionsScheme('packageListScheme');
  }

};
</script>

<style lang="css" scoped>

</style>
