import Vue from 'vue';
import Router from 'vue-router';
import CJoy from '@/components/CJoy';
import CGroup from '@/components/CGroup';
import CUser from '@/components/CUser';
import CDeposit from '@/components/CDeposit';
import EVs from '@/components/EVs';

import HelloWorld from '@/components/HelloWorld';
import AjaxTest from '@/components/AjaxTest';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CJoy',
      component: CJoy
    },
    {
      path: '/group',
      name: 'CGroup',
      component: CGroup
    },
    {
      path: '/user/:pn',
      name: 'CUser',
      component: CUser
    },
    {
      path: '/deposit/:pn', //pn=>pageNum 	页码
      name: 'CDeposit',
      component: CDeposit
    },
    {
      path: '/evs/:pn', //pn=>pageNum 	页码
      name: 'EVs',
      component: EVs
    },
    {
      path: '/thilina', //pn=>pageNum 	页码
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/ajax', //pn=>pageNum 	页码
      name: 'AjaxTest',
      component: AjaxTest
    }
  ]
});
