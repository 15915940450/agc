<template lang="html">
  <div class="top_bar">
    <el-row>
      <el-col :span="6">
        <h1 id="agc_logo">
          <a href="javascript:;">代理商后台</a>
        </h1>
      </el-col>
      <el-col :span="18" class="topbar_right_wrap">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img class="top_bar-head" src="../assets/default_head.png" width="20" />
            {{agent.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a @click="toSys()" class="topbar_user">设置</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a @click="logout()" class="topbar_user">退出</a>
            </el-dropdown-item>
            <el-dropdown-item></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 切换网点 -->
        <el-button 
          v-if="showChangeShop"
          class="change_shop" 
          type="text" 
          size="medium"
          @click="handleChangeShop()"
          >
          切换网点
        </el-button>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'LayoutTopBar',
  data:function(){
    return ({
      showChangeShop:false
    });
  },
  computed:{
    ...mapState(['agent'])
  },
  methods:{
    logout:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userLogout,function(){
        vueThis.$store.commit('showLogin');
      });
    },
    toSys:function(){
      // 编程式导航
      this.$router.push({
        path:'/sys'
      });
    },
    // 獲取門店
    fetchDescendant:function(){
      var vueThis=this;
      var sendData={
        type:2  //后代类型 1-代理商 2-网点 默认为1
      };
      //getDescendant
      vueThis.$rqs(vueThis.$yApi.THILINA,function(objRps){
        objRps={
          'code': 1000,
          'result': {
            'total': 13, 
            'list': [
              {
                'id':1, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':2, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':3, //ID
                'phone':'15019001400', //手机号码
                'name':'neroneroneroneronero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':4, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':0//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':5, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'aaa234',//父级代理名称
                'agentId':234,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              },
              {
                'id':6, //ID
                'phone':'15019001400', //手机号码
                'name':'nero', //名称
                'agentName':'ggg1',//父级代理名称
                'agentId':1,//父级代理商ID
                'canOP':1//是否可操作，0-不可操作 1-可操作
              }
            ]
          }
        };

        var changeData=[];
        for(var i=0;i<objRps.result.list.length;i++){
          var v=objRps.result.list[i];
          var parentInChangeData=changeData.find(function(vv){
            return (vv.agentId===v.agentId);
          });
          if(parentInChangeData){
            //需要合并
            parentInChangeData.shop.push({
              id:v.id,
              'phone':v.phone,
              'name':v.name, //名称
              'canOP':v.canOP
            });
          }else{
            //直接push
            changeData.push({
              'agentName':v.agentName,//父级代理名称
              'agentId':v.agentId,//父级代理商ID
              shop:[
                {
                  id:v.id,
                  'phone':v.phone,
                  'name':v.name, //名称
                  'canOP':v.canOP
                }
              ]
            });
          }
        } //for
        vueThis.shopList=changeData;
        console.log('shop list');
        if(+objRps.result.total===1){
          // 只有一个网点，则直接进入网点，不需要选择网点
          window.sessionStorage.setItem('totalshopisonly',1);
          vueThis.$store.commit('hideShop');
        }else{
          window.sessionStorage.removeItem('totalshopisonly');
        }
      },{
        objSendData:sendData
      });
    },
    handleChangeShop:function(){
      this.$store.commit('showShop');
      this.fetchDescendant();
    }
  }, //methods
  created:function(){
    this.showChangeShop=!window.sessionStorage.totalshopisonly;
  }
};
</script>

<style lang="css" scoped>
  .top_bar{
    border-bottom:1px solid #edf0f5;
    box-shadow:2px 0px 6px rgba(204,204,204,0.21)
  }
  #agc_logo{
    margin: 0;
    padding: 0;
    padding-left:20px;
  }
  #agc_logo a{
    display: inline-block;
    width: 95px;
    padding-left: 30px;
    height: 60px;
    line-height: 60px;
    background: url(../assets/e_logo.png) no-repeat 0 center;
    background-size: 26px 26px;
    font-size: 18px;
    color: #333333;
  }

  .top_bar-head{
    background: #6DCFF6;
    border-radius: 90px;
    vertical-align: middle;
  }
  .topbar_right_wrap{
    height: 60px;
    line-height: 60px;
    padding-right: 20px;
  }
  .topbar_right_wrap .el-dropdown{
    float: right;
    cursor: pointer;
  }
  .topbar_user{
    min-width: 66px;
    display: block;
    font-size: 13px;
  }
  .change_shop{
    color:blueviolet;
    float: right;
    margin-right: 30px;
    margin-top: 13px;
  }
</style>
