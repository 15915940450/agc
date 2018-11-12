<template lang="html">
  <div class="evallgeographic eqcalc">
    <div class="evallgeographic_head">
      <h3 class="title with_sub">
        <span class="real_title">中控分布</span>
        <el-tooltip 
          effect="dark" 
          content="" 
          placement="bottom-start"
          >
          <div slot="content">
            中控的地理分布情况，未激活的中控无法查看地理位置。点击中控可查看中控详情
          </div>
          <span class="hint_info">
            <i class="el-icon-info"></i>
          </span>
        </el-tooltip>
        <small class="today_active">今日活跃中控： 90</small>
      </h3>
      
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartEVallGeographic',
  data:function(){
    return ({});
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  methods:{

  },
  created:function(){
  }
};
</script>

<style lang="css" scoped>
  .evallgeographic{
    background: #FFF;
  }
  .evallgeographic_head{
    background:white;
    margin:0;
  }
  .hint_info{
    color:#2490f2;
  }
  .today_active{
    margin-left: 20px;
  }
</style>