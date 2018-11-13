<template lang="html">
  <div class="component_joy">
    <h3 class="title">
      <span class="title_span">数据看板</span>
      <el-popover
        placement="right"
        width="330"
        trigger="hover"
        >
        <div>
          1、数据看板目前为免费试用版本，试用期间可能随时关闭此功能；<br />
          2、试用期间可能存在部分数据不准确、显示异常等问题，欢迎将问题反馈给我们；<br />
          3、试用规则的最终解释权属e换电运营团队所有。
        </div>
        <el-button type="text" slot="reference">
          免责声明
        </el-button>
      </el-popover>
    </h3>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartJoy',
  data:function(){
    return ({
    });
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
    fetchData:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.accountBaseInfo,function(objRps){
        Object.keys(objRps.result).forEach(function(v){
          vueThis[v]=objRps.result[v];
        });
      });
    }
  },
  created:function(){
    this.fetchData();
  } //created
};
</script>

<style lang="css" scoped>
  .title_span{
    margin-right: 20px;
  }
</style>
