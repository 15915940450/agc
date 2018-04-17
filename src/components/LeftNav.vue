<template lang="html">
  <div class="left_nav">
    <el-menu default-active="3" class="el-menu-vertical-menu">

      <el-menu-item index="1" class="nav_home" @click="rrPush('/')">
        <span slot="title">首页概览</span>
      </el-menu-item>
      <el-menu-item index="2" class="nav_group" @click="rrPush('/group')">
        <span slot="title">群组管理</span>
      </el-menu-item>
      <el-menu-item index="3" class="nav_money" @click="rrPush('/deposit/1')">
        <span slot="title">押金管理</span>
      </el-menu-item>
      <el-menu-item index="4" class="nav_bike">
        <span slot="title">车辆管理</span>
      </el-menu-item>
      <el-menu-item index="5" class="nav_system">
        <span slot="title">系统管理</span>
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script>
export default {
  name:'LeftNav',
  methods:{
    rrPush:function(rr){
      this.$router.push({
        path:rr
      });
      // router.push({ path: `/user/${userId}` }) // -> /user/123
    }
  }
};
</script>

<style lang="css" scoped>
.left_nav .el-menu{
  height: calc(100vh - 62px);
}

.left_nav .nav_home{
  background: url(../assets/nav_home.jpg) no-repeat 20px center;
  padding-left: 50px !important;
}
.left_nav .nav_group{
  background: url(../assets/nav_group.jpg) no-repeat 20px center;
  padding-left: 50px !important;
}
.left_nav .nav_money{
  background: url(../assets/nav_money.png) no-repeat 20px center;
  padding-left: 50px !important;
}
.left_nav .nav_bike{
  background: url(../assets/nav_bike.jpg) no-repeat 20px center;
  padding-left: 50px !important;
}
.left_nav .nav_system{
  background: url(../assets/nav_system.jpg) no-repeat 20px center;
  padding-left: 50px !important;
}
/* active */
.left_nav .nav_home.is-active{
  background: url(../assets/nav_home_active.jpg) no-repeat 20px center;
}
.left_nav .nav_group.is-active{
  background: url(../assets/nav_group_active.jpg) no-repeat 20px center;
}
.left_nav .nav_money.is-active{
  background: url(../assets/nav_money_active.jpg) no-repeat 20px center;
}
.left_nav .nav_bike.is-active{
  background: url(../assets/nav_bike_active.jpg) no-repeat 20px center;
}
.left_nav .nav_system.is-active{
  background: url(../assets/nav_system_active.png) no-repeat 20px center;
}
</style>
