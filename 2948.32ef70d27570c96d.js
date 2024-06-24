"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[2948],{2948:(v,d,e)=>{e.r(d),e.d(d,{default:()=>T});var g=e(3178),i=e(3139),r=e(997),m=e(2847),u=e(885),p=e(1156);const C=(0,e(617).rC)({mode:"HH:MM"});var t=e(4537);let E=(()=>{var n;class s{constructor(){this.initialValue="12:00",this.mask=C}}return(n=s).\u0275fac=function(o){return new(o||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["content-editable-doc-example-1"]],standalone:!0,features:[t.jDz],decls:2,vars:2,consts:[["contenteditable","true",3,"maskito","textContent"]],template:function(o,a){1&o&&(t._uU(0," Meeting time: "),t._UZ(1,"span",0)),2&o&&(t.xp6(1),t.Q6J("maskito",a.mask)("textContent",a.initialValue))},dependencies:[p.ro],styles:["[_nghost-%COMP%]{font-size:1.75rem}","[contenteditable][_ngcontent-%COMP%]{border:3px dashed lightgrey}"],changeDetection:0}),s})();const Z={mask:/^[a-z\s.,/!?]+$/i};let U=(()=>{var n;class s{constructor(){this.mask=Z,this.initialText="Hello, world!\nHow are you today?\nRead description of this example!"}}return(n=s).\u0275fac=function(o){return new(o||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["content-editable-doc-example-2"]],standalone:!0,features:[t.jDz],decls:3,vars:2,consts:[["contenteditable","true",3,"innerHTML","maskito"]],template:function(o,a){1&o&&(t.TgZ(0,"i"),t._uU(1,"Enter message:"),t.qZA(),t._UZ(2,"p",0)),2&o&&(t.xp6(2),t.Q6J("innerHTML",a.initialText,t.oJD)("maskito",a.mask))},dependencies:[p.ro],styles:["[contenteditable][_ngcontent-%COMP%]{white-space:pre;border:3px dashed lightgrey;max-width:30rem;padding:1rem}"],changeDetection:0}),s})();var c=e(9439);function x(n,s){if(1&n&&(t._uU(0," With built-in "),t.TgZ(1,"a",4)(2,"code"),t._uU(3,"Time"),t.qZA()(),t._uU(4," mask ")),2&n){const l=t.oxw();t.xp6(1),t.Q6J("routerLink",l.timeMaskDocPage)}}function D(n,s){1&n&&(t._uU(0," Use "),t.TgZ(1,"code"),t._uU(2,"white-space: pre"),t.qZA(),t._uU(3," for multi-line mode "))}let T=(()=>{var n;class s{constructor(){this.coreConceptsOverviewDocPage=`/${i.x.CoreConceptsOverview}`,this.timeMaskDocPage=`/${i.x.Time}`,this.angularDocPage=`/${i.x.Angular}`,this.reactDocPage=`/${i.x.React}`,this.vueDocPage=`/${i.x.Vue}`,this.maskitoWithContentEditableDemo=e.e(3757).then(e.t.bind(e,3757,17)),this.contentEditableExample1={[i.C.MaskitoOptions]:e.e(1881).then(e.t.bind(e,1881,17)),[i.C.JavaScript]:e.e(7430).then(e.t.bind(e,7430,17)),[i.C.Angular]:e.e(562).then(e.t.bind(e,562,17))},this.contentEditableExample2={[i.C.MaskitoOptions]:e.e(6244).then(e.t.bind(e,6244,17)),[i.C.JavaScript]:e.e(7430).then(e.t.bind(e,7430,17)),[i.C.Angular]:e.e(1269).then(e.t.bind(e,1269,17))}}}return(n=s).\u0275fac=function(o){return new(o||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["content-editable-doc"]],standalone:!0,features:[t.jDz],decls:56,vars:9,consts:[["header","ContentEditable","package","Recipes"],[1,"tui-space_top-0","tui-space_bottom-4"],["href","https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/contentEditable","rel","noreferrer","target","_blank","tuiLink",""],["status","success",1,"tui-space_bottom-4"],["tuiLink","",3,"routerLink"],[3,"code"],[1,"tui-space_bottom-0"],["id","time",3,"content","heading"],["heading1",""],["id","multi-line","heading","Multi-line support",3,"content","description"],["description2",""]],template:function(o,a){if(1&o&&(t.TgZ(0,"tui-doc-page",0)(1,"section")(2,"p",1),t._uU(3," You can use "),t.TgZ(4,"strong"),t._uU(5,"Maskito"),t.qZA(),t._uU(6," with "),t.TgZ(7,"a",2)(8,"code"),t._uU(9,"contentEditable"),t.qZA()(),t._uU(10," too. "),t.qZA(),t.TgZ(11,"p"),t._uU(12," Just wrap the element with "),t.TgZ(13,"code"),t._uU(14,"maskitoAdaptContentEditable"),t.qZA(),t._uU(15," utility and use "),t.TgZ(16,"strong"),t._uU(17,"Maskito"),t.qZA(),t._uU(18," in the same way as "),t.TgZ(19,"code"),t._uU(20,"HTMLInputElement"),t.qZA(),t._uU(21," / "),t.TgZ(22,"code"),t._uU(23,"HTMLTextAreaElement"),t.qZA(),t._uU(24," . "),t.qZA(),t.TgZ(25,"tui-notification",3),t._uU(26," No need to use "),t.TgZ(27,"code"),t._uU(28,"maskitoAdaptContentEditable"),t.qZA(),t._uU(29," if you use "),t.TgZ(30,"a",4)(31,"code"),t._uU(32,"@maskito/angular"),t.qZA()(),t._uU(33," , "),t.TgZ(34,"a",4)(35,"code"),t._uU(36,"@maskito/react"),t.qZA()(),t._uU(37," or "),t.TgZ(38,"a",4)(39,"code"),t._uU(40,"@maskito/vue"),t.qZA()(),t._uU(41," with the default element predicate (it will be wrapped automatically). "),t.qZA(),t._UZ(42,"tui-doc-code",5),t.TgZ(43,"p",6),t._uU(44," Learn more in the "),t.TgZ(45,"a",4),t._uU(46,' "Core\xa0Concepts" '),t.qZA(),t._uU(47," section. "),t.qZA()(),t.TgZ(48,"tui-doc-example",7),t.YNc(49,x,5,1,"ng-template",null,8,t.W1O),t._UZ(51,"content-editable-doc-example-1"),t.qZA(),t.TgZ(52,"tui-doc-example",9),t.YNc(53,D,4,0,"ng-template",null,10,t.W1O),t._UZ(55,"content-editable-doc-example-2"),t.qZA()()),2&o){const f=t.MAs(50),A=t.MAs(54);t.xp6(30),t.Q6J("routerLink",a.angularDocPage),t.xp6(4),t.Q6J("routerLink",a.reactDocPage),t.xp6(4),t.Q6J("routerLink",a.vueDocPage),t.xp6(4),t.Q6J("code",a.maskitoWithContentEditableDemo),t.xp6(3),t.Q6J("routerLink",a.coreConceptsOverviewDocPage),t.xp6(3),t.Q6J("content",a.contentEditableExample1)("heading",f),t.xp6(4),t.Q6J("content",a.contentEditableExample2)("description",A)}},dependencies:[r.TuiAddonDocModule,c.c0,c.qo,c.f2,m.j,m.V,g.rH,E,U,u.H,u.L],encapsulation:2,changeDetection:0}),s})()}}]);