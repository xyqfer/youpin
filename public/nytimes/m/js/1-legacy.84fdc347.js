(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{Acfx:function(t,n,i){},T4lo:function(t,n,i){"use strict";var e=i("Acfx"),a=i.n(e);a.a},XWRu:function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("f7-page",{attrs:{"infinite-preloader":t.showPreloader,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[i("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}}),i("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.newsList,function(n){return i("f7-list-item",{key:n.url,attrs:{link:"/content?name="+n.url+"&title="+n.title}},[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(n.title)+"\n      ")]),i("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(n.summary)+"\n      ")])])}))],1)},a=[],s=i("7eDf"),o=i("1yJj"),l={created:function(){this.name=this.$f7route.params.name,this.title=this.$f7route.query.title},components:{f7Page:s["p"],f7Navbar:s["o"],f7List:s["h"],f7ListItem:s["i"],f7Link:s["g"]},data:function(){return{newsList:[],name:"",title:"",p:1,allowInfinite:!0,showPreloader:!0}},methods:{onPageInit:function(){this.getData()},onInfinite:function(){var t=this;this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(function(){t.showPreloader=t.allowInfinite=!(t.p>t.total)}))},getData:function(){var t=this,n=this.name;return this.$http.get("".concat(o["a"].category,"/").concat(n,"?p=").concat(this.p)).then(function(n){n.success&&(n.data&&n.data.length>0?(t.newsList=t.newsList.concat(n.data),t.p=t.p+1):(t.showPreloader=!1,t.allowInfinite=!1))}).catch(function(t){console.log(t)})}}},r=l,c=(i("T4lo"),i("KHd+")),f=Object(c["a"])(r,e,a,!1,null,null,null);n["default"]=f.exports}}]);
//# sourceMappingURL=1-legacy.84fdc347.js.map