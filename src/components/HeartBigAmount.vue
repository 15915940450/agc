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

        
        <router-link class="big_amount_history_entrance" to="/bigamount/history/1">
          申请记录
        </router-link>
      </h3>
      
    </div>

    <section class="big_amount_wrap">
      
      <el-form 
        :model="bigAmount" 
        ref="bigAmount" 
        label-width="150px"
        label-position="left"
        size="mini"
        :rules="rules"
        >
        <el-card class="box-card">

        <h4 class="first">收款帐户信息</h4>
        <el-form-item label="帐户名称:">
          {{msgZHMC}}
          <span class="copy">
            <el-button 
              type="text"
              v-clipboard:copy="msgZHMC"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              >
              复制
            </el-button>
          </span>
        </el-form-item>
        <el-form-item label="开户银行:">
          {{msgKHYH}}
          <span class="copy">
            <el-button 
              type="text"
              v-clipboard:copy="msgKHYH"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              >
              复制
            </el-button>
          </span>
        </el-form-item>
        <el-form-item label="收款账户：">
          {{msgSKZH}}
          <span class="copy">
            <el-button 
              type="text"
              v-clipboard:copy="msgSKZH"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              >
              复制
            </el-button>
          </span>
        </el-form-item>
<!-- form start 91 
  保存未提交數據流程：
  1.嘗試從本地存貯中讀取表單數據：getInputUnsave()
  2.監聽bigAmount（deep），將bigAmount和fileList合成一個數組存貯在本地存貯中：FormDataBigAmount
  3.儅表單成功提交（ajax），清除存貯項目 (removeItem,setItem)
-->
        <h4>付款账户信息</h4>
        <el-form-item label="城市：" prop="cityCode">

          <el-select v-model="bigAmount.cityCode" placeholder="请选择">
            <el-option
              v-for="item in options_cityListScheme"
              :key="item.cityCode"
              :label="item.name"
              :value="item.cityCode">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="代理商公司名称:" prop="agentCompany">
          <el-input v-model="bigAmount.agentCompany" placeholder="请输入公司名称或付款人名称"></el-input>
        </el-form-item>
        <el-form-item label="实际付款人名称：" prop="actualPayer">
          <el-input v-model="bigAmount.actualPayer" placeholder="请输入付款凭证单上的付款人或付款公司名称"></el-input>
        </el-form-item>
        <el-form-item label="支付金额(元)：" prop="payAmount">
          <el-input v-model.number="bigAmount.payAmount" placeholder="请输入付款凭单上的金额"></el-input>
        </el-form-item>

        <h4>申请内容</h4>
        <el-form-item label="业务类型：">
          <el-select v-model="bigAmount.forNext" placeholder="请选择" disabled>
            <el-option label="充值电池押金" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价：">
          ￥ {{price}}
        </el-form-item>
        <el-form-item label="数量：" prop="batteryNum">
          <el-input-number 
            v-model="bigAmount.batteryNum" 
            :min="1" 
            :max="9999" 
            label="请输入数量"
            @input.native="handleIN"
            >
          </el-input-number>
        </el-form-item>
        <el-form-item label="申请金额：">
          ￥ {{bigAmountAmount}}
        </el-form-item>
        <el-form-item label="付款凭单：" prop="bigAmountPayVoucher">
          
          <!-- multiple -->
          <el-upload
            ref="uploadimg"
            :action="action"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :file-list="fileList"
            :multiple="false"
            accept="image/*"
            >
            <el-button size="small" type="success">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">支持jpg,png格式图片，不超过2M</div>
          </el-upload>


          <a href="javascript:;" class="see_demo" @click="openDia">查看范例</a>
          <el-dialog
            title=""
            :visible.sync="demoImg"
            width="860px"
            >
            <div>
              <img class="max_img" src="../assets/big_amount_demo_img.png" alt="">
            </div>
          </el-dialog>
          <!-- hidden -->
          <el-input type="hidden" v-model="bigAmount.bigAmountPayVoucher" placeholder="请上传付款凭单"></el-input>
        </el-form-item>
        </el-card>

        <el-button 
          class="btn_submit" 
          type="primary" 
          @click="submitForm('bigAmount')"
          :disabled="summitting"
          >
          提交
        </el-button>
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
      msgZHMC:'深圳易马达科技有限公司',
      msgKHYH:'招商银行深圳创维大厦支行',
      msgSKZH:'755928540810201',
      action:'',
      demoImg:false,
      price:0,
      bigAmount:{
        forNext:'1',
        cityCode:null,  //城市
        agentCompany:'',  //代理商公司名称
        actualPayer:'', //实际付款人名称
        payAmount:'',   //支付金额
        bigAmountPayVoucher:'', //付款凭单
        batteryNum:1  //数量
      },
      summitting:false,
      rules:{
        agentCompany:[
          {
            required:true,
            message:'请输入公司名称',
            trigger:'blur'
          },
          {
            min:2,
            max:15,
            message:'长度在 2 到 15 个字符',
            trigger:'blur'
          }
        ],
        actualPayer:[
          {
            required:true,
            message:'请输入付款凭证单上的付款人或付款公司名称',
            trigger:'blur'
          },
          {
            max:15,
            message:'15 个字符以内',
            trigger:'blur'
          }
        ],
        payAmount:[
          {
            type:'number',
            required:true,
            max:500000,
            message:'金额在500,000以内',
            trigger:'blur'
          }
        ],
        batteryNum:[
          {
            required:true,
            message:'请输入一个数字',
            trigger:'blur'
          }
        ],
        bigAmountPayVoucher:[
          {
            required:true,
            message:'请上传付款凭单'
          }
        ],
        cityCode:[
          {
            required:true,
            message:'请选择城市'
          }
        ]
      },
      options_cityListScheme:[],
      fileList:[
        // {
        //   name:'demo.png',
        //   url:'https://immotor-china.oss-cn-shenzhen.aliyuncs.com/agent/pay/voucher651ebe258fc04a6586706e8c44937d1e.jpg'
        // }
      ]
    });
  },
  computed:{
    ...mapState(['agent','modalStore']),
    bigAmountAmount:function(){
      var num=this.bigAmount.batteryNum;
      // console.log(num);
      if(num===undefined || window.isNaN(num)){
        num=0;
      }
      return (+(+num)*(+this.price)).toFixed(2);
    }
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.userQuery();
        this.fetchCityList();
      }
    },
    bigAmount:{
      handler:function(val){
        // _.logErr(val);
        // _.logErr(this.fileList);
        var arr=[val,this.fileList];
        window.localStorage.FormDataBigAmount=JSON.stringify(arr);
      },
      deep:true
    },
    fileList:{
      handler:function(val){
        this.bigAmount.bigAmountPayVoucher=val.length?val[0].url:'';
      },
      deep:true
    }
  },
  methods:{
    onCopy:function(e){
      var vueThis=this;
      vueThis.$message({
        message:'已成功复制到剪贴板： '+e.text,
        type:'success'
      });
    },
    onError:function(){
      var vueThis=this;
      vueThis.$message.error('复制失败。');
    },
    userQuery:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userQuery,function(objRps){
        vueThis.price=(+objRps.result.batteryAmount).toFixed(2);
      });
    },
    fetchCityList:function(){
      var vueThis=this;
      var sendData={
        pageNum:1,
        pageSize:1520,
        advancedParam:JSON.stringify({
          all:0
        })
      };
      vueThis.$rqs(vueThis.$yApi.userCityList,function(objRps){
        vueThis.options_cityListScheme=objRps.result.list;
      },{
        objSendData:sendData
      });
    },
    handleIN:function(ev){
      this.bigAmount.batteryNum=ev.target.value;
    },
    openDia:function(){
      this.demoImg=true;
    },
    //上傳附件
    handleExceed() {
      this.$message.warning('只能上传一张图片');
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess:function(file,fileList){
      var vueThis=this;
      if(+fileList.response.code===1000){
        // console.log(fileList.name);
        vueThis.fileList.push({
          name:fileList.name,
          url:fileList.response.result
        });
        // vueThis.fileList[0].name=fileList.name;
        // vueThis.fileList[0].url=fileList.response.result;
      }else{
        vueThis.$refs.uploadimg.clearFiles();
        vueThis.$notify.error({
          title: '错误',
          message:fileList.response.msg
        });
      }
    },
    handleRemove:function(file,fileList){
      this.fileList=fileList;
    },

    submitForm:function(formName){
      var vueThis=this;
      vueThis.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(vueThis.fileList);
          var sendData={
            cityCode:vueThis.bigAmount.cityCode,
            agentCompany:vueThis.bigAmount.agentCompany,
            actualPayer:vueThis.bigAmount.actualPayer,
            payAmount:''+vueThis.bigAmount.payAmount,   //支付金额(input)
            payVoucher:vueThis.bigAmount.bigAmountPayVoucher,
            amount:''+vueThis.bigAmountAmount,  //申请金额
            batteryNum:vueThis.bigAmount.batteryNum
          };
          //避免重複提交
          vueThis.summitting=true;

          vueThis.$rqs(vueThis.$yApi.postBigAmount,function(objRps){
            //已成功提交，清楚未保存表單數據
            window.localStorage.removeItem('FormDataBigAmount');
            // _.logErr(objRps)
            vueThis.$alert(objRps.msg,'提示',{
              confirmButtonText:'确定',
              callback:action => {
                // console.log(action);  //confirm,cancel
                vueThis.rrPush();
              }
            });
          },{
            objSendData:sendData,
            complete4:function(){
              vueThis.summitting=false;
            }
          });
        }
      });
    },
    rrPush:function(){
      this.$router.push({
        path:'/bigamount/history/1'
      });
    },
    getInputUnsave:function(){
      var vueThis=this;
      var formData=window.localStorage.FormDataBigAmount; //undefined
      if(formData){
        vueThis.initFormData(JSON.parse(formData)); //[objBigAmount,arrFileList]
      }
    },
    initFormData:function(data){
      this.bigAmount.cityCode=data[0].cityCode;
      this.bigAmount.agentCompany=data[0].agentCompany;
      this.bigAmount.actualPayer=data[0].actualPayer;
      this.bigAmount.payAmount=data[0].payAmount;
      this.bigAmount.batteryNum=data[0].batteryNum;
      this.fileList=data[1];
    }
  },
  created:function(){
    this.userQuery();
    this.fetchCityList();
    this.action=this.$yApi.uploadImg;
    this.getInputUnsave();
  }
};
</script>

<style lang="css" scoped>
  .component_big_amount{
    background:#fafbfc;
  }
  .big_amount_head{
    background:white;
    margin:0;
  }
  .big_amount_wrap{
    padding-bottom: 30px;
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
    margin-left: 35px;
  }
  .see_demo{
    color: #0CF !important;
  }
  .big_amount_wrap h4{
    font-size:18px;
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 16px;
    margin-bottom: 8px;
    margin-top: 40px;
    font-weight: 500;
  }
  .big_amount_wrap h4.first{
    margin-top: 0;
  }
  .copy{
    float: right;
    margin-right: 300px;
  }
  .btn_submit{
    width: 190px;
    margin-top: 40px;
  }
</style>