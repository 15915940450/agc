<template lang="html">
  <div class="component_deposit">
    <el-row :gutter="10">

      <!-- 押金 -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
                押金
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                我的押金(元)
                <a href="javascript:;" v-popover:top_up class="im_card-top_up">充值</a>
                <el-popover
                  ref="top_up"
                  placement="bottom"
                  width="400"
                  trigger="click">
                  <!-- 表单 -->
                  <FormTopUp />

                </el-popover>
              </h3>
              <p class="im_card-value">
                <icon name="eye-slash" scale="1.3"></icon>
                7988
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 可退押金 -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
                可退押金
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                可退押金(元)
                <a href="javascript:;" class="im_card-top_up">退款</a>
              </h3>
              <p class="im_card-value">
                <icon name="eye-slash" scale="1.3"></icon>
                90
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 可用电池数(个) -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
                可用电池数
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                可用电池数(个)
              </h3>
              <p class="im_card-value">
                22988
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 已用电池数(个) -->
      <el-col :span="6">
        <div class="im_card">
          <el-row>
            <el-col :span="10">
              <div class="im_card-icon">
              已用电池数
              </div>
            </el-col>
            <el-col :span="14">
              <h3 class="im_card-title">
                已用电池数(个)
              </h3>
              <p class="im_card-value">
                3000
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>

    </el-row>

    <div class="table_wrap">
      <h3 class="table_wrap-title">押金记录</h3>
      <!-- 押金记录表格 -->
      <el-table
        :data="tableData5" stripe
        style="width: 100%" class="table_wrap-table">
        <!-- 展开行 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="im-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品 ID"
          prop="id">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination :background="true" layout="->,jumper,prev,pager,next,total" :total="93" class="table_wrap-pagination">

      </el-pagination>
    </div>
  </div>
</template>

<script>
import FormTopUp from './FormTopUp.vue';

export default {
  name:'CDeposit',
  data() {
    return {
      center:'center',
      tableData5: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    };
  },
  components:{
    FormTopUp
  },
  methods: {

  }
};
</script>

<style lang="css" scoped>
.im_card{
  background: #FFF;
  font-size: 12px;
  max-height: 100px;
  height: 100px;
  padding: 20px;
  border-radius: 5px;
  box-sizing:border-box;
  box-shadow:2px 0px 8px rgba(204,204,204,1)
}
.im_card-title{
  margin: 0;
  font-weight: normal;
  text-align: right;
}
.im_card-value{
  text-align: right;
  font-size: 30px;
  color: #333;
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
  box-shadow:4px 8px 20px rgba(102,255,204,1);
  background: #66FFCC;
  background: linear-gradient(-10deg, #00CC66, #66FFCC);
  color: #FFF;
}

/* table */
.im-table-expand {
  font-size: 0;
}
.im-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.im-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table_wrap{
  background: #FFF;
  margin-top: 10px;
}
.table_wrap-title{
  font-size: 14px;
  color: #000;
  font-weight: 500;
  line-height: 50px;
  height: 50px;
  padding: 0 20px;
  margin: 0;
}
.table_wrap-pagination{
  padding-top:20px;
  padding-bottom:20px;
}

</style>
