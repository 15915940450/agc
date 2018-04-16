import Vue from 'vue';
import Router from 'vue-router';
import CJoy from '@/components/CJoy';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CJoy',
      component: CJoy
    }
  ]
});
