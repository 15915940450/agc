<template lang="html">
  <div class="map_track">
    <div id="a-map"></div>
    <h5 class="no_data">无定位。</h5>
    <div class="info">
      <p>
        <span>中控SN: {{sn}}</span>
        <span>位置: {{address}}</span>
        <span>最后刷新坐标时间: {{timeSlash}}</span>
      </p>
    </div>
  </div>
</template>

<script>
var map;
var pathSimplifierIns;
var geocoder; //地址与经纬度

export default {
  name:'MapGeographic',
  data:function(){
    return ({
      sid:'',
      address:'',
      sn:'',
      point:'',
      time:0
    });
  },
  computed:{
    timeSlash:function(){
      return (_.toSlash(new Date(window.Number(this.time))));
    }
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
    getAddressThenSet:function(){
      var vueThis=this;
      var arrLL=vueThis.point.split(',');
      AMap.service('AMap.Geocoder',function(){
        geocoder=new AMap.Geocoder();
        geocoder.getAddress(arrLL,function(status,result){
          // console.log(result);
          if(status==='complete' && result.info==='OK'){
            vueThis.address=result.regeocode.formattedAddress;
          }else{
            vueThis.address='获取地址失败';
          }
        });
      });
    }



  },
  created:function(){
    this.sid=this.$route.params.id;
    this.sn=this.$route.query.sn;
    this.point=this.$route.query.ll;
    this.time=this.$route.query.time;
    this.getAddressThenSet();
  },
  mounted:function(){
    this.amap();
    //"113.969660,22.840703"
  }
};
</script>

<style lang="css" scoped>
.map_track{
  position: relative;
}
#a-map{
  min-height: calc(100vh - 142px - 45px - 50px - 3px);
}
.no_data{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFF;
  font-weight: 500;
}
.info span{
  margin-left: 20px;
  margin-right: 30px;
  font-size: 13px;
  font-weight: 300;
  color: #555;
}
</style>
