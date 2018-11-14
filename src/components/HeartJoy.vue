<template lang="html">
  <div class="component_joy">
    <h3 class="title">
      <span class="title_span">数据看板</span>
      <el-popover
        placement="right"
        width="330"
        trigger="hover"
        >
        <div>
          1、数据看板目前为免费试用版本，试用期间可能随时关闭此功能；<br />
          2、试用期间可能存在部分数据不准确、显示异常等问题，欢迎将问题反馈给我们；<br />
          3、试用规则的最终解释权属e换电运营团队所有。
        </div>
        <el-button type="text" slot="reference">
          免责声明
        </el-button>
      </el-popover>
    </h3>

    <!-- 四個卡片 -->
    <el-row :gutter="10">
      <el-col :span="6" v-for="(card,index) in arrCard" :key="index">
        <el-card class="box-card">
          <div>
            <h3>
              {{card.h3}}
              <el-tooltip 
                effect="dark" 
                placement="top-end"
                >
                <div slot="content" v-html="card.tooltipContent"></div>
                <i class="el-icon-info gray_info"></i>
              </el-tooltip>
            </h3>
            <h2 class="data_h2">{{card.dataH2}}</h2>
            <!-- 脚 -->
            <el-row :gutter="8">
              <el-col :span="12">
                <div>
                  <span class="key_span">{{card.footSpanLeftKey}}</span>
                  <span class="value_span">{{card.footSpanLeftValue}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <span class="key_span">{{card.footSpanRightKey}}</span>
                  <span class="value_span">{{card.footSpanRightValue}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!-- for col end -->
    </el-row>

    <!-- ec -->
    <el-card class="ec_card">
      <div slot="header" class="clearfix">
        <span class="title">用户数据</span>
        <small class="user_small">
          用户数 
          <strong>962</strong>
        </small>
        <!-- 按鈕組：日，月 -->
        <el-button-group class="type_group">
          <el-button size="mini" type="primary">按日查看</el-button>
          <el-button size="mini" plain>按月查看</el-button>
        </el-button-group>
      </div>
      <section id="ec_main">
        
      </section>
    </el-card>
  </div>
</template>

<script>
import {mapState} from 'vuex';

var objEcharts=null;
var arrTitles=['新增用戶','退出用戶','净增用戶'];
var arrLabels=[]; //["6/1","6/2","6/3","6/4","6/5","6/6","6/7"]
var arrKeys=['newIncreate','quit','netIncreate'];
var arrValues=[]; //[{"value":[12,12,12,12,0,12,12]},{"value":[1,1,1,1,0,1,1]},{"value":[34,34,34,34,0,34,34]}]

export default {
  name:'HeartJoy',
  data:function(){
    return ({
      arrCard:[
        {
          h3:'押金用户数',
          tooltipContent:'目前拥有押金的用户数',
          dataH2:'9,102,928',
          footSpanLeftKey:'单电用户',
          footSpanLeftValue:'102928',
          footSpanRightKey:'双电用户',
          footSpanRightValue:'102928'
        },{
          h3:'虚拟电池数',
          tooltipContent:'通过充值押金获得的虚拟电池，在分配<br />押金方案时消耗相应的数量。申请退押<br />金会暂时冻结相应的电池数量。',
          dataH2:'─',
          footSpanLeftKey:'已分配',
          footSpanLeftValue:'─',
          footSpanRightKey:'可分配',
          footSpanRightValue:'─'
        },{
          h3:'免费天数',
          tooltipContent:'目前可分配和已分配的天数之和',
          dataH2:'─',
          footSpanLeftKey:'已分配',
          footSpanLeftValue:'─',
          footSpanRightKey:'可分配',
          footSpanRightValue:'─'
        },{
          h3:'中控数',
          tooltipContent:'已录入的所有中控总数',
          dataH2:'─',
          footSpanLeftKey:'已绑定',
          footSpanLeftValue:'─',
          footSpanRightKey:'未绑定',
          footSpanRightValue:'─'
        }
      ],
      idEC:'ec_main'
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
    fetchData:function(){
      var vueThis=this;
      //ecUser
      vueThis.$rqs(vueThis.$yApi.testApi,function(objRps){
        objRps={
          'code': 1000,
          'result': {
            'userNum':421311,   //用户数  
            'userNumInfo':[
              {
                'day': '6/1',  //哪一天 6/5   6月5号
                'month':'12月', // 哪一个月
                'newIncreate':12,  // 新增用户数
                'quit':1,  //退出用户数
                'netIncreate':34   // 净增用户数
              },
              {
                'day': '6/2',  //哪一天 6/5   6月5号
                'month':'12月', // 哪一个月
                'newIncreate':12,  // 新增用户数
                'quit':1,  //退出用户数
                'netIncreate':34   // 净增用户数
              },
              {
                'day': '6/3',  //哪一天 6/5   6月5号
                'month':'12月', // 哪一个月
                'newIncreate':12,  // 新增用户数
                'quit':1,  //退出用户数
                'netIncreate':34   // 净增用户数
              },
              {
                'day': '6/4',  //哪一天 6/5   6月5号
                'month':'12月', // 哪一个月
                'newIncreate':12,  // 新增用户数
                'quit':1,  //退出用户数
                'netIncreate':34   // 净增用户数
              },
              {
                'day': '6/5',  //哪一天 6/5   6月5号
                'month':'12月', // 哪一个月
                'newIncreate':0,  // 新增用户数
                'quit':0,  //退出用户数
                'netIncreate':0   // 净增用户数
              },
              {
                'day': '6/6',  //哪一天 6/5   6月5号
                'month':'12月', // 哪一个月
                'newIncreate':12,  // 新增用户数
                'quit':1,  //退出用户数
                'netIncreate':34   // 净增用户数
              },
              {
                'day': '6/7',  //哪一天 6/5   6月5号
                'month':'12月', // 哪一个月
                'newIncreate':12,  // 新增用户数
                'quit':1,  //退出用户数
                'netIncreate':34   // 净增用户数
              }
            ]
          }
        };
        // console.log(objRps);
        //labels橫坐標
        arrLabels=objRps.result.userNumInfo.map(function(v){
          return (v.day);
        });

        // _.logErr(arrLabels);

        //value值(series)
        arrValues=arrKeys.map(function(v){
          var arr=objRps.result.userNumInfo.map(function(obj){
            return (obj[v]);
          });
          return ({
            value:arr  //array
          });
        });

        // _.logErr(arrValues);

        vueThis.setE();
      }); //請求
    },
    //ec入口
    ec:function(){
      this.initE();
      return this;
    },
    initE:function(){
      var vueThis=this;
      var eleE=document.getElementById(vueThis.idEC);
      objEcharts=window.echarts.init(eleE,{renderer:'svg'});
      objEcharts.setOption(vueThis.iliECoption());
      return vueThis;
    },
    iliECoption:function(){
      return ({
        grid: {
          top:160,
          bottom:60,
          left:60,
          right:90
        },
        tooltip:{
          trigger:'axis'
        },
        legend:{
          data:arrTitles,
          x:'right',
          y:12,
          padding:[10,150,5,5],
          selectedMode:'multiple'
        },
        toolbox:{
          show:false
        },
        animation:false,
        xAxis:{
          type:'category',
          boundaryGap:false,
          axisLine : {    // 轴线
            show:false
          },
          axisTick:{
            length:2,
            interval:0
          },
          axisLabel :{
            rotate:-15,
            margin:12
          },
          data:[]  //ajax
        },
        yAxis:{
          type:'value',
          splitLine:{
            lineStyle:{
              color:['#EEE']
            }
          },
          axisLine : {    // 轴线
            show:false
          },
          axisLabel:{
            formatter:'{value}'
          }
        },
        series:(function(){
          var arr=[];
          for(var i=0;i<arrTitles.length;i++){
            arr[i]={
              name:arrTitles[i],
              type:'line',
              symbol:'circle',
              symbolSize:13,
              showAllSymbol:true,
              itemStyle:{
                normal:{
                  borderWidth:2,
                  borderColor:'#FFF'
                }
              },
              data:[]
            };
          }
          return arr;
        })()
      });
    },
    setE:function(){
      var vueThis=this;
      objEcharts.setOption({
        xAxis:{
          data:arrLabels
        },
        series:(function(){
          var arr=[];
          for(var i=0;i<arrTitles.length;i++){
            arr[i]={
              name:arrTitles[i],
              data:arrValues[i].value
            };
          }
          return arr;
        })()  //series
      });
      return vueThis;
    }
  },
  created:function(){
    // this.fetchData();
  }, //created
  mounted:function(){
    this.ec().fetchData();
  }
};
</script>

<style lang="css" scoped>
  .title_span{
    margin-right: 20px;
  }
  .gray_info{
    color: #fc8989;
    float: right;
    margin-top: 4px;
  }
  .data_h2{
    text-align: left;
    margin:8px 0;
    font-size: 29px;
    color: #FF8933;
  }
  .key_span{
    display: block;
    color: #999;
    font-size: 12px;
    margin-top:8px;
  }
  .value_span{
    display: block;
    color: #555;
    font-size: 1.3em;
    margin-top:8px;
  }
  .type_group{
    float: right;
  }
  .user_small{
    margin-left: 20px;
  }
  .ec_card{
    margin-top:10px;
  }
  #ec_main{
    width: 100%;
    height: 400px;
  }
</style>
