(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{SYLK:function(t,n,e){"use strict";var i=e("nWlt"),o=e.n(i);o.a},YOHd:function(t,n,e){"use strict";e.r(n);var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("f7-page",{on:{"page:init":t.onPageInit}},[e("f7-navbar",[e("f7-nav-title",[t._v("? × 🌀")])],1),e("f7-toolbar",{attrs:{tabbar:""}},t._l(t.tab,function(n){return e("f7-link",{key:n.name,attrs:{"tab-link-active":n.name===t.name,"tab-link":"",href:n.link,animate:!1,text:n.text}})})),e("f7-list",{staticClass:"news-list",attrs:{"media-list":""}},t._l(t.pockList,function(n,i){return e("f7-list-item",{key:i,attrs:{swipeout:"",link:n.url}},[e("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n        "+t._s(n.title)+"\n      ")]),e("div",{attrs:{slot:"text"},slot:"text"},[t._v("\n        "+t._s(n.summary)+"\n      ")]),e("f7-swipeout-actions",{attrs:{right:""}},[e("f7-swipeout-button",{attrs:{delete:""},on:{click:function(n){t.deletePocket(i)}}},[t._v("\n          Delete\n        ")])],1)],1)}))],1)},o=[];function a(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}function l(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){return a(t)||l(t)||r()}e("yt8O"),e("VRzm");var s=e("7eDf"),f=e("a+2q"),u={components:{f7Page:s["t"],f7Navbar:s["s"],f7NavTitle:s["r"],f7List:s["k"],f7ListItem:s["l"],f7Link:s["j"],f7Toolbar:s["B"],f7Icon:s["h"],f7SwipeoutActions:s["z"],f7SwipeoutButton:s["A"]},data:function(){return{name:"pocket",tab:[],pockList:[],lfKey:"/pocket"}},created:function(){this.tab=f["a"]},methods:{onPageInit:function(){this.getData()},getData:function(){var t=this;this.$lf.getItem(this.lfKey).then(function(n){n&&(t.pockList=n)}).catch(function(t){console.log(t)})},deletePocket:function(t){var n=this,e=c(this.pockList);e.splice(t,1),this.$nextTick(function(){n.$lf.setItem(n.lfKey,e).then(function(){n.showNotificationFull()}).catch(function(t){console.log(t)})})},showNotificationFull:function(){var t=this;t.notificationFull||(t.notificationFull=t.$f7.notification.create({title:"? × 🌀",titleRightText:"now",text:"删除成功",closeTimeout:1200})),t.notificationFull.open()}}},p=u,h=(e("SYLK"),e("KHd+")),k=Object(h["a"])(p,i,o,!1,null,null,null);n["default"]=k.exports},nWlt:function(t,n,e){}}]);
//# sourceMappingURL=2-legacy.f02d48cc.js.map