<template lang="html">
  <div class="ajax_test">
    zyut mong dik siu jung
  </div>
</template>
<script>
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
      vueThis.$rqs(vueThis.$yApi.THILINA,function(objRps){
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
<style lang="css" scoped></style>