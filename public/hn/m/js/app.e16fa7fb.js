(function(t){function e(e){for(var s,i,r=e[0],l=e[1],c=e[2],u=0,p=[];u<r.length;u++)i=r[u],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(s in l)Object.prototype.hasOwnProperty.call(l,s)&&(t[s]=l[s]);f&&f(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],s=!0,r=1;r<a.length;r++){var l=a[r];0!==n[l]&&(s=!1)}s&&(o.splice(e--,1),t=i(i.s=a[0]))}return t}var s={},n={app:0},o=[];function i(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=s,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/hn/m/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var f=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e6cf"),a("cca6"),a("a79d"),a("06bb"),a("5b0d");var s=a("2b0e"),n=a("d42c"),o=a("ede0"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-app",{attrs:{params:t.f7Params}},[a("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.root,"stack-pages":!0}})],1)},r=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{ref:"homePage",on:{"page:init":t.onPageInit}},[a("f7-navbar",[a("f7-nav-title",[t._v("HN × 🌀")])],1),a("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return a("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[a("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),a("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),a("span",{attrs:{slot:"after"},slot:"after"},[a("f7-chip",{staticClass:"chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},c=[],f={components:{f7Page:o["m"],f7Navbar:o["l"],f7NavTitle:o["k"],f7List:o["f"],f7ListItem:o["g"],f7Chip:o["d"]},data(){return{listData:[]}},methods:{onPageInit(){this.getData()},async getData(){const t=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/ask");this.listData=(await t.json()).data}}},u=f,p=a("2877"),d=Object(p["a"])(u,l,c,!1,null,null,null),h=d.exports,m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[a("f7-navbar",{attrs:{title:t.title,"back-link":"返回",subtitle:t.count}},[a("f7-nav-right",[a("f7-link",{attrs:{"popover-open":".popover-menu","icon-ios":"f7:bars","icon-md":"material:menu"}})],1)],1),t.isInit?t._e():a("f7-block",{staticClass:"text-align-center"},[a("f7-preloader")],1),a("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,s){return a("f7-message",{key:e.meta.id+s,attrs:{type:e.type,name:e.name,first:t.isFirstMessage(e,s),last:t.isLastMessage(e,s),tail:t.isTailMessage(e,s)}},[e.text?a("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s((e.quoteHtml||"")+e.text)},slot:"text"}):t._e(),a("div",{attrs:{slot:"text-header"},slot:"text-header"},[e.meta.floor?[t._v(" "+t._s(e.meta.floor)+"楼 "),t.author===e.name?[t._v(" • 楼主 ")]:t._e()]:t._e()],2),a("div",{attrs:{slot:"text-footer"},slot:"text-footer"})])})),1)],1)},g=[],v={components:{f7Navbar:o["l"],f7Page:o["m"],f7Messages:o["i"],f7Message:o["h"],f7Preloader:o["n"],f7Block:o["c"],f7NavRight:o["j"],f7Link:o["e"]},created(){const{id:t}=this.$f7route.params;this.id=t},data(){return{messagesData:[],id:"",isInit:!1,count:"",author:"",title:"群聊"}},methods:{async onPageInit(){await this.getData(),this.isInit=!0},onShowChatClick(){this.$f7router.navigate("/dialog/"+encodeURIComponent(JSON.stringify(this.dialogData)))},async getData(){const t=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/item?id="+this.id),{data:e}=await t.json();this.count=e.comments.length+" 条回复",this.title=e.title,this.author=e.author;let a=[{type:"received",name:e.author,text:e.title,meta:{id:e.id}},{type:"received",name:e.author,text:e.text,meta:{id:e.id}}];e.comments.forEach((t,s)=>{const n={type:"received",name:t.author,text:t.text,meta:{id:t.id,floor:s+1}};if(0!==t.parent){let a="";for(let n=s-1;n>=0;n--)if(e.comments[n].id===t.parent){a=`<div class="quote-html">${e.comments[n].text}</div>`;break}n.quoteHtml=a}a.push(n)}),this.messagesData=a},onMessageClick(t,e,a){let s=a.target.nodeName.toLowerCase();if("img"===s){let t=a.target.getAttribute("src");t&&(this.photos=[t],this.photoBrowserKey=+new Date,this.$nextTick(()=>{this.$refs.photoBrowser.open(0)}))}else"a"!==s&&this.showPopover(t,a)},isFirstMessage(t,e){const a=this,s=a.messagesData[e-1];return!t.isTitle&&(!s||s.type!==t.type||s.name!==t.name)},isLastMessage(t,e){const a=this,s=a.messagesData[e+1];return!t.isTitle&&(!s||s.type!==t.type||s.name!==t.name)},isTailMessage(t,e){const a=this,s=a.messagesData[e+1];return!t.isTitle&&(!s||s.type!==t.type||s.name!==t.name)}}},b=v,y=(a("d945"),Object(p["a"])(b,m,g,!1,null,null,null)),w=y.exports,x=[{path:"/",component:h},{path:"/item/:id",component:w}],_={components:{f7App:o["b"],f7View:o["o"]},data(){let t=localStorage.getItem("theme"),e=t||"auto";return{f7Params:{theme:e,routes:x,id:"m.hn"},root:"/"}}},k=_,P=(a("5c0b"),Object(p["a"])(k,i,r,!1,null,null,null)),j=P.exports,O=a("9483");Object(O["a"])("/hn/m/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}}),n["a"].use(o["a"]),s["a"].config.productionTip=!1,new s["a"]({render:t=>t(j)}).$mount("#app")},"5b0d":function(t,e,a){},"5c0b":function(t,e,a){"use strict";var s=a("9c0c"),n=a.n(s);n.a},"9c0c":function(t,e,a){},a0d9:function(t,e,a){},d945:function(t,e,a){"use strict";var s=a("a0d9"),n=a.n(s);n.a}});
//# sourceMappingURL=app.e16fa7fb.js.map