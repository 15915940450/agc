<template lang="html">
  <!-- this page is copy from heartuser -->
  <div class="component_user">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/combo' }">
          <small>套餐管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small>套餐记录</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="user_list" v-if="!modalStore.comboEmpty">
      <!--記錄表格-->
      <div class="table_with_tab_wrap">
        <div class="tab_wrap">
          <template>
            <el-tabs v-model="currentTab">
              <el-tab-pane label="套餐记录" name="combo">
              </el-tab-pane>
              <el-tab-pane label="分配记录" name="combolog">
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
        <keep-alive>
          <component
            v-bind:is="('table-'+currentTab)"
            >
          </component>
        </keep-alive>
      </div>
    </div>

    <!-- empty -->
    <div v-else>
      <div class="im_empty">
        <img class="im_empty_img" src="../assets/empty_combo_his.png" />
        <p class="im_empty_p">暂无购买记录.</p>
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex';
import TableCombo from './TableCombo.vue';
import TableCombolog from './TableCombolog.vue';

export default {
  name:'HeartComboHistory', /* HeartComboHistory is copy from HeartUser */
  data:function(){
    return ({
      currentTab:'combo'  //combo,combolog
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  components:{
    TableCombo,
    TableCombolog
  },
  created:function(){
    // console.log(this.$route.query.currentTab); //undefined
    this.currentTab=this.$route.query.currentTab || 'combo';
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
