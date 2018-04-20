var state={
  needLogin:window.sessionStorage.agentphone?false:true,
  newUser:true
};

var mutations={
  showLogin:function(state){
    //需要登录时清空会话存贮
    window.sessionStorage.agentphone='';
    state.needLogin=true;
  },
  hideLogin:function(state){
    //登录成功，在每个组件中设置会话
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
