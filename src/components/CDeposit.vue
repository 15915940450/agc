<template lang="html">
  <div class="component_deposit">
    <div v-if="deposit.length">
      <el-row :gutter="10">

        <!-- 押金 -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon">
                  押金
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  我的押金(元)
                  <a href="javascript:;" v-popover:top_up class="im_card-top_up">充值</a>
                  <el-popover
                    ref="top_up"
                    placement="bottom"
                    width="400"
                    trigger="click">
                    <!-- 表单 -->
                    <FormTopUp />

                  </el-popover>
                </h3>
                <p class="im_card-value">
                  <icon name="eye-slash" scale="1.3"></icon>
                  7988
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 可退押金 -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon">
                  可退押金
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  可退押金(元)
                  <a href="javascript:;" class="im_card-top_up">退款</a>
                </h3>
                <p class="im_card-value">
                  <icon name="eye-slash" scale="1.3"></icon>
                  90
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 可用电池数(个) -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon">
                  可用电池数
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  可用电池数(个)
                </h3>
                <p class="im_card-value">
                  22988
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- 已用电池数(个) -->
        <el-col :span="6">
          <div class="im_card">
            <el-row>
              <el-col :span="10">
                <div class="im_card-icon">
                已用电池数
                </div>
              </el-col>
              <el-col :span="14">
                <h3 class="im_card-title">
                  已用电池数(个)
                </h3>
                <p class="im_card-value">
                  3000
                </p>
              </el-col>
            </el-row>
          </div>
        </el-col>

      </el-row>

      <div class="table_wrap">
        <h3 class="title">押金记录</h3>
        <!-- 押金记录表格 -->
        <el-table
          :data="deposit" stripe
          style="width: 100%" class="table_wrap-table">
          <el-table-column
            label="ID"
            prop="id">
          </el-table-column>
          <el-table-column
            label="时间"
            prop="createTime">
          </el-table-column>
          <el-table-column
            label="类型"
            prop="payType" :formatter="formatter">
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
        <!-- 分页 -->
        <el-pagination :background="true" layout="total,->,jumper,prev,pager,next" :total="93" class="table_wrap-pagination">

        </el-pagination>
      </div>

    </div>
    <div v-if="!deposit.length" class="empty_deposit">
      <h3 class="title">我的押金</h3>
      <img src="../assets/empty_deposit.png" />
      <p>您还没有押金哦！</p>
      <el-button type="primary" size="small">充值</el-button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,imPostForm} from '../api/urls.js';
import FormTopUp from './FormTopUp.vue';

export default {
  name:'CDeposit',
  data() {
    return {
      center:'center',
      deposit:[],
      statusZHPayType:['','充值','退款'], //押金类型 1充值，2退款
      statusZH:['','充值待确认','充值成功','退款待审核','拒绝退款','待退款','已退款','充值失败','审核拒绝退款'] //1充值待确认,2充值成功,3退款待审核,4拒绝退款, 5待退款,6已退款,7充值失败,8审核拒绝退款
    };
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    modalStore:{
      handler:function(newVal){
        if(!newVal.needLogin){
          // console.log('watch modalStore deep.');
          this.fetchData();
        }
      },
      deep:true
    }
  },
  components:{
    FormTopUp
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      if(window.sessionStorage.agentphone){
        //else:没有用户手机则不发送请求
        var sendData={
          phone:''+window.sessionStorage.agentphone,
          pageNum:urls.pageNum,
          pageSize:urls.pageSize
        };
        imPostForm(urls.depositList,sendData,function(objRps){
          if(objRps.code===1000){
            vueThis.deposit=objRps.result.list;
          }
        });
      }

    },
    formatter:function(row, column, cellValue){
      // console.log(JSON.stringify(column));
      if(column.property==='payType'){
        return (this.statusZHPayType[cellValue]);
      }
      if(column.property==='status'){
        return (this.statusZH[cellValue]);
      }
    }
  },
  created:function(){
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
  .im_card{
    background: #FFF;
    font-size: 12px;
    max-height: 100px;
    height: 100px;
    padding: 20px;
    border-radius: 5px;
    box-sizing:border-box;
    box-shadow:2px 0px 8px rgba(204,204,204,1)
  }
  .im_card-title{
    margin: 0;
    font-weight: normal;
    text-align: right;
  }
  .im_card-value{
    text-align: right;
    font-size: 30px;
    color: #333;
    margin: 0;
    margin-top:10px;
  }
  .im_card-value .fa-icon{
    cursor: pointer;
    margin-right: 10px;
  }
  .im_card-top_up{
    margin-left: 10px;
  }
  .im_card-icon{
    width:60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 100px;
    box-shadow:4px 8px 20px rgba(102,255,204,1);
    background: #66FFCC;
    background: linear-gradient(-10deg, #00CC66, #66FFCC);
    color: #FFF;
  }

  /* table */
  .im-table-expand {
    font-size: 0;
  }
  .im-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .im-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .table_wrap{
    background: #FFF;
    margin-top: 10px;
  }
  .table_wrap-pagination{
    padding-top:20px;
    padding-bottom:20px;
  }
  /* 押金为空 */
  .empty_deposit{
    background: #FFF;
    text-align: center;
    padding-bottom: 30px;
    min-height: calc(100vh - 60px - 60px - 30px);
  }
  .empty_deposit .title{
    text-align: left;
  }
  .empty_deposit img{
    margin-top:100px;
  }
  .empty_deposit p{
    color: #999;
    font-size: 14px;
    margin-bottom: 30px;
  }
</style>
