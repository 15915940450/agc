<template lang="html">
  <div class="map_track">
    <div class="info">
      <p>
        <span>中控SN: {{sn}}</span>
        <span>位置: {{address}}</span>
        <span>最后刷新坐标时间: {{timeSlash}}</span>
      </p>
    </div>
    
    <div id="a-map"></div>
    <h5 class="no_data">无定位。</h5>
    
  </div>
</template>

<script>
var map;
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
    },
    arrLL:function(){
      return (this.point.split(','));
    }
  },
  methods:{
    amap:function(){
      var vueThis=this;
      map = new AMap.Map('a-map',{
        mapStyle:'amap://styles/whitesmoke',
        center:vueThis.arrLL,
        zoom: 17  //获取当前地图缩放级别,在PC上，默认取值范围为[3,18]；在移动设备上，默认取值范围为[3-19],3D地图会返回浮点数，2D视图为整数。（3D地图自V1.4.0开始支持）
      });
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.OverView({isOpen:true}));
      });
    },
    getAddressThenSet:function(){
      var vueThis=this;
      AMap.service('AMap.Geocoder',function(){
        geocoder=new AMap.Geocoder();
        geocoder.getAddress(vueThis.arrLL,function(status,result){
          // console.log(result);
          if(status==='complete' && result.info==='OK'){
            vueThis.address=result.regeocode.formattedAddress;
          }else{
            vueThis.address='获取地址失败';
          }
        });
      });
    },
    setMarker:function(){
      var vueThis=this;
      new AMap.Marker({
        map:map,
        position:vueThis.arrLL
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
    this.setMarker();
  }
};
</script>

<style lang="css" scoped>
  .info span{
    margin-left: 20px;
    margin-right: 30px;
    font-size: 13px;
    font-weight: 300;
    color: #555;
  }
</style>
