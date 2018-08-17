<template lang="html">
  <div class="component_group eqcalc">
    <h3 class="title">群组列表</h3>
    <div class="group-list" v-loading="loadingGroupList">
      <el-row :gutter="10">
        <el-col v-for="(item) in group" :span="6" :key="item.id">
          <div class="group_card">
            <div class="group_card-header">
              <el-row>
                <el-col :span="8">
                  <div :class="{group_online:item.type===1,group_offline:item.type===2}"></div>
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
              <el-button size="mini" type="default" @click="groupSet(item)">设置</el-button>
              <el-button size="mini" type="primary" @click="rrPush(item)">
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

    <FormGroupCreate
      :yajin="yajin"
      :taocan="taocan"
      />
    <FormGroupSet
      v-bind="groupSetItem"
      :yajin="yajin"
      :taocan="taocan"
      />
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
      yajin:[],
      taocan:[],
      group:[],
      msg:'群组设置成功',
      groupSetItem:null,
      loadingGroupList:true
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
      vueThis.loadingGroupList=true;
      var sendData={
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      vueThis.$rqs(vueThis.$yApi.groupList,function(objRps){
        vueThis.loadingGroupList=false;
        vueThis.total=objRps.result.total;
        vueThis.group=objRps.result.list;
      },{
        objSendData:sendData
      });
    },
    fetchYajinOrTaocan:function(type){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:null
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:969
      };
      vueThis.$rqs(vueThis.$yApi[type],function(objRps){
        if(type==='depositListScheme'){
          vueThis.yajin=objRps.result.list;
        }
        if(type==='packageListScheme'){
          vueThis.taocan=objRps.result.list;
        }
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(v.duration!==undefined){
            var dORe=v.duration+'天';
            if(+v.count>=20000){
              v.count='无限';
            }
            if(v.duration==='' || v.duration==='─'){
              dORe=v.expirationDate && v.expirationDate.replace(/-/,'');
            }
            v.neroTaocan=`${v.name} / ${['月套卡','次套卡','免费套餐'][v.type]} / ¥${v.price} / ${v.count}次 / ${dORe}`;
            return (v);
          }
        }
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
    this.fetchYajinOrTaocan('depositListScheme');
    this.fetchYajinOrTaocan('packageListScheme');
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
    padding:24px;
    box-shadow:0px 0px 1px 1px rgba(0,0,0,0.1);
    box-sizing: border-box;
    height: 250px;
    margin-bottom: 15px;
  }

  .group_card-header{
    margin-bottom: 25px;
  }
  .group_online,.group_offline{
    width: 46px;
    height: 46px;
    border-radius: 96px;
  }
  .group_online{
    background: #fe7e73 url(../assets/online.png) no-repeat center center;
  }
  .group_offline{
    background: #fe7e73 url(../assets/offline.png) no-repeat center center;
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
    margin:0 8px;
  }
</style>
