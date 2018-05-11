import Vue from 'vue';
import Router from 'vue-router';

import HeartJoy from '@/components/HeartJoy';
import HeartGroup from '@/components/HeartGroup';
import CUser from '@/components/CUser';
import CDeposit from '@/components/CDeposit';
import EVs from '@/components/EVs';
import EV from '@/components/EV';
import CSys from '@/components/CSys';
import MapTrack from '@/components/MapTrack';
import MapPoint from '@/components/MapPoint';

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
      name: 'CUser',
      component: CUser
    },
    {
      path: '/deposit/:pn', //pn=>pageNum 	页码
      name: 'CDeposit',
      component: CDeposit
    },
    {
      path: '/evs/:pn', //电动车
      name: 'EVs',
      component: EVs
    },
    {
      path: '/ev/:id', //轨迹与定位
      name: 'EV',
      component: EV,
      children:[
        {
          path:'track',
          component:MapTrack
        },
        {
          path:'point',
          component:MapPoint
        }
      ]
    },
    {
      path: '/sys', //系统管理
      name: 'CSys',
      component: CSys
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
