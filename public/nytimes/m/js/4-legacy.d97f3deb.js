(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{Acfx:function(t,n,e){},T4lo:function(t,n,e){"use strict";var i=e("Acfx"),a=e.n(i);a.a},XWRu:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{attrs:{"infinite-preloader":t.showPreloader,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[e("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}},[e("f7-nav-right",[e("f7-link",{attrs:{"popover-open":".page-input","icon-md":"material:location_searching"}})],1)],1),e("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.newsList,function(n){return e("f7-list-item",{key:n.url,attrs:{link:"/content?name="+n.url+"&title="+n.title+"&region=nyt-cn"}},[e("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(n.title)+"\n      ")]),e("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(n.summary)+"\n      ")])])})),e("f7-popover",{ref:"pageInput",staticClass:"page-input"},[e("f7-list",[e("f7-list-item",{attrs:{link:!1,title:"页码"}},[e("f7-input",{attrs:{type:"number",placeholder:"1~386","clear-button":""},nativeOn:{keyup:function(n){return"button"in n||!t._k(n.keyCode,"enter",13,n.key,"Enter")?t.jumpPage(n):null}}})],1)],1)],1)],1)},a=[],s=(e("yt8O"),e("VRzm"),e("7eDf")),o=e("1yJj"),l={created:function(){this.name=this.$f7route.params.name,this.title=this.$f7route.query.title},components:{f7Page:s["t"],f7Navbar:s["s"],f7List:s["k"],f7ListItem:s["l"],f7Link:s["j"],f7NavRight:s["q"],f7Popover:s["v"],f7Input:s["i"]},data:function(){return{newsList:[],name:"",title:"",p:1,allowInfinite:!0,showPreloader:!0}},methods:{onPageInit:function(){this.getData()},onInfinite:function(){var t=this;this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(function(){t.showPreloader=t.allowInfinite=!(t.p>t.total)}))},getData:function(){var t=this,n=this.name;return this.$http.get("".concat(o["a"].category,"/").concat(n,"?p=").concat(this.p)).then(function(n){n.success&&(n.data&&n.data.length>0?(t.newsList=t.newsList.concat(n.data),t.p=t.p+1):(t.showPreloader=!1,t.allowInfinite=!1))}).catch(function(t){console.log(t)})},jumpPage:function(t){var n=+t.target.value;this.$refs.pageInput.f7Popover.close(),this.p=n,this.newsList=[],this.getData()}}},r=l,f=(e("T4lo"),e("KHd+")),c=Object(f["a"])(r,i,a,!1,null,null,null);n["default"]=c.exports}}]);
//# sourceMappingURL=4-legacy.d97f3deb.js.map