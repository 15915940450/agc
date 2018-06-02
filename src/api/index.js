//rqs
import store from '../store';


// refer --> http://api.jquery.com/jQuery.ajax/
/*
method: GET,POSTform,POSTjson
success: if code is 1000

==the progress
1.you must assign an url width __method(1,2,3).
2.if cannot get agentid, do NOT send, except making a login request
3.create,open
4.setRequestHeader,withCredentials
5.send
6.handle success:success
7.handle all out of success:fail,fnHandleNOTjsonResult
*/
export default function(urlMethod,success,paramSettings){
  // this is vm object
  var vueThis=this;

  var settings={
    objSendData:{},
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
        offset:55,
        duration:5000
      });
    },
    reviver:false
  };

  if(typeof(urlMethod)!=='string'){
    return false;
  }
  var url=urlMethod.split('__')[0];
  var method=window.parseInt(urlMethod.split('__')[1]); //1,2,3
  if(method===1){
    method='GET';
  }
  if(method===2){
    method='POSTjson';
  }
  if(method===3){
    method='POSTform';
  }
  success=success || function(objRps){_.logErr(objRps);};

  Object.assign(settings,paramSettings);

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
      //when complete, set loading to false
      if(vueThis.loading){
        vueThis.loading=false;
      }
      if(xmlhttp.status===200){
        try{
          var objRps;
          if(typeof(settings.reviver)==='function'){
            objRps=JSON.parse(xmlhttp.responseText,settings.reviver);
          }else{
            objRps=JSON.parse(xmlhttp.responseText);
          }

          if(settings.isLoginRqs){
            //make login rqs
            success(objRps);
          }else{
            //normal rqs
            //hasLogin=>code...
            var arrExtraNeedLoginCode=[
              1004, //登錄驗證碼錯誤
              1005, //登錄驗證碼不能爲空
              1006, //登錄密碼錯誤
              1007  //用戶不存在
            ];
            if(arrExtraNeedLoginCode.indexOf(objRps.code)!==-1){
              objRps.code=1050;
            }
            switch(objRps.code){

            case 1050:  //need login
              store.commit('showLogin');
              break;

            case 1000:
              success(objRps);
              break;
            default:  //fail
              settings.fail(objRps);
            //end switch
            }
          }
        //end try
        }catch(error){
          //when JSON.parse throw error
          settings.fnHandleNOTjsonResult(error);
        }
      //end if 200  
      }else{
        //status is not 200
        settings.fail(xmlhttp.status);
      }
    }
  };

  var ContentType,data2send='';
  if(!settings.isLoginRqs && window.localStorage.agentphone && !settings.objSendData.phone){
    settings.objSendData.phone=window.localStorage.agentphone;
  }
  if(method==='GET'){
    url=url+'?now='+(new Date().getTime())+'&'+_.serialize2querystring(settings.objSendData);
    ContentType='application/x-www-form-urlencoded';
  }
  if(method==='POSTform'){
    method='POST';
    data2send=_.serialize2querystring(settings.objSendData);
    ContentType='application/x-www-form-urlencoded';
  }
  if(method==='POSTjson'){
    method='POST';
    data2send=JSON.stringify(settings.objSendData);
    ContentType='application/json';
  }


  xmlhttp.open(method,url,true);
  xmlhttp.setRequestHeader('Content-type',ContentType);
  xmlhttp.withCredentials=true;
  xmlhttp.send(data2send);
}