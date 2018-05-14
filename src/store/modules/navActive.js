/*
==warning: this module is discarded
*/

var state={
  navActive:1 //1,2,3,4,5...
};

var mutations={
  setNavActive:function(state,num){
    state.navActive=num;
  }
};

export default {
  state,
  mutations
};
