(function(t){function e(e){for(var a,s,o=e[0],c=e[1],l=e[2],f=0,p=[];f<o.length;f++)s=o[f],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/hn/m/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("06bb"),n("5b0d");var a=n("2b0e"),r=n("d42c"),i=n("ede0"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-app",{attrs:{params:t.f7Params}},[n("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.root,"stack-pages":!0}})],1)},o=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"homePage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[n("f7-navbar",[n("f7-nav-title",[t._v("HN × 🌀")]),n("f7-nav-right",[n("f7-link",{staticClass:"notranslate",attrs:{href:"/random","icon-ios":"f7:calendar","icon-md":"material:menu"}})],1)],1),n("TabView",{attrs:{current:"/"}}),n("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return n("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[n("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),n("span",{attrs:{slot:"after"},slot:"after"},[n("f7-chip",{staticClass:"notranslate chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},l=[],u=(n("99af"),n("d3b7"),n("96cf"),n("1da1")),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-toolbar",{attrs:{position:"bottom",tabbar:"",labels:""}},t._l(t.tabs,(function(e){return n("f7-link",{key:e.link,attrs:{"tab-link-active":e.link===t.current,"tab-link":"",href:e.link,animate:!1,"icon-ios":e.icon}})})),1)},p=[],m={components:{f7Link:i["e"],f7Toolbar:i["o"]},extends:i["o"],data:function(){return{tabs:[{link:"/",icon:"f7:chat_bubble"}]}},props:{current:{type:String,required:!0}}},h=m,d=n("2877"),g=Object(d["a"])(h,f,p,!1,null,"212cd73a",null),v=g.exports,b={components:{f7Page:i["m"],f7Navbar:i["l"],f7NavTitle:i["k"],f7NavRight:i["j"],f7Link:i["e"],f7List:i["f"],f7ListItem:i["g"],f7Chip:i["d"],TabView:v},data:function(){return{page:1,listData:[],hasNext:!0,allowInfinite:!0}},methods:{onPageInit:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData(t.page);case 2:case"end":return e.stop()}}),e)})))()},getData:function(){var t=arguments,e=this;return Object(u["a"])(regeneratorRuntime.mark((function n(){var a,r,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.length>0&&void 0!==t[0]?t[0]:1,n.next=3,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/news?page=").concat(a));case 3:return r=n.sent,n.next=6,r.json();case 6:i=n.sent,s=i.data,e.listData=e.listData.concat(s.list),e.hasNext=s.hasNext,e.page++;case 11:case"end":return n.stop()}}),n)})))()},onInfinite:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.allowInfinite){e.next=2;break}return e.abrupt("return");case 2:return t.allowInfinite=!1,e.next=5,t.getData(t.page);case 5:t.allowInfinite=!0;case 6:case"end":return e.stop()}}),e)})))()}}},x=b,w=Object(d["a"])(x,c,l,!1,null,null,null),k=w.exports,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"randomPage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[n("f7-navbar",{attrs:{"back-link":"返回"}},[n("f7-nav-title",[t._v("Random")])],1),n("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return n("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[n("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),n("span",{attrs:{slot:"after"},slot:"after"},[n("f7-chip",{staticClass:"notranslate chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},y=[],j={components:{f7Page:i["m"],f7Navbar:i["l"],f7NavTitle:i["k"],f7List:i["f"],f7ListItem:i["g"],f7Chip:i["d"]},data:function(){return{listData:[],hasNext:!0,allowInfinite:!0}},methods:{onPageInit:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/random"));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=a.data,t.listData=t.listData.concat(r.list);case 8:case"end":return e.stop()}}),e)})))()},onInfinite:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.allowInfinite){e.next=2;break}return e.abrupt("return");case 2:return t.allowInfinite=!1,e.next=5,t.getData(t.page);case 5:t.allowInfinite=!0;case 6:case"end":return e.stop()}}),e)})))()}}},I=j,O=Object(d["a"])(I,_,y,!1,null,null,null),D=O.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("f7-navbar",{attrs:{title:t.title,"back-link":"返回",subtitle:t.count}},[n("f7-nav-right",[n("f7-link",{staticClass:"notranslate",attrs:{external:"",href:t.link,target:"_blank","icon-ios":"f7:link","icon-md":"material:menu"}})],1)],1),t.isInit?t._e():n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1),t.isInit?n("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.content)}}):t._e(),n("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,a){return n("f7-message",{key:e.meta.id+a,attrs:{type:e.type,name:e.name,first:t.isFirstMessage(e,a),last:t.isLastMessage(e,a),tail:t.isTailMessage(e,a)}},[e.text?n("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s(e.text)},slot:"text"}):t._e(),n("div",{attrs:{slot:"text-header"},slot:"text-header"},[e.meta.floor?[t._v(" "+t._s(e.meta.floor)+"楼 "),t.author===e.name?[t._v(" • 楼主 ")]:t._e()]:t._e()],2)])})),1)],1)},R=[],T=(n("4160"),n("b0c0"),n("9911"),n("159b"),{components:{f7Navbar:i["l"],f7Page:i["m"],f7Messages:i["i"],f7Message:i["h"],f7Preloader:i["n"],f7Block:i["c"],f7NavRight:i["j"],f7Link:i["e"]},created:function(){var t=this.$f7route.params.id;this.id=t},data:function(){return{messagesData:[],id:"",isInit:!1,count:"",author:"",link:"",title:"群聊",content:""}},methods:{onPageInit:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:t.isInit=!0;case 3:case"end":return e.stop()}}),e)})))()},onShowChatClick:function(){this.$f7router.navigate("/dialog/".concat(encodeURIComponent(JSON.stringify(this.dialogData))))},getText:function(t){var e=document.createElement("div");return e.innerHTML=t,e.innerText},getData:function(){var t=this;return Object(u["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/item?id=").concat(t.id));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=a.data,t.count="".concat(r.comments.length," 条回复"),t.title=r.title,t.author=r.author,t.link=r.link,t.content=r.content,i=[],r.text&&i.push({type:"received",name:r.author,text:r.text,meta:{id:r.id}}),r.comments.forEach((function(t,e){var n={type:"received",name:t.author,text:t.text,meta:{id:t.id,floor:e+1}};i.push(n)})),t.messagesData=i;case 16:case"end":return e.stop()}}),e)})))()},onMessageClick:function(t,e,n){var a=this,r=n.target.nodeName.toLowerCase();if("img"===r){var i=n.target.getAttribute("src");i&&(this.photos=[i],this.photoBrowserKey=+new Date,this.$nextTick((function(){a.$refs.photoBrowser.open(0)})))}else"a"!==r&&this.showPopover(t,n)},isFirstMessage:function(t,e){var n=this,a=n.messagesData[e-1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isLastMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isTailMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)}}}),C=T,M=(n("d945"),Object(d["a"])(C,P,R,!1,null,null,null)),N=M.exports,L=[{path:"/",component:k},{path:"/random",component:D},{path:"/item/:id",component:N}],$={components:{f7App:i["b"],f7View:i["p"]},data:function(){return{f7Params:{theme:"ios",routes:L,id:"m.hn"},root:"/"}},created:function(){this.root="/hn/m/"}},S=$,E=(n("5c0b"),Object(d["a"])(S,s,o,!1,null,null,null)),H=E.exports;r["a"].use(i["a"]),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(H)}}).$mount("#app")},"5b0d":function(t,e,n){},"5c0b":function(t,e,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"9c0c":function(t,e,n){},a0d9:function(t,e,n){},d945:function(t,e,n){"use strict";var a=n("a0d9"),r=n.n(a);r.a}});
//# sourceMappingURL=app-legacy.4f3bb7c9.js.map