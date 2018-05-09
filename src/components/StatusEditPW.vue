<template lang="html">
  <div class="modal_wrap modal_wrap-empty_body">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.statusEditPW"
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
  name:'StatusEditPW',
  props:['msg'],
  computed:{
    ...mapState(['modalStore']),
    title:function(){
      return (this.msg);
    }
  },
  methods:{
    handleComfirm:function(){
      //回到登录
      this.$router.push('/');
      this.$store.commit('showLogin');
      this.$store.commit('setNavActive',1);
    }
  }
};
</script>

<style lang="css" scoped>

</style>
