(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{Acfx:function(t,e,i){},T4lo:function(t,e,i){"use strict";var n=i("Acfx"),s=i.n(n);s.a},XWRu:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("f7-page",{attrs:{"infinite-preloader":t.showPreloader,infinite:!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[i("f7-navbar",{attrs:{title:t.title,"back-link":"返回"}},[i("f7-nav-right",[i("f7-link",{attrs:{"popover-open":".page-input","icon-md":"material:location_searching"}})],1)],1),i("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.newsList,function(e){return i("f7-list-item",{key:e.url,attrs:{swipeout:"",link:t.formatLink(e)}},[i("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(e.title)+"\n      ")]),i("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(e.summary)+"\n      ")]),i("f7-swipeout-actions",{attrs:{right:""}},[i("f7-swipeout-button",{attrs:{color:"blue",close:""},on:{click:function(i){t.savePocket(e)}}},[t._v("\n          Save\n        ")])],1)],1)})),i("f7-popover",{ref:"pageInput",staticClass:"page-input"},[i("f7-list",[i("f7-list-item",{attrs:{link:!1,title:"页码"}},[i("f7-input",{attrs:{type:"number",placeholder:"1~386","clear-button":""},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.jumpPage(e):null}}})],1)],1)],1)],1)},s=[],a=i("7eDf"),o=i("BxIC"),l={created(){this.name=this.$f7route.params.name,this.title=this.$f7route.query.title},components:{f7Page:a["t"],f7Navbar:a["s"],f7List:a["k"],f7ListItem:a["l"],f7Link:a["j"],f7NavRight:a["q"],f7Popover:a["w"],f7Input:a["i"],f7SwipeoutActions:a["z"],f7SwipeoutButton:a["A"]},mixins:[o["a"]],data(){return{newsList:[],name:"",title:"",p:1,allowInfinite:!0,showPreloader:!0}},methods:{onPageInit(){this.getData()},onInfinite(){this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(()=>{this.showPreloader=this.allowInfinite=!(this.p>this.total)}))},getData(){const t=this.name;return this.$http.get(`${this.api.category}/${t}?p=${this.p}`).then(t=>{t.success&&(t.data&&t.data.length>0?(this.newsList=this.newsList.concat(t.data),this.p=this.p+1):(this.showPreloader=!1,this.allowInfinite=!1))}).catch(t=>{console.log(t)})},jumpPage(t){let e=+t.target.value;this.$refs.pageInput.f7Popover.close(),this.p=e,this.newsList=[],this.getData()},formatLink(t){return`/content?name=${t.url}&title=${t.title}&region=nyt-cn`}}},r=l,f=(i("T4lo"),i("KHd+")),u=Object(f["a"])(r,n,s,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=5.f2761dd4.js.map