<template lang="html">
  <div class="ajax_test">
    <div class="test">leon lai</div>
  </div>
</template>
<script>
var a=['yya','yyb','yyc'];  //++>yya5
var start=5;
var b=a.map(function(v){
  var result='';
  result=v.replace(/\w+/gi,function(m){
    return (m+start);
  });
  start++;
  return result;
});

console.log(b);


import {mapState} from 'vuex';

export default {
  name:'AjaxTest',
  data:function(){
    return ({
      total:0,
      search:'',
      isNotSearch:true,
      THILINA:[
      ],
      msg:'',
      pageNum:(window.Number(this.$route.params.pn)?window.Number(this.$route.params.pn):1)
    });
  },
  computed:{
    ...mapState(['agent','modalStore'])
  },
  watch:{
    pageNum:function(){
      this.fetchData();
    },
    'modalStore.needLogin':function(val){
      if(!val){
        this.fetchData();
      }
    }
  },
  components:{
  },
  methods: {
    fetchData:function(){
      var vueThis=this;
      vueThis.$rqs(vueThis.$yApi.userCityList,function(objRps){
        console.log(objRps);
      });
    },
    imSearch:_.debounce(function(){
      this.isNotSearch=false;
      this.fetchData();
    },690),
    resetSearch:function(){
      this.search='';
      this.fetchData();
    }
  },
  created:function(){
    this.fetchData();
    // _.logErr(JSON.stringify(this.$store.state.modalStore));
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
    width: 90px;
    height: 60px;
    animation: thilina 1.2s ease-out infinite alternate;
  }
</style>