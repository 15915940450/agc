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
              <el-button type="danger" @click="rrPush('/user/changephone')">修改手机</el-button>
            </div>
          </el-col>
        </el-row>

        <div v-loading="loadingUserList" class="loading_parent">
          <!--操作，篩選-->
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
              @expand-change="handleExpandChange"
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
                  <el-form label-position="right" inline class="im-table-expand">
                    <el-form-item label="当前套餐：">
                      <span v-if="typeof(props.row.currentTaocan)==='string'">
                        加载中...
                      </span>
                      <!--空數組-->
                      <div v-else-if="props.row.currentTaocan.length===0">
                        暂无可用套餐
                      </div>
                      <div v-else class="current_taocan">
                        <!--【套餐名称/套餐类型/次数/有效天数】，例【限量套餐月卡/月套餐/90次/30天】，次数20000次显示为无限次-->
                        <div
                          v-for="item in props.row.currentTaocan"
                          v-if="item.name!=='代理商群组免费'"
                          :key="item.id"
                          >
                          {{item.neroTaocan}}
                        </div>
                      </div>

                      <a href="javascript:;" @click="toUserCombo(props.row.phone)">查看详情</a>
                    </el-form-item>
                    <el-form-item label="注册时间：">
                      <span v-html="props.row.time"></span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>

              <el-table-column
                label="#"
                type="index"
                :index="indexMethod"
                width="50">
              </el-table-column>
              <el-table-column
                label="用户昵称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="手机号码"
                prop="phone">
              </el-table-column>

              <!-- 电池SN -->
              <el-table-column
                label="电池SN"
                width="250"
                >
                <template slot-scope="scope">
                  <span class="sns" v-for="(sn) in scope.row.batteries" :key="sn">{{sn}}</span>
                </template>
              </el-table-column>

              <!-- 中控SN -->
              <el-table-column
                label="中控SN"
                >
                <template slot-scope="scope">
                  <span class="sns" v-for="(sn) in scope.row.scooters" :key="sn">{{sn}}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" width="110">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="unbindUser(scope)">
                    移除用户
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


          <div class="table_wrap_pagination" v-show="total">
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
      pageNum:1
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
    pageSize:function(){
      this.fetchData();
    },
    'modalStore.needShop':function(val){
      if(!val){
        this.fetchData();
      }
    },
    'modalStore.needFetchData':function(val){
      if(val){
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
        vueThis.loadingUserList=false;
        vueThis.total=objRps.result.total;
        vueThis.users=objRps.result.list;
        vueThis.$store.commit('setNoNeedFetchData');
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='time'){
            return (_.toSlash(v).slice(0,19));
          }
          if(k==='batteries' || k==='scooters'){
            var tmp=v.map(function(vMap){
              return (vMap.sn);
            });
            // console.log(tmp);
            return (tmp);
          }
          if(v.phone){
            v.currentTaocan='加载中...';
            return v;
          }
          if(k==='freeDays' && v===''){
            return 0;
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
      this.$router.push('/user/'+this.$route.params.groupcode+'/'+this.$route.params.type+'/'+val);
      this.fetchData();
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
      this.msg='用户已移除';
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
    //當前套餐列表
    handleExpandChange:function(row){
      var vueThis=this;
      var index=vueThis.users.findIndex(function(v){
        return (v.phone===row.phone);
      });

      var sendData={
        userPhone:row.phone
      };
      if(row.currentTaocan==='加载中...'){
        //加載中--)[]--)[xxx]
        vueThis.$rqs(vueThis.$yApi.currentTaocan,function(objRps){
          //_.logErr(objRps)
          var arrTmp=objRps.result.filter(function(v){
            return (v.name!=='代理商群组免费');
          });
          vueThis.users[index].currentTaocan=arrTmp;
        },{
          objSendData:sendData,
          reviver:function(k,v){
            if(v.duration!==undefined){
              var dORe=v.duration+'天';
              if(v.duration==='' || v.duration==='─'){
                dORe=v.expirationDate.replace(/-/gi,'');
              }
              if(v.times>=20000){
                v.times='无限';
              }
              v.neroTaocan=`${v.name} / ${['月卡','次卡','两月卡'][v.type]} / ¥${v.price} / ${v.times}次 / ${dORe}`;
              return (v);
            }
          }
        });
      }
    },
    rrPush:function(path){
      this.$router.push({
        path:path
      });
    },
    imSearch:_.debounce(function(){
      this.isNotSearch=false;
      this.pageNum=1;
      this.$router.push('/user/'+this.$route.params.groupcode+'/'+this.$route.params.type+'/'+1);
      this.fetchData();
    },690),
    resetSearch:function(){
      this.search='';
      this.pageNum=1;
      this.$router.push('/user/'+this.$route.params.groupcode+'/'+this.$route.params.type+'/'+1);
      this.fetchData();
    },
    toUserCombo:function(userPhone){
      this.rrPush('/usercombo/'+userPhone+'/1');
    },
    indexMethod:function(index){
      return ((this.pageNum-1)*this.pageSize+index+1);
    }
  },
  created:function(){
    // console.log(this.$route.path);
    this.pageNum=(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1);
    //不是线上交押金（1）
    this.isType2=!(this.$route.params.type==='1');
    //search
    this.search=this.$route.query.userPhone || '';
    //拉去數據
    this.fetchData();
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
  .sns{
    margin-right: 10px;
  }
  .sns:last-child{
    margin-right: 0px;
  }
  .current_taocan{
    width:250px;
  }
</style>
