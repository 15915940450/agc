<template lang="html">
  <div :class="{map_track:true, full:isFull}">

    <div class="table_wrap-search">
      <el-date-picker
        v-model="se"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      
      <el-button @click="resetSearch()" class="table_wrap-btn_reset" type="warning">重置</el-button>
      <el-button type="info" @click="track20()">最近20天</el-button>
      <el-button type="danger" @click="full()">
        <span v-show="!isFull">全屏</span>
        <span v-show="isFull">退出全屏</span>
      </el-button>
    </div>

    <div id="a-map"></div>
    <h5 class="no_data" v-if="point.length">无轨迹记录。</h5>
  </div>
</template>

<script>
var map;
var pathSimplifierIns;

export default {
  name:'MapTrack',
  data:function(){
    return ({
      se:'',
      scooterId:'',
      isFull:false,
      point:[]
    });
  },
  methods:{
    amap:function(){
      var vueThis=this;
      map = new AMap.Map('a-map',{
        mapStyle:'amap://styles/whitesmoke',
        zoom: 17
      });
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.OverView({isOpen:true}));
      });
      AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
        // vueThis.callMethod('track',[PathSimplifier]);
        vueThis.track(PathSimplifier);
      });
    },
    track:function(PathSimplifier){
      pathSimplifierIns=new PathSimplifier({
        zIndex:100,
        map:map,
        getPath:function(pathData){ //pathIndex
          return pathData.path;
        },
        getHoverTitle: function(pathData, pathIndex, pointIndex) {
          // console.log(pathData);
          if(pointIndex===0){
            return '起点：'+pathData.startPlaceName;
          }
          if(pointIndex===pathData.path.length-1){
            return '终点：'+pathData.endPlaceName;
          }
          if (pointIndex >= 0) {
            return '点:' + (pointIndex+1) + '/' + pathData.path.length;
          }
          return pathData.name + '，点数量' + pathData.path.length;
        },
        renderOptions: {
          startPointStyle:{
            radius:5,
            fillStyle:'rgba(255,255,255,1)',
            strokeStyle:'rgba(8,161,144,1)',
            lineWidth:3
          },
          endPointStyle:{
            radius:3,
            fillStyle:'#999',
            strokeStyle:'#666',
            lineWidth:2
          },
          pathLineStyle: {
            strokeStyle: 'rgba(8,161,144,1)',
            lineWidth: 5,
            dirArrowStyle: true
          }
        }
      });
      //======================================这里构建两条简单的轨迹，仅作示例
      pathSimplifierIns.setData(null);
      // pathSimplifierIns.setData(null);
    },
    setData:function(data){
      //console.log(data);
      if(data.result.points.length===0){
        pathSimplifierIns.setData(null);
      }else{
        // 中控轨迹
        //console.log(data.result.points);
        var arrPath=[];
        // $.each(data.result.points,function(index,v){
        //   arrPath[index]=v.split(',');
        // });
        //console.log(arrPath);

        var dataSet=[{
          name:'中控轨迹',
          path:arrPath
        }];

        pathSimplifierIns.setData(dataSet);
      }
    },
    resetSearch:function(){},
    track20:function(){},
    full:function(){
      this.isFull=!this.isFull;
    }

  },
  mounted:function(){
    this.amap();
  }
};
</script>

<style lang="css" scoped>
.map_track.full{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: ;
}
.map_track.full #a-map{
  min-height: calc(100vh - 50px);
}
.no_data{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFF;
  font-weight: 500;
}
</style>
