(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-189ea0a8"],{1148:function(t,e,n){"use strict";var r=n("a691"),a=n("1d80");t.exports="".repeat||function(t){var e=String(a(this)),n="",o=r(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(n+=e);return n}},"1dde":function(t,e,n){var r=n("d039"),a=n("b622"),o=n("2d00"),c=a("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[c]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"3d8e":function(t,e,n){},"408a":function(t,e,n){var r=n("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=r(t))throw TypeError("Incorrect invocation");return+t}},5068:function(t,e,n){"use strict";n("3d8e")},8418:function(t,e,n){"use strict";var r=n("c04e"),a=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var c=r(e);c in t?a.f(t,c,o(0,n)):t[c]=n}},9172:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),n("div",{staticClass:"project-index-box"},[n("div",{staticClass:"project-index-title"},[t._v("确诊排名")]),t._l(t.contractDatas,(function(t,e){return n("div",{key:e},[n("contract-rank",{class:{projectitem0:0===e,projectitem1:1===e,projectitem2:2===e},attrs:{list:t}})],1)})),n("div",{staticClass:"project-index-express"},[n("div",{staticClass:"project-index-title2"},[t._v("死亡排名")]),t._l(t.contractDatas1,(function(t,e){return n("div",{key:e},[n("other-rank",{class:{projectexpress0:0===e,projectexpress1:1===e,projectexpress2:2===e,projectexpress3:3===e},attrs:{list:t,type:"express"}})],1)}))],2)],2)])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title-box2"},[n("div",{staticClass:"title-icon2"}),n("span",{staticClass:"title-name2"},[t._v("确诊死亡排行")])])}],o=(n("fb6a"),n("b680"),n("d3b7"),n("5698")),c={name:"projectIndex",methods:{compare:function(t){return function(e,n){var r=e[t],a=n[t];return a-r}}},components:{contractRank:function(){return Promise.all([n.e("chunk-2d0c8a76"),n.e("line-statistics")]).then(n.bind(null,"2526"))},otherRank:function(){return Promise.all([n.e("chunk-2d0c8a76"),n.e("line-statistics")]).then(n.bind(null,"5c9e"))}},computed:{},created:function(){var t=this;o["json"]("DXYArea.json").then((function(e){var n=0,r=0,a=[];for(var o in e.results)n+=e.results[o].confirmedCount,r+=e.results[o].deadCount,a.push({confirmedcount:e.results[o].confirmedCount,name:e.results[o].countryName,deadcount:e.results[o].deadCount,confirmedCount:e.results[o].confirmedCount,curedCount:e.results[o].curedCount});for(var c=0;c<a.length;c++)a[c].deadper=(a[c].deadcount/a[c].confirmedCount*100).toFixed(1),a[c].confirmedper=(a[c].confirmedCount/n*100).toFixed(1),a[c].confirmedtotal=n,a[c].deadtotal=r,a[c].data=[{name:"死亡人数",value:a[c].deadcount},{name:"治愈人数",value:a[c].curedCount}];t.contractDatas.length=0,a.sort(t.compare("confirmedCount")).slice(0,3),t.contractDatas=a.slice(0,3),t.contractDatas1.length=0,t.contractDatas1=a.sort(t.compare("deadcount")).slice(0,3);for(var i=0;i<t.contractDatas1.length;i++)t.contractDatas1[i].data1=[{name:"确诊人数",value:t.contractDatas1[i].confirmedCount},{name:"治愈人数",value:t.contractDatas1[i].curedCount}]}))},data:function(){return{contractDatas:[{name:"A国",per:0,confirmedcount:"0",confirmedtotal:"0",data:[{name:"死亡人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:32,confirmedcount:"8",confirmedtotal:"2",data:[{name:"死亡人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:0,confirmedcount:"6",confirmedtotal:"2",data:[{name:"死亡人数",value:"0"},{name:"治愈人数",value:"0"}]}],contractDatas1:[{name:"A国",per:0,confirmedcount:"0",confirmedtotal:"0",data:[{name:"确诊人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:32,confirmedcount:"8",confirmedtotal:"2",data:[{name:"确诊人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:0,confirmedcount:"6",confirmedtotal:"2",data:[{name:"确诊人数",value:"0"},{name:"治愈人数",value:"0"}]}]}}},i=c,u=(n("5068"),n("2877")),s=Object(u["a"])(i,r,a,!1,null,null,null);e["default"]=s.exports},ae40:function(t,e,n){var r=n("83ab"),a=n("d039"),o=n("5135"),c=Object.defineProperty,i={},u=function(t){throw t};t.exports=function(t,e){if(o(i,t))return i[t];e||(e={});var n=[][t],s=!!o(e,"ACCESSORS")&&e.ACCESSORS,l=o(e,0)?e[0]:u,d=o(e,1)?e[1]:void 0;return i[t]=!!n&&!a((function(){if(s&&!r)return!0;var t={length:-1};s?c(t,1,{enumerable:!0,get:u}):t[1]=1,n.call(t,l,d)}))}},b680:function(t,e,n){"use strict";var r=n("23e7"),a=n("a691"),o=n("408a"),c=n("1148"),i=n("d039"),u=1..toFixed,s=Math.floor,l=function(t,e,n){return 0===e?n:e%2===1?l(t,e-1,n*t):l(t*t,e/2,n)},d=function(t){var e=0,n=t;while(n>=4096)e+=12,n/=4096;while(n>=2)e+=1,n/=2;return e},f=u&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!i((function(){u.call({})}));r({target:"Number",proto:!0,forced:f},{toFixed:function(t){var e,n,r,i,u=o(this),f=a(t),m=[0,0,0,0,0,0],v="",p="0",h=function(t,e){var n=-1,r=e;while(++n<6)r+=t*m[n],m[n]=r%1e7,r=s(r/1e7)},x=function(t){var e=6,n=0;while(--e>=0)n+=m[e],m[e]=s(n/t),n=n%t*1e7},b=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==m[t]){var n=String(m[t]);e=""===e?n:e+c.call("0",7-n.length)+n}return e};if(f<0||f>20)throw RangeError("Incorrect fraction digits");if(u!=u)return"NaN";if(u<=-1e21||u>=1e21)return String(u);if(u<0&&(v="-",u=-u),u>1e-21)if(e=d(u*l(2,69,1))-69,n=e<0?u*l(2,-e,1):u/l(2,e,1),n*=4503599627370496,e=52-e,e>0){h(0,n),r=f;while(r>=7)h(1e7,0),r-=7;h(l(10,r,1),0),r=e-1;while(r>=23)x(1<<23),r-=23;x(1<<r),h(1,1),x(2),p=b()}else h(0,n),h(1<<-e,0),p=b()+c.call("0",f);return f>0?(i=p.length,p=v+(i<=f?"0."+c.call("0",f-i)+p:p.slice(0,i-f)+"."+p.slice(i-f))):p=v+p,p}})},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("861d"),o=n("e8b5"),c=n("23cb"),i=n("50c4"),u=n("fc6a"),s=n("8418"),l=n("b622"),d=n("1dde"),f=n("ae40"),m=d("slice"),v=f("slice",{ACCESSORS:!0,0:0,1:2}),p=l("species"),h=[].slice,x=Math.max;r({target:"Array",proto:!0,forced:!m||!v},{slice:function(t,e){var n,r,l,d=u(this),f=i(d.length),m=c(t,f),v=c(void 0===e?f:e,f);if(o(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?a(n)&&(n=n[p],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return h.call(d,m,v);for(r=new(void 0===n?Array:n)(x(v-m,0)),l=0;m<v;m++,l++)m in d&&s(r,l,d[m]);return r.length=l,r}})}}]);
//# sourceMappingURL=chunk-189ea0a8.c48d5e4b.js.map