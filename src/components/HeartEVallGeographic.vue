<template lang="html">
  <div class="evallgeographic eqcalc">
    <!-- head -->
    <div class="evallgeographic_head">
      <h3 class="title with_sub">
        <span class="real_title">中控分布</span>
        <el-tooltip 
          effect="dark" 
          content="" 
          placement="bottom-start"
          >
          <div slot="content">
            中控的地理分布情况，未激活的中控无法查看地理位置。点击中控可查看中控详情
          </div>
          <span class="hint_info">
            <i class="el-icon-info"></i>
          </span>
        </el-tooltip>
        <small class="today_active">今日活跃中控： {{activeEV}}</small>
      </h3>
      
    </div>

    <!-- amap -->
    <div class="ali_amap">
      <section id="a-map"></section>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

//cluster:群聚
var map,cluster;

export default {
  name:'HeartEVallGeographic',
  data:function(){
    return ({
      container:'a-map',
      activeEV:'─',

      points:[]
    });
  },
  computed:{
    ...mapState(['agent','modalStore']),
    markers:function(){
      var markers=this.points.map(function(v){
        // _.logErr(v);
        //标记: marker===>markers
        return new AMap.Marker({
          position:[v.longitude,v.latitude],
          icon:new AMap.Icon({
            image:'./static/ev.png',
            imageSize:new AMap.Size(50,60),
            size:new AMap.Size(50,60)
          }),
          offset: new AMap.Pixel(-25,-60),
          title:'中控SN: '+v.id,
          extData:{
            id:v.id
          }
        });
      });
      return (markers);
    }
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
        this.fetchActiveEV();
      }
    }
  },
  methods:{
    //獲取一系列點坐標
    fetchData:function(){
      var vueThis=this;
      //allEVgeographic
      vueThis.$rqs(vueThis.$yApi.allEVgeographic,function(objRps){
        // objRps={
        //   'code': 1000,
        //   'result':
        //          [
        //            {
        //              'id': 'G5A1A100637',   // 中控sn
        //              'longitude': 103.940565,  //经度
        //              'latitude': 30.771326  //维度
        //            },
        //            {
        //              'id': 'G5000000033',   // 中控sn,
        //              'longitude': 114.359027,  //经度
        //              'latitude': 23.014435  //维度
        //            }
        //          ]

        // };
        vueThis.points=objRps.result;
        // points===》markers===》addCluster()
        vueThis.addCluster();
      });
      return vueThis;
    },
    //高德地圖入口
    aliAmap:function(){
      var vueThis=this;
      vueThis.initMap();
    },
    initMap:function(){
      var vueThis=this;
      map = new AMap.Map(vueThis.container, {
        resizeEnable: true,
        mapStyle:'amap://styles/whitesmoke'
      });
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.OverView({isOpen:true}));
      });
      //初始化成功，獲取坐標數據
      vueThis.fetchData();
    },
    //坐標數據獲取成功，添加聚合圖
    addCluster:function(){
      var vueThis=this;
      if (cluster) {
        cluster.setMap(null);
      }
      cluster = new AMap.MarkerClusterer(map,vueThis.markers,{
        maxZoom:17,
        gridSize:80
      });
      vueThis.handleClickEVMarker();
      
    },
    handleClickEVMarker:function(){
      var vueThis=this;
      vueThis.markers.forEach(function(v){
        AMap.event.addListener(v,'click',function(){
          var sn=v.getExtData().id;
          //前往列表頁，並搜索出sn
          // vueThis.rrPush(sn);
          vueThis.rrPushBlank(sn);
        });
      });
      return vueThis;
    },
    rrPush:function(sn){
      this.$router.push({
        path:'/evs/1',
        query:{
          sn:sn
        }
      });
    },
    rrPushBlank:function(sn){
      var vueThis=this;
      var routeData=vueThis.$router.resolve({
        query:{
          sn:sn
        },
        path:'/evs/1'
      });
      window.open(routeData.href,'_blank');
    },

    fetchActiveEV:function(){
      var vueThis=this;
      //getAtctiveEV
      vueThis.$rqs(vueThis.$yApi.getAtctiveEV,function(objRps){
        // objRps={
        //   'code': 1000,
        //   'result': 12 //活跃中控数
        // };
        vueThis.activeEV=objRps.result;
      });
    }
  },  //methods
  //注意是 mounted
  mounted:function(){
    this.aliAmap();
    this.fetchActiveEV();
  }
};
</script>

<style lang="css" scoped>
  .evallgeographic{
    background: #FFF;
  }
  .evallgeographic_head{
    background:white;
    margin:0;
  }
  .hint_info{
    color:#2490f2;
  }
  .today_active{
    margin-left: 20px;
  }
  #a-map{
    width: 100%;
    height: calc(100vh - 142px - 50px - 3px);
    min-height: 550px;
  }
</style>