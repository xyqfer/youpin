(function(t){function e(e){for(var a,s,r=e[0],l=e[1],c=e[2],u=0,h=[];u<r.length;u++)s=r[u],i[s]&&h.push(i[s][0]),i[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);f&&f(e);while(h.length)h.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,r=1;r<n.length;r++){var l=n[r];0!==i[l]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},i={0:0},o=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/nytimes/m/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var f=l;o.push([0,1]),n()})({"+1uB":function(t,e,n){},0:function(t,e,n){t.exports=n("Vtdi")},"AZ2/":function(t,e,n){"use strict";var a=n("gPrn"),i=n.n(a);i.a},Acfx:function(t,e,n){},"BzP+":function(t,e,n){"use strict";var a=n("+1uB"),i=n.n(a);i.a},"EG/1":function(t,e,n){},MIbh:function(t,e,n){},T4lo:function(t,e,n){"use strict";var a=n("Acfx"),i=n.n(a);i.a},Vtdi:function(t,e,n){"use strict";n.r(e);n("91GP"),n("yt8O"),n("VRzm");var a=n("Kw5r"),i=n("1Cyj"),o=n("7eDf"),s=n("oAJy"),r=n.n(s),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-app",{attrs:{params:t.f7Params}},[n("f7-statusbar"),n("f7-panel",{attrs:{left:"",cover:""}},[n("f7-view",{attrs:{url:"/menu/","links-view":".view-main"}})],1),n("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.pushStateRoot,"stack-pages":!0}})],1)},c=[],f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"homePage",attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("f7-navbar",[n("f7-nav-left",[n("f7-link",{attrs:{"icon-ios":"f7:bars","icon-md":"material:menu","panel-open":"left"}})],1),n("f7-nav-title",[t._v("? × 🌀")])],1),n("f7-toolbar",{attrs:{tabbar:""}},[n("f7-link",{attrs:{"tab-link-active":"","tab-link":"",href:"/",animate:!1,text:"声"}}),n("f7-link",{attrs:{"tab-link":"",href:"/today",animate:!1,text:"色"}})],1),n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.newsList,function(e){return n("f7-list-item",{key:e.url,attrs:{link:"/content?name="+e.url+"&title="+e.title}},[n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(e.title)+"\n      ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(e.summary)+"\n      ")])])}))],1)},u=[],h="https://ibdkopi6vn.avosapps.us",g={home:"".concat(h,"/api/v1/nytimes/home"),content:"".concat(h,"/api/v1/nytimes/content"),category:"".concat(h,"/api/v1/nytimes/category"),today:"".concat(h,"/api/v1/nytimes/today"),content2:"".concat(h,"/api/v1/nytimes/content2"),translate:"".concat(h,"/api/v1/nytimes/translate")},p=g,m={components:{f7View:o["t"],f7Panel:o["p"],f7Page:o["o"],f7Navbar:o["n"],f7NavTitle:o["m"],f7NavLeft:o["l"],f7Link:o["f"],f7Toolbar:o["s"],f7List:o["g"],f7ListItem:o["h"],f7Icon:o["e"]},data:function(){return{newsList:[],lfKey:"/list/home/nyt-cn"}},created:function(){var t=this;this.$lf.getItem(this.lfKey).then(function(e){e&&(t.newsList=e)}).catch(function(t){console.log(t)})},methods:{onPageInit:function(){var t=this;this.$nextTick(function(){t.$f7.ptr.get(t.$refs.homePage.$el.querySelector(".ptr-content")).refresh()})},onRefresh:function(t,e){this.getData().then(function(){e()})},getData:function(){var t=this;return this.$http.get(p.home).then(function(e){e.success&&(t.newsList=e.data,t.$lf.setItem(t.lfKey,e.data).catch(function(t){console.log(t)}))}).catch(function(t){console.log(t)})}}},d=m,v=(n("AZ2/"),n("KHd+")),b=Object(v["a"])(d,f,u,!1,null,"71710557",null),y=b.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:"homePage",attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("f7-navbar",[n("f7-nav-title",[t._v("? × 🌀")])],1),n("f7-toolbar",{attrs:{tabbar:""}},[n("f7-link",{attrs:{"tab-link":"",href:"/",animate:!1,text:"声"}}),n("f7-link",{attrs:{"tab-link-active":"","tab-link":"",href:"/today",animate:!1,text:"色"}})],1),n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.newsList,function(e){return n("f7-list-item",{key:e.url,attrs:{link:"/content2?name="+e.url+"&title="+e.title}},[n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(e.title)+"\n      ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(e.summary)+"\n      ")])])}))],1)},_=[],x={components:{f7View:o["t"],f7Panel:o["p"],f7Page:o["o"],f7Navbar:o["n"],f7NavTitle:o["m"],f7Link:o["f"],f7Toolbar:o["s"],f7List:o["g"],f7ListItem:o["h"],f7Icon:o["e"]},data:function(){return{newsList:[],lfKey:"/list/home/nyt"}},created:function(){var t=this;this.$lf.getItem(this.lfKey).then(function(e){e&&(t.newsList=e)}).catch(function(t){console.log(t)})},methods:{onPageInit:function(){var t=this;this.$nextTick(function(){t.$f7.ptr.get(t.$refs.homePage.$el.querySelector(".ptr-content")).refresh()})},onRefresh:function(t,e){this.getData().then(function(){e()})},getData:function(){var t=this;return this.$http.get(p.today).then(function(e){e.success&&(t.newsList=e.data,t.$lf.setItem(t.lfKey,e.data).catch(function(t){console.log(t)}))}).catch(function(t){console.log(t)})}}},w=x,P=(n("s8ng"),Object(v["a"])(w,k,_,!1,null,"27f82207",null)),I=P.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{attrs:{"infinite-preloader":t.showPreloader,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[n("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}}),n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.newsList,function(e){return n("f7-list-item",{key:e.url,attrs:{link:"/content?name="+e.url+"&title="+e.title}},[n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(e.title)+"\n      ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(e.summary)+"\n      ")])])}))],1)},L=[],C={created:function(){this.name=this.$f7route.params.name,this.title=this.$f7route.query.title},components:{f7Page:o["o"],f7Navbar:o["n"],f7List:o["g"],f7ListItem:o["h"],f7Link:o["f"]},data:function(){return{newsList:[],name:"",title:"",p:1,allowInfinite:!0,showPreloader:!0}},methods:{onPageInit:function(){this.getData()},onInfinite:function(){var t=this;this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(function(){t.showPreloader=t.allowInfinite=!(t.p>t.total)}))},getData:function(){var t=this,e=this.name;return this.$http.get("".concat(p.category,"/").concat(e,"?p=").concat(this.p)).then(function(e){e.success&&(e.data&&e.data.length>0?(t.newsList=t.newsList.concat(e.data),t.p=t.p+1):(t.showPreloader=!1,t.allowInfinite=!1))}).catch(function(t){console.log(t)})}}},j=C,T=(n("T4lo"),Object(v["a"])(j,$,L,!1,null,null,null)),D=T.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("f7-navbar",{attrs:{title:t.title,subtitle:t.percent,"back-link":"返回"}}),t.isLoading?n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1):t._e(),n("f7-messages",{staticClass:"news-content-list"},t._l(t.bubbleData,function(e,a){return n("f7-message",{key:a,attrs:{type:e.type,first:!0,last:!0,tail:!0}},["received"===e.type?n("div",{attrs:{slot:"name"},slot:"name"},[t._v("\n        "+t._s(e.meta.originIndex+1)+"楼\n      ")]):t._e(),n("div",{attrs:{slot:"text"},slot:"text"},["received"===e.type?t._l(e.text.split(" "),function(e,a){return n("span",{key:a,on:{click:t.onWordClick}},[t._v("\n            "+t._s(e)+"\n          ")])}):[t._v("\n          "+t._s(e.text)+"\n        ")]],2),a<2*t.total-1?n("div",{attrs:{slot:"footer"},slot:"footer"},[n("a",{staticClass:"message-link",attrs:{href:"#"},on:{"~click":function(n){t.nextBubble(a+1,"sent"===e.type?e.meta.originIndex+1:null,n)}}},[t._v("\n          Next\n        ")])]):t._e()])}))],1)},q=[],B={components:{f7Navbar:o["n"],f7Page:o["o"],f7Messages:o["j"],f7MessagesTitle:o["k"],f7Message:o["i"],f7Preloader:o["q"],f7Block:o["c"]},data:function(){return{isLoading:!0,title:"加载中...",newsContent:[],bubbleData:[],percent:"",current:0,total:0,lfKey:""}},methods:{onPageInit:function(){var t=this,e="/content/".concat(this.$f7route.query.name,"/nyt-cn");this.$lf.getItem(e).then(function(e){e?(t.initData(e),t.isLoading=!1,t.title=t.$f7route.query.title):t.getData()}).catch(function(t){console.log(t)}),this.lfKey=e},getData:function(){var t=this,e=this.$f7route.query,n=e.title,a=e.name;this.$http.get("".concat(p.content,"?name=").concat(a)).then(function(e){e.success&&(t.initData(e.data),t.$lf.setItem(t.lfKey,e.data).catch(function(t){console.log(t)}))}).catch(function(t){console.log(t)}).finally(function(){t.isLoading=!1,t.title=n})},initData:function(t){var e=this;this.newsContent=t.content.reduce(function(t,e,n){return t.push({type:"received",text:e.en,meta:{originIndex:n}}),t.push({type:"sent",text:e.zh,meta:{originIndex:n}}),t},[]),this.$nextTick(function(){e.total=e.newsContent.length/2,e.nextBubble(0,0)})},nextBubble:function(t,e,n){this.bubbleData=this.newsContent.slice(0,t+1),null!=e&&(this.current=e+1),n&&n.target.classList.add("color-gray")},onWordClick:function(t){t.target.classList.toggle("bg-color-yellow")}},watch:{current:function(t){this.percent="".concat(t," / ").concat(this.total)}}},K=B,N=(n("BzP+"),Object(v["a"])(K,O,q,!1,null,null,null)),S=N.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("f7-navbar",{attrs:{title:t.title,subtitle:t.percent,"back-link":"返回"}}),t.isLoading?n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1):t._e(),n("f7-messages",{staticClass:"news-content-list"},t._l(t.bubbleData,function(e,a){return n("f7-message",{key:a,attrs:{type:e.type,first:!0,last:!0,tail:!0}},[e.meta.origin?n("div",{attrs:{slot:"name"},slot:"name"},[t._v("\n        "+t._s(e.meta.originIndex+1)+"楼\n      ")]):t._e(),n("div",{attrs:{slot:"text"},slot:"text"},["received"===e.type?t._l(e.text.split(" "),function(e,a){return n("span",{key:a,on:{click:t.onWordClick}},[t._v("\n            "+t._s(e)+"\n          ")])}):[t._v("\n          "+t._s(e.text)+"\n        ")]],2),n("div",{attrs:{slot:"footer"},slot:"footer"},[e.meta.next?[n("a",{staticClass:"message-link",attrs:{href:"#"},on:{"~click":function(n){t.nextBubble(e.meta.originIndex+1,n)}}},[t._v("\n            Next\n          ")])]:e.meta.origin?[n("a",{staticClass:"message-link",attrs:{href:"#"},on:{"~click":function(n){t.translateText(e.meta.originIndex,n)}}},[t._v("\n            Translate\n          ")])]:t._e()],2)])})),t.isTranslating?n("f7-message",{attrs:{type:"received",typing:!0,first:!0,last:!0,tail:!0}}):t._e()],1)},M=[],A={components:{f7Navbar:o["n"],f7Page:o["o"],f7Messages:o["j"],f7MessagesTitle:o["k"],f7Message:o["i"],f7Preloader:o["q"],f7Block:o["c"]},data:function(){return{isLoading:!0,title:"加载中...",newsContent:[],bubbleData:[],percent:"",current:0,total:0,lfKey:"",isTranslating:!1}},methods:{onPageInit:function(){var t=this,e="/content/".concat(this.$f7route.query.name,"/nyt");this.$lf.getItem(e).then(function(e){e?(t.initData(e),t.isLoading=!1,t.title=t.$f7route.query.title):t.getData()}).catch(function(t){console.log(t)}),this.lfKey=e},getData:function(){var t=this,e=this.$f7route.query,n=e.title,a=e.name;this.$http.get("".concat(p.content2,"?name=").concat(a)).then(function(e){e.success&&(t.initData(e.data),t.$lf.setItem(t.lfKey,e.data).catch(function(t){console.log(t)}))}).catch(function(t){console.log(t)}).finally(function(){t.isLoading=!1,t.title=n})},initData:function(t){var e=this;this.newsContent=t.content.reduce(function(t,e,n){return t.push({type:"received",text:e.en,meta:{originIndex:n,origin:!0}}),t},[]),this.$nextTick(function(){e.total=e.newsContent.length,e.nextBubble(0)})},nextBubble:function(t,e){this.bubbleData=this.bubbleData.concat(this.newsContent.slice(t,t+1)),this.current=t+1,e&&e.target.classList.add("color-gray")},onWordClick:function(t){t.target.classList.toggle("bg-color-yellow")},translateText:function(t,e){var n=this,a=this.newsContent[t].text,i=t;this.isTranslating=!0,this.translate(a).then(function(t){var e=i!==n.newsContent.length-1;n.bubbleData.push({type:"sent",text:t,meta:{next:e,originIndex:i}})}).catch(function(t){console.log(t)}).finally(function(){e&&e.target.classList.add("color-gray"),n.isTranslating=!1})},translate:function(t){return this.$http.post({url:p.translate,data:{text:t}}).then(function(t){return t.success?t.data.text:""}).catch(function(t){return console.log(t),""})}},watch:{current:function(t){this.percent="".concat(t," / ").concat(this.total)}}},R=A,V=(n("jRXf"),Object(v["a"])(R,E,M,!1,null,null,null)),z=V.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",[n("f7-block-title",[t._v("分类菜单")]),n("f7-list",t._l(t.list,function(t){return n("f7-list-item",{key:t.name,attrs:{link:"/category/"+t.name+"?title="+t.title,title:t.title,"panel-close":""}})}))],1)},W=[],X={components:{f7Page:o["o"],f7BlockTitle:o["d"],f7List:o["g"],f7ListItem:o["h"],f7Link:o["f"]},data:function(){return{list:[{name:"world",title:"国际"},{name:"china",title:"中国"},{name:"business",title:"商业与经济"},{name:"lens",title:"镜头"},{name:"technology",title:"科技"},{name:"science",title:"科学"},{name:"health",title:"健康"},{name:"education",title:"教育"},{name:"culture",title:"文化"},{name:"style",title:"风尚"},{name:"travel",title:"旅游"},{name:"real-estate",title:"房地产"},{name:"opinion",title:"观点与评论"}]}}},J=X,F=Object(v["a"])(J,G,W,!1,null,null,null),Z=F.exports,H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",[n("f7-navbar",{attrs:{title:"Not found",backLink:"返回"}}),n("f7-block",{attrs:{strong:""}},[n("p",[t._v("Sorry")]),n("p",[t._v("Requested content not found.")])])],1)},Y=[],Q={components:{f7Page:o["o"],f7Navbar:o["n"],f7Block:o["c"]}},U=Q,tt=Object(v["a"])(U,H,Y,!1,null,null,null),et=tt.exports,nt=[{path:"/",component:y},{path:"/today",component:I},{path:"/category/:name",component:D},{path:"/content",component:S},{path:"/content2",component:z},{path:"/menu",component:Z},{path:"(.*)",component:et}],at={components:{f7App:o["b"],f7Panel:o["p"],f7View:o["t"],f7Statusbar:o["r"]},data:function(){var t="md";return{f7Params:{theme:t,routes:nt,id:"m.nytimes"},pushStateRoot:"/"}},created:function(){this.pushStateRoot="/nytimes/m/"}},it=at,ot=(n("XAuw"),Object(v["a"])(it,l,c,!1,null,null,null)),st=ot.exports,rt=n("lIOY");Object(rt["a"])("".concat("/nytimes/m/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}}),i["a"].use(o["a"]),r.a.config({name:"m.nytimes"}),a["a"].config.productionTip=!1,a["a"].prototype.$http={get:function(t){return"string"===typeof t&&(t={url:t}),new Promise(function(e,n){i["a"].request(Object.assign({},{method:"GET",dataType:"json",cache:!1,success:function(t){e(t)},error:function(t,e){console.log(e),n(t,e)}},t))})},post:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(e,n){i["a"].request(Object.assign({},{method:"POST",dataType:"json",cache:!1,success:function(t){e(t)},error:function(t,e){console.log(e),n(t,e)}},t))})}},a["a"].prototype.$lf=r.a,new a["a"]({render:function(t){return t(st)}}).$mount("#app")},XAuw:function(t,e,n){"use strict";var a=n("EG/1"),i=n.n(a);i.a},gPrn:function(t,e,n){},jRXf:function(t,e,n){"use strict";var a=n("yf88"),i=n.n(a);i.a},s8ng:function(t,e,n){"use strict";var a=n("MIbh"),i=n.n(a);i.a},yf88:function(t,e,n){}});
//# sourceMappingURL=app-legacy.b696c06e.js.map