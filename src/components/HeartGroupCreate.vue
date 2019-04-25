/* eslint-disable no-mixed-spaces-and-tabs */
<template lang="html">
  <div class="component_group eqcalc">
    <el-row>
      <el-col :span="6">
        <h3 class="title">群组创建</h3>
      </el-col>
    </el-row>
    <div class="component_groupContent" v-loading="loadingcities||loadinggrouptype||loadingtaocan||loadingyajin">
        <h4 class="basicTitleFont titleDiv">基础信息</h4>
				<el-form :model="formGroupCreate" :rules="rules" ref="formGroupCreate">
          <div class="formBasicInfoContent">
            <el-form-item prop="name" label="群组名称" :label-width="formLabelWidth">
              <el-input v-model="formGroupCreate.name" auto-complete="off" placeholder="限字母、数字、汉字、符号，不超过20个字"  :style="{'width': formInputWidth}"></el-input>
            </el-form-item>
					<el-form-item prop="userType" label="账号类型" :label-width="formLabelWidth">
              <el-radio  v-if="groupUserType!==2" v-model="formGroupCreate.userType" label="1"  el-select>普通账号</el-radio>
              <el-radio  v-if="groupUserType!==1" v-model="formGroupCreate.userType" label="2">亲情账号</el-radio>
					</el-form-item>
					<el-form-item v-if="formGroupCreate.userType==2" prop="subAccountNumber" :label-width="formLabelWidth">
						每个账号可绑定&nbsp;&nbsp;&nbsp;&nbsp;
						<el-input-number v-model="formGroupCreate.subAccountNumber" :min="1" :max="100" style="width: 80px;" size="mini" :controls="false">
						</el-input-number>
						&nbsp;&nbsp;&nbsp;&nbsp;个子账号
					</el-form-item>
					<el-form-item prop="canRefund" label="群组类型" :label-width="formLabelWidth">
              <el-radio v-model="formGroupCreate.canRefund" v-if="grouptype!==0" label="1">线上交押金</el-radio>
              <el-radio v-model="formGroupCreate.canRefund" v-if="grouptype!==1" label="0">线下交押金</el-radio>
					</el-form-item>
					<el-form-item prop="cityCode" label="选择城市" :label-width="formLabelWidth">
						<el-select v-model="formGroupCreate.cityCode" placeholder="请选择"  :style="{'width': formInputWidth}">
							<el-option v-for="item in options_cityListScheme" :key="item.cityCode" :label="item.name" :value="item.cityCode">
							</el-option>
						</el-select>
					</el-form-item>
          <el-form-item prop="freeday" label="免费天数" :label-width="formLabelWidth">
            新用户自动免费
						<el-input-number v-model="formGroupCreate.freeDay" size="mini" :min="0" :max="100">
						</el-input-number>
						天
					</el-form-item>
          <el-form-item prop="freeday" label="可借电池" :label-width="formLabelWidth">
						<el-input-number v-model="formGroupCreate.limitBatteryNum" size="mini" :min="0" :max="10000">
						</el-input-number>
						颗
					</el-form-item>
          </div> 
          <h4 class="titleDiv">
            <span class="basicTitleFont">押金方案</span>
            <span class="basicTextFont" style="margin-left:20px">选择要在该群组应用的押金</span>
          </h4>
          <el-form-item>
            <el-table
            ref="multipleTable"
            :data="yajin"
            tooltip-effect="dark"
            style="width: 100%"
            max-height=300
            @selection-change="handleYajinSelectionChange">
            <el-table-column
            type="selection"
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
          <h4 class="titleDiv">
            <span class="basicTitleFont">套餐方案</span>
            <span class="basicTextFont" style="margin-left:20px">选择要在该群组应用的套餐</span>
          </h4>
          <el-form-item>
            <el-table
            ref="multipleTable"
            :data="taocan"
            tooltip-effect="dark"
            style="width: 100%"
            max-height=300
            @selection-change="handleTaocanSelectionChange">
            <el-table-column
            type="selection"
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
        <span slot="footer" class="dialog-footer"  >
          <el-button type="primary" @click="handleComfirm('formGroupCreate')" >确 定</el-button>
        </span>
        <div class="bottomDiv"></div>
			</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BaseStatus from './BaseStatus.vue';

export default {
  name: 'HeartGroupCreate',
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
        cityCode: [
          {
            required: true,
            message: '请选择城市',
            trigger: 'change'
          }
        ],
        canRefund: [
          {
            required: true,
            message: '请选择群组类型',
            trigger: 'change'
          }
        ],
        userType: [
          {
            required: true,
            message: '请选择群组账号类型',
            trigger: 'change'
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
      grouptype: 0,
      groupUserType: 1,
      options_cityListScheme: [],
      search: '',
      isNotSearch: true,
      yajin: [],
      taocan: [],
      group: [],
      msg: '群组创建成功',
      pageNum: 1,
      loadingtaocan: true,
      loadingyajin: true,
      loadingcities: true,
      loadinggrouptype: true,
      formGroupCreate: {
        name: '',
        canRefund: '',
        cityCode: '',
        userType: '',
        subAccountNumber: 3,
        depositScheme: [],
        packageScheme: [],
        freeDayEnable: false,
        freeDay: 0,
        limitBatteryNum: 0
      },
      formLabelWidth: '90px',
      formInputWidth: '440px'
    };
  },
  computed: {
    ...mapState(['agent', 'modalStore'])
  },
  watch: {
    'modalStore.needShop': function(val) {
      if (!val) {
        this.fetchCityList();
        this.fetchGroupType();
        this.fetchYajinOrTaocan('depositListScheme');
        this.fetchYajinOrTaocan('packageListScheme');
      }
    }
  },
  components: {
    BaseStatus
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
          }
          if (type === 'packageListScheme') {
            vueThis.taocan = objRps.result.list;
            vueThis.loadingtaocan = false;
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
    fetchCityList: function() {
      var vueThis = this;
      var sendData = {
        pageNum: 1,
        pageSize: 1520,
        advancedParam: JSON.stringify({
          all: 0
        })
      };
      vueThis.$rqs(
        vueThis.$yApi.userCityList,
        function(objRps) {
          vueThis.options_cityListScheme = objRps.result.list;
          vueThis.loadingcities = false;
        },
        {
          objSendData: sendData
        }
      );
    },
    handleComfirm: function(refName) {
      var vueThis = this;
      vueThis.$refs[refName].validate(valid => {
        if (valid) {
          var sendData = {
            name: vueThis.formGroupCreate.name,
            depositScheme: vueThis.formGroupCreate.depositScheme,
            packageScheme: vueThis.formGroupCreate.packageScheme,
            cityCode: vueThis.formGroupCreate.cityCode,
            freeDay: vueThis.formGroupCreate.freeDay,
            canRefund: window.Number(vueThis.formGroupCreate.canRefund),
            userType: window.Number(vueThis.formGroupCreate.userType),
            subAccountNumber: window.Number(
              vueThis.formGroupCreate.subAccountNumber
            ),
            limitBatteryNum: window.Number(vueThis.formGroupCreate.limitBatteryNum)
          };
          vueThis.loading = true;
          vueThis.$rqs(
            vueThis.$yApi.groupCreate,
            function() {
              vueThis.$store.commit('showStatusGroupCreate');
              vueThis.$refs[refName].resetFields();
              vueThis.$router.push({
                path: '/group'
              });
            },
            {
              objSendData: sendData
            }
          );
        }
      });
    },
    fetchGroupType: function() {
      var vueThis = this;
      vueThis.$rqs(vueThis.$yApi.userQuery, function(objRps) {
        vueThis.grouptype = objRps.result.groupType;
        vueThis.groupUserType = objRps.result.groupUserType;
        vueThis.loadinggrouptype = false;
      });
    },
    handleYajinSelectionChange: function(val) {
      var depositScheme = [];
      val.forEach(function(element){
        depositScheme.push(element.code);
      });
      this.formGroupCreate.depositScheme = depositScheme;
    },
    handleTaocanSelectionChange: function(val) {
      var packageScheme = [];
      val.forEach(function(element){
        packageScheme.push(element.code);
      });
      this.formGroupCreate.packageScheme = packageScheme;
    }
  }, //methods
  created: function() {
    this.fetchCityList();
    this.fetchGroupType();
    this.fetchYajinOrTaocan('depositListScheme');
    this.fetchYajinOrTaocan('packageListScheme');
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

.bottomDiv{
  height: 20px;
}

</style>
