"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[5210],{6720:(D,s,t)=>{t.d(s,{TuiAddonDocModule:()=>m});var u=t(4537),r=t(9492);let m=(()=>{class e{}return e.\u0275fac=function(f){return new(f||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[r.JF,r.mG,r.Lx,r.Lq,r.u4]}),e})()},5210:(D,s,t)=>{t.r(s),t.d(s,{default:()=>A});var u=t(3178),r=t(3139),m=t(6720),l=t(2847),e=t(9900),p=t(1156),f=t(2853),v=t(5974),g=t(1673),o=t(4537),C=t(5640);let M=(()=>{var n;class d{constructor(){this.cardMask={mask:[...new Array(4).fill(/\d/)," ",...new Array(4).fill(/\d/)," ",...new Array(4).fill(/\d/)," ",...new Array(4).fill(/\d/)," ",...new Array(3).fill(/\d/)]},this.expiredMask=(0,f.tr)({mode:"mm/yy",separator:"/"}),this.cvvMask={mask:[...new Array(3).fill(/\d/)]},this.form=new e.cw({cardNumber:new e.NI(""),expire:new e.NI(""),cvv:new e.NI("")})}}return(n=d).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=o.Xpm({type:n,selectors:[["card-doc-example-1"]],standalone:!0,features:[o.jDz],decls:10,vars:4,consts:[["autocomplete","on","tuiGroup","",1,"wrapper",3,"formGroup"],["formControlName","cardNumber",1,"number"],["autocomplete","cc-number","inputmode","numeric","placeholder","0000 0000 0000 0000","tuiTextfield","",3,"maskito"],["formControlName","expire",1,"expired"],["autocomplete","cc-exp","inputmode","numeric","placeholder","mm/yy","tuiTextfield","",3,"maskito"],["formControlName","cvv",1,"cvv"],["autocomplete","cc-csc","inputmode","numeric","placeholder","000","tuiTextfield","",3,"maskito"]],template:function(a,i){1&a&&(o.TgZ(0,"form",0)(1,"tui-input",1),o._uU(2," Card number "),o._UZ(3,"input",2),o.qZA(),o.TgZ(4,"tui-input",3),o._uU(5," EXP "),o._UZ(6,"input",4),o.qZA(),o.TgZ(7,"tui-input",5),o._uU(8," CVV "),o._UZ(9,"input",6),o.qZA()()),2&a&&(o.Q6J("formGroup",i.form),o.xp6(3),o.Q6J("maskito",i.cardMask),o.xp6(3),o.Q6J("maskito",i.expiredMask),o.xp6(3),o.Q6J("maskito",i.cvvMask))},dependencies:[e.UX,e._Y,e.JJ,e.JL,e.sg,e.u,v.n6,v.gZ,g.Qf,g.K3,g.wU,C.MB,p.ro],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;max-width:30rem}.number[_ngcontent-%COMP%]{flex:1 1 11rem}.cvv[_ngcontent-%COMP%]{flex:1 0 4rem}.expired[_ngcontent-%COMP%]{flex:1 0 5rem}"],changeDetection:0}),d})();var x=t(9492);let A=(()=>{var n;class d{constructor(){this.maskExpressionDocPage=`/${r.x.MaskExpression}`,this.dateMaskDocPage=`/${r.x.Date}`,this.cardExample1={TypeScript:t.e(1508).then(t.t.bind(t,1508,17)),HTML:t.e(2362).then(t.t.bind(t,2362,17))}}}return(n=d).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=o.Xpm({type:n,selectors:[["card-doc"]],standalone:!0,features:[o.jDz],decls:17,vars:5,consts:[["header","Card","package","Recipes"],[1,"tui-space_top-0"],[1,"tui-list"],[1,"tui-list__item"],["tuiLink","",3,"routerLink"],["id","card",3,"content"]],template:function(a,i){1&a&&(o.TgZ(0,"tui-doc-page",0)(1,"section")(2,"p",1),o._uU(3," Creating mask for credit card input requires basic understanding of the following topics: "),o.qZA(),o.TgZ(4,"ul",2)(5,"li",3)(6,"a",4),o._uU(7," Pattern\xa0mask\xa0expression "),o.qZA()(),o.TgZ(8,"li",3),o._uU(9," How to use "),o.TgZ(10,"a",4),o._uU(11," Date "),o.qZA(),o._uU(12," mask from "),o.TgZ(13,"code"),o._uU(14,"@maskito/kit"),o.qZA()()()(),o.TgZ(15,"tui-doc-example",5),o._UZ(16,"card-doc-example-1"),o.qZA()()),2&a&&(o.xp6(6),o.Q6J("routerLink",i.maskExpressionDocPage),o.xp6(4),o.Q6J("routerLink",i.dateMaskDocPage),o.xp6(5),o.Udp("padding",0,"px"),o.Q6J("content",i.cardExample1))},dependencies:[m.TuiAddonDocModule,x.qo,x.f2,l.j,l.V,u.rH,M],encapsulation:2,changeDetection:0}),d})()}}]);