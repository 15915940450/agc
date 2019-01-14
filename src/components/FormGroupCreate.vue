<template lang="html">
	<div class="modal_wrap">
		<el-dialog title="创建群组" :visible.sync="modalStore.groupCreate" width="460px" :show-close="false"
		 :close-on-click-modal="false" center>
			<div class="modal_wrap-body">
				<el-form :model="formGroupCreate" :rules="rules" ref="formGroupCreate">
					<el-form-item prop="name" label="群组名称" :label-width="formLabelWidth">
						<el-input v-model="formGroupCreate.name" auto-complete="off" placeholder="限字母、数字、汉字、符号，不超过10个字"></el-input>
					</el-form-item>
					<el-form-item prop="userType" label="账号类型" :label-width="formLabelWidth">
						<el-select v-model="formGroupCreate.userType" placeholder="请选择">
							<!-- 1普通账号，2亲情账号 -->
							<el-option v-if="formGroupCreate.userType!==1" label="普通账号" el-select value="1"></el-option>
							<el-option v-if="formGroupCreate.userType!==2" label="亲情账号" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item v-if="formGroupCreate.userType==2" prop="subAccountNumber" :label-width="formLabelWidth">
						每个账号可绑定&nbsp;&nbsp;&nbsp;&nbsp;
						<el-input-number v-model="formGroupCreate.subAccountNumber" :min="1" :max="100" style="width: 80px;" size="mini"
						 :controls="false">
						</el-input-number>
						&nbsp;&nbsp;&nbsp;&nbsp;个子账号
					</el-form-item>
					<el-form-item prop="canRefund" label="群组类型" :label-width="formLabelWidth">
						<el-select v-model="formGroupCreate.canRefund" placeholder="请选择">
							<!-- 0不可退，1可退 -->
							<el-option v-if="grouptype!==0" label="线上交押金" value="1"></el-option>
							<el-option v-if="grouptype!==1" label="线下交押金" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="cityCode" label="选择城市" :label-width="formLabelWidth">
						<el-select v-model="formGroupCreate.cityCode" placeholder="请选择">
							<el-option v-for="item in options_cityListScheme" :key="item.cityCode" :label="item.name" :value="item.cityCode">
							</el-option>
						</el-select>
					</el-form-item>

					<el-form-item prop="depositScheme" label="押金方案" :label-width="formLabelWidth">
						<el-select v-model="formGroupCreate.depositScheme" multiple placeholder="请选择">
							<el-option v-for="item in yajin" :key="item.id" :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
							 :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="packageScheme" label="套餐方案" :label-width="formLabelWidth">
						<el-select v-model="formGroupCreate.packageScheme" multiple placeholder="请选择">
							<el-option v-for="item in taocan" :key="item.id" :label="item.neroTaocan" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>


					<el-form-item prop="freeDayEnable" label="自动免费" :label-width="formLabelWidth">
						<el-switch v-model="formGroupCreate.freeDayEnable" active-text="自动" inactive-color="#999">

						</el-switch>
					</el-form-item>
					<el-form-item prop="freeDay" :label-width="formLabelWidth">
						新用户自动免费
						<el-input-number v-model="formGroupCreate.freeDay" :disabled="!formGroupCreate.freeDayEnable" size="mini" :min="0"
						 :max="100">
						</el-input-number>
						天
					</el-form-item>

				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleCancel('formGroupCreate')">取 消</el-button>
				<el-button type="primary" @click="handleComfirm('formGroupCreate')" :loading="loading">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {
		name: 'FormGroupCreate',
		props: ['yajin', 'taocan'],
		data: function() {
			return ({
				rules: {
					name: [{
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
					cityCode: [{
						required: true,
						message: '请选择城市',
						trigger: 'change'
					}],
					canRefund: [{
						required: true,
						message: '请选择群组类型',
						trigger: 'change'
					}],
					userType: [{
						required: true,
						message: '请选择群组账号类型',
						trigger: 'change'
					}],
					subAccountNumber: [{
						required: true,
						message: '',
						trigger: 'change'
					}],
					freeDay: [{
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
					depositScheme: [{
						required: true,
						message: '请选择一个或多个押金方案',
						trigger: 'change'
					}],
					packageScheme: [{
						required: true,
						message: '请选择一个或多个套餐方案',
						trigger: 'change'
					}]
				},
				formGroupCreate: {
					name: '',
					canRefund: '',
					cityCode: '',
					userType: '1',
					subAccountNumber: 3,
					depositScheme: [],
					packageScheme: [],
					freeDayEnable: false,
					freeDay: 0,
					agentId: window.localStorage.agentid
				},
				grouptype: 0,
				options_cityListScheme: [],
				loading: false,

				formLabelWidth: '90px'
			});
		},
		computed: {
			...mapState(['modalStore']),
			computedFreeDay: function() {
				var computedFreeDay = 0;
				if (this.formGroupCreate.freeDayEnable === true) {
					computedFreeDay = this.formGroupCreate.freeDay;
				}
				return computedFreeDay;
			}
		},
		watch: {
			'modalStore.groupCreate': function(val) {
				if (val) {
					this.fetchGroupType();
				}
			}
		},
		methods: {
			fetchCityList: function() {
				var vueThis = this;
				var sendData = {
					pageNum: 1,
					pageSize: 1520,
					advancedParam: JSON.stringify({
						all: 0
					})
				};
				vueThis.$rqs(vueThis.$yApi.userCityList, function(objRps) {
					vueThis.options_cityListScheme = objRps.result.list;
				}, {
					objSendData: sendData
				});
			},
			handleCancel: function(refName) {
				var vueThis = this;
				vueThis.$refs[refName].resetFields();
				this.$store.commit('hideGroupCreate');
			},
			handleComfirm: function(refName) {
				var vueThis = this;
				vueThis.$refs[refName].validate((valid) => {
					if (valid) {
						var sendData = {
							name: vueThis.formGroupCreate.name,
							depositScheme: vueThis.formGroupCreate.depositScheme,
							packageScheme: vueThis.formGroupCreate.packageScheme,
							agentId: window.localStorage.agentid,
							cityCode: vueThis.formGroupCreate.cityCode,
							freeDay: vueThis.computedFreeDay,
							canRefund: window.Number(vueThis.formGroupCreate.canRefund),
							userType: window.Number(vueThis.formGroupCreate.userType),
							subAccountNumber: window.Number(vueThis.formGroupCreate.subAccountNumber),
						};
						vueThis.loading = true;
						vueThis.$rqs(vueThis.$yApi.groupCreate, function() {
							vueThis.$store.commit('hideGroupCreate');
							vueThis.$store.commit('showStatusGroupCreate');
							vueThis.$refs[refName].resetFields();
						}, {
							objSendData: sendData
						});
					}
				});

			},
			fetchGroupType: function() {
				var vueThis = this;
				vueThis.$rqs(vueThis.$yApi.userQuery, function(objRps) {
					vueThis.grouptype = objRps.result.groupType;
				});
			}

		}, //methods
		created: function() {
			this.fetchCityList();
			// this.fetchGroupType();
			// console.log(this.grouptype);
		}

	};
</script>

<style lang="css" scoped>

</style>
