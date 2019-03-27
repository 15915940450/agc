<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="激活中控"
      :visible.sync="modalStore.EVin"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formEVin" :rules="rules" ref="formEVin">

          <el-form-item prop="scooterSN" label="中控(SN)" :label-width="formLabelWidth">
            <el-select v-model="formEVin.scooterSN" filterable placeholder="请选择">
              <el-option
                v-for="item in optionsEVs"
                :key="item.sn"
                :label="item.sn"
                :value="item.sn">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="scooterType" label="中控类型" :label-width="formLabelWidth">
            <el-radio v-model="formEVin.scooterType" label="0">新车</el-radio>
            <el-radio v-model="formEVin.scooterType" label="1">改装车</el-radio>
          </el-form-item>

          <el-form-item prop="phone" label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="formEVin.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>

          <el-form-item prop="voltage" label="电压" :label-width="formLabelWidth">
            <el-radio v-model="formEVin.voltage" label="0">60V</el-radio>
            <el-radio v-model="formEVin.voltage" label="1">48V</el-radio>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('formEVin')">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('formEVin')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'FormEVin',
  data:function(){
    return ({
      formEVin:{
        phone:'',
        voltage:'0',
        scooterSN:'',
        scooterType:'0',
        groupCode:this.$route.params.groupcode,
      },
      rules:{
        phone:[
          {type:'string',required:true,pattern:/^1\d{10}$/,message:'请输入正确的手机号码',trigger:'blur'}
        ],
        scooterType:[
          {required:true,message:'请选择',trigger:'blur'}
        ],
        voltage:[
          {required:true,message:'请选择',trigger:'blur'}
        ],
        scooterSN:[
          {required:true,message:'请选择',trigger:'blur'}
        ]
      },
      optionsEVs:[],
      formLabelWidth:'100px',
      loading:false
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    fetchEVlist:function(){
      var vueThis=this;
      var sendData={
        pageNum:1,
        pageSize:96900000
      };
      vueThis.$rqs(vueThis.$yApi.scooterList,function(objRps){
        vueThis.optionsEVs=objRps.result.list;
      },{
        objSendData:sendData
      });
    },
    handleCancel:function(refName){
      this.$refs[refName].resetFields();
      this.$store.commit('hideEVin');
    },
    handleComfirm:function(refName){
      var vueThis=this;

      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          var sendData={
            phone:vueThis.formEVin.phone,
            voltage:+vueThis.formEVin.voltage,
            scooterSN:vueThis.formEVin.scooterSN,
            scooterType:+vueThis.formEVin.scooterType,
            groupCode:vueThis.formEVin.groupCode
          };
          // console.log(JSON.stringify(sendData));
          vueThis.loading=true;
          vueThis.$rqs(vueThis.$yApi.scooterActive,function(){
            vueThis.$refs[refName].resetFields();
            vueThis.$store.commit('hideEVin');
            vueThis.$store.commit('showBaseStatus');
          },{
            objSendData:sendData
          });
        }
      });

    }
  },  //methods
  created:function(){
    this.fetchEVlist();
  }

};
</script>

<style lang="css" scoped>

</style>
