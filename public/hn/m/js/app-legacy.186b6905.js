(function(t){function e(e){for(var a,i,s=e[0],c=e[1],u=e[2],f=0,p=[];f<s.length;f++)i=s[f],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);l&&l(e);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(a=!1)}a&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},r={app:0},o=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/hn/m/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("06bb"),n("5b0d");var a=n("2b0e"),r=n("d42c"),o=n("ede0"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-app",{attrs:{params:t.f7Params}},[n("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.root,"stack-pages":!0}})],1)},s=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"homePage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[n("f7-navbar",[n("f7-nav-title",[t._v("HN × 🌀")])],1),n("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return n("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[n("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),n("span",{attrs:{slot:"after"},slot:"after"},[n("f7-chip",{staticClass:"chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},u=[],l=(n("99af"),n("d3b7"),n("96cf"),n("1da1")),f={components:{f7Page:o["m"],f7Navbar:o["l"],f7NavTitle:o["k"],f7List:o["f"],f7ListItem:o["g"],f7Chip:o["d"]},data:function(){return{page:1,listData:[],hasNext:!0,allowInfinite:!0}},methods:{onPageInit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData(t.page);case 2:case"end":return e.stop()}}),e)})))()},getData:function(){var t=arguments,e=this;return Object(l["a"])(regeneratorRuntime.mark((function n(){var a,r,o,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.length>0&&void 0!==t[0]?t[0]:1,n.next=3,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/news?page=").concat(a));case 3:return r=n.sent,n.next=6,r.json();case 6:o=n.sent,i=o.data,s=i.list.sort((function(t,e){return e.comments-t.comments})),e.listData=e.listData.concat(s),e.hasNext=i.hasNext,e.page++;case 12:case"end":return n.stop()}}),n)})))()},onInfinite:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.allowInfinite){e.next=2;break}return e.abrupt("return");case 2:return t.allowInfinite=!1,e.next=5,t.getData(t.page);case 5:t.allowInfinite=!0;case 6:case"end":return e.stop()}}),e)})))()}}},p=f,m=n("2877"),d=Object(m["a"])(p,c,u,!1,null,null,null),h=d.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("f7-navbar",{attrs:{title:t.title,"back-link":"返回",subtitle:t.count}},[n("f7-nav-right",[n("f7-link",{attrs:{"popover-open":".popover-menu","icon-ios":"f7:bars","icon-md":"material:menu"}})],1)],1),t.isInit?t._e():n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1),n("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,a){return n("f7-message",{key:e.meta.id+a,attrs:{type:e.type,name:e.name,first:t.isFirstMessage(e,a),last:t.isLastMessage(e,a),tail:t.isTailMessage(e,a)}},[e.text?n("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s((e.quoteHtml||"")+e.text)},slot:"text"}):t._e(),n("div",{attrs:{slot:"text-header"},slot:"text-header"},[e.meta.floor?[t._v(" "+t._s(e.meta.floor)+"楼 "),t.author===e.name?[t._v(" • 楼主 ")]:t._e()]:t._e()],2),n("div",{attrs:{slot:"text-footer"},slot:"text-footer"})])})),1)],1)},v=[],b=(n("4160"),n("b0c0"),n("159b"),{components:{f7Navbar:o["l"],f7Page:o["m"],f7Messages:o["i"],f7Message:o["h"],f7Preloader:o["n"],f7Block:o["c"],f7NavRight:o["j"],f7Link:o["e"]},created:function(){var t=this.$f7route.params.id;this.id=t},data:function(){return{messagesData:[],id:"",isInit:!1,count:"",author:"",title:"群聊"}},methods:{onPageInit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:t.isInit=!0;case 3:case"end":return e.stop()}}),e)})))()},onShowChatClick:function(){this.$f7router.navigate("/dialog/".concat(encodeURIComponent(JSON.stringify(this.dialogData))))},getText:function(t){var e=document.createElement("div");return e.innerHTML=t,e.innerText},getData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n,a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/item?id=").concat(t.id));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=a.data,t.count="".concat(r.comments.length," 条回复"),t.title=r.title,t.author=r.author,o=[{type:"received",name:r.author,text:r.title,meta:{id:r.id}}],r.text&&o.push({type:"received",name:r.author,text:r.text,meta:{id:r.id}}),r.comments.forEach((function(e,n){var a={type:"received",name:e.author,text:e.text,meta:{id:e.id,floor:n+1}};if(0!==e.parent){for(var i="",s=n-1;s>=0;s--)if(r.comments[s].id===e.parent){i='<div class="quote-html">'.concat(t.getText(r.comments[s].text),"</div>");break}a.quoteHtml=i}o.push(a)})),t.messagesData=o;case 14:case"end":return e.stop()}}),e)})))()},onMessageClick:function(t,e,n){var a=this,r=n.target.nodeName.toLowerCase();if("img"===r){var o=n.target.getAttribute("src");o&&(this.photos=[o],this.photoBrowserKey=+new Date,this.$nextTick((function(){a.$refs.photoBrowser.open(0)})))}else"a"!==r&&this.showPopover(t,n)},isFirstMessage:function(t,e){var n=this,a=n.messagesData[e-1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isLastMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isTailMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)}}}),w=b,x=(n("d945"),Object(m["a"])(w,g,v,!1,null,null,null)),y=x.exports,k=[{path:"/",component:h},{path:"/item/:id",component:y}],_={components:{f7App:o["b"],f7View:o["o"]},data:function(){var t=localStorage.getItem("theme"),e=t||"auto";return{f7Params:{theme:e,routes:k,id:"m.hn"},root:"/"}},created:function(){this.root="/hn/m/"}},j=_,O=(n("5c0b"),Object(m["a"])(j,i,s,!1,null,null,null)),P=O.exports,D=n("9483");Object(D["a"])("".concat("/hn/m/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),r["a"].use(o["a"]),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(P)}}).$mount("#app")},"5b0d":function(t,e,n){},"5c0b":function(t,e,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"9c0c":function(t,e,n){},a0d9:function(t,e,n){},d945:function(t,e,n){"use strict";var a=n("a0d9"),r=n.n(a);r.a}});
//# sourceMappingURL=app-legacy.186b6905.js.map