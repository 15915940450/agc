<template lang="html">
  <div class="modal_wrap_status_top_up">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.statusTopUp"
      width="200px"
      :show-close="false"
      center>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleRetry()">重 试</el-button>
        <el-button type="primary" @click="handleComfirm()">确 定</el-button>
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
      return ('充值成功？');
    }
  },
  methods:{
    handleRetry:function(){
      console.log('retry');
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
