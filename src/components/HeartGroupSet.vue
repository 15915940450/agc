<template lang="html">
   <div class="component_group eqcalc">
    <el-row>
      <el-col :span="6">
        <h3 class="title">群组设置</h3>
      </el-col>
    </el-row>
    <div class="component_groupContent" v-loading="loadingtaocan||loadingyajin">
        <el-row class="titleDiv"  type="flex" justify="space-between">
          <el-col :span="6">
            <h4 class="basicTitleFont ">基础信息</h4>
          </el-col>
          <el-col  :span="1.4">
            <el-button type="primary" v-show="saveBasicInfo"  @click="saveBasicInfoAction('formGroupSet')">保存</el-button>
          </el-col>
        </el-row>
        <el-form :model="formGroupSet" :rules="rules" ref="formGroupSet" v-if="formGroupSet">
          <div class="formBasicInfoContent">
            <el-form-item prop="name" label="群组名称" :label-width="formLabelWidth">
              <el-input v-show="nameEdit" v-model="formGroupSet.name" auto-complete="off" placeholder="限字母、数字、汉字、符号，不超过10个字"  :style="{'width': formInputWidth}">
              </el-input>
              <span v-show="!nameEdit">{{formGroupSet.name}}</span>
              <i v-show="!nameEdit && formGroupSet.edit==0" class="el-icon-edit" @click="nameEditAction"></i>
            </el-form-item>
            <el-form-item prop="userType" label="账号类型" :label-width="formLabelWidth">
              {{formGroupSet.userType===1?'普通账号':'亲情账号'}}
            </el-form-item>
            <el-form-item v-if="formGroupSet.userType==2" prop="subAccountNumber" :label-width="formLabelWidth">
              <span v-show="subAccountNumberEdit">
                每个账号可绑定&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input-number v-model="formGroupSet.subAccountNumber" :min="1" :max="100" style="width: 80px;" size="mini" :controls="false"></el-input-number>
                &nbsp;&nbsp;&nbsp;&nbsp;个子账号
              </span>
              <span v-show="!subAccountNumberEdit">{{'每个账号可绑定' + formGroupSet.subAccountNumber + '个子账号'}}</span>
              <i v-show="!subAccountNumberEdit && formGroupSet.edit==0" class="el-icon-edit" @click="subAccountNumberEditAction"></i>
            </el-form-item>
            <el-form-item label="群组类型" :label-width="formLabelWidth">{{formGroupSet.canRefund?'线上交押金':'线下交押金'}}</el-form-item>
            <el-form-item label="选择城市" :label-width="formLabelWidth">{{formGroupSet.cityName}}</el-form-item>
            <el-form-item prop="freeday" label="免费天数" :label-width="formLabelWidth">新用户自动免费
              <el-input-number v-model="formGroupSet.freeDay" size="mini" :min="0" :max="100" @change="freeDayChangedAction"></el-input-number>
              天
            </el-form-item>
            <el-form-item prop="freeday" label="可借电池" :label-width="formLabelWidth">{{formGroupSet.limitBatteryNum}}颗</el-form-item>
          </div> 
          <el-row class="titleDiv" type="flex" justify="space-between">
            <el-col :span="18">
              <span class="basicTitleFont">押金方案</span>
              <span class="basicTextFont" style="margin-left:20px">选择要在该群组应用的押金</span>
            </el-col>
            <el-col  :span="1.4">
              <el-button type="primary" v-show="saveDeposit" @click="saveDepositScheme('formGroupSet')">保存</el-button>
            </el-col>
          </el-row>
          <el-form-item>
            <el-table
            ref="depositTable"
            :data="yajin"
            tooltip-effect="dark"
            style="width: 100%"
            max-height=300
            @selection-change="handleYajinSelectionChange"
            @select="handleDepositSelectChange"
            @select-all="handleDepositSelectAllChange">
            <el-table-column
            type="selection"
            :selectable="canSelect"
            width="60">
            </el-table-column>
            <el-table-column
            prop="id"
            label="ID"
            width="60">
            </el-table-column>
            <el-table-column
            prop="name"
            label="名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="deposit"
            label="金额">
            </el-table-column>
            <el-table-column
            prop="num"
            label="电池数量">
             </el-table-column>
           </el-table>
          </el-form-item>
          <el-row class="titleDiv" type="flex" justify="space-between">
            <el-col :span="18">
              <span class="basicTitleFont">套餐方案</span>
              <span class="basicTextFont" style="margin-left:20px">选择要在该群组应用的套餐</span>
            </el-col>
            <el-col  :span="1.4">
              <el-button type="primary" v-show="savePackage" @click="savePackagesScheme('formGroupSet')">保存</el-button>
            </el-col>
          </el-row>
          <el-form-item>
            <el-table
            ref="packagesTable"
            :data="taocan"
            tooltip-effect="dark"
            style="width: 100%"
            max-height=300
            @selection-change="handleTaocanSelectionChange"
            @select="handlePackagesSelectChange"
            @select-all="handlePackagesSelectAllChange">
            <el-table-column
            type="selection"
            :selectable="canSelect"
            width="60">
            </el-table-column>
            <el-table-column
            prop="id"
            label="套餐ID"
            width="60">
            </el-table-column>
            <el-table-column
            prop="name"
            label="套餐名称"
            width="120">
            </el-table-column>
            <el-table-column
            prop="type"
            label="套餐类型">
            </el-table-column>
            <el-table-column
            prop="limitTimes"
            label="换电颗数">
             </el-table-column>
            <el-table-column
            prop="agentPrice"
            label="代理商价格">
             </el-table-column>
            <el-table-column
            prop="price"
            label="用户价格">
             </el-table-column>
            <el-table-column
            prop="duration"
            label="有效天数">
             </el-table-column>
            <el-table-column
            prop="count"
            label="可叠加">
             </el-table-column>
            <el-table-column
            prop="remark"
            label="套餐说明">
             </el-table-column>
           </el-table>
          </el-form-item>
				</el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleBackGroup" >返回群组列表</el-button>
        </span>
        <div class="bottomDiv"></div>
      </div>
      <BaseStatus :msg="msg" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import BaseStatus from './BaseStatus.vue';

export default {
  name: 'HeartGroupSet',
  components: {
    BaseStatus
  },
  data: function() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: '群组名称不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^.{1,20}$/,
            message: '必须是1到20个汉字，字母，数字或符号组合',
            trigger: 'blur'
          }
        ],
        subAccountNumber: [
          {
            required: true,
            message: '请输入子账号个数',
            trigger: 'change'
          }
        ],
        freeDay: [
          {
            required: true,
            message: '请输入',
            trigger: 'blur'
          },
          {
            type: 'integer',
            message: '请输入一个整数',
            trigger: 'blur'
          }
        ],
        depositScheme: [
          {
            required: true,
            message: '请选择一个或多个押金方案',
            trigger: 'change'
          }
        ],
        packageScheme: [
          {
            required: true,
            message: '请选择一个或多个套餐方案',
            trigger: 'change'
          }
        ]
      },
      formGroupSet: {
        status: 0
      },
      loadingtaocan: true,
      loadingyajin: true,
      loadingcities: true,
      yajin: [],
      taocan: [],
      userTypeString: '',
      cityName: '',
      nameEdit: false,
      subAccountNumberEdit: false,
      freedayEdit: false,
      saveBasicInfo: false,
      saveDeposit: false,
      savePackage: false,
      formLabelWidth: '90px',
      formInputWidth: '440px',
      msg: '群组设置成功'
    };
  },
  computed: {
    ...mapState(['modalStore']),
    computedFreeDay: function() {
      var computedFreeDay = 0;
      if (this.formGroupSet.freeDayEnable === true) {
        computedFreeDay = this.formGroupSet.freeDay;
      }
      return computedFreeDay;
    }
  },
  methods: {
    fetchYajinOrTaocan: function(type) {
      var vueThis = this;
      var advancedParam = JSON.stringify({
        groupCode: null
      });
      var sendData = {
        advancedParam: advancedParam,
        pageNum: 1,
        pageSize: 969
      };
      vueThis.$rqs(
        vueThis.$yApi[type],
        function(objRps) {
          if (type === 'depositListScheme') {
            vueThis.yajin = objRps.result.list;
            vueThis.loadingyajin = false;
            vueThis.yajin.forEach(function(element, index) {
              vueThis.formGroupSet.depositScheme.forEach(function(el) {
                if (element.code === el) {
                  setTimeout(() => {
                    vueThis.$refs.depositTable.toggleRowSelection(
                      vueThis.yajin[index],
                      true
                    );
                  }, 300);
                }
              });
            });
          }
          if (type === 'packageListScheme') {
            vueThis.taocan = objRps.result.list;
            vueThis.loadingtaocan = false;
            vueThis.taocan.forEach(function(element, index) {
              vueThis.formGroupSet.packageScheme.forEach(function(el) {
                if (element.code === el) {
                  setTimeout(() => {
                    vueThis.$refs.packagesTable.toggleRowSelection(
                      vueThis.taocan[index],
                      true
                    );
                  }, 300);
                }
              });
            });
          }
        },
        {
          objSendData: sendData,
          reviver: function(k, v) {
            if (v.duration !== undefined) {
              var dORe = v.duration + '天';
              if (+v.count >= 20000) {
                v.count = '无限';
              }
              if (v.duration === '' || v.duration === '─') {
                dORe = v.expirationDate && v.expirationDate.replace(/-/gi, '');
              }
              v.neroTaocan = `${v.name} / ${
                ['月套卡', '次套卡', '免费套餐'][v.type]
              } / ¥${v.price} / ${v.count}次 / ${dORe}`;
              return v;
            }
          }
        }
      );
    },
    canSelect: function() {
      if (this.formGroupSet.edit === 0) {
        return true;
      }
      return false;
    },
    handleBackGroup: function() {
      this.$router.push({
        path: '/group'
      });
    },
    handleYajinSelectionChange: function(val) {
      var depositScheme = [];
      val.forEach(function(element) {
        depositScheme.push(element.code);
      });
      this.formGroupSet.depositScheme = depositScheme;
    },
    handleDepositSelectChange: function() {
      this.saveDeposit = true;
    },
    handleDepositSelectAllChange: function() {
      if (this.formGroupSet.edit === 0) {
        this.saveDeposit = true;
      }
    },
    handleTaocanSelectionChange: function(val) {
      var packageScheme = [];
      val.forEach(function(element) {
        packageScheme.push(element.code);
      });
      this.formGroupSet.packageScheme = packageScheme;
    },
    handlePackagesSelectChange: function() {
      this.savePackage = true;
    },
    handlePackagesSelectAllChange: function() {
      if (this.formGroupSet.edit === 0) {
        this.savePackage = true;
      }
    },
    nameEditAction: function() {
      this.nameEdit = true;
      this.saveBasicInfo = true;
    },
    subAccountNumberEditAction: function() {
      this.subAccountNumberEdit = true;
      this.saveBasicInfo = true;
    },
    freeDayChangedAction: function() {
      this.saveBasicInfo = true;
    },
    saveBasicInfoAction: function(refName) {
      var vueThis = this;
      vueThis.$refs[refName].validate(valid => {
        if (valid) {
          var sendData = {
            groupCode: vueThis.formGroupSet.code,
            name: vueThis.formGroupSet.name,
            freeDay: vueThis.computedFreeDay,
            subAccountNumber: vueThis.formGroupSet.subAccountNumber
          };
          vueThis.loading = true;
          vueThis.$rqs(
            vueThis.$yApi.groupSet,
            function() {
              vueThis.$store.commit('showBaseStatus');
              vueThis.nameEdit = false;
              vueThis.subAccountNumberEdit = false;
              vueThis.saveBasicInfo = false;
            },
            {
              objSendData: sendData
            }
          );
        }
      });
    },
    saveDepositScheme: function(refName) {
      var vueThis = this;
      vueThis.$refs[refName].validate(valid => {
        if (valid) {
          var sendData = {
            groupCode: vueThis.formGroupSet.code,
            depositScheme: vueThis.formGroupSet.depositScheme
          };
          vueThis.loading = true;
          vueThis.$rqs(
            vueThis.$yApi.groupSet,
            function() {
              vueThis.$store.commit('showBaseStatus');
              vueThis.nameEdit = false;
              vueThis.subAccountNumberEdit = false;
              vueThis.saveBasicInfo = false;
            },
            {
              objSendData: sendData
            }
          );
        }
      });
    },
    savePackagesScheme: function(refName) {
      var vueThis = this;
      vueThis.$refs[refName].validate(valid => {
        if (valid) {
          var sendData = {
            groupCode: vueThis.formGroupSet.code,
            packageScheme: vueThis.formGroupSet.packageScheme
          };
          vueThis.loading = true;
          vueThis.$rqs(
            vueThis.$yApi.groupSet,
            function() {
              vueThis.$store.commit('showBaseStatus');
              vueThis.nameEdit = false;
              vueThis.subAccountNumberEdit = false;
              vueThis.saveBasicInfo = false;
            },
            {
              objSendData: sendData
            }
          );
        }
      });
    }
  }, //methods
  created: function() {
    this.formGroupSet = this.$store.state.groupSetItem;
    if(this.formGroupSet){
      this.formGroupSet.status = 1;
      this.formGroupSet.limitBatteryNum = 2;
      this.formGroupSet.depositScheme = this.formGroupSet.deposits
        ? this.formGroupSet.deposits.map(function(v) {
          return window.Number(v);
        })
        : [];
      this.formGroupSet.packageScheme = this.formGroupSet.packageList
        ? this.formGroupSet.packageList.map(function(v) {
          return window.Number(v.code);
        })
        : [];
      this.fetchYajinOrTaocan('depositListScheme');
      this.fetchYajinOrTaocan('packageListScheme');
    }
    else{
      this.$router.push({
        path: '/group'
      });
    }
  }
};
</script>

<style lang="css" scoped>
.component_groupContent {
  margin: 10px 30px;
}

.titleDiv {
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
}
.basicTitleFont {
  font-size: 16px;
  font-weight: 400;
  color: #333;
}

.basicTextFont {
  font-size: 14px;
  font-weight: 400;
  color: #999;
}

.formBasicInfoContent {
  margin: 10px 10px;
}

.footer {
  height: 60px;
  align-content: center;
}

.component_group {
  background: #fff;
}

.bottomDiv {
  height: 20px;
}
</style>
