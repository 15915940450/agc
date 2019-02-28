<template>
  <el-dialog
    title="请选择管理网点的代理"
    :visible.sync="modalStore.setStoresAgent"
    :width="dialogWidth"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form>
      <el-form-item label="代理名称" :label-width="formLabelWidth">
        <el-select
          class="selectWidth"
          v-model="agentId"
          placeholder="请输入代理商名称的关键字"
          @change="selectChanged"
          filterable
          clearable
        >
          <el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-dialog
      :width="dialogWidth"
      :show-close="false"
      :close-on-click-modal="false"
      title="提示"
      :visible.sync="innerVisible"
      append-to-body
    >
      <span>确定修改吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAction">取消</el-button>
        <el-button type="primary" @click="updateConfirmAction">确定</el-button>
      </span>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelAction">取 消</el-button>
      <el-button type="primary" @click="selectConfirmAction" :disabled="confirmDisable">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FormSetAgent",
  props: {
    storesId: String
  },
  data() {
    return {
      innerVisible: false,
      confirmDisable: true,
      agentList: [],
      agentId: "",
      formLabelWidth: "75px",
      dialogWidth: "460px"
    };
  },
  computed: {
    ...mapState(["modalStore"])
  },
  methods: {
    fetchData: function() {
      var vueThis = this;
      vueThis.loadingAgent = true;
      //判断search参数，如果为手机号，设置为phone参数，其它为name参数
      var sendData = {
        type: 1,
        pageNum: 1,
        pageSize: 10000
      };
      vueThis.$rqs(
        vueThis.$yApi.subAgentStoresList,
        function(objRps) {
          vueThis.agentList = objRps.result.list;
        },
        {
          objSendData: sendData
        }
      );
    },
    setStoresAgent: function() {
      var vueThis = this;
      var agentId = vueThis.agentId + "";
      if (agentId.length > 0) {
        var sendData = {
          parentId: agentId
        };
        console.log(sendData);
        var reqUrl = vueThis.stringFormat(
          vueThis.$yApi.updateAgentStores,
          vueThis.storesId
        );
        vueThis.$rqs(
          reqUrl,
          function(objRps) {
            console.log(objRps);
            vueThis.$store.commit("showBaseStatus");
          },
          {
            objSendData: sendData
          }
        );
      }
    },
    cancelAction: function() {
      this.innerVisible = false;
      this.$store.commit("hideSetStoresAgent");
    },
    selectConfirmAction: function() {
      this.$store.commit("hideSetStoresAgent");
      this.innerVisible = true;
    },
    updateConfirmAction: function() {
      this.setStoresAgent();
      this.innerVisible = false;
      this.agentId = "";
    },
    selectChanged: function() {
      var agentId = this.agentId + "";
      if (agentId.length > 0) {
        this.confirmDisable = false;
      } else {
        this.confirmDisable = true;
      }
    },
    stringFormat: function() {
      if (arguments.length == 0) return null;
      var str = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        str = str.replace(re, arguments[i]);
      }
      return str;
    }
  },
  created: function() {
    this.fetchData();
  }
};
</script>

<style>
.selectWidth {
  width: 210px;
}
</style>
