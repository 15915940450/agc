<template lang="html">
  <div class="component_bigamountdetail">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/bigamount' }">
          <small>大额充值</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/bigamount/history/1'}">
          <small>申请记录</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>申请详情</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <section class="im_snow">
      <div class="im_snow_title">
        <el-row>
          <el-col :span="6">
            <h3 class="title">申请详情</h3>
          </el-col>
          <el-col :span="18">
            <div class="title_link">
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="detail_wrap">

        <!-- accordion -->
        <el-collapse v-model="activeName">
          <el-collapse-item title="审核结果" name="1">
            <template slot="title">
              <span class="result">审核结果</span>
              <el-tag>
                {{detail.checkStatus}}
              </el-tag>
            </template>
            <div>
              <span class="l">备注：</span>
              
              <span class="r">
                {{detail.remark}}
              </span>
            </div>
            <div>
              <span class="l">附件：</span>
              
              <span class="r">
                <el-button 
                  v-if="detail.attachment && detail.attachment!=='─'"
                  type="text" 
                  @click="openDiaAttachment()"
                  >
                  点击查看
                </el-button>
                <span v-else>
                  {{detail.attachment}}
                </span>
              </span>
              <el-dialog
                title=""
                :visible.sync="attachmentImg"
                width="860px"
                >
                <div>
                  <img :src="detail.attachment" alt="">
                </div>
              </el-dialog>
            </div>
          </el-collapse-item>
          <el-collapse-item title="收款帐户信息" name="2">
            <div>
              <span class="l">帐户名称：</span>
              
              <span class="r">深圳易马达科技有限公司</span>
            </div>
            <div>
              <span class="l">开户银行：</span>
              
              <span class="r">招商银行深圳建安支行</span>
            </div>
            <div>
              <span class="l">收款账户：</span>
              
              <span class="r">755928540810505</span>
            </div>
          </el-collapse-item>
          <el-collapse-item title="申请信息" name="3">
            <div>
              <span class="l">申请时间：</span>
              
              <span class="r">{{detail.createTime}}</span>
            </div>
            <div>
              <span class="l">城市：</span>
              
              <span class="r">{{detail.cityName}}</span>
            </div>
            <div>
              <span class="l">代理商公司名称：</span>
              
              <span class="r">{{detail.agentCompany}}</span>
            </div>
            <div>
              <span class="l">实际付款人名称：</span>
              
              <span class="r">{{detail.actualPayer}}</span>
            </div>
            <div>
              <span class="l">业务类型：</span>
              
              <span class="r">充值电池押金</span>
            </div>
            <div>
              <span class="l">单价：</span>
              
              <span class="r">￥ {{detail.price}}</span>
            </div>
            <div>
              <span class="l">数量：</span>
              
              <span class="r">{{detail.batteryNum}}</span>
            </div>
            <div>
              <span class="l">支付金额：</span>
              
              <span class="r">￥ {{detail.amount}}</span>
            </div>
            <div>
              <span class="l">付款凭单：</span>
              
              <span class="r">
                <el-button type="text" @click="openDiaPV()">点击查看</el-button> 
              </span>
              <el-dialog
                title=""
                :visible.sync="payVoucherImg"
                width="860px"
                >
                <div>
                  <img :src="detail.payVoucher" alt="">
                </div>
              </el-dialog>
            </div>
          </el-collapse-item>
        </el-collapse>

      </div>
      
      
    </section>

  </div>
</template>
<script>
import {mapState} from 'vuex';

export default {
  name:'',
  data:function(){
    return ({
      activeName:'1',
      id:null,
      attachmentImg:false,
      payVoucherImg:false,
      detail:{
        id:null,  // 押金id
        payType:'无', //3大额支付 充值电池押金
        amount:0, // 申请金额
        batteryNum:0,   //购买电池数
        checkStatus:0,  //0 待审批,1同意,2拒绝
        remark:'无', //备注
        attachment:'无', //附件
        cityName:'无', //城市名
        agentCompany:'无', //代理名公司
        actualPayer:'无', //实际付款人
        payVoucher:'无', //付款凭单
        price:0, //单价
        createTime:'无' //创建时间
      }
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    // deep watcher
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  components:{
  },
  methods: {
    openDiaAttachment:function(){
      this.attachmentImg=true;
    },
    openDiaPV:function(){
      this.payVoucherImg=true;
    },
    fetchData:function(){
      var vueThis=this;
      var sendData={
        pageSize:1,
        pageNum:1,
        advancedParam:JSON.stringify({
          id:vueThis.id
        })
      };
      vueThis.$rqs(vueThis.$yApi.getBigAmountHistory,function(objRps){
        // _.logErr(objRps)
        vueThis.detail=Object.assign({},objRps.result.list[0]);
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='checkStatus'){
            return (['待审核','同意','拒绝'][v]);
          }
          if(k==='createTime'){
            return (v.slice(0,-2));
          }
          
        }
      });
    }
  },
  created:function(){
    this.id=+this.$route.params.id;
    this.fetchData();
  }
};
</script>
<style lang="css" scoped>
.detail_wrap{
  padding: 30px 15px;
}
.result{
  margin-right:20px;
}
.detail_wrap h4{
  font-size:15px;
  border-bottom: 1px solid #E9E9E9;
  padding-bottom: 16px;
  margin-bottom: 8px;
  margin-top: 40px;
  font-weight: 500;
}
.l{
  width: 110px;
  display: inline-block;
}
.l,.r{
  color: #696969;
  /*font-size: 12px;*/
}
</style>