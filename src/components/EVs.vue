<template lang="html">
  <div class="e_vs">
    <div class="evs_list" v-if="evs.length">
      <!-- table wrap -->
      <div class="table_wrap">
        <el-row>
          <el-col :span="6">
            <h3 class="title">电动车列表</h3>
          </el-col>
          <el-col :span="18">
            <div class="table_wrap-search">
              <div class="table_wrap-search_wrap">
                <el-input class="table_wrap-input_serach" placeholder="请输入车牌号（SN）" v-model="searchSN" suffix-icon="el-icon-search"></el-input>
              </div>
              <el-button class="table_wrap-btn_reset" type="warning">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- 电动车表格 -->
        <el-table :data="evs" size="medium" stripe style="width: 100%" class="table_wrap-table">
          <!-- 展开行 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="im-table-expand">
                <el-form-item label="坐标：">
                  <span>{{ props.row.location }}</span>
                </el-form-item>
                <el-form-item label="坐标更新时间：" label-width="300">
                  <span>{{ props.row.locationUpdateTime }}</span>
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
            label="电动车SN"
            prop="sn">
          </el-table-column>
          <el-table-column
            label="用户名"
            prop="userName">
          </el-table-column>
          <el-table-column
            label="手机号"
            prop="owner">
          </el-table-column>
          <el-table-column
            label="电量"
            prop="soc">
          </el-table-column>
          <el-table-column label="操作" width="190">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEVoperation(scope,'EVwake')">
                唤醒
              </el-button>
              <el-button
                @click="handleEVoperation(scope,'EVflameout')"
                type="text"
                size="small">
                熄火
              </el-button>
              <el-button
                type="text"
                size="small">
                轨迹
              </el-button>
              <el-button
                v-if="(scope.row.owner)"
                @click="handleEVunbind(scope)"
                type="text"
                size="small">
                解绑
              </el-button>
              <el-button
                v-if="!(scope.row.owner)"
                @click="handleEVbind(scope)"
                type="text"
                size="small">
                绑定
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" class="table_wrap-pagination" @current-change="handleCurrentChange">
          <!-- 分页 -->
        </el-pagination>
      </div>
    </div>
    <!-- 没有电动车 -->
    <div class="empty_evs" v-if="!evs.length">
      <h3 class="title">电动车列表</h3>
      <img class="empty_evs-img" src="../assets/no_ev.png" alt="还没有电动车切片" />
      <p>您还没有电动车哦！</p>
    </div>

    <!-- 操作响应 -->
    <StatusEVoperation :msg="msg" />
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';
import StatusEVoperation from './StatusEVoperation.vue';

// /scooter/list

export default {
  name:'EVs',
  data:function(){
    return ({
      total:0,
      searchSN:'',
      evs:[
      //   {
      //   "id": "1",//车id
      //   "sid": "111111111111",//编号，对应Mac地址
      //   "sn": "",//序列号
      //   "owner": "111",//拥有者
      //   "userName": "张三丰",//用户名
      //   "country": "中国",//国家
      //   "conf": "中国高配",//配置
      //   "fw": "1",//固件版本
      //   "hw": "1",//硬件版本
      //   "time": 1505727940000,//注册时间
      //   "proTime": "",//出厂时间
      //   "soc": "100",//剩余电量
      //   "location": "113.969660,22.840703",//当前坐标
      //   "locationUpdateTime": "1515118511269"//坐标更新时间
      // }
      ],
      msg:'',
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
    StatusEVoperation
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      var sendData={
        phone:''+window.sessionStorage.agentphone,
        pageNum:vueThis.pageNum,
        pageSize:urls.pageSize
      };
      //请求地址
      ajaxs.imPostForm(urls.evsList,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.total=objRps.result.total;
          vueThis.evs=objRps.result.list;
        }
      });
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      this.$router.push('/evs/'+val);
    },
    handleEVoperation:function(scope,url){
      var vueThis=this;
      // console.log(scope.row.sid);  需要传sid
      var sendData={
        scooterSid:scope.row.sid
      };
      ajaxs.imPostJson(urls[url],sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.msg=objRps.msg;
          vueThis.$store.commit('showStatusEVoperation');
        }
      });
    },
    handleEVunbind:function(scope){
      var vueThis=this;
      var sendData={
        scooterSid:scope.row.sid,
        userId:scope.row.owner
      };
      ajaxs.imPostJson(urls.EVunbind,sendData,function(objRps){
        if(objRps.code===1000){
          vueThis.msg=objRps.msg;
          vueThis.$store.commit('showStatusEVoperation');
        }
      });
    },
    handleEVbind:function(scope){
      console.log(scope);
    }
  },
  created:function(){
    this.fetchData();
  }

};
</script>

<style lang="css" scoped>
  .evs_list{
    background: #FFF;
    margin-top: 20px;
  }
  /* 电动车为空 */
  .empty_evs{
    background: #FFF;
    text-align: center;
    padding-bottom: 30px;
    min-height: calc(100vh - 60px - 60px - 30px);
  }
  .empty_evs .title{
    text-align: left;
  }
  /* .empty_evs img{
    margin-top:100px;
  } */
  .empty_evs p{
    color: #999;
    font-size: 14px;
    margin-bottom: 30px;
  }
  .empty_evs-img{
    width: 170px;
    height: 130px;
    display: block;
    border:1px solid #AAA;
    margin:180px auto 10px;
  }

</style>
