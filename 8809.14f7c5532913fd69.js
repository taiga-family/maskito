"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[8809],{8809:(y,g,o)=>{o.r(g),o.d(g,{default:()=>V});var F=o(4768),p=o(1760),f=o(7355),l=o(8832),u=o(8844),i=o(6801),r=o(4225),d=o(168);const T={...(0,d.Um)("xxx"),mask:/^\d{0,3}$/};var e=o(2978),x=o(5014);let M=(()=>{var t;class n{constructor(){this.maskitoOptions=T,this.value="xxx"}}return(t=n).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["placeholder-doc-example-1"]],standalone:!0,features:[e.aNF],decls:3,vars:4,consts:[["tuiTextfieldCustomContent","@tui.credit-card",3,"ngModel","ngModelChange"],["inputmode","numeric","tuiTextfieldLegacy","",3,"maskito"]],template:function(a,c){1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(m){return c.value=m}),e.EFF(1," Enter CVC code "),e.nrm(2,"input",1),e.k0s()),2&a&&(e.xc7("max-width",20,"rem"),e.Y8G("ngModel",c.value),e.R7$(2),e.Y8G("maskito",c.maskitoOptions))},dependencies:[l.YN,l.BC,l.vS,u.u,i.zi,i.mp,i.Ws,x.Bw,r.CN,r.Rd],encapsulation:2,changeDetection:0}),n})();var j=o(2176),P=o(1860);const k="+\u2000 (\u2000\u2000\u2000) ___-____",{removePlaceholder:$,plugins:G,...D}=(0,d.Um)(k),O={preprocessors:D.preprocessors,postprocessors:[(0,d.Kf)("+1"),...D.postprocessors],mask:["+","1"," ","(",/\d/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/],plugins:[...G,(0,d.hK)("focus",t=>{const n=t.value||"+1 (";(0,P.Gq)(t,n+k.slice(n.length))}),(0,d.hK)("blur",t=>{const n=$(t.value);(0,P.Gq)(t,"+1"===n?"":n)})]};function L(t,n){1&t&&(e.nrm(0,"img",3),e.nI1(1,"tuiFlag")),2&t&&(e.xc7("border-radius",50,"%"),e.Y8G("src",e.bMT(1,3,"US"),e.B4B))}let R=(()=>{var t;class n{constructor(){this.maskitoOptions=O,this.value=""}}return(t=n).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["placeholder-doc-example-2"]],standalone:!0,features:[e.aNF],decls:5,vars:5,consts:[[3,"tuiTextfieldCustomContent","ngModel","ngModelChange"],["inputmode","tel","tuiTextfieldLegacy","",3,"maskito"],["usFlag",""],["alt","Flag of the United States","width","28",3,"src"]],template:function(a,c){if(1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(m){return c.value=m}),e.EFF(1," Enter US phone number "),e.nrm(2,"input",1),e.DNE(3,L,2,5,"ng-template",null,2,e.C5r),e.k0s()),2&a){const h=e.sdS(4);e.xc7("max-width",20,"rem"),e.Y8G("tuiTextfieldCustomContent",h)("ngModel",c.value),e.R7$(2),e.Y8G("maskito",c.maskitoOptions)}},dependencies:[l.YN,l.BC,l.vS,u.u,j.d,i.zi,i.mp,i.Ws,x.Bw,r.CN,r.Rd],encapsulation:2,changeDetection:0}),n})();const E=(0,d.GH)({mode:"dd/mm/yyyy",separator:"/"}),{plugins:B,...v}=(0,d.Um)("dd/mm/yyyy",!0),N={...E,plugins:B.concat(E.plugins||[]),preprocessors:[...v.preprocessors,...E.preprocessors],postprocessors:[...E.postprocessors,...v.postprocessors]};let U=(()=>{var t;class n{constructor(){this.maskitoOptions=N,this.value=""}}return(t=n).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["placeholder-doc-example-3"]],standalone:!0,features:[e.aNF],decls:3,vars:4,consts:[["tuiTextfieldCustomContent","@tui.calendar",3,"ngModel","ngModelChange"],["inputmode","numeric","tuiTextfieldLegacy","",3,"maskito"]],template:function(a,c){1&a&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(m){return c.value=m}),e.EFF(1," Enter date "),e.nrm(2,"input",1),e.k0s()),2&a&&(e.xc7("max-width",20,"rem"),e.Y8G("ngModel",c.value),e.R7$(2),e.Y8G("maskito",c.maskitoOptions))},dependencies:[l.YN,l.BC,l.vS,u.u,i.zi,i.mp,i.Ws,x.Bw,r.CN,r.Rd],encapsulation:2,changeDetection:0}),n})();var C=o(1872);function S(t,n){if(1&t&&(e.j41(0,"p",8),e.EFF(1," This example is the simplest demonstration how to create masked input with "),e.j41(2,"strong"),e.EFF(3,"placeholder"),e.k0s(),e.EFF(4," . "),e.k0s(),e.j41(5,"p",9),e.EFF(6," The only required prerequisite is basic understanding of "),e.j41(7,"a",10),e.EFF(8,' "Mask\xa0expression" '),e.k0s(),e.EFF(9," concept. "),e.k0s()),2&t){const s=e.XpG();e.R7$(7),e.Y8G("routerLink",s.maskExpressionDocPage)}}function W(t,n){if(1&t&&(e.j41(0,"p",8),e.EFF(1," The following example explains return type of "),e.j41(2,"code"),e.EFF(3,"maskitoWithPlaceholder"),e.k0s(),e.EFF(4," utility \u2014 an\xa0object which partially implements "),e.j41(5,"code"),e.EFF(6,"MaskitoOptions"),e.k0s(),e.EFF(7," interface. It contains its own "),e.j41(8,"a",10),e.EFF(9," processor and postprocessor "),e.k0s(),e.EFF(10," and "),e.j41(11,"a",10),e.EFF(12," plugins "),e.k0s(),e.EFF(13," to keep caret from getting into placeholder part of the value. "),e.k0s(),e.nrm(14,"p",8),e.j41(15,"p",9),e.EFF(16," Also, this complex example uses built-in postprocessor "),e.j41(17,"a",11),e.EFF(18," maskitoPrefixPostprocessorGenerator "),e.k0s(),e.EFF(19," from "),e.j41(20,"code"),e.EFF(21,"@maskito/kit"),e.k0s(),e.EFF(22," . "),e.k0s()),2&t){const s=e.XpG();e.R7$(8),e.Y8G("routerLink",s.processorsDocPage),e.R7$(3),e.Y8G("routerLink",s.pluginsDocPage),e.R7$(6),e.Y8G("routerLink",s.prefixDocPage)}}function _(t,n){1&t&&(e.EFF(0," This last example demonstrates how to integrate "),e.j41(1,"code"),e.EFF(2,"maskitoWithPlaceholder"),e.k0s(),e.EFF(3," with any built-in mask from "),e.j41(4,"code"),e.EFF(5,"@maskito/kit"),e.k0s(),e.EFF(6," . "))}const V=(()=>{var t;class n{constructor(){this.maskExpressionDocPage="/".concat(p.$.MaskExpression),this.processorsDocPage="/".concat(p.$.Processors),this.pluginsDocPage="/".concat(p.$.Plugins),this.prefixDocPage="/".concat(p.$.Prefix),this.cvcExample1={[p.w.MaskitoOptions]:o.e(9752).then(o.t.bind(o,9752,17))},this.phoneExample2={[p.w.MaskitoOptions]:o.e(6805).then(o.t.bind(o,6805,17))},this.dateExample3={[p.w.MaskitoOptions]:o.e(118).then(o.t.bind(o,118,17))}}}return(t=n).\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["placeholder-doc"]],standalone:!0,features:[e.aNF],decls:17,vars:6,consts:[["header","With placeholder","package","Recipes"],[1,"tui-space_top-0"],["id","cvc","heading","Card Verification Code",3,"content","description"],["cvcDescription",""],["id","phone","heading","Phone",3,"content","description"],["phoneDescription",""],["id","date","heading","Date",3,"content","description"],["dateExampleDescription",""],[1,"tui-space_top-0","tui-space_bottom-2"],[1,"tui-space_top-0","tui-space_bottom-0"],["tuiLink","",3,"routerLink"],["fragment","by-postprocessor","tuiLink","",3,"routerLink"]],template:function(a,c){if(1&a&&(e.j41(0,"tui-doc-page",0)(1,"p",1)(2,"code"),e.EFF(3,"maskitoWithPlaceholder"),e.k0s(),e.EFF(4," helps to show placeholder mask characters. The placeholder character represents the fillable spot in the mask. "),e.k0s(),e.j41(5,"tui-doc-example",2),e.DNE(6,S,10,1,"ng-template",null,3,e.C5r),e.nrm(8,"placeholder-doc-example-1"),e.k0s(),e.j41(9,"tui-doc-example",4),e.DNE(10,W,23,3,"ng-template",null,5,e.C5r),e.nrm(12,"placeholder-doc-example-2"),e.k0s(),e.j41(13,"tui-doc-example",6),e.DNE(14,_,7,0,"ng-template",null,7,e.C5r),e.nrm(16,"placeholder-doc-example-3"),e.k0s()()),2&a){const h=e.sdS(7),m=e.sdS(11),A=e.sdS(15);e.R7$(5),e.Y8G("content",c.cvcExample1)("description",h),e.R7$(4),e.Y8G("content",c.phoneExample2)("description",m),e.R7$(4),e.Y8G("content",c.dateExample3)("description",A)}},dependencies:[M,R,U,F.Wk,C.FS,C.e3,f.Jc],encapsulation:2,changeDetection:0}),n})()},2176:(y,g,o)=>{o.d(g,{d:()=>f});var F=o(2978),p=o(656);let f=(()=>{var l;class u{constructor(){this.staticPath=(0,F.WQX)(p.xH)}transform(r){return r?"".concat(this.staticPath,"/flags/").concat(r.toLowerCase(),".svg"):null}}return(l=u).\u0275fac=function(r){return new(r||l)},l.\u0275pipe=F.EJ8({name:"tuiFlag",type:l,pure:!0,standalone:!0}),u})()}}]);