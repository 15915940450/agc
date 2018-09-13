<template lang="html">
  <div class="search_user eqcalc">
    <h3 class="title">用户查询</h3>
    <div class="search_wrap">
      <img src="../assets/search_user.png" alt="search_user" />

      <!-- el-autocomplete -->
      <el-autocomplete
        class="search_input"
        v-model="userPhone"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
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
        <a href="javascript:;">13800138000</a>
        <a href="javascript:;">13800138000</a>
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
      userPhone: '',
      userphoneINlocalstorage: []
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
      }
    }
  },
  components:{
  },
  methods: {
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
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" }
      ];
    },
    handleSelect(item) {
      _.logErr(item);
    }
  },
  created:function(){
    
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