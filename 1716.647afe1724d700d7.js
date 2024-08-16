"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[1716],{1716:(k,p,o)=>{o.r(p),o.d(p,{default:()=>U});var t=o(755),a=o(2133),E=o(5443),r=o(2387),c=o(851),C=o(9530),h=o(7729),A=o(6245),P=o(7035),u=o(1642),_=o(3457),f=o(9167),g=o(9645),y=o(2188);function w(n,l){if(1&n&&(t._UZ(0,"img",26),t.ALo(1,"tuiFlag")),2&n){const i=t.oxw();t.Udp("border-radius",50,"%"),t.Q6J("src",t.lcZ(1,4,i.countryIsoCode),t.LSH),t.uIk("alt",i.countryIsoCode)}}function O(n,l){if(1&n){const i=t.EpF();t.TgZ(0,"tui-icon",27),t.NdJ("click",function(){t.CHM(i);const e=t.oxw();return t.KtG(e.showPassword=!e.showPassword)}),t.qZA()}if(2&n){const i=t.oxw();t.Q6J("icon",i.showPassword?"@tui.eye":"@tui.eye-off")}}const T=(0,r.f8)({min:0,prefix:"$ ",precision:2}),M=/^[a-z]+$/i,U=(()=>{var n;class l{constructor(){this.isApple=(0,t.f3M)(P.TN),this.form=new a.cw({name:new a.NI(""),surname:new a.NI(""),phone:new a.NI(""),password:new a.NI(""),repeatedPassword:new a.NI(""),transactionDate:new a.NI(""),transactionAmount:new a.NI(""),address:new a.NI("")}),this.nameMask={mask:M},this.surnameMask={mask:M,postprocessors:[({value:s,selection:e})=>({selection:e,value:s.toUpperCase()})]},this.phoneMask=(0,c._)({metadata:g.default,strict:!1}),this.passwordMask={mask:/^\d*[a-z]?\d*$/i},this.transactionDateMask=(0,r.tr)({mode:"dd/mm/yyyy"}),this.transactionAmountMask={...T,plugins:[...T.plugins,(0,r.Q7)("$ "),(0,r.hM)("$ ")]},this.addressMask={mask:/^[a-z1-9\s.,/]+$/i},this.showPassword=!1}get countryIsoCode(){return(0,c.i)(this.form.value.phone||"",g.default)||""}get phoneTextfieldPattern(){return this.isApple?"+[0-9-]{1,20}":""}log(s){console.info(s)}}return(n=l).\u0275fac=function(s){return new(s||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["real-world-form"]],standalone:!0,features:[t.jDz],decls:42,vars:16,consts:[["autocomplete","on",1,"tui-form",3,"formGroup","ngSubmit"],["formElement",""],[1,"tui-form__header","tui-form__header_margin-top_none"],[1,"tui-form__row","tui-form__row_multi-fields"],["formControlName","name",1,"tui-form__multi-field"],["autocomplete","name","name","name","placeholder","Only latin letters","tuiTextfieldLegacy","",3,"maskito"],["formControlName","surname",1,"tui-form__multi-field"],["autocomplete","family-name","name","surname","placeholder","Only CAPITAL latin letters","tuiTextfieldLegacy","",3,"maskito"],[1,"tui-form__row"],["formControlName","phone",3,"tuiTextfieldCustomContent"],["autocomplete","tel","inputmode","tel","name","phone","tuiTextfieldLegacy","",3,"maskito"],["flag",""],["formControlName","password",1,"tui-form__multi-field",3,"tuiTextfieldCustomContent"],["autocomplete","new-password","name","password","placeholder","Only digits and one latin letter","tuiTextfieldLegacy","",3,"maskito","type"],["formControlName","repeatedPassword",1,"tui-form__multi-field",3,"tuiTextfieldCustomContent"],["autocomplete","new-password","name","repeatPassword","placeholder","Only digits and one latin letter","tuiTextfieldLegacy","",3,"maskito","type"],["showHideIcon",""],["formControlName","transactionDate","tuiTextfieldCustomContent","@tui.calendar",1,"tui-form__multi-field"],["inputmode","decimal","name","transactionDate","placeholder","dd.mm.yyyy","tuiTextfieldLegacy","",3,"maskito"],["formControlName","transactionAmount",1,"tui-form__multi-field"],["autocomplete","transaction-amount","inputmode","decimal","name","transactionAmount","placeholder","Enter amount","tuiTextfieldLegacy","",3,"maskito"],["formControlName","address",3,"expandable"],["autocomplete","street-address","name","address","placeholder","Only latin letters, digits and some punctuation signs are allowed","tuiTextfieldLegacy","",3,"maskito"],[1,"tui-form__buttons"],["size","l","tuiButton","","type","submit",1,"tui-form__button"],["appearance","flat","size","l","tuiButton","","type","button",1,"tui-form__button",3,"click"],["width","28",3,"src"],[1,"password-icon",3,"icon","click"]],template:function(s,e){if(1&s){const d=t.EpF();t.TgZ(0,"form",0,1),t.NdJ("ngSubmit",function(){t.CHM(d);const Z=t.MAs(1);return e.log(e.form.value),t.KtG(Z.submit())}),t.TgZ(2,"h3",2),t._uU(3,"Real World Form"),t.qZA(),t.TgZ(4,"div",3)(5,"tui-input",4),t._uU(6," Name "),t._UZ(7,"input",5),t.qZA(),t.TgZ(8,"tui-input",6),t._uU(9," Surname "),t._UZ(10,"input",7),t.qZA()(),t.TgZ(11,"div",8)(12,"tui-input",9),t._uU(13," Enter phone number "),t._UZ(14,"input",10),t.qZA(),t.YNc(15,w,2,6,"ng-template",null,11,t.W1O),t.qZA(),t.TgZ(17,"div",3)(18,"tui-input",12),t._uU(19," Enter password "),t._UZ(20,"input",13),t.qZA(),t.TgZ(21,"tui-input",14),t._uU(22," Repeat password "),t._UZ(23,"input",15),t.qZA(),t.YNc(24,O,1,1,"ng-template",null,16,t.W1O),t.qZA(),t.TgZ(26,"div",3)(27,"tui-input",17),t._uU(28," Transaction date "),t._UZ(29,"input",18),t.qZA(),t.TgZ(30,"tui-input",19),t._uU(31," Transaction amount "),t._UZ(32,"input",20),t.qZA()(),t.TgZ(33,"div",8)(34,"tui-textarea",21),t._uU(35," Enter address "),t._UZ(36,"textarea",22),t.qZA()(),t.TgZ(37,"div",23)(38,"button",24),t._uU(39," Submit "),t.qZA(),t.TgZ(40,"button",25),t.NdJ("click",function(){return e.form.reset()}),t._uU(41," Clear all "),t.qZA()()()}if(2&s){const d=t.MAs(16),m=t.MAs(25);t.Q6J("formGroup",e.form),t.xp6(7),t.Q6J("maskito",e.nameMask),t.xp6(3),t.Q6J("maskito",e.surnameMask),t.xp6(2),t.Q6J("tuiTextfieldCustomContent",e.countryIsoCode?d:"@tui.phone"),t.xp6(2),t.Q6J("maskito",e.phoneMask),t.uIk("pattern",e.phoneTextfieldPattern),t.xp6(4),t.Q6J("tuiTextfieldCustomContent",m),t.xp6(2),t.Q6J("maskito",e.passwordMask)("type",e.showPassword?"password":"text"),t.xp6(1),t.Q6J("tuiTextfieldCustomContent",m),t.xp6(2),t.Q6J("maskito",e.passwordMask)("type",e.showPassword?"password":"text"),t.xp6(6),t.Q6J("maskito",e.transactionDateMask),t.xp6(3),t.Q6J("maskito",e.transactionAmountMask),t.xp6(2),t.Q6J("expandable",!0),t.xp6(2),t.Q6J("maskito",e.addressMask)}},dependencies:[E.r,a.UX,a._Y,a.JJ,a.JL,a.sg,a.u,C.xG,h.T,A.R,u.Qf,u.K3,u.wU,y.MB,_.Mu,_.FC,_.Bq,f.cn,f.B7],styles:["[_nghost-%COMP%]{display:flex;justify-content:center;align-items:center;padding-top:2rem}form[_ngcontent-%COMP%]{width:80%;max-width:40rem}.password-icon[_ngcontent-%COMP%]{pointer-events:all;cursor:pointer}"],changeDetection:0}),l})()}}]);