<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="用户设置"
      :visible.sync="modalStore.setUser"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formSetUser" ref="formSetUser">

          <el-form-item prop="depositScheme" label="群组" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.groupCode" placeholder="请选择">
              <el-option
                v-for="item in optionsGroups"
                :key="item.id"
                :label="(item.name)"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="depositScheme" label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.depositScheme" multiple placeholder="请选择">
              <!-- 199不限次/¥199/月卡套餐/30天/2000次 -->
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="免费天数" :label-width="formLabelWidth">
            <el-input v-model.number="formSetUser.freeDay" auto-complete="off" placeholder="剩余可分配天数 100 天"></el-input>
          </el-form-item>
          <!-- <el-form-item label="可用电池数" :label-width="formLabelWidth">
            <el-input v-model.number="formSetUser.name" auto-complete="off" placeholder="剩余可分配电池 100 天"></el-input>
          </el-form-item> -->
          <el-form-item prop="scooterSN" label="车牌号(SN)" :label-width="formLabelWidth">
            <el-select v-model="formSetUser.scooterSN" filterable placeholder="请选择">
              <el-option
                v-for="item in optionsEVs"
                :key="item.sn"
                :label="item.sn"
                :value="item.sn">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel('formSetUser')">取 消</el-button>
        <el-button type="primary" @click="modalStore.setUser = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'FormSetUser',
  data:function(){
    return ({
      formSetUser:{
        name:'',
        region:'',
        scooterSN:'',
        freeDay:'',
        groupCode:''
      },
      optionsEVs:[],
      optionsGroups:[],
      options_depositListScheme: [],
      formLabelWidth:'100px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  methods:{
    fetchGroupList:function(){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        agentId:window.sessionStorage.agentid
      });
      var sendData={
        advancedParam:advancedParam,
        pageNum:1,
        pageSize:969
      };
      ajaxs.imGet(urls.groupList,sendData,function(objRps){
        if(objRps.code===1000){
          vueThis.optionsGroups=objRps.result.list;
        }
      });
    },
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
      ajaxs.imPostJson(urls[type],sendData,function(objRps){
        if(objRps.code===1000){
          if(type==='depositListScheme'){
            vueThis.options_depositListScheme=objRps.result.list;
          }
          if(type==='packageListScheme'){
            vueThis.options_packageListScheme=objRps.result.list;
          }
        }
      });
    },
    handleCancel:function(refName){
      this.$refs[refName].resetFields();
      this.$store.commit('hideSetUser');
    },
    fetchEVlist:function(){
      var vueThis=this;
      var sendData={
        phone:''+window.sessionStorage.agentphone,
        pageNum:1,
        pageSize:96900000
      };
      //请求地址
      ajaxs.imPostForm(urls.evsList,sendData,function(objRps){
        // console.log(objRps);
        if(objRps.code===1000){
          vueThis.optionsEVs=objRps.result.list;
        }
      });
    }
  },  //methods
  created:function(){
    this.fetchOptionsScheme('depositListScheme');
    this.fetchEVlist();
    this.fetchGroupList();
  }
};
</script>

<style lang="css" scoped>
</style>
