<template lang="html">
  <div class="component_group eqcalc">
    <h3 class="title">群组列表</h3>
    <div class="group-list">
      <el-row :gutter="10">
        <el-col v-for="(item) in group" :span="6" :key="item.id">
          <div class="group_card">
            <div class="group_card-header">
              <el-row>
                <el-col :span="8">
                  <div class="group_online"></div>
                </el-col>
                <el-col :span="16">
                  <h4 class="group_card-title overtext">{{item.name}}</h4>
                  <p class="group_type">
                    线<span v-if="item.type===1">上</span><span v-if="item.type===2">下</span>交押金
                  </p>
                </el-col>
              </el-row>
            </div>

            <el-row>
              <el-col :span="12">
                <p>用户数量(个）</p>
              </el-col>
              <el-col :span="12">
                <p class="p_val">{{item.count}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>押金方案(个）</p>
              </el-col>
              <el-col :span="12">
                <p class="p_val">{{item.deposits.length}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>套餐方案(种）</p>
              </el-col>
              <el-col :span="12">
                <p class="p_val">{{item.packages.length}}</p>
              </el-col>
            </el-row>

            <div class="group_card-footer">
              <el-button type="default" @click="groupSet(item)">设置</el-button>
              <el-button type="primary" @click="rrPush(item)">
                查看用户
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
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
  }
  .group-list{
    padding:15px;
  }
  .group_card{
    padding:15px;
    box-shadow:2px 0px 6px rgba(0,0,0,0.1);
    box-sizing: border-box;
    height: 250px;
    margin-bottom: 15px;
  }

  .group_card-header{
    margin-bottom: 25px;
  }
  .group_online{
    width: 46px;
    height: 46px;
    background: #fe7e73 url(../assets/online.png) no-repeat center center;
    border-radius: 96px;
  }
  .group_card-title{
    color: #333;
    font-size: 14px;
    font-weight: 500;
    text-align: right;
  }
  .group_type{
    text-align: right;
    font-weight: 300;
    color:#555;
  }
  .group_card p{
    font-size: 12px;
    margin: 5px 0;
  }
  .p_val{
    color: #FF6666;
    font-weight: 600;
    text-align: right;
  }
  .group_card-new .group_card-title{
    display: block;
    height: 220px;
    line-height: 220px;
    text-align: center;
    font-size: 12px;
    color: #333;
    font-weight: bold;
    margin-left:-10px;
  }
  
  .group_card-footer{
    text-align:center;
    margin-top: 20px;
  }
  .group_card-footer .el-button{
    margin:0 10px;
  }
</style>
