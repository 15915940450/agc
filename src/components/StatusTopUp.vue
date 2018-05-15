<template lang="html">
  <div class="modal_wrap modal_wrap-empty_body">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.statusTopUp"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleComfirm()">已完成支付</el-button>
        <el-button @click="handleRetry()" type="primary">重新支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'StatusTopUp',
  computed:{
    ...mapState(['modalStore']),
    title:function(){
      return ('请在新打开的第三方支付页面完成支付');
    }
  },
  methods:{
    handleRetry:function(){
      window.open(window.sessionStorage.payurl);
    },
    handleComfirm:function(){
      var vueThis=this;
      vueThis.$store.commit('hideStatusTopUp');
    }
  }
};
</script>

<style lang="css" scoped>

</style>
