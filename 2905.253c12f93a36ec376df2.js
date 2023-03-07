"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[2905],{2905:(C,k,m)=>{m.d(k,{U:()=>g}),m(7258);var v=m(4788);let g=(()=>{class d{}return d.\u0275fac=function(h){return new(h||d)},d.\u0275mod=v.oAB({type:d}),d.\u0275inj=v.cJS({}),d})()},7258:(C,k,m)=>{m.d(k,{r:()=>g});var f=m(4788),v=m(3827);let g=(()=>{class d{constructor(h){this.elementRef=h,this.maskedElement=null,this.maskito=v.A_,this.maskitoElement=w=>w.querySelector("input,textarea")||w}ngOnChanges(){var h;null===(h=this.maskedElement)||void 0===h||h.destroy(),this.maskedElement=new v.C8(this.maskitoElement(this.elementRef.nativeElement),this.maskito)}ngOnDestroy(){var h;null===(h=this.maskedElement)||void 0===h||h.destroy()}}return d.\u0275fac=function(h){return new(h||d)(f.Y36(f.SBq))},d.\u0275dir=f.lG2({type:d,selectors:[["","maskito",""]],inputs:{maskito:"maskito",maskitoElement:"maskitoElement"},features:[f.TTD]}),d})()},3827:(C,k,m)=>{m.d(k,{A_:()=>b,C8:()=>R,Zu:()=>A});class f{constructor(e){this.element=e,this.listeners=[]}listen(e,n,t){const s=n;this.element.addEventListener(e,s,t),this.listeners.push(()=>this.element.removeEventListener(e,s))}destroy(){this.listeners.forEach(e=>e())}}function h({value:i,selection:e},n){const[t,s]=e;return t!==s?[t,s]:n?[t,Math.min(s+1,i.length)]:[Math.max(t-1,0),s]}function w(i){return i}function A(...i){return(e,...n)=>i.reduce((t,s)=>Object.assign(Object.assign({},t),s(t,...n)),e)}function M(i){return"string"==typeof i}function T(i,e,n=i){if(function(i,e){return Array.isArray(e)?i.length<=e.length&&Array.from(i).every((n,t)=>{const s=e[t];return M(s)?n===s:n.match(s)}):e.test(i)}(i.value,e))return i;const{value:t,selection:s}=Array.isArray(e)?function(i,e,n){let t=null,s=null;const l=Array.from(i.value).reduce((o,a,u)=>{const r=o+function(i,e,n,t){let s="";for(let l=e.length;l<i.length;l++){const o=i[l],a=t.value[l]===o;if(!M(o)||o===n&&!a)return s;s+=o}return s}(e,o,a,n),p=e[r.length];return M(p)?r+p:a.match(p)?(null===t&&u>=i.selection[0]&&(t=r.length),null===s&&u>=i.selection[1]&&(s=r.length),r+a):r},"");return{value:l,selection:[null!=t?t:l.length,null!=s?s:l.length]}}(i,e,n):function({value:i,selection:e},n){const[t,s]=e;let l=t,o=s;return{value:Array.from(i).reduce((u,c,r)=>{const p=u+c;return t===r&&(l=u.length),s===r&&(o=u.length),p.match(n)?p:u},""),selection:[l,o]}}(i,e);return{selection:s,value:Array.isArray(e)?t.slice(0,e.length):t}}function D(i,e){if(!Array.isArray(e))return i;const[n,t]=i.selection,s=[],l=Array.from(i.value).reduce((o,a,u)=>{const c=e[u];return u===n&&s.push(o.length),u===t&&s.push(o.length),M(c)&&c===a?o:o+a},"");return s.length<2&&s.push(...Array(2-s.length).fill(l.length)),{value:l,selection:[s[0],s[1]]}}class S{constructor(e,n){this.initialElementState=e,this.maskOptions=n,this.value="",this.selection=[0,0];const{value:t,selection:s}=T(e,this.getMaskExpression(e));this.value=t,this.selection=s}addCharacters([e,n],t){const{value:s}=this,l=this.getMaskExpression({value:s.slice(0,e)+t+s.slice(n),selection:[e+t.length,e+t.length]}),o={value:s,selection:[e,n]},a=D(o,l),[u,c]=function({value:i,selection:e},n,t){const[s,l]=e;return{value:i,selection:"replace"===("function"==typeof t?t({value:i,selection:e}):t)?[s,s+n.length]:[s,l]}}(a,t,this.maskOptions.overwriteMode).selection,r=a.value.slice(0,u)+t+a.value.slice(c),p=u+t.length,y=T({value:r,selection:[p,p]},l,o);if(function(i,...e){return e.every(({value:n,selection:t})=>n===i.value&&t[0]===i.selection[0]&&t[1]===i.selection[1])}(this,y))throw new Error("Invalid mask value");this.value=y.value,this.selection=y.selection}deleteCharacters([e,n]){if(e===n||!n)return;const{value:t}=this,s=this.getMaskExpression({value:t.slice(0,e)+t.slice(n),selection:[e,e]}),l={value:t,selection:[e,n]},o=D(l,s),[a,u]=o.selection,r=T({value:o.value.slice(0,a)+o.value.slice(u),selection:[a,a]},s,l);this.value=r.value,this.selection=r.selection}getMaskExpression(e){const{mask:n}=this.maskOptions;return"function"==typeof n?n(e):n}}const b={mask:/^.*$/,preprocessor:w,postprocessor:w,overwriteMode:"shift"};class R extends class{constructor(){this.now=null,this.past=[],this.future=[]}undo(){const e=this.past.pop();e&&this.now&&(this.future.push(this.now),this.updateElement(e,"historyUndo"))}redo(){const e=this.future.pop();e&&this.now&&(this.past.push(this.now),this.updateElement(e,"historyRedo"))}updateHistory(e){if(!this.now)return void(this.now=e);const n=this.now.value!==e.value,t=this.now.selection.some((s,l)=>s!==e.selection[l]);!n&&!t||(n&&(this.past.push(this.now),this.future=[]),this.now=e)}updateElement(e,n){this.now=e,this.updateValue(e.value,{inputType:n,data:null}),this.updateSelectionRange(e.selection)}}{constructor(e,n){super(),this.element=e,this.maskitoOptions=n,this.eventListener=new f(this.element),this.options=Object.assign(Object.assign({},b),this.maskitoOptions),this.conformValueToMask(),this.updateHistory(this.elementState),this.eventListener.listen("keydown",t=>{const{ctrlKey:s,key:l,metaKey:o,shiftKey:a}=t;return o&&a&&"z"===l||s&&"y"===l?(t.preventDefault(),this.redo()):(s||o)&&"z"===l?(t.preventDefault(),this.undo()):void 0}),"onbeforeinput"in e?this.eventListener.listen("beforeinput",t=>{switch(this.updateHistory(this.elementState),t.inputType){case"historyUndo":return t.preventDefault(),this.undo();case"historyRedo":return t.preventDefault(),this.redo();case"deleteContentBackward":case"deleteWordBackward":case"deleteByCut":return this.handleDelete(t,!1);case"deleteContentForward":case"deleteWordForward":return this.handleDelete(t,!0);case"insertFromDrop":return;case"insertLineBreak":return this.handleEnter(t);case"insertFromPaste":case"insertText":default:return this.handleInsert(t,t.data||"")}}):(this.eventListener.listen("keydown",t=>this.handleKeydown(t)),this.eventListener.listen("paste",t=>{var s;return this.handleInsert(t,(null===(s=t.clipboardData)||void 0===s?void 0:s.getData("text/plain"))||"")})),this.eventListener.listen("input",()=>{this.conformValueToMask(),this.updateHistory(this.elementState)})}get elementState(){const{value:e,selectionStart:n,selectionEnd:t}=this.element;return{value:e,selection:[n||0,t||0]}}get isTextArea(){return"TEXTAREA"===this.element.nodeName}destroy(){this.eventListener.destroy()}updateSelectionRange([e,n]){var t,s;(this.element.selectionStart!==e||this.element.selectionEnd!==n)&&(null===(s=(t=this.element).setSelectionRange)||void 0===s||s.call(t,e,n))}updateValue(e,n={inputType:"insertText",data:null}){if(this.element.value!==e){const t="undefined"!=typeof window?window:globalThis;this.element.value=e,(null==t?void 0:t.InputEvent)&&this.element.dispatchEvent(new InputEvent("input",Object.assign(Object.assign({},n),{bubbles:!0,cancelable:!0})))}}handleKeydown(e){const n=e.key;switch(n){case"Backspace":case"Delete":return this.handleDelete(e,"Delete"===n);case"Enter":return this.handleEnter(e)}!function({key:i,ctrlKey:e,metaKey:n,altKey:t}){const s=e||n||t,l=/^.$/u.test(i);return!s&&"Backspace"!==i&&l}(e)||this.handleInsert(e,n)}conformValueToMask(){const{value:e,selection:n}=function(i,e){const n=Object.assign(Object.assign({},b),e),t="string"==typeof i?{value:i,selection:[0,0]}:i,{elementState:s}=n.preprocessor({elementState:t,data:""},"validation"),l=new S(s,n),{value:o,selection:a}=n.postprocessor(l,t);return"string"==typeof i?o:{value:o,selection:a}}(this.elementState,this.options);this.updateValue(e),this.updateSelectionRange(n)}handleDelete(e,n){const t={value:this.elementState.value,selection:h(this.elementState,n)},[s,l]=t.selection,{elementState:o}=this.options.preprocessor({elementState:t,data:""},n?"deleteForward":"deleteBackward"),a=new S(o,this.options),[u,c]=o.selection;a.deleteCharacters([u,c]);const r=this.options.postprocessor(a,t);if(t.value.slice(0,s)+t.value.slice(l)!==r.value)return e.preventDefault(),function(i,...e){return e.every(({value:n})=>n===i.value)}(t,o,a,r)?this.updateSelectionRange(n?[c,c]:[u,u]):(this.updateValue(r.value,{inputType:"inputType"in e?e.inputType:n?"deleteContentForward":"deleteContentBackward",data:null}),this.updateSelectionRange(r.selection),void this.updateHistory(r))}handleInsert(e,n){const t=this.elementState,{elementState:s,data:l=n}=this.options.preprocessor({data:n,elementState:t},"insert"),o=new S(s,this.options);try{o.addCharacters(s.selection,l)}catch(y){return e.preventDefault()}const[a,u]=s.selection,c=s.value.slice(0,a)+n+s.value.slice(u),{value:r,selection:p}=this.options.postprocessor(o,t);c!==r&&(e.preventDefault(),this.updateValue(r,{data:n,inputType:"inputType"in e?e.inputType:"insertText"}),this.updateSelectionRange(p),this.updateHistory({value:r,selection:p}))}handleEnter(e){this.isTextArea&&this.handleInsert(e,"\n")}}}}]);