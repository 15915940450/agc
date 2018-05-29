<template lang="html">
  <div :class="{map_track:true, full:isFull}">

    <div class="table_wrap-search">
      <span class="sn">中控SN: {{sn}}</span>
      <el-date-picker
        v-model="se"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="fetchPoints()"
        >
      </el-date-picker>
      
      <el-button @click="resetSearch()" class="table_wrap-btn_reset" type="warning">重置(今天)</el-button>
      <el-button type="info" @click="track20()">最近20天</el-button>
      <el-button type="danger" @click="full()">
        <span v-show="!isFull">全屏</span>
        <span v-show="isFull">退出全屏</span>
      </el-button>
    </div>

    <div id="a-map"></div>
    <h5 class="no_data" v-if="!point.length">
      <icon name="info"></icon>
      无轨迹记录。
    </h5>
  </div>
</template>

<script>
var map;
var pathSimplifierIns;

export default {
  name:'MapTrack',
  data:function(){
    return ({
      se:[_.dateAgo(0),_.dateAgo(0)],  //dateragne(start and end)
      scooterId:'',
      sn:'',
      isFull:false,
      point:[]
    });
  },
  methods:{
    //mounted^^^amap==>track==>fetchPoints==>setData
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
        vueThis.track(PathSimplifier);
      });
    },
    track:function(PathSimplifier){
      var vueThis=this;
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
      vueThis.fetchPoints();
    },
    resetSearch:function(){
      this.se=[_.dateAgo(0),_.dateAgo(0)];
      this.fetchPoints();
    },
    track20:function(){
      this.se=[_.dateAgo(20),_.dateAgo(0)];
      this.fetchPoints();
    },
    full:function(){
      this.isFull=!this.isFull;
    },
    fetchPoints:function(){
      var vueThis=this;
      var sendData={
        scooterId:vueThis.scooterId, //'574C545B0A13'
        startTime:vueThis.se[0].getTime(),  //1511193600000
        endTime:vueThis.se[1].getTime()+86400000
      };
      vueThis.$rqs(vueThis.$yApi.scooterTrack,function(objRps){
        //相鄰去重
        vueThis.point=_.sortedUniq(objRps.result.points);
        vueThis.setData(vueThis.point);
      },{
        objSendData:sendData
      });
    },
    setData:function(point){
      if(point.length===0){
        pathSimplifierIns.setData(null);
      }else{
        // 中控轨迹
        var arrPath=[];
        point.forEach(function(v,index){
          arrPath[index]=v.split(',');
        });
        var dataSet=[{
          name:'中控轨迹',
          path:arrPath
        }];
        pathSimplifierIns.setData(dataSet);
      }
    }
  },
  created:function(){
    this.scooterId=this.$route.params.id;
    this.sn=this.$route.query.sn;
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
  .sn{
    float: left;
    margin-left: 15px;
  }
  .no_data{
    background: red;
    padding:2px 5px;
  }
</style>
