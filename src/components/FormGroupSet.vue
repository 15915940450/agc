<template lang="html">
	<div class="modal_wrap">
		<el-dialog title="群组设置" :visible.sync="modalStore.groupSet" width="460px" :show-close="false" :close-on-click-modal="false" center>
			<div class="modal_wrap-body">
				<el-form :model="formGroupSet" :rules="rules" ref="formGroupSet">

					<el-form-item prop="name" label="群组名称" :label-width="formLabelWidth">
						<el-input v-model="formGroupSet.name" auto-complete="off" placeholder="限字母、数字、汉字、符号，不超过10个字">

						</el-input>
					</el-form-item>
					<el-form-item prop="userType" label="账号类型" :label-width="formLabelWidth">
						<el-select v-model="userTypeString" placeholder="请选择" disabled></el-select>
					</el-form-item>
					<el-form-item v-if="formGroupSet.userType==2" prop="subAccountNumber" :label-width="formLabelWidth">
						每个账号可绑定&nbsp;&nbsp;&nbsp;&nbsp;
						<el-input-number v-model="formGroupSet.subAccountNumber" :min="1" :max="100" style="width: 80px;" size="mini" :controls="false">
						</el-input-number>
						&nbsp;&nbsp;&nbsp;&nbsp;个子账号
					</el-form-item>
					<el-form-item prop="canRefund" label="群组类型" :label-width="formLabelWidth">
						<el-select v-model="formGroupSet.canRefund" placeholder="请选择" disabled>
							<el-option label="线上交押金" value="1"></el-option>
							<el-option label="线下交押金" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="depositScheme" label="押金方案" :label-width="formLabelWidth">
						<el-select v-model="formGroupSet.depositScheme" multiple placeholder="请选择">
							<el-option v-for="item in yajin" :key="item.id" :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="packageScheme" label="套餐方案" :label-width="formLabelWidth">
						<el-select v-model="formGroupSet.packageScheme" multiple placeholder="请选择">
							<!-- 名称/类型/价格/次数/天数 -->
							<el-option v-for="item in taocan" :key="item.code" :label="item.neroTaocan" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="freeDayEnable" label="自动免费" :label-width="formLabelWidth">
						<el-switch v-model="formGroupSet.freeDayEnable" active-text="自动" inactive-color="#999">

						</el-switch>
					</el-form-item>

					<el-form-item prop="freeDay" :label-width="formLabelWidth">
						新用户自动免费
						<el-input-number v-model="formGroupSet.freeDay" :disabled="!formGroupSet.freeDayEnable" size="mini" :min="0" :max="100">
						</el-input-number>
						天
					</el-form-item>

				</el-form>
			</div>


			<span slot="footer" class="dialog-footer">
				<el-button @click="handleCancel()">取 消</el-button>
				<el-button type="primary" @click="handleComfirm('formGroupSet')" :loading="loading">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FormGroupSet',
  props: [
    'userType',
    'subAccountNumber',
    'code',
    'name',
    'deposits',
    'packageList',
    'type',
    'freeDay',
    'yajin',
    'taocan'
  ],
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
            pattern: /^.{1,10}$/,
            message: '必须是1到10个汉字，字母，数字或符号组合',
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
        name: '',
        canRefund: '',
        userType: '1',
        subAccountNumber: 3,
        depositScheme: [],
        packageScheme: [],
        groupCode: -1,
        freeDayEnable: false,
        freeDay: 0
      },
      loading: false,
      userTypeString: '',
      formLabelWidth: '85px'
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
  watch: {
    'modalStore.groupSet': function(val) {
      if (val) {
        this.formGroupSet.name = this.name;
        this.formGroupSet.canRefund = this.type + '';
        this.formGroupSet.depositScheme = this.deposits
          ? this.deposits.map(function(v) {
            return window.Number(v);
          })
          : [];
        this.formGroupSet.packageScheme = this.packageList
          ? this.packageList.map(function(v) {
            return window.Number(v.code);
          })
          : [];
        (this.formGroupSet.userType = this.userType),
        (this.userTypeString =
            this.userType === '2' ? '亲情账号' : '普通账号');
        (this.formGroupSet.subAccountNumber = this.subAccountNumber),
        (this.formGroupSet.groupCode = this.code);
        this.formGroupSet.freeDayEnable = Boolean(this.freeDay);
        this.formGroupSet.freeDay = this.freeDay;
      }
    }
  },
  methods: {
    handleCancel: function() {
      this.$refs['formGroupSet'].resetFields();
      this.$store.commit('hideGroupSet');
    },
    handleComfirm: function(refName) {
      var vueThis = this;
      vueThis.$refs[refName].validate(valid => {
        if (valid) {
          var sendData = {
            name: vueThis.formGroupSet.name,
            depositScheme: vueThis.formGroupSet.depositScheme,
            packageScheme: vueThis.formGroupSet.packageScheme,
            cityCode: 0,
            freeDay: vueThis.computedFreeDay,
            groupCode: vueThis.formGroupSet.groupCode,
            subAccountNumber: vueThis.formGroupSet.subAccountNumber
          };
          vueThis.loading = true;
          vueThis.$rqs(
            vueThis.$yApi.groupSet,
            function() {
              vueThis.$store.commit('hideGroupSet');
              vueThis.$store.commit('showBaseStatus');
            },
            {
              objSendData: sendData
            }
          );
        }
      });
    }
  }, //methods
  created: function() {}
};
</script>

<style lang="css" scoped>
</style>
