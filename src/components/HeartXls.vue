<template lang="html">
  <div class="component_xls eqcalc">
    <div class="xls_head">
      <h3 class="title with_sub">
        <span class="real_title">报表管理</span>
      </h3>
      
    </div>

    <div class="xls_wrap">
      <table class="vim_table">
        <tbody>
          <tr>
            <td>
              用户套餐记录
              
              <el-tooltip 
                effect="dark" 
                content="" 
                placement="bottom"
                >
                <div slot="content">
                  导出所有用户的套餐信息，<br />
                  最多可导出最近60天的记录
                </div>
                <span class="hint_info">
                  <i class="el-icon-info"></i>
                </span>
              </el-tooltip>
            </td>
            <td>
              <div class="range">
                <el-date-picker
                  v-model="value6"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </div>
            </td>
            <td>
              <el-button type="primary">导出</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
  </div>
</template>

<script>
import {mapState} from 'vuex';
import FormComboBuy from './FormComboBuy.vue';
import StatusTopUp from './StatusTopUp.vue';

export default {
  name:'HeartCombo',
  data:function(){
    return ({
      value6: '',

      loadingComboList:true,
      comboBuyItem:null,
      comboList:[
      // {
        // "id": "00ac16323a9a48149f0e349681cf8631",//套餐ID
        // "name": "租一颗电池",//套餐名称
        // "type": 1,//套餐类型（0=月套餐 1=次套餐 2=免费套餐）
        // "price": "1200",//金额
        // "duration": "30",//可用时长（天）
        // "count": 100,//换电次数,20000:无限次>=20000
        // "remark":"打折7.5", //套餐备注
        // "agentPrice":23.00, //代理商购买价格
        // "code":66,
        // "number":3  //购买数量
      // }

      ]
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchComboList();
      }
    },
    'modalStore.statusTopUp':function(val){
      if(!val){
        this.fetchComboList();
      }
    }
  },
  components:{
    FormComboBuy,
    StatusTopUp
  },
  methods:{
    fetchComboList:function(){
      var vueThis=this;
      vueThis.loadingComboList=true;
      vueThis.$rqs(vueThis.$yApi.comboList,function(objRps){
        // console.log(objRps);
        vueThis.loadingComboList=false;
        vueThis.comboList=objRps.result.list;
      },{reviver:function(k,v){
        if(k==='count'){
          if(window.Number(v)>=20000){
            return ('无限次');
          }else{
            return (v+'颗');
          }
        }
      }});
    },
    handleComboBuy:function(combo){
      this.comboBuyItem=combo;
      this.$store.commit('showComboBuy');
    }
  },
  created:function(){
    this.fetchComboList();
  }
};
</script>

<style lang="css" scoped>
  .component_xls{
    background:#fafbfc;
  }
  .xls_head{
    background:white;
    margin:0;
  }
  .xls_wrap{
    padding: 25px;
  }
  .hint_info{
    color:#2490f2;
  }
</style>
