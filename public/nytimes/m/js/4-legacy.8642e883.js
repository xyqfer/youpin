(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{Acfx:function(t,n,i){},T4lo:function(t,n,i){"use strict";var e=i("Acfx"),a=i.n(e);a.a},XWRu:function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("f7-page",{attrs:{"infinite-preloader":t.showPreloader,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[i("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}},[i("f7-nav-right",[i("f7-link",{attrs:{"popover-open":".page-input","icon-md":"material:location_searching"}})],1)],1),i("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.newsList,function(n){return i("f7-list-item",{key:n.url,attrs:{swipeout:"",link:t.formatLink(n)}},[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(n.title)+"\n      ")]),i("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(n.summary)+"\n      ")]),i("f7-swipeout-actions",{attrs:{right:""}},[i("f7-swipeout-button",{attrs:{color:"blue",close:""},on:{click:function(i){t.savePocket(n)}}},[t._v("\n          Save\n        ")])],1)],1)})),i("f7-popover",{staticClass:"page-input"},[i("f7-list",[i("f7-list-item",{attrs:{link:!1,title:"乱序模式"}},[i("f7-toggle",{attrs:{color:"blue"},on:{"toggle:change":t.onToggleChange}})],1)],1)],1)],1)},a=[],o=i("7eDf"),s=i("BxIC"),l={created:function(){this.name=this.$f7route.params.name,this.title=this.$f7route.query.title},components:{f7Page:o["t"],f7Navbar:o["s"],f7List:o["k"],f7ListItem:o["l"],f7Link:o["j"],f7NavRight:o["q"],f7Popover:o["w"],f7SwipeoutActions:o["z"],f7SwipeoutButton:o["A"],f7Toggle:o["B"]},mixins:[s["a"]],data:function(){return{newsList:[],name:"",title:"",p:1,allowInfinite:!0,showPreloader:!0,maxPage:386,isRandom:!1}},methods:{onPageInit:function(){this.getData()},onInfinite:function(){var t=this;this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(function(){t.allowInfinite=!0}))},getData:function(){var t=this,n=this.name;return this.$http.get("".concat(this.api.category,"/").concat(n,"?p=").concat(this.p)).then(function(n){n.success&&(n.data&&n.data.length>0?(t.newsList=t.newsList.concat(n.data),t.p=t.isRandom?t.getRandomPage():t.p+1):(t.showPreloader=!1,t.allowInfinite=!1))}).catch(function(t){console.log(t)})},onToggleChange:function(t){var n=this;this.isRandom=t,this.newsList=[],this.p=t?this.getRandomPage():1,this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(function(){n.allowInfinite=!0}))},getRandomPage:function(){return Math.floor(1+Math.random()*this.maxPage)},formatLink:function(t){return"/content?name=".concat(t.url,"&title=").concat(t.title,"&region=nyt-cn")}}},r=l,c=(i("T4lo"),i("KHd+")),f=Object(c["a"])(r,e,a,!1,null,null,null);n["default"]=f.exports}}]);
//# sourceMappingURL=4-legacy.8642e883.js.map