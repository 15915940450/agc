<template lang="html">
  <div class="modal_wrap_status_refund">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.statusRefund"
      width="200px"
      :show-close="false"
      :close-on-click-modal="false"
      center>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleComfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'StatusRefund',
  computed:{
    ...mapState(['modalStore']),
    title:function(){
      return ('退款已成功申请');
    }
  },
  methods:{
    handleComfirm:function(){
      var vueThis=this;
      vueThis.$store.commit('hideStatusRefund');
    }
  }
};
</script>

<style lang="css" scoped>

</style>
