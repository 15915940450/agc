<template lang="html">
  <div class="top_bar">
    <el-row>
      <el-col :span="6">
        <h1 id="agc_logo">
          <a href="javascript:;">代理商工作台</a>
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
              <a @click="logout()" class="topbar_user">退出</a>
            </el-dropdown-item>
            <el-dropdown-item></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LayoutTopBarGeneral",
  computed: {
    ...mapState(["agent"])
  },
  methods: {
    logout: function() {
      var vueThis = this;
      vueThis.$rqs(vueThis.$yApi.userLogout, function() {
        vueThis.$store.commit("showLogin");
      });
    },
  } //methods
};
</script>

<style lang="css" scoped>
.top_bar {
  border-bottom: 1px solid #edf0f5;
  box-shadow: 2px 0px 6px rgba(204, 204, 204, 0.21);
}
#agc_logo {
  margin: 0;
  padding: 0;
  padding-left: 20px;
}
#agc_logo a {
  display: inline-block;
  width: 120px;
  padding-left: 30px;
  height: 60px;
  line-height: 60px;
  background: url(../assets/e_logo.png) no-repeat 0 center;
  background-size: 26px 26px;
  font-size: 18px;
  color: #333333;
}

.top_bar-head {
  background: #6dcff6;
  border-radius: 90px;
  vertical-align: middle;
}
.topbar_right_wrap {
  height: 60px;
  line-height: 60px;
  padding-right: 20px;
}
.topbar_right_wrap .el-dropdown {
  float: right;
}
.topbar_user {
  min-width: 66px;
  display: block;
  font-size: 13px;
}
</style>
