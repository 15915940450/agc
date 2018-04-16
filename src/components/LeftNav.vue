<template lang="html">
  <div class="left_nav">
    <el-menu default-active="2" class="el-menu-vertical-menu" @open="handleOpen" @close="handleClose">

      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script>
export default {
  name:'LeftNav',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="css" scoped>
.left_nav .el-menu{
  height: calc(100vh - 62px);
}
</style>
