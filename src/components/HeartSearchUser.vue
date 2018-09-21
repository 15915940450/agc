<template lang="html">
  <div class="search_user eqcalc">
    <h3 class="title">用户查询</h3>
    <div class="search_wrap">
      <img src="../assets/search_user.png" alt="search_user" />

      <!-- el-autocomplete -->
      <el-autocomplete
        class="search_input"
        v-model.trim="userPhone"
        :fetch-suggestions="querySearch"
        placeholder="请输入手机号码"
        suffix-icon="el-icon-search"
        @select="handleSelect"
        >
      </el-autocomplete>
      <!-- <el-input
        class="search_input"
        placeholder="输入手机号码查询用户"
        suffix-icon="el-icon-search"
        autofocus="true"
        auto-complete="on"
        >
      </el-input> -->
      <p class="latest_add">
        最近添加： 
        <a href="javascript:;" v-for="item in userLastAdd" :key="item" @click="handleClickLastAdd(item)">
          {{item}}
        </a>
        <span v-if="!userLastAdd.length">
          无
        </span>
      </p>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';

export default {
  name:'HeartSearchUser',
  data:function(){
    return ({
      userPhone:'',
      userphoneINlocalstorage:[],
      userLastAdd:[]
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    // deep watcher
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
        this.fetchLastAdd();
      }
    },
    'userPhone':_.debounce(function(val){
      if(_.isPhone(val)){
        this.fetchData();
      }
    },1520)
  },
  components:{
  },
  methods: {
    fetchData:function(userPhone){
      var vueThis=this;
      userPhone=userPhone || vueThis.userPhone;
      var sendData={
        pageNum:1,
        pageSize:10,
        advancedParam:JSON.stringify({
          userPhone:userPhone
        })
      };
      // console.log(window.localStorage.searchphone); //undefined,''--->[]
      //用戶列表(currentGroupType //1-可退(綫上) 2-不可退(綫下))
      vueThis.$rqs(vueThis.$yApi.userList,function(objRps){
        // console.log(objRps);
        //有結果返回
        if(objRps.result.total){
          //輸入歷史列表存貯到localstorage
          var searchphone=JSON.parse(window.localStorage.searchphone || '[]');

          var found=searchphone.findIndex(function(v){
            return (''+v.value===''+userPhone);
          });
          // console.log(found); //-1
          //去重，最多10條
          if(found===-1){
            var searchphoneLen=searchphone.unshift({
              value:userPhone
            });
            if(searchphoneLen>10){
              searchphone.length=10;
            }
            var strsearchphone=JSON.stringify(searchphone);
            window.localStorage.setItem('searchphone',strsearchphone);
          }

          
          //跳轉頁面
          var groupcode=objRps.result.list[0].groupCode;
          var type=+objRps.result.list[0].currentGroupType || 1;  //默認 1-可退(綫上)
          var pn=1;
          vueThis.$router.push({
            path:'/user/'+groupcode+'/'+type+'/'+pn,
            query:{
              userPhone:userPhone
            }
          });

        }else{
          vueThis.$message({
            showClose: true,
            message: '该用户不存在，请检查手机号码'
          });
        }
      },{
        objSendData:sendData
      });
    },
    fetchLastAdd:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userLastAdd,function(objRps){
        if(objRps.result.list.length>2){
          objRps.result.list.length===2;
        }
        vueThis.userLastAdd=objRps.result.list;
      });
    },
    querySearch(queryString, cb) {
      var userphoneINlocalstorage = this.userphoneINlocalstorage;
      var results = queryString ? userphoneINlocalstorage.filter(this.createFilter(queryString)) : userphoneINlocalstorage;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      // return [
      //   { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
      //   { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
      //   { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
      //   { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
      //   { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
      //   { "value": "贡茶", "address": "上海市长宁区金钟路633号" }
      // ];
      var searchphone=JSON.parse(window.localStorage.searchphone || '[]');
      // console.log(searchphone);
      return (searchphone);
    },
    handleSelect(item) {
      _.logErr(item);
    },
    handleClickLastAdd:function(item){
      // console.log(item);
      this.fetchData(item);
    }
  },
  created:function(){
    this.fetchLastAdd();
  },
  mounted:function(){
    this.userphoneINlocalstorage = this.loadAll();
  }
};
</script>
<style lang="css">
.search_user{
  background: #FFF;
}
.latest_add a{
  margin-right: 16px;
}
.search_wrap{
  width: 330px;
  display: block;
  margin:0 auto;
  text-align: center;
  margin-top:calc(50vh - 71px - 50px - 144px);
}
.search_input{
  width: 330px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>