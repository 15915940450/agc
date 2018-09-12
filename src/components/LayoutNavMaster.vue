<template lang="html">
  <div class="left_nav">
    <ul id="im_nav">
      <li v-for="(item) in imNav" :class="{active:(isActive+'')===(item.id+'')}" :key="item.id">
        <a :class="item.theClass" href="javascript:;" @click="rrPush(item)">
          <i class="icon_menu">icon_menu</i>
          <span>{{item.name}}</span>
        </a>
      </li>
    </ul>
    <div class="indicator"></div>
  </div>
</template>

<script>
var arrRouteName=[
  'HeartJoy',
  'HeartGroup-HeartUser-HeartUserChangePhone-HeartUserChangePhoneHistory',
  'HeartDeposit',
  'HeartCombo-HeartComboHistory',
  'HeartBigAmount',
  'HeartXls',
  'HeartEVs-HeartEVamap-MapGeographic-MapTrack',
  'HeartSysSetting'
];

export default {
  name:'LayoutNavMaster',
  data:function(){
    return ({
      isActive:1, //1,2,3,4,5
      imNav:[
        {
          id:1,
          name:'首页概览',
          theClass:'heartjoy',
          link:'/'
        },
        {
          id:2,
          name:'用户中心',
          theClass:'heartgroup',
          link:'/group'
        },
        {
          id:3,
          name:'押金管理',
          theClass:'heartdeposit',
          link:'/deposit'
        },
        {
          id:4,
          name:'套餐管理',
          theClass:'heartcombo',
          link:'/combo'
        },
        {
          id:5,
          name:'大额充值',
          theClass:'heartbigamount',
          link:'/bigamount'
        },
        {
          id:6,
          name:'报表管理',
          theClass:'heartxls',
          link:'/xls'
        },
        {
          id:7,
          name:'中控管理',
          theClass:'heartevs',
          link:'/evs/1'
        },
        {
          id:8,
          name:'系统设置',
          theClass:'heartsyssetting',
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
      var defaultNavActive=_.findIndexVague(arrRouteName,vueThis.$route.name);  //-1,0,1,2,3,4
      vueThis.isActive=(defaultNavActive===-1?1:defaultNavActive+1);
    },
    listenRouteChange:function(){
      var vueThis=this;
      vueThis.$router.beforeEach((to, from, next) => {
        var navActive=_.findIndexVague(arrRouteName,to.name);
        vueThis.isActive=(navActive===-1?1:navActive+1);
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
  .left_nav{
    position: relative;
  }
  #im_nav,#im_nav *{
    margin: 0;
    padding: 0;
  }
  #im_nav li{
    height: 50px;
    list-style: none;
    overflow: hidden;
  }

  #im_nav li a{
    display: block;
    font-size: 14px;
    font-weight: 500;
    color:#333333;
    line-height: 50px;
    height: 50px;
  }
  #im_nav li:hover a,#im_nav li.active a{
    color:#FF6600;
  }
  #im_nav li a .icon_menu{
    display: inline-block;
    background:url(../assets/icon_menu.png) no-repeat 0 0;
    width: 50px;
    height: 20px;
    text-indent: -96900px;
    position: relative;
    top:15px;
    border-left:3px solid #FFF;
    color:#FF6600;
    transition: all 0.2s ease-out;
  }
  #im_nav li.active a .icon_menu{
    border-left:3px solid #FF6600;
  }
  .indicator{
    display: none;
  }
  /*joy*/
  #im_nav li a.heartjoy .icon_menu{
    background-position: -40px -15px;
  }
  #im_nav li.active a.heartjoy .icon_menu{
    background-position: 10px -15px;
  }
  /*group*/
  #im_nav li a.heartgroup .icon_menu{
    background-position: -40px -65px;
  }
  #im_nav li.active a.heartgroup .icon_menu{
    background-position: 10px -65px;
  }
  /*deposit*/
  #im_nav li a.heartdeposit .icon_menu{
    background-position: -40px -115px;
  }
  #im_nav li.active a.heartdeposit .icon_menu{
    background-position: 10px -115px;
  }
  /*combo*/
  #im_nav li a.heartcombo .icon_menu{
    background-position: -40px -165px;
  }
  #im_nav li.active a.heartcombo .icon_menu{
    background-position: 10px -165px;
  }
  /*evs*/
  #im_nav li a.heartevs .icon_menu{
    background-position: -40px -215px;
  }
  #im_nav li.active a.heartevs .icon_menu{
    background-position: 10px -215px;
  }
  /*syssetting*/
  #im_nav li a.heartsyssetting .icon_menu{
    background-position: -40px -265px;
  }
  #im_nav li.active a.heartsyssetting .icon_menu{
    background-position: 10px -265px;
  }
  /*大额充值*/
  #im_nav li a.heartbigamount .icon_menu{
    background-position: -40px -365px;
  }
  #im_nav li.active a.heartbigamount .icon_menu{
    background-position: 10px -365px;
  }
  /*syssetting*/
  #im_nav li a.heartxls .icon_menu{
    background-position: -40px -315px;
  }
  #im_nav li.active a.heartxls .icon_menu{
    background-position: 10px -315px;
  }

   ._port1590_ #im_nav li a .icon_menu{
    margin-left: -15px;
  }
</style>
