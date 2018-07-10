<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="设置押金"
      :visible.sync="modalStore.setDeposit"
      width="440px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formSetDeposit" :rules="rules" ref="form">

          <el-form-item label="人数" :label-width="formLabelWidth">
            <span class="total_select">
              {{formSetDeposit.userIDs.length}}
            </span>
          </el-form-item>
          <el-form-item label="押金方案" :label-width="formLabelWidth" prop="depositID">
            <el-select v-model="formSetDeposit.depositID" placeholder="请选择">
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.setDeposit = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('form')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'FormSetDeposit',
  props:['arrIDs'],
  data:function(){
    return ({
      loading:false,
      formSetDeposit:{
        userIDs:[],
        depositID:'',
        groupCode:this.$route.params.groupcode
      },
      rules:{
        depositID:[
          {required:true,message:'请选择押金方案',trigger:'blur'}
        ]
      },
      options_depositListScheme: [],
      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.setDeposit':function(val){
      if(val){
        this.fetchOptionsScheme('depositListScheme');
        this.formSetDeposit.userIDs=this.arrIDs;
        this.formSetDeposit.depositID='';
      }
    }
  },
  methods:{
    fetchOptionsScheme:function(type){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:vueThis.formSetDeposit.groupCode
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
        objSendData:sendData
      });
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          vueThis.loading=true;
          var sendData={
            userIDs:vueThis.formSetDeposit.userIDs,
            depositID:vueThis.formSetDeposit.depositID,
            groupCode:vueThis.formSetDeposit.groupCode
          };
          vueThis.$rqs(vueThis.$yApi.setDeposit,function(objRps){
            vueThis.$store.commit('hideSetDeposit');
            vueThis.$store.commit('setNeedFetchData');
            vueThis.$message({
              message: objRps.msg,
              type: 'success'
            });
          },{
            objSendData:sendData
          });
        }
      });
    }
  },
  created:function(){

  }
};
</script>

<style lang="css" scoped>
  .total_select{
    color:mediumturquoise;
  }
</style>
