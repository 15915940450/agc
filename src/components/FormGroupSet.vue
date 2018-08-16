<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="群组设置"
      :visible.sync="modalStore.groupSet"
      width="460px"
      :show-close="false"
      :close-on-click-modal="false"
      center>


      <div class="modal_wrap-body">
        <el-form :model="formGroupSet" :rules="rules" ref="formGroupSet">

          <el-form-item prop="name" label="群组名称" :label-width="formLabelWidth">
            <el-input v-model="formGroupSet.name" auto-complete="off" placeholder="限字母、数字、汉字、符号，不超过10个字"></el-input>
          </el-form-item>
          <el-form-item prop="canRefund" label="群组类型" :label-width="formLabelWidth">
            <el-select v-model="formGroupSet.canRefund" placeholder="请选择" disabled>
              <el-option label="线上交押金" value="1"></el-option>
              <el-option label="线下交押金" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="depositScheme" label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupSet.depositScheme" multiple placeholder="请选择">
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="packageScheme" label="套餐方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupSet.packageScheme" multiple placeholder="请选择">
              <!-- 名称/类型/价格/次数/天数 -->
              <el-option
                v-for="item in options_packageListScheme"
                :key="item.id"
                :label="item.neroTaocan"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="freeDayEnable" label="自动免费" :label-width="formLabelWidth">
            <el-switch v-model="formGroupSet.freeDayEnable" active-text="自动" inactive-color="#999">

            </el-switch>
          </el-form-item>

          <el-form-item prop="freeDay" :label-width="formLabelWidth">
            新用户自动免费
            <el-input-number
              v-model="formGroupSet.freeDay"
              :disabled="!formGroupSet.freeDayEnable"
              size="mini"
              :min="0"
              :max="100"
              >
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
import {mapState} from 'vuex';

export default {
  name:'FormGroupSet',
  props:['code','name','deposits','packages','type','freeDay'],
  data:function(){
    return ({
      rules:{
        name:[
          {required:true,message:'群组名称不能为空',trigger:'blur'},
          {pattern:/^.{1,10}$/,message:'必须是1到10个汉字，字母，数字或符号组合',trigger:'blur'}
        ],
        freeDay:[
          {required:true,message:'请输入',trigger:'blur'},
          {type:'integer',message:'请输入一个整数',trigger:'blur'}
        ],
        depositScheme:[
          {required:true,message:'请选择一个或多个押金方案',trigger:'change'}
        ],
        packageScheme:[
          {required:true,message:'请选择一个或多个套餐方案',trigger:'change'}
        ]
      },
      formGroupSet:{
        name:'',
        canRefund:'',
        depositScheme:[],
        packageScheme:[],
        groupCode:-1,
        freeDayEnable:false,
        freeDay:0,
        agentId:window.localStorage.agentid
      },
      options_depositListScheme: [],
      options_packageListScheme: [],
      loading:false,

      formLabelWidth:'85px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    computedFreeDay:function(){
      var computedFreeDay=0;
      if(this.formGroupSet.freeDayEnable===true){
        computedFreeDay=this.formGroupSet.freeDay;
      }
      return computedFreeDay;
    }
  },
  watch:{
    'modalStore.groupSet':function(val){
      if(val){
        this.formGroupSet.name=this.name;
        this.formGroupSet.canRefund=this.type+'';
        this.formGroupSet.depositScheme=this.deposits?this.deposits.map(function(v){return window.Number(v);}):[];
        this.formGroupSet.packageScheme=this.packages?this.packages.map(function(v){return window.Number(v);}):[];
        this.formGroupSet.groupCode=this.code;
        this.formGroupSet.freeDayEnable=Boolean(this.freeDay);
        this.formGroupSet.freeDay=this.freeDay;
      }
    }
  },
  methods:{
    fetchOptionsScheme:function(type){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:null
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:969
      };
      vueThis.$rqs(vueThis.$yApi[type],function(objRps){
        if(type==='depositListScheme'){
          vueThis.options_depositListScheme=objRps.result.list;
        }
        if(type==='packageListScheme'){
          vueThis.options_packageListScheme=objRps.result.list;
        }
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(v.duration!==undefined){
            var dORe=v.duration+'天';
            if(v.duration==='' || v.duration==='─'){
              dORe=v.expirationDate.replace(/-/,'');
            }
            v.neroTaocan=`${v.name} / ${['月套卡','次套卡','免费套餐'][v.type]} / ¥${v.price} / ${v.count}次 / ${dORe}`;
            return (v);
          }
        }
      });
    },
    handleCancel:function(){
      this.$refs['formGroupSet'].resetFields();
      this.$store.commit('hideGroupSet');
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          var sendData={
            name:vueThis.formGroupSet.name,
            depositScheme:vueThis.formGroupSet.depositScheme,
            packageScheme:vueThis.formGroupSet.packageScheme,
            agentId:window.localStorage.agentid,
            cityCode:0,
            freeDay:vueThis.computedFreeDay,
            groupCode:vueThis.formGroupSet.groupCode
          };
          vueThis.loading=true;
          vueThis.$rqs(vueThis.$yApi.groupSet,function(){
            vueThis.$store.commit('hideGroupSet');
            vueThis.$store.commit('showBaseStatus');
          },{
            objSendData:sendData
          });
        }
      });

    }

  },  //methods
  created:function(){
    this.fetchOptionsScheme('depositListScheme');
    this.fetchOptionsScheme('packageListScheme');
  }

};
</script>

<style lang="css" scoped>

</style>
