<template lang="html">
  <div class="left_nav">
    <ul id="im_nav">
      <li v-for="(item) in imNav" :class="{active:isActive===item.id}" :key="item.id">
        <a href="javascript:;" @click="rrPush(item)">{{item.name}}</a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name:'LeftNav',
  data:function(){
    return ({
      isActive:1,
      imNav:[
        {
          id:1,
          name:'首页概览',
          link:'/'
        },
        {
          id:2,
          name:'群组管理',
          link:'/group'
        },
        {
          id:3,
          name:'押金管理',
          link:'/deposit/1'
        },
        {
          id:4,
          name:'车辆管理',
          link:'/evs/1'
        },
        {
          id:5,
          name:'系统管理',
          link:'/sys'
        }
      ]
    });
  },
  methods:{
    rrPush:function(item){
      // 编程式导航
      this.$router.push({
        path:item.link
      });

    },
    setDefaultNavActive:function(){
      var vueThis=this;
      var arrRs=['pre_http://localhost:1590/#/_fix','group','deposit','evs','sys'];
      var defaultNavActive='1';
      arrRs.forEach(function(v,i){
        if(window.location.href.indexOf(v)!==-1){
          defaultNavActive=(i+1);
          vueThis.isActive=defaultNavActive+1;
        }
      });
    },
    listenRouteChange:function(){
      var vueThis=this;
      var arrToName=['CJoy','CGroup-CUser','CDeposit','EVs-EV','CSys'];
      vueThis.$router.beforeEach((to, from, next) => {
        // console.log(to.name);
        var navActive=arrToName.findIndex(function(v){
          return v.indexOf(to.name)!==-1;
        });
        // console.log(vueThis.$store);
        // vueThis.$store.commit('setNavActive',navActive+1);
        vueThis.isActive=navActive+1;

        next();
      });
    }
  },
  created:function(){
    var vueThis=this;
    //创建的时候找出当前激活的导航,and listening
    vueThis.setDefaultNavActive();
    vueThis.listenRouteChange();
  }
};
</script>

<style lang="css" scoped>
  #im_nav,#im_nav *{
    margin: 0;
    padding: 0;
  }
  #im_nav{}
  #im_nav li{
    height: 50px;
    /* border-bottom: 1px solid #90DEFF; */
  }

  #im_nav li a{
    display: block;
    font-size: 14px;
    color:#333333;
    line-height: 50px;
    padding-left: 50px;
    border-left:3px solid #FFF;
  }
  #im_nav li:hover a{
    border-left:3px solid #FFF;
    color:#FF6600;
  }
  #im_nav li.active a{
    border-left:3px solid #FF6600;
    color:#FF6600;
  }
  #im_nav li:nth-child(1) a{
    background: url(../assets/nav_home.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(2) a{
    background: url(../assets/nav_group.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(3) a{
    background: url(../assets/nav_money.png) no-repeat 20px center;
  }
  #im_nav li:nth-child(4) a{
    background: url(../assets/nav_bike.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(5) a{
    background: url(../assets/nav_system.jpg) no-repeat 20px center;
  }

  #im_nav li:nth-child(1):hover a{
    background: url(../assets/nav_home_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(2):hover a{
    background: url(../assets/nav_group_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(3):hover a{
    background: url(../assets/nav_money_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(4):hover a{
    background: url(../assets/nav_bike_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(5):hover a{
    background: url(../assets/nav_system_active.png) no-repeat 20px center;
  }
  #im_nav li:nth-child(1).active a{
    background: url(../assets/nav_home_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(2).active a{
    background: url(../assets/nav_group_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(3).active a{
    background: url(../assets/nav_money_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(4).active a{
    background: url(../assets/nav_bike_active.jpg) no-repeat 20px center;
  }
  #im_nav li:nth-child(5).active a{
    background: url(../assets/nav_system_active.png) no-repeat 20px center;
  }


</style>
