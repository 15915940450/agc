var state={
  phone:'',
  name:'',
  id:-1
};

var mutations={
  setLogin:function(state,phone,name,id){
    state.phone=phone;
    state.name=name;
    state.id=id;
  }
};

export default {
  state,
  mutations
};

// "phone": "15820480937",
//     "name": "chao"
//     "id": 2
