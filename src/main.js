// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';

import im from 'axios';
import apiURLs from './api';
import EUI from 'element-ui';
import './assets/e_theme.scss';

import App from './App';

Vue.use(EUI);

//axios=>$im
Vue.prototype.$im=im;
//apiURLs=>$apiURLs
Vue.prototype.$apiURLs=apiURLs;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
