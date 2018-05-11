<template lang="html">
  <div class="ajax_test">
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button type="text" @click="load()">load</el-button>
    <!-- <el-button type="text" @click="load()" disabled>load</el-button> -->
  </div>
</template>

<script>
// //comments and componentnames(router s)
// arr=['abc','def','g','hi','jklmn']

// str,

// shi xian
// zhao chu str chu xian zai arr zhong de di ji ge yuan su dang zhong
export default {
  name:'AjaxTest',
  data() {
    return {
      options: [],
      value: 'ff'
    };
  },
  methods:{
    load:function(){
      var vueThis=this;
      vueThis.options=[{
        value: 'aa',
        label: '黄金糕'
      }, {
        value: 'bb',
        label: '双皮奶'
      }, {
        value: 'cc',
        label: '蚵仔煎'
      }, {
        value: 'dd',
        label: '龙须面'
      }, {
        value: 'ee',
        label: '北京烤鸭'
      }];
      var isFind=vueThis.options.find(function(v){
        return (v.value===vueThis.value);
      });

      if(!isFind){
        vueThis.value='';
      }
    }
  }
};


</script>

<style lang="css" scoped>
</style>
