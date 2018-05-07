var state={
  needLogin:window.sessionStorage.agentphone?false:true,
  baseStatus:false,

  topUp:false,
  refund:false,
  statusTopUp:false,
  statusRefund:false,
  batteryAmount:window.sessionStorage.batteryAmount?window.sessionStorage.batteryAmount:0,
  groupCreate:false,
  EVbind:false,
  EVunbind:false,
  userUnbind:false,
  setUser:false,
  groupSet:false,
  statusGroupCreate:false,
  statusEVoperation:false,
  statusEditPW:false,
  newUser:false
};

var mutations={
  showLogin:function(state){
    //需要登录时清空会话存贮
    // window.sessionStorage.clear();
    window.sessionStorage.removeItem('agentphone');
    window.sessionStorage.removeItem('agentname');
    window.sessionStorage.removeItem('agentid');
    window.sessionStorage.removeItem('batteryAmount');
    window.sessionStorage.removeItem('payurl');
    window.sessionStorage.removeItem('grouptype');
    state.needLogin=true;
    state.baseStatus=false;
    state.topUp=false;
    state.refund=false;
    state.statusTopUp=false;
    state.statusRefund=false;
    state.groupCreate=false;
    state.EVbind=false;
    state.EVunbind=false;
    state.userUnbind=false;
    state.setUser=false;
    state.groupSet=false;
    state.statusGroupCreate=false;
    state.statusEVoperation=false;
    state.statusEditPW=false;
    state.newUser=false;
  },
  hideLogin:function(state){
    //登录成功，在每个组件中设置会话
    state.needLogin=false;
  },
  showBaseStatus:function(state){
    state.baseStatus=true;
  },
  hideBaseStatus:function(state){
    state.baseStatus=false;
  },

  showTopUp:function(state){
    state.topUp=true;
  },
  hideTopUp:function(state){
    state.topUp=false;
  },
  showRefund:function(state){
    state.refund=true;
  },
  hideRefund:function(state){
    state.refund=false;
  },
  showStatusTopUp:function(state){
    state.statusTopUp=true;
  },
  hideStatusTopUp:function(state){
    window.sessionStorage.removeItem('payurl');
    state.statusTopUp=false;
  },
  showStatusRefund:function(state){
    state.statusRefund=true;
  },
  hideStatusRefund:function(state){
    state.statusRefund=false;
  },
  setBatteryAmount:function(state,num){
    window.sessionStorage.setItem('batteryAmount',num);
    state.batteryAmount=num;
  },
  showGroupCreate:function(state){
    state.groupCreate=true;
  },
  hideGroupCreate:function(state){
    state.groupCreate=false;
  },
  showEVbind:function(state){
    state.EVbind=true;
  },
  hideEVbind:function(state){
    state.EVbind=false;
  },
  showEVunbind:function(state){
    state.EVunbind=true;
  },
  hideEVunbind:function(state){
    state.EVunbind=false;
  },
  showUserUnbind:function(state){
    state.userUnbind=true;
  },
  hideUserUnbind:function(state){
    state.userUnbind=false;
  },
  showSetUser:function(state){
    state.setUser=true;
  },
  hideSetUser:function(state){
    state.setUser=false;
  },
  showGroupSet:function(state){
    state.groupSet=true;
  },
  hideGroupSet:function(state){
    state.groupSet=false;
  },
  showStatusGroupCreate:function(state){
    state.statusGroupCreate=true;
  },
  hideStatusGroupCreate:function(state){
    state.statusGroupCreate=false;
  },
  showStatusEVoperation:function(state){
    state.statusEVoperation=true;
  },
  hideStatusEVoperation:function(state){
    state.statusEVoperation=false;
  },
  showStatusEditPW:function(state){
    state.statusEditPW=true;
  },
  hideStatusEditPW:function(state){
    state.statusEditPW=false;
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
