<template lang="html">
  <div class="component_joy">
    <!-- 欢迎小卡条 -->
    <el-row class="im_joy-wrap">
      <el-col :span="16">
        <p class="im_joy">
          <img class="im_joy-head" src="../assets/default_head.png" width="40" height="40" />
          <span class="main_title">{{agent.name}}，e换电祝您开心每一天！</span>
        </p>
      </el-col>
      <el-col :span="8">
        <a class="to_deposit" href="javascript:;" @click="rrPush('/deposit')">
          <p class="im_key">我的押金</p>
          <p class="im_value">
            <span>{{availableDeposite}}</span>
          </p>
        </a>

      </el-col>
    </el-row>
    <!-- 代理商最关心的卡片 -->
    <div class="joy_cards">
      <el-row :gutter="10">

        <!-- 用户 -->
        <el-col :span="6">
          <div class="im_card im_card_1 is_link" @click="rrPush('/group')">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon card_user">
                  用户数
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  用户数
                </h3>
                <p class="im_card-value">
                  <span>{{userNum}}</span>
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 可用电池数 -->
        <el-col :span="6">
          <div class="im_card im_card_2">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon card_battery">
                  可用电池数
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  可用电池数
                </h3>
                <p class="im_card-value">
                  {{availableBattery}}
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 剩余免费天数 -->
        <el-col :span="6">
          <div class="im_card im_card_3">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon card_day">
                  剩余免费天数
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  剩余免费天数
                </h3>
                <p class="im_card-value">
                  {{freeDays}}
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 中控数 -->
        <el-col :span="6">
          <div class="im_card im_card_4">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon card_ev">
                中控数
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  中控数
                </h3>
                <p class="im_card-value">
                  {{scooterNum}}
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartJoy',
  data:function(){
    return ({
      availableDeposite:'--',
      userNum:'--',
      freeDays:'--',
      scooterNum:'--',
      refundableDeposit:'--',
      availableBattery:'--',
      usedBattery:'--'
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needShop':function(val){
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
    },
    rrPush:function(path){
      this.$router.push({
        path:path
      });
    }
  },
  created:function(){
    this.fetchData();
    // console.log(this.$store.state.modalStore.needLogin);
  } //created
};
</script>

<style lang="css" scoped>
.component_joy{
}
.im_joy-wrap{
  padding:15px;
  background: #FFF;
}
.joy_cards{
  background: #FFF;
  margin: 10px 0 0 0;
  padding:15px;
  min-height: calc(100vh - 260px);
}

.im_joy{
  height: 48px;
  line-height: 48px;
  margin: 0;
  padding: 0;
}
.im_joy img{
  vertical-align: middle;
  border-radius: 90px;
}
.im_joy-head{
  background: #6DCFF6;
}
.im_joy span{
  vertical-align: middle;
}
.to_deposit{
  float: right;
}
.to_deposit .im_key{
  margin: 0;
  text-align: right;
  color:#333;
}
.im_value{
  text-align: right;
  margin: 0;
  font-size: 20px;
  color: #FF3333;
  font-weight: 500;
}
/* 卡片 */
.im_card{
  background: #FFF;
  font-size: 12px;
  max-height: 100px;
  height: 100px;
  padding: 20px;
  border-radius: 5px;
  box-sizing:border-box;
  box-shadow:2px 0px 8px rgba(204,204,204,1);
}
.im_card_1{
  background:linear-gradient(-10deg,#00CC66,#33CC99);
}
.im_card_2{
  background:linear-gradient(-10deg,#3399FF,#33CCFF);
}
.im_card_3{
  background:linear-gradient(-10deg,#9966FF,#CC99FF);
}
.im_card_4{
  background:linear-gradient(-10deg,#00CC66,#33CC99);
}
.im_card-title{
  margin: 0;
  font-weight: normal;
  text-align: right;
  color: #FFF;
}
.im_card-value{
  color: #FFF;
  text-align: right;
  font-size: 30px;
  margin: 0;
  margin-top:10px;
}
.im_card-value .fa-icon{
  cursor: pointer;
  margin-right: 10px;
}
.im_card-top_up{
  margin-left: 10px;
}
.im_card-icon{
  width:60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-radius: 100px;
  background-color: rgba(255,255,255,0.2);
  background-position: center center;
  background-repeat: no-repeat;
  color: #FFF;
  text-indent: -969em;
}
.im_card-icon.card_user{
  background-image: url(../assets/card_user.png);
}
.im_card-icon.card_battery{
  background-image: url(../assets/card_battery.png);
}
.im_card-icon.card_day{
  background-image: url(../assets/card_day.png);
}
.im_card-icon.card_ev{
  background-image: url(../assets/card_ev.png);
}
</style>
