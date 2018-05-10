<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="激活电动车"
      :visible.sync="modalStore.EVin"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formEVin" :rules="rules" ref="formEVin">

          <el-form-item prop="scooterSN" label="车牌号(SN)" :label-width="formLabelWidth">
            <el-select v-model="formEVin.scooterSN" filterable placeholder="请选择">
              <el-option
                v-for="item in optionsEVs"
                :key="item.sn"
                :label="item.sn"
                :value="item.sn">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="车型" :label-width="formLabelWidth">
            <el-radio v-model="formEVin.scooterType" label="0">新车</el-radio>
            <el-radio v-model="formEVin.scooterType" label="1">改装车</el-radio>
          </el-form-item>

          <el-form-item prop="phone" label="手机号码" :label-width="formLabelWidth">
            <el-input v-model.number="formEVin.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('formEVin')">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('formEVin')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormEVin',
  data:function(){
    return ({
      formEVin:{
        phone:'',
        scooterSN:'',
        scooterType:'0',
        groupCode:this.$route.params.groupcode,
        agentId:window.localStorage.agentid
      },
      rules:{
        phone:[
          {type:'number',required:true,min:10000000000,max:99999999999,message:'手机号必须为11位数字',trigger:'change'}
        ],
        scooterSN:[
          {required:true,message:'请输入车牌号',trigger:'blur'}
        ]
      },
      optionsEVs:[],
      formLabelWidth:'100px',
      loading:false
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
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
    },
    handleCancel:function(refName){
      this.$refs[refName].resetFields();
      this.$store.commit('hideEVin');
    },
    handleComfirm:function(refName){
      var vueThis=this;

      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          var sendData={
            phone:vueThis.formEVin.phone,
            scooterSN:vueThis.formEVin.scooterSN,
            scooterType:vueThis.formEVin.scooterType,
            agentId:window.localStorage.agentid,
            groupCode:vueThis.formEVin.groupCode
          };
          // console.log(JSON.stringify(sendData));
          vueThis.loading=true;
          ajaxs.imPostJson(urls.EVin,sendData,function(objRps){
            // console.log(objRps);
            vueThis.loading=false;
            if(objRps.code===1000){
              vueThis.$refs[refName].resetFields();
              vueThis.$store.commit('hideEVin');
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
    this.fetchEVlist();
  }

};
</script>

<style lang="css" scoped>

</style>
