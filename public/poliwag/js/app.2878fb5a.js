(function(t){function e(e){for(var a,o,i=e[0],l=e[1],c=e[2],u=0,p=[];u<i.length;u++)o=i[u],r[o]&&p.push(r[o][0]),r[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);f&&f(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,o=1;o<n.length;o++){var i=n[o];0!==r[i]&&(a=!1)}a&&(s.splice(e--,1),t=l(l.s=n[0]))}return t}var a={},o={0:0},r={0:0},s=[];function i(t){return l.p+"js/"+({}[t]||t)+"."+{1:"bbc34769",2:"88d1f923",3:"e39cb1f2",4:"50d6311f",5:"f80e3921",6:"909e98af",7:"f36f6521",8:"b4cdff4b"}[t]+".js"}function l(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(t){var e=[],n={4:1,6:1,8:1};o[t]?e.push(o[t]):0!==o[t]&&n[t]&&e.push(o[t]=new Promise(function(e,n){for(var a="css/"+({}[t]||t)+"."+{1:"31d6cfe0",2:"31d6cfe0",3:"31d6cfe0",4:"23a308e9",5:"31d6cfe0",6:"dbf40aea",7:"31d6cfe0",8:"6088f7b1"}[t]+".css",o=l.p+a,r=document.getElementsByTagName("link"),s=0;s<r.length;s++){var i=r[s],c=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(c===a||c===o))return e()}var u=document.getElementsByTagName("style");for(s=0;s<u.length;s++){i=u[s],c=i.getAttribute("data-href");if(c===a||c===o)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var a=e&&e.target&&e.target.src||o,r=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");r.request=a,n(r)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)}).then(function(){o[t]=0}));var a=r[t];if(0!==a)if(a)e.push(a[2]);else{var s=new Promise(function(e,n){a=r[t]=[e,n]});e.push(a[2]=s);var c,u=document.getElementsByTagName("head")[0],p=document.createElement("script");p.charset="utf-8",p.timeout=120,l.nc&&p.setAttribute("nonce",l.nc),p.src=i(t),c=function(e){p.onerror=p.onload=null,clearTimeout(f);var n=r[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,s=new Error("Loading chunk "+t+" failed.\n("+a+": "+o+")");s.type=a,s.request=o,n[1](s)}r[t]=void 0}};var f=setTimeout(function(){c({type:"timeout",target:p})},12e4);p.onerror=p.onload=c,u.appendChild(p)}return Promise.all(e)},l.m=t,l.c=a,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(n,a,function(e){return t[e]}.bind(null,a));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/poliwag/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var p=0;p<c.length;p++)e(c[p]);var f=u;s.push([0,9]),n()})({0:function(t,e,n){t.exports=n("Vtdi")},"1SKg":function(t,e,n){},"2Xzj":function(t,e,n){"use strict";var a=n("L1Bj"),o=n.n(a);o.a},"6WP9":function(t,e,n){},"7xKt":function(t,e,n){"use strict";var a=n("6WP9"),o=n.n(a);o.a},"9wXL":function(t,e,n){},AYzy:function(t,e,n){"use strict";var a=n("SWeY"),o=n.n(a);o.a},AnZr:function(t,e,n){"use strict";var a=n("UA6I"),o=n.n(a);o.a},"B//T":function(t,e,n){"use strict";var a=n("gbcL"),o=n.n(a);o.a},BxIC:function(t,e,n){"use strict";var a=n("yT7P"),o=n("7eDf"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-toolbar",{attrs:{tabbar:""}},t._l(t.tabs,function(e){return n("f7-link",{key:e.region,attrs:{"tab-link-active":e.region===t.current,"tab-link":"",href:e.link,animate:!1,text:e.text}})}))},s=[],i={components:{f7Link:o["k"],f7Toolbar:o["F"]},extends:o["F"],data(){return{tabs:[{region:"nyt-cn",link:"/",text:"声"},{region:"te-today",link:"/te-today",text:"色"},{region:"wanqu",link:"/wanqu",text:"🌀"},{region:"sciam",link:"/sciam",text:"犬"},{region:"pocket",link:"/pocket",text:"马"}]}},props:{current:{type:String,required:!0}}},l=i,c=(n("Uud+"),n("KHd+")),u=Object(c["a"])(l,r,s,!1,null,"69679271",null),p=u.exports,f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-fab",{attrs:{slot:"fixed",position:"right-bottom",href:!!t.href&&t.href},slot:"fixed"},[t._l(t.icons,function(t){return n("f7-icon",{key:t,attrs:{md:"material:"+t}})}),t.buttons.length>0?n("f7-fab-buttons",{attrs:{position:"top"}},t._l(t.buttons,function(e){return n("f7-fab-button",{key:e.icon},[n("f7-link",{attrs:{href:e.url}},[e.icon?n("f7-icon",{attrs:{material:e.icon}}):t._e(),e.text?[t._v("\n          "+t._s(e.text)+"\n        ")]:t._e()],2)],1)})):t._e()],2)},g=[],h={components:{f7Fab:o["f"],f7FabButtons:o["h"],f7FabButton:o["g"],f7Icon:o["i"],f7Link:o["k"]},extends:o["f"],data(){return{}},props:{href:{type:String},icons:{type:Array,default:()=>[]},buttons:{type:Array,default:()=>[]}}},d=h,m=(n("AYzy"),Object(c["a"])(d,f,g,!1,null,"5180db54",null)),b=m.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-navbar",{attrs:{title:t.backLink?t.title:"",subtitle:t.subtitle,"back-link":!!t.backLink&&t.backLink}},[n("f7-nav-left",[t._t("left")],2),t.backLink?t._e():n("f7-nav-title",[t._v(t._s(t.title))]),n("f7-nav-right",[t._t("right")],2)],1)},k=[],w={components:{f7Navbar:o["u"],f7NavTitle:o["t"],f7NavLeft:o["r"],f7NavRight:o["s"]},extends:o["u"],data(){return{}},props:{title:{type:String,default:"Poliwag × 🌀"},backLink:{type:[String,Boolean],default:!1},subtitle:{type:String,default:""}}},y=w,_=(n("2Xzj"),Object(c["a"])(y,v,k,!1,null,"352626b8",null)),x=_.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.data,function(e,a){return n("f7-list-item",{key:e.url,attrs:{swipeout:t.swipeout,link:e.link}},[e.title?n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n      "+t._s(e.title)+"\n    ")]):t._e(),e.summary?n("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n      "+t._s(e.summary)+"\n    ")]):t._e(),t.swipeout?n("f7-swipeout-actions",{attrs:{right:""}},[n("f7-swipeout-button",{attrs:{color:"blue",close:""},on:{click:function(n){t.onButtonClick(e,a)}}},[t._v("\n        Save\n      ")])],1):t._e()],1)}))},P=[],I={components:{f7List:o["l"],f7ListItem:o["n"],f7SwipeoutActions:o["C"],f7SwipeoutButton:o["D"]},extends:o["l"],data(){return{}},props:{swipeout:{type:Boolean,default:!0},data:{type:Array,default:()=>[]}},methods:{onButtonClick(t,e){this.$emit("swipeout-button:click",t,e)}}},C=I,D=(n("b4I7"),Object(c["a"])(C,$,P,!1,null,"73ca1686",null)),L=D.exports;const j={components:{f7Page:o["v"],f7Link:o["k"],f7Toolbar:o["F"],f7List:o["l"],f7ListItem:o["n"],f7Icon:o["i"],f7Popover:o["y"],f7Block:o["c"],PoliwagTab:p,PoliwagFab:b,PoliwagNavbar:x,PoliwagList:L},data(){return{}},methods:{getData(){return this.$store.dispatch(`${this.region}/getData`)},onPageInit(){this.triggerRefresh()},triggerRefresh(){this.$nextTick(()=>{this.$f7.ptr.get(this.$refs[this.pageRef].$el.querySelector(".ptr-content")).refresh()})},onRefresh(t,e){this.getData().then().catch(t=>console.log(t)).finally(e)},savePocket(t){const e="/pocket";let n=Object(a["a"])({},t,{url:this.formatLink(t)});this.$lf.getItem(e).then(t=>{t||(t=[]);let a=t.findIndex(t=>{return t.url===n.url});-1===a?(t.unshift(n),this.$lf.setItem(e,t).then(()=>{this.showNotification("Saved")}).catch(t=>{console.log(t)})):this.showNotification("Duplicated")}).catch(t=>{console.log(t)})},showNotification(t){this.$f7.notification.create({title:"Poliwag × 🌀",titleRightText:"Now",text:t,closeTimeout:1200}).open()},formatLink(t){return`/content?url=${encodeURIComponent(t.url)}&title=${t.title||""}&region=${this.region}`}},computed:{pageData(){return this.$store.state[this.region].data.map(t=>{return t.link=this.formatLink(t),t})},pageRef(){return`ref-${this.region}`}}};e["a"]=j},L1Bj:function(t,e,n){},SWeY:function(t,e,n){},UA6I:function(t,e,n){},"Uud+":function(t,e,n){"use strict";var a=n("qlTh"),o=n.n(a);o.a},Vtdi:function(t,e,n){"use strict";n.r(e);var a=n("Kw5r"),o=n("1Cyj"),r=n("7eDf"),s=n("oAJy"),i=n.n(s),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-app",{attrs:{params:t.f7Params}},[n("f7-statusbar"),n("f7-panel",{attrs:{left:"",cover:""}},[n("f7-view",{attrs:{url:"/menu/","links-view":".view-main"}})],1),n("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.pushStateRoot,"stack-pages":!0}})],1)},c=[],u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar",[n("template",{slot:"left"},[n("f7-link",{attrs:{"icon-md":"material:menu","panel-open":"left"}})],1)],2),n("poliwag-tab",{attrs:{current:t.region}}),n("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}}),n("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}})],1)},p=[],f=n("BxIC"),g={mixins:[f["a"]],data(){return{region:"nyt-cn",fabIcons:["adb","close"],fabButtons:[{icon:"cloud_circle",url:"/nyt-book"},{icon:"av_timer",url:"/nyt-today"}]}}},h=g,d=n("KHd+"),m=Object(d["a"])(h,u,p,!1,null,null,null),b=m.exports,v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar"),n("poliwag-tab",{attrs:{current:t.region}}),n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData,function(e){return n("f7-list-item",{key:e.url,attrs:{swipeout:"",header:" ",link:t.formatLink(e)}},[n("div",{staticClass:"text-color-purple",attrs:{slot:"header"},slot:"header"},[t._v("\n        "+t._s(e.flyTitle)+"\n      ")]),n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(e.title)+"\n      ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(e.summary)+"\n      ")]),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("img",{staticClass:"footer-img",attrs:{src:e.img,alt:e.title}})]),n("f7-swipeout-actions",{attrs:{right:""}},[n("f7-swipeout-button",{attrs:{color:"blue",close:""},on:{click:function(n){t.savePocket(e)}}},[t._v("\n          Save\n        ")])],1)],1)})),n("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}})],1)},k=[],w={components:{f7SwipeoutActions:r["C"],f7SwipeoutButton:r["D"]},mixins:[f["a"]],data(){return{region:"te-today",fabIcons:["beach_access","close"],fabButtons:[{icon:"tonality",url:"/te-magazine"},{icon:"timelapse",url:"/te-gbr"}]}},methods:{formatLink(t){return`/content?url=${encodeURIComponent(t.url)}&title=${t.title||""}&region=te`}}},y=w,_=(n("AnZr"),Object(d["a"])(y,v,k,!1,null,"7a8a5594",null)),x=_.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar",[n("template",{slot:"right"},[n("f7-link",{attrs:{"popover-open":".search-input","icon-md":"material:voicemail"}})],1)],2),n("poliwag-tab",{attrs:{current:t.region}}),n("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}}),n("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}}),n("f7-popover",{ref:"searchInput",staticClass:"search-input"},[n("f7-list",[n("f7-list-item",{attrs:{link:!1,title:"搜索"}},[n("f7-input",{attrs:{type:"text",placeholder:"请输入地址","clear-button":""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.onFly(e):null}}})],1)],1)],1)],1)},P=[],I={components:{f7Input:r["j"]},mixins:[f["a"]],data(){return{region:"wanqu",fabIcons:["adjust","close"],fabButtons:[{text:"随机",url:"/wanqu-random"},{text:"热门",url:"/wanqu-hot"}]}},methods:{onFly(t){let e=t.target.value;this.$refs.searchInput.f7Popover.close(),this.$f7router.navigate(`/content?url=${encodeURIComponent(e)}&title=&region=crawl`)},formatLink(t){return`/content?url=${encodeURIComponent(t.url)}&title=${t.title||""}&region=crawl`}}},C=I,D=Object(d["a"])(C,$,P,!1,null,null,null),L=D.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{attrs:{infinite:!0,"infinite-preloader":t.showPreloader,"hide-navbar-on-scroll":!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[n("poliwag-navbar",[n("template",{slot:"right"},[n("f7-link",{attrs:{"popover-open":".page-input2","icon-md":"material:location_searching"}})],1)],2),n("poliwag-tab",{attrs:{current:t.region}}),n("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}}),n("poliwag-fab",{attrs:{icons:t.fabIcons,buttons:t.fabButtons}}),n("f7-popover",{ref:"pageInput",staticClass:"page-input2"},[n("f7-list",[n("f7-list-item",{attrs:{link:!1,title:"页码"}},[n("f7-input",{attrs:{type:"number",placeholder:"1~100","clear-button":""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.jumpPage(e):null}}})],1)],1)],1)],1)},R=[],T={components:{f7Input:r["j"]},mixins:[f["a"]],data(){return{region:"sciam",p:1,allowInfinite:!0,showPreloader:!0,fabIcons:["palette","close"],fabButtons:[{icon:"tonality",url:"/times"},{icon:"timelapse",url:"/subtitle"}]}},methods:{onPageInit(){this.getData()},onInfinite(){this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(()=>{this.showPreloader=this.allowInfinite=!(this.p>this.total)}))},getData(){return this.$store.dispatch(`${this.region}/getData`,{p:this.p}).then(()=>{this.p=this.p+1}).catch(t=>{console.log(t)})},jumpPage(t){let e=+t.target.value;this.$refs.pageInput.f7Popover.close(),this.p=e,this.$store.commit(`${this.region}/reset`),this.getData()}}},O=T,S=Object(d["a"])(O,j,R,!1,null,null,null),B=S.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{on:{"page:init":t.onPageInit}},[n("poliwag-navbar"),n("poliwag-tab",{attrs:{current:t.region}}),n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData,function(e,a){return n("f7-list-item",{key:e.url+"-"+a,attrs:{swipeout:"",link:e.url},on:{"swipeout:deleted":function(e){t.deletePocket(a)}}},[n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(e.title)+"\n      ")]),n("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(e.summary)+"\n      ")]),n("f7-swipeout-actions",{attrs:{right:""}},[n("f7-swipeout-button",{attrs:{delete:""}},[t._v("\n          Delete\n        ")])],1)],1)}))],1)},q=[],A={components:{f7SwipeoutActions:r["C"],f7SwipeoutButton:r["D"]},mixins:[f["a"]],data(){return{region:"pocket",pockList:[]}},methods:{onPageInit(){this.getData()},getData(){return this.$store.dispatch(`${this.region}/getData`).then(t=>{t&&(this.pockList=[...t])}).catch(t=>{console.log(t)})},deletePocket(t){let e=this.pockList.findIndex(e=>{return e.url===this.pockList[t].url});this.pockList.splice(e,1),this.$nextTick(()=>{this.$store.dispatch(`${this.region}/updateData`,this.pockList).then(()=>{this.showNotification("Deleted")}).catch(t=>{console.log(t)})})}}},N=A,U=Object(d["a"])(N,E,q,!1,null,null,null),z=U.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar",{staticClass:"bg-color-red",attrs:{title:"商论","back-link":"返回"}}),n("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}})],1)},F=[],K={mixins:[f["a"]],data(){return{region:"te-gbr"}},computed:{pageData(){return this.$store.state[this.region].data.map(t=>{return t.url=t.articleId,t.link=this.formatLink(t),t})}}},M=K,W=Object(d["a"])(M,G,F,!1,null,null,null),Y=W.exports,J=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar",{staticClass:"bg-color-purple",attrs:{title:"The Economist","back-link":"返回"}}),t.pageData.cover?n("f7-block",[n("img",{staticClass:"cover",attrs:{src:t.pageData.cover.img,alt:t.pageData.cover.topic}})]):t._e(),n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData.list,function(e){return n("f7-list-group",{key:e.title},[n("f7-list-item",{staticClass:"bg-color-purple text-color-white",attrs:{"group-title":"",title:e.title}}),t._l(e.list,function(e){return n("f7-list-item",{key:e.url,attrs:{header:" ",link:t.formatLink(e)}},[n("div",{staticClass:"text-color-purple",attrs:{slot:"header"},slot:"header"},[t._v("\n          "+t._s(e.flyTitle)+"\n        ")]),n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n          "+t._s(e.title)+"\n        ")])])})],2)}))],1)},X=[],V={components:{f7ListGroup:r["m"]},mixins:[f["a"]],data(){return{region:"te-magazine"}},methods:{formatLink(t){return`/content?url=${encodeURIComponent(t.url)}&title=${t.title||""}&region=te`}},computed:{pageData(){return this.$store.state[this.region].data},"pageData.list"(){return this.$store.state[this.region].data.list.map(t=>{return t.link=this.formatLink(t),t})}}},H=V,Z=(n("7xKt"),Object(d["a"])(H,J,X,!1,null,"30f85826",null)),Q=Z.exports,tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar",{attrs:{title:"随机文章","back-link":"返回"}}),n("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}})],1)},et=[],nt={mixins:[f["a"]],data(){return{region:"wanqu-random"}},methods:{formatLink(t){return`/content?url=${encodeURIComponent(t.url)}&title=${t.title||""}&region=crawl`}}},at=nt,ot=Object(d["a"])(at,tt,et,!1,null,null,null),rt=ot.exports,st=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar",{attrs:{title:"近期热门文章","back-link":"返回"}}),n("poliwag-list",{attrs:{data:t.pageData},on:{"swipeout-button:click":t.savePocket}})],1)},it=[],lt={mixins:[f["a"]],data(){return{region:"wanqu-hot"}},methods:{formatLink(t){return`/content?url=${encodeURIComponent(t.url)}&title=${t.title||""}&region=crawl`}}},ct=lt,ut=Object(d["a"])(ct,st,it,!1,null,null,null),pt=ut.exports,ft=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("poliwag-navbar",{attrs:{title:t.title,subtitle:t.percent,"back-link":"返回"}},[t.isLoading?t._e():n("template",{slot:"right"},[n("f7-link",{attrs:{"popover-open":".content-menu","icon-md":"material:menu"}})],1)],2),t.isLoading?n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1):t._e(),n("f7-messages",{staticClass:"news-content-list"},[t._l(t.bubbleData,function(e,a){return n("f7-message",{key:a,attrs:{type:e.type,first:!0,last:!0,tail:!0}},["received"===e.type?n("div",{attrs:{slot:"name"},slot:"name"},[t._v("\n        "+t._s(e.meta.originIndex+1)+"楼\n      ")]):t._e(),n("div",{attrs:{slot:"text"},slot:"text"},["received"===e.type?t._l(e.text.split(" "),function(e,a){return n("div",{key:a,staticClass:"word-container"},[n("span",{staticClass:"word",on:{click:t.onWordClick}},[t._v(t._s(e))]),t._v(" ")])}):[t._v("\n          "+t._s(e.text)+"\n        ")]],2),a<2*t.total-1?n("div",{attrs:{slot:"footer"},slot:"footer"},[n("f7-segmented",[a%2===0?n("f7-button",{staticClass:"message-link",attrs:{href:"/theater?url="+t.link+"&region="+t.region+"&index="+e.meta.originIndex,color:"gray"}},[t._v("\n            Theater\n          ")]):t._e(),n("f7-button",{staticClass:"message-link",attrs:{color:"gray"},nativeOn:{"~click":function(n){t.nextBubble(a+1,"sent"===e.type?e.meta.originIndex+1:null)}}},[t._v("\n            Next\n          ")])],1)],1):t._e()])}),t.isTranslating?n("f7-message",{attrs:{type:"received",typing:!0,first:!0,last:!0,tail:!0}}):t._e()],2),n("f7-popover",{staticClass:"content-menu"},[n("f7-list",[n("f7-list-item",{attrs:{title:"阅读模式","popover-close":"",link:"/paper?url="+t.link+"&title="+t.title+"&region="+t.contentRegion}}),n("f7-list-item",{attrs:{title:"清除缓存","popover-close":"",link:!1},on:{click:t.clearStorage}})],1)],1)],1)},gt=[],ht=(n("rGqo"),n("dRp0")),dt=n("fBUP");const mt="content";var bt={components:{f7Messages:r["p"],f7MessagesTitle:r["q"],f7Message:r["o"],f7Preloader:r["z"],f7Button:r["e"],f7Segmented:r["A"]},mixins:[f["a"]],data(){return{region:mt,contentRegion:"",isLoading:!0,title:"加载中...",newsContent:[],bubbleData:[],percent:"",current:0,total:0,link:"",url:"",isTranslating:!1,translatedText:null}},methods:{onPageInit(){let t=this.$f7route.query,e=t.url,n=t.region;this.getData({url:e,region:n}),this.contentRegion=n,this.url=e,this.link=encodeURIComponent(e)},getData({url:t,region:e}){let n=this.$f7route.query.title,a={url:t,region:e};return Promise.all([this.$store.dispatch(`${this.region}/getContent`,a),this.$store.dispatch(`${this.region}/getProgress`,a)]).then(()=>{this.initData()}).catch(t=>{console.error(t)}).finally(()=>{this.isLoading=!1,this.title=n})},initData(){this.newsContent=this.contentData.reduce((t,e,n)=>{return t.push({type:"received",text:e.en,meta:{originIndex:n}}),t.push({type:"sent",text:e.zh,meta:{originIndex:n}}),t},[]),this.$nextTick(()=>{this.total=this.newsContent.length/2,this.nextBubble(this.progress,Math.floor(this.progress/2))})},nextBubble(t,e){let n=this.newsContent.slice(0,t+1);null==n[t].text?this.translatedText?(n[t].text=this.translatedText,this.bubbleData=this.newsContent.slice(0,t+1),this.translatedText=null):(this.isTranslating=!0,this.translate({text:n[t-1].text,type:"all"}).then(e=>{n[t].text=e,this.bubbleData=this.newsContent.slice(0,t+1)}).finally(()=>{this.isTranslating=!1})):this.bubbleData=n,t%2===0&&null==this.newsContent[t+1].text&&this.translate({text:n[t].text,type:"all"}).then(t=>{this.translatedText=t}).catch(t=>{console.error(t)}),null!=e&&(this.current=e+1),this.$store.dispatch(`${this.region}/setProgress`,{url:this.url,region:this.contentRegion,progress:t})},onWordClick(t){t.target.classList.add("bg-color-purple"),t.target.classList.add("text-color-white")},translate({text:t,type:e}){return ht["a"].post({url:dt["a"].translate,data:{text:t,type:e}}).then(t=>{return t.success?t.data.text:""}).catch(t=>{return console.error(t),""})},clearStorage(){this.$store.dispatch(`${this.region}/clearStorage`,{url:this.url,region:this.contentRegion}).then(()=>{location.reload(!0)})}},computed:{contentData(){return this.$store.state[this.region].contentGroup[`/${this.url}/${this.contentRegion}`]},progress(){return this.$store.state[this.region].progressGroup[`/${this.url}/${this.contentRegion}`]}},watch:{current(t){this.percent=`${t} / ${this.total}`}}},vt=bt,kt=(n("B//T"),Object(d["a"])(vt,ft,gt,!1,null,"085e2c4f",null)),wt=kt.exports,yt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{ref:t.pageRef,attrs:{ptr:!0},on:{"page:init":t.onPageInit,"ptr:refresh":t.onRefresh}},[n("poliwag-navbar",{attrs:{title:"Subtitle","back-link":"返回"}}),n("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pageData,function(e){return n("f7-list-item",{key:e.url,attrs:{header:e.category,link:t.formatLink(e)}},[n("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(e.articleId)+"\n      ")])])}))],1)},_t=[],xt={mixins:[f["a"]],data(){return{region:"subtitle"}},methods:{formatLink(t){return`/content?url=${t.articleId}&title=${t.articleId}&region=subtitle`}}},$t=xt,Pt=Object(d["a"])($t,yt,_t,!1,null,null,null),It=Pt.exports,Ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",[n("f7-navbar",{attrs:{title:"Not found",backLink:"返回"}}),n("f7-block",{attrs:{strong:""}},[n("p",[t._v("Sorry")]),n("p",[t._v("Page not found.")])])],1)},Dt=[],Lt={components:{f7Page:r["v"],f7Navbar:r["u"],f7Block:r["c"]}},jt=Lt,Rt=Object(d["a"])(jt,Ct,Dt,!1,null,null,null),Tt=Rt.exports,Ot=[{path:"/",component:b},{path:"/nyt-today",async(t,e,a){const o=()=>n.e(1).then(n.bind(null,"aI3L"));o().then(t=>{a({component:t.default})})}},{path:"/nyt-book",async(t,e,a){const o=()=>n.e(2).then(n.bind(null,"R/dN"));o().then(t=>{a({component:t.default})})}},{path:"/te-today",component:x},{path:"/te-gbr",component:Y},{path:"/te-magazine",component:Q},{path:"/wanqu",component:L},{path:"/wanqu-random",component:rt},{path:"/wanqu-hot",component:pt},{path:"/sciam",component:B},{path:"/times",async(t,e,a){const o=()=>n.e(3).then(n.bind(null,"0Af7"));o().then(t=>{a({component:t.default})})}},{path:"/subtitle",component:It},{path:"/pocket",component:z},{path:"/paper",async(t,e,a){const o=()=>n.e(4).then(n.bind(null,"lKu8"));o().then(t=>{a({component:t.default})})}},{path:"/nyt-category/:name",async(t,e,a){const o=()=>n.e(5).then(n.bind(null,"l27s"));o().then(t=>{a({component:t.default})})}},{path:"/content",component:wt},{path:"/theater",async(t,e,a){const o=()=>n.e(6).then(n.bind(null,"ivw8"));o().then(t=>{a({component:t.default})})}},{path:"/menu",async(t,e,a){const o=()=>n.e(7).then(n.bind(null,"c9As"));o().then(t=>{a({component:t.default})})}},{path:"/zhihu",async(t,e,a){const o=()=>n.e(8).then(n.bind(null,"9gpg"));o().then(t=>{a({component:t.default})})}},{path:"(.*)",component:Tt}],St={components:{f7App:r["b"],f7Panel:r["x"],f7View:r["G"],f7Statusbar:r["B"]},data(){let t="md";return{f7Params:{theme:t,routes:Ot,id:"liangliang.poliwag"},pushStateRoot:"/"}},created(){this.pushStateRoot="/poliwag"}},Bt=St,Et=Object(d["a"])(Bt,l,c,!1,null,null,null),qt=Et.exports,At=n("L2JU");const Nt="sciam",Ut={namespaced:!0,state:{data:[]},mutations:{update(t,e){t.data=t.data.concat(e)},reset(t){t.data=[]}},actions:{getData({commit:t},{p:e}){return new Promise((n,a)=>{ht["a"].get(`${dt["a"][Nt]}?p=${e}`).then(e=>{e.success?(t("update",e.data),n()):a()}).catch(t=>{console.log(t),a()})})}}};var zt=Ut;const Gt="nyt-category",Ft={namespaced:!0,state:{data:[]},mutations:{update(t,e){t.data=t.data.concat(e)},reset(t){t.data=[]}},actions:{getData({commit:t},{name:e,p:n}){return new Promise((a,o)=>{ht["a"].get(`${dt["a"][Gt]}?name=${e}&p=${n}`).then(e=>{e.success?(t("update",e.data),a()):o()}).catch(t=>{console.log(t),o()})})}}};var Kt=Ft;i.a.config({name:"liangliang.poliwag"});const Mt="/pocket",Wt={namespaced:!0,state:{data:[]},mutations:{update(t,e){t.data=e}},actions:{getData({commit:t}){return new Promise((e,n)=>{i.a.getItem(Mt).then(n=>{n&&t("update",n),e(n)}).catch(t=>{console.log(t),n(t)})})},updateData({commit:t},e){return new Promise((n,a)=>{i.a.setItem(Mt,e).then(()=>{t("update",e),n()}).catch(t=>{console.log(t),a(t)})})}}};var Yt=Wt;i.a.config({name:"liangliang.poliwag"});const Jt={namespaced:!0,state:{data:[],contentGroup:{},progressGroup:{}},mutations:{setContent(t,{url:e,region:n,data:a}){const o=`/${e}/${n}`;t.contentGroup[o]=a.content},setProgress(t,{url:e,region:n,progress:a}){t.progressGroup[`/${e}/${n}`]=a}},actions:{getContent({commit:t},{url:e,region:n}){const a=`/content/${e}/${n}`;return new Promise((o,r)=>{const s=()=>{ht["a"].get(`${dt["a"]["content"]}?url=${encodeURIComponent(e)}&region=${n}`).then(({success:s,data:l})=>{s?(t("setContent",{url:e,region:n,data:l}),o(l),i.a.setItem(a,l)):r()}).catch(t=>{console.log(t),r(t)})};i.a.getItem(a).then(a=>{a?(t("setContent",{url:e,region:n,data:a}),o(a)):s()}).catch(t=>{console.log(t),s()})})},getProgress({commit:t},{url:e,region:n}){const a=`/progress/${e}/${n}`;return new Promise((o,r)=>{i.a.getItem(a).then(a=>{let r=a||0;t("setProgress",{url:e,region:n,progress:r}),o(r)}).catch(t=>{console.log(t),r(t)})})},setProgress({commit:t},{url:e,region:n,progress:a=0}){const o=`/progress/${e}/${n}`;return new Promise((r,s)=>{i.a.setItem(o,a).then(()=>{t("setProgress",{url:e,region:n,progress:a}),r(a)}).catch(t=>{console.log(t),s(t)})})},clearStorage({commit:t},{url:e,region:n}){const a=`/content/${e}/${n}`,o=`/progress/${e}/${n}`;return Promise.all([i.a.removeItem(a),i.a.removeItem(o)]).then(()=>{t("setProgress",{url:e,region:n,progress:0}),t("setContent",{url:e,region:n,data:{}})})}}};var Xt=Jt;i.a.config({name:"liangliang.poliwag"});const Vt=["nyt-cn","nyt-today","nyt-book","te-gbr","te-today","te-magazine","wanqu","wanqu-hot","wanqu-random","times","subtitle"],Ht=["te-magazine"],Zt={};Vt.forEach(t=>{Zt[t]={namespaced:!0,state:{data:Ht.includes(t)?{list:[]}:[]},mutations:{update(t,e){t.data=e}},actions:{getData({commit:e}){const n=`/page/${t}`;return new Promise((a,o)=>{i.a.getItem(n).then(t=>{t&&e("update",t)}).catch(t=>console.log(t)),ht["a"].get(dt["a"][t]).then(t=>{t.success?(i.a.setItem(n,t.data).catch(t=>{console.log(t)}),e("update",t.data),a()):o()}).catch(t=>{console.log(t),o()})})}}}}),Zt["sciam"]=zt,Zt["nyt-category"]=Kt,Zt["pocket"]=Yt,Zt["content"]=Xt;var Qt=Zt;a["a"].use(At["a"]);var te=new At["a"].Store({modules:Qt}),ee=n("lIOY");Object(ee["a"])("/poliwag/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached(){console.log("Content has been cached for offline use.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(t){console.error("Error during service worker registration:",t)}});n("1SKg"),n("gEk7");o["b"].use(r["a"]),i.a.config({name:"liangliang.poliwag"}),a["a"].config.productionTip=!1,a["a"].prototype.$http={get(t){return"string"===typeof t&&(t={url:t}),new Promise((e,n)=>{o["b"].request(Object.assign({},{method:"GET",dataType:"json",cache:!1,success:t=>{e(t)},error:(t,e)=>{console.log(e),n(t,e)}},t))})},post(t={}){return new Promise((e,n)=>{o["b"].request(Object.assign({},{method:"POST",dataType:"json",cache:!1,success:t=>{e(t)},error:(t,e)=>{console.log(e),n(t,e)}},t))})}},a["a"].prototype.$lf=i.a,new a["a"]({store:te,render:t=>t(qt)}).$mount("#app")},b4I7:function(t,e,n){"use strict";var a=n("9wXL"),o=n.n(a);o.a},dRp0:function(t,e,n){"use strict";var a=n("1Cyj");const o={get(t){return"string"===typeof t&&(t={url:t}),new Promise((e,n)=>{Object(a["a"])(Object.assign({},{method:"GET",dataType:"json",cache:!1,success:t=>{e(t)},error:(t,e)=>{console.log(e),n(t,e)}},t))})},post(t={}){return new Promise((e,n)=>{Object(a["a"])(Object.assign({},{method:"POST",dataType:"json",cache:!1,success:t=>{e(t)},error:(t,e)=>{console.log(e),n(t,e)}},t))})}};e["a"]=o},fBUP:function(t,e,n){"use strict";n("rGqo");const a="https://ibdkopi6vn.erjsnfs.com",o={};["nyt-cn","nyt-category","nyt-today","nyt-book","te-gbr","te-today","te-magazine","chat","wanqu","wanqu-hot","wanqu-random","i21st","subtitle","times","translate","content","sciam"].forEach(t=>{o[t]=`${a}/api/v1/poliwag/${t}`}),e["a"]=o},gEk7:function(t,e,n){},gbcL:function(t,e,n){},qlTh:function(t,e,n){}});
//# sourceMappingURL=app.2878fb5a.js.map