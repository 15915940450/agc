<template lang="html">
  <div class="component_group">
    <h3 class="title">群组列表</h3>
    <div class="group-list">
      <el-row :gutter="10">
        <el-col v-for="(item) in group" :span="8" :key="item.id">
          <div class="group_card">
            <h4 class="group_card-title">{{item.name}}</h4>
            <p>{{item.count}} 个用户</p>
            <p>{{item.depositNum}} 个押金方案</p>
            <p>{{item.packageNum}} 种套餐方案</p>
            <p><strong v-if="item.type===2">不</strong> 可退押金</p>
            <div class="group_card-footer">
              <el-button type="primary" size="mini">设置</el-button>
              <el-button type="primary" size="mini" @click="rrPush(item.code)">
                查看用户
                <!-- <router-link :to="{ name: 'CUser', params: {groupcode:item.code,pn:1} }"></router-link> -->
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <a href="javascript:;" @click="groupCreate()">
            <div class="group_card group_card-new">
              <p class="group_card-title"><i class="el-icon-plus"></i> 新建群组</p>
            </div>
          </a>
        </el-col>
      </el-row>
    </div>

    <FormGroupCreate />
    <StatusGroupCreate />

  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';
import FormGroupCreate from './FormGroupCreate.vue';
import StatusGroupCreate from './StatusGroupCreate.vue';

export default {
  name:'CGroup',
  data:function(){
    return ({
      group:[
        // {
        // activityNum: 2
        // activitys: Array [ {…} ]
        // agentCode: 0
        // agentId: ""
        // code: 11
        // count: 0
        // depositNum: 2
        // id: 11
        // name: "测试群组"
        // packageNum: 2
        // "type":1//1=可退 2=不可退
        // }
      ]
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    },
    'modalStore.statusGroupCreate':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  components:{
    FormGroupCreate,
    StatusGroupCreate
  },
  methods:{
    fetchData:function(){
      var vueThis=this;
      var sendData={
        phone:''+window.sessionStorage.agentphone,
        pageNum:vueThis.pageNum,
        pageSize:urls.pageSize
      };
      //请求地址
      ajaxs.imPostJson(urls.groupList,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.total=objRps.result.total;
          vueThis.group=objRps.result.list;
        }
      });
    },
    groupCreate:function(){
      this.$store.commit('showGroupCreate');
    },
    rrPush:function(groupCode){
      // console.log(groupCode);
      this.$store.commit('setNavActive',2);
      this.$router.push({
        path:'/user/'+groupCode+'/1'
      });
    }
  },  //methods
  created:function(){
    // console.log(JSON.stringify((this.$store.state.modalStore.statusGroupCreate)));
    this.fetchData();
  }


};
</script>

<style lang="css" scoped>
  .component_group{
    background: #FFF;
    min-height: calc(100vh - 60px - 20px - 50px);
  }
  .group-list{
    padding:10px 20px;
  }
  .group_card{
    padding: 20px;
    box-shadow:2px 0px 6px rgba(204,204,204,0.21);
    height:180px;
    max-height: 180px;
    /* border: 1px solid black; */
  }
  .group_card-title{
    color: #333;
    font-size: 12px;
  }
  .group_card-new .group_card-title{
    display: block;
    height: 180px;
    line-height: 180px;
    text-align: center;
    font-size: 12px;
    color: #333;
    font-weight: bold;
  }
  .group_card p{
    font-size: 10px;
    margin: 5px 0;
  }
  .group_card-footer{
    text-align:center;
    margin-top: 20px;
  }
  .group_card-footer .el-button{
  margin:0 10px;
}
</style>
