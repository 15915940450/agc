<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.EVbind"
      width="350px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formEVbind" :rules="rules" ref="formEVbind">

          <el-form-item prop="userId" label="用户手机号" :label-width="formLabelWidth">
            <el-select v-model="formEVbind.userId" filterable placeholder="请选择">
              <el-option
                v-for="item in optionsUsers"
                :key="item.phone"
                :label="(item.phone+item.name)"
                :value="item.phone">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('formEVbind')">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('formEVbind')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormEVbind',
  props:['scooterSid','scooterSN'],
  data:function(){
    return ({
      formEVbind:{
        userId:''
      },
      rules:{
        userId:[
          {required:true,message:'请选择用户',trigger:'change'}
        ]
      },
      optionsUsers:[],
      formLabelWidth:'100px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    title:function(){
      return ('绑定电动车('+this.scooterSN+')');
    }
  },
  methods:{
    handleCancel:function(refName){
      this.$refs[refName].resetFields();
      this.$store.commit('hideEVbind');
    },
    handleComfirm:function(refName){
      // console.log(this.scooterSid);
      var vueThis=this;
      var sendData={
        userId:vueThis.formEVbind.userId,
        scooterSid:vueThis.scooterSid
      };
      //请求地址
      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          ajaxs.imPostJson(urls.EVbind,sendData,function(objRps){
            // console.log(objRps);
            if(objRps.code===1000){
              vueThis.$refs[refName].resetFields();
              vueThis.$store.commit('hideEVbind');
              vueThis.$store.commit('showStatusEVoperation');
            }
          });
        }
      });

    },
    fetchUserlist:function(){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:null
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:96900000
      };
      //请求地址
      ajaxs.imGet(urls.userList,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.optionsUsers=objRps.result.list;
        }
      });
    }
  },  //methods
  created:function(){
    this.fetchUserlist();
  }
};
</script>

<style lang="css" scoped>
</style>
