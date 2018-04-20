import Vue from 'vue';
import Vuex from 'vuex';
import modalStore from './modules/modalStore';
import navActive from './modules/navActive';
import login from './modules/login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    modalStore,
    navActive,
    login
  }
});
