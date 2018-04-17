<template lang="html">
  <el-form ref="form" :model="dataTopUp" label-width="90px" size="mini">
    <el-form-item>
      <h4>请输入数量，每个虚拟电池退还押金 <span>999.00</span>元</h4>
    </el-form-item>

    <!-- 数量 -->
    <el-form-item label="数量（个）">
      <el-input v-model="dataTopUp.name"></el-input>
    </el-form-item>

    <el-form-item label="金额(元)">
      {{dataTopUp.amount}}
    </el-form-item>
    <el-form-item label="支付方式">
      <el-radio-group v-model="dataTopUp.payType" size="">
        <el-radio border label="1">支付宝</el-radio>
        <el-radio border label="2">微信</el-radio>
      </el-radio-group>
    </el-form-item>


    <el-form-item size="">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'FormTopUp',
  data:function(){
    return ({
      dataTopUp: {
        name: '',
        amount:9099,
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        payType: '2',
        desc: ''
      }

    });
  },
  methods:{
    onSubmit() {
      console.log('submit!');
    }
  }
};
</script>

<style lang="css" scoped>
</style>
