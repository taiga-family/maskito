!function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(a=o.key,i=void 0,"symbol"==typeof(i=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,e||"default");if("object"!=typeof o)return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(a,"string"))?i:String(i)),o)}var a,i}function e(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[4886],{44886:function(t,o,a){a.r(o),a.d(o,{DateTimeMaskDocModule:function(){return A}});var i,r=a(12057),u=a(23738),d=a(55358),c=a(42905),m=a(7476),p=a(82847),l=a(16117),s=a(21673),y=a(64762),f=a(84278),h=a(33770),g=a(44358),M=a(74788),x=(0,f.H$)({dateMode:"mm/dd/yyyy",timeMode:"HH:MM",dateSeparator:"/"}),P=a(81620),T=a(49510),C=a(47258),U=((i=e(function t(){n(this,t),this.value="09/20/2020, 15:30",this.filler="mm/dd/yyyy, hh:mm",this.mask=x})).\u0275fac=function(t){return new(t||i)},i.\u0275cmp=M.Xpm({type:i,selectors:[["date-time-mask-doc-example-1"]],decls:3,vars:5,consts:[["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"tuiTextfieldFiller","ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito"]],template:function(t,e){1&t&&(M.TgZ(0,"tui-input",0),M.NdJ("ngModelChange",function(t){return e.value=t}),M._uU(1," Localization "),M._UZ(2,"input",1),M.qZA()),2&t&&(M.Udp("max-width",30,"rem"),M.Q6J("tuiTextfieldFiller",e.filler)("ngModel",e.value),M.xp6(2),M.Q6J("maskito",e.mask))},directives:[s.K3,s.wU,l.B7,l.kD,u.JJ,u.On,P.MB,T.F,C.r],encapsulation:2,changeDetection:0}),i),k=(0,f.H$)({dateMode:"dd/mm/yyyy",timeMode:"HH:MM",dateSeparator:"-",min:new Date(2010,1,15,12,30,0),max:new Date(2020,8,15,18,30,0)}),v=function(){var t=e(function t(){n(this,t),this.value="09-01-2018,\xa015:30",this.filler="dd-mm-yyyy,\xa0hh:mm",this.mask=k});return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=M.Xpm({type:t,selectors:[["date-time-mask-doc-example-2"]],decls:3,vars:5,consts:[["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"tuiTextfieldFiller","ngModel","ngModelChange"],["tuiTextfield","","inputmode","decimal",3,"maskito"]],template:function(t,e){1&t&&(M.TgZ(0,"tui-input",0),M.NdJ("ngModelChange",function(t){return e.value=t}),M._uU(1," Min-max "),M._UZ(2,"input",1),M.qZA()),2&t&&(M.Udp("max-width",30,"rem"),M.Q6J("tuiTextfieldFiller",e.filler)("ngModel",e.value),M.xp6(2),M.Q6J("maskito",e.mask))},directives:[s.K3,s.wU,l.B7,l.kD,u.JJ,u.On,P.MB,T.F,C.r],encapsulation:2,changeDetection:0}),t}();function Z(t,e){1&t&&(M._uU(0," Use "),M.TgZ(1,"code"),M._uU(2,"dateMode"),M.qZA(),M._uU(3," , "),M.TgZ(4,"code"),M._uU(5,"timeMode"),M.qZA(),M._uU(6," and "),M.TgZ(7,"code"),M._uU(8,"dateSeparator"),M.qZA(),M._uU(9," parameters to get a mask with a locale specific representation of dates. "))}function w(t,e){1&t&&(M._uU(0," Parameters "),M.TgZ(1,"code"),M._uU(2,"min"),M.qZA(),M._uU(3," and "),M.TgZ(4,"code"),M._uU(5,"max"),M.qZA(),M._uU(6," allow to set the earliest and the latest available dates. They accept native "),M.TgZ(7,"a",6),M._uU(8," Date "),M.qZA(),M._uU(9," . "))}function V(t,e){if(1&t&&(M._uU(0," Use "),M.TgZ(1,"code"),M._uU(2,"maskitoDateTimeOptionsGenerator"),M.qZA(),M._uU(3," to create a mask to input both date and time. "),M.TgZ(4,"tui-doc-example",2),M.YNc(5,Z,10,0,"ng-template",null,3,M.W1O),M._UZ(7,"date-time-mask-doc-example-1"),M.qZA(),M.TgZ(8,"tui-doc-example",4),M.YNc(9,w,10,0,"ng-template",null,5,M.W1O),M._UZ(11,"date-time-mask-doc-example-2"),M.qZA()),2&t){var n=M.MAs(6),o=M.MAs(10),a=M.oxw();M.xp6(4),M.Q6J("content",a.dateTimeLocalization)("description",n),M.xp6(4),M.Q6J("content",a.dateTimeMinMax)("description",o)}}function _(t,e){if(1&t&&(M.TgZ(0,"tui-input",13),M._uU(1," Enter date and time "),M._UZ(2,"input",14),M.qZA()),2&t){var n=M.oxw(2);M.Q6J("tuiTextfieldFiller",n.getPlaceholder(n.dateMode,n.timeMode,n.dateSeparator))("formControl",n.apiPageControl),M.xp6(2),M.Q6J("maskito",n.maskitoOptions)}}function S(t,e){1&t&&M._uU(0," Date format mode ")}function D(t,e){1&t&&M._uU(0," Time format mode ")}function J(t,e){1&t&&(M._uU(0," Date separator "),M.TgZ(1,"p"),M.TgZ(2,"strong"),M._uU(3,"Default:"),M.qZA(),M.TgZ(4,"code"),M._uU(5,"."),M.qZA(),M._uU(6," (dot). "),M.qZA())}function O(t,e){1&t&&M._uU(0," Earliest date ")}function H(t,e){1&t&&M._uU(0," Latest date ")}function b(t,e){if(1&t){var n=M.EpF();M.TgZ(0,"tui-doc-demo",7),M.YNc(1,_,3,3,"ng-template"),M.qZA(),M.TgZ(2,"tui-doc-documentation"),M.YNc(3,S,1,0,"ng-template",8),M.NdJ("documentationPropertyValueChange",function(t){return M.CHM(n),M.oxw().dateMode=t})("documentationPropertyValueChange",function(){return M.CHM(n),M.oxw().updateOptions()}),M.YNc(4,D,1,0,"ng-template",9),M.NdJ("documentationPropertyValueChange",function(t){return M.CHM(n),M.oxw().timeMode=t})("documentationPropertyValueChange",function(){return M.CHM(n),M.oxw().updateOptions()}),M.YNc(5,J,7,0,"ng-template",10),M.NdJ("documentationPropertyValueChange",function(t){return M.CHM(n),M.oxw().dateSeparator=t})("documentationPropertyValueChange",function(){return M.CHM(n),M.oxw().updateOptions()}),M.YNc(6,O,1,0,"ng-template",11),M.NdJ("documentationPropertyValueChange",function(t){return M.CHM(n),M.oxw().minStr=t})("documentationPropertyValueChange",function(){return M.CHM(n),M.oxw().updateDate()}),M.YNc(7,H,1,0,"ng-template",12),M.NdJ("documentationPropertyValueChange",function(t){return M.CHM(n),M.oxw().maxStr=t})("documentationPropertyValueChange",function(){return M.CHM(n),M.oxw().updateDate()}),M.qZA()}if(2&t){var o=M.oxw();M.Q6J("control",o.apiPageControl),M.xp6(3),M.Q6J("documentationPropertyValues",o.dateModeOptions)("documentationPropertyValue",o.dateMode),M.xp6(1),M.Q6J("documentationPropertyValues",o.timeModeOptions)("documentationPropertyValue",o.timeMode),M.xp6(1),M.Q6J("documentationPropertyValue",o.dateSeparator),M.xp6(1),M.Q6J("documentationPropertyValues",o.minMaxOptions)("documentationPropertyValue",o.minStr),M.xp6(1),M.Q6J("documentationPropertyValues",o.minMaxOptions)("documentationPropertyValue",o.maxStr)}}var N=function(){function t(){n(this,t),this.dateTimeLocalization={MaskitoOptions:a.e(4338).then(a.t.bind(a,24338,17))},this.dateTimeMinMax={MaskitoOptions:a.e(6793).then(a.t.bind(a,6793,17))},this.apiPageControl=new u.NI(""),this.dateModeOptions=["dd/mm/yyyy","mm/dd/yyyy","yyyy/mm/dd"],this.timeModeOptions=["HH:MM","HH:MM:SS","HH:MM:SS.MSS"],this.minMaxOptions=["0001-01-01T00:00:00","9999-12-31T23:59:59","2000-01-01T12:30","2025-05-10T18:30"],this.dateMode=this.dateModeOptions[0],this.timeMode=this.timeModeOptions[0],this.dateSeparator=".",this.minStr=this.minMaxOptions[0],this.maxStr=this.minMaxOptions[1],this.min=new Date(this.minStr),this.max=new Date(this.maxStr),this.maskitoOptions=(0,f.H$)(this)}return e(t,[{key:"getPlaceholder",value:function(t,e,n){var o=",".concat(h.f$);return"".concat(t.replace(/\//g,n)).concat(o).concat(e)}},{key:"updateOptions",value:function(){this.maskitoOptions=(0,f.H$)(this)}},{key:"updateDate",value:function(){this.min=new Date(this.minStr),this.max=new Date(this.maxStr),this.updateOptions()}}]),t}();N.\u0275fac=function(t){return new(t||N)},N.\u0275cmp=M.Xpm({type:N,selectors:[["date-time-mask-doc"]],decls:3,vars:0,consts:[["header","DateTime","package","KIT"],["pageTab",""],["id","localization","heading","Localization",3,"content","description"],["localizationDescription",""],["id","min-max","heading","Min and max",3,"content","description"],["minMaxDescription",""],["tuiLink","","href","https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date","target","_blank"],[3,"control"],["documentationPropertyName","dateMode","documentationPropertyMode","input","documentationPropertyType","MaskitoDateMode",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","timeMode","documentationPropertyMode","input","documentationPropertyType","MaskitoTimeMode",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","dateSeparator","documentationPropertyMode","input","documentationPropertyType","string",3,"documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","min","documentationPropertyMode","input","documentationPropertyType","Date",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyName","max","documentationPropertyMode","input","documentationPropertyType","Date",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["tuiTextfieldCustomContent","tuiIconCalendarLarge",3,"tuiTextfieldFiller","formControl"],["tuiTextfield","","inputmode","numeric",3,"maskito"]],template:function(t,e){1&t&&(M.TgZ(0,"tui-doc-page",0),M.YNc(1,V,12,4,"ng-template",1),M.YNc(2,b,8,10,"ng-template",1),M.qZA())},directives:[m.qo,m.nj,m.f2,U,v,p.V,m.FU,m.zb,m.B7,s.K3,s.wU,l.B7,l.kD,u.JJ,u.oH,P.MB,T.F,C.r],encapsulation:2,changeDetection:0}),(0,y.gn)([g.UM],N.prototype,"getPlaceholder",null);var A=function(){var t=e(function t(){n(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=M.oAB({type:t}),t.\u0275inj=M.cJS({imports:[[r.ez,u.u5,u.UX,c.U5,m.fV,s.Qf,p.j,l.cn,d.Bz.forChild((0,m.Ve)(N))]]}),t}()}}])}();