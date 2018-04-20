var state={
  needLogin:true,
  newUser:true
};

var mutations={
  showLogin:function(state){
    state.needLogin=true;
  },
  hideLogin:function(state){
    state.needLogin=false;
  },
  showNewUser:function(state){
    state.newUser=true;
  },
  hideNewUser:function(state){
    state.newUser=false;
  }
};

export default {
  state,
  mutations
};
