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
              {{total_select}}
            </span>
          </el-form-item>
          <el-form-item label="剩余天数" :label-width="formLabelWidth">
            <span class="total_select">
              {{freeDayAfter}} 天
            </span>
          </el-form-item>

          <el-form-item label="分配天数" :label-width="formLabelWidth" prop="freeDay">
            <el-input-number
              v-model="formSetFreeDay.freeDay"
              :max="max"
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
      rules:{
        freeDay:[
          {required:true,message:'请输入',trigger:'blur'},
          {type:'integer',message:'请输入一个整数',trigger:'blur'}
        ]
      },
      loading:false,
      formSetFreeDay:{
        userIDs:[],
        freeDay:1
      },
      freeDayAvailable:0,
      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore']),
    total_select:function(){
      return (this.formSetFreeDay.userIDs.length);
    },
    max:function(){
      var maxValue = Math.floor(this.freeDayAvailable/this.total_select);
      return (maxValue<61?maxValue: 60);
    },
    freeDayAfter:function(){
      return (this.freeDayAvailable-this.formSetFreeDay.freeDay*this.total_select);
    }
  },
  watch:{
    'modalStore.setFreeDay':function(val){
      if(val){
        this.fetchFreeDay();
        this.formSetFreeDay.userIDs=this.arrIDs;
        this.formSetFreeDay.freeDay=1;
      }
    }
  },
  methods:{
    fetchFreeDay:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userQuery,function(objRps){
        vueThis.freeDayAvailable=objRps.result.freeDays;
      });
    },
    handleIN:function(ev){
      this.formSetFreeDay.freeDay=ev.target.value;
    },
    handleComfirm:_.debounce(function(refName) {
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          vueThis.loading=true;
          var sendData={
            userIDs:vueThis.formSetFreeDay.userIDs,
            freeDay:vueThis.formSetFreeDay.freeDay
          };
          vueThis.$rqs(vueThis.$yApi.setFreeDay,function(objRps){
            vueThis.$store.commit('hideSetFreeDay');
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
    }, 1000)
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
