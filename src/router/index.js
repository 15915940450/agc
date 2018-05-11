import Vue from 'vue';
import Router from 'vue-router';

import HeartJoy from '@/components/HeartJoy';
import HeartGroup from '@/components/HeartGroup';
import HeartUser from '@/components/HeartUser';
import HeartDeposit from '@/components/HeartDeposit';
import HeartEVs from '@/components/HeartEVs';
import HeartEVamap from '@/components/HeartEVamap';
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
