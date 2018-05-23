<template lang="html">
  <div class="component_user">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">群组管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="user_list" v-if="(users.length || !isNotSearch)">
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
        <!-- 用户列表表格 -->
        <el-table
          :data="users" size="medium" stripe
          style="width: 100%" class="table_wrap-table">
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="im-table-expand">
                <el-form-item label="用户ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="注册时间">
                  <span>{{ new Date(props.row.time) }}</span>
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
            prop="batteries" :formatter="formatter">
          </el-table-column>
          <el-table-column
            label="电动车SN"
            prop="scooters" :formatter="formatter">
          </el-table-column>

          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small" @click="unbindUser(scope)">
                解绑
              </el-button>
              <el-button
                type="text"
                size="small" @click="setUser(scope)">
                设置
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" class="table_wrap-pagination" @current-change="handleCurrentChange">
          <!-- 分页 -->
        </el-pagination>
      </div>

    </div>
    <div v-if="(!users.length && isNotSearch)" class="empty_user">
      <img src="../assets/empty_user.png" />
      <p>您还没有用户哦！</p>
      <el-button type="primary" @click="showNewUser()">添加</el-button>
    </div>

    <!-- 添加 -->
    <FormNewUser />
    <FormEVin />
    <BaseStatus :msg="msg" />
    <FormUnbindUser :phone="unbindPhone" />
    <FormSetUser v-bind="userSet" />


  </div>
</template>

<script>
import {mapState} from 'vuex';
import FormNewUser from './FormNewUser.vue';
import BaseStatus from './BaseStatus.vue';
import FormUnbindUser from './FormUnbindUser.vue';
import FormEVin from './FormEVin.vue';
import FormSetUser from './FormSetUser.vue';

export default {
  name:'HeartUser',
  data:function(){
    return ({
      total:100,
      msg:'',
      search:'',
      isNotSearch:true,
      unbindPhone:'',
      userSet:null,

      users:[

      ],
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    pageNum:function(){
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
    FormSetUser
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:window.Number(vueThis.$route.params.groupcode),
        userPhone:vueThis.search
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      vueThis.$rqs(vueThis.$yApi.userList,function(objRps){
        vueThis.total=objRps.result.total;
        vueThis.users=objRps.result.list;
      },{
        objSendData:sendData
      });
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      // console.log(this.$route.params.groupcode);
      this.$router.push('/user/'+this.$route.params.groupcode+'/'+this.$route.params.type+'/'+val);
    },
    showNewUser:function(){
      this.msg='已成功添加用户';
      this.$store.commit('showNewUser');
    },
    showEVin:function(){
      this.msg='车辆已激活';
      this.$store.commit('showEVin');
    },
    formatter:function(row, column, cellValue){
      if(column.property==='batteries' && cellValue.length){
        return (cellValue.map(function(v){
          return v.sn;
        }).join(' , '));
      }
      if(column.property==='scooters' && cellValue.length){
        return (cellValue.map(function(v){
          return v.sn;
        }).join(' , '));
      }
    },
    unbindUser:function(scope){
      this.msg='用户已解绑';
      // console.log(scope.row.phone);
      this.unbindPhone=scope.row.phone;
      this.$store.commit('showUserUnbind');
    },
    setUser:function(scope){
      // console.log(JSON.stringify(scope.row));
      this.msg='设置成功';
      this.userSet=scope.row;
      this.$store.commit('showSetUser');
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
  }
};
</script>

<style lang="css" scoped>
  .user_list{
    background: #FFF;
    margin-top: 20px;
  }
  /* 没有用户 */
  .empty_user{
    background: #FFF;
    text-align: center;
    padding-bottom: 30px;
    margin-top:20px;
    min-height: calc(100vh - 220px);
  }
  .empty_user .title{
    text-align: left;
  }
  .empty_user img{
    margin-top:100px;
  }
  .empty_user p{
    color: #999;
    font-size: 14px;
    margin-bottom: 30px;
  }
</style>
