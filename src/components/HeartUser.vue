<template lang="html">
  <div class="component_user">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">
          <small>群组管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>查看用户</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="user_list" v-if="(users.length || !isNotSearch || loadingUserList || isFilter)">
      <!-- table wrap -->
      <div class="table_wrap">
        <el-row>
          <el-col :span="6">
            <h3 class="title">用户列表</h3>
          </el-col>
          <el-col :span="18">
            <div class="table_wrap-search">
              <div class="table_wrap-search_wrap">
                <el-input @input="imSearch()" class="table_wrap-input_serach" placeholder="请输入手机号" v-model="search" suffix-icon="el-icon-search"></el-input>
              </div>
              <el-button @click="resetSearch()" class="table_wrap-btn_reset" type="warning">重置</el-button>
              <el-button class="table_wrap-btn_new" type="primary" @click="showNewUser()">添加</el-button>
              <el-button type="info" @click="showEVin()">激活</el-button>
            </div>
          </el-col>
        </el-row>

        <div v-loading="loadingUserList" class="loading_parent">
          <div class="filter_wrap">
            <!-- dropdown -->
            <el-dropdown 
              size="mini" 
              placement="bottom-start"
              trigger="click"
              @command="handleCommand"
            >
              <el-button type="primary" size="mini">
                操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                  command="showSetCombo" 
                  :disabled="disabled_set"
                  >
                  分配套餐
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="isType2"
                  command="showSetDeposit" 
                  :disabled="disabled_set"
                  >
                  设置押金
                </el-dropdown-item>
                <el-dropdown-item
                  command="showSetFreeDay" 
                  :disabled="disabled_set"
                  >
                  设置免费天数
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button type="primary" size="mini" @click="filter_enabled=!filter_enabled">筛选</el-button>
            <!-- card -->
            <transition name="el-zoom-in-center">
              <el-card class="filter_card" v-show="filter_enabled">
                <el-form ref="fiter_from" :model="filter_form">

                  <div class="form_item_underline">
                    <el-form-item>
                      <span class="advanced_param_key">
                        <el-checkbox v-model="filter_form.bDepositType" label="押金类型"></el-checkbox>
                      </span>
                      <el-radio-group 
                        v-model="filter_form.depositType"
                        :disabled="!filter_form.bDepositType"
                        >
                        <el-radio :label="0">全部</el-radio>
                        <el-radio :label="1">无押金</el-radio>
                        <el-radio :label="2">线下交押金</el-radio>
                        <el-radio :label="3">线上交押金</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div class="form_item_underline">
                    <el-form-item>
                      <span class="advanced_param_key">
                        <el-checkbox v-model="filter_form.bPackageDays" label="套餐类型"></el-checkbox>
                      </span>
                      <el-radio-group 
                        v-model="filter_form.packageDays"
                        :disabled="!filter_form.bPackageDays"
                        >
                        <el-radio :label="-1">无套餐</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>

                  <div class="form_item_underline">
                    <el-form-item>
                      <span class="advanced_param_key">
                        <el-checkbox v-model="filter_form.bFreeDay" label="免费天数"></el-checkbox>
                      </span>
                      <el-radio-group 
                        v-model="filter_form.freeDay"
                        :disabled="!filter_form.bFreeDay"
                        >
                        <el-radio :label="-1">无天数</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <div class="res_sub">
                    <el-button @click="handleResetFilter()">清空</el-button>
                    <el-button type="primary" @click="handleFilter()">筛选</el-button>
                  </div>

                </el-form>
              </el-card>
            </transition>
          </div>

          <!-- 用户列表表格 -->
          <div class="table_wrap_real">
            <el-table
              :data="users" 
              size="medium" 
              stripe
              class="table_wrap-table"
              width="100%"
              @selection-change="handleSelectionChange"
              >

              <!-- selection -->
              <el-table-column
                type="selection"
                width="50"
                >
              </el-table-column>
              <!-- 展开行 -->
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="im-table-expand">
                    <el-form-item label="用户ID">
                      <span>{{props.row.id}}</span>
                    </el-form-item>
                    <el-form-item label="注册时间">
                      <span v-html="props.row.time"></span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

              <el-table-column
                label="#"
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                label="手机号码"
                prop="phone">
              </el-table-column>
              <el-table-column
                label="电池SN"
                prop="batteries">
              </el-table-column>
              <el-table-column
                label="中控SN"
                prop="scooters">
              </el-table-column>

              <el-table-column label="操作" width="110">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="unbindUser(scope)">
                    解绑
                  </el-button>
                  <el-button
                    type="text"
                    @click="setUser(scope)">
                    设置
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          

          <div class="table_wrap_pagination">
            <el-pagination 
              :background="true" 
              layout="total,->,jumper,sizes,prev,pager,next" 
              :page-sizes="[10, 20, 50]"
              :total="total" 
              :current-page="pageNum" 
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              >
              <!-- 分页 -->
            </el-pagination>
          </div>
        </div>

      </div>

    </div>

    <!-- empty -->
    <div v-if="(!users.length && isNotSearch && !loadingUserList && !isFilter)" class="empty_user im_empty_wrap">
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/empty_user.png" />
        <p class="im_empty_p">您还没有用户哦！</p>
        <el-button type="primary" @click="showNewUser()">添加</el-button>
      </div>
    </div>

    <!-- 添加 -->
    <FormNewUser />
    <FormEVin />
    <BaseStatus :msg="msg" />
    <FormUnbindUser :phone="unbindPhone" />
    <FormSetUser v-bind="userSet" />
    <FormSetCombo :arrIDs="arrIDs" />
    <FormSetDeposit :arrIDs="arrIDs" />
    <FormSetFreeDay :arrIDs="arrIDs" />


  </div>
</template>

<script>
import {mapState} from 'vuex';
import FormNewUser from './FormNewUser.vue';
import BaseStatus from './BaseStatus.vue';
import FormUnbindUser from './FormUnbindUser.vue';
import FormEVin from './FormEVin.vue';
import FormSetUser from './FormSetUser.vue';
import FormSetCombo from './FormSetCombo.vue';
import FormSetDeposit from './FormSetDeposit.vue';
import FormSetFreeDay from './FormSetFreeDay.vue';

export default {
  name:'HeartUser',
  data:function(){
    return ({
      total:0,
      msg:'',
      search:'',
      isNotSearch:true,
      unbindPhone:'',
      userSet:null,
      filter_enabled:false,
      isFilter:false,
      isType2:true,
      filter_form:{
        depositType:0,
        packageDays:-1,
        freeDay:-1,

        bDepositType:true,
        bPackageDays:false,
        bFreeDay:false
      },
      selection:[],
      users:[

      ],
      loadingUserList:true,
      pageSize:this.$yApi.defaultPS,
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
    });
  },
  computed:{
    ...mapState(['agent','modalStore']),
    disabled_set:function(){
      return (!this.selection.length);
    },
    arrIDs:function(){
      return (this.selection.map(function(v){
        return (v.id);
      }));
    }
  },
  watch:{
    pageNum:function(){
      this.fetchData();
    },
    pageSize:function(){
      this.fetchData();
    },
    'modalStore.needLogin':function(val){
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
    FormNewUser,
    FormEVin,
    BaseStatus,
    FormUnbindUser,
    FormSetCombo,
    FormSetDeposit,
    FormSetFreeDay,
    FormSetUser
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingUserList=true;
      var advancedParam=JSON.stringify({
        groupCode:window.Number(vueThis.$route.params.groupcode),
        depositType:vueThis.filter_form.bDepositType?vueThis.filter_form.depositType:null,
        packageDays:vueThis.filter_form.bPackageDays?vueThis.filter_form.packageDays:null,
        freeDay:vueThis.filter_form.bFreeDay?vueThis.filter_form.freeDay:null,
        userPhone:vueThis.search
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:vueThis.pageNum,
        pageSize:vueThis.pageSize
      };
      vueThis.$rqs(vueThis.$yApi.userList,function(objRps){
        // _.logErr(objRps);
        vueThis.loadingUserList=false;
        vueThis.total=objRps.result.total;
        vueThis.users=objRps.result.list;
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='time'){
            return (_.toSlash(new Date(window.Number(v)),{
              slash:'/',
              T:false
            })).slice(0,19);
          }
          if(k==='batteries' || k==='scooters'){
            return (v.map(function(vMap){
              return (vMap.sn);
            }));
          }
        }
      });
    },
    resetFilterFormData:function(){
      this.filter_form.depositType=0;
      this.filter_form.packageDays=-1;
      this.filter_form.freeDay=-1;
      this.filter_form.bDepositType=true;
      this.filter_form.bPackageDays=false;
      this.filter_form.bFreeDay=false;
    },
    handleResetFilter:function(){
      this.isFilter=true;

      this.resetFilterFormData();
      this.fetchData();
    },
    handleFilter:function(){
      this.isFilter=true;
      this.fetchData();
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      // console.log(this.$route.params.groupcode);
      this.$router.push('/user/'+this.$route.params.groupcode+'/'+this.$route.params.type+'/'+val);
    },
    handleSizeChange:function(val){
      this.pageSize=val;
    },
    showNewUser:function(){
      this.msg='已成功添加用户';
      this.$store.commit('showNewUser');
    },
    showEVin:function(){
      this.msg='中控已激活';
      this.$store.commit('showEVin');
    },
    unbindUser:function(scope){
      this.msg='用户已解绑';
      // console.log(scope.row.phone);
      this.unbindPhone=scope.row.phone;
      this.$store.commit('showUserUnbind');
    },
    setUser:function(scope){
      this.msg='设置成功';
      this.userSet=scope.row;
      this.$store.commit('showSetUser');
    },
    handleCommand:function(command){
      this.$store.commit(command);
    },
    handleSelectionChange:function(val){
      this.selection=val;
    },
    imSearch:_.debounce(function(){
      this.isNotSearch=false;
      this.fetchData();
    },690),
    resetSearch:function(){
      this.search='';
      this.fetchData();
    }
  },
  created:function(){
    this.fetchData();
    // console.log(this.$route.params);
    //不是线上交押金（1）
    this.isType2=!(this.$route.params.type==='1');
  }
};
</script>

<style lang="css" scoped>
  .user_list{
    background: #FFF;
  }
  .filter_wrap{
    padding-left: 15px;
    padding-right: 15px;
  }
  .loading_parent{
    padding-top: 15px;
    border-top: 1px solid ghostwhite;
  }
  .form_item_underline{
    border-bottom: 1px solid whitesmoke;
    max-height: 40px;
    margin-bottom: 10px;
  }
  .res_sub{
    text-align: right;
    margin-top: 20px;
  }
  .filter_card{
    width: 100%;
    margin-top: 8px;
  }
  .advanced_param_key{
    margin-right: 30px;
  }
</style>
