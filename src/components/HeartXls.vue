<template lang="html">
  <div class="component_xls eqcalc">
    <div class="xls_head">
      <h3 class="title with_sub">
        <span class="real_title">报表管理</span>
      </h3>
      
    </div>

    <div class="xls_wrap">
      <table class="vim_table">
        <tbody>
          <tr>
            <td>
              用户套餐记录
              
              <el-tooltip 
                effect="dark" 
                content="" 
                placement="bottom"
                >
                <div slot="content">
                  导出所有用户的套餐信息，<br />
                  最多可导出最近60天的记录
                </div>
                <span class="hint_info">
                  <i class="el-icon-info"></i>
                </span>
              </el-tooltip>
            </td>
            <td>
              <div class="range">
                <el-date-picker
                  v-model="se"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  >
                </el-date-picker>
              </div>
            </td>
            <td>
                <a class="exportXls mybtn" :href="hrefExport">导出</a>
              <!-- <el-button type="primary"> -->
              <!-- </el-button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name:'HeartXls',
  data:function(){
    return ({
      hrefExport:'',
      pickerOptions:{
        disabledDate:function(dateObj){
          return (dateObj.getTime()>_.dateAgo(0).getTime() || dateObj.getTime()<_.dateAgo(60).getTime());
        }
      },
      se:[]
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    se:{
      // deep:true,
      handler:function(val){
        // _.logErr(val);  //[(Date)"2018-09-03T16:00:00.000Z",(Date)"2018-09-17T16:00:00.000Z"] or null
        if(val){
          var startTime=_.toSlash(val[0],{slash:'-'}).slice(0,10);
          var endTime=_.toSlash(val[1],{slash:'-'}).slice(0,10);
          this.hrefExport=this.$yApi.exportCombo+'?startTime='+startTime+'&endTime='+endTime + '&agentId=' + window.sessionStorage.headerid;
        }else{
          this.hrefExport=this.$yApi.exportCombo;
        }
      }
    }
  },
  components:{
  },
  methods:{
  },
  created:function(){
    this.hrefExport=this.$yApi.exportCombo;
  }
};
</script>

<style lang="css" scoped>
  .component_xls{
    background:#fafbfc;
  }
  .xls_head{
    background:white;
    margin:0;
  }
  .xls_wrap{
    padding: 25px;
  }
  .hint_info{
    color:#2490f2;
  }
  .exportXls{
    position:relative;
    top:-2px;
  }
</style>
