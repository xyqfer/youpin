(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"/tIy":function(t,n,e){"use strict";var o=e("DYWI"),i=e.n(o);i.a},DYWI:function(t,n,e){},lKu8:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{staticClass:"paper-page",on:{"page:init":t.onPageInit,"page:beforeout":t.onBeforeOut}},[e("f7-page-content",{nativeOn:{scroll:function(n){return t.onScroll(n)}}},[t.isLoading?e("f7-block",{staticClass:"text-align-center"},[e("f7-preloader")],1):t._e(),e("f7-block",{staticClass:"popup-block-content"},[e("h1",[t._v(t._s(t.title))]),t._l(t.newsList,function(n,o){return e("p",{key:o},[t._l(n.en.split(" "),function(n,o){return e("span",{key:o,on:{click:t.onWordClick}},[t._v("\n          "+t._s(n)+"\n        ")])}),e("f7-icon",{attrs:{md:"material:filter_b_and_w"},nativeOn:{click:function(n){t.openTheater(o)}}})],2)})],2)],1)],1)},i=[],c=e("7eDf"),a=e("1yJj"),s=e("aW/7"),r={components:{f7View:c["D"],f7Page:c["t"],f7Preloader:c["x"],f7Block:c["c"],f7PageContent:c["u"],f7Icon:c["h"]},data:function(){return{title:"",newsList:[],lfKey:"",isLoading:!0,name:"",region:"",preference:{}}},methods:{onPageInit:function(){var t=this,n=this.$f7route.query,e=n.name,o=n.region,i=n.title,c="/content/".concat(e,"/").concat(o);this.$lf.getItem(c).then(function(n){n?(t.newsList=n.content,t.isLoading=!1,t.title=i):t.getData()}).catch(function(t){console.log(t)}),this.lfKey=c,this.name=e,this.region=o,this.preference=s["a"][o],this.$f7.progressbar.show(0,"orange")},getData:function(){var t=this,n=this.$f7route.query,e=n.title,o=n.name;this.$http.get("".concat(a["a"][this.preference.api],"?name=").concat(o)).then(function(n){n.success&&(t.newsList=n.data.content)}).catch(function(t){console.log(t)}).finally(function(){t.isLoading=!1,t.title=e})},onWordClick:function(t){t.target.classList.toggle("bg-color-yellow")},onScroll:function(t){var n=t.target,e=n.scrollTop,o=n.scrollHeight,i=n.offsetHeight,c=e/(o-i)*100;this.$f7.progressbar.show(c,"orange")},onBeforeOut:function(){this.$f7.progressbar.hide()},openTheater:function(t){this.$f7router.navigate("/content3?name=".concat(encodeURIComponent(this.name),"&region=").concat(this.region,"&index=").concat(t))}}},l=r,f=(e("/tIy"),e("KHd+")),u=Object(f["a"])(l,o,i,!1,null,"05ecacd2",null);n["default"]=u.exports}}]);
//# sourceMappingURL=2-legacy.5c2bd44e.js.map