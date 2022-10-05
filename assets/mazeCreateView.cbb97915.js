import{r as F,b as A,o as b,c as S,F as G,d as x,n as I,e as V,a as C,f as U,w as $}from"./index.3bdff9d9.js";const X="/assets/Screenshot_1.40f08b7e.png";var N={},T,j;function q(){if(j)return T;j=1;const a=Symbol.for("gensync:v1:start"),s=Symbol.for("gensync:v1:suspend"),l="GENSYNC_EXPECTED_START",d="GENSYNC_EXPECTED_SUSPEND",y="GENSYNC_OPTIONS_ERROR",h="GENSYNC_RACE_NONEMPTY",p="GENSYNC_ERRBACK_NO_CALLBACK";T=Object.assign(function(t){let n=t;return typeof t!="function"?n=w(t):n=O(t),Object.assign(n,f(n))},{all:E({name:"all",arity:1,sync:function(e){return Array.from(e[0]).map(n=>g(n))},async:function(e,t,n){const r=Array.from(e[0]);if(r.length===0){Promise.resolve().then(()=>t([]));return}let i=0;const c=r.map(()=>{});r.forEach((m,_)=>{P(m,R=>{c[_]=R,i+=1,i===c.length&&t(c)},n)})}}),race:E({name:"race",arity:1,sync:function(e){const t=Array.from(e[0]);if(t.length===0)throw v("Must race at least 1 item",h);return g(t[0])},async:function(e,t,n){const r=Array.from(e[0]);if(r.length===0)throw v("Must race at least 1 item",h);for(const i of r)P(i,t,n)}})});function f(e){return{sync:function(...n){return g(e.apply(this,n))},async:function(...n){return new Promise((r,i)=>{P(e.apply(this,n),r,i)})},errback:function(...n){const r=n.pop();if(typeof r!="function")throw v("Asynchronous function called without callback",p);let i;try{i=e.apply(this,n)}catch(c){r(c);return}P(i,c=>r(void 0,c),c=>r(c))}}}function o(e,t,n,r){if(typeof n===e||r&&typeof n>"u")return;let i;throw r?i=`Expected opts.${t} to be either a ${e}, or undefined.`:i=`Expected opts.${t} to be a ${e}.`,v(i,y)}function v(e,t){return Object.assign(new Error(e),{code:t})}function w({name:e,arity:t,sync:n,async:r,errback:i}){if(o("string","name",e,!0),o("number","arity",t,!0),o("function","sync",n),o("function","async",r,!0),o("function","errback",i,!0),r&&i)throw v("Expected one of either opts.async or opts.errback, but got _both_.",y);if(typeof e!="string"){let c;i&&i.name&&i.name!=="errback"&&(c=i.name),r&&r.name&&r.name!=="async"&&(c=r.name.replace(/Async$/,"")),n&&n.name&&n.name!=="sync"&&(c=n.name.replace(/Sync$/,"")),typeof c=="string"&&(e=c)}return typeof t!="number"&&(t=n.length),E({name:e,arity:t,sync:function(c){return n.apply(this,c)},async:function(c,m,_){r?r.apply(this,c).then(m,_):i?i.call(this,...c,(R,L)=>{R==null?m(L):_(R)}):m(n.apply(this,c))}})}function O(e){return u(e.name,e.length,function(...t){return e.apply(this,t)})}function E({name:e,arity:t,sync:n,async:r}){return u(e,t,function*(...i){const c=yield a;if(!c)return n.call(this,i);let m;try{r.call(this,i,_=>{m||(m={value:_},c())},_=>{m||(m={err:_},c())})}catch(_){m={err:_},c()}if(yield s,m.hasOwnProperty("err"))throw m.err;return m.value})}function g(e){let t;for(;!({value:t}=e.next()).done;)z(t,e);return t}function P(e,t,n){(function r(){try{let i;for(;!({value:i}=e.next()).done;){z(i,e);let c=!0,m=!1;const _=e.next(()=>{c?m=!0:r()});if(c=!1,M(_,e),!m)return}return t(i)}catch(i){return n(i)}})()}function z(e,t){e!==a&&D(t,v(`Got unexpected yielded value in gensync generator: ${JSON.stringify(e)}. Did you perhaps mean to use 'yield*' instead of 'yield'?`,l))}function M({value:e,done:t},n){!t&&e===s||D(n,v(t?"Unexpected generator completion. If you get this, it is probably a gensync bug.":`Expected GENSYNC_SUSPEND, got ${JSON.stringify(e)}. If you get this, it is probably a gensync bug.`,d))}function D(e,t){throw e.throw&&e.throw(t),t}function u(e,t,n){if(typeof e=="string"){const r=Object.getOwnPropertyDescriptor(n,"name");(!r||r.configurable)&&Object.defineProperty(n,"name",Object.assign(r||{},{configurable:!0,value:e}))}if(typeof t=="number"){const r=Object.getOwnPropertyDescriptor(n,"length");(!r||r.configurable)&&Object.defineProperty(n,"length",Object.assign(r||{},{configurable:!0,value:t}))}return n}return T}Object.defineProperty(N,"__esModule",{value:!0});N.forwardAsync=Z;N.isAsync=void 0;N.isThenable=K;N.maybeAsync=H;N.waitFor=N.onFirstPause=void 0;function k(){const a=q();return k=function(){return a},a}function Y(a,s,l,d,y,h,p){try{var f=a[h](p),o=f.value}catch(v){l(v);return}f.done?s(o):Promise.resolve(o).then(d,y)}function J(a){return function(){var s=this,l=arguments;return new Promise(function(d,y){var h=a.apply(s,l);function p(o){Y(h,d,y,p,f,"next",o)}function f(o){Y(h,d,y,p,f,"throw",o)}p(void 0)})}}const B=k()(function*(a){return yield*a}),W=k()({sync:()=>!1,errback:a=>a(null,!0)});N.isAsync=W;function H(a,s){return k()({sync(...l){const d=a.apply(this,l);if(K(d))throw new Error(s);return d},async(...l){return Promise.resolve(a.apply(this,l))}})}const Q=k()({sync:a=>a("sync"),async:function(){var a=J(function*(s){return s("async")});return function(l){return a.apply(this,arguments)}}()});function Z(a,s){const l=k()(a);return Q(d=>{const y=l[d];return s(y)})}const ee=k()({name:"onFirstPause",arity:2,sync:function(a){return B.sync(a)},errback:function(a,s,l){let d=!1;B.errback(a,(y,h)=>{d=!0,l(y,h)}),d||s()}});N.onFirstPause=ee;const te=k()({sync:a=>a,async:function(){var a=J(function*(s){return s});return function(l){return a.apply(this,arguments)}}()});N.waitFor=te;function K(a){return!!a&&(typeof a=="object"||typeof a=="function")&&!!a.then&&typeof a.then=="function"}const ne={class:"container"},oe={class:"d-flex justify-content-center"},re={key:0},se=C("img",{src:X,width:"25",height:"25"},null,-1),ae=[se],ie={__name:"playMaze",props:["maze","sightDist"],setup(a){const s=a;function l(){let f=2*s.sightDist+1;for(let o=0;o<f;o++){p.value[o]=[];for(let v=0;v<f;v++)p.value[o][v]="lightgray"}}function d(){let f=s.maze.value,o=[y[0]-1,y[1]+1];A(h.next);let v=2,w=4,O=s.sightDist*s.sightDist;for(;w==4;){w=0;for(let E=0;E<4;E++){let g=1;for(g=1;g<=v;g++){switch(E){case 0:o=[o[0]+1,o[1]];break;case 1:o=[o[0],o[1]-1];break;case 2:o=[o[0]-1,o[1]];break;case 3:o=[o[0],o[1]+1];break}if(o[0]<0||o[0]>=f.size||o[1]<0||o[1]>=f.size)continue;if((y[0]-o[0])*(y[0]-o[0])+(y[1]-o[1])*(y[1]-o[1])>=O)break;let P=o[1]+s.sightDist-y[1],z=o[0]+s.sightDist-y[0];console.log(z,P),console.log(p.value),p.value[P][z]=s.maze.value[o[1]][o[0]]}g==v+1&&w++}o=[o[0]-1,o[1]+1],v+=2}console.log("mazeRender",p),console.log("maze",s.maze)}const y=F(s.maze.startPos),h={col:y[0]-1,row:y[1]+1,next:A({})},p=A([]);return l(),d(),(f,o)=>(b(),S("div",ne,[(b(!0),S(G,null,x(p.value,(v,w)=>(b(),S("div",oe,[(b(!0),S(G,null,x(v,(O,E)=>(b(),S("div",{style:I({backgroundColor:p.value[w][E],width:"25px",height:"25px"})},[w==a.sightDist&&E==a.sightDist?(b(),S("div",re,ae)):V("",!0)],4))),256))]))),256))]))}},le={class:"container pt-1"},ue={class:"row"},ce={key:0,class:"col mt-2"},fe={class:"d-flex justify-content-center",style:{height:"25px"}},ye=["onMousedown","onMouseup","onClick"],he={key:1,class:"col mt-2"},ve={class:"col"},de={class:"d-flex justify-content-between m-2"},pe={class:"d-flex justify-content-center"},ge={__name:"mazeCreateView",setup(a){const s=A([]),l=A([]),d=A(!1),y=A(0),h=A(-1),p=A(0),f=F({value:[],startPos:[],size:16});f.value=o(),localStorage.clear();function o(){let u=[];for(let e=0;e<f.size;e++){u[e]=[];for(let t=0;t<f.size;t++)u[e][t]="white"}return console.log(u),u}function v(u,e){s.value=[u,e]}function w(u,e){l.value=[u,e],console.log(l.value,s.value),y.value==0&&(l.value[0]==s.value[0]&&l.value[1]==s.value[1]?g(l.value[0],l.value[1]):l.value[0]==s.value[0]?O():E(),h.value++,p.value=h.value,localStorage.setItem(h.value,JSON.stringify(f.value)))}function O(){let u=s.value,e=l.value;s.value[1]>=l.value[1]&&(u=l.value,e=s.value);for(let t=0;t<=e[1]-u[1];t++)g(s.value[0],s.value[1]+t)}function E(){let u=s.value,e=l.value,t=(u[1]-e[1])/(u[0]-e[0]);console.log(t);let n=0;if(Math.abs(t)>=1)for(s.value[1]>=l.value[1]&&(u=l.value,e=s.value);u[1]+n<=e[1];){console.log("123");let r=u[0]+1/t*n;r=Math.round(r),g(r,u[1]+n),n++}else for(s.value[0]>=l.value[0]&&(u=l.value,e=s.value);u[0]+n<=e[0];){let r=u[1]+t*n;r=Math.round(r),g(u[0]+n,r),n++}}function g(u,e,t="black"){console.log("draw",u,e),f.value[e][u]=="white"&&(f.value[e][u]=t)}function P(){h.value<=0||(console.log("sdf"),h.value--,f.value=JSON.parse(localStorage.getItem(h.value)),console.table(f.value))}function z(){h.value>=p.value||(h.value++,f.value=JSON.parse(localStorage.getItem(h.value)),console.table(f.value))}function M(u,e){switch(console.log("clickPos"),y.value){case 1:f.startPos=[u,e],g(u,e,"red");break}y.value=0}function D(){if(f.startPos.length==0){alert("\u672A\u8A2D\u7F6E\u8D77\u59CB\u9EDE");return}d.value=!d.value}return(u,e)=>(b(),S("div",le,[C("div",ue,[d.value?(b(),S("div",he,[U(ie,{maze:f,sightDist:4},null,8,["maze"])])):(b(),S("div",ce,[(b(!0),S(G,null,x(f.value,(t,n)=>(b(),S("div",fe,[(b(!0),S(G,null,x(t,(r,i)=>(b(),S("div",{style:I({border:"1px solid ",width:"25px",backgroundColor:f.value[n][i]}),onMousedown:$(c=>v(i,n),["prevent"]),onMouseup:$(c=>w(i,n),["prevent"]),onClick:c=>M(i,n)},null,44,ye))),256))]))),256))])),C("div",ve,[C("div",de,[C("button",{onClick:P,value:"<",class:"btn btn-outline-primary"}," \u2190 "),C("button",{onClick:e[0]||(e[0]=(...t)=>D&&D(...t)),value:"\u8A66\u73A9",class:"btn btn-outline-success"}," \u8A66\u73A9"),C("button",{onClick:z,value:">",class:"btn btn-outline-primary"}," \u2192 ")]),C("div",pe,[C("button",{class:"btn btn-outline-danger m-2",onClick:e[1]||(e[1]=t=>y.value=1)},"\u8A2D\u7F6E\u8D77\u59CB")])])])]))}};export{ge as default};
