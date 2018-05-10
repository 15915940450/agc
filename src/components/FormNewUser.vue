<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="添加用户"
      :visible.sync="modalStore.newUser"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formNewUser" :rules="rules" ref="formNewUser">

          <el-form-item prop="phone" label="手机号码" :label-width="formLabelWidth">
            <el-input v-model.number="formNewUser.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('formNewUser')">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('formNewUser')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormNewUser',
  data:function(){
    return ({
      formNewUser:{
        phone:'',
        groupCode:this.$route.params.groupcode
      },
      rules:{
        phone:[
          {type:'number',required:true,min:10000000000,max:99999999999,message:'手机号必须为11位数字',trigger:'change'}
        ]
      },
      formLabelWidth:'100px',
      loading:false
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    handleCancel:function(refName){
      this.$refs[refName].resetFields();
      this.$store.commit('hideNewUser');
    },
    handleComfirm:function(refName){
      var vueThis=this;

      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          var sendData={
            userPhone:vueThis.formNewUser.phone,
            groupCode:vueThis.formNewUser.groupCode
          };
          vueThis.loading=true;
          ajaxs.imPostJson(urls.newUser,sendData,function(objRps){
            // console.log(objRps);
            vueThis.loading=false;
            if(objRps.code===1000){
              vueThis.$store.commit('hideNewUser');
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
    // console.log(this.$route.params);
  }

};
</script>

<style lang="css" scoped>

</style>
