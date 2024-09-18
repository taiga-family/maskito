"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[3298],{3298:(O,g,i)=>{i.r(g),i.d(g,{default:()=>N});var s=i(8832),D=i(1760),u=i(8844),d=i(168),h=i(7355),p=i(6801),l=i(4225);const f=(0,d.GH)({mode:"yyyy/mm/dd",separator:"/"});var t=i(2978),_=i(5014);let k=(()=>{var e;class m{constructor(){this.value="2005/10/21",this.filler="yyyy/mm/dd",this.mask=f}}return(e=m).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["date-mask-doc-example-1"]],standalone:!0,features:[t.aNF],decls:3,vars:5,consts:[["tuiTextfieldCustomContent","@tui.calendar",3,"tuiTextfieldFiller","ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(o,n){1&o&&(t.j41(0,"tui-input",0),t.bIt("ngModelChange",function(y){return n.value=y}),t.EFF(1," Localization "),t.nrm(2,"input",1),t.k0s()),2&o&&(t.xc7("max-width",30,"rem"),t.Y8G("tuiTextfieldFiller",n.filler)("ngModel",n.value),t.R7$(2),t.Y8G("maskito",n.mask))},dependencies:[s.YN,s.BC,s.vS,u.u,p.zi,p.mp,p.Ws,_.Bw,l.CN,l.Rd,l.V4],encapsulation:2,changeDetection:0}),m})();const C=(0,d.GH)({mode:"dd/mm/yyyy",min:new Date(2e3,0,1),max:new Date(2025,4,10)});let x=(()=>{var e;class m{constructor(){this.value="20.01.2023",this.filler="dd.mm.yyyy",this.mask=C}}return(e=m).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["date-mask-doc-example-2"]],standalone:!0,features:[t.aNF],decls:3,vars:5,consts:[["tuiTextfieldCustomContent","@tui.calendar",3,"tuiTextfieldFiller","ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(o,n){1&o&&(t.j41(0,"tui-input",0),t.bIt("ngModelChange",function(y){return n.value=y}),t.EFF(1," Date "),t.nrm(2,"input",1),t.k0s()),2&o&&(t.xc7("max-width",30,"rem"),t.Y8G("tuiTextfieldFiller",n.filler)("ngModel",n.value),t.R7$(2),t.Y8G("maskito",n.mask))},dependencies:[s.YN,s.BC,s.vS,u.u,p.zi,p.mp,p.Ws,_.Bw,l.CN,l.Rd,l.V4],encapsulation:2,changeDetection:0}),m})();var c=i(1872);function F(e,m){1&e&&(t.EFF(0," Use "),t.j41(1,"code"),t.EFF(2,"mode"),t.k0s(),t.EFF(3," and "),t.j41(4,"code"),t.EFF(5,"separator"),t.k0s(),t.EFF(6," properties to get a mask with a locale specific representation of dates. "))}function M(e,m){1&e&&(t.EFF(0," Properties "),t.j41(1,"code"),t.EFF(2,"min"),t.k0s(),t.EFF(3," and "),t.j41(4,"code"),t.EFF(5,"max"),t.k0s(),t.EFF(6," allow you to set the earliest and the latest available dates. They accept native "),t.j41(7,"a",6),t.EFF(8," Date "),t.k0s(),t.EFF(9," . "))}function P(e,m){if(1&e&&(t.EFF(0," Use "),t.j41(1,"code"),t.EFF(2,"maskitoDateOptionsGenerator"),t.k0s(),t.EFF(3," to create a mask for date input. "),t.j41(4,"tui-doc-example",2),t.DNE(5,F,7,0,"ng-template",null,3,t.C5r),t.nrm(7,"date-mask-doc-example-1"),t.k0s(),t.j41(8,"tui-doc-example",4),t.DNE(9,M,10,0,"ng-template",null,5,t.C5r),t.nrm(11,"date-mask-doc-example-2"),t.k0s()),2&e){const a=t.sdS(6),o=t.sdS(10),n=t.XpG();t.R7$(4),t.Y8G("content",n.dateLocalization)("description",a),t.R7$(4),t.Y8G("content",n.dateMinMax)("description",o)}}function E(e,m){if(1&e&&(t.j41(0,"tui-input",12),t.EFF(1," Enter date "),t.nrm(2,"input",13),t.k0s()),2&e){const a=t.XpG(2);t.Y8G("formControl",a.apiPageControl),t.R7$(2),t.Y8G("maskito",a.maskitoOptions)}}function V(e,m){1&e&&t.EFF(0," Date format mode ")}function T(e,m){1&e&&(t.EFF(0," Symbol for separating date-segments (days, months, years) "),t.j41(1,"p",14)(2,"strong"),t.EFF(3,"Default:"),t.k0s(),t.j41(4,"code"),t.EFF(5,"."),t.k0s(),t.EFF(6," (dot) "),t.k0s())}function j(e,m){1&e&&(t.EFF(0," Earliest date "),t.j41(1,"p",14)(2,"strong"),t.EFF(3,"Default:"),t.k0s(),t.j41(4,"code"),t.EFF(5,"new Date('0001-01-01')"),t.k0s()())}function v(e,m){1&e&&(t.EFF(0," Latest date "),t.j41(1,"p",14)(2,"strong"),t.EFF(3,"Default:"),t.k0s(),t.j41(4,"code"),t.EFF(5,"new Date('9999-12-31')"),t.k0s()())}function G(e,m){if(1&e){const a=t.RV6();t.j41(0,"tui-doc-demo",7),t.DNE(1,E,3,2,"ng-template"),t.k0s(),t.j41(2,"tui-doc-documentation"),t.DNE(3,V,1,0,"ng-template",8),t.bIt("documentationPropertyValueChange",function(n){t.eBV(a);const r=t.XpG();return t.Njj(r.mode=n)})("documentationPropertyValueChange",function(){t.eBV(a);const n=t.XpG();return t.Njj(n.updateOptions())}),t.DNE(4,T,7,0,"ng-template",9),t.bIt("documentationPropertyValueChange",function(n){t.eBV(a);const r=t.XpG();return t.Njj(r.separator=n)})("documentationPropertyValueChange",function(){t.eBV(a);const n=t.XpG();return t.Njj(n.updateOptions())}),t.DNE(5,j,6,0,"ng-template",10),t.bIt("documentationPropertyValueChange",function(n){t.eBV(a);const r=t.XpG();return t.Njj(r.minStr=n)})("documentationPropertyValueChange",function(){t.eBV(a);const n=t.XpG();return t.Njj(n.updateDate())}),t.DNE(6,v,6,0,"ng-template",11),t.bIt("documentationPropertyValueChange",function(n){t.eBV(a);const r=t.XpG();return t.Njj(r.maxStr=n)})("documentationPropertyValueChange",function(){t.eBV(a);const n=t.XpG();return t.Njj(n.updateDate())}),t.k0s()}if(2&e){const a=t.XpG();t.Y8G("control",a.apiPageControl),t.R7$(3),t.Y8G("documentationPropertyValues",a.modeOptions)("documentationPropertyValue",a.mode),t.R7$(1),t.Y8G("documentationPropertyValues",a.separatorOptions)("documentationPropertyValue",a.separator),t.R7$(1),t.Y8G("documentationPropertyValues",a.minMaxOptions)("documentationPropertyValue",a.minStr),t.R7$(1),t.Y8G("documentationPropertyValues",a.minMaxOptions)("documentationPropertyValue",a.maxStr)}}const N=(()=>{var e;class m{constructor(){this.apiPageControl=new s.MJ(""),this.dateLocalization={[D.w.MaskitoOptions]:i.e(3989).then(i.t.bind(i,3989,17))},this.dateMinMax={[D.w.MaskitoOptions]:i.e(1270).then(i.t.bind(i,1270,17))},this.modeOptions=["dd/mm/yyyy","mm/dd/yyyy","yyyy/mm/dd","mm/yy","mm/yyyy","yyyy/mm","yyyy"],this.separatorOptions=[".","/","-"],this.minMaxOptions=["0001-01-01","9999-12-31","2000-01-01","2025-05-10"],this.minStr=this.minMaxOptions[0],this.maxStr=this.minMaxOptions[1],this.mode=this.modeOptions[0],this.separator=this.separatorOptions[0],this.min=new Date(this.minStr),this.max=new Date(this.maxStr),this.maskitoOptions=(0,d.GH)(this)}updateDate(){this.min=new Date(this.minStr),this.max=new Date(this.maxStr),this.updateOptions()}updateOptions(){this.maskitoOptions=(0,d.GH)(this)}}return(e=m).\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.VBU({type:e,selectors:[["date-mask-doc"]],standalone:!0,features:[t.aNF],decls:3,vars:0,consts:[["header","Date","package","KIT"],["pageTab",""],["id","date-localization","heading","Date localization",3,"content","description"],["dateLocalizationDescription",""],["id","min-max","heading","Min/Max",3,"content","description"],["minMaxDescription",""],["href","https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date","rel","noreferrer","target","_blank","tuiLink",""],[3,"control"],["documentationPropertyMode","input","documentationPropertyName","mode","documentationPropertyType","MaskitoDateMode",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","separator","documentationPropertyType","string",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","min","documentationPropertyType","Date",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","max","documentationPropertyType","Date",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["tuiTextfieldCustomContent","@tui.calendar",1,"input-date",3,"formControl"],["inputmode","numeric","tuiTextfieldLegacy","",3,"maskito"],[1,"tui-space_bottom-0"]],template:function(o,n){1&o&&(t.j41(0,"tui-doc-page",0),t.DNE(1,P,12,4,"ng-template",1),t.DNE(2,G,7,9,"ng-template",1),t.k0s())},dependencies:[k,x,u.u,s.X1,s.BC,s.l_,c.aD,c.FS,c.FC,c.df,c.e3,c.ic,p.zi,p.mp,p.Ws,_.Bw,h.Jc,l.CN,l.Rd],styles:[".input-date[_ngcontent-%COMP%]{max-inline-size:25rem}.input-date[_ngcontent-%COMP%]:not(:last-child){margin-bottom:1rem}"],changeDetection:0}),m})()}}]);