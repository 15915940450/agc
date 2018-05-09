<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="添加用户"
      :visible.sync="modalStore.newUser"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formNewUser" :rules="rules" ref="formNewUser">
          <el-form-item prop="phone" label="手机号码" :label-width="formLabelWidth">
            <el-input v-model.number="formNewUser.phone" auto-complete="off" placeholder="请输入手机号码"></el-input>
          </el-form-item>

          <el-form-item prop="scooterSN" label="车牌号(SN)" :label-width="formLabelWidth">
            <!-- <el-input v-model="formNewUser.scooterSN" auto-complete="off"></el-input> -->
            <el-select v-model="formNewUser.scooterSN" filterable placeholder="请选择">
              <el-option
                v-for="item in optionsEVs"
                :key="item.sn"
                :label="item.sn"
                :value="item.sn">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车型" :label-width="formLabelWidth">
            <el-radio v-model="formNewUser.scooterType" label="0">新车</el-radio>
            <el-radio v-model="formNewUser.scooterType" label="1">改装车</el-radio>
          </el-form-item>
          <!-- <el-form-item prop="cityCode" label="城市" :label-width="formLabelWidth">
            <el-select v-model="formNewUser.cityCode" filterable placeholder="请选择">
              <el-option
                v-for="item in optionsCity"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="所属群组" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.groupCode" auto-complete="off"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="红包" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.giftCode" auto-complete="off"></el-input>
          </el-form-item> -->


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('formNewUser')">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('formNewUser')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormNewUser',
  data:function(){
    return ({
      formNewUser:{
        phone:'',
        scooterSN:'',
        scooterType:'0',
        // cityCode:'',

        // giftCode:'',
        groupCode:this.$route.params.groupcode,
        agentId:window.localStorage.agentid
      },
      rules:{
        phone:[
          {type:'number',required:true,min:10000000000,max:99999999999,message:'手机号必须为11位数字',trigger:'change'}
        ],
        scooterSN:[
          {required:true,message:'请输入车牌号',trigger:'blur'}
        ]
        // cityCode:[
        //   {required:true,message:'请选择城市',trigger:'change'}
        // ]
      },
      optionsCity:[],
      optionsEVs:[],
      formLabelWidth:'100px',
      loading:false

    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    //获取城市列表，暂时没用上
    // fetchCityList:function(){
    //   var vueThis=this;
    //   ajaxs.imGet(urls.cityList,{},function(objRps){
    //     if(objRps.code===1000){
    //       vueThis.optionsCity=objRps.result.list;
    //     }
    //   });
    // },
    fetchEVlist:function(){
      var vueThis=this;
      var sendData={
        phone:''+window.localStorage.agentphone,
        pageNum:1,
        pageSize:96900000
      };
      //请求地址
      ajaxs.imPostForm(urls.evsList,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.optionsEVs=objRps.result.list;
        }else{
          vueThis.$notify.error({
            title: '提示',
            message:objRps.msg,
            offset: 50,
            duration: 5000  //0
          });
        }
      });
    },
    handleCancel:function(refName){
      this.$refs[refName].resetFields();
      this.$store.commit('hideNewUser');
    },
    handleComfirm:function(refName){
      var vueThis=this;

      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          var sendData={
            phone:vueThis.formNewUser.phone,
            scooterSN:vueThis.formNewUser.scooterSN,
            scooterType:vueThis.formNewUser.scooterType,
            agentId:window.localStorage.agentid,
            // cityCode:vueThis.formNewUser.cityCode,
            // giftCode:vueThis.formNewUser.giftCode,
            groupCode:vueThis.formNewUser.groupCode
          };
          // console.log(JSON.stringify(sendData));
          vueThis.loading=true;
          ajaxs.imPostJson(urls.newUser,sendData,function(objRps){
            // console.log(objRps);
            vueThis.loading=false;
            if(objRps.code===1000){
              vueThis.$store.commit('hideNewUser');
              vueThis.$store.commit('showBaseStatus');
            }else{
              vueThis.$notify.error({
                title: '提示',
                message:objRps.msg,
                offset: 50,
                duration: 5000  //0
              });
            }
          });
        }
      });

    }
  },  //methods
  created:function(){
    // console.log(this.$route.params);
    this.fetchEVlist();
  }

};
</script>

<style lang="css" scoped>

</style>
