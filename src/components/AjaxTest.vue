<template lang="html">
  <div class="ajax_test">
99955
  </div>
</template>

<script>
var xmlhttp;
var url='';
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
} else {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
}
xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState===4 && xmlhttp.status===200) {
    // console.log(xmlhttp.responseText);
  }
};
xmlhttp.open('GET',url,true);
xmlhttp.send();

export default {
  name:'AjaxTest'
};
</script>

<style lang="css" scoped>
</style>
