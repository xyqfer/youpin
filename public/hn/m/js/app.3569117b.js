(function(t){function e(e){for(var i,o,r=e[0],l=e[1],c=e[2],p=0,u=[];p<r.length;p++)o=r[p],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&u.push(n[o][0]),n[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);f&&f(e);while(u.length)u.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],i=!0,r=1;r<a.length;r++){var l=a[r];0!==n[l]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},n={app:0},s=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/hn/m/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var f=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);a("e6cf"),a("cca6"),a("a79d"),a("06bb"),a("5b0d");var i=a("2b0e"),n=a("d42c"),s=a("ede0"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-app",{attrs:{params:t.f7Params}},[a("f7-view",{staticClass:"ios-edges",attrs:{url:"/",main:!0,"push-state":!0,"push-state-root":t.root,"stack-pages":!0}})],1)},r=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{ref:"homePage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[a("f7-navbar",[a("f7-nav-title",[t._v("HN × 🌀")]),a("f7-nav-right",[a("f7-link",{staticClass:"notranslate",attrs:{href:"/random","icon-ios":"f7:calendar","icon-md":"material:menu"}})],1)],1),a("TabView",{attrs:{current:"/"}}),a("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return a("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[a("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),a("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),a("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),a("span",{attrs:{slot:"after"},slot:"after"},[a("f7-chip",{staticClass:"notranslate chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},c=[],f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-toolbar",{attrs:{position:"bottom",tabbar:"",labels:""}},t._l(t.tabs,(function(e){return a("f7-link",{key:e.link,attrs:{"tab-link-active":e.link===t.current,"tab-link":"",href:e.link,animate:!1,"icon-ios":e.icon}})})),1)},p=[],u={components:{f7Link:s["e"],f7Toolbar:s["o"]},extends:s["o"],data(){return{tabs:[{link:"/",icon:"f7:chat_bubble"}]}},props:{current:{type:String,required:!0}}},h=u,d=a("2877"),m=Object(d["a"])(h,f,p,!1,null,"212cd73a",null),g=m.exports,v={components:{f7Page:s["m"],f7Navbar:s["l"],f7NavTitle:s["k"],f7NavRight:s["j"],f7Link:s["e"],f7List:s["f"],f7ListItem:s["g"],f7Chip:s["d"],TabView:g},data(){return{page:1,listData:[],hasNext:!0,allowInfinite:!0}},methods:{async onPageInit(){await this.getData(this.page)},async getData(t=1){const e=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/news?page="+t),{data:a}=await e.json();this.listData=this.listData.concat(a.list),this.hasNext=a.hasNext,this.page++},async onInfinite(){this.allowInfinite&&(this.allowInfinite=!1,await this.getData(this.page),this.allowInfinite=!0)}}},b=v,w=Object(d["a"])(b,l,c,!1,null,null,null),_=w.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{ref:"randomPage",attrs:{"infinite-preloader":t.hasNext,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[a("f7-navbar",{attrs:{"back-link":"返回"}},[a("f7-nav-title",[t._v("Random")])],1),a("f7-list",{staticClass:"topic-list",attrs:{"media-list":""}},t._l(t.listData,(function(e){return a("f7-list-item",{key:e.id,attrs:{link:"/item/"+e.id}},[a("img",{attrs:{slot:"media",src:"https://www.dogedoge.com/favicon/"+e.site+".ico"},slot:"media"}),a("div",{attrs:{slot:"title"},slot:"title"},[t._v(" "+t._s(e.title)+" ")]),a("div",{attrs:{slot:"text"},slot:"text"},[t._v(t._s(e.author)+" • "+t._s(e.time))]),a("span",{attrs:{slot:"after"},slot:"after"},[a("f7-chip",{staticClass:"notranslate chip-container",attrs:{text:e.comments+""}})],1)])})),1)],1)},y=[],x={components:{f7Page:s["m"],f7Navbar:s["l"],f7NavTitle:s["k"],f7List:s["f"],f7ListItem:s["g"],f7Chip:s["d"]},data(){return{listData:[],hasNext:!0,allowInfinite:!0}},methods:{async onPageInit(){await this.getData()},async getData(){const t=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/random"),{data:e}=await t.json();this.listData=this.listData.concat(e.list)},async onInfinite(){this.allowInfinite&&(this.allowInfinite=!1,await this.getData(this.page),this.allowInfinite=!0)}}},I=x,D=Object(d["a"])(I,k,y,!1,null,null,null),P=D.exports,j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[a("f7-navbar",{attrs:{title:t.title,"back-link":"返回",subtitle:t.count}},[a("f7-nav-right",[a("f7-link",{staticClass:"notranslate",attrs:{external:"",href:t.link,target:"_blank","icon-ios":"f7:link","icon-md":"material:menu"}})],1)],1),t.isInit?t._e():a("f7-block",{staticClass:"text-align-center"},[a("f7-preloader")],1),t.isInit?a("div",{staticClass:"post-content",domProps:{innerHTML:t._s(t.content)}}):t._e(),a("f7-messages",{ref:"messages",staticClass:"hn-message-list",attrs:{"scroll-messages":!1}},t._l(t.messagesData,(function(e,i){return a("f7-message",{key:e.meta.id+i,attrs:{type:e.type,name:e.name,first:t.isFirstMessage(e,i),last:t.isLastMessage(e,i),tail:t.isTailMessage(e,i)}},[e.text?a("div",{attrs:{slot:"text"},domProps:{innerHTML:t._s(e.text)},slot:"text"}):t._e(),a("div",{attrs:{slot:"text-header"},slot:"text-header"},[e.meta.floor?[t._v(" "+t._s(e.meta.floor)+"楼 "),t.author===e.name?[t._v(" • 楼主 ")]:t._e()]:t._e()],2)])})),1)],1)},T=[],C={components:{f7Navbar:s["l"],f7Page:s["m"],f7Messages:s["i"],f7Message:s["h"],f7Preloader:s["n"],f7Block:s["c"],f7NavRight:s["j"],f7Link:s["e"]},created(){const{id:t}=this.$f7route.params;this.id=t},data(){return{messagesData:[],id:"",isInit:!1,count:"",author:"",link:"",title:"群聊",content:""}},methods:{async onPageInit(){await this.getData(),this.isInit=!0},onShowChatClick(){this.$f7router.navigate("/dialog/"+encodeURIComponent(JSON.stringify(this.dialogData)))},getText(t){const e=document.createElement("div");return e.innerHTML=t,e.innerText},async getData(){const t=await fetch("https://ibdkopi6vn.avosapps.us/api/v1/hn/item?id="+this.id),{data:e}=await t.json();this.count=e.comments.length+" 条回复",this.title=e.title,this.author=e.author,this.link=e.link,this.content=e.content;let a=[];e.text&&a.push({type:"received",name:e.author,text:e.text,meta:{id:e.id}}),e.comments.forEach((t,e)=>{const i={type:"received",name:t.author,text:t.text,meta:{id:t.id,floor:e+1}};a.push(i)}),this.messagesData=a},onMessageClick(t,e,a){let i=a.target.nodeName.toLowerCase();if("img"===i){let t=a.target.getAttribute("src");t&&(this.photos=[t],this.photoBrowserKey=+new Date,this.$nextTick(()=>{this.$refs.photoBrowser.open(0)}))}else"a"!==i&&this.showPopover(t,a)},isFirstMessage(t,e){const a=this,i=a.messagesData[e-1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)},isLastMessage(t,e){const a=this,i=a.messagesData[e+1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)},isTailMessage(t,e){const a=this,i=a.messagesData[e+1];return!t.isTitle&&(!i||i.type!==t.type||i.name!==t.name)}}},O=C,M=(a("d945"),Object(d["a"])(O,j,T,!1,null,null,null)),N=M.exports,L=[{path:"/",component:_},{path:"/random",component:P},{path:"/item/:id",component:N}],$={components:{f7App:s["b"],f7View:s["p"]},data(){return{f7Params:{theme:"ios",routes:L,id:"m.hn"},root:"/"}},created(){this.root="/hn/m/"}},S=$,E=(a("5c0b"),Object(d["a"])(S,o,r,!1,null,null,null)),H=E.exports;n["a"].use(s["a"]),i["a"].config.productionTip=!1,new i["a"]({render:t=>t(H)}).$mount("#app")},"5b0d":function(t,e,a){},"5c0b":function(t,e,a){"use strict";var i=a("9c0c"),n=a.n(i);n.a},"9c0c":function(t,e,a){},a0d9:function(t,e,a){},d945:function(t,e,a){"use strict";var i=a("a0d9"),n=a.n(i);n.a}});
//# sourceMappingURL=app.3569117b.js.map