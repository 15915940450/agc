var state={
  needLogin:window.localStorage.agentphone?false:true,
  objRpsProtocol:false,
  //false:是總代，不顯示
  needShop:false,
  // needShop:(window.sessionStorage.headerid || window.sessionStorage.totalshopisonly || window.sessionStorage.isgeneral)?false:true,

  needFetchD:false,

  baseStatus:false,
  needFetchData:false,
  showChangeShop:!window.sessionStorage.totalshopisonly?true:false,

  topUp:false,
  comboBuy:false,
  refund:false,
  statusTopUp:false,
  statusRefund:false,
  batteryAmount:window.localStorage.batteryAmount?window.localStorage.batteryAmount:0,
  groupCreate:false,
  EVbind:false,
  EVunbind:false,
  userUnbind:false,
  setUser:false,
  setCombo:false,
  setDeposit:false,
  setFreeDay:false,
  groupSet:false,
  statusGroupCreate:false,
  statusEVoperation:false,
  statusEditPW:false,
  EVin:false,
  newUser:false,

  changePhoneLogEmpty:false,
  bigAmountHistoryEmpty:false,
  depositEmpty:false,
  comboEmpty:false
};

var mutations={
  showLogin:function(state){
    //需要登录时清空会话存贮
    window.sessionStorage.clear();

    window.localStorage.removeItem('agent_menus');
    window.localStorage.removeItem('objrpsprotocol');
    window.localStorage.removeItem('agentphone');
    window.localStorage.removeItem('agentname');
    window.localStorage.removeItem('agentid');
    window.localStorage.removeItem('batteryAmount');
    window.localStorage.removeItem('tradeCheck');
    window.sessionStorage.removeItem('payurl');
    state.needLogin=true;
    state.objRpsProtocol=false;
    state.needShop=false,
    state.needFetchD=false,

    state.baseStatus=false;
    state.needFetchData=false;
    state.topUp=false;
    state.comboBuy=false;
    state.refund=false;
    state.statusTopUp=false;
    state.statusRefund=false;
    state.groupCreate=false;
    state.EVbind=false;
    state.EVunbind=false;
    state.userUnbind=false;
    state.setUser=false;
    state.setCombo=false;
    state.setDeposit=false;
    state.setFreeDay=false;
    state.groupSet=false;
    state.statusGroupCreate=false;
    state.statusEVoperation=false;
    state.statusEditPW=false;
    state.EVin=false;
    state.newUser=false;
    state.depositEmpty=false;
    state.changePhoneLogEmpty=false;
    state.bigAmountHistoryEmpty=false;
    state.comboEmpty=false;
  },
  hideLogin:function(state){
    //登录成功，在每个组件中设置会话
    state.needLogin=false;
  },
  clearNeedFetchD:function(){
    state.needFetchD=false;
  },
  setNeedFetchD:function(){
    state.needFetchD=true;
  },
  setChangeShop:function(){
    state.showChangeShop=true;
  },
  clearChangeShop:function(){
    state.showChangeShop=false;
  },
  showAgreement:function(){
    state.objRpsProtocol=true;
  },
  hideAgreement:function(){
    state.objRpsProtocol=false;
  },
  showShop:function(){
    state.needShop=true;
  },
  hideShop:function(){
    state.needShop=false;
  },
  showBaseStatus:function(state){
    state.baseStatus=true;
  },
  hideBaseStatus:function(state){
    state.baseStatus=false;
  },
  setNeedFetchData:function(state){
    state.needFetchData=true;
  },
  setNoNeedFetchData:function(state){
    state.needFetchData=false;
  },

  showTopUp:function(state){
    state.topUp=true;
  },
  hideTopUp:function(state){
    state.topUp=false;
  },
  showComboBuy:function(state){
    state.comboBuy=true;
  },
  hideComboBuy:function(state){
    state.comboBuy=false;
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
    window.localStorage.setItem('batteryAmount',num);
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
  showSetCombo:function(state){
    state.setCombo=true;
  },
  hideSetCombo:function(state){
    state.setCombo=false;
  },
  showSetDeposit:function(state){
    state.setDeposit=true;
  },
  hideSetDeposit:function(state){
    state.setDeposit=false;
  },
  showSetFreeDay:function(state){
    state.setFreeDay=true;
  },
  hideSetFreeDay:function(state){
    state.setFreeDay=false;
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
  showEVin:function(state){
    state.EVin=true;
  },
  hideEVin:function(state){
    state.EVin=false;
  },
  showNewUser:function(state){
    state.newUser=true;
  },
  hideNewUser:function(state){
    state.newUser=false;
  },

  setEmptyChangePhoneLog:function(state){
    state.changePhoneLogEmpty=true;
  },
  setChangePhoneLog:function(state){
    state.changePhoneLogEmpty=false;
  },
  setEmptyBigAmountHistory:function(state){
    state.bigAmountHistoryEmpty=true;
  },
  setBigAmountHistory:function(state){
    state.bigAmountHistoryEmpty=false;
  },
  setEmptyCombo:function(state){
    state.comboEmpty=true;
  },
  setCombo:function(state){
    state.comboEmpty=false;
  },
  setEmptyDeposit:function(state){
    state.depositEmpty=true;
  },
  setDeposit:function(state){
    state.depositEmpty=false;
  }
};

export default {
  state,
  mutations
};
