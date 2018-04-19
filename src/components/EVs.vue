<template lang="html">
  <div class="e_vs">
    <div class="evs_list" v-if="list.length">
      <!-- table wrap -->
      <BaseTableWrap />
    </div>
    <!-- 没有电动车 -->
    <div class="empty_evs">
      <h3 class="title">电动车列表</h3>
      <img class="empty_evs-img" src="../assets/no_ev.png" alt="还没有电动车切片" />
      <p>您还没有电动车哦！</p>
    </div>
  </div>
</template>

<script>
import BaseTableWrap from '@/components/BaseTableWrap'; //@/=>src/

export default {
  name:'EVs',
  data:function(){
    return ({
      list:[]
    });
  },
  components:{
    BaseTableWrap
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
