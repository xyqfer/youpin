(function(t){function e(e){for(var i,o,r=e[0],l=e[1],c=e[2],p=0,u=[];p<r.length;p++)o=r[p],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&u.push(s[o][0]),s[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);f&&f(e);while(u.length)u.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],i=!0,r=1;r<a.length;r++){var l=a[r];0!==s[l]&&(i=!1)}i&&(n.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},s={app:0},n=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/hn/m/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var f=l;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e6cf"),a("cca6"),a("a79d"),a("06bb"),a("5b0d");var i=a("2b0e"),s=a("d42c"),n=a("ede0"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-app",{attrs:{params:t.f7Params}},[a("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.root,"stack-pages":!0}},[a("f7-panel",{attrs:{left:"",cover:""}},[a("f7-view",{attrs:{url:"/nyt-menu","links-view":".view-main"}})],1)],1)],1)},r=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{ref:"homePage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[a("f7-navbar",[a("f7-nav-title",[t._v("HN × 🌀")]),a("f7-nav-right",[a("f7-link",{attrs:{href:"/random","icon-ios":"f7:calendar","icon-md":"material:menu"}})],1)],1),a("TabView",{attrs:{current:"/"}}),a("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return a("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[a("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),a("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),a("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),a("span",{attrs:{slot:"after"},slot:"after"},[a("f7-chip",{staticClass:"chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},c=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-toolbar",{attrs:{position:"bottom",tabbar:"",labels:""}},t._l(t.tabs,(function(e){return a("f7-link",{key:e.link,attrs:{"tab-link-active":e.link===t.current,"tab-link":"",href:e.link,animate:!1,"icon-ios":e.icon}})})),1)},p=[],u={components:{f7Link:n["f"],f7Toolbar:n["r"]},extends:n["r"],data(){return{tabs:[{link:"/",icon:"f7:chat_bubble"},{link:"/nyt",icon:"f7:equal_square"}]}},props:{current:{type:String,required:!0}}},m=u,h=a("2877"),g=Object(h["a"])(m,f,p,!1,null,"f8782714",null),d=g.exports,v={components:{f7Page:n["o"],f7Navbar:n["n"],f7NavTitle:n["m"],f7NavRight:n["l"],f7Link:n["f"],f7List:n["g"],f7ListItem:n["h"],f7Chip:n["e"],TabView:d},data(){return{page:1,listData:[],hasNext:!0,allowInfinite:!0}},methods:{async onPageInit(){await this.getData(this.page)},async getData(t=1){const e=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/news?page="+t),{data:a}=await e.json();this.listData=this.listData.concat(a.list),this.hasNext=a.hasNext,this.page++},async onInfinite(){this.allowInfinite&&(this.allowInfinite=!1,await this.getData(this.page),this.allowInfinite=!0)}}},y=v,b=Object(h["a"])(y,l,c,!1,null,null,null),_=b.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{ref:"randomPage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[a("f7-navbar",{attrs:{"back-link":"返回"}},[a("f7-nav-title",[t._v("Random")])],1),a("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return a("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[a("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),a("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),a("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),a("span",{attrs:{slot:"after"},slot:"after"},[a("f7-chip",{staticClass:"chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},k=[],x={components:{f7Page:n["o"],f7Navbar:n["n"],f7NavTitle:n["m"],f7List:n["g"],f7ListItem:n["h"],f7Chip:n["e"]},data(){return{listData:[],hasNext:!0,allowInfinite:!0}},methods:{async onPageInit(){await this.getData()},async getData(){const t=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/random"),{data:e}=await t.json();this.listData=this.listData.concat(e.list)},async onInfinite(){this.allowInfinite&&(this.allowInfinite=!1,await this.getData(this.page),this.allowInfinite=!0)}}},D=x,I=Object(h["a"])(D,w,k,!1,null,null,null),P=I.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[a("f7-navbar",{attrs:{title:t.title,"back-link":"返回",subtitle:t.count}},[a("f7-nav-right",[a("f7-link",{attrs:{external:"",href:t.link,target:"_blank","icon-ios":"f7:link","icon-md":"material:menu"}})],1)],1),t.isInit?t._e():a("f7-block",{staticClass:"text-align-center"},[a("f7-preloader")],1),a("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,i){return a("f7-message",{key:e.meta.id+i,attrs:{type:e.type,name:e.name,first:t.isFirstMessage(e,i),last:t.isLastMessage(e,i),tail:t.isTailMessage(e,i)}},[e.text?a("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s(e.text)},slot:"text"}):t._e(),a("div",{attrs:{slot:"text-header"},slot:"text-header"},[e.meta.floor?[t._v(" "+t._s(e.meta.floor)+"楼 "),t.author===e.name?[t._v(" • 楼主 ")]:t._e()]:t._e()],2)])})),1)],1)},T=[],M={components:{f7Navbar:n["n"],f7Page:n["o"],f7Messages:n["j"],f7Message:n["i"],f7Preloader:n["q"],f7Block:n["c"],f7NavRight:n["l"],f7Link:n["f"]},created(){const{id:t}=this.$f7route.params;this.id=t},data(){return{messagesData:[],id:"",isInit:!1,count:"",author:"",link:"",title:"群聊"}},methods:{async onPageInit(){await this.getData(),this.isInit=!0},onShowChatClick(){this.$f7router.navigate("/dialog/"+encodeURIComponent(JSON.stringify(this.dialogData)))},getText(t){const e=document.createElement("div");return e.innerHTML=t,e.innerText},async getData(){const t=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/item?id="+this.id),{data:e}=await t.json();this.count=e.comments.length+" 条回复",this.title=e.title,this.author=e.author,this.link=e.link;let a=[{type:"received",name:e.author,text:e.title,meta:{id:e.id}}];e.text&&a.push({type:"received",name:e.author,text:e.text,meta:{id:e.id}}),e.comments.forEach((t,e)=>{const i={type:"received",name:t.author,text:t.text,meta:{id:t.id,floor:e+1}};a.push(i)}),this.messagesData=a},onMessageClick(t,e,a){let i=a.target.nodeName.toLowerCase();if("img"===i){let t=a.target.getAttribute("src");t&&(this.photos=[t],this.photoBrowserKey=+new Date,this.$nextTick(()=>{this.$refs.photoBrowser.open(0)}))}else"a"!==i&&this.showPopover(t,a)},isFirstMessage(t,e){const a=this,i=a.messagesData[e-1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)},isLastMessage(t,e){const a=this,i=a.messagesData[e+1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)},isTailMessage(t,e){const a=this,i=a.messagesData[e+1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)}}},j=M,C=(a("d945"),Object(h["a"])(j,L,T,!1,null,null,null)),N=C.exports,O=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{ref:"nytPage",attrs:{"infinite-preloader":t.isLoading,infinite:t.isLoading},on:{"page:init":t.onPageInit}},[a("f7-navbar",[a("f7-nav-left",[a("f7-link",{attrs:{"icon-ios":"f7:menu","panel-open":"left"}})],1),a("f7-nav-title",[t._v("NYT")])],1),a("TabView",{attrs:{current:"/nyt"}}),a("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return a("f7-list-item",{key:e.url,attrs:{link:"/nyt-item?url="+encodeURIComponent(e.url)}},[a("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),a("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.summary))])])})),1)],1)},$=[],E={components:{f7Page:n["o"],f7Navbar:n["n"],f7NavTitle:n["m"],f7List:n["g"],f7ListItem:n["h"],TabView:d,f7NavLeft:n["k"],f7Link:n["f"]},data(){return{listData:[],isLoading:!0}},methods:{async onPageInit(){await this.getData(),this.isLoading=!1},async getData(){const t=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/poliwag/nyt-cn"),{data:e}=await t.json();this.listData=e}}},R=E,S=Object(h["a"])(R,O,$,!1,null,null,null),q=S.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[a("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}}),t.isInit?t._e():a("f7-block",{staticClass:"text-align-center"},[a("f7-preloader")],1),a("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,i){return a("f7-message",{key:i,attrs:{type:e.type,first:t.isFirstMessage(e,i),last:t.isLastMessage(e,i),tail:t.isTailMessage(e,i)}},[a("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s(e.text)},slot:"text"})])})),1)],1)},H=[],U={components:{f7Navbar:n["n"],f7Page:n["o"],f7Messages:n["j"],f7Message:n["i"],f7Preloader:n["q"],f7Block:n["c"]},created(){const{url:t}=this.$f7route.query;this.url=t},data(){return{messagesData:[],url:"",isInit:!1,title:"加载中..."}},methods:{async onPageInit(){await this.getData(),this.isInit=!0},getText(t){const e=document.createElement("div");return e.innerHTML=t,e.innerText},async getData(){const t=await fetch(`https://ibdkopi6vn.avosapps.us/api/v1/poliwag/content?url=${encodeURIComponent(this.url)}&region=nyt-cn`),{data:e}=await t.json();this.title=e.title,this.messagesData=e.content.reduce((t,e)=>(t.push({type:"received",text:e.en}),t.push({type:"sent",text:e.zh}),t),[])},isFirstMessage(t,e){const a=this,i=a.messagesData[e-1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)},isLastMessage(t,e){const a=this,i=a.messagesData[e+1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)},isTailMessage(t,e){const a=this,i=a.messagesData[e+1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)}}},V=U,F=Object(h["a"])(V,B,H,!1,null,null,null),J=F.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",[a("f7-block-title",[t._v("分类")]),a("f7-list",t._l(t.pageData,(function(t){return a("f7-list-item",{key:t.name,attrs:{"panel-close":"",link:"/nyt-category/"+t.name+"?title="+encodeURIComponent(t.title),title:t.title}})})),1)],1)},z=[],K={components:{f7Page:n["o"],f7BlockTitle:n["d"],f7List:n["g"],f7ListItem:n["h"]},data(){return{pageData:[{name:"world",title:"国际"},{name:"china",title:"中国"},{name:"business",title:"商业与经济"},{name:"lens",title:"镜头"},{name:"technology",title:"科技"},{name:"science",title:"科学"},{name:"health",title:"健康"},{name:"education",title:"教育"},{name:"culture",title:"文化"},{name:"style",title:"风尚"},{name:"travel",title:"旅游"},{name:"real-estate",title:"房地产"},{name:"opinion",title:"观点与评论"}]}}},Y=K,G=Object(h["a"])(Y,A,z,!1,null,null,null),Q=G.exports,W=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{ref:"nytCategory",attrs:{"infinite-preloader":t.isLoading,infinite:t.isLoading},on:{"page:init":t.onPageInit}},[a("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}}),a("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return a("f7-list-item",{key:e.url,attrs:{link:"/nyt-item?url="+encodeURIComponent(e.url)}},[a("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),a("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.summary))])])})),1)],1)},X=[],Z={components:{f7Page:n["o"],f7Navbar:n["n"],f7List:n["g"],f7ListItem:n["h"]},created(){const{name:t}=this.$f7route.params,{title:e}=this.$f7route.query;this.name=t,this.title=e},data(){return{title:"加载中...",name:"",listData:[],isLoading:!0}},methods:{async onPageInit(){await this.getData(),this.isLoading=!1},async getData(){const t=await fetch(`https://ibdkopi6vn.avosapps.us/api/v1/poliwag/nyt-category?name=${this.name}&p=${this.getRandomPage()}`),{data:e}=await t.json();this.listData=e},getRandomPage(){return Math.floor(1+386*Math.random())}}},tt=Z,et=Object(h["a"])(tt,W,X,!1,null,null,null),at=et.exports,it=[{path:"/",component:_},{path:"/random",component:P},{path:"/item/:id",component:N},{path:"/nyt",component:q},{path:"/nyt-item",component:J},{path:"/nyt-menu",component:Q},{path:"/nyt-category/:name",component:at}],st={components:{f7App:n["b"],f7View:n["s"],f7Panel:n["p"]},data(){let t=localStorage.getItem("theme"),e=t||"auto";return{f7Params:{theme:e,routes:it,id:"m.hn"},root:"/"}},created(){this.root="/hn/m/"}},nt=st,ot=(a("5c0b"),Object(h["a"])(nt,o,r,!1,null,null,null)),rt=ot.exports;s["a"].use(n["a"]),i["a"].config.productionTip=!1,new i["a"]({render:t=>t(rt)}).$mount("#app")},"5b0d":function(t,e,a){},"5c0b":function(t,e,a){"use strict";var i=a("9c0c"),s=a.n(i);s.a},"9c0c":function(t,e,a){},a0d9:function(t,e,a){},d945:function(t,e,a){"use strict";var i=a("a0d9"),s=a.n(i);s.a}});
//# sourceMappingURL=app.29f5b142.js.map