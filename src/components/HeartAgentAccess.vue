<template lang="html">
  <div class="table_wrap">
    <el-row>
      <el-col :span="6">
        <h3 class="title">权限管理</h3>
      </el-col>
      <el-col :span="18">
        <div class="table_wrap-search">
          <el-button :disabled="saveDisable" @click="updateAgentOps" class="table_wrap-btn_reset" type="danger">保存</el-button>
        </div>
      </el-col>
    </el-row>
    <el-checkbox class="checkAllClass" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div class="aceessTreeBKClass" v-loading="loadingAccess">
      <el-tree :data="accessTreeData" ref="tree" show-checkbox node-key="id" default-expand-all :default-checked-keys="checkedAccessList" :props="defaultProps" @check-change="handleCheckedAccessChange">
      </el-tree>
    </div>
    <el-row></el-row>
    <BaseStatus :msg="msg" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import BaseStatus from "./BaseStatus.vue";

export default {
  name: "HeartStores",
  components: {
    BaseStatus
  },
  data() {
    return {
      agentId: "",
      msg: "修改权限成功",
      saveDisable: true,
      loadingAccess: true,
      //是否选中了全部
      checkAll: false,
      //选中的权限
      checkedAccessList: [],
      //权限菜单内容
      accessTreeData: [],
      //opsList
      opsList: [],
      //后台返回的数据
      isIndeterminate: true,
      defaultProps: {
        children: "children",
        label: "label"
      },
    };
  },
  methods: {
    handleCheckAllChange: function(val) {
      var vueThis = this;
      if (val) {
        vueThis.checkedAccessList = [];
        vueThis.opsList.forEach(function(element) {
          vueThis.checkedAccessList.push(element.id);
        });
      } else {
        vueThis.$refs.tree.setCheckedKeys([]);
      }
      vueThis.isIndeterminate = false;
      vueThis.saveDisable = false;
    },
    handleCheckedAccessChange: function(value) {
      var vueThis = this;
      //所有叶子节点都被选中 更改全选状态
      var checkedLeaf = vueThis.$refs.tree.getCheckedNodes(true);
      let checkedCount = checkedLeaf.length;
      vueThis.checkAll = checkedCount === vueThis.opsList.length;
      vueThis.isIndeterminate =
        checkedCount > 0 && checkedCount < vueThis.opsList.length;

      //设置checkedAccessList
      vueThis.checkedAccessList = [];
      checkedLeaf.forEach(function(element) {
        vueThis.checkedAccessList.push(element.id);
      });
      vueThis.saveDisable = false;
    },
    setupTreeViewData: function(data) {
      var vueThis = this;
      var treeData = [];
      data.forEach(function(element) {
        var elData = [];
        elData.label = element.name;
        elData.id = element.id;
        if (element.menus && element.menus.length > 0) {
          elData.children = vueThis.setupTreeViewData(element.menus);
        } else if (element.ops && element.ops.length > 0) {
          elData.children = vueThis.setupTreeViewData(element.ops);
          vueThis.opsList = vueThis.opsList.concat(elData.children);
        }
        if (element.isOwn) {
          vueThis.checkedAccessList.push(element.id);
        }
        treeData.push(elData);
      });
      return treeData;
    },
    fetchData: function() {
      var vueThis = this;
      vueThis.loadingAccess = true;
      var sendData = {
        agentId: vueThis.agentId
      };
      vueThis.$rqs(
        vueThis.$yApi.agentAccessList,
        function(objRps) {
          vueThis.loadingAccess = false;
          vueThis.accessTreeData = vueThis.setupTreeViewData(
            objRps.result.list
          );
        }, {
          objSendData: sendData
        }
      );
    },
    updateAgentOps: function() {
      var vueThis = this;
      var sendData = {
        ops: vueThis.checkedAccessList
      };
      console.log(sendData);
      var reqUrl = vueThis.stringFormat(
        vueThis.$yApi.updateAgentStores,
        vueThis.agentId
      );
      vueThis.$rqs(
        reqUrl,
        function(objRps) {
          vueThis.$store.commit("showBaseStatus");
        }, {
          objSendData: sendData
        }
      );
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
  created: function(){
  //如果是总代
  if (window.localStorage.agenttype == 1) {
     //初始化搜索
     this.agentId = this.$route.params.agentId;
     this.fetchData();
   } else {
    this.$router.push("/");
    this.$store.commit('showLogin');
  }
}
};

</script>
<style>
.checkAllClass {
  margin-left: 15px;
}

.aceessTreeBKClass {
  margin: 15px;
}

</style>
