// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import store from './store';

import im from 'axios';
import apiURLs from './api';
import EUI from 'element-ui';
import './assets/e_theme.scss';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

import App from './App';

Vue.use(EUI,{size:'small'});
Vue.component('icon', Icon);

//axios=>$im
Vue.prototype.$im=im;
//apiURLs=>$apiURLs
Vue.prototype.$apiURLs=apiURLs;

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) => {
//   // ...
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
