<template lang="html">
  <div class="ajax_test">
    <div class="test">{{ll.leon.lai}}</div>
    <div>
      <el-button @click="changeLL()">w</el-button>
    </div>
  </div>
</template>
<script>
// console.log(hoverColor);//test hoverColor
import {mapState} from 'vuex';

export default {
  name:'AjaxTest',
  data:function(){
    return ({
      ll:{
        leon:{
          lai:'i love you okay'
        }
      }
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    // deep watcher
    ll:{
      handler:function(val){
        _.logErr(val);
      },
      deep:true
    }
  },
  components:{
  },
  methods: {
    changeLL:function(){
      if(this.ll.leon.lai==='Leon'){
        this.ll.leon.lai='i love you okay';
      }else{
        this.ll.leon.lai='Leon';
      }
    },
    fetchData:function(){
      // var vueThis=this;
      // // vueThis.$rqs(vueThis.$yApi.accountBaseInfo,function(objRps){
      //   console.log(objRps);
      // },{
      //   reviver:function(k,v){
      //     if(k==='msg'){
      //       return '__success__';
      //     }
      //     return (v);
      //   }
      // });
    }
  },
  created:function(){
    this.fetchData();
  }
};
</script>
<style lang="css">
/*scope*/
@keyframes thilina{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(90deg);
  }
}
  .test{
    border: 2px solid violet;
    width: 190px;
    height: 60px;
    animation: thilina 10.2s ease-out infinite alternate;
  }
</style>