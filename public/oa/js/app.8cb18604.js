(function(t){function e(e){for(var a,o,i=e[0],s=e[1],l=e[2],u=0,m=[];u<i.length;u++)o=i[u],c[o]&&m.push(c[o][0]),c[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);v&&v(e);while(m.length)m.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,i=1;i<n.length;i++){var s=n[i];0!==c[s]&&(a=!1)}a&&(r.splice(e--,1),t=o(o.s=n[0]))}return t}var a={},c={app:0},r=[];function o(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=a,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/oa/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var v=s;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("c21b"),c=n.n(a);c.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:8}},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("选择工作日期")])]),n("div",{staticClass:"text item"},[n("el-date-picker",{attrs:{type:"dates",size:"large",placeholder:"选择工作日"},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}}),n("el-checkbox",{staticStyle:{"margin-left":"20px"},model:{value:t.isCalcWorkDays,callback:function(e){t.isCalcWorkDays=e},expression:"isCalcWorkDays"}},[t._v("显示全勤")])],1)])],1),n("el-col",{attrs:{span:8}},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("上传报表")])]),n("div",{staticClass:"text item"},[n("el-upload",{staticClass:"upload-item",attrs:{action:"","on-change":t.onUploadChange1,"auto-upload":!1}},[n("el-button",{attrs:{slot:"trigger",size:"medium",type:"primary"},slot:"trigger"},[t._v("选取考勤报表（请确保后缀名是 xls）")])],1),n("el-upload",{staticClass:"upload-item",attrs:{action:"","on-change":t.onUploadChange2,"auto-upload":!1}},[n("el-button",{attrs:{slot:"trigger",size:"medium",type:"primary"},slot:"trigger"},[t._v("选取员工花名册（请确保后缀名是 xlsx）")])],1),n("el-button",{attrs:{size:"medium",type:"primary"},on:{click:t.onStart}},[t._v("开始生成")]),t.isFinish?n("div",{staticStyle:{"margin-top":"60px"}},[n("el-button",{attrs:{size:"medium",type:"primary"},on:{click:t.downloadSheet1}},[t._v("下载考勤汇总表")]),n("el-button",{attrs:{size:"medium",type:"primary"},on:{click:t.downloadSheet2}},[t._v("下载加班汇总表")])],1):t._e()],1)])],1),n("el-col",{attrs:{span:8}},[n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v("注意事项")])]),n("div",{staticClass:"text item"},[t._v("\n          1、检查数据正确性\n        ")]),n("div",{staticClass:"text item"},[t._v("\n          2、修改时间\n        ")])])],1)],1)],1)},r=[],o=n("9393"),i=(n("ac6a"),n("7f7f"),function(t,e){return new Promise(function(e){var n=new FileReader;n.onload=function(t){var n=t.target.result,a=XLSX.read(n,{type:"binary"}),c=a.SheetNames.map(function(t){return a.Sheets[t]});e(c)},n.readAsBinaryString(t)})}),s=i,l=(n("6762"),n("2fdb"),n("28a5"),function(t){return t?t.w:null}),v=l,u=function(t){var e=t.trim().split(":"),n=Object(o["a"])(e,2),a=n[0],c=n[1];return 60*parseInt(a)+1*parseInt(c)},m=function(t){var e=t.time,n=t.date,a=t.workDates;if(!a.includes(n))return{isLate:!1,late:0};var c=4,r=u(e),o=r>c;return{isLate:o,late:o?r-c:0}},d=function(t){var e=t.time,n=t.date,a=t.workDates;if(!a.includes(n))return{isOvertime:!1,time:0,subsidyTime:0};var c=70,r=60,o=u(e)-r,i=o-c,s=o>0;return o>=130&&o<=150&&(o=150),{isOvertime:s,time:o>0?o:0,subsidyTime:i>0?i:0}},f=function(t,e){for(var n=2,a=t["!range"].e.r,c={},r=n;r<=a;r++){var o=v(t["B".concat(r)]),i=v(t["C".concat(r)]),s=v(t["D".concat(r)]),l=v(t["E".concat(r)]),u=v(t["H".concat(r)]),f=v(t["I".concat(r)]),h=v(t["L".concat(r)]),g=v(t["O".concat(r)]);if(c[o]||(c[o]={id:o,name:i,department:"",late:0,overtime:0,subsidy:0,data:{},workDays:0}),c[o].data[s]={date:s,timeType:l,signIn:u,signOff:f,rawLateTime:h,overtime:g,subsidy:0,subsidyTime:0,needWork:e.includes(s),isWork:!!f},h){var p=m({time:h,date:s,workDates:e}),b=p.isLate,y=p.late;c[o].data[s].isLate=b,c[o].data[s].late=y,c[o].late+=y,!b&&e.includes(s)&&c[o].workDays++}else e.includes(s)&&c[o].workDays++;if(g){var O=d({time:g,date:s,workDates:e}),z=O.isOvertime,j=O.time,w=O.subsidyTime,x=20,C=w>0?x:0;c[o].data[s].isOvertime=z,c[o].data[s].overtime=j,c[o].data[s]._subsidyTime=w,c[o].data[s]._subsidy=C,c[o].overtime+=j}}return c},h=f,g=(n("a481"),function(t){for(var e=+t["!ref"].split(":")[1].replace(/\D+/g,""),n=2,a={},c=n;c<=e;c++){var r=v(t["C".concat(c)]),o=v(t["B".concat(c)]),i=v(t["E".concat(c)]),s=v(t["F".concat(c)]);a[r]={id:r,name:o,department:i,group:s}}return a}),p=g,b=function(t){return t?t.department:""},y=function(t){return t?t.group:""},O=function(t,e){var n={},a=0;for(var c in t){var r=b(e[c]),o=y(e[c]);if(o=o||r,t[c].department=r,t[c].group=o,"技术部"===r)for(var i in t[c].data){var s=t[c].data[i]._subsidy,l=t[c].data[i]._subsidyTime;s>0&&(t[c].data[i].subsidy=s,t[c].data[i].subsidyTime=l,t[c].subsidy+=s,t[c].subsidyTime+=l)}else t[c].overtime=0;n[r]||(n[r]={count:0}),n[r][o]||(n[r][o]={count:0}),n[r][o][c]=t[c],n[r].count++,n[r][o].count++,a++}return{total:a,data:n}},z=O,j=n("a322"),w=n("c93e"),x=(n("ffc1"),n("6b54"),function(t,e,n,a){var c,r,i=[{s:{c:0,r:0},e:{c:18,r:0}},{s:{c:0,r:1},e:{c:18,r:1}}],s=[],l={},v={},u={},m={},d=3,f=3,h=1,g=4,p=0,b=function(t){l["A".concat(g)]={v:"".concat(h),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},l["D".concat(g)]={v:"".concat(t.name),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},l["E".concat(g)]={v:"".concat(t.workDays),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},l["F".concat(g)]={v:"".concat(a&&t.workDays===n?"√":""),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},t.subsidy&&(l["G".concat(g)]={v:"".concat(t.subsidy,"元"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),t.overtime&&(l["H".concat(g)]={v:"".concat(t.overtime,"分钟"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),t.late&&(l["I".concat(g)]={v:"".concat(t.late,"分钟"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}})},y=function(){var t=new Date,e=t.getFullYear(),n=e.toString().slice(-2),a=t.getMonth()+1,c=a<10?"0".concat(a):a,r=new Date(n,a,0).getDate();return{fullYear:e,year:n,fullMonth:c,month:a,last:r}},O=function(t){var e="",n=parseInt(t);while(n>0){var a=n%26;0==a&&(a=26),e=String.fromCharCode(a+64)+e,n=(n-a)/26}return e},z=y(),x=z.year,C=z.month,k=z.last,S=z.fullMonth,D=z.fullYear,_=O(k+3),A=function(t){var e=g-1;v["A".concat(e)]={v:"".concat(t.name),t:"s",s:{alignment:{vertical:"center",horizontal:"center"},fill:{fgColor:{rgb:"FF9FCD63"}}}},null!=t.late&&(v["".concat(_).concat(e)]={v:"".concat(t.late),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object.entries(t.data).forEach(function(t){var n=Object(o["a"])(t,2),a=n[0],c=n[1].late,r=+a.split("/")[2];null!=c&&(v["".concat(O(r+1)).concat(e)]={v:"".concat(c),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}})})},F=function(t){var e=g-1;u["A".concat(e)]={v:"".concat(t.name),t:"s",s:{alignment:{vertical:"center",horizontal:"center"},fill:{fgColor:{rgb:"FF9FCD63"}}}}},T=function(t){var e=p+1,n=p+6;m["A".concat(n)]={v:"".concat(e),t:"s",s:{alignment:{horizontal:"center"}}},m["B".concat(n)]={v:"".concat(t.name),t:"s",s:{alignment:{horizontal:"center"}}},s.push({s:{c:1,r:p+5},e:{c:2,r:p+5}}),m["".concat(O(k+4)).concat(n)]={v:"".concat((t.overtime/60).toFixed(1)),t:"s",s:{alignment:{horizontal:"center"}}},t.subsidy>0&&(m["".concat(O(k+5)).concat(n)]={v:"".concat(t.subsidy.toFixed(0),"元"),t:"s",s:{alignment:{horizontal:"center"}}}),Object.entries(t.data).forEach(function(t){var e=Object(o["a"])(t,2),a=e[0],c=e[1].overtime,r=+a.split("/")[2];if(null!=c&&c>0){var i={s:{alignment:{horizontal:"center"}}};c<=60&&(i.s.font={color:{rgb:"FFFF0000"}}),m["".concat(O(r+3)).concat(n)]=Object(w["a"])({v:"".concat((c/60).toFixed(1)),t:"s"},i)}})};for(var L in t)for(var B in t[L]){var M=t[L][B];if("count"==B)i.push({s:{c:1,r:d},e:{c:1,r:d+M-1}}),l["B".concat(d+1)]={v:L,t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},d+=M;else{var P=B;for(var U in M){var E=M[U];"count"===U?(i.push({s:{c:2,r:f},e:{c:2,r:f+E-1}}),l["C".concat(f+1)]={v:P,t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},f+=E):(b(E),A(E),F(E),"技术部"==L&&(T(E),p++),h++,g++)}}}for(var I=1;I<=k;I++)v["".concat(O(I+1),"2")]={v:"".concat(x,".").concat(C,".").concat(I),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},u["".concat(O(I+1),"2")]={v:"".concat(x,".").concat(C,".").concat(I),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},m["".concat(O(I+3),"5")]={v:"".concat(I,"日"),t:"s",s:{alignment:{horizontal:"center"}}};v["".concat(_,"2")]={v:"总计（分钟）",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},u["".concat(_,"2")]={v:"总计（小时）",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},i.push({s:{c:0,r:e+3},e:{c:18,r:e+3}});for(var W=[],N=1;N<=19;N++)W.push({wpx:95});for(var R={SheetNames:["汇总","明细","休病假"],Sheets:{"汇总":Object(w["a"])({"!ref":"A1:S".concat(e+4),"!merges":i,"!cols":W},l,(c={A1:{v:"广州汉风科技有限公司考勤表（".concat(C,"月份）"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"},font:{sz:"18"}}},A2:{v:"              负责人签字:                       ".concat(D,"/").concat(C,"/").concat(k),t:"s",s:{alignment:{horizontal:"top"},font:{sz:"10"}}},A3:{v:"序号",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}},Object(j["a"])(c,"A".concat(e+4),{v:"备注：每月每人100元全勤奖励（已经走邮件批复）。",t:"s",s:{alignment:{vertical:"center"}}}),Object(j["a"])(c,"B3",{v:"部门",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"C3",{v:"组别",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"D3",{v:"姓名",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"E3",{v:"出勤",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"F3",{v:"全勤",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"G3",{v:"餐补",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"H3",{v:"加班",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"I3",{v:"".concat(C,"月累计迟到"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"J3",{v:"上班未打卡",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"K3",{v:"".concat(C,"月累计早退"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"L3",{v:"下班未打卡",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"M3",{v:"".concat(C,"月累计旷工"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"N3",{v:"".concat(C,"月累计事假"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"O3",{v:"".concat(C,"月累计病假"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"P3",{v:"".concat(C,"月累计年假"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"Q3",{v:"".concat(C,"月累计有薪假"),t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"R3",{v:"备注",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),Object(j["a"])(c,"S3",{v:"员工签名",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}),c)),"明细":Object(w["a"])({"!ref":"A1:".concat(_).concat(e+2),"!merges":[{s:{c:0,r:0},e:{c:k+2,r:0}}],A1:{v:"广州汉风员工迟到登记表",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}},v),"休病假":Object(w["a"])({"!ref":"A1:".concat(_).concat(e+2),"!merges":[{s:{c:0,r:0},e:{c:k+2,r:0}}],A1:{v:"广州汉风员工休病假登记表",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}}},u)}},Y=[],$=1;$<=k+5;$++){var X=$>=k+4?90:40;Y.push({wpx:X})}var H={SheetNames:["Sheet1"],Sheets:{Sheet1:Object(w["a"])((r={"!ref":"A1:".concat(O(k+5)).concat(p+14),"!cols":Y,"!merges":[{s:{c:0,r:0},e:{c:k+4,r:1}},{s:{c:0,r:2},e:{c:12,r:2}},{s:{c:13,r:2},e:{c:k-1,r:2}},{s:{c:3,r:3},e:{c:k+4,r:3}},{s:{c:k,r:2},e:{c:k+4,r:2}},{s:{c:0,r:p+5},e:{c:k+4,r:p+7}},{s:{c:k+3,r:p+8},e:{c:k+4,r:p+10}},{s:{c:0,r:p+8},e:{c:k+2,r:p+10}},{s:{c:0,r:p+11},e:{c:12,r:p+13}},{s:{c:k,r:p+11},e:{c:k+4,r:p+13}},{s:{c:13,r:p+11},e:{c:k-1,r:p+13}}].concat(s),A1:{v:"加班申请表",t:"s",s:{alignment:{vertical:"center",horizontal:"center"}}},A3:{v:"申请部门：技术部",t:"s"},N3:{v:"申请人：李冬杰",t:"s"}},Object(j["a"])(r,"".concat(O(k+1),"3"),{v:"申请日期：".concat(D).concat(S,"01-").concat(S).concat(k-1),t:"s",s:{alignment:{horizontal:"center"}}}),Object(j["a"])(r,"D4",{v:"".concat(D,"年").concat(C,"月"),t:"s",s:{alignment:{horizontal:"center"}}}),Object(j["a"])(r,"".concat(O(k+4),"5"),{v:"合计（小时）",t:"s",s:{alignment:{horizontal:"center"}}}),Object(j["a"])(r,"".concat(O(k+5),"5"),{v:"餐补（元）",t:"s",s:{alignment:{horizontal:"center"}}}),Object(j["a"])(r,"A".concat(p+6),{v:"加班原因（具体工作内容）：",t:"s",s:{alignment:{vertical:"top"}}}),Object(j["a"])(r,"".concat(O(k+4)).concat(p+9),{v:"申请人签字：  ",t:"s",s:{alignment:{vertical:"top"}}}),Object(j["a"])(r,"A".concat(p+12),{v:"部门负责人审批：                    ",t:"s",s:{alignment:{vertical:"top"}}}),Object(j["a"])(r,"N".concat(p+12),{v:"行政部：                 ",t:"s",s:{alignment:{vertical:"top"}}}),Object(j["a"])(r,"".concat(O(k+1)).concat(p+12),{v:"总经理：                    ",t:"s",s:{alignment:{vertical:"top"}}}),r),m)}};return{sheet1:R,sheet2:H}}),C=x,k=(n("34ef"),function(t,e){var n=document.createElement("a");n.download=e||"下载",n.href=URL.createObjectURL(t),n.click(),setTimeout(function(){URL.revokeObjectURL(t)},100)}),S=function(t){for(var e=new ArrayBuffer(t.length),n=new Uint8Array(e),a=0;a!==t.length;++a)n[a]=255&t.charCodeAt(a);return e},D=function(t,e){var n=XLSX.write(t,{bookType:"xlsx",bookSST:!1,type:"binary"});k(new Blob([S(n)],{type:"application/octet-stream"}),"".concat(e,".xlsx"))},_=D,A=new Date,F={name:"app",data:function(){return{dates:[],file1:null,file2:null,sheet1:null,sheet2:null,isFinish:!1,year:A.getFullYear(),month:A.getMonth()+1,isCalcWorkDays:!0}},methods:{onStart:function(){var t=this;if(0!==this.dates.length)if(null!=this.file1)if(null!=this.file2){var e=this.dates.map(function(t){return"".concat(t.getFullYear(),"/").concat(t.getMonth()+1,"/").concat(t.getDate())});Promise.all([s(this.file1),s(this.file2)]).then(function(n){var a=Object(o["a"])(n,2),c=Object(o["a"])(a[0],1),r=c[0],i=Object(o["a"])(a[1],1),s=i[0],l=h(r,e),v=p(s),u=z(l,v),m=u.total,d=u.data,f=C(d,m,e.length,t.isCalcWorkDays),g=f.sheet1,b=f.sheet2;t.sheet1=g,t.sheet2=b,t.isFinish=!0})}else this.$alert("请上传花名册","提醒",{confirmButtonText:"确定"});else this.$alert("请上传考勤报表","提醒",{confirmButtonText:"确定"});else this.$alert("请选择工作日期","提醒",{confirmButtonText:"确定"})},onUploadChange1:function(t,e){this.file1=t.raw},onUploadChange2:function(t,e){this.file2=t.raw},downloadSheet1:function(){_(this.sheet1,"广州汉风---员工考勤表".concat(this.year,"年").concat(this.month,"月份"))},downloadSheet2:function(){_(this.sheet2,"技术部".concat(this.month,"月加班申请表"))}}},T=F,L=(n("034f"),n("2877")),B=Object(L["a"])(T,c,r,!1,null,null,null);B.options.__file="App.vue";var M=B.exports,P=n("5c96"),U=n.n(P);n("0fae");a["default"].use(U.a),a["default"].config.productionTip=!1,new a["default"]({render:function(t){return t(M)}}).$mount("#app")},c21b:function(t,e,n){}});
//# sourceMappingURL=app.8cb18604.js.map