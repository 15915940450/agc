<template lang="html">
  <div class="ajax_test">
99955
  </div>
</template>

<script>
// var HOST='http://119.23.133.72:8764/agent';
// var xmlhttp;
// var url='';
// if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
//   xmlhttp=new XMLHttpRequest();
// } else {// code for IE6, IE5
//   xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
// }
// xmlhttp.onreadystatechange=function() {
//   if (xmlhttp.readyState===4 && xmlhttp.status===200) {
//     // console.log(xmlhttp.responseText);
//   }
// };
// xmlhttp.open('GET',url,true);
// xmlhttp.send();

//1.POST /account/baseInfo
// var url=HOST+'/account/baseInfo';
// var sendData={
//   phone:'15820480937'
// };
// function imPostForm(url,sendData,callback){
//   var callback=callback || function(){};
//   var xmlhttp;
//
//
//   if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
//     xmlhttp=new XMLHttpRequest();
//   } else {// code for IE6, IE5
//     xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
//   }
//   xmlhttp.onreadystatechange=function() {
//     if (xmlhttp.readyState===4 && xmlhttp.status===200) {
//       // console.log(xmlhttp.responseText);
//       callback(xmlhttp.responseText);
//     }
//   };
//   xmlhttp.open('POST',url,true);
//   xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
//   xmlhttp.send(JSON.stringify(sendData));
// }
// imPostForm(url,sendData,function(rps){
//   console.log(rps);
// });
import {urls,imPostForm} from '../api/urls.js';
console.log(urls);
console.log(imPostForm);

var sendData={
  phone:'15820480937'
};
imPostForm(urls.baseInfo,sendData,function(rps){
  console.log(rps);
});

export default {
  name:'AjaxTest'
};

</script>

<style lang="css" scoped>
</style>
