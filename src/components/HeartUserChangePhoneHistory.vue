<template lang="html">
  <div>
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group' }">
          <small>群组管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/user/changephone' }">
          <small>修改手机</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>修改记录</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="im_snow">
      <div class="im_snow_title">
        <el-row>
          <el-col :span="6">
            <h3 class="title">修改记录</h3>
          </el-col>
          <el-col :span="18">
            <div class="title_link">
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- empty -->
    <div>
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/empty_combo_his.png" />
        <p class="im_empty_p">暂无修改记录.</p>
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex';
import TableCombo from './TableCombo.vue';
import TableCombolog from './TableCombolog.vue';

export default {
  name:'HeartUserChangePhoneHistory', /* HeartComboHistory is copy from HeartUser */
  data:function(){
    return ({
      currentTab:'combo'
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  components:{
    TableCombo,
    TableCombolog
  }
};
</script>

<style lang="css" scoped>
  .user_list{
    background: #FFF;
  }
  .table_with_tab_wrap{
    position:relative;
  }
  .tab_wrap{
    position:absolute;
    left:15px;
    top:0;
  }
</style>
