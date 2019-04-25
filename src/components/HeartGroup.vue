<template lang="html">
  <div class="component_group eqcalc">
    <el-row>
      <el-col :span="6">
        <h3 class="title">群组列表</h3>
      </el-col>
      <el-col :span="18">
        <div class="table_wrap-search">
          <div class="table_wrap-search_wrap">
            <el-input 
              @input="imSearch()" 
              class="table_wrap-input_serach" 
              placeholder="请输入群组名称" 
              v-model="search" 
              suffix-icon="el-icon-search"
              >
            </el-input>
          </div>
          <el-button @click="resetSearch()" class="table_wrap-btn_reset" type="warning">重置</el-button>
        </div>
      </el-col>
    </el-row>

    <div class="group-list" v-loading="loadingGroupList">
      <el-row :gutter="10">
        <el-col v-for="(item) in group" :span="6" :key="item.id">
          <div class="group_card">
            <div class="group_card-header">
              <el-row>
                <el-col :span="8">
                  <div :class="{group_online:item.type===1,group_offline:item.type===2}"></div>
                </el-col>
                <el-col :span="16">
                  <el-tooltip class="item" effect="dark" placement="top-end">
                    <div slot="content">{{item.name+''}}</div>
                    <h4 class="group_card-title overtext">{{item.name}}</h4>
                  </el-tooltip>
                  <p class="group_type">
                    线<span v-if="item.type===1">上</span><span v-if="item.type===2">下</span>交押金
                  </p>
                </el-col>
              </el-row>
            </div>

            <el-row>
              <el-col :span="12">
                <p>用户数量(个）</p>
              </el-col>
              <el-col :span="12">
                <p class="p_val">{{item.count}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>押金方案(个）</p>
              </el-col>
              <el-col :span="12">
                <p class="p_val">{{item.deposits.length}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <p>套餐方案(种）</p>
              </el-col>
              <el-col :span="12">
                <p class="p_val">{{item.packageList.length}}</p>
              </el-col>
            </el-row>

            <div class="group_card-footer">
              <el-button size="mini" type="default" v-if="item.status===1" @click="groupSet(item)">设置</el-button>
              <el-button size="mini" type="primary" v-if="item.status===1" @click="rrPush(item)">
                查看用户
              </el-button>
              <el-button type="default" style="width:140px"  v-if="item.status===2" plain disabled>待审核</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <a href="javascript:;" @click="groupCreate()">
            <div class="group_card group_card-new">
              <p class="group_card-title"><i class="el-icon-plus"></i> 添加群组</p>
            </div>
          </a>
        </el-col>
      </el-row>
    </div>
    
    <StatusGroupCreate />
    <BaseStatus :msg="msg" />

  </div>
</template>

<script>
import { mapState } from 'vuex';
import FormGroupCreate from './FormGroupCreate.vue';
import StatusGroupCreate from './StatusGroupCreate.vue';
import FormGroupSet from './FormGroupSet.vue';
import BaseStatus from './BaseStatus.vue';

export default {
  name: 'HeartGroup',
  data: function() {
    return {
      search: '',
      isNotSearch: true,
      group: [],
      msg: '群组设置成功',
      groupSetItem: null,
      loadingGroupList: true,
      pageNum: 1
    };
  },
  computed: {
    ...mapState(['agent', 'modalStore'])
  },
  watch: {
    'modalStore.needShop': function(val) {
      if (!val) {
        this.fetchData();
      }
    },
    'modalStore.statusGroupCreate': function(val) {
      if (!val) {
        this.fetchData();
      }
    },
    'modalStore.baseStatus': function(val) {
      if (!val) {
        this.fetchData();
      }
    }
  },
  components: {
    FormGroupCreate,
    StatusGroupCreate,
    FormGroupSet,
    BaseStatus
  },
  methods: {
    fetchData: function() {
      var vueThis = this;
      vueThis.loadingGroupList = true;
      var sendData = {
        pageNum: vueThis.pageNum,
        pageSize: 96900,
        advancedParam: JSON.stringify({
          name: vueThis.search
        })
      };
      vueThis.$rqs(
        vueThis.$yApi.groupList,
        function(objRps) {
          vueThis.loadingGroupList = false;
          vueThis.total = objRps.result.total;
          vueThis.group = objRps.result.list;
        },
        {
          objSendData: sendData
        }
      );
    },
    imSearch: _.debounce(function() {
      this.isNotSearch = false;
      this.fetchData();
    }, 690),
    resetSearch: function() {
      this.search = '';
      this.fetchData();
    },
    groupCreate: function() {
      this.$router.push({
        path: '/groupcreate'
      });
    },
    groupSet: function(item) {
      this.groupSetItem = item;
      this.$store.state.groupSetItem = item;
      this.$router.push({
        path: '/groupset'
      });
    },
    rrPush: function(item) {
      this.$router.push({
        path: '/user/' + item.code + '/' + item.type + '/1'
      });
    }
  }, //methods
  created: function() {
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
.component_group {
  background: #fff;
}
.group-list {
  padding: 15px;
}
.group_card {
  padding: 24px;
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  height: 250px;
  margin-bottom: 15px;
}

.group_card-header {
  margin-bottom: 25px;
}
.group_online,
.group_offline {
  width: 46px;
  height: 46px;
  border-radius: 96px;
}
.group_online {
  background: #fe7e73 url(../assets/online.png) no-repeat center center;
}
.group_offline {
  background: #fe7e73 url(../assets/offline.png) no-repeat center center;
}
.group_card-title {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}
.group_type {
  text-align: right;
  font-weight: 300;
  color: #555;
}
.group_card p {
  font-size: 12px;
  margin: 5px 0;
}
.p_val {
  color: #ff6666;
  font-weight: 600;
  text-align: right;
}
.group_card-new .group_card-title {
  display: block;
  height: 220px;
  line-height: 220px;
  text-align: center;
  font-size: 12px;
  color: #333;
  font-weight: bold;
  margin-left: -10px;
}

.group_card-footer {
  text-align: center;
  margin-top: 20px;
}
.group_card-footer .el-button {
  margin: 0 8px;
}
</style>
