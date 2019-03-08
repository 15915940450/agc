<template>
  <div class="table_wrap">
    <div v-loading="loading">
      <div class="table_wrap_real">
        <el-table
          :data="log"
          size="medium"
          stripe
          class="table_wrap-table"
          width="100%"
          >


          <el-table-column
            label="ID"
            prop="id"
            width="90"
            >
          </el-table-column>
          <el-table-column
            label="申请时间"
            prop="createTime"
            >
          </el-table-column>
          <el-table-column
            label="业务类型"
            prop="payType"
            >
          </el-table-column>
          <el-table-column
            label="申请金额(元)"
            prop="amount"
            >
          </el-table-column>
          <el-table-column
            label="状态"
            >
            <template slot-scope="scope">
              <span 
                :class="scope.row.checkStatus | statusNum"
                >
                {{scope.row.checkStatus | statusZh}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
              <el-button type="text" @click="toDetail(scope.row.id)">查看</el-button>
            </template>

            
          </el-table-column>
        </el-table>

      </div>

      <div class="table_wrap_pagination" v-show="total">
        <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pn" @current-change="handleCurrentChange">
          <!-- 分页 -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'TableBigAmountHistory',
  props:['log','loading','pn','total'],
  data:function(){
    return ({
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  filters:{
    statusZh:function(v){
      return (['待审核','同意','拒绝'][v]);
    },
    statusNum:function(v){
      return ('status'+v);
    }
  },
  watch:{
    'modalStore.needShop':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  methods:{
    toDetail:function(id){
      this.$router.push({
        path:'/bigamount/'+id
      });
    },
    handleCurrentChange:function(val){
      this.$emit('son-page-num-change',val);
    }
  },
  created:function(){
  }
};
</script>

<style lang="css" scoped>
.status0{
}
.status1{
  color:#41b883;
}
.status2{
  color:#fb654c;
}
</style>
