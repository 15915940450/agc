<template lang="html">
  <div class="ajax_test">
    66666
  </div>
</template>

<script>
import {urls,imPostForm,imGet} from '../api/urls.js';

// console.log(imGet);
// var sendData={
//   phone:'15820480937'
// };
// imPostForm(urls.baseInfo,sendData,function(rps){
//   console.log(rps);
// });
imGet(urls.baseInfo+'?phone=15820480937',function(rps){
  console.log(rps);
});

export default {
  name:'AjaxTest'
};

</script>

<style lang="css" scoped>
</style>
