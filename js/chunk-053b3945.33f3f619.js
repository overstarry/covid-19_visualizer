(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-053b3945"],{"04d1":function(t,e,n){var r=n("342f"),o=r.match(/firefox\/(\d+)/i);t.exports=!!o&&+o[1]},1148:function(t,e,n){"use strict";var r=n("a691"),o=n("577e"),a=n("1d80");t.exports=function(t){var e=o(a(this)),n="",c=r(t);if(c<0||c==1/0)throw RangeError("Wrong number of repetitions");for(;c>0;(c>>>=1)&&(e+=e))1&c&&(n+=e);return n}},"1dde":function(t,e,n){var r=n("d039"),o=n("b622"),a=n("2d00"),c=o("species");t.exports=function(t){return a>=51||!r((function(){var e=[],n=e.constructor={};return n[c]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"3d8e":function(t,e,n){},"408a":function(t,e,n){var r=n("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=r(t))throw TypeError("Incorrect invocation");return+t}},"4e82":function(t,e,n){"use strict";var r=n("23e7"),o=n("1c0b"),a=n("7b0b"),c=n("50c4"),i=n("577e"),u=n("d039"),s=n("addb"),l=n("a640"),d=n("04d1"),f=n("d998"),v=n("2d00"),m=n("512ce"),p=[],h=p.sort,b=u((function(){p.sort(void 0)})),x=u((function(){p.sort(null)})),g=l("sort"),w=!u((function(){if(v)return v<70;if(!(d&&d>3)){if(f)return!0;if(m)return m<603;var t,e,n,r,o="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:n=3;break;case 68:case 71:n=4;break;default:n=2}for(r=0;r<47;r++)p.push({k:e+r,v:n})}for(p.sort((function(t,e){return e.v-t.v})),r=0;r<p.length;r++)e=p[r].k.charAt(0),o.charAt(o.length-1)!==e&&(o+=e);return"DGBEFHACIJK"!==o}})),C=b||!x||!g||!w,A=function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:i(e)>i(n)?1:-1}};r({target:"Array",proto:!0,forced:C},{sort:function(t){void 0!==t&&o(t);var e=a(this);if(w)return void 0===t?h.call(e):h.call(e,t);var n,r,i=[],u=c(e.length);for(r=0;r<u;r++)r in e&&i.push(e[r]);i=s(i,A(t)),n=i.length,r=0;while(r<n)e[r]=i[r++];while(r<u)delete e[r++];return e}})},5068:function(t,e,n){"use strict";n("3d8e")},"512ce":function(t,e,n){var r=n("342f"),o=r.match(/AppleWebKit\/(\d+)\./);t.exports=!!o&&+o[1]},8418:function(t,e,n){"use strict";var r=n("a04b"),o=n("9bf2"),a=n("5c6c");t.exports=function(t,e,n){var c=r(e);c in t?o.f(t,c,a(0,n)):t[c]=n}},9172:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),n("div",{staticClass:"project-index-box"},[n("div",{staticClass:"project-index-title"},[t._v("确诊排名")]),t._l(t.contractDatas,(function(t,e){return n("div",{key:e},[n("contract-rank",{class:{projectitem0:0===e,projectitem1:1===e,projectitem2:2===e},attrs:{list:t}})],1)})),n("div",{staticClass:"project-index-express"},[n("div",{staticClass:"project-index-title2"},[t._v("死亡排名")]),t._l(t.contractDatas1,(function(t,e){return n("div",{key:e},[n("other-rank",{class:{projectexpress0:0===e,projectexpress1:1===e,projectexpress2:2===e,projectexpress3:3===e},attrs:{list:t,type:"express"}})],1)}))],2)],2)])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title-box2"},[n("div",{staticClass:"title-icon2"}),n("span",{staticClass:"title-name2"},[t._v("确诊死亡排行")])])}],a=(n("d3b7"),n("3ca3"),n("ddb0"),n("b680"),n("fb6a"),n("4e82"),n("5698")),c={name:"projectIndex",methods:{compare:function(t){return function(e,n){var r=e[t],o=n[t];return o-r}}},components:{contractRank:function(){return Promise.all([n.e("chunk-2d0c8a76"),n.e("line-statistics")]).then(n.bind(null,"2526"))},otherRank:function(){return Promise.all([n.e("chunk-2d0c8a76"),n.e("line-statistics")]).then(n.bind(null,"5c9e"))}},computed:{},created:function(){var t=this;a["json"]("DXYArea.json").then((function(e){var n=0,r=0,o=[];for(var a in e.results)n+=e.results[a].confirmedCount,r+=e.results[a].deadCount,o.push({confirmedcount:e.results[a].confirmedCount,name:e.results[a].countryName,deadcount:e.results[a].deadCount,confirmedCount:e.results[a].confirmedCount,curedCount:e.results[a].curedCount});for(var c=0;c<o.length;c++)o[c].deadper=(o[c].deadcount/o[c].confirmedCount*100).toFixed(1),o[c].confirmedper=(o[c].confirmedCount/n*100).toFixed(1),o[c].confirmedtotal=n,o[c].deadtotal=r,o[c].data=[{name:"死亡人数",value:o[c].deadcount},{name:"治愈人数",value:o[c].curedCount}];t.contractDatas.length=0,o.sort(t.compare("confirmedCount")).slice(0,3),t.contractDatas=o.slice(0,3),t.contractDatas1.length=0,t.contractDatas1=o.sort(t.compare("deadcount")).slice(0,3);for(var i=0;i<t.contractDatas1.length;i++)t.contractDatas1[i].data1=[{name:"确诊人数",value:t.contractDatas1[i].confirmedCount},{name:"治愈人数",value:t.contractDatas1[i].curedCount}]}))},data:function(){return{contractDatas:[{name:"A国",per:0,confirmedcount:"0",confirmedtotal:"0",data:[{name:"死亡人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:32,confirmedcount:"8",confirmedtotal:"2",data:[{name:"死亡人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:0,confirmedcount:"6",confirmedtotal:"2",data:[{name:"死亡人数",value:"0"},{name:"治愈人数",value:"0"}]}],contractDatas1:[{name:"A国",per:0,confirmedcount:"0",confirmedtotal:"0",data:[{name:"确诊人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:32,confirmedcount:"8",confirmedtotal:"2",data:[{name:"确诊人数",value:"0"},{name:"治愈人数",value:"0"}]},{name:"A国",per:0,confirmedcount:"6",confirmedtotal:"2",data:[{name:"确诊人数",value:"0"},{name:"治愈人数",value:"0"}]}]}}},i=c,u=(n("5068"),n("2877")),s=Object(u["a"])(i,r,o,!1,null,null,null);e["default"]=s.exports},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},addb:function(t,e){var n=Math.floor,r=function(t,e){var c=t.length,i=n(c/2);return c<8?o(t,e):a(r(t.slice(0,i),e),r(t.slice(i),e),e)},o=function(t,e){var n,r,o=t.length,a=1;while(a<o){r=a,n=t[a];while(r&&e(t[r-1],n)>0)t[r]=t[--r];r!==a++&&(t[r]=n)}return t},a=function(t,e,n){var r=t.length,o=e.length,a=0,c=0,i=[];while(a<r||c<o)a<r&&c<o?i.push(n(t[a],e[c])<=0?t[a++]:e[c++]):i.push(a<r?t[a++]:e[c++]);return i};t.exports=r},b680:function(t,e,n){"use strict";var r=n("23e7"),o=n("a691"),a=n("408a"),c=n("1148"),i=n("d039"),u=1..toFixed,s=Math.floor,l=function(t,e,n){return 0===e?n:e%2===1?l(t,e-1,n*t):l(t*t,e/2,n)},d=function(t){var e=0,n=t;while(n>=4096)e+=12,n/=4096;while(n>=2)e+=1,n/=2;return e},f=function(t,e,n){var r=-1,o=n;while(++r<6)o+=e*t[r],t[r]=o%1e7,o=s(o/1e7)},v=function(t,e){var n=6,r=0;while(--n>=0)r+=t[n],t[n]=s(r/e),r=r%e*1e7},m=function(t){var e=6,n="";while(--e>=0)if(""!==n||0===e||0!==t[e]){var r=String(t[e]);n=""===n?r:n+c.call("0",7-r.length)+r}return n},p=u&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!i((function(){u.call({})}));r({target:"Number",proto:!0,forced:p},{toFixed:function(t){var e,n,r,i,u=a(this),s=o(t),p=[0,0,0,0,0,0],h="",b="0";if(s<0||s>20)throw RangeError("Incorrect fraction digits");if(u!=u)return"NaN";if(u<=-1e21||u>=1e21)return String(u);if(u<0&&(h="-",u=-u),u>1e-21)if(e=d(u*l(2,69,1))-69,n=e<0?u*l(2,-e,1):u/l(2,e,1),n*=4503599627370496,e=52-e,e>0){f(p,0,n),r=s;while(r>=7)f(p,1e7,0),r-=7;f(p,l(10,r,1),0),r=e-1;while(r>=23)v(p,1<<23),r-=23;v(p,1<<r),f(p,1,1),v(p,2),b=m(p)}else f(p,0,n),f(p,1<<-e,0),b=m(p)+c.call("0",s);return s>0?(i=b.length,b=h+(i<=s?"0."+c.call("0",s-i)+b:b.slice(0,i-s)+"."+b.slice(i-s))):b=h+b,b}})},d998:function(t,e,n){var r=n("342f");t.exports=/MSIE|Trident/.test(r)},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},fb6a:function(t,e,n){"use strict";var r=n("23e7"),o=n("861d"),a=n("e8b5"),c=n("23cb"),i=n("50c4"),u=n("fc6a"),s=n("8418"),l=n("b622"),d=n("1dde"),f=d("slice"),v=l("species"),m=[].slice,p=Math.max;r({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var n,r,l,d=u(this),f=i(d.length),h=c(t,f),b=c(void 0===e?f:e,f);if(a(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?o(n)&&(n=n[v],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return m.call(d,h,b);for(r=new(void 0===n?Array:n)(p(b-h,0)),l=0;h<b;h++,l++)h in d&&s(r,l,d[h]);return r.length=l,r}})}}]);
//# sourceMappingURL=chunk-053b3945.33f3f619.js.map