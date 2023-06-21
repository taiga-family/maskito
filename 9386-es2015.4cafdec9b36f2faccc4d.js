"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[9386],{70997:function(e,t,n){n.d(t,{fV:function(){return r}});var s=n(74788),i=n(84800);let r=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[i.JF,i.mG,i.Lx,i.Lq,i.u4]}),e})()},52494:function(e,t,n){n.d(t,{U5:function(){return i}}),n(49510),n(47258);var s=n(74788);let i=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({}),e})();n(40635)},49510:function(e,t,n){n.d(t,{F:function(){return l}});var s=n(87862),i=n(76991),r=n(74788);let l=(()=>{class e{constructor(e){this.accessor=e,this.maskito=i.A_;const t=e.writeValue.bind(e);e.writeValue=e=>{t((0,i.CV)(String(null!=e?e:""),this.maskito))}}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(s.Fj))},e.\u0275dir=r.lG2({type:e,selectors:[["input","maskito",""],["textarea","maskito",""]],hostBindings:function(e,t){1&e&&r.NdJ("input",function(e){return t.accessor._handleInput(e.target.value)})("blur",function(){return t.accessor.onTouched()})("compositionstart",function(){return t.accessor._compositionStart()})("compositionend",function(e){return t.accessor._compositionEnd(e.target.value)})},inputs:{maskito:"maskito"},features:[r._Bn([s.Fj,{provide:s.JU,multi:!0,useExisting:s.Fj}])]}),e})()},47258:function(e,t,n){n.d(t,{r:function(){return l}});var s=n(64762),i=n(74788),r=n(76991);let l=(()=>{class e{constructor(e,t){this.ngZone=e,this.elementRef=t,this.maskedElement=null,this.maskito=r.A_,this.maskitoElement=r.gI}ngOnChanges(){var e;return(0,s.mG)(this,void 0,void 0,function*(){null===(e=this.maskedElement)||void 0===e||e.destroy();const t=this.maskitoElement,n=yield t(this.elementRef.nativeElement);this.maskitoElement===t&&this.ngZone.runOutsideAngular(()=>{this.maskedElement=new r.C8(n,this.maskito)})})}ngOnDestroy(){var e;null===(e=this.maskedElement)||void 0===e||e.destroy()}}return e.\u0275fac=function(t){return new(t||e)(i.Y36(i.R0b),i.Y36(i.SBq))},e.\u0275dir=i.lG2({type:e,selectors:[["","maskito",""]],inputs:{maskito:"maskito",maskitoElement:"maskitoElement"},features:[i.TTD]}),e})()},40635:function(e,t,n){n.d(t,{c:function(){return r}});var s=n(76991),i=n(74788);let r=(()=>{class e{transform(e,t){return(0,s.CV)(String(null!=e?e:""),t)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=i.Yjl({name:"maskito",type:e,pure:!0}),e})()},76991:function(e,t,n){n.d(t,{gI:function(){return s},A_:function(){return i},C8:function(){return E},CV:function(){return k}});const s=e=>e.querySelector("input,textarea")||e,i={mask:/^.*$/,preprocessors:[],postprocessors:[],plugins:[],overwriteMode:"shift"};function r(e){return"string"==typeof e}function l(e,t,n,s){let i="";for(let l=t.length;l<e.length;l++){const t=e[l],o=(null==s?void 0:s.value[l])===t;if(!r(t)||t===n&&!o)return i;i+=t}return i}function o(e,t){return Array.isArray(t)?e.length===t.length&&Array.from(e).every((e,n)=>{const s=t[n];return r(s)?e===s:e.match(s)}):t.test(e)}function a(e,t,n=null){if(o(e.value,t))return e;const{value:s,selection:i}=Array.isArray(t)?function(e,t,n){let s=null,i=null;const a=Array.from(e.value).reduce((o,a,u)=>{const c=o+l(t,o,a,n),h=t[c.length];return r(h)?c+h:a.match(h)?(null===s&&u>=e.selection[0]&&(s=c.length),null===i&&u>=e.selection[1]&&(i=c.length),c+a):c},""),u=l(t,a,"",n);return{value:o(a+u,t)?a+u:a,selection:[null!=s?s:a.length,null!=i?i:a.length]}}(e,t,n):function({value:e,selection:t},n){const[s,i]=t;let r=s,l=i;return{value:Array.from(e).reduce((e,t,o)=>{const a=e+t;return s===o&&(r=e.length),i===o&&(l=e.length),a.match(n)?a:e},""),selection:[r,l]}}(e,t);return{selection:i,value:Array.isArray(t)?s.slice(0,t.length):s}}function u(e,t){if(!Array.isArray(t))return e;const[n,s]=e.selection,i=[],l=Array.from(e.value).reduce((e,l,o)=>{const a=t[o];return o===n&&i.push(e.length),o===s&&i.push(e.length),r(a)&&a===l?e:e+l},"");return i.length<2&&i.push(...Array(2-i.length).fill(l.length)),{value:l,selection:[i[0],i[1]]}}class c{constructor(e,t){this.initialElementState=e,this.maskOptions=t,this.value="",this.selection=[0,0];const{value:n,selection:s}=a(e,this.getMaskExpression(e));this.value=n,this.selection=s}addCharacters([e,t],n){const{value:s}=this,i=this.getMaskExpression({value:s.slice(0,e)+n+s.slice(t),selection:[e+n.length,e+n.length]}),r={value:s,selection:[e,t]},l=u(r,i),[o,c]=function({value:e,selection:t},n,s){const[i,r]=t;return{value:e,selection:"replace"===("function"==typeof s?s({value:e,selection:t}):s)?[i,i+n.length]:[i,r]}}(l,n,this.maskOptions.overwriteMode).selection,h=l.value.slice(0,o)+n,d=h.length,p=a({value:h+l.value.slice(c),selection:[d,d]},i,r);if(s.slice(0,o)===a({value:h,selection:[d,d]},i,r).value||function(e,...t){return t.every(({value:t,selection:n})=>t===e.value&&n[0]===e.selection[0]&&n[1]===e.selection[1])}(this,p))throw new Error("Invalid mask value");this.value=p.value,this.selection=p.selection}deleteCharacters([e,t]){if(e===t||!t)return;const{value:n}=this,s=this.getMaskExpression({value:n.slice(0,e)+n.slice(t),selection:[e,e]}),i={value:n,selection:[e,t]},r=u(i,s),[l,o]=r.selection,c=a({value:r.value.slice(0,l)+r.value.slice(o),selection:[l,l]},s,i);this.value=c.value,this.selection=c.selection}getMaskExpression(e){const{mask:t}=this.maskOptions;return"function"==typeof t?t(e):t}}class h{constructor(e){this.element=e,this.listeners=[]}listen(e,t,n){const s=t;this.element.addEventListener(e,s,n),this.listeners.push(()=>this.element.removeEventListener(e,s))}destroy(){this.listeners.forEach(e=>e())}}function d(e,t,n){return e.ctrlKey===!!(1&t)&&e.altKey===!!(2&t)&&e.shiftKey===!!(4&t)&&e.metaKey===!!(8&t)&&e.keyCode===n}function p({value:e,selection:t},n){const[s,i]=t;if(s!==i)return[s,i];const r=n?e.slice(s).indexOf("\n")+1||e.length:e.slice(0,i).lastIndexOf("\n")+1;return[n?s:r,n?r:i]}function v({value:e,selection:t},n){const[s,i]=t;return s!==i?[s,i]:(n?[s,i+1]:[s-1,i]).map(t=>Math.min(Math.max(t,0),e.length))}const m=/\s+$/g,f=/^\s+/g,y=/\s/;function g({value:e,selection:t},n){const[s,i]=t;if(s!==i)return[s,i];if(n){const t=e.slice(s),[n]=t.match(f)||[""],i=t.replace(f,"").search(y);return[s,-1!==i?s+n.length+i:e.length]}const r=e.slice(0,i),[l]=r.match(m)||[""],o=r.replace(m,"").split("").reverse().findIndex(e=>e.match(y));return[-1!==o?i-l.length-o:0,i]}function w(e=[]){return(t,...n)=>e.reduce((e,t)=>Object.assign(Object.assign({},e),t(e,...n)),t)}function k(e,t){const n=Object.assign(Object.assign({},i),t),s=w(n.preprocessors),r=w(n.postprocessors),l="string"==typeof e?{value:e,selection:[0,0]}:e,{elementState:o}=s({elementState:l,data:""},"validation"),a=new c(o,n),{value:u,selection:h}=r(a,l);return"string"==typeof e?u:{value:u,selection:h}}class E extends class{constructor(){this.now=null,this.past=[],this.future=[]}undo(){const e=this.past.pop();e&&this.now&&(this.future.push(this.now),this.updateElement(e,"historyUndo"))}redo(){const e=this.future.pop();e&&this.now&&(this.past.push(this.now),this.updateElement(e,"historyRedo"))}updateHistory(e){if(!this.now)return void(this.now=e);const t=this.now.value!==e.value,n=this.now.selection.some((t,n)=>t!==e.selection[n]);!t&&!n||(t&&(this.past.push(this.now),this.future=[]),this.now=e)}updateElement(e,t){this.now=e,this.updateElementState(e,{inputType:t,data:null})}}{constructor(e,t){super(),this.element=e,this.maskitoOptions=t,this.isTextArea="TEXTAREA"===this.element.nodeName,this.eventListener=new h(this.element),this.options=Object.assign(Object.assign({},i),this.maskitoOptions),this.preprocessor=w(this.options.preprocessors),this.postprocessor=w(this.options.postprocessors),this.teardowns=this.options.plugins.map(e=>e(this.element,this.options)),this.ensureValueFitsMask(),this.updateHistory(this.elementState),this.eventListener.listen("keydown",e=>{return d(t=e,1,89)||d(t,5,90)||d(t,12,90)?(e.preventDefault(),this.redo()):function(e){return d(e,1,90)||d(e,8,90)}(e)?(e.preventDefault(),this.undo()):void 0;var t}),"onbeforeinput"in e?this.eventListener.listen("beforeinput",e=>{const t=e.inputType.includes("Forward");switch(this.updateHistory(this.elementState),e.inputType){case"historyUndo":return e.preventDefault(),this.undo();case"historyRedo":return e.preventDefault(),this.redo();case"deleteByCut":case"deleteContentBackward":case"deleteContentForward":return this.handleDelete({event:e,isForward:t,selection:v(this.elementState,t)});case"deleteWordForward":case"deleteWordBackward":return this.handleDelete({event:e,isForward:t,selection:g(this.elementState,t),force:!0});case"deleteSoftLineBackward":case"deleteSoftLineForward":case"deleteHardLineBackward":case"deleteHardLineForward":return this.handleDelete({event:e,isForward:t,selection:p(this.elementState,t),force:!0});case"insertLineBreak":return this.handleEnter(e);default:return this.handleInsert(e,e.data||"")}}):(this.eventListener.listen("keydown",e=>this.handleKeydown(e)),this.eventListener.listen("paste",e=>{var t;return this.handleInsert(e,(null===(t=e.clipboardData)||void 0===t?void 0:t.getData("text/plain"))||"")})),this.eventListener.listen("input",()=>{this.ensureValueFitsMask(),this.updateHistory(this.elementState)})}get elementState(){const{value:e,selectionStart:t,selectionEnd:n}=this.element;return{value:e,selection:[t||0,n||0]}}destroy(){this.eventListener.destroy(),this.teardowns.forEach(e=>null==e?void 0:e())}updateElementState({value:e,selection:t},n={inputType:"insertText",data:null}){const s=this.elementState.value;this.updateValue(e),this.updateSelectionRange(t),s!==e&&this.dispatchInputEvent(n)}updateSelectionRange([e,t]){var n,s;(this.element.selectionStart!==e||this.element.selectionEnd!==t)&&(null===(s=(n=this.element).setSelectionRange)||void 0===s||s.call(n,e,t))}updateValue(e){this.element.value=e}ensureValueFitsMask(){this.updateElementState(k(this.elementState,this.options))}dispatchInputEvent(e={inputType:"insertText",data:null}){const t="undefined"!=typeof window?window:globalThis;(null==t?void 0:t.InputEvent)&&this.element.dispatchEvent(new InputEvent("input",Object.assign(Object.assign({},e),{bubbles:!0,cancelable:!1})))}handleKeydown(e){const t=e.key,n="Delete"===t;switch(t){case"Backspace":case"Delete":return this.handleDelete({event:e,isForward:n,selection:v(this.elementState,n)});case"Enter":return this.handleEnter(e)}!function({key:e,ctrlKey:t,metaKey:n,altKey:s}){const i=t||n||s,r=/^.$/u.test(e);return!i&&"Backspace"!==e&&r}(e)||this.handleInsert(e,t)}handleDelete({event:e,selection:t,isForward:n,force:s=!1}){const i={value:this.elementState.value,selection:t},[r,l]=i.selection,{elementState:o}=this.preprocessor({elementState:i,data:""},n?"deleteForward":"deleteBackward"),a=new c(o,this.options),[u,h]=o.selection;a.deleteCharacters([u,h]);const d=this.postprocessor(a,i);if(i.value.slice(0,r)+i.value.slice(l)!==d.value||s)return e.preventDefault(),function(e,...t){return t.every(({value:t})=>t===e.value)}(i,o,a,d)?this.updateSelectionRange(n?[h,h]:[u,u]):(this.updateElementState(d,{inputType:"inputType"in e?e.inputType:n?"deleteContentForward":"deleteContentBackward",data:null}),void this.updateHistory(d))}handleInsert(e,t){const n=this.elementState,{elementState:s,data:i=t}=this.preprocessor({data:t,elementState:n},"insert"),r=new c(s,this.options);try{r.addCharacters(s.selection,i)}catch(h){return e.preventDefault()}const[l,o]=s.selection,a=s.value.slice(0,l)+t+s.value.slice(o),u=this.postprocessor(r,n);a!==u.value&&(e.preventDefault(),this.updateElementState(u,{data:t,inputType:"inputType"in e?e.inputType:"insertText"}),this.updateHistory(u))}handleEnter(e){this.isTextArea&&this.handleInsert(e,"\n")}}}}]);