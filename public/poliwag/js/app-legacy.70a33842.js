(function(t){function n(n){for(var o,a,s=n[0],c=n[1],l=n[2],u=0,f=[];u<s.length;u++)a=s[u],i[a]&&f.push(i[a][0]),i[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);p&&p(n);while(f.length)f.shift()();return r.push.apply(r,l||[]),e()}function e(){for(var t,n=0;n<r.length;n++){for(var e=r[n],o=!0,a=1;a<e.length;a++){var s=e[a];0!==i[s]&&(o=!1)}o&&(r.splice(n--,1),t=c(c.s=e[0]))}return t}var o={},a={0:0},i={0:0},r=[];function s(t){return c.p+"js/"+({}[t]||t)+"-legacy."+{1:"62917f84",2:"444b6dd1",3:"f3f7ce64",4:"81934cff",5:"1bfa046b",6:"639d41da",7:"25b42dc5",8:"ccf84420"}[t]+".js"}function c(n){if(o[n])return o[n].exports;var e=o[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,c),e.l=!0,e.exports}c.e=function(t){var n=[],e={4:1,6:1,8:1};a[t]?n.push(a[t]):0!==a[t]&&e[t]&&n.push(a[t]=new Promise(function(n,e){for(var o="css/"+({}[t]||t)+"."+{1:"31d6cfe0",2:"31d6cfe0",3:"31d6cfe0",4:"2bb0bfa9",5:"31d6cfe0",6:"dbf40aea",7:"31d6cfe0",8:"2ff0c1c6"}[t]+".css",a=c.p+o,i=document.getElementsByTagName("link"),r=0;r<i.length;r++){var s=i[r],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===o||l===a))return n()}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++){s=u[r],l=s.getAttribute("data-href");if(l===o||l===a)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var o=n&&n.target&&n.target.src||a,i=new Error("Loading CSS chunk "+t+" failed.\n("+o+")");i.request=o,e(i)},f.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(f)}).then(function(){a[t]=0}));var o=i[t];if(0!==o)if(o)n.push(o[2]);else{var r=new Promise(function(n,e){o=i[t]=[n,e]});n.push(o[2]=r);var l,u=document.getElementsByTagName("head")[0],f=document.createElement("script");f.charset="utf-8",f.timeout=120,c.nc&&f.setAttribute("nonce",c.nc),f.src=s(t),l=function(n){f.onerror=f.onload=null,clearTimeout(p);var e=i[t];if(0!==e){if(e){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src,r=new Error("Loading chunk "+t+" failed.\n("+o+": "+a+")");r.type=o,r.request=a,e[1](r)}i[t]=void 0}};var p=setTimeout(function(){l({type:"timeout",target:f})},12e4);f.onerror=f.onload=l,u.appendChild(f)}return Promise.all(n)},c.m=t,c.c=o,c.d=function(t,n,e){c.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,n){if(1&n&&(t=c(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(c.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)c.d(e,o,function(n){return t[n]}.bind(null,o));return e},c.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(n,"a",n),n},c.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},c.p="/poliwag/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=n,l=l.slice();for(var f=0;f<l.length;f++)n(l[f]);var p=u;r.push([0,9]),e()})({0:function(t,n,e){t.exports=e("Vtdi")},"1SKg":function(t,n,e){},"2Xzj":function(t,n,e){"use strict";var o=e("L1Bj"),a=e.n(o);a.a},"6WP9":function(t,n,e){},"7xKt":function(t,n,e){"use strict";var o=e("6WP9"),a=e.n(o);a.a},"9wXL":function(t,n,e){},AYzy:function(t,n,e){"use strict";var o=e("SWeY"),a=e.n(o);a.a},AnZr:function(t,n,e){"use strict";var o=e("UA6I"),a=e.n(o);a.a},"B//T":function(t,n,e){"use strict";var o=e("gbcL"),a=e.n(o);a.a},BxIC:function(t,n,e){"use strict";e("INYr");var o=e("yT7P"),a=e("7eDf"),i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-toolbar",{attrs:{tabbar:""}},t._l(t.tabs,function(n){return e("f7-link",{key:n.region,attrs:{"tab-link-active":n.region===t.current,"tab-link":"",href:n.link,animate:!1,text:n.text}})}))},r=[],s={components:{f7Link:a["k"],f7Toolbar:a["F"]},extends:a["F"],data:function(){return{tabs:[{region:"nyt-cn",link:"/",text:"声"},{region:"te-today",link:"/te-today",text:"色"},{region:"wanqu",link:"/wanqu",text:"🌀"},{region:"sciam",link:"/sciam",text:"犬"},{region:"pocket",link:"/pocket",text:"马"}]}},props:{current:{type:String,required:!0}}},c=s,l=(e("Uud+"),e("KHd+")),u=Object(l["a"])(c,i,r,!1,null,"69679271",null),f=u.exports,p=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-fab",{attrs:{slot:"fixed",position:"right-bottom",href:!!t.href&&t.href},slot:"fixed"},[t._l(t.icons,function(t){return e("f7-icon",{key:t,attrs:{md:"material:"+t}})}),t.buttons.length>0?e("f7-fab-buttons",{attrs:{position:"top"}},t._l(t.buttons,function(n){return e("f7-fab-button",{key:n.icon},[e("f7-link",{attrs:{href:n.url}},[n.icon?e("f7-icon",{attrs:{material:n.icon}}):t._e(),n.text?[t._v("\n          "+t._s(n.text)+"\n        ")]:t._e()],2)],1)})):t._e()],2)},g=[],h={components:{f7Fab:a["f"],f7FabButtons:a["h"],f7FabButton:a["g"],f7Icon:a["i"],f7Link:a["k"]},extends:a["f"],data:function(){return{}},props:{href:{type:String},icons:{type:Array,default:function(){return[]}},buttons:{type:Array,default:function(){return[]}}}},d=h,m=(e("AYzy"),Object(l["a"])(d,p,g,!1,null,"5180db54",null)),b=m.exports,v=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-navbar",{attrs:{title:t.backLink?t.title:"",subtitle:t.subtitle,"back-link":!!t.backLink&&t.backLink}},[e("f7-nav-left",[t._t("left")],2),t.backLink?t._e():e("f7-nav-title",[t._v(t._s(t.title))]),e("f7-nav-right",[t._t("right")],2)],1)},k=[],w={components:{f7Navbar:a["u"],f7NavTitle:a["t"],f7NavLeft:a["r"],f7NavRight:a["s"]},extends:a["u"],data:function(){return{}},props:{title:{type:String,default:"Poliwag × 🌀"},backLink:{type:[String,Boolean],default:!1},subtitle:{type:String,default:""}}},y=w,_=(e("2Xzj"),Object(l["a"])(y,v,k,!1,null,"352626b8",null)),x=_.exports,P=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.data,function(n,o){return e("f7-list-item",{key:n.url,attrs:{swipeout:t.swipeout,link:n.link}},[n.title?e("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n      "+t._s(n.title)+"\n    ")]):t._e(),n.summary?e("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n      "+t._s(n.summary)+"\n    ")]):t._e(),t.swipeout?e("f7-swipeout-actions",{attrs:{right:""}},[e("f7-swipeout-button",{attrs:{color:"blue",close:""},on:{click:function(e){t.onButtonClick(n,o)}}},[t._v("\n        Save\n      ")])],1):t._e()],1)}))},I=[],C={components:{f7List:a["l"],f7ListItem:a["n"],f7SwipeoutActions:a["C"],f7SwipeoutButton:a["D"]},extends:a["l"],data:function(){return{}},props:{swipeout:{type:Boolean,default:!0},data:{type:Array,default:function(){return[]}}},methods:{onButtonClick:function(t,n){this.$emit("swipeout-button:click",t,n)}}},D=C,j=(e("b4I7"),Object(l["a"])(D,P,I,!1,null,"73ca1686",null)),L=j.exports,$={components:{f7Page:a["v"],f7Link:a["k"],f7Toolbar:a["F"],f7List:a["l"],f7ListItem:a["n"],f7Icon:a["i"],f7Popover:a["y"],f7Block:a["c"],PoliwagTab:f,PoliwagFab:b,PoliwagNavbar:x,PoliwagList:L},data:function(){return{}},methods:{getData:function(){return this.$store.dispatch("".concat(this.region,"/getData"))},onPageInit:function(){this.triggerRefresh()},triggerRefresh:function(){var t=this;this.$nextTick(function(){t.$f7.ptr.get(t.$refs[t.pageRef].$el.querySelector(".ptr-content")).refresh()})},onRefresh:function(t,n){this.getData().then().catch(function(t){return console.log(t)}).finally(n)},savePocket:function(t){var n=this,e="/pocket",a=Object(o["a"])({},t,{url:this.formatLink(t)});this.$lf.getItem(e).then(function(t){t||(t=[]);var o=t.findIndex(function(t){return t.url===a.url});-1===o?(t.unshift(a),n.$lf.setItem(e,t).then(function(){n.showNotification("Saved")}).catch(function(t){console.log(t)})):n.showNotification("Duplicated")}).catch(function(t){console.log(t)})},showNotification:function(t){this.$f7.notification.create({title:"Poliwag × 🌀",titleRightText:"Now",text:t,closeTimeout:1200}).open()},formatLink:function(t){return"/content?url=".concat(encodeURIComponent(t.url),"&title=").concat(t.title||"","&region=").concat(this.region)}},computed:{pageData:function(){var t=this;return this.$store.state[this.region].data.map(function(n){return n.link=t.formatLink(n),n})},pageRef:function(){return"ref-".concat(this.region)}}};n["a"]=$},L1Bj:function(t,n,e){},SWeY:function(t,n,e){},UA6I:function(t,n,e){},"Uud+":function(t,n,e){"use strict";var o=e("qlTh"),a=e.n(o);a.a},Vtdi:function(t,n,e){"use strict";e.r(n);e("91GP"),e("yt8O"),e("VRzm");var o=e("Kw5r"),a=e("1Cyj"),i=e("7eDf"),r=e("oAJy"),s=e.n(r),c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-app",{attrs:{params:t.f7Params}},[e("f7-statusbar"),e("f7-panel",{attrs:{left:"",cover:""}},[e("f7-view",{attrs:{url:"/menu/","links-view":".view-main"}})],1),e("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.pushStateRoot,"stack-pages":!0}})],1)},l=[],u=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar",[e("template",{slot:"left"},[e("f7-link",{attrs:{"icon-md":"material:menu","panel-open":"left"}})],1)],2),e("poliwag-tab",{attrs:{current:t.region}}),e("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}}),e("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}})],1)},f=[],p=e("BxIC"),g={mixins:[p["a"]],data:function(){return{region:"nyt-cn",fabIcons:["adb","close"],fabButtons:[{icon:"cloud_circle",url:"/nyt-book"},{icon:"av_timer",url:"/nyt-today"}]}}},h=g,d=e("KHd+"),m=Object(d["a"])(h,u,f,!1,null,null,null),b=m.exports,v=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar"),e("poliwag-tab",{attrs:{current:t.region}}),e("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData,function(n){return e("f7-list-item",{key:n.url,attrs:{swipeout:"",header:" ",link:t.formatLink(n)}},[e("div",{staticClass:"text-color-purple",attrs:{slot:"header"},slot:"header"},[t._v("\n        "+t._s(n.flyTitle)+"\n      ")]),e("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(n.title)+"\n      ")]),e("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(n.summary)+"\n      ")]),e("div",{attrs:{slot:"footer"},slot:"footer"},[e("img",{staticClass:"footer-img",attrs:{src:n.img,alt:n.title}})]),e("f7-swipeout-actions",{attrs:{right:""}},[e("f7-swipeout-button",{attrs:{color:"blue",close:""},on:{click:function(e){t.savePocket(n)}}},[t._v("\n          Save\n        ")])],1)],1)})),e("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}})],1)},k=[],w={components:{f7SwipeoutActions:i["C"],f7SwipeoutButton:i["D"]},mixins:[p["a"]],data:function(){return{region:"te-today",fabIcons:["beach_access","close"],fabButtons:[{icon:"tonality",url:"/te-magazine"},{icon:"timelapse",url:"/te-gbr"}]}},methods:{formatLink:function(t){return"/content?url=".concat(encodeURIComponent(t.url),"&title=").concat(t.title||"","&region=te")}}},y=w,_=(e("AnZr"),Object(d["a"])(y,v,k,!1,null,"7a8a5594",null)),x=_.exports,P=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar",[e("template",{slot:"right"},[e("f7-link",{attrs:{"popover-open":".search-input","icon-md":"material:voicemail"}})],1)],2),e("poliwag-tab",{attrs:{current:t.region}}),e("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}}),e("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}}),e("f7-popover",{ref:"searchInput",staticClass:"search-input"},[e("f7-list",[e("f7-list-item",{attrs:{link:!1,title:"搜索"}},[e("f7-input",{attrs:{type:"text",placeholder:"请输入地址","clear-button":""},nativeOn:{keyup:function(n){return"button"in n||!t._k(n.keyCode,"enter",13,n.key,"Enter")?t.onFly(n):null}}})],1)],1)],1)],1)},I=[],C={components:{f7Input:i["j"]},mixins:[p["a"]],data:function(){return{region:"wanqu",fabIcons:["adjust","close"],fabButtons:[{text:"随机",url:"/wanqu-random"},{text:"热门",url:"/wanqu-hot"}]}},methods:{onFly:function(t){var n=t.target.value;this.$refs.searchInput.f7Popover.close(),this.$f7router.navigate("/content?url=".concat(encodeURIComponent(n),"&title=&region=crawl"))},formatLink:function(t){return"/content?url=".concat(encodeURIComponent(t.url),"&title=").concat(t.title||"","&region=crawl")}}},D=C,j=Object(d["a"])(D,P,I,!1,null,null,null),L=j.exports,$=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{attrs:{infinite:!0,"infinite-preloader":t.showPreloader,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[e("poliwag-navbar",[e("template",{slot:"right"},[e("f7-link",{attrs:{"popover-open":".page-input2","icon-md":"material:location_searching"}})],1)],2),e("poliwag-tab",{attrs:{current:t.region}}),e("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}}),e("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}}),e("f7-popover",{ref:"pageInput",staticClass:"page-input2"},[e("f7-list",[e("f7-list-item",{attrs:{link:!1,title:"页码"}},[e("f7-input",{attrs:{type:"number",placeholder:"1~100","clear-button":""},nativeOn:{keyup:function(n){return"button"in n||!t._k(n.keyCode,"enter",13,n.key,"Enter")?t.jumpPage(n):null}}})],1)],1)],1)],1)},R=[],T={components:{f7Input:i["j"]},mixins:[p["a"]],data:function(){return{region:"sciam",p:1,allowInfinite:!0,showPreloader:!0,fabIcons:["palette","close"],fabButtons:[{icon:"tonality",url:"/times"},{icon:"timelapse",url:"/subtitle"}]}},methods:{onPageInit:function(){this.getData()},onInfinite:function(){var t=this;this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(function(){t.showPreloader=t.allowInfinite=!(t.p>t.total)}))},getData:function(){var t=this;return this.$store.dispatch("".concat(this.region,"/getData"),{p:this.p}).then(function(){t.p=t.p+1}).catch(function(t){console.log(t)})},jumpPage:function(t){var n=+t.target.value;this.$refs.pageInput.f7Popover.close(),this.p=n,this.$store.commit("".concat(this.region,"/reset")),this.getData()}}},O=T,S=Object(d["a"])(O,$,R,!1,null,null,null),B=S.exports,E=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{on:{"page:init":t.onPageInit}},[e("poliwag-navbar"),e("poliwag-tab",{attrs:{current:t.region}}),e("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData,function(n,o){return e("f7-list-item",{key:n.url+"-"+o,attrs:{swipeout:"",link:n.url},on:{"swipeout:deleted":function(n){t.deletePocket(o)}}},[e("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(n.title)+"\n      ")]),e("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(n.summary)+"\n      ")]),e("f7-swipeout-actions",{attrs:{right:""}},[e("f7-swipeout-button",{attrs:{delete:""}},[t._v("\n          Delete\n        ")])],1)],1)}))],1)},q=[],A=(e("INYr"),e("iv4g")),N={components:{f7SwipeoutActions:i["C"],f7SwipeoutButton:i["D"]},mixins:[p["a"]],data:function(){return{region:"pocket",pockList:[]}},methods:{onPageInit:function(){this.getData()},getData:function(){var t=this;return this.$store.dispatch("".concat(this.region,"/getData")).then(function(n){n&&(t.pockList=Object(A["a"])(n))}).catch(function(t){console.log(t)})},deletePocket:function(t){var n=this,e=this.pockList.findIndex(function(e){return e.url===n.pockList[t].url});this.pockList.splice(e,1),this.$nextTick(function(){n.$store.dispatch("".concat(n.region,"/updateData"),n.pockList).then(function(){n.showNotification("Deleted")}).catch(function(t){console.log(t)})})}}},z=N,U=Object(d["a"])(z,E,q,!1,null,null,null),G=U.exports,F=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar",{staticClass:"bg-color-red",attrs:{title:"商论","back-link":"返回"}}),e("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}})],1)},K=[],M={mixins:[p["a"]],data:function(){return{region:"te-gbr"}},computed:{pageData:function(){var t=this;return this.$store.state[this.region].data.map(function(n){return n.url=n.articleId,n.link=t.formatLink(n),n})}}},Y=M,W=Object(d["a"])(Y,F,K,!1,null,null,null),J=W.exports,V=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar",{staticClass:"bg-color-purple",attrs:{title:"The Economist","back-link":"返回"}}),t.pageData.cover?e("f7-block",[e("img",{staticClass:"cover",attrs:{src:t.pageData.cover.img,alt:t.pageData.cover.topic}})]):t._e(),e("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData.list,function(n){return e("f7-list-group",{key:n.title},[e("f7-list-item",{staticClass:"bg-color-purple text-color-white",attrs:{"group-title":"",title:n.title}}),t._l(n.list,function(n){return e("f7-list-item",{key:n.url,attrs:{header:" ",link:t.formatLink(n)}},[e("div",{staticClass:"text-color-purple",attrs:{slot:"header"},slot:"header"},[t._v("\n          "+t._s(n.flyTitle)+"\n        ")]),e("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n          "+t._s(n.title)+"\n        ")])])})],2)}))],1)},X=[],Z={components:{f7ListGroup:i["m"]},mixins:[p["a"]],data:function(){return{region:"te-magazine"}},methods:{formatLink:function(t){return"/content?url=".concat(encodeURIComponent(t.url),"&title=").concat(t.title||"","&region=te")}},computed:{pageData:function(){return this.$store.state[this.region].data},"pageData.list":function(){var t=this;return this.$store.state[this.region].data.list.map(function(n){return n.link=t.formatLink(n),n})}}},H=Z,Q=(e("7xKt"),Object(d["a"])(H,V,X,!1,null,"30f85826",null)),tt=Q.exports,nt=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar",{attrs:{title:"随机文章","back-link":"返回"}}),e("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}})],1)},et=[],ot={mixins:[p["a"]],data:function(){return{region:"wanqu-random"}},methods:{formatLink:function(t){return"/content?url=".concat(encodeURIComponent(t.url),"&title=").concat(t.title||"","&region=crawl")}}},at=ot,it=Object(d["a"])(at,nt,et,!1,null,null,null),rt=it.exports,st=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar",{attrs:{title:"近期热门文章","back-link":"返回"}}),e("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}})],1)},ct=[],lt={mixins:[p["a"]],data:function(){return{region:"wanqu-hot"}},methods:{formatLink:function(t){return"/content?url=".concat(encodeURIComponent(t.url),"&title=").concat(t.title||"","&region=crawl")}}},ut=lt,ft=Object(d["a"])(ut,st,ct,!1,null,null,null),pt=ft.exports,gt=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[e("poliwag-navbar",{attrs:{title:t.title,subtitle:t.percent,"back-link":"返回"}},[t.isLoading?t._e():e("template",{slot:"right"},[e("f7-link",{attrs:{"popover-open":".content-menu","icon-md":"material:menu"}})],1)],2),t.isLoading?e("f7-block",{staticClass:"text-align-center"},[e("f7-preloader")],1):t._e(),e("f7-messages",{staticClass:"news-content-list"},[t._l(t.bubbleData,function(n,o){return e("f7-message",{key:o,attrs:{type:n.type,first:!0,last:!0,tail:!0}},["received"===n.type?e("div",{attrs:{slot:"name"},slot:"name"},[t._v("\n        "+t._s(n.meta.originIndex+1)+"楼\n      ")]):t._e(),e("div",{attrs:{slot:"text"},slot:"text"},["received"===n.type?t._l(n.text.split(" "),function(n,o){return e("div",{key:o,staticClass:"word-container"},[e("span",{staticClass:"word",on:{click:t.onWordClick}},[t._v(t._s(n))]),t._v(" ")])}):[t._v("\n          "+t._s(n.text)+"\n        ")]],2),o<2*t.total-1?e("div",{attrs:{slot:"footer"},slot:"footer"},[e("f7-segmented",[o%2===0?e("f7-button",{staticClass:"message-link",attrs:{href:"/theater?url="+t.link+"&region="+t.region+"&index="+n.meta.originIndex,color:"gray"}},[t._v("\n            Theater\n          ")]):t._e(),e("f7-button",{staticClass:"message-link",attrs:{color:"gray"},nativeOn:{"~click":function(e){t.nextBubble(o+1,"sent"===n.type?n.meta.originIndex+1:null)}}},[t._v("\n            Next\n          ")])],1)],1):t._e()])}),t.isTranslating?e("f7-message",{attrs:{type:"received",typing:!0,first:!0,last:!0,tail:!0}}):t._e()],2),e("f7-popover",{staticClass:"content-menu"},[e("f7-list",[e("f7-list-item",{attrs:{title:"阅读模式","popover-close":"",link:"/paper?url="+t.link+"&title="+t.title+"&region="+t.contentRegion}}),e("f7-list-item",{attrs:{title:"清除缓存","popover-close":"",link:!1},on:{click:t.clearStorage}})],1)],1)],1)},ht=[],dt=(e("rGqo"),e("dRp0")),mt="https://ibdkopi6vn.avosapps.us",bt={};["nyt-cn","nyt-category","nyt-today","nyt-book","te-gbr","te-today","te-magazine","chat","wanqu","wanqu-hot","wanqu-random","i21st","subtitle","times","translate","content","sciam"].forEach(function(t){bt[t]="".concat(mt,"/api/v1/poliwag/").concat(t)});var vt=bt,kt="content",wt={components:{f7Messages:i["p"],f7MessagesTitle:i["q"],f7Message:i["o"],f7Preloader:i["z"],f7Button:i["e"],f7Segmented:i["A"]},mixins:[p["a"]],data:function(){return{region:kt,contentRegion:"",isLoading:!0,title:"加载中...",newsContent:[],bubbleData:[],percent:"",current:0,total:0,link:"",url:"",isTranslating:!1,translatedText:null}},methods:{onPageInit:function(){var t=this.$f7route.query,n=t.url,e=t.region;this.getData({url:n,region:e}),this.contentRegion=e,this.url=n,this.link=encodeURIComponent(n)},getData:function(t){var n=this,e=t.url,o=t.region,a=this.$f7route.query.title,i={url:e,region:o};return Promise.all([this.$store.dispatch("".concat(this.region,"/getContent"),i),this.$store.dispatch("".concat(this.region,"/getProgress"),i)]).then(function(){n.initData()}).catch(function(t){console.error(t)}).finally(function(){n.isLoading=!1,n.title=a})},initData:function(){var t=this;this.newsContent=this.contentData.reduce(function(t,n,e){return t.push({type:"received",text:n.en,meta:{originIndex:e}}),t.push({type:"sent",text:n.zh,meta:{originIndex:e}}),t},[]),this.$nextTick(function(){t.total=t.newsContent.length/2,t.nextBubble(t.progress,Math.floor(t.progress/2))})},nextBubble:function(t,n){var e=this,o=this.newsContent.slice(0,t+1);null==o[t].text?this.translatedText?(o[t].text=this.translatedText,this.bubbleData=this.newsContent.slice(0,t+1),this.translatedText=null):(this.isTranslating=!0,this.translate({text:o[t-1].text,type:"all"}).then(function(n){o[t].text=n,e.bubbleData=e.newsContent.slice(0,t+1)}).finally(function(){e.isTranslating=!1})):this.bubbleData=o,t%2===0&&null==this.newsContent[t+1].text&&this.translate({text:o[t].text,type:"all"}).then(function(t){e.translatedText=t}).catch(function(t){console.error(t)}),null!=n&&(this.current=n+1),this.$store.dispatch("".concat(this.region,"/setProgress"),{url:this.url,region:this.contentRegion,progress:t})},onWordClick:function(t){t.target.classList.add("bg-color-purple"),t.target.classList.add("text-color-white")},translate:function(t){var n=t.text,e=t.type;return dt["a"].post({url:vt.translate,data:{text:n,type:e}}).then(function(t){return t.success?t.data.text:""}).catch(function(t){return console.error(t),""})},clearStorage:function(){this.$store.dispatch("".concat(this.region,"/clearStorage"),{url:this.url,region:this.contentRegion}).then(function(){location.reload(!0)})}},computed:{contentData:function(){return this.$store.state[this.region].contentGroup["/".concat(this.url,"/").concat(this.contentRegion)]},progress:function(){return this.$store.state[this.region].progressGroup["/".concat(this.url,"/").concat(this.contentRegion)]}},watch:{current:function(t){this.percent="".concat(t," / ").concat(this.total)}}},yt=wt,_t=(e("B//T"),Object(d["a"])(yt,gt,ht,!1,null,"085e2c4f",null)),xt=_t.exports,Pt=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[e("poliwag-navbar",{attrs:{title:"Subtitle","back-link":"返回"}}),e("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData,function(n){return e("f7-list-item",{key:n.url,attrs:{header:n.category,link:t.formatLink(n)}},[e("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(n.articleId)+"\n      ")])])}))],1)},It=[],Ct={mixins:[p["a"]],data:function(){return{region:"subtitle"}},methods:{formatLink:function(t){return"/content?url=".concat(t.articleId,"&title=").concat(t.articleId,"&region=subtitle")}}},Dt=Ct,jt=Object(d["a"])(Dt,Pt,It,!1,null,null,null),Lt=jt.exports,$t=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",[e("f7-navbar",{attrs:{title:"Not found",backLink:"返回"}}),e("f7-block",{attrs:{strong:""}},[e("p",[t._v("Sorry")]),e("p",[t._v("Page not found.")])])],1)},Rt=[],Tt={components:{f7Page:i["v"],f7Navbar:i["u"],f7Block:i["c"]}},Ot=Tt,St=Object(d["a"])(Ot,$t,Rt,!1,null,null,null),Bt=St.exports,Et=[{path:"/",component:b},{path:"/nyt-today",async:function(t,n,o){var a=function(){return e.e(1).then(e.bind(null,"aI3L"))};a().then(function(t){o({component:t.default})})}},{path:"/nyt-book",async:function(t,n,o){var a=function(){return e.e(2).then(e.bind(null,"R/dN"))};a().then(function(t){o({component:t.default})})}},{path:"/te-today",component:x},{path:"/te-gbr",component:J},{path:"/te-magazine",component:tt},{path:"/wanqu",component:L},{path:"/wanqu-random",component:rt},{path:"/wanqu-hot",component:pt},{path:"/sciam",component:B},{path:"/times",async:function(t,n,o){var a=function(){return e.e(3).then(e.bind(null,"0Af7"))};a().then(function(t){o({component:t.default})})}},{path:"/subtitle",component:Lt},{path:"/pocket",component:G},{path:"/paper",async:function(t,n,o){var a=function(){return e.e(4).then(e.bind(null,"lKu8"))};a().then(function(t){o({component:t.default})})}},{path:"/nyt-category/:name",async:function(t,n,o){var a=function(){return e.e(5).then(e.bind(null,"l27s"))};a().then(function(t){o({component:t.default})})}},{path:"/content",component:xt},{path:"/theater",async:function(t,n,o){var a=function(){return e.e(6).then(e.bind(null,"ivw8"))};a().then(function(t){o({component:t.default})})}},{path:"/menu",async:function(t,n,o){var a=function(){return e.e(7).then(e.bind(null,"c9As"))};a().then(function(t){o({component:t.default})})}},{path:"/zhihu",async:function(t,n,o){var a=function(){return e.e(8).then(e.bind(null,"9gpg"))};a().then(function(t){o({component:t.default})})}},{path:"(.*)",component:Bt}],qt={components:{f7App:i["b"],f7Panel:i["x"],f7View:i["G"],f7Statusbar:i["B"]},data:function(){var t="md";return{f7Params:{theme:t,routes:Et,id:"liangliang.poliwag"},pushStateRoot:"/"}},created:function(){this.pushStateRoot="/poliwag"}},At=qt,Nt=Object(d["a"])(At,c,l,!1,null,null,null),zt=Nt.exports,Ut=e("L2JU"),Gt=(e("Z2Ku"),"sciam"),Ft={namespaced:!0,state:{data:[]},mutations:{update:function(t,n){t.data=t.data.concat(n)},reset:function(t){t.data=[]}},actions:{getData:function(t,n){var e=t.commit,o=n.p;return new Promise(function(t,n){dt["a"].get("".concat(vt[Gt],"?p=").concat(o)).then(function(o){o.success?(e("update",o.data),t()):n()}).catch(function(t){console.log(t),n()})})}}},Kt=Ft,Mt="nyt-category",Yt={namespaced:!0,state:{data:[]},mutations:{update:function(t,n){t.data=t.data.concat(n)},reset:function(t){t.data=[]}},actions:{getData:function(t,n){var e=t.commit,o=n.name,a=n.p;return new Promise(function(t,n){dt["a"].get("".concat(vt[Mt],"?name=").concat(o,"&p=").concat(a)).then(function(o){o.success?(e("update",o.data),t()):n()}).catch(function(t){console.log(t),n()})})}}},Wt=Yt;s.a.config({name:"liangliang.poliwag"});var Jt="/pocket",Vt={namespaced:!0,state:{data:[]},mutations:{update:function(t,n){t.data=n}},actions:{getData:function(t){var n=t.commit;return new Promise(function(t,e){s.a.getItem(Jt).then(function(e){e&&n("update",e),t(e)}).catch(function(t){console.log(t),e(t)})})},updateData:function(t,n){var e=t.commit;return new Promise(function(t,o){s.a.setItem(Jt,n).then(function(){e("update",n),t()}).catch(function(t){console.log(t),o(t)})})}}},Xt=Vt;s.a.config({name:"liangliang.poliwag"});var Zt={namespaced:!0,state:{data:[],contentGroup:{},progressGroup:{}},mutations:{setContent:function(t,n){var e=n.url,o=n.region,a=n.data,i="/".concat(e,"/").concat(o);t.contentGroup[i]=a.content},setProgress:function(t,n){var e=n.url,o=n.region,a=n.progress;t.progressGroup["/".concat(e,"/").concat(o)]=a}},actions:{getContent:function(t,n){var e=t.commit,o=n.url,a=n.region,i="/content/".concat(o,"/").concat(a);return new Promise(function(t,n){var r=function(){dt["a"].get("".concat(vt["content"],"?url=").concat(encodeURIComponent(o),"&region=").concat(a)).then(function(r){var c=r.success,l=r.data;c?(e("setContent",{url:o,region:a,data:l}),t(l),s.a.setItem(i,l)):n()}).catch(function(t){console.log(t),n(t)})};s.a.getItem(i).then(function(n){n?(e("setContent",{url:o,region:a,data:n}),t(n)):r()}).catch(function(t){console.log(t),r()})})},getProgress:function(t,n){var e=t.commit,o=n.url,a=n.region,i="/progress/".concat(o,"/").concat(a);return new Promise(function(t,n){s.a.getItem(i).then(function(n){var i=n||0;e("setProgress",{url:o,region:a,progress:i}),t(i)}).catch(function(t){console.log(t),n(t)})})},setProgress:function(t,n){var e=t.commit,o=n.url,a=n.region,i=n.progress,r=void 0===i?0:i,c="/progress/".concat(o,"/").concat(a);return new Promise(function(t,n){s.a.setItem(c,r).then(function(){e("setProgress",{url:o,region:a,progress:r}),t(r)}).catch(function(t){console.log(t),n(t)})})},clearStorage:function(t,n){var e=t.commit,o=n.url,a=n.region,i="/content/".concat(o,"/").concat(a),r="/progress/".concat(o,"/").concat(a);return Promise.all([s.a.removeItem(i),s.a.removeItem(r)]).then(function(){e("setProgress",{url:o,region:a,progress:0}),e("setContent",{url:o,region:a,data:{}})})}}},Ht=Zt;s.a.config({name:"liangliang.poliwag"});var Qt=["nyt-cn","nyt-today","nyt-book","te-gbr","te-today","te-magazine","wanqu","wanqu-hot","wanqu-random","times","subtitle"],tn=["te-magazine"],nn={};Qt.forEach(function(t){nn[t]={namespaced:!0,state:{data:tn.includes(t)?{list:[]}:[]},mutations:{update:function(t,n){t.data=n}},actions:{getData:function(n){var e=n.commit,o="/page/".concat(t);return new Promise(function(n,a){s.a.getItem(o).then(function(t){t&&e("update",t)}).catch(function(t){return console.log(t)}),dt["a"].get(vt[t]).then(function(t){t.success?(s.a.setItem(o,t.data).catch(function(t){console.log(t)}),e("update",t.data),n()):a()}).catch(function(t){console.log(t),a()})})}}}}),nn["sciam"]=Kt,nn["nyt-category"]=Wt,nn["pocket"]=Xt,nn["content"]=Ht;var en=nn;o["a"].use(Ut["a"]);var on=new Ut["a"].Store({modules:en}),an=e("lIOY");Object(an["a"])("".concat("/poliwag/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});e("1SKg"),e("gEk7");a["b"].use(i["a"]),s.a.config({name:"liangliang.poliwag"}),o["a"].config.productionTip=!1,o["a"].prototype.$http={get:function(t){return"string"===typeof t&&(t={url:t}),new Promise(function(n,e){a["b"].request(Object.assign({},{method:"GET",dataType:"json",cache:!1,success:function(t){n(t)},error:function(t,n){console.log(n),e(t,n)}},t))})},post:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(n,e){a["b"].request(Object.assign({},{method:"POST",dataType:"json",cache:!1,success:function(t){n(t)},error:function(t,n){console.log(n),e(t,n)}},t))})}},o["a"].prototype.$lf=s.a,new o["a"]({store:on,render:function(t){return t(zt)}}).$mount("#app")},b4I7:function(t,n,e){"use strict";var o=e("9wXL"),a=e.n(o);a.a},dRp0:function(t,n,e){"use strict";e("91GP");var o=e("1Cyj"),a={get:function(t){return"string"===typeof t&&(t={url:t}),new Promise(function(n,e){Object(o["a"])(Object.assign({},{method:"GET",dataType:"json",cache:!1,success:function(t){n(t)},error:function(t,n){console.log(n),e(t,n)}},t))})},post:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(n,e){Object(o["a"])(Object.assign({},{method:"POST",dataType:"json",cache:!1,success:function(t){n(t)},error:function(t,n){console.log(n),e(t,n)}},t))})}};n["a"]=a},gEk7:function(t,n,e){},gbcL:function(t,n,e){},qlTh:function(t,n,e){}});
//# sourceMappingURL=app-legacy.70a33842.js.map