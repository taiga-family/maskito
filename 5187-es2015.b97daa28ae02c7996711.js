"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[5187],{25187:function(t,e,n){n.r(e),n.d(e,{DateRangeMaskDocModule:function(){return F}});var o=n(12057),a=n(23738),i=n(55358),r=n(42905),u=n(7476),m=n(48681),d=n(82847),l=n(16117),c=n(21673),s=n(64762),p=n(84278),g=n(33770),h=n(44358),y=n(74788),x=(0,p.n9)({mode:"mm/dd/yyyy",separator:"/"}),f=n(81620),P=n(49510),M=n(47258);let C=(()=>{class t{constructor(){this.usDateFormatter=new Intl.DateTimeFormat("en-US",{month:"long",day:"numeric",year:"numeric"}),this.value="09/20/2020\xa0\u2013\xa002/06/2023",this.filler="mm/dd/yyyy\xa0\u2013\xa0mm/dd/yyyy",this.mask=x}get hint(){return this.value.length<this.filler.length?"Complete the date range!":this.value.split("\xa0\u2013\xa0").map(t=>this.usDateFormatter.format(new Date(t))).join("\xa0\u2013\xa0")}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=y.Xpm({type:t,selectors:[["date-range-mask-doc-example-1"]],decls:3,vars:6,consts:[["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"tuiTextfieldFiller","tuiHintContent","ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito"]],template:function(t,e){1&t&&(y.TgZ(0,"tui-input",0),y.NdJ("ngModelChange",function(t){return e.value=t}),y._uU(1," US format "),y._UZ(2,"input",1),y.qZA()),2&t&&(y.Udp("max-width",30,"rem"),y.Q6J("tuiTextfieldFiller",e.filler)("tuiHintContent",e.hint)("ngModel",e.value),y.xp6(2),y.Q6J("maskito",e.mask))},directives:[c.K3,c.wU,l.B7,l.kD,m.bZ,a.JJ,a.On,f.MB,P.F,M.r],encapsulation:2,changeDetection:0}),t})();var U=(0,p.n9)({mode:"dd/mm/yyyy",min:new Date("1711-11-19"),max:new Date("1765-04-15")});let T=(()=>{class t{constructor(){this.value="19.11.1711\xa0\u2013\xa015.04.1765",this.filler="dd.mm.yyyy\xa0\u2013\xa0dd.mm.yyyy",this.mask=U}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=y.Xpm({type:t,selectors:[["date-range-mask-doc-example-2"]],decls:2,vars:6,consts:[["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"tuiTextfieldLabelOutside","tuiTextfieldFiller","ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito"]],template:function(t,e){1&t&&(y.TgZ(0,"tui-input",0),y.NdJ("ngModelChange",function(t){return e.value=t}),y._UZ(1,"input",1),y.qZA()),2&t&&(y.Udp("max-width",30,"rem"),y.Q6J("tuiTextfieldLabelOutside",!0)("tuiTextfieldFiller",e.filler)("ngModel",e.value),y.xp6(1),y.Q6J("maskito",e.mask))},directives:[c.K3,c.wU,l.B7,l.xT,l.kD,a.JJ,a.On,f.MB,P.F,M.r],encapsulation:2,changeDetection:0}),t})();var Z=(0,p.n9)({mode:"dd/mm/yyyy",minLength:{day:3},maxLength:{month:1}});let k=(()=>{class t{constructor(){this.value="01.01.2023\xa0\u2013\xa005.01.2023",this.filler="dd.mm.yyyy\xa0\u2013\xa0dd.mm.yyyy",this.mask=Z,this.hint="The right date must be at least 3 days after the left one.\nAlso, the difference between the dates must not exceed 1 month."}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=y.Xpm({type:t,selectors:[["date-range-mask-doc-example-3"]],decls:2,vars:7,consts:[["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"tuiHintContent","tuiTextfieldLabelOutside","tuiTextfieldFiller","ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito"]],template:function(t,e){1&t&&(y.TgZ(0,"tui-input",0),y.NdJ("ngModelChange",function(t){return e.value=t}),y._UZ(1,"input",1),y.qZA()),2&t&&(y.Udp("max-width",30,"rem"),y.Q6J("tuiHintContent",e.hint)("tuiTextfieldLabelOutside",!0)("tuiTextfieldFiller",e.filler)("ngModel",e.value),y.xp6(1),y.Q6J("maskito",e.mask))},directives:[c.K3,c.wU,l.B7,m.bZ,l.xT,l.kD,a.JJ,a.On,f.MB,P.F,M.r],encapsulation:2,changeDetection:0}),t})();function V(t,e){1&t&&(y._uU(0," Use "),y.TgZ(1,"code"),y._uU(2,"mode"),y.qZA(),y._uU(3," and "),y.TgZ(4,"code"),y._uU(5,"separator"),y.qZA(),y._uU(6," parameters to get a mask with a locale specific representation of dates. "))}function w(t,e){1&t&&(y._uU(0," Parameters "),y.TgZ(1,"code"),y._uU(2,"min"),y.qZA(),y._uU(3," and "),y.TgZ(4,"code"),y._uU(5,"max"),y.qZA(),y._uU(6," allow you to set the earliest and the latest available dates. They accept native "),y.TgZ(7,"a",8),y._uU(8," Date "),y.qZA(),y._uU(9," . "))}function _(t,e){1&t&&(y._uU(0," Use "),y.TgZ(1,"code"),y._uU(2,"minLength"),y.qZA(),y._uU(3," and "),y.TgZ(4,"code"),y._uU(5,"maxLength"),y.qZA(),y._uU(6," parameters to set minimal and maximal length of the date range. "))}function D(t,e){if(1&t&&(y._uU(0," Use "),y.TgZ(1,"code"),y._uU(2,"maskitoDateRangeOptionsGenerator"),y.qZA(),y._uU(3," to create a mask to input a range of dates. "),y.TgZ(4,"tui-doc-example",2),y.YNc(5,V,7,0,"ng-template",null,3,y.W1O),y._UZ(7,"date-range-mask-doc-example-1"),y.qZA(),y.TgZ(8,"tui-doc-example",4),y.YNc(9,w,10,0,"ng-template",null,5,y.W1O),y._UZ(11,"date-range-mask-doc-example-2"),y.qZA(),y.TgZ(12,"tui-doc-example",6),y.YNc(13,_,7,0,"ng-template",null,7,y.W1O),y._UZ(15,"date-range-mask-doc-example-3"),y.qZA()),2&t){const t=y.MAs(6),e=y.MAs(10),n=y.MAs(14),o=y.oxw();y.xp6(4),y.Q6J("content",o.dateLocalizationExample1)("description",t),y.xp6(4),y.Q6J("description",e)("content",o.minMaxExample2),y.xp6(4),y.Q6J("description",n)("content",o.minMaxLengthExample3)}}function J(t,e){if(1&t&&(y.TgZ(0,"tui-input",16),y._uU(1," Enter dates "),y._UZ(2,"input",17),y.qZA()),2&t){const t=y.oxw(2);y.Q6J("tuiTextfieldFiller",t.getPlaceholder(t.mode,t.separator))("formControl",t.apiPageControl),y.xp6(2),y.Q6J("maskito",t.maskitoOptions)}}function O(t,e){1&t&&y._uU(0," Date format mode ")}function L(t,e){1&t&&(y._uU(0," Separator "),y.TgZ(1,"p"),y.TgZ(2,"strong"),y._uU(3,"Default:"),y.qZA(),y.TgZ(4,"code"),y._uU(5,"."),y.qZA(),y._uU(6," (dot). "),y.qZA())}function N(t,e){1&t&&y._uU(0," Earliest date ")}function v(t,e){1&t&&y._uU(0," Latest date ")}function A(t,e){1&t&&y._uU(0," Minimal length of the range ")}function b(t,e){1&t&&y._uU(0," Maximal length of the range ")}function q(t,e){if(1&t){const t=y.EpF();y.TgZ(0,"tui-doc-demo",9),y.YNc(1,J,3,3,"ng-template"),y.qZA(),y.TgZ(2,"tui-doc-documentation"),y.YNc(3,O,1,0,"ng-template",10),y.NdJ("documentationPropertyValueChange",function(e){return y.CHM(t),y.oxw().mode=e})("documentationPropertyValueChange",function(){return y.CHM(t),y.oxw().updateOptions()}),y.YNc(4,L,7,0,"ng-template",11),y.NdJ("documentationPropertyValueChange",function(e){return y.CHM(t),y.oxw().separator=e})("documentationPropertyValueChange",function(){return y.CHM(t),y.oxw().updateOptions()}),y.YNc(5,N,1,0,"ng-template",12),y.NdJ("documentationPropertyValueChange",function(e){return y.CHM(t),y.oxw().minStr=e})("documentationPropertyValueChange",function(){return y.CHM(t),y.oxw().updateDate()}),y.YNc(6,v,1,0,"ng-template",13),y.NdJ("documentationPropertyValueChange",function(e){return y.CHM(t),y.oxw().maxStr=e})("documentationPropertyValueChange",function(){return y.CHM(t),y.oxw().updateDate()}),y.YNc(7,A,1,0,"ng-template",14),y.NdJ("documentationPropertyValueChange",function(e){return y.CHM(t),y.oxw().minLength=e})("documentationPropertyValueChange",function(){return y.CHM(t),y.oxw().updateOptions()}),y.YNc(8,b,1,0,"ng-template",15),y.NdJ("documentationPropertyValueChange",function(e){return y.CHM(t),y.oxw().maxLength=e})("documentationPropertyValueChange",function(){return y.CHM(t),y.oxw().updateOptions()}),y.qZA()}if(2&t){const t=y.oxw();y.Q6J("control",t.apiPageControl),y.xp6(3),y.Q6J("documentationPropertyValues",t.modeOptions)("documentationPropertyValue",t.mode),y.xp6(1),y.Q6J("documentationPropertyValue",t.separator),y.xp6(1),y.Q6J("documentationPropertyValues",t.minMaxOptions)("documentationPropertyValue",t.minStr),y.xp6(1),y.Q6J("documentationPropertyValues",t.minMaxOptions)("documentationPropertyValue",t.maxStr),y.xp6(1),y.Q6J("documentationPropertyValues",t.minLengthOptions)("documentationPropertyValue",t.minLength),y.xp6(1),y.Q6J("documentationPropertyValues",t.maxLengthOptions)("documentationPropertyValue",t.maxLength)}}class Q{constructor(){this.dateLocalizationExample1={MaskitoOptions:n.e(2049).then(n.t.bind(n,82049,17))},this.minMaxExample2={MaskitoOptions:n.e(6901).then(n.t.bind(n,16901,17))},this.minMaxLengthExample3={MaskitoOptions:n.e(6880).then(n.t.bind(n,6880,17))},this.apiPageControl=new a.NI(""),this.modeOptions=["dd/mm/yyyy","mm/dd/yyyy","yyyy/mm/dd"],this.minMaxOptions=["0001-01-01","9999-12-31","2000-01-01","2025-05-10"],this.minLengthOptions=[{day:3},{day:15}],this.maxLengthOptions=[{day:5},{month:1},{year:1}],this.mode=this.modeOptions[0],this.separator=".",this.minStr=this.minMaxOptions[0],this.maxStr=this.minMaxOptions[1],this.min=new Date(this.minStr),this.max=new Date(this.maxStr),this.minLength={},this.maxLength={},this.maskitoOptions=(0,p.n9)(this)}getPlaceholder(t,e){const n=`${g.f$}${g.F}${g.f$}`;return`${t.replace(/\//g,e)}${n}${t.replace(/\//g,e)}`}updateOptions(){this.maskitoOptions=(0,p.n9)(this)}updateDate(){this.min=new Date(this.minStr),this.max=new Date(this.maxStr),this.updateOptions()}}Q.\u0275fac=function(t){return new(t||Q)},Q.\u0275cmp=y.Xpm({type:Q,selectors:[["date-range-mask-doc"]],decls:3,vars:0,consts:[["header","DateRange","package","KIT"],["pageTab",""],["id","date-localization","heading","Date localization",3,"content","description"],["dateLocalizationDescription",""],["id","min-max","heading","Min and max dates",3,"description","content"],["minMaxDescription",""],["id","min-max-length","heading","Min and max length of range",3,"description","content"],["minMaxLengthDescription",""],["tuiLink","","href","https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date","target","_blank"],[3,"control"],["documentationPropertyName","mode","documentationPropertyMode","input","documentationPropertyType","MaskitoDateMode",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","separator","documentationPropertyMode","input","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","min","documentationPropertyMode","input","documentationPropertyType","Date",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","max","documentationPropertyMode","input","documentationPropertyType","Date",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","minLength","documentationPropertyMode","input","documentationPropertyType","MaskitoDateSegments<number>",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","maxLength","documentationPropertyMode","input","documentationPropertyType","MaskitoDateSegments<number>",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"tuiTextfieldFiller","formControl"],["tuiTextfield","","inputmode","numeric",3,"maskito"]],template:function(t,e){1&t&&(y.TgZ(0,"tui-doc-page",0),y.YNc(1,D,16,6,"ng-template",1),y.YNc(2,q,9,12,"ng-template",1),y.qZA())},directives:[u.qo,u.nj,u.f2,C,T,k,d.V,u.FU,u.zb,u.B7,c.K3,c.wU,l.B7,l.kD,a.JJ,a.oH,f.MB,P.F,M.r],encapsulation:2,changeDetection:0}),(0,s.gn)([h.UM],Q.prototype,"getPlaceholder",null);let F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=y.oAB({type:t}),t.\u0275inj=y.cJS({imports:[[o.ez,a.u5,a.UX,r.U5,u.fV,m.go,c.Qf,d.j,l.cn,i.Bz.forChild((0,u.Ve)(Q))]]}),t})()}}]);