<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      :title="title"
      :visible.sync="modalStore.comboBuy"
      width="300px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formComboBuy">
          
          <el-form-item label="套餐名称" :label-width="formLabelWidth">
            <strong>{{discount_name}}</strong>
          </el-form-item>

          <el-form-item label="数量(个)" :label-width="formLabelWidth">
            <el-input-number v-model="formComboBuy.number" :min="1" :max="9999" @input.native="handleIN"></el-input-number>
          </el-form-item>

          <el-form-item label="金额(元)" :label-width="formLabelWidth">
            <strong class="amount">{{amount.toFixed(2)}}</strong>
          </el-form-item>

          <el-form-item label="支付方式" :label-width="formLabelWidth">
            <el-radio-group v-model="formComboBuy.payType" size="small">
              <el-radio label="1" border>支付宝</el-radio>
              <el-radio label="2" border>微信</el-radio>
            </el-radio-group>
          </el-form-item>


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.comboBuy = false">取 消</el-button>
        <el-button type="primary" @click="modalStore.comboBuy = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'FormComboBuy',
  props:['agentPrice','discountName'],
  data:function(){
    return ({
      title:'',
      discount_name:'',
      formComboBuy:{
        number:1,
        payType:'1'
      },
      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    amount:function(){
      var num=this.formComboBuy.number;
      if(num===undefined){
        num=0;
      }
      return (window.Number(this.agentPrice) * window.Number(num));
    }
  },
  watch:{
    'modalStore.comboBuy':function(val){
      if(val){
        this.title='请输入数量，每份价格 '+this.agentPrice+' 元';
        this.discount_name=this.discountName;
      }
    }
  },
  methods:{
    handleIN:function(ev){
      this.formComboBuy.number=ev.target.value;
    }
  }
};
</script>

<style lang="css" scoped>
  .amount{
    color: #FF6666;
  }
</style>
