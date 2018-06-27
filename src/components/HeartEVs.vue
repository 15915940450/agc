<template lang="html">
  <div class="e_vs">
    <!-- <transition name="el-zoom-in-top"> -->
    <div class="evs_list eqcalc" v-if="(evs.length || !isNotSearch || loadingEVs)">
      <!-- table wrap -->
      <div class="table_wrap">
        <el-row>
          <el-col :span="6">
            <h3 class="title">中控列表</h3>
          </el-col>
          <el-col :span="18">
            <div class="table_wrap-search">
              <div class="table_wrap-search_wrap">
                <el-input @input="imSearch()" class="table_wrap-input_serach" placeholder="请输入中控SN" v-model="search" suffix-icon="el-icon-search"></el-input>
              </div>
              <el-button @click="resetSearch()" class="table_wrap-btn_reset" type="warning">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <div v-loading="loadingEVs">
          <!-- 中控表格 -->
          <div class="table_wrap_real">
            <el-table :data="evs" size="medium" stripe style="width: 100%" class="table_wrap-table">
              <!-- 展开行 -->
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="im-table-expand">
                    <el-form-item label="坐标：">
                      <el-button title="前往地图查看定位" type="text" @click="rrPush(props.row,'point')">
                        {{props.row.location}}
                      </el-button>
                    </el-form-item>
                    <el-form-item label="坐标更新时间：" label-width="300">
                      <span v-html="props.row.locationUpdateTime"></span>
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
                label="中控SN"
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
              <el-table-column
                label="状态"
                prop="status">
              </el-table-column>

              <el-table-column label="操作" width="190">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="handleEVoperation(scope,'EVwake')">
                    通电
                  </el-button>
                  <el-button
                    @click="handleEVoperation(scope,'EVflameout')"
                    type="text"
                    size="small">
                    断电
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="rrPush(scope.row,'track')"
                    >
                    轨迹
                  </el-button>
                  <el-button
                    v-if="(scope.row.owner && scope.row.owner!=='─')"
                    @click="handleEVunbind(scope)"
                    type="text"
                    size="small">
                    解绑
                  </el-button>
                  <el-button
                    v-else
                    @click="handleEVbind(scope)"
                    type="text"
                    size="small">
                    绑定
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          
          <div class="table_wrap_pagination">
            <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" @current-change="handleCurrentChange">
              <!-- 分页 -->
            </el-pagination>
          </div>
        </div>        
      </div>
    </div>
    <!-- </transition> -->

    <!-- 没有中控 -->
    <div class="empty_evs im_empty_wrap eqcalc" v-if="(!evs.length && isNotSearch && !loadingEVs)">
      <h3 class="title">中控列表</h3>
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/no_ev.png" alt="还没有中控" />
        <p class="im_empty_p">您还没有中控哦！</p>
      </div>
      
    </div>

    <!-- 操作响应 -->
    <FormEVbind :scooterSid="scooterSid" :scooterSN="scooterSN" />
    <StatusEVoperation :msg="msg" />
    <FormEVunbind :scooterSid="scooterSid" :scooterSN="scooterSN" />
  </div>
</template>

<script>
import {mapState} from 'vuex';
import FormEVbind from './FormEVbind.vue';
import StatusEVoperation from './StatusEVoperation.vue';
import FormEVunbind from './FormEVunbind.vue';

export default {
  name:'HeartEVs',
  data:function(){
    return ({
      total:0,
      search:'',
      isNotSearch:true,
      scooterSN:'',
      evs:[
      //   {
      //   "id": "1",//id
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
      loadingEVs:true,
      msg:'',
      scooterSid:'',
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
    'modalStore.statusEVoperation':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  components:{
    FormEVbind,
    FormEVunbind,
    StatusEVoperation
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      vueThis.loadingEVs=true;
      var advancedParam=JSON.stringify({
        scooterSN:vueThis.search
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:vueThis.pageNum,
        pageSize:vueThis.$yApi.defaultPS
      };
      vueThis.$rqs(vueThis.$yApi.scooterList,function(objRps){
        vueThis.loadingEVs=false;
        vueThis.total=objRps.result.total;
        vueThis.evs=objRps.result.list;
        // _.logErr(vueThis.evs);
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='locationUpdateTime' && v){
            _.logErr(v);
            //make sure the timestamp is a number
            return (_.toSlash(new Date(v),{
              slash:'/',
              T:false
            })).slice(0,19);
          }
          if(k==='status'){
            return (['未激活','已激活'][v]);
          }
        }
      });
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      this.$router.push('/evs/'+val);
    },
    handleEVoperation:function(scope,type){
      var vueThis=this;
      // console.log(scope.row.sid);  需要传sid
      var sendData={
        scooterSid:scope.row.sid
      };
      vueThis.$rqs(vueThis.$yApi[type],function(objRps){
        vueThis.msg=objRps.msg;
        vueThis.$store.commit('showStatusEVoperation');
      },{
        objSendData:sendData
      });
    },
    handleEVunbind:function(scope){
      this.scooterSid=scope.row.sid;
      this.scooterSN=scope.row.sn;
      this.$store.commit('showEVunbind');
      this.msg='已成功解绑';
    },
    handleEVbind:function(scope){
      // console.log(scope);
      this.scooterSid=scope.row.sid;
      this.scooterSN=scope.row.sn;
      this.$store.commit('showEVbind');
      this.msg='绑定成功！';
    },
    imSearch:_.debounce(function(){
      this.isNotSearch=false;
      this.fetchData();
    },690),
    resetSearch:function(){
      this.search='';
      this.fetchData();
    },
    rrPush:function(ev,childrenPath){
      // _.logErr(ev);
      var query={
        sn:ev.sn
      };
      //point,track
      if(childrenPath==='point'){
        if(ev.location==='─'){
          return false;
        }
        query.ll=ev.location;
        query.time=ev.locationUpdateTime;
      }
      this.$router.push({
        path:'/ev/'+ev.sid+'/'+childrenPath,
        query:query
      });
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
  }
</style>
