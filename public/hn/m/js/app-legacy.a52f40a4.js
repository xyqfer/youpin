(function(t){function e(e){for(var a,s,o=e[0],c=e[1],u=e[2],f=0,p=[];f<o.length;f++)s=o[f],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&p.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);l&&l(e);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/hn/m/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("06bb"),n("5b0d");var a=n("2b0e"),r=n("d42c"),i=n("ede0"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-app",{attrs:{params:t.f7Params}},[n("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.root,"stack-pages":!0}})],1)},o=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"homePage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[n("f7-navbar",[n("f7-nav-title",[t._v("HN × 🌀")]),n("f7-nav-right",[n("f7-link",{attrs:{href:"/random","icon-ios":"f7:calendar","icon-md":"material:menu"}})],1)],1),n("TabView",{attrs:{current:"/"}}),n("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return n("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[n("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),n("span",{attrs:{slot:"after"},slot:"after"},[n("f7-chip",{staticClass:"chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},u=[],l=(n("99af"),n("d3b7"),n("96cf"),n("1da1")),f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-toolbar",{attrs:{position:"bottom",tabbar:"",labels:""}},t._l(t.tabs,(function(e){return n("f7-link",{key:e.link,attrs:{"tab-link-active":e.link===t.current,"tab-link":"",href:e.link,animate:!1,"icon-ios":e.icon}})})),1)},p=[],m={components:{f7Link:i["e"],f7Toolbar:i["o"]},extends:i["o"],data:function(){return{tabs:[{link:"/",icon:"f7:chat_bubble"},{link:"/nyt",icon:"f7:equal_square"}]}},props:{current:{type:String,required:!0}}},g=m,h=n("2877"),d=Object(h["a"])(g,f,p,!1,null,"f8782714",null),v=d.exports,b={components:{f7Page:i["m"],f7Navbar:i["l"],f7NavTitle:i["k"],f7NavRight:i["j"],f7Link:i["e"],f7List:i["f"],f7ListItem:i["g"],f7Chip:i["d"],TabView:v},data:function(){return{page:1,listData:[],hasNext:!0,allowInfinite:!0}},methods:{onPageInit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData(t.page);case 2:case"end":return e.stop()}}),e)})))()},getData:function(){var t=arguments,e=this;return Object(l["a"])(regeneratorRuntime.mark((function n(){var a,r,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.length>0&&void 0!==t[0]?t[0]:1,n.next=3,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/news?page=").concat(a));case 3:return r=n.sent,n.next=6,r.json();case 6:i=n.sent,s=i.data,e.listData=e.listData.concat(s.list),e.hasNext=s.hasNext,e.page++;case 11:case"end":return n.stop()}}),n)})))()},onInfinite:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.allowInfinite){e.next=2;break}return e.abrupt("return");case 2:return t.allowInfinite=!1,e.next=5,t.getData(t.page);case 5:t.allowInfinite=!0;case 6:case"end":return e.stop()}}),e)})))()}}},x=b,w=Object(h["a"])(x,c,u,!1,null,null,null),k=w.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"randomPage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[n("f7-navbar",{attrs:{"back-link":"返回"}},[n("f7-nav-title",[t._v("Random")])],1),n("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return n("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[n("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),n("span",{attrs:{slot:"after"},slot:"after"},[n("f7-chip",{staticClass:"chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},_=[],D={components:{f7Page:i["m"],f7Navbar:i["l"],f7NavTitle:i["k"],f7List:i["f"],f7ListItem:i["g"],f7Chip:i["d"]},data:function(){return{listData:[],hasNext:!0,allowInfinite:!0}},methods:{onPageInit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/random"));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=a.data,t.listData=t.listData.concat(r.list);case 8:case"end":return e.stop()}}),e)})))()},onInfinite:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.allowInfinite){e.next=2;break}return e.abrupt("return");case 2:return t.allowInfinite=!1,e.next=5,t.getData(t.page);case 5:t.allowInfinite=!0;case 6:case"end":return e.stop()}}),e)})))()}}},j=D,I=Object(h["a"])(j,y,_,!1,null,null,null),P=I.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("f7-navbar",{attrs:{title:t.title,"back-link":"返回",subtitle:t.count}},[n("f7-nav-right",[n("f7-link",{attrs:{external:"",href:t.link,target:"_blank","icon-ios":"f7:link","icon-md":"material:menu"}})],1)],1),t.isInit?t._e():n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1),n("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,a){return n("f7-message",{key:e.meta.id+a,attrs:{type:e.type,name:e.name,first:t.isFirstMessage(e,a),last:t.isLastMessage(e,a),tail:t.isTailMessage(e,a)}},[e.text?n("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s(e.text)},slot:"text"}):t._e(),n("div",{attrs:{slot:"text-header"},slot:"text-header"},[e.meta.floor?[t._v(" "+t._s(e.meta.floor)+"楼 "),t.author===e.name?[t._v(" • 楼主 ")]:t._e()]:t._e()],2)])})),1)],1)},T=[],R=(n("4160"),n("b0c0"),n("9911"),n("159b"),{components:{f7Navbar:i["l"],f7Page:i["m"],f7Messages:i["i"],f7Message:i["h"],f7Preloader:i["n"],f7Block:i["c"],f7NavRight:i["j"],f7Link:i["e"]},created:function(){var t=this.$f7route.params.id;this.id=t},data:function(){return{messagesData:[],id:"",isInit:!1,count:"",author:"",link:"",title:"群聊"}},methods:{onPageInit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:t.isInit=!0;case 3:case"end":return e.stop()}}),e)})))()},onShowChatClick:function(){this.$f7router.navigate("/dialog/".concat(encodeURIComponent(JSON.stringify(this.dialogData))))},getText:function(t){var e=document.createElement("div");return e.innerHTML=t,e.innerText},getData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n,a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/hn/item?id=").concat(t.id));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=a.data,t.count="".concat(r.comments.length," 条回复"),t.title=r.title,t.author=r.author,t.link=r.link,i=[{type:"received",name:r.author,text:r.title,meta:{id:r.id}}],r.text&&i.push({type:"received",name:r.author,text:r.text,meta:{id:r.id}}),r.comments.forEach((function(t,e){var n={type:"received",name:t.author,text:t.text,meta:{id:t.id,floor:e+1}};i.push(n)})),t.messagesData=i;case 15:case"end":return e.stop()}}),e)})))()},onMessageClick:function(t,e,n){var a=this,r=n.target.nodeName.toLowerCase();if("img"===r){var i=n.target.getAttribute("src");i&&(this.photos=[i],this.photoBrowserKey=+new Date,this.$nextTick((function(){a.$refs.photoBrowser.open(0)})))}else"a"!==r&&this.showPopover(t,n)},isFirstMessage:function(t,e){var n=this,a=n.messagesData[e-1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isLastMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isTailMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)}}}),M=R,L=(n("d945"),Object(h["a"])(M,O,T,!1,null,null,null)),C=L.exports,N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"nytPage",attrs:{"infinite-preloader":t.isLoading,infinite:t.isLoading},on:{"page:init":t.onPageInit}},[n("f7-navbar",[n("f7-nav-title",[t._v("NYT")])],1),n("TabView",{attrs:{current:"/nyt"}}),n("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return n("f7-list-item",{key:e.url,attrs:{link:"/nyt-item?url="+encodeURIComponent(e.url)}},[n("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.summary))])])})),1)],1)},$=[],E={components:{f7Page:i["m"],f7Navbar:i["l"],f7NavTitle:i["k"],f7List:i["f"],f7ListItem:i["g"],TabView:v},data:function(){return{listData:[],isLoading:!0}},methods:{onPageInit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:t.isLoading=!1;case 3:case"end":return e.stop()}}),e)})))()},getData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/poliwag/nyt-cn"));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=a.data,t.listData=r;case 8:case"end":return e.stop()}}),e)})))()}}},S=E,H=Object(h["a"])(S,N,$,!1,null,null,null),V=H.exports,q=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}}),t.isInit?t._e():n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1),n("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,a){return n("f7-message",{key:a,attrs:{type:e.type,first:t.isFirstMessage(e,a),last:t.isLastMessage(e,a),tail:t.isTailMessage(e,a)}},[n("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s(e.text)},slot:"text"})])})),1)],1)},B=[],F=(n("13d5"),{components:{f7Navbar:i["l"],f7Page:i["m"],f7Messages:i["i"],f7Message:i["h"],f7Preloader:i["n"],f7Block:i["c"]},created:function(){var t=this.$f7route.query.url;this.url=t},data:function(){return{messagesData:[],url:"",isInit:!1,title:"加载中..."}},methods:{onPageInit:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getData();case 2:t.isInit=!0;case 3:case"end":return e.stop()}}),e)})))()},getText:function(t){var e=document.createElement("div");return e.innerHTML=t,e.innerText},getData:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://ibdkopi6vn.avosapps.us","/api/v1/poliwag/content?url=").concat(encodeURIComponent(t.url),"&region=nyt-cn"));case 2:return n=e.sent,e.next=5,n.json();case 5:a=e.sent,r=a.data,t.title=r.title,t.messagesData=r.content.reduce((function(t,e){return t.push({type:"received",text:e.en}),t.push({type:"sent",text:e.zh}),t}),[]);case 9:case"end":return e.stop()}}),e)})))()},isFirstMessage:function(t,e){var n=this,a=n.messagesData[e-1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isLastMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)},isTailMessage:function(t,e){var n=this,a=n.messagesData[e+1];return!t.isTitle&&(!a||a.type!==t.type||a.name!==t.name)}}}),J=F,U=Object(h["a"])(J,q,B,!1,null,null,null),A=U.exports,z=[{path:"/",component:k},{path:"/random",component:P},{path:"/item/:id",component:C},{path:"/nyt",component:V},{path:"/nyt-item",component:A}],K={components:{f7App:i["b"],f7View:i["p"]},data:function(){var t=localStorage.getItem("theme"),e=t||"auto";return{f7Params:{theme:e,routes:z,id:"m.hn"},root:"/"}},created:function(){this.root="/hn/m/"}},Y=K,G=(n("5c0b"),Object(h["a"])(Y,s,o,!1,null,null,null)),Q=G.exports;r["a"].use(i["a"]),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(Q)}}).$mount("#app")},"5b0d":function(t,e,n){},"5c0b":function(t,e,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"9c0c":function(t,e,n){},a0d9:function(t,e,n){},d945:function(t,e,n){"use strict";var a=n("a0d9"),r=n.n(a);r.a}});
//# sourceMappingURL=app-legacy.a52f40a4.js.map