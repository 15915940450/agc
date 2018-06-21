<template lang="html">
  <div class="component_combo eqcalc">
    <h3 class="title with_sub">
      套餐管理
      <p>
        在此页面查看拥有的套餐，分配套餐给用户时会消耗套餐的数量，数量可购买。
        <a href="javascript:;"></a>
        
        <router-link to="/combo/history/1">购买记录</router-link>
      </p>
    </h3>
    <div class="combo_list" v-loading="loadingComboList">
      <el-row :gutter="10">
        <el-col :span="8" v-for="combo in comboList" :key="combo.id">
          <div class="combo_card">
            <h4>{{combo.name}}</h4>
            <p class="combo_card_info">
              <span>有效期{{combo.duration}}天</span>
              <span>
                <strong>{{combo.agentPrice}}</strong>
                元/份
              </span>
            </p>
            <p class="combo_card_buy">
              <span>
                剩余
                <strong>{{combo.number}}</strong>
                份
              </span>
              <span>
                <el-button type="primary" size="mini" @click="handleComboBuy(combo)">购买</el-button>
              </span>
            </p>
            <span class="mark_triangle">
              <!-- 亦可以用矩形傾斜實現 -->
            </span>
            <!-- 无限 -->
            <mark>{{combo.count}}次</mark>
          </div>
        </el-col>

      </el-row>
    </div>
    <div class="im_empty" v-if="!comboList.length && !loadingComboList">
      <img class="im_empty_img" src="../assets/empty_combo.png" alt="暂无可购买的套餐" />
      <p class="im_empty_p">暂无可购买的套餐</p>
    </div>

    <!-- buy combo modal -->
    <FormComboBuy v-bind="comboBuyItem" />
    <StatusTopUp />
  </div>
</template>

<script>
import {mapState} from 'vuex';
import FormComboBuy from './FormComboBuy.vue';
import StatusTopUp from './StatusTopUp.vue';

export default {
  name:'HeartGroup',
  data:function(){
    return ({
      loadingComboList:true,
      comboBuyItem:null,
      comboList:[
      // {
        // "id": "00ac16323a9a48149f0e349681cf8631",//套餐ID
        // "name": "租一颗电池",//套餐名称
        // "type": 1,//套餐类型（0=月套餐 1=次套餐 2=免费套餐）
        // "price": "1200",//金额
        // "duration": "30",//可用时长（天）
        // "count": 100,//换电次数
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
      });
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
  .component_combo{
    background:#fafbfc;
  }
  h3.title.with_sub{
    height: 80px;
    position: relative;
    background: white;
  }
  h3.title.with_sub p{
    position: absolute;
    left: 0;
    bottom: 0;
    padding:0 15px;
    margin: 0;
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
  }
  h3.title.with_sub a{
    float: right;
    font-weight: 500;
  }
  .combo_list{
    background: #fafbfc;
    /*background:lime;*/
    padding: 15px;
    min-height: 100px;
  }
  .combo_card{
    background: white;
    position: relative;
    box-shadow: #0000001a 0px 0px 1px 1px;
    padding:16px 24px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 15px;
  }
  mark{
    position: absolute;
    right: 0;
    top: 10px;
    background: none;
    transform: rotate(45deg);
    color: white;
  }
  .mark_triangle{
    width: 0;
    height: 0;
    border-width: 44px;
    border-style: solid;
    border-color: transparent transparent transparent #fea94a; 
    display: block;
    position: absolute;
    top: -44px;
    right: -44px;
    transform: rotate(-45deg);
  }
  .combo_card h4{
    font-size: 18px;
  }
  .combo_card_info{
    border-bottom: 1px solid #ccc;
  }
  .combo_card_info strong{
    color:#F60;
    font-size: 30px;
    font-weight: 500;
  }
  .combo_card p > span:nth-child(1){
    float: left;
  }
  .combo_card p > span:nth-child(2){
    float: right;
  }
  .combo_card_info{
    height: 44px;
  }
  .combo_card_info span{
    height: 40px;
    line-height: 40px;
    display: block;
  }
  .combo_card_buy strong{
    font-weight: 500;
    color: #F60;
  }
</style>