//rqs
import store from '../store';


// refer --> http://api.jquery.com/jQuery.ajax/
/*
method: GET,POSTform,POSTjson
success: if code is 1000

==the progress
1.you must assign an url with __method(1,2,3).
2.if cannot get agentid, do NOT send, except making a login request
3.create,open
4.setRequestHeader,withCredentials
5.send
6.handle success:success
7.handle all out of success:fail,fnHandleNOTjsonResult
8.reviver may be useful(string2number,mine,─)
*/
export default function(urlMethod,success,paramSettings){
  // this is vm object
  var vueThis=this;

  var settings={
    objSendData:{},
    isLoginRqs:false,
    fnHandleNOTjsonResult:function(error){console.log(error);},
    fail:function(rps){
      console.log(rps);
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
    complete4:function(){
      if(vueThis.loading){
        vueThis.loading=false;
      }
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
  if(method===4){
    method='PUTjson';
  }
  success=success || function(objRps){console.log(objRps);};

  //=================settings is the target, will be overcover by param
  Object.assign(settings,paramSettings);

  if(!window.localStorage.agentid && !settings.isLoginRqs){
    store.commit('showLogin');
    return false;
  }

  //================xmlhttp start
  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
  }else{
    xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }

  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState===4){
      //when complete4, set loading to false
      settings.complete4();
      
      if(xmlhttp.status===200){
        try{
          var objRps;

          objRps=JSON.parse(xmlhttp.responseText,function(k,v){
            //real default reviver
            if(typeof v==='string' && !window.isNaN(v) && v.length<15 && v && v.trim().charAt(0)!=='0' && !v.match(/[exbo]/i)){
              //string to number, is not big number, is not 0, is not start with _ and 0
              v=window.Number(v);
            }
            if(typeof(settings.reviver)==='function' && settings.reviver(k,v)!==undefined){
              //deal with number only
              v=settings.reviver(k,v);
            }
            if(v===''){
              //last change empty string to ─
              v='─';
            }
            return v;
          });

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
  //add by sinclair put json
  if(method==='PUTjson'){
    method='PUT';
    data2send=JSON.stringify(settings.objSendData);
    ContentType='application/json';
  }
  //end

  xmlhttp.open(method,url,true);
  xmlhttp.setRequestHeader('Content-type',ContentType);
  if(window.sessionStorage.headerid){
    xmlhttp.setRequestHeader('agentId',window.sessionStorage.headerid);
  }
  xmlhttp.withCredentials=true;
  xmlhttp.send(data2send);
}
