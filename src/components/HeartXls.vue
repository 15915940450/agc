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
              <el-button type="primary">导出</el-button>
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
      pickerOptions:{
        disabledDate:function(dateObj){
          return (dateObj.getTime()>_.dateAgo(0));
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
      handler:function(){
        // _.logErr(val);
        // this.fetchThePaths();
      }
    }
  },
  components:{
  },
  methods:{
  },
  created:function(){
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
</style>
