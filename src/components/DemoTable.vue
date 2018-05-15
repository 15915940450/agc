<template lang="html">
  <div class="table_wrap">
    <el-row>
      <el-col :span="6">
        <h3 class="title">用户列表</h3>
      </el-col>
      <el-col :span="18">
        <div class="table_wrap-search">
          <div class="table_wrap-search_wrap">
            <el-input class="table_wrap-input_serach" placeholder="请输入手机号" v-model="searchPhone" suffix-icon="el-icon-search"></el-input>
          </div>
          <el-button class="table_wrap-btn_reset" type="warning">重置</el-button>
          <el-button class="table_wrap-btn_new" type="primary" @click="showNewUser()">新建</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 用户列表表格 -->
    <el-table
      :data="tableData5" size="medium" stripe
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
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="#"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
      <el-table-column label="操作" width="90">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small">
            唤醒
          </el-button>
          <el-button
            type="text"
            size="small">
            熄火
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" class="table_wrap-pagination" @current-change="handleCurrentChange">
      <!-- 分页 -->
    </el-pagination>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'DemoTable',
  data:function(){
    return {
      center:'center',
      total:100,
      searchPhone:'',
      tableData5: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }],
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
    };
  },
  methods:{
    showNewUser:function(){
      this.$store.commit('showNewUser');
    },
    handleCurrentChange:function(val){
      this.pageNum=val;
      // console.log(this.$route.params.groupcode);
      this.$router.push('/thilina/'+val);
    }
  }
};
</script>

<style lang="css" scoped>

</style>
