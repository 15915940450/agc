<template lang="html">
  <div class="e_v">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/evs/1' }">
          <small>中控管理</small>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <small v-if="(routeName==='MapTrack')">中控轨迹</small>
          <small v-if="(routeName==='MapGeographic')">中控定位</small>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 髙德地图 574C545B0A13 -->
    <div class="a_map">
      <div class="map">
        <!-- amap -->
        <router-view></router-view>
        <!-- <MapTrack /> -->
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:'HeartEVamap',
  data:function(){
    return ({
      formLabelAlign: {
        name: '',
        region: ''
      },
      routeName:'',
      fullscreenLoading: false
    });
  },
  methods:{
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 2000);
    }
  },
  created:function(){
    this.routeName=this.$route.name;
  }
};
</script>

<style lang="css" scoped>
  .a_map{
    background: #FFF;
  }
  .map{
    padding: 1px;
  }
</style>
