import Vue from 'vue';
import Vuex from 'vuex';
import modalStore from './modules/modalStore';
import navActive from './modules/navActive';
import agent from './modules/agent';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    modalStore,
    navActive,
    agent
  }
});
