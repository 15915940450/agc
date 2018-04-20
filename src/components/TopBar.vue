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
            <el-menu-item index="2-2" class="sub_item" @click="logout()">
              退出
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import {urls,imPostForm} from '../api/urls.js';

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
      // console.log(key, keyPath);
    },
    logout:function(){
      var vueThis=this;
      imPostForm(urls.logout,{},function(rps){
        // console.log(rps);
        try{
          var objRps=JSON.parse(rps);
          if(objRps.code===1000){
            vueThis.$store.commit('showLogin');
          }
        }catch(err){
          _.logErr(err);
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
.top_bar{
  border-bottom:1px solid #edf0f5;
  box-shadow:2px 0px 6px rgba(204,204,204,0.21)
}
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
