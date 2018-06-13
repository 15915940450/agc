<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="设置免费天数"
      :visible.sync="modalStore.setFreeDay"
      width="350px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formSetFreeDay" :rules="rules" ref="form">
          
          <el-form-item label="分配人数" :label-width="formLabelWidth">
            <span class="total_select">
              {{formSetFreeDay.userIDs.length}}
            </span>
          </el-form-item>
          <el-form-item label="剩余天数" :label-width="formLabelWidth">
            <span class="total_select">
              200天
            </span>
          </el-form-item>

          <el-form-item label="分配天数" :label-width="formLabelWidth" prop="freeDay">
            <el-input-number 
              v-model="formSetFreeDay.freeDay" 
              :min="1" 
              :max="9999" 
              @input.native="handleIN"
              >
            </el-input-number>
            （天/人）
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.setFreeDay = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('form')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'FormSetFreeDay',
  props:['arrIDs'],
  data:function(){
    return ({
      loading:false,
      formSetFreeDay:{
        userIDs:[],
        freeDay:1
      },
      rules:{
      },
      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.setFreeDay':function(val){
      if(val){
        this.formSetFreeDay.userIDs=this.arrIDs;
        this.formSetFreeDay.freeDay=1;
      }
    }
  },
  methods:{
    handleIN:function(ev){
      this.formSetFreeDay.freeDay=ev.target.value;
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          vueThis.loading=true;
          var sendData={
            userIDs:vueThis.formSetFreeDay.userIDs.toString(),
            freeDay:vueThis.formSetFreeDay.freeDay
          };
          vueThis.$rqs(vueThis.$yApi.setFreeDay,function(objRps){
            vueThis.$store.commit('hideSetFreeDay');
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
