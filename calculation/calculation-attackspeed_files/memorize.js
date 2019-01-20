// テキストボックスに入力したデータの保存期間を指定します。   
// 例： 100 days    
// リセットするときは異なる保存期間を指定します。   
// 例： 101 days   
var memoryduration="100 days"  

function setformobjects(){   
  var theforms=document.forms   
  memorizearray=new Array()   
  for (i=0; i< theforms.length; i++){   
    for (j=0; j< theforms[i].elements.length; j++){   
      if (theforms[i].elements[j].className.indexOf("memorize")!=-1 && theforms[i].elements[j].type=="text")   
        memorizearray[memorizearray.length]=theforms[i].elements[j]   
      if (theforms[i].elements[j].className.indexOf("memorize")!=-1 && theforms[i].elements[j].type=="select-one")   
        memorizearray[memorizearray.length]=theforms[i].elements[j]       }   
  }   
  var retrievedvalues=get_cookie("mvalue"+window.location.pathname)   
  if (retrievedvalues!=""){   
    retrievedvalues=retrievedvalues.split("|")   
    if (retrievedvalues[retrievedvalues.length-1]!=parseInt(memoryduration)) //reset cookie if var memoryduration has changed   
      resetcookie("mvalue"+window.location.pathname)   
    else{   
      for (i=0; i<memorizearray.length; i++){   
        if (retrievedvalues[i]!="empty_value")   
          memorizearray[i].value=retrievedvalues[i]   
      }   
    }   
  }   
}   
  
function get_cookie(Name) {   
  var search = Name + "="  
  var returnvalue = "";   
  if (document.cookie.length > 0) {   
    offset = document.cookie.indexOf(search)   
    if (offset != -1) { // if cookie exists   
      offset += search.length   
      end = document.cookie.indexOf(";", offset);   
      if (end == -1)   
         end = document.cookie.length;   
      returnvalue=unescape(document.cookie.substring(offset, end))   
      }   
   }   
  return returnvalue;   
}   
  
function resetcookie(id){   
  var expireDate = new Date()   
  expireDate.setDate(expireDate.getDate()-10)   
  document.cookie = id+"=;path=/;expires=" + expireDate.toGMTString()   
}   
  
function saveformvalues(){   
  var formvalues=new Array(), temp   
  for (i=0; i<memorizearray.length; i++){   
    temp=memorizearray[i].value!=""? memorizearray[i].value : "empty_value"  
    formvalues[formvalues.length]=escape(temp)   
  }   
  formvalues[formvalues.length]=parseInt(memoryduration)   
  formvalues=formvalues.join("|")   
  var expireDate = new Date()   
  expireDate.setDate(expireDate.getDate()+parseInt(memoryduration))   
  document.cookie = "mvalue"+window.location.pathname+"="+formvalues+"; path=/;expires=" + expireDate.toGMTString()   
}

if (window.addEventListener)   
  window.addEventListener("load", setformobjects, false)   
else if (window.attachEvent)   
  window.attachEvent("onload", setformobjects)   
else if (document.getElementById)   
  window.onload=setformobjects   
if (document.getElementById)   
  window.onunload=saveformvalues
/*
     FILE ARCHIVED ON 04:54:00 Jan 26, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:16:57 Jan 18, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 80.287 (3)
  esindex: 0.007
  captures_list: 102.873
  CDXLines.iter: 11.286 (3)
  PetaboxLoader3.datanode: 58.294 (5)
  exclusion.robots: 0.182
  exclusion.robots.policy: 0.169
  RedisCDXSource: 8.075
  PetaboxLoader3.resolve: 118.235 (4)
  load_resource: 126.574
*/