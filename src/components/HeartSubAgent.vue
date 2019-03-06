<template>
  <div>
    <div>
      <!-- table wrap -->
      <div class="table_wrap" v-if="(agentList.length || !isNotSearch || loadingAgent)">
        <el-row>
          <el-col :span="6">
            <h3 class="title">代理商列表</h3>
          </el-col>
          <el-col :span="18">
            <div class="table_wrap-search">
              <div class="table_wrap-search_wrap">
                <el-input @input="imSearch()" class="table_wrap-input_serach" placeholder="请输入手机号或姓名搜索" v-model="search" suffix-icon="el-icon-search"></el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <div v-loading="loadingAgent">
          <!-- 中控表格 -->
          <div class="table_wrap_real">
            <el-table :data="agentList" size="medium" stripe style="width: 100%" class="table_wrap-table">
              <el-table-column label="ID" width="100" prop="id"></el-table-column>
              <el-table-column label="代理人" prop="name"></el-table-column>
              <el-table-column label="手机号" prop="phone"></el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="accessMangerAction(scope)">权限</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="table_wrap_pagination" v-show="total">
            <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum" @current-change="handleCurrentChange">
              <!-- 分页 -->
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- </transition> -->
    <!-- 没有中控 -->
    <div class="empty_evs im_empty_wrap eqcalc" v-if="(!agentList.length && isNotSearch && !loadingAgent)">
      <h3 class="title">代理商管理</h3>
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/no_subagent.png" alt="还没有下级代理商">
        <p class="im_empty_p">您还没有下级代理商哦！</p>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapState
} from "vuex";

export default {
  name: "HeartSubAgent",
  data: function() {
    return {
      total: 1,
      search: "", //搜索用的
      isNotSearch: true,
      agentList: [],
      loadingAgent: true,
      msg: "",
      pageNum: window.Number(this.$route.params.pn) ?
        window.Number(this.$route.params.pn) : 1
    };
  },
  computed: {
    ...mapState(["agent", "modalStore"])
  },
  watch: {
    pageNum: function() {
      this.fetchData();
    },
    "modalStore.needLogin": function(val) {
      if (!val) {
        this.fetchData();
      }
    }
  },
  methods: {
    handleCurrentChange: function(val) {
      this.pageNum = val;
      this.$router.push("/general/" + val);
    },
    accessMangerAction: function(scope) {
      console.log(scope.row.id);
      this.$router.push({
        path: "/general/access/" + scope.row.id
      });
    },
    imSearch: _.debounce(function() {
      this.isNotSearch = false;
      this.pageNum = 1;
      this.$router.push("/general/1");
      this.fetchData();
    }, 690),
    fetchData: function() {
      var vueThis = this;
      vueThis.loadingAgent = true;
      //判断search参数，如果为手机号，设置为phone参数，其它为name参数
      var sendData;
      if (/^1[0-9]{10}$/.test(vueThis.search)) {
        sendData = {
          phone: vueThis.search,
          type: 1,
          pageNum: vueThis.pageNum,
          pageSize: vueThis.$yApi.defaultPS
        };
      } else {
        sendData = {
          name: vueThis.search,
          type: 1,
          pageNum: vueThis.pageNum,
          pageSize: vueThis.$yApi.defaultPS
        };
      }
      vueThis.$rqs(
        vueThis.$yApi.subAgentStoresList,
        function(objRps) {
          vueThis.loadingAgent = false;
          vueThis.total = objRps.result.total;
          vueThis.agentList = objRps.result.list;
        }, {
          objSendData: sendData
        }
      );
    }
  },
  created: function() {
    //初始化搜索
    this.search = "";
    this.fetchData();
  }
};

</script>
<style>
</style>
