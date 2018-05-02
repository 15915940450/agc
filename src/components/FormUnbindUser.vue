<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="phone"
      :visible.sync="modalStore.userUnbind"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        确定要解绑用户吗？此操作不可撤销。
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
  name:'BaseModalWrap',
  props:['phone'],
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
      this.$store.commit('hideUserUnbind');
    },
    handleComfirm:function(){
      // console.log('comfirm');
      var vueThis=this;
      vueThis.loading=true;
      var sendData={
        phone:vueThis.phone
      };
      ajaxs.imPostJson(urls.userUnbind,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.$store.commit('hideUserUnbind');
          vueThis.$store.commit('showBaseStatus');
        }
        vueThis.loading=false;
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>
