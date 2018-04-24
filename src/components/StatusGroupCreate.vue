<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.statusGroupCreate"
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
  name:'StatusGroupCreate',
  computed:{
    ...mapState(['modalStore']),
    title:function(){
      return ('创建成功');
    }
  },
  methods:{
    handleComfirm:function(){
      this.$store.commit('hideStatusGroupCreate');
    }
  }
};
</script>

<style lang="css" scoped>

</style>
