<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="创建群组"
      :visible.sync="modalStore.groupCreate"
      width="460px"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <div class="modal_wrap-body">
        <el-form :model="formGroupCreate">
          <el-form-item label="群组名称" :label-width="formLabelWidth">
            <el-input v-model="formGroupCreate.name" auto-complete="off" placeholder="限字母、数字、汉字，不超过10个字"></el-input>
          </el-form-item>
          <el-form-item label="群组类型" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.canRefund" placeholder="请选择">
              <!-- 0不可退，1可退 -->
              <el-option label="可退押金" value="1"></el-option>
              <el-option label="不可退押金" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!-- // name	string
          // 必须
          // 群组名称
          // depositScheme	string []
          // 必须
          // 押金方案
          // item 类型: string
          //
          // packageScheme	string []
          // 必须
          // 套餐方案
          // item 类型: string
          //
          // agentId	string
          // 必须
          // 代理商ID
          // canRefund	integer
          // 必须
          // 是否可退（0不可退，1可退） -->
          <el-form-item label="押金方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.depositScheme" multiple placeholder="请选择">
              <!-- 199不限次/¥199/月卡套餐/30天/2000次 -->
              <el-option
                v-for="item in options_depositListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.deposit+' / '+item.num+'颗电池')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="套餐方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.packageScheme" multiple placeholder="请选择">
              <!-- 199不限次/¥199/月卡套餐/30天/2000次 -->
              <el-option
                v-for="item in options_packageListScheme"
                :key="item.id"
                :label="(item.name+' / ¥'+item.price+' / '+typePackage[item.type]+' / '+item.duration+'天 / '+item.count+' 次')"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 用户手机号,城市,用户群组,返还金额 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleComfirm()" :loading="loading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {urls,ajaxs} from '../api/urls.js';

export default {
  name:'BaseModalWrap',
  data:function(){
    return ({
      formGroupCreate:{
        name:'',
        canRefund:'',
        depositScheme:'',
        packageScheme:'',
        agentId:window.sessionStorage.agentid,
        region:''
      },
      typePackage:['月套卡','次套卡','免费套餐'],
      options_depositListScheme: [],
      options_packageListScheme: [],
      loading:false,

      formLabelWidth:'70px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
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
    handleCancel:function(){
      this.$store.commit('hideGroupCreate');
    },
    handleComfirm:function(){
      // /group/create groupCreate
//       name	string
// 必须
// 群组名称
// depositScheme	string []
// 必须
// 押金方案
// item 类型: string
//
// packageScheme	string []
// 必须
// 套餐方案
// item 类型: string
//
// agentId	string
// 必须
// 代理商ID
// canRefund	integer
// 必须
// 是否可退（0不可退，1可退）
      var vueThis=this;
      vueThis.loading=true;
      ajaxs.imPostJson(urls.groupCreate,sendData,function(objRps){
        console.log(objRps);
        if(objRps.code===1000){

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
