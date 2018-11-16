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
          试用声明
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
            <h2 class="data_h2">{{card.dataH2 | toK}}</h2>
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
          <strong>{{userNum}}</strong>
        </small>
        <!-- 按鈕組：日，月 -->
        <el-button-group class="type_group">
          <el-button 
            size="mini" 
            :type="buttonColor0" 
            :plain="isPlain0" 
            @click="handleClickType(0)"
            :disabled="!isPlain0"
            >
            按日查看
          </el-button>
          <el-button 
            size="mini" 
            :type="buttonColor1" 
            :plain="isPlain1" 
            :disabled="isPlain0"
            @click="handleClickType(1)"
            >
            按月查看
          </el-button>
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

//最重要的arrLabels，arrValues
var arrLabels=[]; 
/*
["6/1","6/2","6/3","6/4","6/5","6/6","6/7"]
*/
var arrValues=[];
/*
[
{"value":[12,12,12,12,0,12,12]},
{"value":[1,1,1,1,0,1,1]},
{"value":[34,34,34,34,0,34,34]}
]
*/
var arrEC=[
  {
    title:'新增用戶',
    key:'newIncreate',
    stack:'净',
    color:'#018ECB'
  },{
    title:'退出用戶',
    key:'quit',
    stack:'净',
    color:'#CC2800'
  },{
    title:'净增用戶',
    key:'netIncreate',
    stack:'',
    color:'#00CC66'
  }
];

export default {
  name:'HeartJoy',
  data:function(){
    return ({
      arrCard:[
        {
          h3:'押金用户数',
          tooltipContent:'目前拥有押金的用户数',
          dataH2:'─',  //9,102,928
          footSpanLeftKey:'单电用户',
          footSpanLeftValue:'─',
          footSpanRightKey:'双电用户',
          footSpanRightValue:'─'
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
      idEC:'ec_main',
      userNum:'─',
      type:0  //type===0 日
    });
  },
  computed:{
    ...mapState(['agent','modalStore']),
    buttonColor0:function(){
      var color='';
      if(!this.type){
        color='primary';
      }
      return color;
    },
    isPlain0:function(){
      return !!this.type;
    },
    buttonColor1:function(){
      var color='';
      if(this.type){
        color='primary';
      }
      return color;
    },
    isPlain1:function(){
      return !this.type;
    },
    typeLabel:function(){
      return (['day','month'][this.type]);
    }
  },
  filters:{
    toK:function(value){
      return _.toK(value);
    }
  },
  watch:{
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
        this.fetchCardData0();
        this.fetchCardData1();
        this.fetchCardData2();
        this.fetchCardData3();
      }
    },
    type:function(){
      this.fetchData();
    }
  },
  methods:{
    //卡片數據獲取
    fetchCardData0:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.card0,function(objRps){
        // objRps={
        //   'code': 1000,
        //   'result': {
        //     'depositUserNum':421311,   //押金用户数 
        //     'singularBatteryNum':22,    // 单电用户数
        //     'doubleBatteryNum':323    //双电用户 
        //   }
        // };
        vueThis.arrCard[0].dataH2=objRps.result.depositUserNum;
        vueThis.arrCard[0].footSpanLeftValue=objRps.result.singularBatteryNum;
        vueThis.arrCard[0].footSpanRightValue=objRps.result.doubleBatteryNum;
      });
    },
    fetchCardData1:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.card1,function(objRps){
        // objRps={
        //   'code': 1000,
        //   'result': {
        //     'batteryNum':421311,   //虚拟电池数  
        //     'assignNum':22,    // 已分配电池数
        //     'unAssignNum':323    //未分配电池数
        //   }
        // };
        vueThis.arrCard[1].dataH2=objRps.result.batteryNum;
        vueThis.arrCard[1].footSpanLeftValue=objRps.result.assignNum;
        vueThis.arrCard[1].footSpanRightValue=objRps.result.unAssignNum;
      });
    },
    fetchCardData2:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.card2,function(objRps){
        // objRps={
        //   'code': 1000,
        //   'result': {
        //     'freeDayNum':421311,   //免费天数数  
        //     'assignNum':22,    // 已分配数
        //     'unAssignNum':323    //未分配数
        //   }
        // };
        vueThis.arrCard[2].dataH2=objRps.result.freeDayNum;
        vueThis.arrCard[2].footSpanLeftValue=objRps.result.assignNum;
        vueThis.arrCard[2].footSpanRightValue=objRps.result.unAssignNum;
      });
    },
    fetchCardData3:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.card3,function(objRps){
        // objRps={
        //   'code': 1000,
        //   'result': {
        //     'scooterNum':421311,   //中控数  
        //     'bindNum':22,    // 已绑定数
        //     'unbindNum':323    //未绑定数
        //   }
        // };
        vueThis.arrCard[3].dataH2=objRps.result.scooterNum;
        vueThis.arrCard[3].footSpanLeftValue=objRps.result.bindNum;
        vueThis.arrCard[3].footSpanRightValue=objRps.result.unbindNum;
      });
    },

    //獲取數據,生成 arrLabels 和 arrValues
    fetchData:function(){
      var vueThis=this;
      var sendData={
        type:vueThis.type
      };
      //ecUser
      vueThis.$rqs(vueThis.$yApi.ecUser,function(objRps){
        // objRps={
        //   'code': 1000,
        //   'result': {
        //     'userNum':421311,   //用户数  
        //     'userNumInfo':[
        //       {
        //         'day': '6/1',  //哪一天 6/5   6月5号
        //         'month':'11月', // 哪一个月
        //         'newIncreate':12,  // 新增用户数
        //         'quit':-1,  //退出用户数
        //         'netIncreate':34   // 净增用户数
        //       },
        //       {
        //         'day': '6/2',  //哪一天 6/5   6月5号
        //         'month':'12月', // 哪一个月
        //         'newIncreate':12,  // 新增用户数
        //         'quit':-51,  //退出用户数
        //         'netIncreate':34   // 净增用户数
        //       }
        //     ]
        //   }
        // };
        // console.log(objRps);
        vueThis.userNum=objRps.result.userNum;
        //labels橫坐標
        arrLabels=objRps.result.userNumInfo.map(function(v){
          return (v[vueThis.typeLabel]);
        });

        // _.logErr(arrLabels);

        //value值(series)
        arrValues=arrEC.map(function(v){
          var arr=objRps.result.userNumInfo.map(function(obj){
            return (obj[v.key]);
          });
          return ({
            value:arr  //array
          });
        });

        // _.logErr(arrValues);

        vueThis.setE();
      },{
        objSendData:sendData,
        reviver:function(k,v){
          if(k==='quit'){
            return (-v);
          }
        }
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
    // 我的option
    iliECoption:function(){
      return ({
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter:function(params){
            // console.log(params);
            var tmp=params.map(function(v){
              //將負值顯示為正值
              return `${v.seriesName}: ${Math.abs(v.data)}`;
            }).join('<br />');
            tmp=params[0].name+'<br />'+tmp;
            return tmp;
          }
        },
        legend: {
          data:arrEC.map(function(v){
            return (v.title);
          })
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis : [
          {
            axisTick : {show: false},
            minInterval: 1,
            type : 'value'
          }
        ],
        xAxis : [
          {
            type : 'category',
            axisTick : {show: false},
            data : []
          }
        ],
        series : []
      });
    },
    setE:function(){
      var vueThis=this;
      objEcharts.setOption({
        xAxis:{
          data:arrLabels
        },
        series:arrEC.map(function(v,i){
          return ({
            type:'bar',
            barWidth:10,
            itemStyle:{
              color:v.color
            },
            stack:v.stack,
            name:v.title,
            data:arrValues[i].value
          });
        })  //series
      });
      return vueThis;
    },
    handleClickType:function(type){
      var vueThis=this;
      vueThis.type=type;
    }
  },
  created:function(){
    this.fetchCardData0();
    this.fetchCardData1();
    this.fetchCardData2();
    this.fetchCardData3();
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
    min-height: 300px;
    height: calc(100vh - 467px);
  }
</style>
