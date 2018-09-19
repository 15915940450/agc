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
              <el-tag type="success">同意</el-tag>
            </template>
            <div>
              <span class="l">备注：</span>
              
              <span class="r">申请金额比实际转账金额少1000元，请补足差额后重新申请</span>
            </div>
            <div>
              <span class="l">附件：</span>
              
              <span class="r">
                <el-button type="text">点击查看</el-button>
              </span>
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
              
              <span class="r">2018-08-09 00:09:08</span>
            </div>
            <div>
              <span class="l">城市：</span>
              
              <span class="r">深圳市</span>
            </div>
            <div>
              <span class="l">代理商公司名称：</span>
              
              <span class="r">—</span>
            </div>
            <div>
              <span class="l">实际付款人名称：</span>
              
              <span class="r">深圳市万年青有限公司</span>
            </div>
            <div>
              <span class="l">业务类型：</span>
              
              <span class="r">深圳市</span>
            </div>
            <div>
              <span class="l">单价：</span>
              
              <span class="r">￥ 998</span>
            </div>
            <div>
              <span class="l">数量：</span>
              
              <span class="r">1</span>
            </div>
            <div>
              <span class="l">支付金额：</span>
              
              <span class="r">￥ 998</span>
            </div>
            <div>
              <span class="l">付款凭单：</span>
              
              <span class="r">
                <el-button type="text">点击查看</el-button> 
              </span>
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
      activeName:'1'
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
  },
  created:function(){
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
  width: 130px;
  display: inline-block;
}
.l,.r{
  color: #696969;
  font-size: 12px;
}
</style>