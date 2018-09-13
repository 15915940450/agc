<template lang="html">
  <div class="component_combo eqcalc">
    <div class="combo_head">
      <h3 class="title with_sub">
        <span class="real_title">套餐说明</span>
        <router-link class="combo_history_entrance" to="/combo/history">套餐记录</router-link>
      </h3>
      <div class="step_wrap">
        <el-row :gutter="16">
          <!--1-->
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                <span class="step_number">1</span>
              </el-col>
              <el-col :span="20">
                <span class="step_line"></span>
                <p class="step_text">在此页面购买一定数量的套餐，每分配给1个用户需要消耗1份套餐</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                <span class="step_number">2</span>
              </el-col>
              <el-col :span="20">
                <span class="step_line"></span>
                <p class="step_text">在【群组管理】将套餐设置给指定群组</p>
              </el-col>
            </el-row>
          </el-col>
          <!--3-->
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                <span class="step_number">3</span>
              </el-col>
              <el-col :span="20">
                <span class="step_line"></span>
                <p class="step_text">进入指定群组的用户列表选择用户，通过【操作】-【分配套餐】分配给用户</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--<el-steps :active="3">-->
          <!--<el-step description="在此页面购买一定数量的套餐，每分配给1个用户需要消耗1份套餐"></el-step>-->
          <!--<el-step description="在【群组管理】将套餐设置给指定群组"></el-step>-->
          <!--<el-step description="进入指定群组的用户列表选择用户，通过【操作】-【分配套餐】分配给用户"></el-step>-->
        <!--</el-steps>-->
      </div>
    </div>

    
    <div class="combo_list" v-loading="loadingComboList">
      <el-tabs v-model="TabActive">
        <el-tab-pane label="可用" name="available">
          <el-row :gutter="10">
            <el-col :span="8" v-for="combo in comboList" :key="combo.id">
              <div class="combo_card">
                <h4>{{combo.name}}</h4>
                <p class="combo_card_info">
                  <span v-if="combo.duration!=='' && combo.duration!=='─'">有效期 {{combo.duration}} 天</span>
                  <span v-else>{{combo.expirationDate}} 失效</span>
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
                <mark>{{combo.count}}</mark>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 過期 -->
        <el-tab-pane label="过期" name="un">
          <el-row :gutter="10">
            <el-col :span="8" v-for="combo in comboListUn" :key="combo.id">
              <div class="combo_card">
                <h4>{{combo.name}}</h4>
                <p class="combo_card_info un">
                  <span v-if="combo.duration!=='' && combo.duration!=='─'">有效期 {{combo.duration}} 天</span>
                  <span v-else>{{combo.expirationDate}} 失效</span>
                  <span>
                    <strong>{{combo.agentPrice}}</strong>
                    元/份
                  </span>
                </p>
                <p class="combo_card_buy un">
                  <span>
                    剩余
                    <strong>{{combo.number}}</strong>
                    份
                  </span>
                  <span class="o0">
                    <el-button type="primary" size="mini" @click="handleComboBuy(combo)">购买</el-button>
                  </span>
                </p>
                <span class="mark_triangle un">
                  <!-- 亦可以用矩形傾斜實現 -->
                </span>
                <!-- 无限 -->
                <mark>{{combo.count}}</mark>
                <img class="img_outofday" src="../assets/outofday.png" alt="過期">
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      
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
  name:'HeartCombo',
  data:function(){
    return ({
      TabActive:'available',
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

      ],
      comboListUn:[
      ]
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchComboList(1);
        this.fetchComboList(2);
      }
    },
    'modalStore.statusTopUp':function(val){
      if(!val){
        this.fetchComboList(1);
        this.fetchComboList(2);
      }
    }
  },
  components:{
    FormComboBuy,
    StatusTopUp
  },
  methods:{
    fetchComboList:function(paramType){
      var vueThis=this;
      var sendData={
        type:paramType
      };
      vueThis.loadingComboList=true;
      vueThis.$rqs(vueThis.$yApi.comboList,function(objRps){
        // console.log(objRps);
        vueThis.loadingComboList=false;
        if(+paramType===1){
          vueThis.comboList=objRps.result.list;
        }else{        
          vueThis.comboListUn=objRps.result.list;
        }
      },{
        objSendData:sendData,
        reviver:function(k,v){
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
    this.fetchComboList(1);
    this.fetchComboList(2);
  }
};
</script>

<style lang="css" scoped>
  .component_combo{
    background:#fafbfc;
  }
  .combo_head{
    background:white;
    margin:0;
  }
  .step_wrap{
    padding:24px 32px 0 32px;
  }
  .step_number{
    display:block;
    width:26px;
    height:26px;
    text-align:center;
    line-height:26px;
    font-size:15px;
    color:#2490F2;
    border:2px solid #2490F2;
    border-radius:69px;
  }
  .step_line{
    display:block;
    height:4px;
    background:#2491F2;
    background:linear-gradient(90deg,#78b7f6,#8cd7fb);
    border-radius:9px;
    margin-top:13px;
  }
  .step_text{
    color:#696969;
    font-size:13px;
    margin-top:32px;
    line-height:2.3em;
  }
  h3.title.with_sub{
    height:50px;
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
    position: relative;
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
    border-color: #fea94a;
    /*border-color: transparent transparent transparent #fea94a; */
    display: block;
    position: absolute;
    top: -44px;
    right: -44px;
    transform: rotate(-45deg);
  }
  .mark_triangle.un{
    border-color: #cfcfd0;
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
  .combo_card_buy.un strong,.combo_card_info.un strong{
    color: #555;
  }
  .combo_history_entrance{
    float:right;
  }
  .img_outofday{
    position: absolute;
    left: 72px;
    top: 0;
  }
</style>
