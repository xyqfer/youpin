(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"6ey/":function(t,n,i){"use strict";var e=i("FKxI"),o=i.n(e);o.a},"9gpg":function(t,n,i){"use strict";i.r(n);var e=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("f7-page",{attrs:{infinite:!0,"infinite-preloader":!0},on:{"page:init":t.onPageInit,infinite:t.onInfinite}},[i("poliwag-navbar",{attrs:{title:"Poliwag × 🐈"}}),t._l(t.content,function(n,e){return i("div",{key:e},[i("div",{staticClass:"content-container",domProps:{innerHTML:t._s(n.content)}})])})],2)},o=[],s=(i("Vd3H"),i("7eDf"),i("dRp0")),a=i("BxIC"),r={mixins:[a["a"]],data(){return{p:1,allowInfinite:!0,sort:"default",content:[]}},methods:{onPageInit(){this.getData()},onInfinite(){this.allowInfinite&&(this.allowInfinite=!1,this.getData().then(()=>{this.allowInfinite=!0}))},getData(){const t=this.$f7route.query.id;return s["a"].get(`https://ibdkopi6vn.avosapps.us/api/v1/zhihu/question/${t}?sort=${this.sort}&page=${this.p}`).then(({success:t,data:n})=>{t&&(this.content=this.content.concat(n),this.p=this.p+1)}).catch(t=>{console.log(t)})}}},c=r,l=(i("6ey/"),i("KHd+")),u=Object(l["a"])(c,e,o,!1,null,"55322cea",null);n["default"]=u.exports},FKxI:function(t,n,i){},LyE8:function(t,n,i){"use strict";var e=i("eeVq");t.exports=function(t,n){return!!t&&e(function(){n?t.call(null,function(){},1):t.call(null)})}},Vd3H:function(t,n,i){"use strict";var e=i("XKFU"),o=i("2OiF"),s=i("S/j/"),a=i("eeVq"),r=[].sort,c=[1,2,3];e(e.P+e.F*(a(function(){c.sort(void 0)})||!a(function(){c.sort(null)})||!i("LyE8")(r)),"Array",{sort:function(t){return void 0===t?r.call(s(this)):r.call(s(this),o(t))}})}}]);
//# sourceMappingURL=8.879196cd.js.map