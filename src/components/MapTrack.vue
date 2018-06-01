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
        >
      </el-date-picker>
      
      <el-button @click="resetSearch()" class="table_wrap-btn_reset" type="warning">重置(今天)</el-button>
      <el-button type="info" @click="track20()">最近20天</el-button>
      <el-button type="danger" @click="full()">
        <span v-show="!isFull">全屏</span>
        <span v-show="isFull">退出全屏</span>
      </el-button>
    </div>

    <div id="a-map" v-loading="loadingTrack"></div>
    <h5 class="no_data" v-if="noData && !loadingTrack">
      <icon name="info"></icon>
      无轨迹记录。
    </h5>
  </div>
</template>

<script>
var map;
var objPathSimplifier;
var arrPathColors=[
  '#dc3912',
  '#ff9900',
  '#109618',
  '#990099',
  '#0099c6',
  '#dd4477',
  '#66aa00',
  '#b82e2e',
  '#316395',
  '#994499',
  '#22aa99',
  '#aaaa11',
  '#6633cc',
  '#e67300',
  '#8b0707',
  '#651067',
  '#329262',
  '#5574a6',
  '#3b3eac'
];
var hoverColor='#796eff';

export default {
  name:'MapTrack',
  data:function(){
    return ({
      se:[_.dateAgo(0),_.dateAgo(0)],  //dateragne(start and end)
      scooterId:'',
      sn:'',
      isFull:false,
      thePaths:[
        // {
        //   name:'testPath',
        //   startPlaceName:'beijing',
        //   endPlaceName:'guangzhou',
        //   path:[
        //     [113.144388,22.923772],
        //     [113.045312,22.613739],
        //     [113.846596,22.663501],
        //     [113.845935,22.610040],
        //     [113.847583,22.598354]
        //   ]
        // },
        {
          name:'',
          startPlaceName:'',
          endPlaceName:'',
          path:[]
        }
      ],
      loadingTrack:true
    });
  },
  computed:{
    noData:function(){
      return(!this.thePaths[0].path.length);
    }
  },
  watch:{
    se:{
      // deep:true,
      handler:function(){
        // _.logErr(val);
        this.fetchThePaths();
      }
    }
  },
  methods:{
    fetchThePaths:function(){
      var vueThis=this;
      vueThis.loadingTrack=true;
      var sendData={
        // scooterId:'574C545B0A13',
        scooterId:vueThis.scooterId,
        // startTime:1511193600000,
        startTime:vueThis.se[0].getTime(),
        // endTime:1511193600000+86400000
        endTime:vueThis.se[1].getTime()+86400000
      };
      vueThis.$rqs(vueThis.$yApi.scooterTrack,function(objRps){
        vueThis.loadingTrack=false;
        //clear the map
        map.clearMap();
        //相鄰去重( here we supose only one path << thilina)
        vueThis.thePaths[0].path=(_.sortedUniq(objRps.result.points)).map(function(v){
          return v.split(',');
        });
        // _.logErr(vueThis.thePaths[0].path);
        //hasData then pathandmarker
        if(!vueThis.noData){
          objPathSimplifier.setData(vueThis.thePaths);
          vueThis.addSimpleMarker();
        }
      },{
        objSendData:sendData
      });
    },
    //mounted^^^amap==>track==>fetchThePaths==>objPathSimplifier.setData==>addSimpleMarker
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
      objPathSimplifier=new PathSimplifier({
        zIndex:99,
        map:map,
        getPath:function(pathData){ //pathIndex
          return pathData.path;
        },
        getHoverTitle: function(pathData, pathIndex, pointIndex){
          // _.logErr(pathData);
          if(pointIndex===0 && pathData.startPlaceName){
            return '起点：'+pathData.startPlaceName;
          }
          if(pointIndex===pathData.path.length-1 && pathData.endPlaceName){
            return '终点：'+pathData.endPlaceName;
          }
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
            lineWidth: 5,
            dirArrowStyle: true
          },
          getPathStyle:function(pathItem){
            return {
              pathLineStyle:{
                strokeStyle:arrPathColors[pathItem.pathIndex]
              }
            };
          },
          pathLineHoverStyle:{
            strokeStyle:hoverColor
          }
        }
      });
      //======================================这里构建两条简单的轨迹，仅作示例
      objPathSimplifier.setData(null);
      vueThis.fetchThePaths();
    },
    resetSearch:function(){
      this.se=[_.dateAgo(0),_.dateAgo(0)];
    },
    track20:function(){
      this.se=[_.dateAgo(20),_.dateAgo(0)];
    },
    full:function(){
      this.isFull=!this.isFull;
    },

    addSimpleMarker:function(){
      var vueThis=this;
      AMapUI.loadUI(['overlay/SimpleMarker'],function(SimpleMarker){
        var iconTheme='fresh';
        var iconStyles=SimpleMarker.getBuiltInIconStyles(iconTheme);
        vueThis.thePaths.forEach(function(v){
          // _.logErr(v);

          new SimpleMarker({
            iconTheme:iconTheme,
            iconStyle:iconStyles[9],
            iconLabel:{
              innerHTML:'起',
              style:{
                color:'#FFF'
              }
            },
            map:map,
            position:v.path[0]
          });

          new SimpleMarker({
            iconTheme:iconTheme,
            iconStyle:iconStyles[6],
            iconLabel:{
              innerHTML:'終',
              style:{
                color:'#FFF'
              }
            },
            map:map,
            position:_.last(v.path)
          });

        });
      }); //loadUI
    }
    
  },  //methods
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
