"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[5908],{15908:function(e,t,n){n.d(t,{nQ:function(){return W},tr:function(){return Z},n9:function(){return H},H$:function(){return ee},f8:function(){return he},A7:function(){return B},jX:function(){return F},Bb:function(){return _},rC:function(){return xe},Oe:function(){return P}});var a=n(76991);const r=new Date("0001-01-01"),l=new Date("9999-12-31"),i={hours:23,minutes:59,seconds:59,milliseconds:999},o="\u2013",s="\u2014",c="-",u=[c,o,s,"\u2212"],d=[","," "],m=[":","."],p={hours:2,minutes:2,seconds:2,milliseconds:3};function g(e,t,n){const a=Math.min(Number(n),Math.max(Number(t),Number(e)));return e instanceof Date?new Date(a):a}function f(e,{day:t,month:n,year:a}={}){const r=new Date(e);return t&&r.setDate(r.getDate()+t),n&&r.setMonth(r.getMonth()+n),a&&r.setFullYear(r.getFullYear()+a),r}function v(e){return{day:String(e.getDate()).padStart(2,"0"),month:String(e.getMonth()+1).padStart(2,"0"),year:String(e.getFullYear()).padStart(4,"0"),hours:String(e.getHours()).padStart(2,"0"),minutes:String(e.getMinutes()).padStart(2,"0"),seconds:String(e.getSeconds()).padStart(2,"0"),milliseconds:String(e.getMilliseconds()).padStart(3,"0")}}function h(e,t){return!(e.length<t.length)&&e.split(/\D/).every(e=>!e.match(/^0+$/))}function S(e,t,n){const a=t.replace(/\W/g,"").length;return e.replace(n,"").match(new RegExp(`(\\D*\\d[^\\d\\s]*){1,${a}}`,"g"))||[]}function x(e){return e.reduce((e,[t,n])=>Object.assign(Object.assign({},e),{[t]:n}),{})}function b(e,t){const n=t.replace(/[^dmy]/g,""),a=e.replace(/\D+/g,""),r={day:a.slice(n.indexOf("d"),n.lastIndexOf("d")+1),month:a.slice(n.indexOf("m"),n.lastIndexOf("m")+1),year:a.slice(n.indexOf("y"),n.lastIndexOf("y")+1)};return x(Object.entries(r).filter(([e,t])=>Boolean(t)).sort(([e],[n])=>t.toLowerCase().indexOf(e[0])>t.toLowerCase().indexOf(n[0])?1:-1))}function $(e,t){var n,a,r,l,i,o,s;const c=2===(null===(n=e.year)||void 0===n?void 0:n.length)?`20${e.year}`:e.year,u=new Date(Number(null!=c?c:"0"),Number(null!==(a=e.month)&&void 0!==a?a:"1")-1,Number(null!==(r=e.day)&&void 0!==r?r:"1"),Number(null!==(l=null==t?void 0:t.hours)&&void 0!==l?l:"0"),Number(null!==(i=null==t?void 0:t.minutes)&&void 0!==i?i:"0"),Number(null!==(o=null==t?void 0:t.seconds)&&void 0!==o?o:"0"),Number(null!==(s=null==t?void 0:t.milliseconds)&&void 0!==s?s:"0"));return u.setFullYear(Number(null!=c?c:"0")),u}const w=", ";function E({day:e,month:t,year:n,hours:a,minutes:r,seconds:l,milliseconds:i},o,s){var c;const u=2===(null===(c=o.match(/y/g))||void 0===c?void 0:c.length)?null==n?void 0:n.slice(-2):n;return(o+(s?w+s:"")).replace(/d+/g,null!=e?e:"").replace(/m+/g,null!=t?t:"").replace(/y+/g,null!=u?u:"").replace(/H+/g,null!=a?a:"").replace(/MSS/g,null!=i?i:"").replace(/M+/g,null!=r?r:"").replace(/S+/g,null!=l?l:"").replace(/^\D+/g,"").replace(/\D+$/g,"")}function M(e,t,n=0){return Number(e.padEnd(t.length,"0"))<=Number(t)?{validatedSegmentValue:e,prefixedZeroesCount:n}:e.endsWith("0")?M(`0${e.slice(0,t.length-1)}`,t,n+1):M(`${e.slice(0,t.length-1)}0`,t,n)}const y=e=>{var t,n,a;return{day:(null===(t=e.match(/d/g))||void 0===t?void 0:t.length)||0,month:(null===(n=e.match(/m/g))||void 0===n?void 0:n.length)||0,year:(null===(a=e.match(/y/g))||void 0===a?void 0:a.length)||0}},j={day:31,month:12,year:9999};function N({dateString:e,dateModeTemplate:t,offset:n,selection:[a,r]}){const l=b(e,t),i=Object.entries(l),o={};let s=0;for(const[d,m]of i){const e=E(o,t),l=j[d],i=n+e.length+(e.length&&1)+y(t)[d],c=i>=a&&i===r;if(c&&Number(m)>Number(l))return{validatedDateString:"",updatedSelection:[a,r]};if(c&&Number(m)<1)return{validatedDateString:"",updatedSelection:[a,r]};const{validatedSegmentValue:u,prefixedZeroesCount:p}=M(m,`${l}`);s+=p,o[d]=u}const c=E(o,t),u=c.length-e.length;return{validatedDateString:c,updatedSelection:[a+s+u,r+s+u]}}const O=/[\\^$.*+?()[\]{}|]/g,R=RegExp(O.source);function T(e){return e&&R.test(e)?e.replace(O,"\\$&"):e}function D(e){return e}function A(e){return!e||"object"==typeof e&&0===Object.keys(e).length}function L(e,t){const n=y(t);return x(Object.entries(e).map(([e,t])=>{const a=n[e];return[e,t.length===a&&t.match(/^0+$/)?"1".padStart(a,"0"):t]}))}function k({dateModeTemplate:e,min:t=r,max:n=l,datesSeparator:a="",dateSegmentSeparator:i="."}){return({value:r,selection:l})=>{const o=a&&r.endsWith(a),s=S(r,e,a);let c="";for(const u of s){c+=c?a:"";const r=b(u,e);h(u,e)?c+=E(v(g($(r),t,n)),e):c+=E(L(r,e),e)+(u.endsWith(i)?i:"")}return{selection:l,value:c+(o?a:"")}}}function B(e){const t=new RegExp(`${T(e)}$`);return e?({value:n,selection:a},r)=>{if(!n&&!r.value.endsWith(e))return{value:n,selection:a};if(!n.endsWith(e)&&!r.value.endsWith(e))return{selection:a,value:n+e};const l=r.value.replace(t,""),i=r.selection[1]>=l.length,o=function(e,t){let n="";for(let a=0;a<e.length;a++){if(e[a]!==t[a])return n;n+=e[a]}return n}(l,n);return{selection:a,value:Array.from(e).reverse().reduce((e,t,n)=>{const a=e.length-1-n;return e[a]!==t||o[a]===t&&i?e.slice(0,a+1)+t+e.slice(a+1):e},n)}}:D}function F(e){return e?({value:t,selection:n},a)=>{if(t.startsWith(e)||!t&&!a.value.startsWith(e))return{value:t,selection:n};const[r,l]=n,i=Array.from(e).reduce((e,n,a)=>(e+t)[a]===n?e:e+n,"");return{selection:[r+i.length,l+i.length],value:i+t}}:D}function C({dateModeTemplate:e,dateSegmentsSeparator:t,datesSeparator:n=""}){return({elementState:a,data:r})=>{const{value:l,selection:i}=a;if(r===t)return{elementState:a,data:i[0]===l.length?r:""};if(u.includes(r))return{elementState:a,data:n};const o=r.replace(new RegExp(`[^\\d${T(t)}${n}]`,"g"),"");if(!o)return{elementState:a,data:""};const[s,c]=i;let d=c+r.length;const m=l.slice(0,s)+o+l.slice(d),p=S(m,e,n);let g="";const f=Boolean(n)&&m.includes(n);for(const t of p){const{validatedDateString:r,updatedSelection:l}=N({dateString:t,dateModeTemplate:e,offset:g?g.length+n.length:0,selection:[s,d]});if(t&&!r)return{elementState:a,data:""};d=l[1],g+=f&&g?n+r:r}const v=g.slice(s,d);return{elementState:{selection:i,value:g.slice(0,s)+v.split(t).map(e=>"0".repeat(e.length)).join(t)+g.slice(d)},data:v}}}function W(e){return t=>{const n=t.ownerDocument;let a=0;const r=()=>a++,l=()=>a--,i=()=>{if(function({activeElement:e}){if(!(null==e?void 0:e.shadowRoot))return e;let t=e.shadowRoot.activeElement;for(;null==t?void 0:t.shadowRoot;)t=t.shadowRoot.activeElement;return t}(n)!==t)return;if(a)return n.addEventListener("mouseup",i,{once:!0,passive:!0});const r=t.selectionStart||0,l=t.selectionEnd||0,[o,s]=e(t.value,[r,l]);(o>r||s<l)&&t.setSelectionRange(g(r,o,s),g(l,o,s))};return n.addEventListener("selectionchange",i,{passive:!0}),n.addEventListener("mousedown",r,{passive:!0}),n.addEventListener("mouseup",l,{passive:!0}),()=>{n.removeEventListener("selectionchange",i),n.removeEventListener("mousedown",r),n.removeEventListener("mouseup",l)}}}function V(e,t,n){return(a,r)=>{const l=()=>t(a,r);return a.addEventListener(e,l,n),()=>a.removeEventListener(e,l,n)}}function _(e){const t=()=>{const t=e.value;e.addEventListener("beforeinput",n=>{n.defaultPrevented&&t===e.value&&e.dispatchEvent(new CustomEvent("maskitoReject",{bubbles:!0}))},{once:!0})};return e.addEventListener("beforeinput",t,!0),()=>e.removeEventListener("beforeinput",t,!0)}function P(e,t=!1){const n=t=>{for(let n=t.length-1;n>=0;n--)if(t[n]!==e[n])return t.slice(0,n+1);return""},a=[W(e=>[0,n(e).length])];let r=!1;if(t){const t=V("focus",t=>{r=!0,t.value+=e.slice(t.value.length),t.dispatchEvent(new Event("input"))},{capture:!0}),l=V("blur",e=>{r=!1,e.value=n(e.value),e.dispatchEvent(new Event("input"))},{capture:!0});a.push(t,l)}return{plugins:a,removePlaceholder:n,preprocessors:[({elementState:e,data:t})=>{const{value:a,selection:r}=e;return{elementState:{selection:r,value:n(a)},data:t}}],postprocessors:[({value:n,selection:a},l)=>!l.value||!r&&t?{value:n,selection:a}:{value:n+e.slice(n.length),selection:a}]}}function Z({mode:e,separator:t=".",max:n,min:r}){const l=e.split("/").join(t);return Object.assign(Object.assign({},a.A_),{mask:Array.from(l).map(e=>e===t?e:/\d/),overwriteMode:"replace",preprocessors:[({elementState:e},t)=>{const{value:n,selection:a}=e;if(!n||function(e,[t,n]){return n===e.length}(n,a))return{elementState:e};const[r,l]=a,i=n.slice(r,l).replace(/\d/g,"0"),o=n.slice(0,r)+i+n.slice(l);return"validation"===t||"insert"===t&&r===l?{elementState:{selection:a,value:o}}:{elementState:{selection:"deleteBackward"===t||"insert"===t?[r,r]:[l,l],value:o}}},C({dateModeTemplate:l,dateSegmentsSeparator:t})],postprocessors:[k({min:r,max:n,dateModeTemplate:l,dateSegmentSeparator:t})]})}function I({dateModeTemplate:e,datesSeparator:t,minLength:n,maxLength:a,max:r=l}){return A(n)&&A(a)?D:({value:l,selection:i})=>{const o=S(l,e,t);if(2!==o.length||o.some(t=>!h(t,e)))return{value:l,selection:i};const[s,c]=o.map(t=>$(b(t,e))),u=f(s,Object.assign(Object.assign({},n),{day:(null==n?void 0:n.day)&&n.day-1})),d=A(a)?r:f(s,Object.assign(Object.assign({},a),{day:(null==a?void 0:a.day)&&a.day-1})),m=g(c,u,r);return{selection:i,value:o[0]+t+E(v(m>d?d:m),e)}}}function Y({dateModeTemplate:e,datesSeparator:t}){return({value:n,selection:a})=>{const r=S(n,e,t),l=2===r.length&&r.every(t=>h(t,e)),[i,o]=a;if(!((i>=n.length||0===i&&o>=n.length)&&l))return{value:n,selection:a};const[s,c]=r.map(t=>$(b(t,e)));return{selection:a,value:s>c?r.reverse().join(t):n}}}function H({mode:e,separator:t=".",min:n,max:r,minLength:l,maxLength:i,rangeSeparator:s=`\xa0${o}\xa0`}){const c=e.split("/").join(t),u=Array.from(c).map(e=>e===t?e:/\d/);return Object.assign(Object.assign({},a.A_),{mask:[...u,...Array.from(s),...u],overwriteMode:"replace",preprocessors:[({elementState:e},t)=>{const{value:n,selection:a}=e;if(!n||function(e,[t,n]){return n===e.length}(n,a))return{elementState:e};const[r,l]=a,i=n.slice(r,l).replace(/\d/g,"0"),o=n.slice(0,r)+i+n.slice(l);return"validation"===t||"insert"===t&&r===l?{elementState:{selection:a,value:o}}:{elementState:{selection:"deleteBackward"===t||"insert"===t?[r,r]:[l,l],value:o}}},C({dateModeTemplate:c,dateSegmentsSeparator:t,datesSeparator:s})],postprocessors:[k({min:n,max:r,dateModeTemplate:c,datesSeparator:s,dateSegmentSeparator:t}),I({dateModeTemplate:c,minLength:l,maxLength:i,max:r,datesSeparator:s}),Y({dateModeTemplate:c,datesSeparator:s})]})}function G(e){return x(Object.entries(e).map(([e,t])=>[e,`${t}`.padEnd(p[e],"0")]))}function X(e){const t=e.replace(/\D+/g,""),n={hours:t.slice(0,2),minutes:t.slice(2,4),seconds:t.slice(4,6),milliseconds:t.slice(6,9)};return x(Object.entries(n).filter(([e,t])=>Boolean(t)))}function Q({hours:e="",minutes:t="",seconds:n="",milliseconds:a=""}){return`${e}${t&&`:${t}`}${n&&`:${n}`}${a&&`.${a}`}`}const q=new RegExp(`[${m.map(T).join("")}]$`);function z({timeString:e,paddedMaxValues:t,offset:n,selection:[a,r]}){const l=X(e),i=Object.entries(l),o={};let s=0;for(const[m,g]of i){const e=Q(o),l=t[m],i=n+e.length+(e.length&&1)+p[m];if(i>=a&&i<=r&&Number(g)>Number(l))return{validatedTimeString:"",updatedTimeSelection:[a,r]};const{validatedSegmentValue:c,prefixedZeroesCount:u}=M(g,`${l}`);s+=u,o[m]=c}const[c=""]=e.match(q)||[],u=Q(o)+c,d=Math.max(u.length-e.length,0);return{validatedTimeString:u,updatedTimeSelection:[a+s+d,r+s+d]}}function J(e,t){const n=e.includes(w);return[e.slice(0,t.length),e.slice(n?t.length+w.length:t.length)]}function K({dateModeTemplate:e,timeMode:t,min:n=r,max:a=l}){return({value:r,selection:l})=>{const[i,o]=J(r,e),s=b(i,e),c=X(o);if(!function(e,t,n){return e.length>=t.length+n.length+w.length&&e.split(w)[0].split(/\D/).every(e=>!e.match(/^0+$/))}(r,e,t)){const o=L(s,e),{year:u,month:d,day:m}=h(i,e)?v(g($(o),n,a)):o,p=E(Object.assign({year:u,month:d,day:m},c),e,t);return{selection:l,value:p+r.slice(p.length)}}return{selection:l,value:E(v(g($(s,c),n,a)),e,t)}}}function U({dateModeTemplate:e,dateSegmentsSeparator:t}){const n=new RegExp(`[^\\d${m.map(T).join("")}${T(t)}]+`);return({elementState:a,data:r})=>{const{value:l,selection:o}=a;if(r===t)return{elementState:a,data:o[0]===l.length?r:""};if(d.includes(r))return{elementState:a,data:w};const s=r.replace(n,"");if(!s)return{elementState:a,data:""};const[c,u]=o;let m=u+r.length;const p=l.slice(0,c)+s+l.slice(m),[g,f]=J(p,e);let v="";const h=p.includes(w),{validatedDateString:S,updatedSelection:x}=N({dateString:g,dateModeTemplate:e,offset:0,selection:[c,m]});if(g&&!S)return{elementState:a,data:""};m=x[1],v+=S;const b=G(i),{validatedTimeString:$,updatedTimeSelection:E}=z({timeString:f,paddedMaxValues:b,offset:v.length+w.length,selection:[c,m]});if(f&&!$)return{elementState:a,data:""};m=E[1],v+=h?w+$:$;const M=v.slice(c,m);return{elementState:{selection:o,value:v.slice(0,c)+M.split(t).map(e=>"0".repeat(e.length)).join(t)+v.slice(m)},data:M}}}function ee({dateMode:e,timeMode:t,dateSeparator:n=".",min:r,max:l}){const i=e.split("/").join(n);return Object.assign(Object.assign({},a.A_),{mask:[...Array.from(i).map(e=>e===n?e:/\d/),...w.split(""),...Array.from(t).map(e=>m.includes(e)?e:/\d/)],overwriteMode:"replace",preprocessors:[({elementState:e},t)=>{const{value:n,selection:a}=e;if(!n||function(e,[t,n]){return n===e.length}(n,a))return{elementState:e};const[r,l]=a,i=n.slice(r,l).replace(/\d/g,"0"),o=n.slice(0,r)+i+n.slice(l);return"validation"===t||"insert"===t&&r===l?{elementState:{selection:a,value:o}}:{elementState:{selection:"deleteBackward"===t||"insert"===t?[r,r]:[l,l],value:o}}},U({dateModeTemplate:i,dateSegmentsSeparator:n})],postprocessors:[K({min:r,max:l,dateModeTemplate:i,timeMode:t})]})}function te({decimalSeparator:e,isNegativeAllowed:t,precision:n,thousandSeparator:a,prefix:r,postfix:l}){const i=ne(r),o=t?"\u2212?":"",s=a?`[\\d${T(a)}]*`:"[\\d]*",c=n>0?`(${T(e)}\\d{0,${Number.isFinite(n)?n:""}})?`:"",u=ne(l);return new RegExp(`^${i}${o}${s}${c}${u}$`)}function ne(e){return e?`${e.split("").map(e=>`${T(e)}?`).join("")}`:""}function ae(e,t){return","===e||"."===e?[".",",","\u0431","\u044e"].filter(n=>n!==t&&n!==e):[]}function re(e,t="."){const n=!!e.match(new RegExp(`^\\D*[\u2212\\${c}${o}${s}]`)),a=e.replace(new RegExp(`[^\\d${T(t)}]`,"g"),"").replace(t,".");return a?Number((n?c:"")+a):NaN}function le({decimalSeparator:e,precision:t,decimalZeroPadding:n,postfix:a}){if(t<=0||!n)return D;const r=new RegExp(`${T(a)}$`);return({value:n,selection:l})=>{if(isNaN(re(n)))return{value:n,selection:l};const[i,o=""]=n.replace(r,"").split(e);return{value:i+e+o.padEnd(t,"0")+a,selection:l}}}function ie({min:e,max:t,decimalSeparator:n}){return({value:a,selection:r})=>{const l=re(a,n),i=l>0?Math.min(l,t):Math.max(l,e);if(!Number.isNaN(l)&&i!==l){const e=`${i}`.replace(".",n).replace(c,"\u2212");return{value:e,selection:[e.length,e.length]}}return{value:a,selection:r}}}function oe({decimalSeparator:e,thousandSeparator:t,decimalZeroPadding:n}){return({elementState:a,data:r},l)=>{const{value:i,selection:o}=a,[s,c]=o,u=i.slice(s,c),d=n?[e,t]:[t],m=n&&s>i.indexOf(e)&&Boolean(u.match(/^0+$/gi));return"deleteBackward"!==l&&"deleteForward"!==l||!d.includes(u)&&!m?{elementState:a,data:r}:{elementState:{value:i,selection:"deleteForward"===l?[c,c]:[s,s]},data:r}}}function se({decimalSeparator:e,precision:t}){const n=new RegExp(`^\\D*${T(e)}`);return({elementState:a,data:r})=>{const{value:l,selection:i}=a,[o]=i;return t<=0||l.includes(e)||!r.match(n)?{elementState:a,data:r}:{elementState:a,data:l.slice(0,o).match(/\d+/)?r:`0${r}`}}}function ce(e,t){const n=new RegExp(`[${t.join("")}]`,"gi");return({elementState:t,data:a})=>{const{value:r,selection:l}=t;return{elementState:{selection:l,value:r.replace(n,e)},data:a.replace(n,e)}}}function ue(e){return({elementState:t,data:n})=>{const{value:a,selection:r}=t,[l,i]=r;return{elementState:t,data:!a.includes(e)||a.slice(l,i+1).includes(e)?n:n.replace(new RegExp(T(e),"gi"),"")}}}function de({thousandSeparator:e,decimalSeparator:t,prefix:n,postfix:a}){if(!e)return D;const r=new RegExp(`^${T(n)}\u2212?`),l=new RegExp(`${T(a)}$`);return({value:n,selection:a})=>{const[i,o=""]=n.split(t),[s,c]=a;let[u,d]=a;const m=i.replace(r,"").replace(l,""),[p=""]=i.match(r)||[],[g=""]=i.match(l)||[];return{value:p+Array.from(m).reduceRight((t,n,a)=>{const r=!(!a&&n===e)&&t.length&&(t.length+1)%4==0;return n===e&&r?n+t:n!==e||r?r?(a<=s&&u++,a<=c&&d++,n+e+t):n+t:(a&&a<=s&&u--,a&&a<=c&&d--,t)},"")+g+(n.includes(t)?t:"")+o,selection:[u,d]}}}function me(e,t){if(e>0)return D;const n=new RegExp(`${T(t)}.*$`,"g");return({elementState:e,data:t})=>{const{value:a,selection:r}=e,[l,i]=r,o=a.replace(n,"");return{elementState:{selection:[Math.min(l,o.length),Math.min(i,o.length)],value:o},data:t.replace(n,"")}}}const pe=[0,0];function ge(e,t){const n=function(e,t){const n=e=>{const n=T(t);return e.replace(new RegExp(`^(\\D+)?[0${n}]+(?=0)`),"$1").replace(new RegExp(`^(\\D+)?[0${n}]+(?=[1-9])`),"$1")},a=(e,t)=>{const a=e.slice(0,t),r=e.slice(t).startsWith("0");return a.length-n(a).length+(r?1:0)};return({value:t,selection:r})=>{const[l,i]=r,o=t.includes(e),[s,c=""]=t.split(e),u=n(s);if(s===u)return{value:t,selection:r};const d=l-a(t,l),m=i-a(t,i);return{value:u+(o?e:"")+c,selection:[Math.max(d,0),Math.max(m,0)]}}}(e,t);return V("blur",e=>{const t=n({value:e.value,selection:pe},{value:"",selection:pe}).value;e.value!==t&&(e.value=t,e.dispatchEvent(new Event("input")))},{capture:!0})}function fe({min:e,max:t,decimalSeparator:n}){return V("blur",(r,l)=>{const i=re(r.value,n),o=g(i,e,t);!Number.isNaN(i)&&i!==o&&(r.value=(0,a.CV)(function(e){const t=String(e),[n,a]=t.split("e-");let r=t;if(a){const[,t]=n.split("."),l=Number(a)+((null==t?void 0:t.length)||0);r=e.toFixed(l)}return r}(o),l),r.dispatchEvent(new Event("input")))},{capture:!0})}function ve(e){return V("blur",t=>{const n=t.value.replace(new RegExp(`^(\\D+)?${T(e)}`),`$10${e}`);n!==t.value&&(t.value=n,t.dispatchEvent(new Event("input")))},{capture:!0})}function he({max:e=Number.MAX_SAFE_INTEGER,min:t=Number.MIN_SAFE_INTEGER,precision:n=0,thousandSeparator:r="\xa0",decimalSeparator:l=".",decimalPseudoSeparators:i=ae(l,r),decimalZeroPadding:u=!1,prefix:d="",postfix:m=""}={}){const p=[c,o,s].filter(e=>e!==r&&e!==l);return Object.assign(Object.assign({},a.A_),{mask:te({decimalSeparator:l,precision:n,thousandSeparator:r,prefix:d,postfix:m,isNegativeAllowed:t<0}),preprocessors:[ce("\u2212",p),ce(l,i),se({decimalSeparator:l,precision:n}),oe({decimalSeparator:l,decimalZeroPadding:u,thousandSeparator:r}),me(n,l),ue(l)],postprocessors:[ie({decimalSeparator:l,min:t,max:e}),F(d),B(m),de({decimalSeparator:l,thousandSeparator:r,prefix:d,postfix:m}),le({decimalSeparator:l,decimalZeroPadding:u,precision:n,postfix:m})],plugins:[ge(l,r),ve(l),fe({min:t,max:e,decimalSeparator:l})],overwriteMode:u?({value:e,selection:[t]})=>t<=e.indexOf(l)?"shift":"replace":"shift"})}function Se(e){const t=G(e),n=new RegExp(`[^\\d${m.map(T).join("")}]+`);return({elementState:e,data:a},r)=>{if("deleteBackward"===r||"deleteForward"===r)return{elementState:e,data:a};const{value:l,selection:i}=e;if("validation"===r){const{validatedTimeString:e,updatedTimeSelection:n}=z({timeString:l,paddedMaxValues:t,offset:0,selection:i});return{elementState:{value:e,selection:n},data:a}}const o=a.replace(n,""),[s,c]=i;let u=c+o.length;const d=l.slice(0,s)+o+l.slice(u),{validatedTimeString:m,updatedTimeSelection:p}=z({timeString:d,paddedMaxValues:t,offset:0,selection:[s,u]});if(d&&!m)return{elementState:e,data:""};u=p[1];const g=m.slice(s,u);return{elementState:{selection:i,value:m.slice(0,s)+"0".repeat(g.length)+m.slice(u)},data:g}}}function xe({mode:e,timeSegmentMaxValues:t={}}){const n=Object.assign(Object.assign({},i),t);return Object.assign(Object.assign({},a.A_),{mask:Array.from(e).map(e=>m.includes(e)?e:/\d/),preprocessors:[({elementState:e},t)=>{const{value:n,selection:a}=e;if(!n||function(e,[t,n]){return n===e.length}(n,a))return{elementState:e};const[r,l]=a,i=n.slice(r,l).replace(/\d/g,"0"),o=n.slice(0,r)+i+n.slice(l);return"validation"===t||"insert"===t&&r===l?{elementState:{selection:a,value:o}}:{elementState:{selection:"deleteBackward"===t||"insert"===t?[r,r]:[l,l],value:o}}},Se(n)],overwriteMode:"replace"})}}}]);