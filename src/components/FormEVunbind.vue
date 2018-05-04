<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="scooterSN"
      :visible.sync="modalStore.EVunbind"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        确定将电动车与用户解绑？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleComfirm()" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {urls,ajaxs} from '../api/urls.js'; //引入api(ajax)
import {mapState} from 'vuex';

export default {
  name:'FormEVunbind',
  props:['scooterSid','scooterSN'],
  data:function(){
    return ({
      loading:false
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    handleCancel:function(){
      this.$store.commit('hideEVunbind');
    },
    handleComfirm:function(){
      // console.log('comfirm');
      var vueThis=this;
      vueThis.loading=true;
      var sendData={
        scooterSid:vueThis.scooterSid
      };
      // console.log(sendData);
      ajaxs.imPostJson(urls.EVunbind,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.$store.commit('hideEVunbind');
          vueThis.$store.commit('showStatusEVoperation');
        }
        vueThis.loading=false;
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>
