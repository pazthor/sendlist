angular.module("uiSwitch",[]).directive("switch",function(){return{restrict:"AE",replace:!0,transclude:!0,template:function(e,n){var t="";return t+="<span",t+=' class="switch'+(n["class"]?" "+n["class"]:"")+'"',t+=n.ngModel?' ng-click="'+n.disabled+" ? "+n.ngModel+" : "+n.ngModel+"=!"+n.ngModel+(n.ngChange?"; "+n.ngChange+'()"':'"'):"",t+=' ng-class="{ checked:'+n.ngModel+", disabled:"+n.disabled+' }"',t+=">",t+="<small></small>",t+='<input type="checkbox"',t+=n.id?' id="'+n.id+'"':"",t+=n.name?' name="'+n.name+'"':"",t+=n.ngModel?' ng-model="'+n.ngModel+'"':"",t+=' style="display:none" />',t+='<span class="switch-text">',t+=n.on?'<span class="on">'+n.on+"</span>":"",t+=n.off?'<span class="off">'+n.off+"</span>":" ",t+="</span>"}}}),function(e,n,t){"use strict";var r,o={},i={sdk:!1,ready:!1};n.module("facebook",[]).value("settings",o).value("flags",i).provider("Facebook",[function(){o.appId=null,this.setAppId=function(e){o.appId=e},this.getAppId=function(){return o.appId},o.locale="en_US",this.setLocale=function(e){o.locale=e},this.getLocale=function(){return o.locale},o.status=!0,this.setStatus=function(e){o.status=e},this.getStatus=function(){return o.status},o.channelUrl=null,this.setChannel=function(e){o.channelUrl=e},this.getChannel=function(){return o.channelUrl},o.cookie=!0,this.setCookie=function(e){o.cookie=e},this.getCookie=function(){return o.cookie},o.xfbml=!0,this.setXfbml=function(e){o.xfbml=e},this.getXfbml=function(){return o.xfbml},this.setAuthResponse=function(e){o.authResponse=e||!0},this.getAuthResponse=function(){return o.authResponse},o.frictionlessRequests=!1,this.setFrictionlessRequests=function(e){o.frictionlessRequests=e},this.getFrictionlessRequests=function(){return o.frictionlessRequests},o.hideFlashCallback=null,this.setHideFlashCallback=function(e){o.hideFlashCallback=e||null},this.getHideFlashCallback=function(){return o.hideFlashCallback},this.setInitCustomOption=function(e,t){return n.isString(e)?(o[e]=t,o[e]):!1},this.getInitOption=function(e){return n.isString(e)&&o.hasOwnProperty(e)?o[e]:!1},o.loadSDK=!0,this.setLoadSDK=function(e){o.loadSDK=!!e},this.getLoadSDK=function(){return o.loadSDK},o.version="v2.0",this.setSdkVersion=function(e){o.version=e},this.getSdkVersion=function(){return o.version},this.init=function(e,t){n.isString(e)&&(o.appId=e||o.appId),n.isObject(e)&&n.extend(o,e),n.isDefined(t)&&(o.loadSDK=!!t)},this.$get=["$q","$rootScope","$timeout","$window",function(e,t,s,a){function u(){this.appId=o.appId}return u.prototype.isReady=function(){return i.ready},u.prototype.login=function(){var t,r,o=e.defer(),i=Array.prototype.slice.call(arguments);return n.forEach(i,function(e,o){n.isFunction(e)&&(t=e,r=o)}),n.isFunction(t)&&n.isNumber(r)&&i.splice(r,1,function(e){s(function(){n.isUndefined(e.error)?o.resolve(e):o.reject(e),n.isFunction(t)&&t(e)})}),this.isReady()?a.FB.login.apply(a.FB,i):s(function(){o.reject("Facebook.login() called before Facebook SDK has loaded.")}),o.promise},n.forEach(["logout","api","ui","getLoginStatus"],function(t){u.prototype[t]=function(){var o,i,u=e.defer(),c=Array.prototype.slice.call(arguments);return n.forEach(c,function(e,t){n.isFunction(e)&&(o=e,i=t)}),n.isFunction(o)&&n.isNumber(i)&&c.splice(i,1,function(e){s(function(){e&&"undefined"==typeof e.error?u.resolve(e):u.reject(e),n.isFunction(o)&&o(e)})}),s(function(){r.promise.then(function(){a.FB[t].apply(FB,c)},function(){throw"Facebook API could not be initialized properly"})}),u.promise}}),u.prototype.parseXFBML=function(){var n=e.defer();return s(function(){r.promise.then(function(){a.FB.XFBML.parse(),n.resolve()},function(){throw"Facebook API could not be initialized properly"})}),n.promise},u.prototype.subscribe=function(){var t,o,i=e.defer(),u=Array.prototype.slice.call(arguments);return n.forEach(u,function(e,r){n.isFunction(e)&&(t=e,o=r)}),n.isFunction(t)&&n.isNumber(o)&&u.splice(o,1,function(e){s(function(){e&&"undefined"==typeof e.error?i.resolve(e):i.reject(e),n.isFunction(t)&&t(e)})}),s(function(){r.promise.then(function(){a.FB.Event.subscribe.apply(FB,u)},function(){throw"Facebook API could not be initialized properly"})}),i.promise},u.prototype.unsubscribe=function(){var t,o,i=e.defer(),u=Array.prototype.slice.call(arguments);return n.forEach(u,function(e,r){n.isFunction(e)&&(t=e,o=r)}),n.isFunction(t)&&n.isNumber(o)&&u.splice(o,1,function(e){s(function(){e&&"undefined"==typeof e.error?i.resolve(e):i.reject(e),n.isFunction(t)&&t(e)})}),s(function(){r.promise.then(function(){a.FB.Event.unsubscribe.apply(FB,u)},function(){throw"Facebook API could not be initialized properly"})}),i.promise},new u}]}]).run(["$rootScope","$q","$window","$timeout",function(e,t,s,a){r=t.defer();var u=o.loadSDK;delete o.loadSDK,s.fbAsyncInit=function(){a(function(){if(!o.appId)throw"Missing appId setting.";FB.init(o),i.ready=!0,n.forEach({"auth.login":"login","auth.logout":"logout","auth.prompt":"prompt","auth.sessionChange":"sessionChange","auth.statusChange":"statusChange","auth.authResponseChange":"authResponseChange","xfbml.render":"xfbmlRender","edge.create":"like","edge.remove":"unlike","comment.create":"comment","comment.remove":"uncomment"},function(n,t){FB.Event.subscribe(t,function(t){a(function(){e.$broadcast("Facebook:"+n,t)})})}),e.$broadcast("Facebook:load"),r.resolve(FB)})},function(){var e=document.getElementById("fb-root");return e||(e=document.createElement("div"),e.id="fb-root",document.body.insertBefore(e,document.body.childNodes[0])),e}(),u&&!function(){var e="//connect.facebook.net/"+o.locale+"/sdk.js",n=document.createElement("script");n.id="facebook-jssdk",n.async=!0,-1!==["file","file:"].indexOf(s.location.protocol)&&(e="https:"+e),n.src=e,n.onload=function(){i.sdk=!0},document.getElementsByTagName("head")[0].appendChild(n)}()}])}(window,angular),function(e){function n(e,n,t){var r,o,i,f,d,h,p,g,b=0,w=[],S=0,v=!1,m=!1,E=[],k=[],y=!1;if(t=t||{},r=t.encoding||"UTF8",g=t.numRounds||1,i=l(n,r),g!==parseInt(g,10)||1>g)throw Error("numRounds must a integer >= 1");if("SHA-1"===e)d=512,h=O,p=N,f=160;else if(h=function(n,t){return U(n,t,e)},p=function(n,t,r,o){var i,s;if("SHA-224"===e||"SHA-256"===e)i=(t+65>>>9<<4)+15,s=16;else{if("SHA-384"!==e&&"SHA-512"!==e)throw Error("Unexpected error in SHA-2 implementation");i=(t+129>>>10<<5)+31,s=32}for(;n.length<=i;)n.push(0);for(n[t>>>5]|=128<<24-t%32,n[i]=t+r,r=n.length,t=0;r>t;t+=s)o=U(n.slice(t,t+s),o,e);if("SHA-224"===e)n=[o[0],o[1],o[2],o[3],o[4],o[5],o[6]];else if("SHA-256"===e)n=o;else if("SHA-384"===e)n=[o[0].a,o[0].b,o[1].a,o[1].b,o[2].a,o[2].b,o[3].a,o[3].b,o[4].a,o[4].b,o[5].a,o[5].b];else{if("SHA-512"!==e)throw Error("Unexpected error in SHA-2 implementation");n=[o[0].a,o[0].b,o[1].a,o[1].b,o[2].a,o[2].b,o[3].a,o[3].b,o[4].a,o[4].b,o[5].a,o[5].b,o[6].a,o[6].b,o[7].a,o[7].b]}return n},"SHA-224"===e)d=512,f=224;else if("SHA-256"===e)d=512,f=256;else if("SHA-384"===e)d=1024,f=384;else{if("SHA-512"!==e)throw Error("Chosen SHA variant is not supported");d=1024,f=512}o=T(e),this.setHMACKey=function(n,t,i){var s;if(!0===m)throw Error("HMAC key already set");if(!0===v)throw Error("Cannot set HMAC key after finalizing hash");if(!0===y)throw Error("Cannot set HMAC key after calling update");if(r=(i||{}).encoding||"UTF8",t=l(t,r)(n),n=t.binLen,t=t.value,s=d>>>3,i=s/4-1,n/8>s){for(t=p(t,n,0,T(e));t.length<=i;)t.push(0);t[i]&=4294967040}else if(s>n/8){for(;t.length<=i;)t.push(0);t[i]&=4294967040}for(n=0;i>=n;n+=1)E[n]=909522486^t[n],k[n]=1549556828^t[n];o=h(E,o),b=d,m=!0},this.update=function(e){var n,t,r,s=0,a=d>>>5;for(n=i(e,w,S),e=n.binLen,t=n.value,n=e>>>5,r=0;n>r;r+=a)e>=s+d&&(o=h(t.slice(r,r+a),o),s+=d);b+=s,w=t.slice(s>>>5),S=e%d,y=!0},this.getHash=function(n,t){var r,i,l;if(!0===m)throw Error("Cannot call getHash after setting HMAC key");switch(l=c(t),n){case"HEX":r=function(e){return s(e,l)};break;case"B64":r=function(e){return a(e,l)};break;case"BYTES":r=u;break;default:throw Error("format must be HEX, B64, or BYTES")}if(!1===v)for(o=p(w,S,b,o),i=1;g>i;i+=1)o=p(o,f,0,T(e));return v=!0,r(o)},this.getHMAC=function(n,t){var r,i,l;if(!1===m)throw Error("Cannot call getHMAC without first setting HMAC key");switch(l=c(t),n){case"HEX":r=function(e){return s(e,l)};break;case"B64":r=function(e){return a(e,l)};break;case"BYTES":r=u;break;default:throw Error("outputFormat must be HEX, B64, or BYTES")}return!1===v&&(i=p(w,S,b,o),o=h(k,T(e)),o=p(i,f,d,o)),v=!0,r(o)}}function t(e,n){this.a=e,this.b=n}function r(e,n,t){var r,o,i,s,a,u=e.length;if(n=n||[0],t=t||0,a=t>>>3,0!==u%2)throw Error("String of HEX type must be in byte increments");for(r=0;u>r;r+=2){if(o=parseInt(e.substr(r,2),16),isNaN(o))throw Error("String of HEX type contains invalid characters");for(s=(r>>>1)+a,i=s>>>2;n.length<=i;)n.push(0);n[i]|=o<<8*(3-s%4)}return{value:n,binLen:4*u+t}}function o(e,n,t){var r,o,i,s,a=[],a=n||[0];for(t=t||0,o=t>>>3,r=0;r<e.length;r+=1)n=e.charCodeAt(r),s=r+o,i=s>>>2,a.length<=i&&a.push(0),a[i]|=n<<8*(3-s%4);return{value:a,binLen:8*e.length+t}}function i(e,n,t){var r,o,i,s,a,u,c=[],l=0,c=n||[0];if(t=t||0,n=t>>>3,-1===e.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");if(o=e.indexOf("="),e=e.replace(/\=/g,""),-1!==o&&o<e.length)throw Error("Invalid '=' found in base-64 string");for(o=0;o<e.length;o+=4){for(a=e.substr(o,4),i=s=0;i<a.length;i+=1)r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a[i]),s|=r<<18-6*i;for(i=0;i<a.length-1;i+=1){for(u=l+n,r=u>>>2;c.length<=r;)c.push(0);c[r]|=(s>>>16-8*i&255)<<8*(3-u%4),l+=1}}return{value:c,binLen:8*l+t}}function s(e,n){var t,r,o="",i=4*e.length;for(t=0;i>t;t+=1)r=e[t>>>2]>>>8*(3-t%4),o+="0123456789abcdef".charAt(r>>>4&15)+"0123456789abcdef".charAt(15&r);return n.outputUpper?o.toUpperCase():o}function a(e,n){var t,r,o,i="",s=4*e.length;for(t=0;s>t;t+=3)for(o=t+1>>>2,r=e.length<=o?0:e[o],o=t+2>>>2,o=e.length<=o?0:e[o],o=(e[t>>>2]>>>8*(3-t%4)&255)<<16|(r>>>8*(3-(t+1)%4)&255)<<8|o>>>8*(3-(t+2)%4)&255,r=0;4>r;r+=1)i+=8*t+6*r<=32*e.length?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o>>>6*(3-r)&63):n.b64Pad;return i}function u(e){var n,t,r="",o=4*e.length;for(n=0;o>n;n+=1)t=e[n>>>2]>>>8*(3-n%4)&255,r+=String.fromCharCode(t);return r}function c(e){var n={outputUpper:!1,b64Pad:"="};if(e=e||{},n.outputUpper=e.outputUpper||!1,!0===e.hasOwnProperty("b64Pad")&&(n.b64Pad=e.b64Pad),"boolean"!=typeof n.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!=typeof n.b64Pad)throw Error("Invalid b64Pad formatting option");return n}function l(e,n){var t;switch(n){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(e){case"HEX":t=r;break;case"TEXT":t=function(e,t,r){var o,i,s,a,u,c=[],l=[],f=0,c=t||[0];if(t=r||0,s=t>>>3,"UTF8"===n)for(o=0;o<e.length;o+=1)for(r=e.charCodeAt(o),l=[],128>r?l.push(r):2048>r?(l.push(192|r>>>6),l.push(128|63&r)):55296>r||r>=57344?l.push(224|r>>>12,128|r>>>6&63,128|63&r):(o+=1,r=65536+((1023&r)<<10|1023&e.charCodeAt(o)),l.push(240|r>>>18,128|r>>>12&63,128|r>>>6&63,128|63&r)),i=0;i<l.length;i+=1){for(u=f+s,a=u>>>2;c.length<=a;)c.push(0);c[a]|=l[i]<<8*(3-u%4),f+=1}else if("UTF16BE"===n||"UTF16LE"===n)for(o=0;o<e.length;o+=1){for(r=e.charCodeAt(o),"UTF16LE"===n&&(i=255&r,r=i<<8|r>>>8),u=f+s,a=u>>>2;c.length<=a;)c.push(0);c[a]|=r<<8*(2-u%4),f+=2}return{value:c,binLen:8*f+t}};break;case"B64":t=i;break;case"BYTES":t=o;break;default:throw Error("format must be HEX, TEXT, B64, or BYTES")}return t}function f(e,n){return e<<n|e>>>32-n}function d(e,n){return e>>>n|e<<32-n}function h(e,n){var r=null,r=new t(e.a,e.b);return r=32>=n?new t(r.a>>>n|r.b<<32-n&4294967295,r.b>>>n|r.a<<32-n&4294967295):new t(r.b>>>n-32|r.a<<64-n&4294967295,r.a>>>n-32|r.b<<64-n&4294967295)}function p(e,n){var r=null;return r=32>=n?new t(e.a>>>n,e.b>>>n|e.a<<32-n&4294967295):new t(0,e.a>>>n-32)}function g(e,n,t){return e&n^~e&t}function b(e,n,r){return new t(e.a&n.a^~e.a&r.a,e.b&n.b^~e.b&r.b)}function w(e,n,t){return e&n^e&t^n&t}function S(e,n,r){return new t(e.a&n.a^e.a&r.a^n.a&r.a,e.b&n.b^e.b&r.b^n.b&r.b)}function v(e){return d(e,2)^d(e,13)^d(e,22)}function m(e){var n=h(e,28),r=h(e,34);return e=h(e,39),new t(n.a^r.a^e.a,n.b^r.b^e.b)}function E(e){return d(e,6)^d(e,11)^d(e,25)}function k(e){var n=h(e,14),r=h(e,18);return e=h(e,41),new t(n.a^r.a^e.a,n.b^r.b^e.b)}function y(e){return d(e,7)^d(e,18)^e>>>3}function A(e){var n=h(e,1),r=h(e,8);return e=p(e,7),new t(n.a^r.a^e.a,n.b^r.b^e.b)}function R(e){return d(e,17)^d(e,19)^e>>>10}function C(e){var n=h(e,19),r=h(e,61);return e=p(e,6),new t(n.a^r.a^e.a,n.b^r.b^e.b)}function H(e,n){var t=(65535&e)+(65535&n);return((e>>>16)+(n>>>16)+(t>>>16)&65535)<<16|65535&t}function _(e,n,t,r){var o=(65535&e)+(65535&n)+(65535&t)+(65535&r);return((e>>>16)+(n>>>16)+(t>>>16)+(r>>>16)+(o>>>16)&65535)<<16|65535&o}function F(e,n,t,r,o){var i=(65535&e)+(65535&n)+(65535&t)+(65535&r)+(65535&o);return((e>>>16)+(n>>>16)+(t>>>16)+(r>>>16)+(o>>>16)+(i>>>16)&65535)<<16|65535&i}function L(e,n){var r,o,i;return r=(65535&e.b)+(65535&n.b),o=(e.b>>>16)+(n.b>>>16)+(r>>>16),i=(65535&o)<<16|65535&r,r=(65535&e.a)+(65535&n.a)+(o>>>16),o=(e.a>>>16)+(n.a>>>16)+(r>>>16),new t((65535&o)<<16|65535&r,i)}function $(e,n,r,o){var i,s,a;return i=(65535&e.b)+(65535&n.b)+(65535&r.b)+(65535&o.b),s=(e.b>>>16)+(n.b>>>16)+(r.b>>>16)+(o.b>>>16)+(i>>>16),a=(65535&s)<<16|65535&i,i=(65535&e.a)+(65535&n.a)+(65535&r.a)+(65535&o.a)+(s>>>16),s=(e.a>>>16)+(n.a>>>16)+(r.a>>>16)+(o.a>>>16)+(i>>>16),new t((65535&s)<<16|65535&i,a)}function I(e,n,r,o,i){var s,a,u;return s=(65535&e.b)+(65535&n.b)+(65535&r.b)+(65535&o.b)+(65535&i.b),a=(e.b>>>16)+(n.b>>>16)+(r.b>>>16)+(o.b>>>16)+(i.b>>>16)+(s>>>16),u=(65535&a)<<16|65535&s,s=(65535&e.a)+(65535&n.a)+(65535&r.a)+(65535&o.a)+(65535&i.a)+(a>>>16),a=(e.a>>>16)+(n.a>>>16)+(r.a>>>16)+(o.a>>>16)+(i.a>>>16)+(s>>>16),new t((65535&a)<<16|65535&s,u)}function T(e){var n,r;if("SHA-1"===e)e=[1732584193,4023233417,2562383102,271733878,3285377520];else switch(n=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],r=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],e){case"SHA-224":e=n;break;case"SHA-256":e=r;break;case"SHA-384":e=[new t(3418070365,n[0]),new t(1654270250,n[1]),new t(2438529370,n[2]),new t(355462360,n[3]),new t(1731405415,n[4]),new t(41048885895,n[5]),new t(3675008525,n[6]),new t(1203062813,n[7])];break;case"SHA-512":e=[new t(r[0],4089235720),new t(r[1],2227873595),new t(r[2],4271175723),new t(r[3],1595750129),new t(r[4],2917565137),new t(r[5],725511199),new t(r[6],4215389547),new t(r[7],327033209)];break;default:throw Error("Unknown SHA variant")}return e}function O(e,n){var t,r,o,i,s,a,u,c=[];for(t=n[0],r=n[1],o=n[2],i=n[3],s=n[4],u=0;80>u;u+=1)c[u]=16>u?e[u]:f(c[u-3]^c[u-8]^c[u-14]^c[u-16],1),a=20>u?F(f(t,5),r&o^~r&i,s,1518500249,c[u]):40>u?F(f(t,5),r^o^i,s,1859775393,c[u]):60>u?F(f(t,5),w(r,o,i),s,2400959708,c[u]):F(f(t,5),r^o^i,s,3395469782,c[u]),s=i,i=o,o=f(r,30),r=t,t=a;return n[0]=H(t,n[0]),n[1]=H(r,n[1]),n[2]=H(o,n[2]),n[3]=H(i,n[3]),n[4]=H(s,n[4]),n}function N(e,n,t,r){var o;for(o=(n+65>>>9<<4)+15;e.length<=o;)e.push(0);for(e[n>>>5]|=128<<24-n%32,e[o]=n+t,t=e.length,n=0;t>n;n+=16)r=O(e.slice(n,n+16),r);return r}function U(e,n,r){var o,i,s,a,u,c,l,f,d,h,p,T,O,N,U,x,D,P,G,X,j,Y,V,K=[];if("SHA-224"===r||"SHA-256"===r)h=64,T=1,Y=Number,O=H,N=_,U=F,x=y,D=R,P=v,G=E,j=w,X=g,V=B;else{if("SHA-384"!==r&&"SHA-512"!==r)throw Error("Unexpected error in SHA-2 implementation");h=80,T=2,Y=t,O=L,N=$,U=I,x=A,D=C,P=m,G=k,j=S,X=b,V=M}for(r=n[0],o=n[1],i=n[2],s=n[3],a=n[4],u=n[5],c=n[6],l=n[7],p=0;h>p;p+=1)16>p?(d=p*T,f=e.length<=d?0:e[d],d=e.length<=d+1?0:e[d+1],K[p]=new Y(f,d)):K[p]=N(D(K[p-2]),K[p-7],x(K[p-15]),K[p-16]),f=U(l,G(a),X(a,u,c),V[p],K[p]),d=O(P(r),j(r,o,i)),l=c,c=u,u=a,a=O(s,f),s=i,i=o,o=r,r=O(f,d);return n[0]=O(r,n[0]),n[1]=O(o,n[1]),n[2]=O(i,n[2]),n[3]=O(s,n[3]),n[4]=O(a,n[4]),n[5]=O(u,n[5]),n[6]=O(c,n[6]),n[7]=O(l,n[7]),n}var B,M;B=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],M=[new t(B[0],3609767458),new t(B[1],602891725),new t(B[2],3964484399),new t(B[3],2173295548),new t(B[4],4081628472),new t(B[5],3053834265),new t(B[6],2937671579),new t(B[7],3664609560),new t(B[8],2734883394),new t(B[9],1164996542),new t(B[10],1323610764),new t(B[11],3590304994),new t(B[12],4068182383),new t(B[13],991336113),new t(B[14],633803317),new t(B[15],3479774868),new t(B[16],2666613458),new t(B[17],944711139),new t(B[18],2341262773),new t(B[19],2007800933),new t(B[20],1495990901),new t(B[21],1856431235),new t(B[22],3175218132),new t(B[23],2198950837),new t(B[24],3999719339),new t(B[25],766784016),new t(B[26],2566594879),new t(B[27],3203337956),new t(B[28],1034457026),new t(B[29],2466948901),new t(B[30],3758326383),new t(B[31],168717936),new t(B[32],1188179964),new t(B[33],1546045734),new t(B[34],1522805485),new t(B[35],2643833823),new t(B[36],2343527390),new t(B[37],1014477480),new t(B[38],1206759142),new t(B[39],344077627),new t(B[40],1290863460),new t(B[41],3158454273),new t(B[42],3505952657),new t(B[43],106217008),new t(B[44],3606008344),new t(B[45],1432725776),new t(B[46],1467031594),new t(B[47],851169720),new t(B[48],3100823752),new t(B[49],1363258195),new t(B[50],3750685593),new t(B[51],3785050280),new t(B[52],3318307427),new t(B[53],3812723403),new t(B[54],2003034995),new t(B[55],3602036899),new t(B[56],1575990012),new t(B[57],1125592928),new t(B[58],2716904306),new t(B[59],442776044),new t(B[60],593698344),new t(B[61],3733110249),new t(B[62],2999351573),new t(B[63],3815920427),new t(3391569614,3928383900),new t(3515267271,566280711),new t(3940187606,3454069534),new t(4118630271,4000239992),new t(116418474,1914138554),new t(174292421,2731055270),new t(289380356,3203993006),new t(460393269,320620315),new t(685471733,587496836),new t(852142971,1086792851),new t(1017036298,365543100),new t(1126000580,2618297676),new t(1288033470,3409855158),new t(1501505948,4234509866),new t(1607167915,987167468),new t(1816402316,1246189591)],"function"==typeof define&&define.amd?define(function(){return n}):"undefined"!=typeof exports?"undefined"!=typeof module&&module.exports?module.exports=exports=n:exports=n:e.jsSHA=n}(this);var app=angular.module("sendlist",["ui.router","uiSwitch","facebook","external","input-directives","scroll-directive","sendlist.settings","sendlist.constants","sendlist.SessionService","sendlist.AuthService","sendlist.MultimediaService","sendlist.ListsService","sendlist.SignService","sendlist.MainController","sendlist.LoginController","sendlist.ListsController","sendlist.NewListController"]),sessionResolver=["$q","ERRORS","$rootScope",function(e,n,t){return t.credentials.user?e.resolve(!0):e.reject(n.NOT_LOGGED_IN)}];app.config(["$stateProvider","$urlRouterProvider","$locationProvider","FacebookProvider","APP_KEYS",function(e,n,t,r,o){n.otherwise("/not-found"),e.state("login",{url:"/login",templateUrl:"html/login.html",controller:"LoginController",resolve:{redirect:["$q","ERRORS","$rootScope",function(e,n,t){return t.credentials.user?e.reject(n.ALREADY_LOGGED_IN):e.resolve(!0)}]}}).state("lists",{url:"/",templateUrl:"html/lists.html",controller:"ListsController",resolve:{sessionResolver:sessionResolver}}).state("list",{url:"/list/:id",templateUrl:"html/list.html",params:{list:null},controller:"NewListController",resolve:{sessionResolver:sessionResolver}}).state("not-found",{url:"/not-found",templateUrl:"html/not-found.html"}),t.html5Mode(!0),r.init(o.facebook)}]),app.run(["$rootScope","$state","ERRORS","EVENTS","SessionService","Facebook","AuthService",function(e,n,t,r,o,i,s){e.credentials=o.read(),e.credentials.user&&e.$broadcast(r.SESSION_READY,e.credentials),e.$on(r.LOGIN_SUCCESS,function(t,i){o.store(i),e.credentials=o.read(),e.$broadcast(r.SESSION_READY,e.credentials),n.go("lists")});var a=e.$watch(function(){return i.isReady()},function(t){return t?e.credentials.user?null:void i.getLoginStatus(function(t){return a(),"connected"!==t.status?null:void s.facebookSignup(t.authResponse.accessToken).then(function(t){t.success&&(o.store(t.credentials),e.credentials=o.read(),e.$broadcast(r.SESSION_READY,e.credentials),n.go("lists"))})}):null});e.$on("$stateChangeError",function(e,r,o,i,s,a){a===t.NOT_LOGGED_IN&&n.go("login")}),e.$on("$stateChangeError",function(e,r,o,i,s,a){a===t.ALREADY_LOGGED_IN&&n.go("lists")})}]),angular.module("sendlist.constants",[]).constant("ERRORS",{NOT_LOGGED_IN:"user not logged in",ALREADY_LOGGED_IN:"user already logged in"}).constant("EVENTS",{LOGIN_SUCCESS:"login successful",SESSION_READY:"session ready"}).constant("MESSAGES",{SERVER_ERROR:"There was an error, please try again"}),angular.module("external",[]).factory("jsSHA",function(){return window.jsSHA}).factory("_update",function(){return function(e,n){for(var t in n)n.hasOwnProperty(t)&&e.hasOwnProperty(t)&&(n[t]=e[t])}}),angular.module("sendlist.settings",[]).constant("APP_KEYS",{facebook:"1528191824152615"}),angular.module("sendlist.ListsController",["external"]).controller("ListsController",["$scope","$rootScope","$state","ListsService","EVENTS","MESSAGES","_update",function(e,n,t,r,o,i,s){e.loaded=!1,e.credentials=n.credentials,e.lists=[],e.new_list_input_lock=!1,e.addList=function(n){if(!e.new_list_input_lock){e.new_list_input_lock=!0;var o={title:n,items:[]};r.add(o,e.credentials).then(function(n){n.success?t.go("list",{list:n.list,id:n.list._id}):alert(i.SERVER_ERROR),e.new_list_input_lock=!1})}},e.feeding=!1,e.feed=function(){e.feeding=!0;var n=e.lists[e.lists.length-1],t=n&&n.created?n.created:"";r.feed(e.credentials,t).then(function(n){if(e.loaded=!0,n.success)for(var t=0;t<n.lists.length;t++){n.lists[t].done_items=0;for(var r=0;r<n.lists[t].items.length;r++)n.lists[t].items[r].done&&n.lists[t].done_items++;e.lists.push(n.lists[t])}else alert(i.SERVER_ERROR);e.feeding=!1})}}]),angular.module("sendlist.LoginController",[]).controller("LoginController",["$scope","Facebook","AuthService","MESSAGES","EVENTS",function(e,n,t,r,o){e.data={},e.facebookLogin=function(){n.login(function(n){return"connected"!==n.status?null:void t.facebookSignup(n.authResponse.accessToken).then(function(n){n.success?e.$emit(o.LOGIN_SUCCESS,n.credentials):alert(r.SERVER_ERROR)})})},e.emailLogin=function(){}}]),angular.module("sendlist.MainController",[]).controller("MainController",["$scope","$state","$rootScope","EVENTS","MultimediaService",function(e,n,t,r,o){e.multimedia=o,e.state=n,e.user=t.credentials.user}]),angular.module("sendlist.NewListController",[]).controller("NewListController",["$scope","$rootScope","$state","$stateParams","ListsService","EVENTS","MESSAGES",function(e,n,t,r,o,i,s){e.credentials=n.credentials,e.list=r.list,e.list||o.find(e.credentials,r.id).then(function(n){n.success?e.list=n.list:t.go("not-found")}),e.addItem=function(){var n={text:e.text,done:!1};e.list.items.push(n),e.text="",n.saved=!1,o.addItem(n,e.list,e.credentials).then(function(t){t.success?e.list.items=t.items:(e.list.items.splice(e.list.items.indexOf(n),1),alert(s.SERVER_ERROR))})},e.check=function(n){if(n.checklock)return!1;n.checklock=!0;var t=n.done;o.mark(n,e.list,e.credentials).then(function(e){e.success||(n.done=!t),n.checklock=!1})}}]),angular.module("input-directives",[]).directive("ngEnter",function(){return function(e,n,t){n.bind("keydown keypress",function(n){13===n.which&&(e.$apply(function(){e.$eval(t.ngEnter)}),n.preventDefault())})}}),angular.module("scroll-directive",[]).directive("ngScrolled",function(){return function(e,n,t){var r=n[0];n.bind("scroll",function(){r.scrollTop+r.offsetHeight>=r.scrollHeight&&e.$apply(t.ngScrolled)})}}),angular.module("sendlist.AuthService",[]).factory("AuthService",["$http",function(e){return{facebookSignup:function(n){return e.post("/signup/facebook",{fb_access_token:n}).then(function(e){return{success:!0,credentials:{key:e.data.key,user:e.data.user}}},function(){return{success:!1}})}}}]),angular.module("sendlist.ListsService",["sendlist.SignService"]).factory("ListsService",["$http","SignService",function(e,n){return{find:function(t,r){var o="/lists/"+r,i=n.getSignedHeaders(o,t.key,t.user._id);return e.get(o,{headers:i}).then(function(e){return{success:!0,list:e.data.list}},function(){return{success:!1}})},feed:function(t,r){var o="/lists?before="+r,i=n.getSignedHeaders(o,t.key,t.user._id);return e.get(o,{headers:i}).then(function(e){return{success:!0,lists:e.data.data}},function(){return{success:!1}})},add:function(t,r){var o="/lists",i=n.getSignedHeaders(o,r.key,r.user._id,t);return e.post(o,t,{headers:i}).then(function(e){return{success:!0,list:e.data.list}},function(){return{success:!1}})},addItem:function(t,r,o){var i="/lists/"+r._id,s={new_items:[t]},a=n.getSignedHeaders(i,o.key,o.user._id,s);return e.put(i,s,{headers:a}).then(function(e){return{success:!0,items:e.data.items}},function(){return{success:!1}})},mark:function(t,r,o){var i="/lists/"+r._id,s={item_done:t._id,done:t.done},a=n.getSignedHeaders(i,o.key,o.user._id,s);return e.put(i,s,{headers:a}).then(function(e){return{success:!0,items:e.data.items}},function(){return{success:!1}})}}}]),angular.module("sendlist.MultimediaService",[]).factory("MultimediaService",["$http",function(e){return{userpic:function(e){return e.facebook_id?"//graph.facebook.com/"+e.facebook_id+"/picture":"//img/default-user.jpg"}}}]),angular.module("sendlist.SessionService",[]).factory("SessionService",[function(){var e=window.sessionStorage;return{read:function(){var n={};try{n=JSON.parse(e.credentials)}catch(t){return delete e.credentials,{}}return"string"==typeof n.key&&n.user&&n.user._id&&"string"==typeof n.user._id?n:(delete e.credentials,{})},store:function(n){"string"==typeof n.key&&n.user&&n.user._id&&"string"==typeof n.user._id&&(e.credentials=angular.toJson(n))},"delete":function(){delete e.credentials}}}]),angular.module("sendlist.SignService",["external"]).factory("SignService",["jsSHA",function(e){return{getSignedHeaders:function(n,t,r,o){o=o||{};var i=angular.toJson(o)+n+t,s=new e("SHA-256","TEXT");s.update(i);var a={user_id:r,token:s.getHash("HEX")};return a}}}]);