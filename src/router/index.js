import Vue from 'vue';
import Router from 'vue-router';

import HeartJoy from '@/components/HeartJoy';
import HeartGroup from '@/components/HeartGroup';
import HeartUser from '@/components/HeartUser';
import HeartUserChangePhone from '@/components/HeartUserChangePhone';
import HeartDeposit from '@/components/HeartDeposit';
import HeartCombo from '@/components/HeartCombo';
import HeartComboHistory from '@/components/HeartComboHistory';
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
      path: '/user/:groupcode/:type/:pn',  //用户,type:1(线上交押金),2(线下交押金)
      name: 'HeartUser',
      component: HeartUser
    },
    {
      path: '/user/changephone',
      name: 'HeartUserChangePhone',
      component:HeartUserChangePhone
    },
    {
      path: '/deposit',
      name: 'HeartDeposit',
      component: HeartDeposit
    },
    {
      path: '/combo',
      name: 'HeartCombo',
      component: HeartCombo
    },
    {
      path: '/combo/history',
      name: 'HeartComboHistory',
      component: HeartComboHistory
    },
    {
      path: '/evs/:pn', //中控
      name: 'HeartEVs',
      component: HeartEVs
    },
    {
      path: '/ev/:id', //轨迹与定位(sid)
      name: 'HeartEVamap',
      component: HeartEVamap,
      children:[
        {
          path:'track',
          name:'MapTrack',
          component:MapTrack
        },
        {
          path:'point',
          name:'MapGeographic',
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
