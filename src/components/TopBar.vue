<template lang="html">
  <div class="top_bar">
    <el-row>
      <el-col :span="6">
        <h1 id="agc_logo">
          <a href="javascript:;">代理商后台</a>
        </h1>
      </el-col>
      <el-col :span="18">
        <el-menu :default-active="activeIndex" class="el-menu-wrap" mode="horizontal" @select="handleSelect">

          <el-submenu index="2">
            <template slot="title">
              <i class="top_bar-head"></i>harry
            </template>
            <el-menu-item index="2-1" class="sub_item">
              设置
            </el-menu-item>
            <el-menu-item index="2-2" class="sub_item">
              退出so
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>


  </div>
</template>

<script>
export default {
  name:'TopBar',
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="css" scoped>
#agc_logo{
  margin: 0;
  padding: 0;
  padding-left:20px;
}
#agc_logo a{
  text-indent: -969em;
  display: inline-block;
  width: 120px;
  height: 60px;
  background: url(../assets/agc_logo.jpg) no-repeat center center;
}
.top_bar-head{
  margin-right: 10px;
  display: inline-block;
  width:20px;
  height: 60px;
  background:url(../assets/default_head.png) no-repeat center center;
}
.top_bar .el-menu--horizontal > .el-submenu{
  float: right;
}
.el-menu-wrap{
  padding-right:10px;
}


</style>
