//rqs
import store from '../store';


// refer --> http://api.jquery.com/jQuery.ajax/
/*
method: GET,POSTform,POSTjson
success: if code is 1000

==the progress
1.you must assign an url.
2.if cannot get agentid, do NOT send, except making a login request
3.create,open
4.setRequestHeader,withCredentials
5.send
6.handle success:success
7.handle all out of success:fail,fnHandleNOTjsonResult
*/
export default function(url,method,success,settings){
  // this is vm object
  var vueThis=this;

  if(typeof(url)!=='string'){
    return false;
  }
  method=method || 'GET';
  success=success || function(objRps){_.logErr(objRps);};
  settings=settings || {
    objSendData:null,
    isLoginRqs:false,
    fnHandleNOTjsonResult:function(error){_.logErr(error);},
    fail:function(rps){
      _.logErr(rps);
      var msg;
      if(typeof(rps)==='object'){
        msg=rps.msg;
      }else{
        msg=rps;
      }
      vueThis.$notify.error({
        title:'提示',
        message:msg,
        offset:44,
        duration:5000
      });
    }
  };

  if(!window.localStorage.agentid && !settings.isLoginRqs){
    store.commit('showLogin');
    return false;
  }

  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
  }else{
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }

  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState===4){
      if(xmlhttp.status===200){
        if(settings.isLoginRqs){
          success(xmlhttp.responseText);
        }else{
          try{
            var objRps=JSON.parse(xmlhttp.responseText);
            //code...
            switch(objRps.code){

            case 1050:  //need login
              store.commit('showLogin');
              break;

            case 1000:
              success(objRps);
              break;
            default:  //fail
              settings.fail(objRps);
            }
          }catch(error){
            settings.fnHandleNOTjsonResult(error);
          }
        }
      }else{
        //status is not 200
        settings.fail(xmlhttp.status);
      }
    }
  };

  var ContentType,data2send='';
  if(method==='GET'){
    if(settings && settings.objSendData){
      url=url+'?'+_.serialize2querystring(settings.objSendData);
    }
    ContentType='application/x-www-form-urlencoded';
  }
  if(method==='POSTform'){
    method='POST';
    ContentType='application/x-www-form-urlencoded';
    if(settings && settings.objSendData){
      data2send=_.serialize2querystring(settings.objSendData);
    }
  }
  if(method==='POSTjson'){
    method='POST';
    ContentType='application/json';
    if(settings && settings.objSendData){
      data2send=JSON.stringify(settings.objSendData);
    }
  }


  xmlhttp.open(method,url,true);
  xmlhttp.setRequestHeader('Content-type',ContentType);
  xmlhttp.withCredentials=true;
  xmlhttp.send(data2send);
}