(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"1yJj":function(t,e,n){"use strict";const i="https://ibdkopi6vn.avosapps.us",s={home:`${i}/api/v1/nytimes/home`,content:`${i}/api/v1/nytimes/content`,category:`${i}/api/v1/nytimes/category`,today:`${i}/api/v1/nytimes/today`,content2:`${i}/api/v1/nytimes/content2`,translate:`${i}/api/v1/nytimes/translate`,translate2:`${i}/api/v1/nytimes/translate2`,te:`${i}/api/v1/nytimes/te`,teContent:`${i}/api/v1/nytimes/teContent`,te2:`${i}/api/v1/nytimes/te2`,teContent2:`${i}/api/v1/nytimes/teContent2`,times:`${i}/api/v1/nytimes/times`,timesContent:`${i}/api/v1/nytimes/timesContent`,wanqu:`${i}/api/v1/nytimes/wanqu`,wanquRandom:`${i}/api/v1/nytimes/wanquRandom`,wanquHot:`${i}/api/v1/nytimes/wanquHot`,wanquIssue:`${i}/api/v1/nytimes/wanquIssue`,crawl:`${i}/api/v1/nytimes/crawl`,book:`${i}/api/v1/nytimes/book`,i21st:`${i}/api/v1/nytimes/i21st`,i21stContent:`${i}/api/v1/nytimes/i21stContent`,subtitles:`${i}/api/v1/nytimes/subtitles`,subtitleContent:`${i}/api/v1/nytimes/subtitleContent`,te3:`${i}/api/v1/nytimes/te3`,teContent3:`${i}/api/v1/nytimes/teContent3`};e["a"]=s},J1mE:function(t,e,n){},lKu8:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"paper-page",on:{"page:init":t.onPageInit,"page:beforeout":t.onBeforeOut}},[n("f7-page-content",{nativeOn:{scroll:function(e){return t.onScroll(e)}}},[t.isLoading?n("f7-block",{staticClass:"text-align-center"},[n("f7-preloader")],1):t._e(),n("f7-block",{staticClass:"popup-block-content"},[n("h1",[t._v(t._s(t.title))]),t._l(t.newsList,function(e,i){return n("p",{key:i},[t._l(e.en.split(" "),function(e,i){return n("span",{key:i,on:{click:t.onWordClick}},[t._v("\n          "+t._s(e)+"\n        ")])}),n("f7-icon",{attrs:{md:"material:filter_b_and_w"},nativeOn:{click:function(e){t.openTheater(i)}}})],2)})],2)],1)],1)},s=[],o=n("7eDf"),a=n("1yJj"),r={components:{f7View:o["E"],f7Page:o["u"],f7Preloader:o["y"],f7Block:o["c"],f7PageContent:o["v"],f7Icon:o["h"]},data(){return{title:"",newsList:[],lfKey:"",isLoading:!0,name:"",region:"",preference:{}}},methods:{onPageInit(){let t=this.$f7route.query,e=t.name,n=t.region,i=t.title,s=`/content/${e}/${n}`;this.$lf.getItem(s).then(t=>{t?(this.newsList=t.content,this.isLoading=!1,this.title=i):this.getData()}).catch(t=>{console.log(t)}),this.lfKey=s,this.name=e,this.region=n,this.preference=preference[n],this.$f7.progressbar.show(0,"orange")},getData(){let t=this.$f7route.query,e=t.title,n=t.name;this.$http.get(`${a["a"][this.preference.api]}?name=${n}`).then(t=>{t.success&&(this.newsList=t.data.content)}).catch(t=>{console.log(t)}).finally(()=>{this.isLoading=!1,this.title=e})},onWordClick(t){t.target.classList.toggle("bg-color-yellow")},onScroll(t){let e=t.target,n=e.scrollTop,i=e.scrollHeight,s=e.offsetHeight,o=n/(i-s)*100;this.$f7.progressbar.show(o,"orange")},onBeforeOut(){this.$f7.progressbar.hide()},openTheater(t){this.$f7router.navigate(`/content3?url=${encodeURIComponent(this.name)}&region=${this.region}&index=${t}`)}}},l=r,c=(n("oVSD"),n("KHd+")),p=Object(c["a"])(l,i,s,!1,null,"24ae1d2d",null);e["default"]=p.exports},oVSD:function(t,e,n){"use strict";var i=n("J1mE"),s=n.n(i);s.a}}]);
//# sourceMappingURL=4.7b42a6a1.js.map