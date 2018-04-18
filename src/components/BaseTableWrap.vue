<template lang="html">
  <div class="table_wrap">
    <el-row>
      <el-col :span="6">
        <h3 class="title">用户列表</h3>
      </el-col>
      <el-col :span="18">
        <div class="table_wrap-search">
          <div class="table_wrap-search_wrap">
            <el-input size="small" class="table_wrap-input_serach" placeholder="请输入手机号" v-model="searchPhone" suffix-icon="el-icon-search"></el-input>
            <!-- <el-button size="small" type="primary" class="table_wrap-btn_search">搜索</el-button> -->
          </div>
          <el-button size="small" class="table_wrap-btn_reset" type="warning">重置</el-button>
          <el-button size="small" class="table_wrap-btn_new" type="primary">新建</el-button>
        </div>
      </el-col>
    </el-row>
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
    <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="93" class="table_wrap-pagination">

    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'BaseTableWrap',
  data:function(){
    return {
      center:'center',
      searchPhone:'',
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
  }
};
</script>

<style lang="css" scoped>

/* .table_wrap-search > *{
  border-radius: 0;
} */
</style>
