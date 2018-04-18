<template lang="html">
  <div class="component_user">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">群组管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="user_list">
      <!-- table wrap -->
      <BaseTableWrap />
    </div>

  </div>
</template>

<script>
import BaseTableWrap from '@/components/BaseTableWrap'; //@/=>src/

export default {
  name:'CUser',
  components:{
    BaseTableWrap
  }
};
</script>

<style lang="css" scoped>
.im_breadcrumb{
  background: #fff;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: -19px;
  padding:20px 40px;
}
.user_list{
  background: #FFF;
  margin-top: 20px;
}
</style>
