"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[2136],{2136:(he,Z,P)=>{P.d(Z,{tr:()=>z,n9:()=>J,f8:()=>ce,rC:()=>de});var v=P(3533);const L=new Date("0001-01-01"),C=new Date("9999-12-31"),U=["-","\u2013","\u2014","\u2212"];function M(e,n,t){const s=Math.min(Number(t),Math.max(Number(n),Number(e)));return e instanceof Date?new Date(s):s}function T(e,{day:n,month:t,year:s}={}){const r=new Date(e);return n&&r.setDate(r.getDate()+n),t&&r.setMonth(r.getMonth()+t),s&&r.setFullYear(r.getFullYear()+s),r}function j(e){return{day:String(e.getDate()).padStart(2,"0"),month:String(e.getMonth()+1).padStart(2,"0"),year:String(e.getFullYear()).padStart(4,"0")}}function k(e,n){return!(e.length<n.length)&&e.split(/\D/).every(t=>!t.match(/^0+$/))}function $(e){return e.reduce((n,[t,s])=>Object.assign(Object.assign({},n),{[t]:s}),{})}function R(e,n){const t=n.replace(/[^dmy]/g,""),s=e.replace(/\D+/g,""),r=t.indexOf("d"),o=t.indexOf("m"),i=t.indexOf("y"),l={day:s.slice(r,r+2),month:s.slice(o,o+2),year:s.slice(i,t.lastIndexOf("y")+1)};return $(Object.entries(l).filter(([c,u])=>Boolean(u)).sort(([c],[u])=>n.toLowerCase().indexOf(c[0])>n.toLowerCase().indexOf(u[0])?1:-1))}function x(e){var n,t,s;const r=2===(null===(n=e.year)||void 0===n?void 0:n.length)?`20${e.year}`:e.year;return new Date(Number(null!=r?r:"0"),Number(null!==(t=e.month)&&void 0!==t?t:"1")-1,Number(null!==(s=e.day)&&void 0!==s?s:"1"))}function E({day:e,month:n,year:t},s){var r;const o=2===(null===(r=s.match(/y/g))||void 0===r?void 0:r.length)?null==t?void 0:t.slice(-2):t;return s.replace(/d+/g,null!=e?e:"").replace(/m+/g,null!=n?n:"").replace(/y+/g,null!=o?o:"").replace(/^\D+/g,"").replace(/\D+$/g,"")}function A(e,n,t=0){return Number(e.padEnd(n.length,"0"))<=Number(n)?{validatedSegmentValue:e,prefixedZeroesCount:t}:e.endsWith("0")?A(`0${e.slice(0,n.length-1)}`,n,t+1):A(`${e.slice(0,n.length-1)}0`,n,t)}const W=e=>{var n,t,s;return{day:(null===(n=e.match("/d/g"))||void 0===n?void 0:n.length)||2,month:(null===(t=e.match("/m/g"))||void 0===t?void 0:t.length)||2,year:(null===(s=e.match("/y/g"))||void 0===s?void 0:s.length)||4}},B={day:31,month:12,year:9999};function Y({dateString:e,dateModeTemplate:n,offset:t,selection:[s,r]}){const o=R(e,n),i=Object.entries(o),l={};for(const[c,u]of i){const g=E(l,n),f=B[c],a=t+g.length+(g.length&&1)+W(e)[c];if(a>=s&&a<=r&&Number(u)>Number(f))return{validatedDateString:"",updatedSelection:[s,r]};const{validatedSegmentValue:p,prefixedZeroesCount:D}=A(u,`${f}`);r+=D,l[c]=p}return{validatedDateString:E(l,n),updatedSelection:[s,r]}}function S(e){return!e||"object"==typeof e&&0===Object.keys(e).length}function N(e,n){return e.match(new RegExp(`.{1,${n}}`,"g"))||[]}function I({dateModeTemplate:e,min:n=L,max:t=C,datesSeparator:s=""}){return({value:r,selection:o})=>{const i=s&&r.endsWith(s),l=N(r.replace(s,""),e.length);let c="";for(const u of l)c+=c?s:"",k(u,e)?c+=E(j(M(x(R(u,e)),n,t)),e):c+=u;return{selection:o,value:c+(i?s:"")}}}function H({dateModeTemplate:e,dateSegmentsSeparator:n,datesSeparator:t=""}){return({elementState:s,data:r})=>{const{value:o,selection:i}=s;if(r===n&&o.length===i[0])return{elementState:s,data:r};if(U.includes(r))return{elementState:s,data:t};const l=r.replace(/\D+/g,"");if(!l)return{elementState:s,data:""};const[c,u]=i;let g=u+r.length;const f=o.slice(0,c)+l+o.slice(g),d=N(f.replace(t,""),e.length);let a="";const m=Boolean(t)&&f.includes(t);for(const D of d){const{validatedDateString:h,updatedSelection:b}=Y({dateString:D,dateModeTemplate:e,offset:a?a.length+t.length:0,selection:[c,g]});if(D&&!h)return{elementState:s,data:""};g=b[1]+h.length-D.length,a+=m&&a?t+h:h}const p=a.slice(c,g);return{elementState:{selection:i,value:a.slice(0,c)+p.split(n).map(D=>"0".repeat(D.length)).join(n)+a.slice(g)},data:p.replace(new RegExp(`\\${n}`,"g"),"")}}}function z({mode:e,separator:n=".",max:t,min:s}){const r=e.split("/").join(n);return{mask:Array.from(r).map(o=>o===n?o:/\d/),overwriteMode:"replace",preprocessor:(0,v.Zu)(({elementState:e},n)=>{const{value:t,selection:s}=e;if(!t||function(e,[n,t]){return t===e.length}(t,s))return{elementState:e};const[r,o]=s,i=t.slice(r,o).replace(/\d/g,"0"),l=t.slice(0,r)+i+t.slice(o);return"validation"===n||"insert"===n&&r===o?{elementState:{selection:s,value:l}}:{elementState:{selection:"deleteBackward"===n||"insert"===n?[r,r]:[o,o],value:l}}},H({dateModeTemplate:r,dateSegmentsSeparator:n})),postprocessor:I({min:s,max:t,dateModeTemplate:r})}}function K({dateModeTemplate:e,datesSeparator:n,minLength:t,maxLength:s,max:r=C}){return S(t)&&S(s)?o=>o:({value:o,selection:i})=>{const l=N(o.replace(n,""),e.length);if(2!==l.length||l.some(m=>!k(m,e)))return{value:o,selection:i};const[c,u]=l.map(m=>x(R(m,e))),g=T(c,Object.assign(Object.assign({},t),{day:(null==t?void 0:t.day)&&t.day-1})),f=S(s)?r:T(c,Object.assign(Object.assign({},s),{day:(null==s?void 0:s.day)&&s.day-1})),d=M(u,g,r);return{selection:i,value:l[0]+n+E(j(d>f?f:d),e)}}}const _="\xa0\u2013\xa0";function J({mode:e,separator:n=".",min:t,max:s,minLength:r,maxLength:o}){const i=e.split("/").join(n),l=Array.from(i).map(c=>c===n?c:/\d/);return{mask:[...l,..._,...l],overwriteMode:"replace",preprocessor:(0,v.Zu)(({elementState:e},n)=>{const{value:t,selection:s}=e;if(!t||function(e,[n,t]){return t===e.length}(t,s))return{elementState:e};const[r,o]=s,i=t.slice(r,o).replace(/\d/g,"0"),l=t.slice(0,r)+i+t.slice(o);return"validation"===n||"insert"===n&&r===o?{elementState:{selection:s,value:l}}:{elementState:{selection:"deleteBackward"===n||"insert"===n?[r,r]:[o,o],value:l}}},H({dateModeTemplate:i,dateSegmentsSeparator:n,datesSeparator:_})),postprocessor:(0,v.Zu)(I({min:t,max:s,dateModeTemplate:i,datesSeparator:_}),K({dateModeTemplate:i,minLength:r,maxLength:o,max:s,datesSeparator:_}))}}function Q(e,n){const t=new RegExp(`[${n.join("")}]`,"gi");return({elementState:s,data:r})=>{const{value:o,selection:i}=s;return{elementState:{selection:i,value:o.replace(t,e)},data:r.replace(t,e)}}}function q({decimalSeparator:e,precision:n}){return({elementState:t,data:s})=>{const{value:r,selection:o}=t,[i]=o;return n<=0||r.includes(e)||!s.startsWith(e)?{elementState:t,data:s}:{elementState:t,data:r.slice(0,i)?s:`0${s}`}}}function ee({decimalSeparator:e,thousandSeparator:n,decimalZeroPadding:t}){return({elementState:s,data:r},o)=>{const{value:i,selection:l}=s,[c,u]=l,g=i.slice(c,u);return"deleteBackward"!==o&&"deleteForward"!==o||!(t?[e,n]:[n]).includes(g)?{elementState:s,data:r}:{elementState:{value:i,selection:"deleteForward"===o?[u,u]:[c,c]},data:r}}}function te(e){return({value:n,selection:t})=>{const[s,r]=t,o=n.includes(e),[i,l=""]=n.split(e),c=i.replace(/^0+/,"0"),u=c.length>1&&c.startsWith("0")?c.slice(1):c,g=i.length-u.length;return{value:u+(o?e:"")+l,selection:[Math.max(s-g,0),Math.max(r-g,0)]}}}function ne({max:e,thousandSeparator:n,decimalSeparator:t}){return({value:s,selection:r})=>{if(Number(s.replace(new RegExp(n,"g"),"").replace(t,"."))>e){const i=`${e}`.replace(".",t);return{value:i,selection:[i.length,i.length]}}return{value:s,selection:r}}}function se({thousandSeparator:e,decimalSeparator:n}){return({value:t,selection:s})=>{const[r,o=""]=t.split(n),[i,l]=s;let[c,u]=s;const g=Array.from(r.replace(/^-/,"")).reduceRight((f,d,a)=>{const m=f.length&&(f.length+1)%4==0;return d===e&&m?d+f:d!==e||m?m?(a<=i&&c++,a<=l&&u++,d+e+f):d+f:(a<=i&&c--,a<=l&&u--,f)},"");return{value:(t.startsWith("-")?"-":"")+g+(t.includes(n)?n:"")+o,selection:[c,u]}}}function re({decimalSeparator:e,precision:n,decimalZeroPadding:t}){return n<=0||!t?s=>s:({value:s,selection:r})=>{const[o,i=""]=s.split(e);return s.includes(e)||o?{value:o+e+i.padEnd(n,"0"),selection:r}:{value:s,selection:r}}}function oe({decimalSeparator:e,thousandSeparator:n}){return","===e||"."===e?[".",",","\u0431","\u044e"].filter(t=>t!==n&&t!==e):[]}function ie({decimalSeparator:e,isNegativeAllowed:n,precision:t,thousandSeparator:s}){const o=n?"-?":"",i=`[\\d\\${s}]*`;return t>0?new RegExp(`^${o}${i}(\\${e}\\d{0,${t}})?$`):new RegExp(`^${o}${i}$`)}function ce({max:e=Number.MAX_SAFE_INTEGER,isNegativeAllowed:n=!0,precision:t=0,thousandSeparator:s="\xa0",decimalSeparator:r=",",decimalPseudoSeparators:o=oe({decimalSeparator:r,thousandSeparator:s}),decimalZeroPadding:i=!1}={}){return{mask:ie({decimalSeparator:r,precision:t,thousandSeparator:s,isNegativeAllowed:n}),preprocessor:(0,v.Zu)(Q(r,o),q({decimalSeparator:r,precision:t}),ee({decimalSeparator:r,decimalZeroPadding:i,thousandSeparator:s})),postprocessor:(0,v.Zu)(te(r),ne({decimalSeparator:r,max:e,thousandSeparator:s}),se({decimalSeparator:r,thousandSeparator:s}),re({decimalSeparator:r,decimalZeroPadding:i,precision:t})),overwriteMode:i?({value:l,selection:[c]})=>c<=l.indexOf(r)?"shift":"replace":"shift"}}const le={hours:23,minutes:59,seconds:59,milliseconds:999},ue=[":","."],F={hours:2,minutes:2,seconds:2,milliseconds:3};function V({hours:e="",minutes:n="",seconds:t="",milliseconds:s=""}){return`${e}${n&&`:${n}`}${t&&`:${t}`}${s&&`.${s}`}`}function fe(e){const n=function(e){return $(Object.entries(e).map(([n,t])=>[n,`${t}`.padEnd(F[n],"0")]))}(e);return({elementState:t,data:s})=>{const r=s.replace(/\D+/g,"");if(!r)return{elementState:t,data:""};const{value:o,selection:i}=t,[l,c]=i;let u=c+r.length;const g=o.slice(0,l)+r+o.slice(u),f=Object.entries(function(e){const n=e.replace(/\D+/g,""),t={hours:n.slice(0,2),minutes:n.slice(2,4),seconds:n.slice(4,6),milliseconds:n.slice(6,9)};return $(Object.entries(t).filter(([s,r])=>Boolean(r)))}(g)),d={};for(const[p,D]of f){const h=V(d),b=n[p],G=h.length+(h.length&&1)+F[p];if(G>=l&&G<=u&&Number(D)>Number(b))return{elementState:t,data:""};const{validatedSegmentValue:De,prefixedZeroesCount:pe}=A(D,b);u+=pe,d[p]=De}const a=V(d);u=a.length-o.slice(u).length;const m=a.slice(l,u);return{elementState:{selection:i,value:a.slice(0,l)+"0".repeat(m.length)+a.slice(u)},data:m}}}function de({mode:e,timeSegmentMaxValues:n={}}){const t=Object.assign(Object.assign({},le),n);return{mask:Array.from(e).map(s=>ue.includes(s)?s:/\d/),preprocessor:(0,v.Zu)(({elementState:e},n)=>{const{value:t,selection:s}=e;if(!t||function(e,[n,t]){return t===e.length}(t,s))return{elementState:e};const[r,o]=s,i=t.slice(r,o).replace(/\d/g,"0"),l=t.slice(0,r)+i+t.slice(o);return"validation"===n||"insert"===n&&r===o?{elementState:{selection:s,value:l}}:{elementState:{selection:"deleteBackward"===n||"insert"===n?[r,r]:[o,o],value:l}}},fe(t)),overwriteMode:"replace"}}}}]);