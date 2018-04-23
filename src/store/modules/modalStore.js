var state={
  needLogin:window.sessionStorage.agentphone?false:true,
  topUp:false,
  batteryAmount:0,
  newUser:true
};

var mutations={
  showLogin:function(state){
    //需要登录时清空会话存贮
    // window.sessionStorage.agentphone='';
    window.sessionStorage.clear();
    state.needLogin=true;
  },
  hideLogin:function(state){
    //登录成功，在每个组件中设置会话
    state.needLogin=false;
  },
  showTopUp:function(state){
    state.topUp=true;
  },
  hideTopUp:function(state){
    state.topUp=false;
  },
  setBatteryAmount:function(state,num){
    state.batteryAmount=num;
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
