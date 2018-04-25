<template lang="html">
  <div class="component_user">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">群组管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="user_list" v-if="users.length">
      <!-- table wrap -->
      <div class="table_wrap">
        <el-row>
          <el-col :span="6">
            <h3 class="title">用户列表</h3>
          </el-col>
          <el-col :span="18">
            <div class="table_wrap-search">
              <div class="table_wrap-search_wrap">
                <el-input class="table_wrap-input_serach" placeholder="请输入手机号" v-model="searchPhone" suffix-icon="el-icon-search"></el-input>
              </div>
              <el-button class="table_wrap-btn_reset" type="warning">重置</el-button>
              <el-button class="table_wrap-btn_new" type="primary" @click="showNewUser()">新建</el-button>
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
                  <span>{{ props.row.time }}</span>
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
            label="电动车SN"
            prop="scooters">
          </el-table-column>

          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small">
                解绑
              </el-button>
              <el-button
                type="text"
                size="small">
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
    <div v-if="!users.length" class="empty_user">
      <img src="../assets/empty_user.png" />
      <p>您还没有用户哦！</p>
      <el-button type="primary" size="small">新建</el-button>
    </div>

    <!-- 新建 -->
    <BaseModalWrap />

  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';
import BaseTableWrap from '@/components/BaseTableWrap'; //@/=>src/
import BaseModalWrap from './BaseModalWrap';

export default {
  name:'CUser',
  data:function(){
    return ({
      total:100,
      searchPhone:'',
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
    }
  },
  components:{
    BaseTableWrap,
    BaseModalWrap
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:window.Number(vueThis.$route.params.groupcode)
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:vueThis.pageNum,
        pageSize:urls.pageSize
      };
      //请求地址
      ajaxs.imGet(urls.userList,sendData,function(objRps){
        console.log(objRps);
        if(objRps.code===1000){
          vueThis.total=objRps.result.total;
          vueThis.users=objRps.result.list;
        }
      });
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      // console.log(this.$route.params.groupcode);
      this.$router.push('/user/'+this.$route.params.groupcode+'/'+val);
    },
    showNewUser:function(){

    }
  },
  created:function(){
    this.fetchData();
    // console.log(this.$route.params);
  }
};
</script>

<style lang="css" scoped>
  .im_breadcrumb{
    background: #fff;
    margin-left: -20px;
    margin-right: -20px;
    margin-top: -19px;
    padding:20px 40px;
  }
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
    min-height: calc(100vh - 60px - 60px - 20px - 40px - 30px);
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
