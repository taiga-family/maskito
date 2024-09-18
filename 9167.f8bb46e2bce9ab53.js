"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[9167],{9167:(L,v,o)=>{o.r(v),o.d(v,{default:()=>Y});var x=o(4768),m=o(1760),E=o(7355),O=o(901),r=o(8832),p=o(8844),u=o(6973),c=o(4225);const w={mask:/^[^\u0430-\u044f\u0451]+$/i,overwriteMode:({value:t})=>/^\d+$/.test(t)?"replace":"shift"};var e=o(2978),h=o(5014);let M=(()=>{var t;class i{constructor(){this.maskitoOptions=w,this.initialValue='This artificial example demonstrates the usage of dynamic mode. If this textarea contains only digits \u2014 "replace" mode is enabled. Otherwise, "shift" mode is enabled.'}}return(t=i).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["overwrite-mode-dynamic-doc-example-3"]],standalone:!0,features:[e.aNF],decls:2,vars:6,consts:[[3,"expandable","ngModel","tuiTextfieldLabelOutside"],["tuiTextfieldLegacy","",3,"maskito"]],template:function(n,a){1&n&&(e.j41(0,"tui-textarea",0),e.nrm(1,"textarea",1),e.k0s()),2&n&&(e.xc7("max-width",20,"rem"),e.Y8G("expandable",!0)("ngModel",a.initialValue)("tuiTextfieldLabelOutside",!0),e.R7$(1),e.Y8G("maskito",a.maskitoOptions))},dependencies:[r.YN,r.BC,r.vS,p.u,u.bC,u.IU,u.Ih,h.Bw,c.CN,c.kf],encapsulation:2,changeDetection:0}),i})();var l=o(6801);const k={mask:/^\d+$/,overwriteMode:"replace"};var g=o(9131);let D=(()=>{var t;class i{constructor(){this.maskitoOptions=k,this.value="0000"}}return(t=i).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["overwrite-mode-replace-doc-example-2"]],standalone:!0,features:[e.aNF],decls:2,vars:5,consts:[["tuiHintContent","Insert character somewhere in the middle",3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(n,a){1&n&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(d){return a.value=d}),e.nrm(1,"input",1),e.k0s()),2&n&&(e.xc7("max-width",20,"rem"),e.Y8G("tuiTextfieldLabelOutside",!0)("ngModel",a.value),e.R7$(1),e.Y8G("maskito",a.maskitoOptions))},dependencies:[r.YN,r.BC,r.vS,p.u,g.bk,l.zi,l.mp,l.Ws,h.Bw,c.CN,c.kf],encapsulation:2,changeDetection:0}),i})();const y={mask:/^\d+$/,overwriteMode:"shift"};let C=(()=>{var t;class i{constructor(){this.maskitoOptions=y,this.value="0000"}}return(t=i).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["overwrite-mode-shift-doc-example-1"]],standalone:!0,features:[e.aNF],decls:2,vars:5,consts:[["tuiHintContent","Insert character somewhere in the middle",3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(n,a){1&n&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(d){return a.value=d}),e.nrm(1,"input",1),e.k0s()),2&n&&(e.xc7("max-width",20,"rem"),e.Y8G("tuiTextfieldLabelOutside",!0)("ngModel",a.value),e.R7$(1),e.Y8G("maskito",a.maskitoOptions))},dependencies:[r.YN,r.BC,r.vS,p.u,g.bk,l.zi,l.mp,l.Ws,h.Bw,c.CN,c.kf],encapsulation:2,changeDetection:0}),i})();var F=o(1872);function T(t,i){1&t&&(e.EFF(0," The classic mode that everyone is used to. Inserting a new character in the middle of the text field value "),e.j41(1,"strong"),e.EFF(2,"shifts"),e.k0s(),e.EFF(3," all following characters to the right. "))}function j(t,i){1&t&&(e.EFF(0," All new inserted characters "),e.j41(1,"strong"),e.EFF(2,"replace"),e.k0s(),e.EFF(3," the old characters at the same position. No character shifts. The length of the value remains the same after inserting new character somewhere in middle of the text field. "))}function N(t,i){if(1&t&&(e.EFF(0," Parameter "),e.j41(1,"code"),e.EFF(2,"overwriteMode"),e.k0s(),e.EFF(3," also accepts function that will called before each insertion of new characters. This function has one argument \u2014 current element state (read more about it in the "),e.j41(4,"a",10),e.EFF(5,' "Element\xa0state" '),e.k0s(),e.EFF(6," section). And this function should return one of two possible values: "),e.j41(7,"code"),e.EFF(8,"shift"),e.k0s(),e.EFF(9," or "),e.j41(10,"code"),e.EFF(11,"replace"),e.k0s(),e.EFF(12," . ")),2&t){const s=e.XpG();e.R7$(4),e.Y8G("routerLink",s.elementStateDocPage)}}const Y=(()=>{var t;class i{constructor(){this.shiftExample={[m.w.MaskitoOptions]:o.e(1291).then(o.t.bind(o,1291,17))},this.replaceExample={[m.w.MaskitoOptions]:o.e(2575).then(o.t.bind(o,2575,17))},this.dynamicExample={[m.w.MaskitoOptions]:o.e(1320).then(o.t.bind(o,1320,17))},this.elementStateDocPage="/".concat(m.$.ElementState)}}return(t=i).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["overwrite-mode-doc-page"]],standalone:!0,features:[e.aNF],decls:38,vars:6,consts:[["header","Overwrite mode"],[1,"tui-space_top-0"],[1,"tui-list"],[1,"tui-list__item"],["id","shift","heading","Shift mode",3,"content","description"],["shiftModeDescription",""],["id","replace","heading","Replace mode",3,"content","description"],["replaceModeDescription",""],["id","dynamic","heading","Dynamically detected mode",3,"content","description"],["dynamicModeDescription",""],["tuiLink","",3,"routerLink"]],template:function(n,a){if(1&n&&(e.j41(0,"tui-doc-page",0)(1,"p",1)(2,"strong"),e.EFF(3,"Overwrite mode"),e.k0s(),e.EFF(4," regulates behaviour of the mask when user inserts a new character somewhere in the middle of text field, overwriting the character at the current index. "),e.k0s(),e.j41(5,"section")(6,"p")(7,"code"),e.EFF(8,"overwriteMode"),e.k0s(),e.EFF(9," can be of a following type: "),e.k0s(),e.j41(10,"ul",2)(11,"li",3)(12,"code"),e.EFF(13,"shift"),e.k0s(),e.EFF(14," (default) "),e.k0s(),e.j41(15,"li",3)(16,"code"),e.EFF(17,"replace"),e.k0s()(),e.j41(18,"li",3),e.EFF(19," function that receives element state as an argument and returns "),e.j41(20,"code"),e.EFF(21,"shift"),e.k0s(),e.EFF(22," or "),e.j41(23,"code"),e.EFF(24,"replace"),e.k0s()()()(),e.j41(25,"tui-doc-example",4),e.DNE(26,T,4,0,"ng-template",null,5,e.C5r),e.nrm(28,"overwrite-mode-shift-doc-example-1"),e.k0s(),e.j41(29,"tui-doc-example",6),e.DNE(30,j,4,0,"ng-template",null,7,e.C5r),e.nrm(32,"overwrite-mode-replace-doc-example-2"),e.k0s(),e.j41(33,"tui-doc-example",8),e.DNE(34,N,13,1,"ng-template",null,9,e.C5r),e.nrm(36,"overwrite-mode-dynamic-doc-example-3"),e.k0s(),e.nrm(37,"next-steps"),e.k0s()),2&n){const f=e.sdS(27),d=e.sdS(31),$=e.sdS(35);e.R7$(25),e.Y8G("content",a.shiftExample)("description",f),e.R7$(4),e.Y8G("content",a.replaceExample)("description",d),e.R7$(4),e.Y8G("content",a.dynamicExample)("description",$)}},dependencies:[O.g,C,D,M,x.Wk,F.FS,F.e3,E.Jc],encapsulation:2,changeDetection:0}),i})()}}]);