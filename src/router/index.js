import Vue from 'vue';
import Router from 'vue-router';

import HeartJoy from '@/components/HeartJoy';
import HeartGroup from '@/components/HeartGroup';
import HeartUser from '@/components/HeartUser';
import HeartDeposit from '@/components/HeartDeposit';
import HeartEVs from '@/components/HeartEVs';
import HeartEVamap from '@/components/HeartEVamap';
import HeartSysSetting from '@/components/HeartSysSetting';
import MapTrack from '@/components/MapTrack';
import MapGeographic from '@/components/MapGeographic';

import HelloWorld from '@/components/HelloWorld';
import AjaxTest from '@/components/AjaxTest';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HeartJoy', //首页
      component: HeartJoy
    },
    {
      path: '/group', //群组
      name: 'HeartGroup',
      component: HeartGroup
    },
    {
      path: '/user/:groupcode/:type/:pn',  //用户
      name: 'HeartUser',
      component: HeartUser
    },
    {
      path: '/deposit/:pn', //pn=>pageNum 	页码
      name: 'HeartDeposit',
      component: HeartDeposit
    },
    {
      path: '/evs/:pn', //电动车
      name: 'HeartEVs',
      component: HeartEVs
    },
    {
      path: '/ev/:id', //轨迹与定位
      name: 'HeartEVamap',
      component: HeartEVamap,
      children:[
        {
          path:'track',
          component:MapTrack
        },
        {
          path:'point',
          component:MapGeographic
        }
      ]
    },
    {
      path: '/sys', //系统管理
      name: 'HeartSysSetting',
      component: HeartSysSetting
    },


    // just for thilina
    {
      path: '/thilina',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ajax',
      name: 'AjaxTest',
      component: AjaxTest
    }
  ]
});
