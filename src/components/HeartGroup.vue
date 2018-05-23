<template lang="html">
  <div class="component_group">
    <h3 class="title">群组列表</h3>
    <div class="group-list">
      <el-row :gutter="10">
        <el-col v-for="(item) in group" :span="8" :key="item.id">
          <div class="group_card">
            <h4 class="group_card-title">{{item.name}}</h4>
            <p>{{item.count}} 个用户</p>
            <p>{{item.deposits.length}} 个押金方案</p>
            <p>{{item.packages.length}} 种套餐方案</p>
            <p><strong v-if="item.type===2">不</strong> 可退押金</p>
            <div class="group_card-footer">
              <el-button type="primary" size="mini" @click="groupSet(item)">设置</el-button>
              <el-button type="primary" size="mini" @click="rrPush(item)">
                查看用户
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <a href="javascript:;" @click="groupCreate()">
            <div class="group_card group_card-new">
              <p class="group_card-title"><i class="el-icon-plus"></i> 添加群组</p>
            </div>
          </a>
        </el-col>
      </el-row>
    </div>

    <FormGroupCreate />
    <FormGroupSet v-bind="groupSetItem" />
    <StatusGroupCreate />
    <BaseStatus :msg="msg" />

  </div>
</template>

<script>
import {mapState} from 'vuex';
import FormGroupCreate from './FormGroupCreate.vue';
import StatusGroupCreate from './StatusGroupCreate.vue';
import FormGroupSet from './FormGroupSet.vue';
import BaseStatus from './BaseStatus.vue';

export default {
  name:'HeartGroup',
  data:function(){
    return ({
      group:[],
      msg:'群组设置成功',
      groupSetItem:null
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
    },
    'modalStore.baseStatus':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  components:{
    FormGroupCreate,
    StatusGroupCreate,
    FormGroupSet,
    BaseStatus
  },
  methods:{
    fetchData:function(){
      var vueThis=this;
      var sendData={
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      vueThis.$rqs(vueThis.$yApi.groupList,function(objRps){
        vueThis.total=objRps.result.total;
        vueThis.group=objRps.result.list;
      },{
        objSendData:sendData
      });
    },
    groupCreate:function(){
      this.$store.commit('showGroupCreate');
    },
    groupSet:function(item){
      this.groupSetItem=item;
      this.$store.commit('showGroupSet');
    },
    rrPush:function(item){
      this.$router.push({
        path:'/user/'+item.code+'/'+item.type+'/1'
      });
    }
  },  //methods
  created:function(){
    this.fetchData();
  }


};
</script>

<style lang="css" scoped>
  .component_group{
    background: #FFF;
    min-height: calc(100vh - 140px);
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
