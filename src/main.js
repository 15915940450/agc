// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import store from './store';

import EUI from 'element-ui';
import VueClipboard from 'vue-clipboard2';
import './assets/e_theme.scss';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import rqs from './api';
import yApi from './api/y_api.js';

import App from './App';

Vue.use(EUI,{size:'small'});
Vue.use(VueClipboard);
Vue.component('icon', Icon);

Vue.prototype.$rqs=rqs;
Vue.prototype.$yApi=yApi;


Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});