(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-508d0a52"],{1148:function(t,e,n){"use strict";var i=n("a691"),a=n("1d80");t.exports="".repeat||function(t){var e=String(a(this)),n="",r=i(t);if(r<0||r==1/0)throw RangeError("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(e+=e))1&r&&(n+=e);return n}},"1dde":function(t,e,n){var i=n("d039"),a=n("b622"),r=n("2d00"),o=a("species");t.exports=function(t){return r>=51||!i((function(){var e=[],n=e.constructor={};return n[o]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"3c8c":function(t,e,n){},"408a":function(t,e,n){var i=n("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=i(t))throw TypeError("Incorrect invocation");return+t}},"65f0":function(t,e,n){var i=n("861d"),a=n("e8b5"),r=n("b622"),o=r("species");t.exports=function(t,e){var n;return a(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?i(n)&&(n=n[o],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},8418:function(t,e,n){"use strict";var i=n("c04e"),a=n("9bf2"),r=n("5c6c");t.exports=function(t,e,n){var o=i(e);o in t?a.f(t,o,r(0,n)):t[o]=n}},"8e63":function(t,e,n){"use strict";var i=n("3c8c"),a=n.n(i);a.a},a434:function(t,e,n){"use strict";var i=n("23e7"),a=n("23cb"),r=n("a691"),o=n("50c4"),s=n("7b0b"),u=n("65f0"),c=n("8418"),l=n("1dde"),d=n("ae40"),p=l("splice"),f=d("splice",{ACCESSORS:!0,0:0,1:2}),v=Math.max,m=Math.min,g=9007199254740991,h="Maximum allowed length exceeded";i({target:"Array",proto:!0,forced:!p||!f},{splice:function(t,e){var n,i,l,d,p,f,x=s(this),b=o(x.length),w=a(t,b),y=arguments.length;if(0===y?n=i=0:1===y?(n=0,i=b-w):(n=y-2,i=m(v(r(e),0),b-w)),b+n-i>g)throw TypeError(h);for(l=u(x,i),d=0;d<i;d++)p=w+d,p in x&&c(l,d,x[p]);if(l.length=i,n<i){for(d=w;d<b-i;d++)p=d+i,f=d+n,p in x?x[f]=x[p]:delete x[f];for(d=b;d>b-i+n;d--)delete x[d-1]}else if(n>i)for(d=b-i;d>w;d--)p=d+i-1,f=d+n-1,p in x?x[f]=x[p]:delete x[f];for(d=0;d<n;d++)x[d+w]=arguments[d+2];return x.length=b-i+n,l}})},ae40:function(t,e,n){var i=n("83ab"),a=n("d039"),r=n("5135"),o=Object.defineProperty,s={},u=function(t){throw t};t.exports=function(t,e){if(r(s,t))return s[t];e||(e={});var n=[][t],c=!!r(e,"ACCESSORS")&&e.ACCESSORS,l=r(e,0)?e[0]:u,d=r(e,1)?e[1]:void 0;return s[t]=!!n&&!a((function(){if(c&&!i)return!0;var t={length:-1};c?o(t,1,{enumerable:!0,get:u}):t[1]=1,n.call(t,l,d)}))}},ae66:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),n("div",{staticClass:"group"},t._l(t.datas,(function(e,i){return n("div",{key:i},[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:e.des,placement:"left"}},[n("div",{class:{groupindex:5==e.id,groupindex2:6==e.id,groupindex3:7==e.id,groupindex4:8==e.id}},[n("div",{staticClass:"group-index-attribute"},[n("p",{staticClass:"group-index-name"},[t._v(t._s(e.title))]),n("div",{staticStyle:{display:"flex"}},[n("Digital-Animation",{staticClass:"group-index-num",attrs:{num:e.count}})],1),n("p",{staticClass:"group-index-total"},[t._v(t._s(e.des))])]),n("div",{class:{grouppiefont1:5==e.id,grouppiefont2:6==e.id,grouppiefont3:7==e.id,grouppiefont4:8==e.id}},[n("div",[n("span",{staticStyle:{"font-family":"Impact","font-size":"0.28rem",color:"#FFFFFF","letter-spacing":"0"}},[t._v(t._s(t.pieDatas[i].value))]),n("span",{staticStyle:{"ont-family":"HelveticaNeue","font-size":"0.11rem",color:"#FFFFFF","letter-spacing":"0"}},[t._v("%")])]),n("div",{staticStyle:{"font-family":"PingFangSC-Regular","font-size":"0.11rem",color:"#A6F0FE","letter-spacing":"0"}},[t._v(" "+t._s(t.pieDatas[i].name)+" ")])]),n("div",{class:{grouppie1:5==e.id,grouppie2:6==e.id,grouppie3:7==e.id,grouppie4:8==e.id},attrs:{id:e.name}})])])],1)})),0)])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"title-box"},[n("div",{staticClass:"title-icon"}),n("span",{staticClass:"title-name"},[t._v("人数占比")])])}],r=(n("a434"),n("b680"),n("d3b7"),n("5698")),o={name:"groupIndex",methods:{drawPie:function(){var t=320,e=360,n=34,i=Math.min(t,e)/2-n,a=r["select"]("#my_dataviz").append("svg").attr("width",t).attr("height",e).append("g").attr("transform","translate("+t/2+","+e/2+")"),o={"现存确诊":30,"累计确诊":150,"累计死亡":29,"累计治愈":236},s=r["scaleOrdinal"]().domain(o).range(["#98abc5","#8a89a6"]),u=r["pie"]().value((function(t){return t.value})),c=u(r["entries"](o));a.selectAll("whatever").data(c).enter().append("path").attr("d",r["arc"]().innerRadius(100).outerRadius(i)).attr("fill",(function(t){return s(t.data.key)})).attr("stroke","black").style("stroke-width","2px").style("opacity",.7)}},created:function(){var t=this;r["json"]("DXYArea.json").then((function(e){var n=t.datas[0].count,i=t.datas[1].count,a=t.datas[2].count,r=t.datas[3].count;for(var o in e.results)n+=e.results[o].currentConfirmedCount,i+=e.results[o].confirmedCount,a+=e.results[o].deadCount,r+=e.results[o].curedCount;t.datas.splice(0,4),t.pieDatas.splice(0,4),t.pieDatas.push({name:"现存确诊",value:(n/i*100).toFixed(1)}),t.pieDatas.push({name:"累计确诊",value:100}),t.pieDatas.push({name:"累计死亡",value:(a/i*100).toFixed(1)}),t.pieDatas.push({name:"累计治愈",value:(r/i*100).toFixed(1)}),t.datas.push({id:5,name:"Signing",title:"现存确诊",count:n,des:"现存确诊"+n}),t.datas.push({id:6,title:"累计确诊",name:"express",count:i,des:"累计确诊人数:"+i}),t.datas.push({id:7,title:"累计死亡",name:"dismantle",count:a,des:"累计死亡人数"+a}),t.datas.push({id:8,name:"place",title:"累计治愈",count:r,des:"累计治愈人数"+r})}))},components:{DigitalAnimation:function(){return n.e("main-map").then(n.bind(null,"ed23"))}},mounted:function(){this.show=!0},data:function(){return{datas:[{id:1,name:"Signing",title:"现存确诊",count:0,des:"现存确诊0"},{id:2,title:"累计确诊",name:"express",count:0,des:"累计确诊人数:0"},{id:3,title:"累计死亡",name:"dismantle",count:0,des:"累计死亡人数0"},{id:4,name:"place",title:"累计治愈",count:0,des:"累计治愈人数0"}],pieDatas:[{name:"现存确诊",value:30},{name:"累计确诊",value:150},{name:"累计死亡",value:29},{name:"累计治愈",value:236}],show:!1}}},s=o,u=(n("8e63"),n("2877")),c=Object(u["a"])(s,i,a,!1,null,null,null);e["default"]=c.exports},b680:function(t,e,n){"use strict";var i=n("23e7"),a=n("a691"),r=n("408a"),o=n("1148"),s=n("d039"),u=1..toFixed,c=Math.floor,l=function(t,e,n){return 0===e?n:e%2===1?l(t,e-1,n*t):l(t*t,e/2,n)},d=function(t){var e=0,n=t;while(n>=4096)e+=12,n/=4096;while(n>=2)e+=1,n/=2;return e},p=u&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!s((function(){u.call({})}));i({target:"Number",proto:!0,forced:p},{toFixed:function(t){var e,n,i,s,u=r(this),p=a(t),f=[0,0,0,0,0,0],v="",m="0",g=function(t,e){var n=-1,i=e;while(++n<6)i+=t*f[n],f[n]=i%1e7,i=c(i/1e7)},h=function(t){var e=6,n=0;while(--e>=0)n+=f[e],f[e]=c(n/t),n=n%t*1e7},x=function(){var t=6,e="";while(--t>=0)if(""!==e||0===t||0!==f[t]){var n=String(f[t]);e=""===e?n:e+o.call("0",7-n.length)+n}return e};if(p<0||p>20)throw RangeError("Incorrect fraction digits");if(u!=u)return"NaN";if(u<=-1e21||u>=1e21)return String(u);if(u<0&&(v="-",u=-u),u>1e-21)if(e=d(u*l(2,69,1))-69,n=e<0?u*l(2,-e,1):u/l(2,e,1),n*=4503599627370496,e=52-e,e>0){g(0,n),i=p;while(i>=7)g(1e7,0),i-=7;g(l(10,i,1),0),i=e-1;while(i>=23)h(1<<23),i-=23;h(1<<i),g(1,1),h(2),m=x()}else g(0,n),g(1<<-e,0),m=x()+o.call("0",p);return p>0?(s=m.length,m=v+(s<=p?"0."+o.call("0",p-s)+m:m.slice(0,s-p)+"."+m.slice(s-p))):m=v+m,m}})},e8b5:function(t,e,n){var i=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}}}]);
//# sourceMappingURL=chunk-508d0a52.20a4caf4.js.map