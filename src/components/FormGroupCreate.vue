<template lang="html">
  <div class="modal_wrap">
    <el-dialog
      title="创建群组"
      :visible.sync="modalStore.groupCreate"
      width="400px"
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
              <el-option
                v-for="item in optionsDepositScheme"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="套餐方案" :label-width="formLabelWidth">
            <el-select v-model="formGroupCreate.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- 用户手机号,城市,用户群组,返还金额 -->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalStore.groupCreate = false">取 消</el-button>
        <el-button type="primary" @click="modalStore.groupCreate = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapState} from 'vuex';

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
      optionsDepositScheme: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      optionsPackageScheme: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],

      formLabelWidth:'70px'
    });
  },
  computed:{
    ...mapState(['modalStore'])
  }
};
</script>

<style lang="css" scoped>
</style>
