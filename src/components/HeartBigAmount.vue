<template>
  <div class="component_big_amount eqcalc">
    <div class="big_amount_head">
      <h3 class="title with_sub">
        <span class="real_title">大额充值</span>
        <el-tooltip placement="bottom-start">
          <div slot="content">
            支付宝和微信支付时，按开卡行和卡种类不同有每日限额，<br />超过限额可直接银行转账并登记申请大额支付，<br />我司将在收到申请后为您审核信息并处理申请。
          </div>
          <span class="hint_info">
            <i class="el-icon-info"></i>
          </span>
        </el-tooltip>
        
        <a class="wx" target="_blank" href="http://kf.qq.com/touch/faq/151210NZzmuY151210ZRj2y2.html">微信限额</a>
        <el-dropdown>
          <span class="el-dropdown-link">
            <a href="javascript:;">支付宝限额</a>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a class="a_indropdown" href="https://cshall.alipay.com/lab/help_detail.htm?help_id=387096" target="_blank">信用卡限额</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="a_indropdown" href="https://help.alipay.com/lab/help_detail.htm?help_id=419480" target="_blank">储蓄卡限额</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        
        <router-link class="big_amount_history_entrance" to="/">
          申请记录
        </router-link>
      </h3>
      
    </div>

    <section class="big_amount_wrap">
      
      <el-form 
        :model="bigAmount" 
        ref="bigAmount" 
        label-width="130px"
        label-position="left"
        size="mini"
        >

        <h4>收款帐户信息</h4>
        <el-form-item label="帐户名称:">
          深圳易马达科技有限公司
          <span class="copy">
            <el-button type="text">复制</el-button>
          </span>
        </el-form-item>
        <el-form-item label="开户银行:">
          招商银行深圳建安支行
          <span class="copy">
            <el-button type="text">复制</el-button>
          </span>
        </el-form-item>
        <el-form-item label="收款账户：">
          755928540810505
          <span class="copy">
            <el-button type="text">复制</el-button>
          </span>
        </el-form-item>

        <h4>付款账户信息</h4>
        <el-form-item label="城市：">
          <el-select v-model="bigAmount.city" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代理商公司名称:">
          <el-input v-model="bigAmount.x1"></el-input>
        </el-form-item>
        <el-form-item label="实际付款人名称：">
          <el-input v-model="bigAmount.x2"></el-input>
        </el-form-item>
        <el-form-item label="支付金额：">
          <el-input v-model="bigAmount.x3"></el-input>
        </el-form-item>

        <h4>申请内容</h4>
        <el-form-item label="业务类型：">
          <el-select v-model="bigAmount.city" placeholder="请选择">
            <el-option label="充值电池押金" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价：">
          ￥ 998
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="bigAmount.x3" placeholder="请输入数量"></el-input>
        </el-form-item>
        <el-form-item label="申请金额：">
          ￥ 998 
        </el-form-item>
        <el-form-item label="付款凭单：">
          <!-- multiple -->
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :multiple="false"
            >
            <el-button size="small" type="success">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">支持jpg,png格式图片，不超过2M</div>
          </el-upload>


          <a href="javascript:;" class="see_demo">查看范例</a>
        </el-form-item>
        <!-- <el-form-item
          label="年龄"
          prop="age"
          :rules="[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ]"
        >
          <el-input type="age" v-model.number="bigAmount.age" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('bigAmount')">提交</el-button>
        </el-form-item>
      </el-form>

    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartBigAmount',
  data:function(){
    return ({
      bigAmount:{
        age:18,
        city:'',
        x1:'',
        x2:'',
        x3:''
      },
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      
      // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchComboList();
      }
    }
  },
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    submitForm:function(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
        }
      });
    }
  },
  created:function(){
  }
};
</script>

<style>
  .component_big_amount{
    background:#fafbfc;
  }
  .big_amount_head{
    background:white;
    margin:0;
  }
  .big_amount_wrap{
    /*padding: 25px;*/
  }
  .hint_info{
    color:#2490f2;
  }
  .wx{
    margin-left: 50px;
    margin-right: 30px;
  }
  .a_indropdown{
    text-decoration: none;
    color:#555;
  }
  .big_amount_history_entrance{
    float: right;
  }
  .big_amount_wrap{
    width: 690px;
    margin-top: 20px;
    margin-left: 15px;
  }
  .see_demo{
    color: #0CF !important;
  }
</style>