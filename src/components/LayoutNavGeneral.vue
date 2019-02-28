<template lang="html">
	<div class="left_nav">
		<el-menu :default-active="isActive" @select="handleSelect">
			<el-menu-item index="1">
				<i class="icon_menu heartsubagent">icon_menu</i>
				<span slot="title">代理商管理</span>
			</el-menu-item>
			<el-menu-item index="2">
				<i class="icon_menu heartstores">icon_menu</i>
				<span slot="title">网点管理</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
var arrRouteName = ["HeartSubAgent", "HeartStores"];

export default {
  name: "LayoutNavGeneral",
  data: function() {
    return {
      isActive: "1",
      imNav: [
        {
          id: 1,
          name: "代理商管理",
          theClass: "HeartSubAgent",
          link: "/1"
        },
        {
          id: 2,
          name: "门店管理",
          theClass: "HeartStores",
          link: "/stores/1"
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleSelect: function(index) {
      // console.log(index);
      this.$router.push({
        path: this.imNav[index - 1].link
      });
    },
    setDefaultNavActive: function() {
      var vueThis = this;
      var defaultNavActive = _.findIndexVague(
        arrRouteName,
        vueThis.$route.name
      ); //-1,0,1,2,3,4
      vueThis.isActive =
        "" + (defaultNavActive === -1 ? 1 : defaultNavActive + 1);
    },
    listenRouteChange: function() {
      var vueThis = this;
      vueThis.$router.beforeEach((to, from, next) => {
        var navActive = _.findIndexVague(arrRouteName, to.name);
        vueThis.isActive = "" + (navActive === -1 ? 1 : navActive + 1);
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
.left_nav .icon_menu.heartsubagent {
  background: url(../assets/menu_subAgent.png) no-repeat 0 0;
}
.left_nav .is-active .icon_menu.heartsubagent {
  background: url(../assets/menu_subAgent_Active.png) no-repeat 0 0;
}
.left_nav .icon_menu.heartstores {
  background: url(../assets/menu_stores.png) no-repeat 0 0;
}
.left_nav .is-active .icon_menu.heartstores {
  background: url(../assets/menu_stores_active.png) no-repeat 0 0;
}
</style>