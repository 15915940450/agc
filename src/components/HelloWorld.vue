<template>
<div class="master_and_dev">
  <h2>{{ msg }}</h2>
  <div class="vuejs_commits">
    <h3>最新Vue.js提交</h3>
    <p>
      <label for="branch_master"><input type="radio" name="branch" id="branch_master" v-model="currentBranch" value="master" />master</label>
      <label for="branch_dev"><input type="radio" name="branch" id="branch_dev" v-model="currentBranch" value="dev" />dev</label>
    </p>
    <h5>{{currentBranch}}</h5>
    <ul class="commits_list">
      <li v-for="commit in commits" :key="commit.sha">
        <p>{{commit.sha | short}} - {{commit.commit.message}}</p>
        <h6>by {{commit.commit.committer.name}} at {{commit.commit.committer.date}} </h6>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '歡迎',
      branches:['master','dev'],
      currentBranch:'master',
      commits:null
    };
  },
  created:function(){
    this.fetchData();
  },
  watch:{
    currentBranch:function(){
      this.fetchData();
    }
  },
  filters:{
    short:function(v,num=9){
      return (v.substring(0,num));
    }
  },
  methods:{
    fetchData:function(){
      // var vueThis=this;
      // console.log(this.$im);
      // vueThis.$im.get(vueThis.$apiURLs.commit+vueThis.currentBranch).then(function(rps){
      //   // console.log(rps.data);
      //   //im獲取數據 commits
      //   vueThis.commits=rps.data;
      // }).catch(function(err){
      //   _.logErr(err);
      // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.vuejs_commits{
  border:1px solid #999;
  width: 400px;
  margin:0 auto;
  text-align: left;
  padding: 10px;
}
.commits_list{
}
</style>
