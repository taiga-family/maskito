"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[5183],{997:(A,g,t)=>{t.d(g,{TuiAddonDocModule:()=>f});var x=t(4537),i=t(9439);let f=(()=>{class s{}return s.\u0275fac=function(r){return new(r||s)},s.\u0275mod=x.oAB({type:s}),s.\u0275inj=x.cJS({imports:[i.JF,i.mG,i.Lx,i.Lq,i.u4]}),s})()},5183:(A,g,t)=>{t.r(g),t.d(g,{default:()=>K});var x=t(3178),i=t(3139),f=t(997),T=t(2847),s=t(9900),h=t(1156),r=t(8940),p=t(1673),d=t(4482);const _={...(0,d.Oe)("xxx"),mask:/^\d{0,3}$/};var e=t(4537),Z=t(5640);let k=(()=>{var o;class n{constructor(){this.maskitoOptions=_,this.value="xxx"}}return(o=n).\u0275fac=function(a){return new(a||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["placeholder-doc-example-1"]],standalone:!0,features:[e.jDz],decls:3,vars:4,consts:[["tuiTextfieldCustomContent","tuiIconCreditCardLarge",3,"ngModel","ngModelChange"],["inputmode","numeric","tuiTextfield","",3,"maskito"]],template:function(a,c){1&a&&(e.TgZ(0,"tui-input",0),e.NdJ("ngModelChange",function(u){return c.value=u}),e._uU(1," Enter CVC code "),e._UZ(2,"input",1),e.qZA()),2&a&&(e.Udp("max-width",20,"rem"),e.Q6J("ngModel",c.value),e.xp6(2),e.Q6J("maskito",c.maskitoOptions))},dependencies:[s.u5,s.JJ,s.On,h.ro,p.Qf,p.K3,p.wU,Z.MB,r.cn,r.B7],encapsulation:2,changeDetection:0}),n})();var P=t(1824),U=t(3577);const v="+\u2000 (\u2000\u2000\u2000) ___-____",{removePlaceholder:O,plugins:y,...C}=(0,d.Oe)(v),J={preprocessors:C.preprocessors,postprocessors:[(0,d.jX)("+1"),...C.postprocessors],mask:["+","1"," ","(",/\d/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/],plugins:[...y,(0,d.L9)("focus",o=>{const n=o.value||"+1 (";(0,U.fD)(o,n+v.slice(n.length))}),(0,d.L9)("blur",o=>{const n=O(o.value);(0,U.fD)(o,"+1"===n?"":n)})]};function L(o,n){1&o&&(e._UZ(0,"img",3),e.ALo(1,"tuiFlag")),2&o&&e.Q6J("src",e.lcZ(1,1,"US"),e.LSH)}let Q=(()=>{var o;class n{constructor(){this.maskitoOptions=J,this.value=""}}return(o=n).\u0275fac=function(a){return new(a||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["placeholder-doc-example-2"]],standalone:!0,features:[e.jDz],decls:5,vars:5,consts:[[3,"tuiTextfieldCustomContent","ngModel","ngModelChange"],["inputmode","tel","tuiTextfield","",3,"maskito"],["usFlag",""],["alt","Flag of the United States","width","28",3,"src"]],template:function(a,c){if(1&a&&(e.TgZ(0,"tui-input",0),e.NdJ("ngModelChange",function(u){return c.value=u}),e._uU(1," Enter US phone number "),e._UZ(2,"input",1),e.YNc(3,L,2,3,"ng-template",null,2,e.W1O),e.qZA()),2&a){const m=e.MAs(4);e.Udp("max-width",20,"rem"),e.Q6J("tuiTextfieldCustomContent",m)("ngModel",c.value),e.xp6(2),e.Q6J("maskito",c.maskitoOptions)}},dependencies:[s.u5,s.JJ,s.On,h.ro,P.I,P.T,p.Qf,p.K3,p.wU,Z.MB,r.cn,r.B7],encapsulation:2,changeDetection:0}),n})();const D=(0,d.tr)({mode:"dd/mm/yyyy",separator:"/"}),{plugins:B,...E}=(0,d.Oe)("dd/mm/yyyy",!0),F={...D,plugins:B.concat(D.plugins||[]),preprocessors:[...E.preprocessors,...D.preprocessors],postprocessors:[...D.postprocessors,...E.postprocessors]};let j=(()=>{var o;class n{constructor(){this.maskitoOptions=F,this.value=""}}return(o=n).\u0275fac=function(a){return new(a||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["placeholder-doc-example-3"]],standalone:!0,features:[e.jDz],decls:3,vars:4,consts:[["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"ngModel","ngModelChange"],["inputmode","numeric","tuiTextfield","",3,"maskito"]],template:function(a,c){1&a&&(e.TgZ(0,"tui-input",0),e.NdJ("ngModelChange",function(u){return c.value=u}),e._uU(1," Enter date "),e._UZ(2,"input",1),e.qZA()),2&a&&(e.Udp("max-width",20,"rem"),e.Q6J("ngModel",c.value),e.xp6(2),e.Q6J("maskito",c.maskitoOptions))},dependencies:[s.u5,s.JJ,s.On,h.ro,p.Qf,p.K3,p.wU,Z.MB,r.cn,r.B7],encapsulation:2,changeDetection:0}),n})();var M=t(9439);function N(o,n){if(1&o&&(e.TgZ(0,"p",8),e._uU(1," This example is the simplest demonstration how to create masked input with "),e.TgZ(2,"strong"),e._uU(3,"placeholder"),e.qZA(),e._uU(4," . "),e.qZA(),e.TgZ(5,"p",9),e._uU(6," The only required prerequisite is basic understanding of "),e.TgZ(7,"a",10),e._uU(8,' "Mask\xa0expression" '),e.qZA(),e._uU(9," concept. "),e.qZA()),2&o){const l=e.oxw();e.xp6(7),e.Q6J("routerLink",l.maskExpressionDocPage)}}function R(o,n){if(1&o&&(e.TgZ(0,"p",8),e._uU(1," The following example explains return type of "),e.TgZ(2,"code"),e._uU(3,"maskitoWithPlaceholder"),e.qZA(),e._uU(4," utility \u2014 an\xa0object which partially implements "),e.TgZ(5,"code"),e._uU(6,"MaskitoOptions"),e.qZA(),e._uU(7," interface. It contains its own "),e.TgZ(8,"a",10),e._uU(9," processor and postprocessor "),e.qZA(),e._uU(10," and "),e.TgZ(11,"a",10),e._uU(12," plugins "),e.qZA(),e._uU(13," to keep caret from getting into placeholder part of the value. "),e.qZA(),e._UZ(14,"p",8),e.TgZ(15,"p",9),e._uU(16," Also, this complex example uses built-in postprocessor "),e.TgZ(17,"a",11),e._uU(18," maskitoPrefixPostprocessorGenerator "),e.qZA(),e._uU(19," from "),e.TgZ(20,"code"),e._uU(21,"@maskito/kit"),e.qZA(),e._uU(22," . "),e.qZA()),2&o){const l=e.oxw();e.xp6(8),e.Q6J("routerLink",l.processorsDocPage),e.xp6(3),e.Q6J("routerLink",l.pluginsDocPage),e.xp6(6),e.Q6J("routerLink",l.prefixDocPage)}}function I(o,n){1&o&&(e._uU(0," This last example demonstrates how to integrate "),e.TgZ(1,"code"),e._uU(2,"maskitoWithPlaceholder"),e.qZA(),e._uU(3," with any built-in mask from "),e.TgZ(4,"code"),e._uU(5,"@maskito/kit"),e.qZA(),e._uU(6," . "))}let K=(()=>{var o;class n{constructor(){this.maskExpressionDocPage=`/${i.x.MaskExpression}`,this.processorsDocPage=`/${i.x.Processors}`,this.pluginsDocPage=`/${i.x.Plugins}`,this.prefixDocPage=`/${i.x.Prefix}`,this.cvcExample1={[i.C.MaskitoOptions]:t.e(960).then(t.t.bind(t,960,17))},this.phoneExample2={[i.C.MaskitoOptions]:t.e(6304).then(t.t.bind(t,6304,17))},this.dateExample3={[i.C.MaskitoOptions]:t.e(5691).then(t.t.bind(t,5691,17))}}}return(o=n).\u0275fac=function(a){return new(a||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["placeholder-doc"]],standalone:!0,features:[e.jDz],decls:17,vars:6,consts:[["header","With placeholder","package","Recipes"],[1,"tui-space_top-0"],["id","cvc","heading","Card Verification Code",3,"content","description"],["cvcDescription",""],["id","phone","heading","Phone",3,"content","description"],["phoneDescription",""],["id","date","heading","Date",3,"content","description"],["dateExampleDescription",""],[1,"tui-space_top-0","tui-space_bottom-2"],[1,"tui-space_top-0","tui-space_bottom-0"],["tuiLink","",3,"routerLink"],["fragment","by-postprocessor","tuiLink","",3,"routerLink"]],template:function(a,c){if(1&a&&(e.TgZ(0,"tui-doc-page",0)(1,"p",1)(2,"code"),e._uU(3,"maskitoWithPlaceholder"),e.qZA(),e._uU(4," helps to show placeholder mask characters. The placeholder character represents the fillable spot in the mask. "),e.qZA(),e.TgZ(5,"tui-doc-example",2),e.YNc(6,N,10,1,"ng-template",null,3,e.W1O),e._UZ(8,"placeholder-doc-example-1"),e.qZA(),e.TgZ(9,"tui-doc-example",4),e.YNc(10,R,23,3,"ng-template",null,5,e.W1O),e._UZ(12,"placeholder-doc-example-2"),e.qZA(),e.TgZ(13,"tui-doc-example",6),e.YNc(14,I,7,0,"ng-template",null,7,e.W1O),e._UZ(16,"placeholder-doc-example-3"),e.qZA()()),2&a){const m=e.MAs(7),u=e.MAs(11),S=e.MAs(15);e.xp6(5),e.Q6J("content",c.cvcExample1)("description",m),e.xp6(4),e.Q6J("content",c.phoneExample2)("description",u),e.xp6(4),e.Q6J("content",c.dateExample3)("description",S)}},dependencies:[f.TuiAddonDocModule,M.qo,M.f2,T.j,T.V,x.rH,k,Q,j],encapsulation:2,changeDetection:0}),n})()}}]);