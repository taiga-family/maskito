"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[2307],{92307:function(e,t,n){n.r(t),n.d(t,{NumberMaskDocModule:function(){return ae}});var o=n(12057),i=n(87862),a=n(2586),r=n(52494),u=n(70997),s=n(44427),c=n(64762),p=n(74788),l=n(44358),d=n(12130),m=n(79456),g=n(89570);const h=["tuiLabel",""];function f(e,t){1&e&&p._UZ(0,"span",3),2&e&&p.Q6J("textContent",t.polymorpheusOutlet)}const Z=["*"];let x=(()=>{class e{constructor(e){this.mode$=e,this.context={$implicit:null}}}return e.\u0275fac=function(t){return new(t||e)(p.Y36(m.Au))},e.\u0275cmp=p.Xpm({type:e,selectors:[["label","tuiLabel",""]],contentQueries:function(e,t,n){if(1&e&&p.Suo(n,i.a5,5),2&e){let e;p.iGM(e=p.CRH())&&(t.control=e.first)}},hostVars:2,hostBindings:function(e,t){1&e&&p.NdJ("$.data-mode.attr",function(){return t.mode$}),2&e&&p.ekj("_control",t.control)},inputs:{tuiLabel:"tuiLabel",context:"context"},features:[p._Bn([d.CV])],attrs:h,ngContentSelectors:Z,decls:4,vars:2,consts:[[1,"t-label"],["class","t-text",3,"textContent",4,"polymorpheusOutlet","polymorpheusOutletContext"],[1,"t-content"],[1,"t-text",3,"textContent"]],template:function(e,t){1&e&&(p.F$t(),p.TgZ(0,"span",0),p.YNc(1,f,1,1,"span",1),p.qZA(),p.TgZ(2,"span",2),p.Hsn(3),p.qZA()),2&e&&(p.xp6(1),p.Q6J("polymorpheusOutlet",t.tuiLabel)("polymorpheusOutletContext",t.context))},directives:[g.Li],styles:['[_nghost-%COMP%]{display:flex;min-height:2.75rem;justify-content:space-between;flex-direction:column;pointer-events:none}.t-label[_ngcontent-%COMP%]{font:var(--tui-font-text-s);max-width:100%;align-self:inherit;overflow:inherit;pointer-events:auto}._control[_nghost-%COMP%]   .t-label[_ngcontent-%COMP%]{margin-bottom:.25rem}.t-text[_ngcontent-%COMP%]{display:block;overflow:inherit;text-overflow:ellipsis}[_nghost-%COMP%]:not(._control)   .t-text[_ngcontent-%COMP%]{color:var(--tui-text-02)}[data-mode="onDark"][_nghost-%COMP%]   .t-text[_ngcontent-%COMP%]{color:var(--tui-text-02-night)}.t-content[_ngcontent-%COMP%]{line-height:1.5rem;overflow:inherit;text-overflow:ellipsis;pointer-events:auto}'],changeDetection:0}),(0,c.gn)([(0,l.TH)()],e.prototype,"context",void 0),e})(),y=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[g.wq]]}),e})();var P=n(60885),_=n(79588),U=n(21673),T=n(14707),A=n(2618),v=n(15160),C=n(84800),b=n(94853),M=(0,A.f8)({isNegativeAllowed:!1,precision:8}),q=n(49510),w=n(47258);let N=(()=>{class e{constructor(){this.value="",this.maskitoOptions=M}onBlur(){this.value=this.value.startsWith(",")?`0${this.value}`:this.value}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p.Xpm({type:e,selectors:[["number-mask-doc-example-1"]],decls:5,vars:4,consts:[[3,"ngModel","ngModelChange"],["tuiTextfield","","placeholder","3,141...","inputmode","decimal",3,"maskito","blur"]],template:function(e,t){1&e&&(p.TgZ(0,"tui-input",0),p.NdJ("ngModelChange",function(e){return t.value=e}),p.TgZ(1,"strong"),p._uU(2,"\u03c0"),p.qZA(),p._uU(3," -value "),p.TgZ(4,"input",1),p.NdJ("blur",function(){return t.onBlur()}),p.qZA(),p.qZA()),2&e&&(p.Udp("max-width",30,"rem"),p.Q6J("ngModel",t.value),p.xp6(4),p.Q6J("maskito",t.maskitoOptions))},directives:[U.K3,U.wU,i.JJ,i.On,b.MB,q.F,w.r],encapsulation:2,changeDetection:0}),e})();var J=(0,A.f8)({decimalSeparator:",",thousandSeparator:".",precision:2});let O=(()=>{class e{constructor(){this.maskitoOptions=J,this.value=""}onBlur(){this.value=this.value.startsWith(",")?`0${this.value}`:this.value}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p.Xpm({type:e,selectors:[["number-mask-doc-example-2"]],decls:3,vars:4,consts:[[3,"ngModel","ngModelChange"],["tuiTextfield","","placeholder","1.000,42","inputmode","decimal",3,"maskito","blur"]],template:function(e,t){1&e&&(p.TgZ(0,"tui-input",0),p.NdJ("ngModelChange",function(e){return t.value=e}),p._uU(1," Type number like a German "),p.TgZ(2,"input",1),p.NdJ("blur",function(){return t.onBlur()}),p.qZA(),p.qZA()),2&e&&(p.Udp("max-width",30,"rem"),p.Q6J("ngModel",t.value),p.xp6(2),p.Q6J("maskito",t.maskitoOptions))},directives:[U.K3,U.wU,i.JJ,i.On,b.MB,q.F,w.r],encapsulation:2,changeDetection:0}),e})();var k=(0,A.f8)({isNegativeAllowed:!1,precision:2,max:100,postfix:"%"});const V=["nativeInput"];let S=(()=>{class e{constructor(){this.postfix="%",this.value=`97${this.postfix}`,this.maskitoOptions=k}onFocus(){this.value||(this.value=this.postfix);const e=this.value.length-this.postfix.length;setTimeout(()=>{this.inputRef.nativeElement.setSelectionRange(e,e)})}onBlur(){this.value===this.postfix&&(this.value=`0${this.postfix}`)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p.Xpm({type:e,selectors:[["number-mask-doc-example-3"]],viewQuery:function(e,t){if(1&e&&p.Gf(V,5,p.SBq),2&e){let e;p.iGM(e=p.CRH())&&(t.inputRef=e.first)}},decls:3,vars:5,consts:[[3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito","focus","blur"],["nativeInput",""]],template:function(e,t){1&e&&(p.TgZ(0,"tui-input",0),p.NdJ("ngModelChange",function(e){return t.value=e}),p.TgZ(1,"input",1,2),p.NdJ("focus",function(){return t.onFocus()})("blur",function(){return t.onBlur()}),p.qZA(),p.qZA()),2&e&&(p.Udp("max-width",30,"rem"),p.Q6J("tuiTextfieldLabelOutside",!0)("ngModel",t.value),p.xp6(1),p.Q6J("maskito",t.maskitoOptions))},directives:[U.K3,U.wU,_.xT,i.JJ,i.On,b.MB,q.F,w.r],encapsulation:2,changeDetection:0}),e})();var Q=(0,A.f8)({decimalZeroPadding:!0,precision:2,decimalSeparator:".",isNegativeAllowed:!1,prefix:"$"});let D=(()=>{class e{constructor(){this.value="$100.00",this.maskitoOptions=Q}onBlur(){this.value=this.value.replace("$.","$0.")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p.Xpm({type:e,selectors:[["number-mask-doc-example-4"]],decls:3,vars:4,consts:[[3,"ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito","blur"]],template:function(e,t){1&e&&(p.TgZ(0,"tui-input",0),p.NdJ("ngModelChange",function(e){return t.value=e}),p._uU(1," Cost "),p.TgZ(2,"input",1),p.NdJ("blur",function(){return t.onBlur()}),p.qZA(),p.qZA()),2&e&&(p.Udp("max-width",30,"rem"),p.Q6J("ngModel",t.value),p.xp6(2),p.Q6J("maskito",t.maskitoOptions))},directives:[U.K3,U.wU,i.JJ,i.On,b.MB,q.F,w.r],encapsulation:2,changeDetection:0}),e})();class B{constructor(){this.value="42",this.decimalZeroPadding=this.value.includes(".")}getMaskOptions(e){return(0,A.f8)({decimalZeroPadding:e,precision:2,decimalSeparator:".",isNegativeAllowed:!1})}onBlur(){this.value=this.value.startsWith(".")?`0${this.value}`:this.value}handleBeforeInput(e){const{inputType:t,target:n,data:o}=e;if(t.includes("delete")){const e=n,[o,i]=this.getNotEmptySelection([e.selectionStart||0,e.selectionEnd||0],t.includes("Forward")),a=this.value.slice(o,i).includes(".");this.decimalZeroPadding=this.decimalZeroPadding&&!a}else this.decimalZeroPadding=[".",",","\u0431","\u044e"].some(e=>(null==o?void 0:o.includes(e))||this.value.includes(e))}getNotEmptySelection([e,t],n){return e!==t?[e,t]:n?[e,t+1]:[Math.max(e-1,0),t]}}B.\u0275fac=function(e){return new(e||B)},B.\u0275cmp=p.Xpm({type:B,selectors:[["number-mask-doc-example-5"]],decls:3,vars:5,consts:[["tuiLabel","Enable decimal zero padding by typing dot"],[3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito","beforeinput.capture","blur"]],template:function(e,t){1&e&&(p.TgZ(0,"label",0),p.TgZ(1,"tui-input",1),p.NdJ("ngModelChange",function(e){return t.value=e}),p.TgZ(2,"input",2),p.NdJ("beforeinput.capture",function(e){return t.handleBeforeInput(e)})("blur",function(){return t.onBlur()}),p.qZA(),p.qZA(),p.qZA()),2&e&&(p.xp6(1),p.Udp("max-width",30,"rem"),p.Q6J("tuiTextfieldLabelOutside",!0)("ngModel",t.value),p.xp6(1),p.Q6J("maskito",t.getMaskOptions(t.decimalZeroPadding)))},directives:[x,U.K3,U.wU,_.xT,i.JJ,i.On,b.MB,q.F,w.r],encapsulation:2,changeDetection:0}),(0,c.gn)([l.UM],B.prototype,"getMaskOptions",null);const H=["apiPageInput"];function E(e,t){1&e&&(p._uU(0," Use "),p.TgZ(1,"code"),p._uU(2,"precision"),p.qZA(),p._uU(3," parameter to configure the number of digits after decimal separator. "))}function Y(e,t){1&e&&(p._uU(0," Use "),p.TgZ(1,"code"),p._uU(2,"decimalSeparator"),p.qZA(),p._uU(3," and "),p.TgZ(4,"code"),p._uU(5,"thousandSeparator"),p.qZA(),p._uU(6," to get mask with locale specific representation of numbers. "))}function F(e,t){1&e&&(p.TgZ(0,"p",15),p._uU(1," Use "),p.TgZ(2,"code"),p._uU(3,"postfix"),p.qZA(),p._uU(4," parameter to set non-removable text after the number. "),p.qZA(),p.TgZ(5,"p"),p._uU(6," This example also shows how to restrict the greatest permitted value via "),p.TgZ(7,"code"),p._uU(8,"max"),p.qZA(),p._uU(9," parameter. "),p.qZA())}function I(e,t){1&e&&(p.TgZ(0,"p",15),p._uU(1," Set "),p.TgZ(2,"code"),p._uU(3,"decimalZeroPadding: true"),p.qZA(),p._uU(4," to always show trailing zeroes. "),p.qZA(),p.TgZ(5,"p"),p._uU(6," Non removable dollar sign is achieved by using "),p.TgZ(7,"code"),p._uU(8,"prefix"),p.qZA(),p._uU(9," parameter. "),p.qZA())}function $(e,t){1&e&&(p.TgZ(0,"div"),p._uU(1," You can change options on the fly to build complex logic. "),p.qZA(),p.TgZ(2,"div"),p._uU(3," This example shows how to initially disable "),p.TgZ(4,"code"),p._uU(5,"decimalZeroPadding"),p.qZA(),p._uU(6," and enable it only after user inserts decimal separator. "),p.qZA())}function L(e,t){if(1&e&&(p._uU(0," Use "),p.TgZ(1,"code"),p._uU(2,"maskitoNumberOptionsGenerator"),p.qZA(),p._uU(3," to create a mask for entering a formatted number. "),p.TgZ(4,"tui-notification",2),p._uU(5," Despite the name of the mask, element's raw value is still string. "),p.TgZ(6,"p"),p._uU(7," Use "),p.TgZ(8,"code"),p._uU(9,"maskitoParseNumber"),p.qZA(),p._uU(10," to get number-type value. "),p.qZA(),p._UZ(11,"tui-doc-code",3),p.qZA(),p.TgZ(12,"tui-doc-example",4),p.YNc(13,E,4,0,"ng-template",null,5,p.W1O),p._UZ(15,"number-mask-doc-example-1"),p.qZA(),p.TgZ(16,"tui-doc-example",6),p.YNc(17,Y,7,0,"ng-template",null,7,p.W1O),p.TgZ(19,"tui-notification",8),p._uU(20," In Germany people use comma as decimal separator and dot for thousands "),p.qZA(),p._UZ(21,"number-mask-doc-example-2"),p.qZA(),p.TgZ(22,"tui-doc-example",9),p.YNc(23,F,10,0,"ng-template",null,10,p.W1O),p._UZ(25,"number-mask-doc-example-3"),p.qZA(),p.TgZ(26,"tui-doc-example",11),p.YNc(27,I,10,0,"ng-template",null,12,p.W1O),p._UZ(29,"number-mask-doc-example-4"),p.qZA(),p.TgZ(30,"tui-doc-example",13),p.YNc(31,$,7,0,"ng-template",null,14,p.W1O),p._UZ(33,"number-mask-doc-example-5"),p.qZA()),2&e){const e=p.MAs(14),t=p.MAs(18),n=p.MAs(24),o=p.MAs(28),i=p.MAs(32),a=p.oxw();p.xp6(11),p.Q6J("code",a.maskitoParseNumberDemo),p.xp6(1),p.Q6J("content",a.highPrecisionExample1)("description",e),p.xp6(4),p.Q6J("content",a.separatorsExample2)("description",t),p.xp6(3),p.Udp("max-width",30,"rem"),p.xp6(3),p.Q6J("content",a.postfixExample3)("description",n),p.xp6(4),p.Q6J("content",a.decimalZeroPaddingExample4)("description",o),p.xp6(4),p.Q6J("content",a.dynamicDecimalZeroPaddingExample5)("description",i)}}function G(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"tui-input",26),p._uU(1," Enter a number "),p.TgZ(2,"input",27,28),p.NdJ("focus",function(){return p.CHM(e),p.oxw(2).onFocus()})("blur",function(){return p.CHM(e),p.oxw(2).onBlur()}),p.qZA(),p.qZA()}if(2&e){const e=p.oxw(2);p.Q6J("formControl",e.apiPageControl),p.xp6(2),p.Q6J("maskito",e.maskitoOptions)}}function R(e,t){1&e&&(p._uU(0," Allows to input negative sign (minus). "),p.TgZ(1,"p"),p.TgZ(2,"strong"),p._uU(3,"Default:"),p.qZA(),p.TgZ(4,"code"),p._uU(5,"true"),p.qZA(),p._uU(6," . "),p.qZA())}function X(e,t){1&e&&(p._uU(0," The greatest permitted value. "),p.TgZ(1,"p"),p.TgZ(2,"strong"),p._uU(3,"Default:"),p.qZA(),p.TgZ(4,"code"),p._uU(5,"Number.MAX_SAFE_INTEGER"),p.qZA(),p._uU(6," . "),p.qZA())}function z(e,t){1&e&&(p._uU(0," A number of digits after "),p.TgZ(1,"code"),p._uU(2,"decimalSeparator"),p.qZA(),p._uU(3," . "),p.TgZ(4,"p"),p._uU(5," Use "),p.TgZ(6,"code"),p._uU(7,"Infinity"),p.qZA(),p._uU(8," for an untouched decimal part. "),p.qZA(),p.TgZ(9,"p"),p.TgZ(10,"strong"),p._uU(11,"Default:"),p.qZA(),p.TgZ(12,"code"),p._uU(13,"0"),p.qZA(),p._uU(14," (decimal part is forbidden). "),p.qZA())}function W(e,t){1&e&&(p._uU(0," Symbol for separating fraction. "),p.TgZ(1,"p"),p.TgZ(2,"strong"),p._uU(3,"Default:"),p.qZA(),p._uU(4," dot. "),p.qZA())}function K(e,t){1&e&&(p._uU(0," Symbols to be replaced with "),p.TgZ(1,"code"),p._uU(2,"decimalSeparator"),p.qZA(),p._uU(3," . "),p.TgZ(4,"p"),p.TgZ(5,"strong"),p._uU(6,"Default:"),p.qZA(),p.TgZ(7,"code"),p._uU(8,"['.', '\u044e', '\u0431']"),p.qZA(),p._uU(9," . "),p.qZA())}function j(e,t){1&e&&(p._uU(0," If number of digits after "),p.TgZ(1,"code"),p._uU(2,"decimalSeparator"),p.qZA(),p._uU(3," is "),p.TgZ(4,"strong"),p._uU(5,"always equal"),p.qZA(),p._uU(6," to the "),p.TgZ(7,"code"),p._uU(8,"precision"),p.qZA(),p._uU(9," . "),p.TgZ(10,"p"),p.TgZ(11,"strong"),p._uU(12,"Default:"),p.qZA(),p.TgZ(13,"code"),p._uU(14,"false"),p.qZA(),p._uU(15," (number of digits can be less than precision) . "),p.qZA())}function ee(e,t){1&e&&(p._uU(0," Symbol for separating thousands. "),p.TgZ(1,"p"),p.TgZ(2,"strong"),p._uU(3,"Default:"),p.qZA(),p._uU(4," non-breaking space. "),p.qZA())}function te(e,t){1&e&&(p._uU(0," A prefix symbol, like currency. "),p.TgZ(1,"p"),p.TgZ(2,"strong"),p._uU(3,"Default:"),p.qZA(),p._uU(4," empty string (no prefix). "),p.qZA())}function ne(e,t){1&e&&(p._uU(0," A postfix symbol, like currency. "),p.TgZ(1,"p"),p.TgZ(2,"strong"),p._uU(3,"Default:"),p.qZA(),p._uU(4," empty string (no postfix). "),p.qZA())}function oe(e,t){if(1&e){const e=p.EpF();p.TgZ(0,"tui-doc-demo",16),p.YNc(1,G,4,2,"ng-template"),p.qZA(),p.TgZ(2,"tui-doc-documentation"),p.YNc(3,R,7,0,"ng-template",17),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().isNegativeAllowed=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(4,X,7,0,"ng-template",18),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().max=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(5,z,15,0,"ng-template",19),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().precision=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(6,W,5,0,"ng-template",20),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().decimalSeparator=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(7,K,10,0,"ng-template",21),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().decimalPseudoSeparators=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(8,j,16,0,"ng-template",22),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().decimalZeroPadding=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(9,ee,5,0,"ng-template",23),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().thousandSeparator=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(10,te,5,0,"ng-template",24),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().prefix=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.YNc(11,ne,5,0,"ng-template",25),p.NdJ("documentationPropertyValueChange",function(t){return p.CHM(e),p.oxw().postfix=t})("documentationPropertyValueChange",function(){return p.CHM(e),p.oxw().updateOptions()}),p.qZA()}if(2&e){const e=p.oxw();p.Q6J("control",e.apiPageControl),p.xp6(3),p.Q6J("documentationPropertyValue",e.isNegativeAllowed),p.xp6(1),p.Q6J("documentationPropertyValue",e.max),p.xp6(1),p.Q6J("documentationPropertyValues",e.precisionOptions)("documentationPropertyValue",e.precision),p.xp6(1),p.Q6J("documentationPropertyValue",e.decimalSeparator),p.xp6(1),p.Q6J("documentationPropertyValues",e.decimalPseudoSeparatorsOptions)("documentationPropertyValue",e.decimalPseudoSeparators),p.xp6(1),p.Q6J("documentationPropertyValue",e.decimalZeroPadding),p.xp6(1),p.Q6J("documentationPropertyValue",e.thousandSeparator),p.xp6(1),p.Q6J("documentationPropertyValue",e.prefix),p.xp6(1),p.Q6J("documentationPropertyValue",e.postfix)}}let ie=(()=>{class e{constructor(){this.maskitoParseNumberDemo=n.e(5694).then(n.t.bind(n,68507,17)),this.highPrecisionExample1={[T.C.MaskitoOptions]:n.e(3533).then(n.t.bind(n,13533,17))},this.separatorsExample2={[T.C.MaskitoOptions]:n.e(1335).then(n.t.bind(n,31335,17))},this.postfixExample3={[T.C.MaskitoOptions]:n.e(7792).then(n.t.bind(n,27792,17))},this.decimalZeroPaddingExample4={[T.C.MaskitoOptions]:n.e(9057).then(n.t.bind(n,99057,17))},this.dynamicDecimalZeroPaddingExample5={[T.C.MaskitoOptions]:n.e(4947).then(n.t.bind(n,94947,17)),[T.C.Angular]:n.e(8929).then(n.t.bind(n,38929,17))},this.apiPageControl=new i.NI(""),this.maskitoOptions=(0,A.f8)(this),this.decimalPseudoSeparatorsOptions=[[".",",","\u0431","\u044e"],["."],[","]],this.precisionOptions=[0,1,2,5,10,1/0],this.precision=0,this.isNegativeAllowed=!0,this.max=Number.MAX_SAFE_INTEGER,this.decimalSeparator=".",this.decimalZeroPadding=!1,this.decimalPseudoSeparators=this.decimalPseudoSeparatorsOptions[0],this.thousandSeparator="\xa0",this.prefix="",this.postfix=""}updateOptions(){this.maskitoOptions=(0,A.f8)(this)}onFocus(){let e=this.apiPageControl.value;if(e||(e=this.prefix+this.postfix,this.apiPageControl.patchValue(e)),this.postfix){const t=e.length-this.postfix.length;setTimeout(()=>{this.apiPageInput.nativeElement.setSelectionRange(t,t)})}}onBlur(){const e=this.apiPageControl.value;e&&e===this.prefix+this.postfix&&this.apiPageControl.patchValue("")}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=p.Xpm({type:e,selectors:[["number-mask-doc"]],viewQuery:function(e,t){if(1&e&&p.Gf(H,5,p.SBq),2&e){let e;p.iGM(e=p.CRH())&&(t.apiPageInput=e.first)}},features:[p._Bn([(0,v.iL)({min:Number.MIN_SAFE_INTEGER})])],decls:3,vars:0,consts:[["header","Number","package","KIT"],["pageTab",""],[1,"tui-space_top-4"],[3,"code"],["id","high-precision","heading","High precision",3,"content","description"],["precisionDescription",""],["id","separators","heading","Separators",3,"content","description"],["separatorsDescription",""],[1,"tui-space_bottom-4"],["id","postfix","heading","Postfix",3,"content","description"],["postfixDescription",""],["id","decimal-zero-padding","heading","Decimal zero padding",3,"content","description"],["decimalZeroPaddingDescription",""],["id","dynamic-decimal-zero-padding","heading","Dynamic decimal zero padding",3,"content","description"],["dynamicDecimalZeroPaddingDescription",""],[1,"tui-space_top-0"],[3,"control"],["documentationPropertyName","isNegativeAllowed","documentationPropertyMode","input","documentationPropertyType","boolean",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","max","documentationPropertyMode","input","documentationPropertyType","number",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","precision","documentationPropertyMode","input","documentationPropertyType","number",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","decimalSeparator","documentationPropertyMode","input","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","decimalPseudoSeparators","documentationPropertyMode","input","documentationPropertyType","string[]",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","decimalZeroPadding","documentationPropertyMode","input","documentationPropertyType","boolean",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","thousandSeparator","documentationPropertyMode","input","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","prefix","documentationPropertyMode","input","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","postfix","documentationPropertyMode","input","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["tuiHintContent","Only digits (+ decimal separator) are allowed",3,"formControl"],["tuiTextfield","","inputmode","decimal",3,"maskito","focus","blur"],["apiPageInput",""]],template:function(e,t){1&e&&(p.TgZ(0,"tui-doc-page",0),p.YNc(1,L,34,13,"ng-template",1),p.YNc(2,oe,12,12,"ng-template",1),p.qZA())},directives:[C.qo,C.nj,P.Ls,C.c0,C.f2,N,O,S,D,B,C.FU,C.zb,C.B7,U.K3,U.wU,i.JJ,i.oH,b.MB,q.F,w.r],encapsulation:2,changeDetection:0}),e})(),ae=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=p.oAB({type:e}),e.\u0275inj=p.cJS({imports:[[o.ez,i.u5,i.UX,r.U5,u.fV,U.Qf,y,P.Hi,_.cn,a.Bz.forChild((0,s.Ve)(ie))]]}),e})()}}]);