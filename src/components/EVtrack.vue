<template lang="html">
  <div class="e_vtrack">
    <!-- 面包泶 -->
    <div class="im_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/evs/1' }">车辆管理</el-breadcrumb-item>
        <el-breadcrumb-item>电动车轨迹</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 髙德地图 -->
    <div class="a_map">
      <h3 class="title">电动车轨迹</h3>

      <el-row>
        <el-col :span="6">
          <div class="condition">
            <el-form label-position="top" label-width="80px" :model="formLabelAlign" size="small">
              <el-form-item label="电动车SN">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="日期">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item class="btn_wrap">
                <el-button type="primary" @click="openFullScreen" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
                <el-button type="">最近20天</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="map">
            <!-- amap -->
            <MapTrack />
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import MapTrack from './MapTrack';

export default {
  name:'EVtrack',
  data:function(){
    return ({
      formLabelAlign: {
        name: '',
        region: ''
      },
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
  components:{
    MapTrack
  }
};
</script>

<style lang="css" scoped>
.im_breadcrumb{
  background: #fff;
  margin-left: -20px;
  margin-right: -20px;
  margin-top: -19px;
  padding:20px 40px;
}
.a_map{
  background: #FFF;
  margin-top: 20px;
}

.condition{
  padding:0 20px;
}
/* .btn_wrap{
  margin-top:30px;
} */
.map{
  background: #aaa;
  min-height: calc(100vh - 60px - 60px - 20px - 50px - 20px - 50px);
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
