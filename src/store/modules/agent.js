var state={
  phone:window.localStorage.agentphone,
  name:window.sessionStorage.agentname,
  id:window.sessionStorage.agentid
};

var mutations={
  setAgent:function(state,obj){
    state.phone=obj.phone;
    state.name=obj.name;
    state.id=obj.id;
  }
};

export default {
  state,
  mutations
};
