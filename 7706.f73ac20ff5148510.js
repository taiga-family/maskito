"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[7706],{7706:(le,N,r)=>{r.r(N),r.d(N,{default:()=>me});var m=r(8832),g=r(1760),_=r(8844),l=r(7922),x=r(6614),b=r(7355),M=r(9738),p=r(6801);const C=(0,l.TK)({precision:8,min:0});var e=r(2978),F=r(5014);let P=(()=>{var t;class i{constructor(){this.value="",this.maskitoOptions=C}}return(t=i).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["number-mask-doc-example-1"]],standalone:!0,features:[e.aNF],decls:5,vars:4,consts:[[3,"ngModel","ngModelChange"],["inputmode","decimal","placeholder","3,141...","tuiTextfieldLegacy","",3,"maskito"]],template:function(a,n){1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(u){return n.value=u}),e.j41(1,"strong"),e.EFF(2,"\u03c0"),e.k0s(),e.EFF(3," -value "),e.nrm(4,"input",1),e.k0s()),2&a&&(e.xc7("max-width",30,"rem"),e.Y8G("ngModel",n.value),e.R7$(4),e.Y8G("maskito",n.maskitoOptions))},dependencies:[m.YN,m.BC,m.vS,_.u,p.zi,p.mp,p.Ws,F.Bw],encapsulation:2,changeDetection:0}),i})();const D=(0,l.TK)({decimalSeparator:",",thousandSeparator:".",precision:2});let j=(()=>{var t;class i{constructor(){this.maskitoOptions=D,this.value=""}}return(t=i).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["number-mask-doc-example-2"]],standalone:!0,features:[e.aNF],decls:3,vars:4,consts:[[3,"ngModel","ngModelChange"],["inputmode","decimal","placeholder","1.000,42","tuiTextfieldLegacy","",3,"maskito"]],template:function(a,n){1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(u){return n.value=u}),e.EFF(1," Type number like a German "),e.nrm(2,"input",1),e.k0s()),2&a&&(e.xc7("max-width",30,"rem"),e.Y8G("ngModel",n.value),e.R7$(2),e.Y8G("maskito",n.maskitoOptions))},dependencies:[m.YN,m.BC,m.vS,_.u,p.zi,p.mp,p.Ws,F.Bw],encapsulation:2,changeDetection:0}),i})();var f=r(4225),V=r(1860);const E="%",{plugins:T,...v}=(0,l.TK)({postfix:E,min:0,max:100,precision:2}),G={...v,plugins:[...T,(0,l.N_)(t=>[0,t.length-1]),(0,l.hK)("blur",t=>{t.value===E&&(0,V.Gq)(t,"0".concat(E))})]};let S=(()=>{var t;class i{constructor(){this.value="97".concat(E),this.maskitoOptions=G}}return(t=i).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["number-mask-doc-example-3"]],standalone:!0,features:[e.aNF],decls:2,vars:5,consts:[[3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(a,n){1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(u){return n.value=u}),e.nrm(1,"input",1),e.k0s()),2&a&&(e.xc7("max-width",30,"rem"),e.Y8G("tuiTextfieldLabelOutside",!0)("ngModel",n.value),e.R7$(1),e.Y8G("maskito",n.maskitoOptions))},dependencies:[m.YN,m.BC,m.vS,_.u,p.zi,p.mp,p.Ws,F.Bw,f.CN,f.kf],encapsulation:2,changeDetection:0}),i})();const O=(0,l.TK)({decimalZeroPadding:!0,precision:2,decimalSeparator:".",min:0,prefix:"$"});let B=(()=>{var t;class i{constructor(){this.value="$100.00",this.maskitoOptions=O}}return(t=i).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["number-mask-doc-example-4"]],standalone:!0,features:[e.aNF],decls:3,vars:4,consts:[[3,"ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(a,n){1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(u){return n.value=u}),e.EFF(1," Cost "),e.nrm(2,"input",1),e.k0s()),2&a&&(e.xc7("max-width",30,"rem"),e.Y8G("ngModel",n.value),e.R7$(2),e.Y8G("maskito",n.maskitoOptions))},dependencies:[m.YN,m.BC,m.vS,_.u,p.zi,p.mp,p.Ws,F.Bw],encapsulation:2,changeDetection:0}),i})();const Y=(0,l.TK)({minusSign:"-",thousandSeparator:""});let R=(()=>{var t;class i{constructor(){this.value="-42",this.options=Y}}return(t=i).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["number-mask-doc-example-5"]],standalone:!0,features:[e.aNF],decls:2,vars:5,consts:[[3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["tuiTextfieldLegacy","",3,"maskito"]],template:function(a,n){1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(u){return n.value=u}),e.nrm(1,"input",1),e.k0s()),2&a&&(e.xc7("max-width",30,"rem"),e.Y8G("tuiTextfieldLabelOutside",!0)("ngModel",n.value),e.R7$(1),e.Y8G("maskito",n.options))},dependencies:[m.YN,m.BC,m.vS,_.u,p.zi,p.mp,p.Ws,F.Bw,f.CN,f.kf],encapsulation:2,changeDetection:0}),i})();var k,I=r(7270),X=r(4314),$=r(5639);class y{constructor(){this.value="42",this.decimalZeroPadding=this.value.includes(".")}getMaskOptions(i){return function Z(t){return(0,l.TK)({decimalZeroPadding:t,precision:2,decimalSeparator:".",min:0})}(i)}handleBeforeInput(i){const{inputType:o,target:a,data:n}=i;if(o.includes("delete")){var s,u;const d=a,[c,pe]=this.getNotEmptySelection([null!==(s=d.selectionStart)&&void 0!==s?s:0,null!==(u=d.selectionEnd)&&void 0!==u?u:0],o.includes("Forward")),ue=this.value.slice(c,pe).includes(".");this.decimalZeroPadding=this.decimalZeroPadding&&!ue}else this.decimalZeroPadding=[".",",","\u0431","\u044e"].some(d=>(null==n?void 0:n.includes(d))||this.value.includes(d))}getNotEmptySelection([i,o],a){return i!==o?[i,o]:a?[i,o+1]:[Math.max(i-1,0),o]}}(k=y).\u0275fac=function(i){return new(i||k)},k.\u0275cmp=e.VBU({type:k,selectors:[["number-mask-doc-example-6"]],standalone:!0,features:[e.aNF],decls:4,vars:5,consts:[["tuiLabel",""],[3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito","beforeinput.capture"]],template:function(i,o){1&i&&(e.j41(0,"label",0),e.EFF(1," Enable decimal zero padding by typing dot "),e.j41(2,"tui-input",1),e.bIt("ngModelChange",function(n){return o.value=n}),e.j41(3,"input",2),e.bIt("beforeinput.capture",function(n){return o.handleBeforeInput(n)}),e.k0s()()()),2&i&&(e.R7$(2),e.xc7("max-width",30,"rem"),e.Y8G("tuiTextfieldLabelOutside",!0)("ngModel",o.value),e.R7$(1),e.Y8G("maskito",o.getMaskOptions(o.decimalZeroPadding)))},dependencies:[m.YN,m.BC,m.vS,_.u,p.zi,p.mp,p.Ws,F.Bw,$.z,f.CN,f.kf],encapsulation:2,changeDetection:0}),(0,I.Cg)([X.PE],y.prototype,"getMaskOptions",null);var h=r(9239);function z(t,i){1&t&&(e.EFF(0," Use "),e.j41(1,"code"),e.EFF(2,"precision"),e.k0s(),e.EFF(3," parameter to configure the number of digits after decimal separator. "))}function L(t,i){1&t&&(e.EFF(0," Use "),e.j41(1,"code"),e.EFF(2,"decimalSeparator"),e.k0s(),e.EFF(3," and "),e.j41(4,"code"),e.EFF(5,"thousandSeparator"),e.k0s(),e.EFF(6," to get mask with locale specific representation of numbers. "))}function U(t,i){1&t&&(e.j41(0,"div"),e.EFF(1," Use "),e.j41(2,"code"),e.EFF(3,"postfix"),e.k0s(),e.EFF(4," parameter to set non-removable text after the number. "),e.k0s(),e.j41(5,"div"),e.EFF(6," Additionally you can use "),e.j41(7,"code"),e.EFF(8,"maskitoCaretGuard"),e.k0s(),e.EFF(9," to clamp caret inside allowable range. "),e.k0s(),e.j41(10,"div",17),e.EFF(11," This example also shows how to restrict the greatest permitted value via "),e.j41(12,"code"),e.EFF(13,"max"),e.k0s(),e.EFF(14," parameter. "),e.k0s())}function A(t,i){1&t&&(e.j41(0,"p",18),e.EFF(1," Set "),e.j41(2,"code"),e.EFF(3,"decimalZeroPadding: true"),e.k0s(),e.EFF(4," to always show trailing zeroes. "),e.k0s(),e.j41(5,"p"),e.EFF(6," Non removable dollar sign is achieved by using "),e.j41(7,"code"),e.EFF(8,"prefix"),e.k0s(),e.EFF(9," parameter. "),e.k0s())}function K(t,i){1&t&&(e.j41(0,"p"),e.EFF(1," Use "),e.j41(2,"code"),e.EFF(3,"minusSign"),e.k0s(),e.EFF(4," parameter to configure the character which indicates that a number is negative. "),e.k0s(),e.j41(5,"p"),e.EFF(6," In this example "),e.j41(7,"a",19),e.EFF(8," hyphen "),e.k0s(),e.EFF(9," is used as "),e.j41(10,"code"),e.EFF(11,"minusSign"),e.k0s()())}function W(t,i){1&t&&(e.j41(0,"div"),e.EFF(1,"You can change options on the fly to build complex logic."),e.k0s(),e.j41(2,"div"),e.EFF(3," This example shows how to initially disable "),e.j41(4,"code"),e.EFF(5,"decimalZeroPadding"),e.k0s(),e.EFF(6," and enable it only after user inserts decimal separator. "),e.k0s())}function w(t,i){if(1&t&&(e.EFF(0," Use "),e.j41(1,"code"),e.EFF(2,"maskitoNumberOptionsGenerator"),e.k0s(),e.EFF(3," to create a mask for entering a formatted number. "),e.j41(4,"tui-notification",2)(5,"div"),e.EFF(6," Despite the name of the mask, element's raw value is still string. "),e.j41(7,"p"),e.EFF(8," Use "),e.j41(9,"code"),e.EFF(10,"maskitoParseNumber"),e.k0s(),e.EFF(11," to get number-type value. "),e.k0s(),e.nrm(12,"tui-doc-code",3),e.k0s()(),e.j41(13,"tui-doc-example",4),e.DNE(14,z,4,0,"ng-template",null,5,e.C5r),e.nrm(16,"number-mask-doc-example-1"),e.k0s(),e.j41(17,"tui-doc-example",6),e.DNE(18,L,7,0,"ng-template",null,7,e.C5r),e.j41(20,"tui-notification",8),e.EFF(21," In Germany people use comma as decimal separator and dot for thousands "),e.k0s(),e.nrm(22,"number-mask-doc-example-2"),e.k0s(),e.j41(23,"tui-doc-example",9),e.DNE(24,U,15,0,"ng-template",null,10,e.C5r),e.nrm(26,"number-mask-doc-example-3"),e.k0s(),e.j41(27,"tui-doc-example",11),e.DNE(28,A,10,0,"ng-template",null,12,e.C5r),e.nrm(30,"number-mask-doc-example-4"),e.k0s(),e.j41(31,"tui-doc-example",13),e.DNE(32,K,12,0,"ng-template",null,14,e.C5r),e.nrm(34,"number-mask-doc-example-5"),e.k0s(),e.j41(35,"tui-doc-example",15),e.DNE(36,W,7,0,"ng-template",null,16,e.C5r),e.nrm(38,"number-mask-doc-example-6"),e.k0s()),2&t){const o=e.sdS(15),a=e.sdS(19),n=e.sdS(25),s=e.sdS(29),u=e.sdS(33),d=e.sdS(37),c=e.XpG();e.R7$(12),e.Y8G("code",c.maskitoParseNumberDemo),e.R7$(1),e.Y8G("content",c.highPrecisionExample1)("description",o),e.R7$(4),e.Y8G("content",c.separatorsExample2)("description",a),e.R7$(3),e.xc7("max-width",30,"rem"),e.R7$(3),e.Y8G("content",c.postfixExample3)("description",n),e.R7$(4),e.Y8G("content",c.decimalZeroPaddingExample4)("description",s),e.R7$(4),e.Y8G("content",c.customMinusSignExample5)("description",u),e.R7$(4),e.Y8G("content",c.dynamicDecimalZeroPaddingExample6)("description",d)}}function H(t,i){if(1&t&&(e.j41(0,"tui-input",31),e.EFF(1," Enter a number "),e.nrm(2,"input",32),e.k0s()),2&t){const o=e.XpG(2);e.Y8G("formControl",o.apiPageControl),e.R7$(2),e.Y8G("maskito",o.maskitoOptions)}}function J(t,i){1&t&&(e.EFF(0," A number of digits after "),e.j41(1,"code"),e.EFF(2,"decimalSeparator"),e.k0s(),e.EFF(3," . "),e.j41(4,"p"),e.EFF(5," Use "),e.j41(6,"code"),e.EFF(7,"Infinity"),e.k0s(),e.EFF(8," for an untouched decimal part. "),e.k0s(),e.j41(9,"p")(10,"strong"),e.EFF(11,"Default:"),e.k0s(),e.j41(12,"code"),e.EFF(13,"0"),e.k0s(),e.EFF(14," (decimal part is forbidden). "),e.k0s())}function Q(t,i){1&t&&(e.EFF(0," Symbol for separating fraction. "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.EFF(4," dot. "),e.k0s())}function q(t,i){1&t&&(e.EFF(0," Symbols to be replaced with "),e.j41(1,"code"),e.EFF(2,"decimalSeparator"),e.k0s(),e.EFF(3," . "),e.j41(4,"p")(5,"strong"),e.EFF(6,"Default:"),e.k0s(),e.j41(7,"code"),e.EFF(8,"['.', '\u044e', '\u0431']"),e.k0s(),e.EFF(9," . "),e.k0s())}function ee(t,i){1&t&&(e.EFF(0," If number of digits after "),e.j41(1,"code"),e.EFF(2,"decimalSeparator"),e.k0s(),e.EFF(3," is "),e.j41(4,"strong"),e.EFF(5,"always equal"),e.k0s(),e.EFF(6," to the "),e.j41(7,"code"),e.EFF(8,"precision"),e.k0s(),e.EFF(9," . "),e.j41(10,"p")(11,"strong"),e.EFF(12,"Default:"),e.k0s(),e.j41(13,"code"),e.EFF(14,"false"),e.k0s(),e.EFF(15," (number of digits can be less than precision) . "),e.k0s())}function te(t,i){1&t&&(e.EFF(0," Symbol for separating thousands. "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.EFF(4," non-breaking space. "),e.k0s())}function ne(t,i){1&t&&(e.EFF(0," The lowest permitted value. "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.j41(4,"code"),e.EFF(5,"Number.MIN_SAFE_INTEGER"),e.k0s(),e.EFF(6," . "),e.k0s())}function oe(t,i){1&t&&(e.EFF(0," The greatest permitted value. "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.j41(4,"code"),e.EFF(5,"Number.MAX_SAFE_INTEGER"),e.k0s(),e.EFF(6," . "),e.k0s())}function ae(t,i){1&t&&(e.EFF(0," A prefix symbol, like currency. "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.EFF(4," empty string (no prefix). "),e.k0s())}function ie(t,i){1&t&&(e.EFF(0," A postfix symbol, like currency. "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.EFF(4," empty string (no postfix). "),e.k0s())}function re(t,i){1&t&&(e.EFF(0," A minus symbol. "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.j41(4,"a",33)(5,"code"),e.EFF(6,"\\u2212"),e.k0s()()())}function se(t,i){if(1&t){const o=e.RV6();e.j41(0,"tui-doc-demo",20),e.DNE(1,H,3,2,"ng-template"),e.k0s(),e.j41(2,"tui-doc-documentation"),e.DNE(3,J,15,0,"ng-template",21),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.precision=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(4,Q,5,0,"ng-template",22),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.decimalSeparator=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(5,q,10,0,"ng-template",23),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.decimalPseudoSeparators=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(6,ee,16,0,"ng-template",24),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.decimalZeroPadding=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(7,te,5,0,"ng-template",25),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.thousandSeparator=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(8,ne,7,0,"ng-template",26),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.min=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(9,oe,7,0,"ng-template",27),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.max=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(10,ae,5,0,"ng-template",28),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.prefix=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(11,ie,5,0,"ng-template",29),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.postfix=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.DNE(12,re,7,0,"ng-template",30),e.bIt("documentationPropertyValueChange",function(n){e.eBV(o);const s=e.XpG();return e.Njj(s.minusSign=n)})("documentationPropertyValueChange",function(){e.eBV(o);const n=e.XpG();return e.Njj(n.updateOptions())}),e.k0s()}if(2&t){const o=e.XpG();e.Y8G("control",o.apiPageControl),e.R7$(3),e.Y8G("documentationPropertyValues",o.precisionOptions)("documentationPropertyValue",o.precision),e.R7$(1),e.Y8G("documentationPropertyValue",o.decimalSeparator),e.R7$(1),e.Y8G("documentationPropertyValues",o.decimalPseudoSeparatorsOptions)("documentationPropertyValue",o.decimalPseudoSeparators),e.R7$(1),e.Y8G("documentationPropertyValue",o.decimalZeroPadding),e.R7$(1),e.Y8G("documentationPropertyValue",o.thousandSeparator),e.R7$(1),e.Y8G("documentationPropertyValue",o.min),e.R7$(1),e.Y8G("documentationPropertyValue",o.max),e.R7$(1),e.Y8G("documentationPropertyValue",o.prefix),e.R7$(1),e.Y8G("documentationPropertyValue",o.postfix),e.R7$(1),e.Y8G("documentationPropertyValue",o.minusSign)}}const me=(()=>{var t;class i{constructor(){this.maskitoParseNumberDemo=r.e(1804).then(r.t.bind(r,1804,17)),this.highPrecisionExample1={[g.w.MaskitoOptions]:r.e(9850).then(r.t.bind(r,9850,17))},this.separatorsExample2={[g.w.MaskitoOptions]:r.e(4416).then(r.t.bind(r,4416,17))},this.postfixExample3={[g.w.MaskitoOptions]:r.e(7296).then(r.t.bind(r,7296,17))},this.decimalZeroPaddingExample4={[g.w.MaskitoOptions]:r.e(8534).then(r.t.bind(r,8534,17))},this.customMinusSignExample5={[g.w.MaskitoOptions]:r.e(2637).then(r.t.bind(r,2637,17))},this.dynamicDecimalZeroPaddingExample6={[g.w.MaskitoOptions]:r.e(971).then(r.t.bind(r,3352,17)),[g.w.Angular]:r.e(1079).then(r.t.bind(r,1079,17))},this.apiPageControl=new m.MJ(""),this.decimalPseudoSeparatorsOptions=[[".",",","\u0431","\u044e"],["."],[","]],this.precisionOptions=[0,1,2,5,10,1/0],this.precision=0,this.max=Number.MAX_SAFE_INTEGER,this.min=Number.MIN_SAFE_INTEGER,this.decimalSeparator=".",this.decimalZeroPadding=!1,this.decimalPseudoSeparators=this.decimalPseudoSeparatorsOptions[0],this.thousandSeparator="\xa0",this.prefix="",this.postfix="",this.minusSign=x.el,this.maskitoOptions=this.calculateMask(this)}updateOptions(){this.maskitoOptions=this.calculateMask(this)}calculateMask(a){const{prefix:n,postfix:s}=a,{plugins:u,...d}=(0,l.TK)(a);return{...d,plugins:[...u,(0,l.sd)(n+s),(0,l.A6)(n+s),(0,l.N_)(c=>[n.length,c.length-s.length])]}}}return(t=i).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["number-mask-doc"]],standalone:!0,features:[e.aNF],decls:3,vars:0,consts:[["header","Number","package","KIT"],["pageTab",""],["size","m",1,"tui-space_top-4"],[3,"code"],["id","high-precision","heading","High precision",3,"content","description"],["precisionDescription",""],["id","separators","heading","Separators",3,"content","description"],["separatorsDescription",""],["size","m",1,"tui-space_bottom-4"],["id","postfix","heading","Postfix",3,"content","description"],["postfixDescription",""],["id","decimal-zero-padding","heading","Decimal zero padding",3,"content","description"],["decimalZeroPaddingDescription",""],["id","minus-sign","heading","Minus sign",3,"content","description"],["customMinusSignDescription",""],["id","dynamic-decimal-zero-padding","heading","Dynamic decimal zero padding",3,"content","description"],["dynamicDecimalZeroPaddingDescription",""],[1,"tui-space_top-4"],[1,"tui-space_top-0"],["href","https://symbl.cc/en/2010","rel","noreferrer","target","_blank","tuiLink",""],[3,"control"],["documentationPropertyMode","input","documentationPropertyName","precision","documentationPropertyType","number",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","decimalSeparator","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","decimalPseudoSeparators","documentationPropertyType","string[]",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","decimalZeroPadding","documentationPropertyType","boolean",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","thousandSeparator","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","min","documentationPropertyType","number",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","max","documentationPropertyType","number",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","prefix","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","postfix","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","minusSign","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["tuiHintContent","Only digits (+ decimal separator) are allowed",3,"formControl"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"],["href","https://symbl.cc/en/2212","rel","noreferrer","target","_blank","tuiLink",""]],template:function(a,n){1&a&&(e.j41(0,"tui-doc-page",0),e.DNE(1,w,39,15,"ng-template",1),e.DNE(2,se,13,13,"ng-template",1),e.k0s())},dependencies:[_.u,P,j,S,B,R,y,m.X1,m.BC,m.l_,h.aD,h.MN,h.FS,h.FC,h.df,h.e3,h.ic,p.zi,p.mp,p.Ws,F.Bw,b.Jc,M.wS],encapsulation:2,changeDetection:0}),i})()}}]);