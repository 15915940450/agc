<template lang="html">
  <div class="ajax_test">
    66666
  </div>
</template>

<script>
import {urls,ajaxs} from '../api/urls.js';

var advancedParam=JSON.stringify({
  groupCode:11
});

var sendData={
  pageNum:1,
  pageSize:3,
  advancedParam:advancedParam
};

// ajaxs.imPostJson(urls.packageList,sendData,function(objRps){
//   console.log(objRps,'/ajax');
// });

export default {
  name:'AjaxTest'
};

</script>

<style lang="css" scoped>
</style>
