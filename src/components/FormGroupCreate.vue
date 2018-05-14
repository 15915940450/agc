<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="创建群组"
      :visible.sync="modalStore.groupCreate"
      width="460px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formGroupCreate" :rules="rules" ref="formGroupCreate">
          <el-form-item prop="name" label="群组名称" :label-width="formLabelWidth">
            <el-input v-model="formGroupCreate.name" auto-complete="off" placeholder="限字母、数字、汉字，不超过10个字"></el-input>
          </el-form-item>
          <el-form-item prop="canRefund" label="群组类型" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.canRefund" placeholder="请选择">
              <!-- 0不可退，1可退 -->
              <el-option v-if="grouptype!==0" label="可退押金" value="1"></el-option>
              <el-option v-if="grouptype!==1" label="不可退押金" value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="cityCode" label="选择城市" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.cityCode" placeholder="请选择">
              <el-option
                v-for="item in options_cityListScheme"
                :key="item.cityCode"
                :label="item.name"
                :value="item.cityCode">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="depositScheme" label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.depositScheme" multiple placeholder="请选择">
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
            <el-select v-model="formGroupCreate.packageScheme" multiple placeholder="请选择">
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
        <el-button @click="handleCancel('formGroupCreate')">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('formGroupCreate')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormGroupCreate',
  data:function(){
    return ({
      formGroupCreate:{
        name:'',
        canRefund:'',
        cityCode:'',
        depositScheme:[],
        packageScheme:[],
        agentId:window.localStorage.agentid
      },
      rules:{
        name:[
          {required:true,message:'群组名称不能为空',trigger:'blur'},
          {pattern:/^[A-Za-z0-9\u4e00-\u9fa5]{1,10}$/,message:'必须是1到10个汉字，字母，数字组合 ',trigger:'blur'}
        ],
        cityCode:[
          {required:true,message:'请选择城市',trigger:'change'}
        ],
        canRefund:[
          {required:true,message:'请选择群组类型',trigger:'change'}
        ],
        depositScheme:[
          {required:true,message:'请选择一个或多个押金方案',trigger:'change'}
        ],
        packageScheme:[
          {required:true,message:'请选择一个或多个套餐方案',trigger:'change'}
        ]
      },
      grouptype:0,
      typePackage:['月套卡','次套卡','免费套餐'],
      options_cityListScheme: [],
      options_depositListScheme: [],
      options_packageListScheme: [],
      loading:false,

      formLabelWidth:'90px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.groupCreate':function(val){
      if(val){
        this.fetchGroupType();
      }
    }
  },
  methods:{
    fetchCityList:function(){
      var vueThis=this;
      ajaxs.imGet(urls.cityList,{},function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.options_cityListScheme=objRps.result.list;
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
    handleCancel:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].resetFields();
      this.$store.commit('hideGroupCreate');
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        // console.log(valid);
        if(valid){
          var sendData={
            name:vueThis.formGroupCreate.name,
            depositScheme:vueThis.formGroupCreate.depositScheme,
            packageScheme:vueThis.formGroupCreate.packageScheme,
            agentId:window.localStorage.agentid,
            cityCode:vueThis.formGroupCreate.cityCode,
            canRefund:window.Number(vueThis.formGroupCreate.canRefund)
          };
          // console.log(JSON.stringify(sendData));
          vueThis.loading=true;
          ajaxs.imPostJson(urls.groupCreate,sendData,function(objRps){
            // console.log(objRps);
            vueThis.loading=false;
            if(objRps.code===1000){
              vueThis.$store.commit('hideGroupCreate');
              vueThis.$store.commit('showStatusGroupCreate');
              vueThis.$refs[refName].resetFields();
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
    fetchGroupType:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userQuery,function(objRps){
        vueThis.grouptype=objRps.result.groupType;
      });
    }

  },  //methods
  created:function(){
    this.fetchOptionsScheme('depositListScheme');
    this.fetchOptionsScheme('packageListScheme');
    this.fetchCityList();
    // this.fetchGroupType();
    // console.log(this.grouptype);
  }

};
</script>

<style lang="css" scoped>

</style>
