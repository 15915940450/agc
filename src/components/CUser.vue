<template lang="html">
  <div class="component_user">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">群组管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="user_list" v-if="user">
      <!-- table wrap -->
      <BaseTableWrap />
    </div>
    <div v-if="!user" class="empty_user">
      <img src="../assets/empty_user.png" />
      <p>您还没有用户哦！</p>
      <el-button type="primary" size="small">新建</el-button>
    </div>

    <!-- 新建 -->
    <BaseModalWrap />

  </div>
</template>

<script>
import BaseTableWrap from '@/components/BaseTableWrap'; //@/=>src/
import BaseModalWrap from './BaseModalWrap';

export default {
  name:'CUser',
  data:function(){
    return ({
      user:0
    });
  },
  components:{
    BaseTableWrap,
    BaseModalWrap
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
/* 没有用户 */
.empty_user{
  background: #FFF;
  text-align: center;
  padding-bottom: 30px;
  margin-top:20px;
  min-height: calc(100vh - 60px - 60px - 20px - 40px - 30px);
}
.empty_user .title{
  text-align: left;
}
.empty_user img{
  margin-top:100px;
}
.empty_user p{
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}
</style>
