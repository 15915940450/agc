<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="分配套餐"
      :visible.sync="modalStore.setCombo"
      width="440px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formSetCombo" :rules="rules" ref="form">

          <el-form-item label="人数" :label-width="formLabelWidth">
            <span class="total_select">
              {{formSetCombo.userIDs.length}}
            </span>
          </el-form-item>
          <el-form-item label="套餐方案" :label-width="formLabelWidth" prop="packageID">
            <el-select v-model="formSetCombo.packageID" placeholder="请选择">
              <el-option
                v-for="item in options_packageListScheme"
                :key="item.id"
                :label="item.neroTaocan"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.setCombo = false">取 消</el-button>
        <el-button type="primary" @click="handleComfirm('form')" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// this is demo file for submit form in modal
import {mapState} from 'vuex';

export default {
  name:'FormSetCombo',
  props:['arrIDs'],
  data:function(){
    return ({
      loading:false,
      formSetCombo:{
        userIDs:[],
        packageID:'',
        groupCode:this.$route.params.groupcode
      },
      rules:{
        packageID:[
          {required:true,message:'请选择套餐方案',trigger:'blur'}
        ]
      },
      typePackage:['月套卡','次套卡','免费套餐'],
      options_packageListScheme: [],
      formLabelWidth:'80px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  },
  watch:{
    'modalStore.setCombo':function(val){
      if(val){
        this.fetchOptionsScheme('packageListScheme');
        this.formSetCombo.userIDs=this.arrIDs;
        this.formSetCombo.packageID='';
        // _.logErr(this.arrIDs.toString());
      }
    }
  },
  methods:{
    fetchOptionsScheme:function(type){
      var vueThis=this;
      var advancedParam=JSON.stringify({
        groupCode:vueThis.formSetCombo.groupCode,
        canAssign:1
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
              dORe=v.expirationDate && v.expirationDate.replace(/-/gi,'');
            }
            v.neroTaocan=`${v.name} / ${['月套卡','次套卡','免费套餐'][v.type]} / ¥${v.price} / ${v.count}次 / ${dORe}`;
            return (v);
          }
        }
      });
    },
    handleComfirm:function(refName){
      var vueThis=this;
      vueThis.$refs[refName].validate((valid) => {
        if(valid){
          vueThis.loading=true;
          var sendData={
            userIDs:vueThis.formSetCombo.userIDs,
            packageID:vueThis.formSetCombo.packageID,
            groupCode:vueThis.formSetCombo.groupCode
          };
          vueThis.$rqs(vueThis.$yApi.setCombo,function(objRps){
            //批量設置套餐成功
            vueThis.$store.commit('hideSetCombo');
            vueThis.$store.commit('setNeedFetchData');

            vueThis.push2record(objRps.msg);
            // vueThis.$message({
            //   message: objRps.msg,
            //   type: 'success'
            // });
          },{
            objSendData:sendData
          });
        }
      });

    },
    push2record:function(msg){
      var vueThis=this;
      vueThis.$confirm(msg, '提示', {
        confirmButtonText: '查看',
        cancelButtonText: '好的',
        type: 'success'
      }).then(() => {
        //confirm:跳往 套餐管理-套餐记录-分配记录
        vueThis.rrPush();
      });
    },
    rrPush:function(){
      this.$router.push({
        path:'/combo/history',
        query:{
          tab:'allot'
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
