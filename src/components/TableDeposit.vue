<template>
  <div class="table_wrap">
    <h3 class="title">
      <div class="tab_wrap">
        <template>
          <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
            <el-tab-pane label="押金记录" name="deposit">
            </el-tab-pane>
            <el-tab-pane label="分配记录" name="depositlog">
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <div class="time_range">
        <el-date-picker
          v-model="se"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          >
        </el-date-picker>
      </div>
    </h3>
    <div v-loading="loadingDepositList">
      <!-- 押金记录表格 -->
      <div class="table_wrap_real">
        <el-table
          :data="deposit" stripe
          style="width: 100%" class="table_wrap-table" size="medium">
          <!-- medium / small / mini -->
          <el-table-column
            label="ID"
            prop="tradeId"
            width="190"
            >
          </el-table-column>
            <el-table-column
              label="时间"
              width="170"
              >
              <template slot-scope="scope">
                <span v-html="scope.row.createTime"></span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              prop="type" :formatter="formatter">
            </el-table-column>
            <el-table-column
              label="金额(元)"
              prop="amount">
            </el-table-column>
            <el-table-column
              label="数量(个)"
              prop="batteryNum">
            </el-table-column>
            <el-table-column
              label="状态"
              prop="status" :formatter="formatter">
            </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="table_wrap_pagination">
        <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'TableDeposit',
  data(){
    return ({});
  }
};
</script>
