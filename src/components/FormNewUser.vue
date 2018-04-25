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
        <el-form :model="formNewUser">
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.phone" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="车牌号(SN)" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.scooterSN" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="车型" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.scooterType" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="城市" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.cityCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属群组" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.groupCode" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="红包" :label-width="formLabelWidth">
            <el-input v-model="formNewUser.giftCode" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="车类型" :label-width="formLabelWidth">
            <el-select v-model="formNewUser.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 用户手机号,城市,用户群组,返还金额 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleComfirm()">确 定</el-button>
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
        scooterType:'',
        cityCode:'',
        groupCode:'',
        giftCode:'',
        agentId:'',

        region:''
      },
      formLabelWidth:'90px',
      loading:false

    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    handleCancel:function(){
      this.$store.commit('hideNewUser');
    },
    handleComfirm:function(){
      var vueThis=this;
      var sendData={
        phone:vueThis.formNewUser.phone,
        scooterSN:vueThis.formNewUser.scooterSN,
        scooterType:vueThis.formNewUser.scooterType,
        agentId:window.sessionStorage.agentid,
        cityCode:vueThis.formNewUser.cityCode,
        giftCode:vueThis.formNewUser.giftCode,
        groupCode:vueThis.formNewUser.groupCode
      };
      // console.log(JSON.stringify(sendData));
      vueThis.loading=true;
      ajaxs.imPostJson(urls.newUser,sendData,function(objRps){
        console.log(objRps);
        vueThis.loading=false;
        if(objRps.code===1000){
          vueThis.$store.commit('hideNewUser');
          vueThis.$store.commit('showBaseStatus');
        }
      });
    }
  },  //methods
  created:function(){
  }

};
</script>

<style lang="css" scoped>

</style>
