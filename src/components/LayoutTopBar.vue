<template lang="html">
  <div class="top_bar">
    <el-row>
      <el-col :span="6">
        <h1 id="agc_logo">
          <a href="javascript:;">门店后台</a>
        </h1>
      </el-col>
      <el-col :span="18" class="topbar_right_wrap">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img class="top_bar-head" src="../assets/default_head.png" width="20" />
            {{agent.storeName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item split-button>
              <a @click="logout()" class="topbar_user">退出</a>
            </el-dropdown-item>
            <el-dropdown-item></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <el-tooltip class="item" effect="light" content="切换门店" placement="bottom">
         <img @click="handleChangeShop()" class="changeShopClass" src="../assets/bar_changeShop.png" />
       </el-tooltip>
        <el-tooltip class="item" effect="light" content="进入工作台" placement="bottom">
          <img @click="hanleGoWorkbench()" class="goWorkbenchClass" src="../assets/bar_goWorkbench.png" />
        </el-tooltip>
        <!-- 切换门店 -->
        <!-- <el-button 
          v-if="modalStore.showChangeShop"
          class="change_shop" 
          type="text" 
          size="medium"
          @click="handleChangeShop()"
          >
          切换门店
        </el-button> -->
      </el-col>
    </el-row>


  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LayoutTopBar",
  data: function() {
    return {};
  },
  computed: {
    ...mapState(["agent", "modalStore"])
  },
  methods: {
    logout: function() {
      var vueThis = this;
      vueThis.$rqs(vueThis.$yApi.userLogout, function() {
        window.localStorage.removeItem("agentphone");
        window.localStorage.removeItem("agenttype");
        vueThis.$router.push({
          path: "/"
        });
      });
    },
    toSys: function() {
      // 编程式导航
      this.$router.push({
        path: "/sys"
      });
    },
    handleChangeShop: function() {
      this.$store.commit("setNeedFetchD");
    },
    hanleGoWorkbench: function() {
      this.$router.push({
        path: "/general"
      });
    }
  }, //methods
  created: function() {}
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
  width: 95px;
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
  cursor: pointer;
}
.topbar_user {
  min-width: 66px;
  display: block;
  font-size: 13px;
}
.change_shop {
  color: #337ab7;
  float: right;
  margin-right: 15px;
  margin-top: 13px;
}
.changeShopClass {
  width: 16px;
  height: 14px;
  margin-right: 15px;
  margin-top: 24px;
  float: right;
}

.goWorkbenchClass {
  width: 16px;
  height: 14px;
  margin-right: 15px;
  margin-top: 24px;
  float: right;
}
</style>
