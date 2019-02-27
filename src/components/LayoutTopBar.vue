<template lang="html">
  <div class="top_bar">
    <el-row>
      <el-col :span="6">
        <h1 id="agc_logo">
          <a href="javascript:;">代理商后台</a>
        </h1>
      </el-col>
      <el-col :span="18" class="topbar_right_wrap">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="top_bar-head" src="../assets/default_head.png" width="20" />
            {{agent.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a @click="toSys()" class="topbar_user">设置</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a @click="logout()" class="topbar_user">退出</a>
            </el-dropdown-item>
            <el-dropdown-item></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 切换网点 -->
        <el-button 
          v-if="showChangeShop"
          class="change_shop" 
          type="text" 
          size="medium"
          @click="handleChangeShop()"
          >
          切换网点
        </el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'LayoutTopBar',
  data:function(){
    return ({
      showChangeShop:false
    });
  },
  computed:{
    ...mapState(['agent'])
  },
  methods:{
    logout:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userLogout,function(){
        vueThis.$store.commit('showLogin');
      });
    },
    toSys:function(){
      // 编程式导航
      this.$router.push({
        path:'/sys'
      });
    },
    handleChangeShop:function(){
      this.$store.commit('showShop');
    }
  }, //methods
  created:function(){
    this.showChangeShop=!window.sessionStorage.totalshopisonly;
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
    display: inline-block;
    width: 95px;
    padding-left: 30px;
    height: 60px;
    line-height: 60px;
    background: url(../assets/e_logo.png) no-repeat 0 center;
    background-size: 26px 26px;
    font-size: 18px;
    color: #333333;
  }

  .top_bar-head{
    background: #6DCFF6;
    border-radius: 90px;
    vertical-align: middle;
  }
  .topbar_right_wrap{
    height: 60px;
    line-height: 60px;
    padding-right: 20px;
  }
  .topbar_right_wrap .el-dropdown{
    float: right;
    cursor: pointer;
  }
  .topbar_user{
    min-width: 66px;
    display: block;
    font-size: 13px;
  }
  .change_shop{
    color:blueviolet;
    float: right;
    margin-right: 30px;
    margin-top: 13px;
  }
</style>
