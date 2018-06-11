<template lang="html">
  <div class="component_combo eqcalc">
    <h3 class="title with_sub">
      套餐管理
      <p>
        在此页面查看拥有的套餐，分配套餐给用户时会消耗套餐的数量，数量可购买。
        <a href="javascript:;">购买记录</a>
      </p>
    </h3>
    <div class="combo_list">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="combo_card">
            <h4>欢电套餐</h4>
            <p class="combo_card_info">
              <span>有效期30天</span>
              <span>
                <strong>199</strong>
                元/份
              </span>
            </p>
            <p class="combo_card_buy">
              <span>
                剩余
                <strong>69</strong>
                份
              </span>
              <span>
                <el-button type="primary" size="mini">购买</el-button>
              </span>
            </p>
            <span class="mark_triangle">
              <!-- 亦可以用矩形傾斜實現 -->
            </span>
            <mark>无限次</mark>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartGroup',
  data:function(){
    return ({

    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
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
  }
  .combo_card{
    background: white;
    position: relative;
    box-shadow: #0000001a 0px 0px 1px 1px;
    padding:16px 24px;
    border-radius: 5px;
    overflow: hidden;
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