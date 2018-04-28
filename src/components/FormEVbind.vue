<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="绑定电动车"
      :visible.sync="modalStore.EVbind"
      width="350px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formEVbind">
          <el-form-item label="用户手机号" :label-width="formLabelWidth">
            <el-input placeholder="请输入用户手机号码" v-model="formEVbind.userId" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.EVbind = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormEVbind',
  props:['scooterSid'],
  data:function(){
    return ({
      formEVbind:{
        userId:''
      },
      formLabelWidth:'100px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    handleComfirm:function(){
      // console.log(this.scooterSid);
      var vueThis=this;
      var sendData={
        userId:vueThis.formEVbind.userId,
        scooterSid:vueThis.scooterSid
      };
      //请求地址
      ajaxs.imPostJson(urls.EVbind,sendData,function(objRps){
        console.log(objRps);
        if(objRps.code===1000){
          vueThis.total=objRps.result.total;
          vueThis.evs=objRps.result.list;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>
