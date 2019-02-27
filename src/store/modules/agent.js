var state={
  phone:window.localStorage.agentphone,
  name:window.localStorage.agentname,
  id:window.localStorage.agentid,
  agentMenus:window.localStorage.agent_menus
};

var mutations={
  setAgent:function(state,obj){
    state.phone=obj.phone;
    state.name=obj.name;
    state.id=obj.id;
  },
  setAgentMenus:function(strAgentMenus){
    state.agentMenus=strAgentMenus;
  }
};

export default {
  state,
  mutations
};
