import Vue from 'vue';
import Router from 'vue-router';
import CJoy from '@/components/CJoy';
import CDeposit from '@/components/CDeposit';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CJoy',
      component: CJoy
    },
    {
      path: '/deposit/:pn', //pn=>pageNum 	页码
      name: 'CDeposit',
      component: CDeposit
    }
  ]
});
