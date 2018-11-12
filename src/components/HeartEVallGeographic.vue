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
        <small class="today_active">今日活跃中控： 90</small>
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

//global
var map;

export default {
  name:'HeartEVallGeographic',
  data:function(){
    return ({
      container:'a-map',

      points:[]
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  methods:{
    //獲取一系列點坐標
    fetchData:function(){
      var vueThis=this;
      //allEVgeographic
      vueThis.$rqs(vueThis.$yApi.accountBaseInfo,function(objRps){
        // _.logErr(objRps)
        objRps={
          //   "code": 1000,
          //   "result":
          //        [
          //           {
          // "id": "574C547427C4",   // 中控sn
          // "longitude": 103.940565,  //经度
          // "latitude": 30.771326  //维度
          //       },
          //       {
          // "id": "574C547427C5",   // 中控sn
          // "longitude": 103.640565,  //经度
          // "latitude": 30.771326  //维度
          //       }
          //       ]

        };
        vueThis.points=objRps.result;
        // console.log(vueThis.points);
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
    }
  },  //methods
  //注意是 mounted
  mounted:function(){
    this.aliAmap();
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
  #amap_container{
    width: 100%;
    height: 600px;
  }
</style>