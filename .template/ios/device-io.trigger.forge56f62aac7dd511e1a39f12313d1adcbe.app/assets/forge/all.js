/*! Copyright 2011 Trigger Corp. All rights reserved. */
(function(){var l={};l.config={browser_action:{default_popup:"index.html",default_icon:"img/logo-forge.png"},version:"0.1",logging:{level:"INFO"},name:"Demo",uuid:"56f62aac7dd511e1a39f12313d1adcbe"};var h={};h.listeners={};var c={};var g=[];var f=null;var k=false;var n=function(){if(g.length>0){if(!window.forge.debug||window.catalystConnected){k=true;while(g.length>0){var o=g.shift();if(o[0]=="logging.log"){console.log(o[1].message)}h.priv.call.apply(h.priv,o)}k=false}else{f=setTimeout(n,500)}}};h.priv={call:function(v,u,t,p){if((!window.forge.debug||window.catalystConnected)&&(g.length==0||k)){var o=l.tools.UUID();var r=true;if(v==="button.onClicked.addListener"||v==="message.toFocussed"){r=false}if(t||p){c[o]={success:t,error:p,onetime:r}}var q={callid:o,method:v,params:u};h.priv.send(q);if(window._forgeDebug){try{q.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiRequest(q)}catch(s){}}}else{g.push(arguments);if(!f){f=setTimeout(n,500)}}},send:function(o){throw new Error("Forge error: missing bridge to privileged code")},receive:function(o){if(o.callid){if(typeof c[o.callid]===undefined){l.log("Nothing stored for call ID: "+o.callid)}var q=c[o.callid];var p=(typeof o.content==="undefined"?null:o.content);if(q&&q[o.status]){q[o.status](o.content)}if(q&&q.onetime){delete c[o.callid]}if(window._forgeDebug){try{o.end=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiResponse(o)}catch(r){}}}else{if(o.event){if(h.listeners[o.event]){h.listeners[o.event].forEach(function(s){if(o.params){s(o.params)}else{s()}})}if(window._forgeDebug){try{o.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiEvent(o)}catch(r){}}}}}};h.addEventListener=function(o,p){if(h.listeners[o]){h.listeners[o].push(p)}else{h.listeners[o]=[p]}};h.generateQueryString=function(o){if(typeof o==="string"){return o}var p="";for(key in o){p+=encodeURIComponent(key)+"="+encodeURIComponent(o[key])+"&"}return p.substring(0,p.length-1)};h.generateMultipartString=function(o,q){if(typeof o==="string"){return""}var p="";for(key in o){p+="--"+q+"\r\n";p+='Content-Disposition: form-data; name="'+key.replace('"','\\"')+'"\r\n\r\n';p+=o[key].toString()+"\r\n"}return p},h.generateURI=function(p,o){var q="";if(p.indexOf("?")!==-1){q+=p.split("?")[1]+"&";p=p.split("?")[0]}q+=this.generateQueryString(o)+"&";q=q.substring(0,q.length-1);return p+(q?"?"+q:"")};l.is={mobile:function(){return false},desktop:function(){return false},android:function(){return false},ios:function(){return false},chrome:function(){return false},firefox:function(){return false},safari:function(){return false},ie:function(){return false},web:function(){return false},orientation:{portrait:function(){return false},landscape:function(){return false}}};l.button={setIcon:function(p,q,o){h.priv.call("button.setIcon",p,q,o)},setURL:function(p,q,o){h.priv.call("button.setURL",p,q,o)},onClicked:{addListener:function(o){h.priv.call("button.onClicked.addListener",null,o)}},setBadge:function(p,q,o){h.priv.call("button.setBadge",p,q,o)},setBadgeBackgroundColor:function(p,q,o){h.priv.call("button.setBadgeBackgroundColor",p,q,o)},setTitle:function(q,p,o){h.priv.call("button.setTitle",q,p,o)}};l.message={listen:function(p,q,o){o&&o({message:"Forge Error: message.listen must be overridden by platform specific code",type:"UNAVAILABLE"})},broadcast:function(p,q,r,o){o&&o({message:"Forge Error: message.broadcast must be overridden by platform specific code",type:"UNAVAILABLE"})},broadcastBackground:function(p,q,r,o){o&&o({message:"Forge Error: message.broadcastBackground must be overridden by platform specific code",type:"UNAVAILABLE"})},toFocussed:function(p,q,r,o){h.priv.call("message.toFocussed",{type:p,content:q},r,o)}};l.notification={create:function(r,q,p,o){h.priv.call("notification.create",{title:r,text:q},p,o)}};l.request={get:function(p,q,o){l.request.ajax({url:p,dataType:"text",success:q&&function(){try{arguments[0]=JSON.parse(arguments[0])}catch(r){}q.apply(this,arguments)},error:o})},ajax:function(q){var o=q.dataType;if(o=="xml"){q.dataType="text"}var r=q.success&&function(u){try{if(o=="xml"){var t,s;if(window.DOMParser){t=new DOMParser();s=t.parseFromString(u,"text/xml")}else{s=new ActiveXObject("Microsoft.XMLDOM");s.async="false";s.loadXML(u)}u=s}}catch(v){}q.success&&q.success(u)};var p=q.error&&function(s){if(s.status=="error"&&!s.err){l.logging.log("AJAX request to "+q.url+" failed, have you included that url in the permissions section of the config file for this app?")}q.error&&q.error(s)};h.priv.call("request.ajax",q,r,p)}};l.tools={UUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(q){var p=Math.random()*16|0;var o=q=="x"?p:(p&3|8);return o.toString(16)}).toUpperCase()},getURL:function(p,q,o){h.priv.call("tools.getURL",{name:p.toString()},q,o)}};var d=function(u,s,v){var q=[];stylize=function(x,w){return x};function o(w){return w instanceof RegExp||(typeof w==="object"&&Object.prototype.toString.call(w)==="[object RegExp]")}function p(w){return w instanceof Array||Array.isArray(w)||(w&&w!==Object.prototype&&p(w.__proto__))}function r(y){if(y instanceof Date){return true}if(typeof y!=="object"){return false}var w=Date.prototype&&Object.getOwnPropertyNames(Date.prototype);var x=y.__proto__&&Object.getOwnPropertyNames(y.__proto__);return JSON.stringify(x)===JSON.stringify(w)}function t(I,F){try{if(I&&typeof I.inspect==="function"&&!(I.constructor&&I.constructor.prototype===I)){return I.inspect(F)}switch(typeof I){case"undefined":return stylize("undefined","undefined");case"string":var w="'"+JSON.stringify(I).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return stylize(w,"string");case"number":return stylize(""+I,"number");case"boolean":return stylize(""+I,"boolean")}if(I===null){return stylize("null","null")}if(I instanceof Document){return(new XMLSerializer()).serializeToString(I)}var C=Object.keys(I);var J=s?Object.getOwnPropertyNames(I):C;if(typeof I==="function"&&J.length===0){var x=I.name?": "+I.name:"";return stylize("[Function"+x+"]","special")}if(o(I)&&J.length===0){return stylize(""+I,"regexp")}if(r(I)&&J.length===0){return stylize(I.toUTCString(),"date")}var y,G,D;if(p(I)){G="Array";D=["[","]"]}else{G="Object";D=["{","}"]}if(typeof I==="function"){var B=I.name?": "+I.name:"";y=" [Function"+B+"]"}else{y=""}if(o(I)){y=" "+I}if(r(I)){y=" "+I.toUTCString()}if(J.length===0){return D[0]+y+D[1]}if(F<0){if(o(I)){return stylize(""+I,"regexp")}else{return stylize("[Object]","special")}}q.push(I);var A=J.map(function(L){var K,M;if(I.__lookupGetter__){if(I.__lookupGetter__(L)){if(I.__lookupSetter__(L)){M=stylize("[Getter/Setter]","special")}else{M=stylize("[Getter]","special")}}else{if(I.__lookupSetter__(L)){M=stylize("[Setter]","special")}}}if(C.indexOf(L)<0){K="["+L+"]"}if(!M){if(q.indexOf(I[L])<0){if(F===null){M=t(I[L])}else{M=t(I[L],F-1)}if(M.indexOf("\n")>-1){if(p(I)){M=M.split("\n").map(function(N){return"  "+N}).join("\n").substr(2)}else{M="\n"+M.split("\n").map(function(N){return"   "+N}).join("\n")}}}else{M=stylize("[Circular]","special")}}if(typeof K==="undefined"){if(G==="Array"&&L.match(/^\d+$/)){return M}K=JSON.stringify(""+L);if(K.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){K=K.substr(1,K.length-2);K=stylize(K,"name")}else{K=K.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");K=stylize(K,"string")}}return K+": "+M});q.pop();var H=0;var z=A.reduce(function(K,L){H++;if(L.indexOf("\n")>=0){H++}return K+L.length+1},0);if(z>50){A=D[0]+(y===""?"":y+"\n ")+" "+A.join(",\n  ")+" "+D[1]}else{A=D[0]+y+" "+A.join(", ")+" "+D[1]}return A}catch(E){return"[No string representation]"}}return t(u,(typeof v==="undefined"?2:v))};var j=function(p,q){if("logging" in l.config){var o=l.config.logging.marker||"FORGE"}else{var o="FORGE"}p="["+o+"] "+(p.indexOf("\n")===-1?"":"\n")+p;h.priv.call("logging.log",{message:p,level:q});if(typeof console!=="undefined"){switch(q){case 10:if(console.debug!==undefined&&!(console.debug.toString&&console.debug.toString().match("alert"))){console.debug(p)}break;case 30:if(console.warn!==undefined&&!(console.warn.toString&&console.warn.toString().match("alert"))){console.warn(p)}break;case 40:case 50:if(console.error!==undefined&&!(console.error.toString&&console.error.toString().match("alert"))){console.error(p)}break;default:case 20:if(console.info!==undefined&&!(console.info.toString&&console.info.toString().match("alert"))){console.info(p)}break}}};var a=function(o,p){if(o in l.logging.LEVELS){return l.logging.LEVELS[o]}else{l.logging.__logMessage("Unknown configured logging level: "+o);return p}};var b=function(p){var s=function(t){if(t.message){return t.message}else{if(t.description){return t.description}else{return""+t}}};if(p){var r="\nError: "+s(p);try{if(p.lineNumber){r+=" on line number "+p.lineNumber}if(p.fileName){var o=p.fileName;r+=" in file "+o.substr(o.lastIndexOf("/")+1)}}catch(q){}if(p.stack){r+="\r\nStack trace:\r\n"+p.stack}return r}return""};l.logging={LEVELS:{ALL:0,DEBUG:10,INFO:20,WARNING:30,ERROR:40,CRITICAL:50},debug:function(p,o){l.logging.log(p,o,l.logging.LEVELS.DEBUG)},info:function(p,o){l.logging.log(p,o,l.logging.LEVELS.INFO)},warning:function(p,o){l.logging.log(p,o,l.logging.LEVELS.WARNING)},error:function(p,o){l.logging.log(p,o,l.logging.LEVELS.ERROR)},critical:function(p,o){l.logging.log(p,o,l.logging.LEVELS.CRITICAL)},log:function(p,o,s){if(typeof(s)==="undefined"){var s=l.logging.LEVELS.INFO}try{var q=a(l.config.logging.level,l.logging.LEVELS.ALL)}catch(r){var q=l.logging.LEVELS.ALL}if(s>=q){j(d(p)+b(o),s)}}};var m=function(s){if(s=="<all_urls>"){s="*://*"}s=s.split("://");var o=s[0];var q,r;if(s[1].indexOf("/")===-1){q=s[1];r=""}else{q=s[1].substring(0,s[1].indexOf("/"));r=s[1].substring(s[1].indexOf("/"))}var p="";if(o=="*"){p+=".*://"}else{p+=o+"://"}if(q=="*"){p+=".*"}else{if(q.indexOf("*.")===0){p+="(.+.)?"+q.substring(2)}else{p+=q}}p+=r.replace(/\*/g,".*");return"^"+p+"$"};l.tabs={open:function(p,q,r,o){if(typeof q==="function"){o=r;r=q;q=false}h.priv.call("tabs.open",{url:p,keepFocus:q},r,o)},openWithOptions:function(p,r,o){var q=undefined;if(p.pattern){q=m(p.pattern)}h.priv.call("tabs.open",{url:p.url,keepFocus:p.keepFocus,pattern:q},r,o)},closeCurrent:function(o){o=arguments[1]||o;var p=l.tools.UUID();location.hash=p;h.priv.call("tabs.closeCurrent",{hash:p},null,o)}};l.prefs={get:function(p,q,o){h.priv.call("prefs.get",{key:p.toString()},q&&function(r){if(r==="undefined"){r=undefined}else{try{r=JSON.parse(r)}catch(s){o({message:s.toString()});return}}q(r)},o)},set:function(p,q,r,o){if(q===undefined){q="undefined"}else{q=JSON.stringify(q)}h.priv.call("prefs.set",{key:p.toString(),value:q},r,o)},keys:function(p,o){h.priv.call("prefs.keys",{},p,o)},all:function(p,o){var p=p&&function(q){for(key in q){if(q[key]==="undefined"){q[key]=undefined}else{q[key]=JSON.parse(q[key])}}p(q)};h.priv.call("prefs.all",{},p,o)},clear:function(p,q,o){h.priv.call("prefs.clear",{key:p.toString()},q,o)},clearAll:function(p,o){h.priv.call("prefs.clearAll",{},p,o)}};l.file={getImage:function(p,q,o){if(typeof p==="function"){o=q;q=p;p={}}if(!p){p={}}h.priv.call("file.getImage",p,q&&function(s){var r={uri:s,name:"Image"};for(prop in p){r[prop]=p[prop]}q(r)},o)},base64:function(p,q,o){h.priv.call("file.base64",p,q,o)},imageBase64:function(q,r,s,p){if(typeof r==="function"){p=s;s=r}var o={};for(prop in q){o[prop]=q[prop]}o.height=r.height||q.height||0;o.width=r.width||q.width||0;h.priv.call("file.base64",o,s,p)},URL:function(q,r,s,p){if(typeof r==="function"){p=s;s=r}var o={};for(prop in q){o[prop]=q[prop]}o.height=r.height||q.height||0;o.width=r.width||q.width||0;h.priv.call("file.URL",o,s,p)},isFile:function(p,q,o){if(!p||!("uri" in p)){q(false)}else{h.priv.call("file.isFile",p,q,o)}},cacheURL:function(p,q,o){h.priv.call("file.cacheURL",{url:p},q&&function(r){q({uri:r})},o)},remove:function(p,q,o){h.priv.call("file.remove",p,q,o)},clearCache:function(p,o){h.priv.call("file.clearCache",{},p,o)}};l.event={menuPressed:{addListener:function(p,o){h.addEventListener("menuPressed",p)}},messagePushed:{addListener:function(p,o){h.addEventListener("event.messagePushed",p)}},orientationChange:{addListener:function(p,o){h.addEventListener("event.orientationChange",p)}}};l.contact={select:function(p,o){h.priv.call("contact.select",{},p,o)}};l.geolocation={getCurrentPosition:function(r,q,s){if(typeof(r)==="object"){var p=r,t=q,o=s}else{var t=r,o=q,p=s}return navigator.geolocation.getCurrentPosition(t,o,p)}};l.internal={ping:function(p,q,o){h.priv.call("internal.ping",{data:[p]},q,o)}};l.sms={send:function(r,q,o){if(r.to&&typeof r.to=="string"){r.to=[r.to]}var p={body:r.body||"",to:r.to||[]};h.priv.call("sms.send",p,q,o)}};l.topbar={setTitle:function(q,p,o){h.priv.call("topbar.setTitle",{title:q},p,o)},addButton:function(p,q,o){h.priv.call("topbar.addButton",p,function(r){h.addEventListener("topbar.buttonPressed."+r,q)},o)},removeButtons:function(p,o){h.priv.call("topbar.removeButtons",{},p,o)},homePressed:{addListener:function(p,o){h.addEventListener("topbar.homePressed",p)}}};var e=[];var i=false;h.priv.get=function(){var o=JSON.stringify(e);e=[];return o};h.priv.send=function(o){e.push(o);if(i&&!window.forge._flushing){window.location.href="forge://go";window.forge._flushing=true}};document.addEventListener("DOMContentLoaded",function(){i=true;temporaryTimeout=setTimeout(function(){window.location.href="forge://go";window.forge._flushing=true},0)},false);h.currentOrientation;h.addEventListener("internal.orientationChange",function(o){if(h.currentOrientation!=o.orientation){h.currentOrientation=o.orientation;h.priv.receive({event:"event.orientationChange"})}});l.is.mobile=function(){return true};l.is.ios=function(){return true};l.is.orientation.portrait=function(){return h.currentOrientation=="portrait"};l.is.orientation.landscape=function(){return h.currentOrientation=="landscape"};l.request.ajax=function(q){var u=(q.files?q.files:null);var D=(q.fileUploadMethod?q.fileUploadMethod:"multipart");var t=(q.url?q.url:null);var v=(q.success?q.success:undefined);var C=(q.error?q.error:undefined);var s=(q.username?q.username:null);var o=(q.password?q.password:null);var H=(q.accepts?q.accepts:["*/*"]);var z=(q.cache?q.cache:false);var F=(q.contentType?q.contentType:null);var I=(q.data?q.data:null);var B=(q.dataType?q.dataType:null);var p=(q.headers?q.headers:{});var w=(q.timeout?q.timeout:60000);var r=(q.type?q.type:"GET");if(typeof H==="string"){H=[H]}var E=null;if(u){r="POST";if(D=="multipart"){E=l.tools.UUID().replace(/-/g,"");I=h.generateMultipartString(I,E);F="multipart/form-data; boundary="+E}else{if(D=="raw"){if(u.length>1){l.logging.warning("Only one file can be uploaded at once with type 'raw'");u=[u[0]]}I=null;F="image/jpg"}}}else{if(r=="GET"){t=h.generateURI(t,I);I=null}else{if(I){I=h.generateQueryString(I);if(!F){F="application/x-www-form-urlencoded"}}}}if(z){z={};z["wm"+Math.random()]=Math.random();t=h.generateURI(t,z)}if(H){p.Accept=H.join(",")}if(F){p["Content-Type"]=F}var A={};if(window._forgeDebug){try{A.id=l.tools.UUID();A.fromUrl=window.location.href;A.reqTime=(new Date()).getTime()/1000;A.method=r;A.data=I;A.url=t;_forgeDebug.wi.NetworkNotify.identifierForInitialRequest(A.id,A.url,{url:A.fromUrl,frameId:0,loaderId:0},[]);_forgeDebug.wi.NetworkNotify.willSendRequest(A.id,A.reqTime,{url:A.url,httpMethod:A.method,httpHeaderFields:{},requestFormData:A.data},{isNull:true})}catch(G){}}var y=false;var x=setTimeout(function(){if(y){return}y=true;if(window._forgeDebug){try{A.respTime=(new Date()).getTime()/1000;A.respText=I;_forgeDebug.wi.NetworkNotify.didReceiveResponse(A.id,A.reqTime,"XHR",{mimeType:"Unknown",textEncodingName:"",httpStatusCode:1,httpStatusText:"Failure",httpHeaderFields:{},connectionReused:false,connectionID:0,wasCached:false,});_forgeDebug.wi.NetworkNotify.setInitialContent(A.id,A.respText,"XHR");_forgeDebug.wi.NetworkNotify.didFinishLoading(A.id,A.respTime)}catch(J){}}C&&C({message:"Request timed out",type:"EXPECTED_FAILURE"})},w);h.priv.call("request.ajax",{url:t,username:s,password:o,data:I,headers:p,timeout:w,type:r,boundary:E,files:u,fileUploadMethod:D},function(L){clearTimeout(x);if(y){return}y=true;if(window._forgeDebug){try{A.respTime=(new Date()).getTime()/1000;A.respText=L;_forgeDebug.wi.NetworkNotify.didReceiveResponse(A.id,A.reqTime,"XHR",{mimeType:"Unknown",textEncodingName:"",httpStatusCode:1,httpStatusText:"Success",httpHeaderFields:{},connectionReused:false,connectionID:0,wasCached:false,});_forgeDebug.wi.NetworkNotify.setInitialContent(A.id,A.respText,"XHR");_forgeDebug.wi.NetworkNotify.didFinishLoading(A.id,A.respTime)}catch(M){}}try{if(B=="xml"){var K,J;if(window.DOMParser){K=new DOMParser();J=K.parseFromString(L,"text/xml")}else{J=new ActiveXObject("Microsoft.XMLDOM");J.async="false";J.loadXML(L)}L=J}else{if(B=="json"){L=JSON.parse(L)}}}catch(M){}v&&v(L)},function(){clearTimeout(x);if(y){return}y=true;if(window._forgeDebug){try{A.respTime=(new Date()).getTime()/1000;A.respText=I;_forgeDebug.wi.NetworkNotify.didReceiveResponse(A.id,A.reqTime,"XHR",{mimeType:"Unknown",textEncodingName:"",httpStatusCode:1,httpStatusText:"Failure",httpHeaderFields:{},connectionReused:false,connectionID:0,wasCached:false,});_forgeDebug.wi.NetworkNotify.setInitialContent(A.id,A.respText,"XHR");_forgeDebug.wi.NetworkNotify.didFinishLoading(A.id,A.respTime)}catch(J){}}C&&C.apply(this,arguments)})};l.geolocation={getCurrentPosition:function(r,q,s){if(typeof(r)==="object"){var p=r,t=q,o=s}else{var t=r,o=q,p=s}h.priv.call("geolocation.getCurrentPosition",p,t,o)}};window.forge={config:l.config,is:{mobile:l.is.mobile,desktop:l.is.desktop,android:l.is.android,ios:l.is.ios,chrome:l.is.chrome,firefox:l.is.firefox,safari:l.is.safari,ie:l.is.ie,web:l.is.web,orientation:{portrait:l.is.orientation.portrait,landscape:l.is.orientation.landscape}},message:{listen:l.message.listen,broadcast:l.message.broadcast,broadcastBackground:l.message.broadcastBackground,toFocussed:l.message.toFocussed},notification:{create:l.notification.create},request:{get:l.request.get,ajax:l.request.ajax},logging:{log:l.logging.log,debug:l.logging.debug,info:l.logging.info,warning:l.logging.warning,error:l.logging.error,critical:l.logging.critical},tabs:{open:l.tabs.open,openWithOptions:l.tabs.openWithOptions,closeCurrent:l.tabs.closeCurrent},tools:{UUID:l.tools.UUID,getURL:l.tools.getURL},prefs:{get:l.prefs.get,set:l.prefs.set,clear:l.prefs.clear,clearAll:l.prefs.clearAll,keys:l.prefs.keys},button:{setIcon:l.button.setIcon,setURL:l.button.setURL,onClicked:{addListener:l.button.onClicked.addListener},setBadge:l.button.setBadge,setBadgeBackgroundColor:l.button.setBadgeBackgroundColor,setTitle:l.button.setTitle},file:{getImage:l.file.getImage,isFile:l.file.isFile,URL:l.file.URL,imageURL:l.file.URL,imageBase64:l.file.imageBase64,base64:l.file.base64,cacheURL:l.file.cacheURL,remove:l.file.remove,clearCache:l.file.clearCache},event:{menuPressed:{addListener:l.event.menuPressed.addListener},messagePushed:{addListener:l.event.messagePushed.addListener},orientationChange:{addListener:l.event.orientationChange.addListener}},contact:{select:l.contact.select},geolocation:{getCurrentPosition:l.geolocation.getCurrentPosition},internal:{ping:l.internal.ping},sms:{send:l.sms.send},topbar:{setTitle:l.topbar.setTitle,addButton:l.topbar.addButton,removeButtons:l.topbar.removeButtons,homePressed:{addListener:l.topbar.homePressed.addListener}}};window.forge["ajax"]=l.request.ajax;window.forge["getPage"]=l.request.get;window.forge["createNotification"]=l.notification.create;window.forge["UUID"]=l.tools.UUID;window.forge["getURL"]=l.tools.getURL;window.forge["log"]=l.logging.log;window.forge["button"]["setUrl"]=l.button.setURL;window.forge["button"]["setBadgeText"]=l.button.setBadge;window.forge["file"]["delete"]=l.file.remove;window.forge["_get"]=h.priv.get;window.forge["_receive"]=h.priv.receive;window.forge["_dispatchMessage"]=h.dispatchMessage})();