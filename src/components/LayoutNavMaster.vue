<template lang="html">
  <div class="left_nav">
    <el-menu
      :default-active="isActive"
      @select="handleSelect"
      :default-openeds="arrOpeneds"
      >
      <el-submenu index="100" v-if="showMenu('heartgroup')">
        <template slot="title">
          <i class="icon_menu heartgroup">icon_menu</i>
          <span>用户中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1" v-if="showSubMenu('用户查询')">
            <small class="sec">用户查询</small>
          </el-menu-item>
          <el-menu-item index="2" v-if="showSubMenu('群组管理')">
            <small class="sec">群组管理</small>
          </el-menu-item>
          <el-menu-item index="3" v-if="showSubMenu('群组管理')">
            <small class="sec">添加群组</small>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4" v-if="showMenu('heartdeposit')">
        <i class="icon_menu heartdeposit">icon_menu</i>
        <span slot="title">押金管理</span>
      </el-menu-item>
      <el-menu-item index="5" v-if="showMenu('heartcombo')">
        <i class="icon_menu heartcombo">icon_menu</i>
        <span slot="title">套餐管理</span>
      </el-menu-item>
      <el-menu-item index="6" v-if="showMenu('heartbigamount')">
        <i class="icon_menu heartbigamount">icon_menu</i>
        <span slot="title">大额充值</span>
      </el-menu-item>
      <el-menu-item index="7" v-if="showMenu('heartxls')">
        <i class="icon_menu heartxls">icon_menu</i>
        <span slot="title">报表管理</span>
      </el-menu-item>

      <el-submenu index="200" v-if="showMenu('heartevs')">
        <template slot="title">
          <div>
            <i class="icon_menu heartevs">icon_menu</i>
            <span>中控管理</span>
          </div>
        </template>
        <el-menu-item-group>
          <el-menu-item index="8" v-if="showSubMenu('中控列表')">
            <small class="sec">中控列表</small>
          </el-menu-item>
          <el-menu-item index="9" v-if="showSubMenu('中控分布')">
            <small class="sec">中控分布</small>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
var arrRouteName = [
  'HeartSearchUser',
  'HeartGroup-HeartUser-HeartUserChangePhone-HeartUserChangePhoneHistory-HeartUserCombo-HeartGroupSet',
  'HeartCreateGroup',
  'HeartDeposit',
  'HeartCombo-HeartComboHistory',
  'HeartBigAmount-HeartBigAmountHistory-HeartBigAmountDetail',
  'HeartXls',
  'HeartEVs-HeartEVamap-MapGeographic-MapTrack',
  'HeartEVallGeographic'
];

import { mapState } from 'vuex';

export default {
  name: 'LayoutNavMaster',
  data: function() {
    return {
      isActive: '1', //1,2,3,4,5(string)
      imNav: [
        {
          id: 1,
          name: '用户查询',
          theClass: 'heartsearchuser',
          link: '/searchuser'
        },
        {
          id: 2,
          name: '群组管理',
          theClass: 'heartgroup',
          link: '/group',
          navLevel: 2
        },
        {
          id: 3,
          name: '添加群组',
          theClass: 'heartcreategroup',
          link: '/groupcreate',
          navLevel: 2
        },
        {
          id: 4,
          name: '押金管理',
          theClass: 'heartdeposit',
          link: '/deposit'
        },
        {
          id: 5,
          name: '套餐管理',
          theClass: 'heartcombo',
          link: '/combo'
        },
        {
          id: 6,
          name: '大额充值',
          theClass: 'heartbigamount',
          link: '/bigamount'
        },
        {
          id: 7,
          name: '报表管理',
          theClass: 'heartxls',
          link: '/xls'
        },
        {
          id: 8,
          name: '中控管理',
          theClass: 'heartevs',
          link: '/evs/1',
          navLevel: 2
        },
        {
          id: 9,
          name: '中控分布',
          theClass: 'heartevallgeographic',
          link: '/evallgeographic',
          navLevel: 2
        }
      ]
    };
  },
  computed: {
    ...mapState(['agent']),
    arrOpeneds: function() {
      var arrOpeneds = [];
      // console.log(this.isActive);
      switch (true) {
      case +this.isActive === 1 || +this.isActive === 2 || +this.isActive === 3:
        arrOpeneds = ['100'];
        break;
      case +this.isActive === 8 || +this.isActive === 9:
        arrOpeneds = ['200'];
        break;
      default:
      }
      return arrOpeneds;
    }
  },
  methods: {
    showMenu: function(strHeartIcon) {
      return this.agent.agentMenus.some(function(v) {
        return v.icon === strHeartIcon;
      });
    },
    showSubMenu: function(strSubMenu) {
      return this.agent.agentMenus.some(function(v) {
        if (!v.menus.length) {
          return false;
        }
        return v.menus.some(function(vv) {
          return vv.menuName === strSubMenu;
        });
      });
    },
    handleSelect: function(index) {
      this.$router.push({
        path: this.imNav[index - 1].link
      });
    },
    setDefaultNavActive: function() {
      var vueThis = this;
      var defaultNavActive = _.findIndexVague(
        arrRouteName,
        vueThis.$route.name
      ); 
      vueThis.isActive =
        '' + (defaultNavActive === -1 ? 1 : defaultNavActive + 1);
    },
    listenRouteChange: function() {
      var vueThis = this;
      vueThis.$router.beforeEach((to, from, next) => {
        var navActive = _.findIndexVague(arrRouteName, to.name);
        vueThis.isActive = '' + (navActive === -1 ? 1 : navActive + 1);
        next();
      });
    }
  },
  created: function() {
    var vueThis = this;
    //创建的时候找出当前激活的导航,and listening
    vueThis.setDefaultNavActive();
    vueThis.listenRouteChange();
  }
};
</script>

<style lang="css" scoped>
.left_nav {
  position: relative;
}
.left_nav .icon_menu {
  display: inline-block;
  background: url(../assets/icon_menu.png) no-repeat 0 0;
  width: 24px;
  height: 20px;
  text-indent: -96900px;
  color: #ff6600;
  transition: all 0.2s ease-out;
}

.left_nav li {
  border-left: 4px solid #fff;
}
.left_nav .is-active {
  /*background: #FF6600;*/
  border-left: 4px solid #ff6600;
}
.left_nav li > ul > li,
.left_nav li > ul > li.is-active {
  border-left: none;
  /*padding-left: 20px;*/
}
.left_nav small.sec {
  font-size: 13px;
  margin-left: 10px;
}

.left_nav .icon_menu.heartjoy {
  background-position: -60px -16px;
}
.left_nav .is-active .icon_menu.heartjoy {
  background-position: -10px -16px;
}
.left_nav .icon_menu.heartgroup {
  background-position: -60px -66px;
}
.left_nav .is-active .icon_menu.heartgroup {
  background-position: -10px -66px;
}
.left_nav .icon_menu.heartdeposit {
  background-position: -60px -116px;
}
.left_nav .is-active .icon_menu.heartdeposit {
  background-position: -10px -116px;
}
.left_nav .icon_menu.heartcombo {
  background-position: -60px -166px;
}
.left_nav .is-active .icon_menu.heartcombo {
  background-position: -10px -166px;
}

.left_nav .icon_menu.heartbigamount {
  background-position: -60px -216px;
}
.left_nav .is-active .icon_menu.heartbigamount {
  background-position: -10px -216px;
}
.left_nav .icon_menu.heartxls {
  background-position: -60px -266px;
}
.left_nav .is-active .icon_menu.heartxls {
  background-position: -10px -266px;
}
.left_nav .icon_menu.heartevs {
  background-position: -60px -316px;
}
.left_nav .is-active .icon_menu.heartevs {
  background-position: -10px -316px;
}
.left_nav .icon_menu.heartsyssetting {
  background-position: -60px -366px;
}
.left_nav .is-active .icon_menu.heartsyssetting {
  background-position: -10px -366px;
}
</style>
