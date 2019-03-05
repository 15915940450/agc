<template lang="html">
	<div>
		<div>
			<!-- table wrap -->
			<div class="table_wrap" v-if="(storesList.length || !isNotSearch || loadingStores)">
				<el-row>
					<el-col :span="6">
						<h3 class="title">门店管理</h3>
					</el-col>
					<el-col :span="18">
						<div class="table_wrap-search">
							<div class="table_wrap-search_wrap">
								<el-input @input="imSearch()" class="table_wrap-input_serach" placeholder="名称或者手机号码搜索门店" v-model="search"
								 suffix-icon="el-icon-search"></el-input>
							</div>
						</div>
					</el-col>
				</el-row>
				<div v-loading="loadingStores">
					<!-- 门店表格 -->
					<div class="table_wrap_real">
						<el-table :data="storesList" size="medium" stripe style="width: 100%" class="table_wrap-table">
							<el-table-column label="ID" width="100" prop="id">
							</el-table-column>
							<el-table-column label="门店名称" prop="name">
							</el-table-column>
							<el-table-column label="代理" prop="agentName">
							</el-table-column>
							<el-table-column label="手机号" prop="phone">
							</el-table-column>
							<el-table-column label="操作" width="200">
								<template slot-scope="scope">
									<el-button v-if="scope.row.canOP" type="text" size="small" @click="storesMangerAction(scope)">
										管理
									</el-button>
									<el-button type="text" size="small" @click="modifyAgentAction(scope)">
										修改代理
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="table_wrap_pagination" v-show="total">
						<el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="total" :current-page="pageNum"
						 @current-change="handleCurrentChange">
							<!-- 分页 -->
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<!-- </transition> -->
		<!-- 没有中控 -->
		<div class="empty_evs im_empty_wrap eqcalc" v-if="(!storesList.length && isNotSearch && !loadingStores)">
			<h3 class="title">门店管理</h3>
			<div class="im_empty">
				<img class="im_empty_img" src="../assets/no_stores.png" alt="还没有门店" />
				<p class="im_empty_p">您还没有门店哦！</p>
			</div>
		</div>
		<FormSetAgent :storesId="selectStoresId" :storeAgentId="selectStoreAgentId"/>
		<BaseStatus :msg="msg" />
	</div>
</template>
<script>
	import {
		mapState
	} from "vuex";
	import FormSetAgent from "./FormSetAgent.vue";
	import BaseStatus from "./BaseStatus.vue";

	export default {
		name: "HeartStores",
		components: {
			FormSetAgent,
			BaseStatus
		},
		data: function() {
			return {
				total: 1,
				search: "", //搜索用的
				isNotSearch: true,
				storesList: [],
				loadingStores: false,
				msg: "修改门店代理成功",
				selectStoresId: "",
				selectStoreAgentId: "",
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
			},
			//修改门店代理成功刷新下列表
			"modalStore.baseStatus": function(val){
				if(val){
					this.fetchData();
				}
			}
		},
		methods: {
			handleCurrentChange: function(val) {
				this.pageNum = val;
				this.$router.push("/general/stores/" + val);
			},
			storesMangerAction: function(scope) {
				window.sessionStorage.setItem('headerid', scope.row.id);
				this.$router.push("/");
				if(this.storesList.length > 1){
					this.$store.commit("setChangeShop");
				}
			},
			modifyAgentAction: function(scope) {
				this.selectStoresId = scope.row.id + "";
				this.selectStoreAgentId = scope.row.agentId + "";
				this.$store.commit("showSetStoresAgent");
			},
			imSearch: _.debounce(function() {
				this.isNotSearch = false;
				this.fetchData();
			}, 690),
			fetchData: function() {
				var vueThis = this;
				vueThis.loadingStores = true;
				//判断search参数，如果为手机号，设置为phone参数，其它为name参数
				var sendData;
				if (/^1[0-9]{10}$/.test(vueThis.search)) {
					sendData = {
						phone: vueThis.search,
						type: 2,
						pageNum: vueThis.pageNum,
						pageSize: vueThis.$yApi.defaultPS
					};
				} else {
					sendData = {
						name: vueThis.search,
						type: 2,
						pageNum: vueThis.pageNum,
						pageSize: vueThis.$yApi.defaultPS
					};
				} 
				vueThis.$rqs(
					vueThis.$yApi.subAgentStoresList,
					function(objRps) {
						console.log(objRps);
						vueThis.loadingStores = false;
						vueThis.total = objRps.result.total;
						vueThis.storesList = objRps.result.list;
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
