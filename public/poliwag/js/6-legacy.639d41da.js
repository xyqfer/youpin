(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{VmZW:function(t,e,n){"use strict";var i=n("oiQn"),s=n.n(i);s.a},ivw8:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("f7-page",{staticClass:"messages-page",on:{"page:init":t.onPageInit}},[n("f7-navbar",{attrs:{"back-link":"返回"}},[n("f7-nav-title",[t._v("\n      Theater "),t.isLoading?n("f7-preloader",{attrs:{color:"white",size:20}}):t._e()],1),n("f7-nav-right",{staticStyle:{"font-size":"14px","margin-right":"16px"}},[t._v("\n      "+t._s(t.percent)+"\n    ")])],1),n("f7-messages",{staticClass:"news-content-list"},t._l(t.bubbleData,function(e,i){return n("f7-message",{key:i,attrs:{type:e.type,first:!0,last:!0,tail:!0}},["received"===e.type?n("div",{attrs:{slot:"name"},slot:"name"},[t._v("\n        "+t._s(e.meta.originIndex+1)+"楼\n      ")]):t._e(),n("div",{attrs:{slot:"text"},slot:"text"},["received"===e.type?t._l(e.text.split(" "),function(e,i){return n("span",{key:i,on:{click:t.onWordClick}},[t._v("\n            "+t._s(e)+"\n          ")])}):[t._v("\n          "+t._s(e.text)+"\n        ")]],2),i<2*t.total-1?n("div",{staticClass:"display-flex justify-content-space-between align-items-flex-end",attrs:{slot:"footer"},slot:"footer"},["received"===e.type?n("div"):t._e(),n("a",{staticClass:"message-link",attrs:{href:"#"},on:{"~click":function(n){t.nextBubble(i+1,"sent"===e.type?e.meta.originIndex+1:null,n)}}},[t._v("\n          Next\n        ")]),"sent"===e.type?n("div"):t._e()]):t._e()])}))],1)},s=[],a=(n("yt8O"),n("VRzm"),n("7eDf")),o={components:{f7Navbar:a["u"],f7Page:a["v"],f7Messages:a["p"],f7MessagesTitle:a["q"],f7Message:a["o"],f7Preloader:a["z"],f7Block:a["c"],f7List:a["l"],f7ListItem:a["n"],f7Link:a["k"],f7NavTitle:a["t"],f7NavRight:a["s"]},data:function(){return{link:"",isLoading:!0,newsContent:[],bubbleData:[],percent:"",current:0,total:0,lfKey:"",index:-1,progressIndex:0,region:"",paragraph:"",preference:{},translatedText:null}},methods:{onPageInit:function(){var t=this,e=this.$f7route.query,n=e.name,i=e.region,s=e.index,a="/content/".concat(n,"/").concat(i);this.$lf.getItem(a).then(function(e){e?t.initData(e):t.getData()}).catch(function(t){console.log(t)}),this.link=n,this.index=s,this.lfKey=a,this.region=i},getData:function(){var t=this,e=this.$f7route.query.name;this.$http.get("".concat(api[this.preference.api],"?name=").concat(e)).then(function(e){e.success&&t.initData(e.data)}).catch(function(t){console.log(t)})},initData:function(t){var e=this;this.translate(t.content[this.index].en).then(function(t){e.newsContent=t.content.reduce(function(t,e,n){return t.push({type:"received",text:e.en,meta:{originIndex:n}}),t.push({type:"sent",text:e.zh,meta:{originIndex:n}}),t},[]),e.$nextTick(function(){e.total=e.newsContent.length/2,e.nextBubble(0,0)})}).catch(function(t){console.log(t)}).finally(function(){e.isLoading=!1})},nextBubble:function(t,e,n){this.bubbleData=this.newsContent.slice(0,t+1),null!=e&&(this.current=e+1),this.progressIndex=t,n&&n.target.classList.add("color-gray")},onWordClick:function(t){t.target.classList.toggle("bg-color-yellow")},translate:function(t){return this.$http.post({url:api.translate2,data:{text:t}}).then(function(t){return t.success?t.data:{}}).catch(function(t){return console.log(t),""})}},watch:{current:function(t){this.percent="".concat(t," / ").concat(this.total)}}},c=o,r=(n("VmZW"),n("KHd+")),l=Object(r["a"])(c,i,s,!1,null,null,null);e["default"]=l.exports},oiQn:function(t,e,n){}}]);
//# sourceMappingURL=6-legacy.639d41da.js.map