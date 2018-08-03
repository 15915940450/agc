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
            <el-input v-model="formNewUser.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
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
          {type:'string',required:true,pattern:/^1(3|4|5|7|8)\d{9}$/,message:'请输入正确的手机号码',trigger:'blur'}
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
          vueThis.$rqs(vueThis.$yApi.userCreate,function(){
            vueThis.$store.commit('hideNewUser');
            vueThis.$store.commit('showBaseStatus');
            vueThis.$refs[refName].resetFields();
          },{
            objSendData:sendData
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
