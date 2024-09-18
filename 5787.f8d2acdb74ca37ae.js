"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[5787],{5787:(Y,g,e)=>{e.r(g),e.d(g,{default:()=>H});var h=e(4768),F=e(1760),r=e(8844),E=e(7355),f=e(9738),l=e(8832),u=e(6801),t=e(2978);let v=(()=>{var n;class s{constructor(){this.value="",this.nameMask={mask:/^[a-zA-Z\s]+$/,postprocessors:[({value:a,selection:o})=>({value:a.toUpperCase(),selection:o})]},this.predicate=a=>a.querySelector("tui-input input")}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.VBU({type:n,selectors:[["nested-doc-example-1"]],standalone:!0,features:[t.aNF],decls:2,vars:2,consts:[[3,"maskito","ngModel","ngModelChange"]],template:function(a,o){1&a&&(t.j41(0,"tui-input",0),t.bIt("ngModelChange",function(m){return o.value=m}),t.EFF(1," Name on the card\n"),t.k0s()),2&a&&t.Y8G("maskito",o.nameMask)("ngModel",o.value)},dependencies:[l.YN,l.BC,l.vS,r.u,u.zi,u.mp,u.Ws],encapsulation:2,changeDetection:0}),s})();var k=e(5639),D=e(6836);let y=(()=>{var n;class s{constructor(){this.show=!1,this.value=""}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.VBU({type:n,selectors:[["nested-doc-example-2"]],standalone:!0,features:[t.aNF],decls:5,vars:3,consts:[["tuiLabel","",1,"tui-space_bottom-3"],["tuiCheckbox","","type","checkbox",3,"ngModel","ngModelChange"],[3,"disabled","ngModel","ngModelChange"]],template:function(a,o){1&a&&(t.j41(0,"label",0)(1,"input",1),t.bIt("ngModelChange",function(m){return o.show=m}),t.k0s(),t.EFF(2," Add card holder name\n"),t.k0s(),t.j41(3,"tui-input",2),t.bIt("ngModelChange",function(m){return o.value=m}),t.EFF(4," Name on the card\n"),t.k0s()),2&a&&(t.R7$(1),t.Y8G("ngModel",o.show),t.R7$(2),t.Y8G("disabled",!o.show)("ngModel",o.value))},dependencies:[l.YN,l.Zm,l.BC,l.vS,D.GY,u.zi,u.mp,u.Ws,k.z],encapsulation:2,changeDetection:0}),s})();var p=e(168);let x=(()=>{var n;class s{constructor(){this.control=new l.MJ(""),this.maskito=(0,p.TK)({precision:2})}setValue(){this.control.setValue("12345.6789")}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.VBU({type:n,selectors:[["programmatically-doc-example-3"]],standalone:!0,features:[t.aNF],decls:3,vars:2,consts:[[3,"formControl","maskito"],["type","button",3,"click"]],template:function(a,o){1&a&&(t.nrm(0,"input",0),t.j41(1,"button",1),t.bIt("click",function(){return o.setValue()}),t.EFF(2," Set 12345.6789\n"),t.k0s()),2&a&&t.Y8G("formControl",o.control)("maskito",o.maskito)},dependencies:[r.u,l.X1,l.me,l.BC,l.l_],encapsulation:2,changeDetection:0}),s})(),C=(()=>{var n;class s{constructor(){this.value=12345.67,this.options=(0,p.TK)({precision:2})}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.VBU({type:n,selectors:[["pipe-doc-example-4"]],standalone:!0,features:[t.aNF],decls:2,vars:4,template:function(a,o){1&a&&(t.EFF(0),t.nI1(1,"maskito")),2&a&&t.SpI("Balance: $",t.i5U(1,1,o.value,o.options),"\n")},dependencies:[r.z],encapsulation:2,changeDetection:0}),s})();var j=e(1860),M=e(9656);let N=(()=>{var n;class s{constructor(){this.accessor=(0,t.WQX)(l.me),this.maskitoDirective=(0,t.WQX)(r.u),this.unmaskHandler=M.D,this.maskHandler=a=>this.maskitoDirective.options?(0,j.bc)(String(a),this.maskitoDirective.options):a}ngAfterViewInit(){const a=this.accessor.onChange.bind(this.accessor),o=this.accessor.writeValue.bind(this.accessor);this.accessor.onChange=c=>a(this.unmaskHandler(c)),this.accessor.writeValue=c=>o(this.maskHandler(c))}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275dir=t.FsC({type:n,selectors:[["","maskito","","unmaskHandler",""]],inputs:{unmaskHandler:"unmaskHandler",maskHandler:"maskHandler"},standalone:!0}),s})(),T=(()=>{var n;class s{constructor(){this.value=1000.42,this.maskito=(0,p.TK)({precision:2,thousandSeparator:",",decimalSeparator:"."}),this.unmaskHandler=p.VM}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.VBU({type:n,selectors:[["custom-unmask-handler-doc-example-5"]],standalone:!0,features:[t.aNF],decls:8,vars:4,consts:[[3,"maskito","unmaskHandler","ngModel","ngModelChange"],["type","button",3,"click"]],template:function(a,o){1&a&&(t.j41(0,"input",0),t.bIt("ngModelChange",function(m){return o.value=m}),t.k0s(),t.j41(1,"p")(2,"strong"),t.EFF(3,"Control value:"),t.k0s(),t.j41(4,"code"),t.EFF(5),t.k0s()(),t.j41(6,"button",1),t.bIt("click",function(){return o.value=1234567.89}),t.EFF(7," Programmatically patch value\n"),t.k0s()),2&a&&(t.Y8G("maskito",o.maskito)("unmaskHandler",o.unmaskHandler)("ngModel",o.value),t.R7$(5),t.JRh(o.value))},dependencies:[l.YN,l.me,l.BC,l.vS,r.u,N],encapsulation:2,changeDetection:0}),s})();var d=e(1872);function A(n,s){1&n&&(t.EFF(0," When directly on native input/textarea tag, "),t.j41(1,"code"),t.EFF(2,"MaskitoDirective"),t.k0s(),t.EFF(3," formats value set programmatically with Angular forms. "))}function P(n,s){1&n&&(t.EFF(0," According to W3C specification, textfield value should always be only a "),t.j41(1,"code"),t.EFF(2,"string"),t.k0s(),t.EFF(3," -type (not "),t.j41(4,"code"),t.EFF(5,"number"),t.k0s(),t.EFF(6," -type, not "),t.j41(7,"code"),t.EFF(8,"object"),t.k0s(),t.EFF(9," -type or etc.). However, you can sometimes need to store value without mask in Angular form control. This example demonstrates how easily any Angular "),t.j41(10,"a",22),t.EFF(11," Control\xa0Value\xa0Accessor "),t.k0s(),t.EFF(12," (default one or any custom one from a third-party UI Kit) can be monkey-patched to achieve this goal. "))}function U(n,s){if(1&n&&(t.j41(0,"code"),t.EFF(1,"@maskito/angular"),t.k0s(),t.EFF(2," is a light-weighted library to use "),t.j41(3,"strong"),t.EFF(4,"Maskito"),t.k0s(),t.EFF(5," in an Angular-way. "),t.j41(6,"tui-notification",3)(7,"div")(8,"strong"),t.EFF(9,"Prerequisites"),t.k0s(),t.j41(10,"p",4),t.EFF(11," To get the most out of this guide, you should review the topic "),t.j41(12,"a",5),t.EFF(13,' "Core\xa0Concepts" '),t.k0s(),t.EFF(14," first. "),t.k0s()()(),t.j41(15,"section",6)(16,"h2"),t.EFF(17,"Write less code"),t.k0s(),t.j41(18,"ul",7)(19,"li",8)(20,"strong"),t.EFF(21,"No need to query element from DOM."),t.k0s(),t.EFF(22," Just pass all required options to "),t.j41(23,"code"),t.EFF(24,"[maskito]"),t.k0s(),t.EFF(25," directive. "),t.k0s(),t.j41(26,"li",8)(27,"strong"),t.EFF(28,"No need to worry about clean-ups."),t.k0s(),t.EFF(29," All created event listeners are automatically removed after element is detached from DOM. "),t.k0s()()(),t.j41(30,"section",6)(31,"h2"),t.EFF(32,"Basic directive approach"),t.k0s(),t.j41(33,"p"),t.EFF(34,"Use it when you have direct access to native input element."),t.k0s(),t.nrm(35,"tui-doc-code",9),t.k0s(),t.j41(36,"section",6)(37,"h2"),t.EFF(38,"Nested input element"),t.k0s(),t.j41(39,"p"),t.EFF(40," Pass a predicate to "),t.j41(41,"strong"),t.EFF(42,"maskito"),t.k0s(),t.EFF(43," to find input element for you, if you do not have a direct access to it. "),t.k0s(),t.j41(44,"tui-notification",10)(45,"div"),t.EFF(46," By default "),t.j41(47,"strong"),t.EFF(48,"maskito"),t.k0s(),t.EFF(49," will try to find input/textarea by querying its host: "),t.j41(50,"code"),t.EFF(51,"host.querySelector('input,textarea')"),t.k0s(),t.EFF(52," so that might be sufficient. Use custom predicate if you need custom logic. "),t.k0s()(),t.nrm(53,"tui-doc-code",9),t.k0s(),t.j41(54,"tui-doc-example",11)(55,"div")(56,"tui-notification",12)(57,"div"),t.EFF(58," Default behavior is enough for "),t.j41(59,"a",13),t.EFF(60," Taiga UI "),t.k0s(),t.EFF(61," inputs "),t.k0s()(),t.nrm(62,"nested-doc-example-1",null,14),t.j41(64,"tui-notification",15),t.EFF(65," Custom predicate is required if target input is not the first on in the DOM "),t.k0s(),t.nrm(66,"nested-doc-example-2",16),t.k0s()(),t.j41(67,"tui-doc-example",17),t.DNE(68,A,4,0,"ng-template",null,18,t.C5r),t.nrm(70,"programmatically-doc-example-3"),t.k0s(),t.j41(71,"tui-doc-example",19),t.nrm(72,"pipe-doc-example-4"),t.k0s(),t.j41(73,"tui-doc-example",20),t.DNE(74,P,13,0,"ng-template",null,21,t.C5r),t.nrm(76,"custom-unmask-handler-doc-example-5"),t.k0s()),2&n){const i=t.sdS(63),a=t.sdS(69),o=t.sdS(75),c=t.XpG();t.R7$(12),t.Y8G("routerLink",c.coreConceptsOverviewDocPage),t.R7$(23),t.Y8G("code",c.basicDirectiveApproach),t.R7$(18),t.Y8G("code",c.customInputExample),t.R7$(1),t.Y8G("content",c.nestedInputExample),t.R7$(1),t.xc7("width",20,"rem"),t.R7$(11),t.Y8G("maskito",i.nameMask)("maskitoElement",i.predicate),t.R7$(1),t.Y8G("content",c.programmaticallyExample)("description",a),t.R7$(4),t.Y8G("content",c.pipeExample),t.R7$(2),t.Y8G("content",c.customUnmaskHandlerExample)("description",o)}}function S(n,s){if(1&n&&(t.j41(0,"section")(1,"ol",23)(2,"li",8),t.EFF(3," Install libraries "),t.nrm(4,"tui-doc-code",24),t.k0s(),t.j41(5,"li",25),t.EFF(6," Import "),t.j41(7,"code"),t.EFF(8,"MaskitoDirective"),t.k0s(),t.EFF(9," to your component / module "),t.nrm(10,"tui-doc-code",9),t.k0s()()()),2&n){const i=t.XpG();t.R7$(10),t.Y8G("code",i.importMaskitoExample)}}const H=(()=>{var n;class s{constructor(){this.coreConceptsOverviewDocPage="/".concat(F.$.CoreConceptsOverview),this.importMaskitoExample=e.e(1496).then(e.t.bind(e,1496,17)),this.basicDirectiveApproach=e.e(1231).then(e.t.bind(e,1231,17)),this.customInputExample=e.e(3935).then(e.t.bind(e,3935,17)),this.nestedInputExample={TypeScript:e.e(5587).then(e.t.bind(e,5587,17)),Default:e.e(4846).then(e.t.bind(e,4846,17)),Custom:e.e(519).then(e.t.bind(e,519,17))},this.programmaticallyExample={TypeScript:e.e(3598).then(e.t.bind(e,3598,17)),HTML:e.e(2541).then(e.t.bind(e,2541,17))},this.pipeExample={TypeScript:e.e(2689).then(e.t.bind(e,2689,17)),HTML:e.e(2496).then(e.t.bind(e,2496,17))},this.customUnmaskHandlerExample={"index.html":e.e(2447).then(e.t.bind(e,2447,17)),"index.ts":e.e(1711).then(e.t.bind(e,1711,17)),"unmask.directive.ts":e.e(7829).then(e.t.bind(e,7829,17))}}}return(n=s).\u0275fac=function(a){return new(a||n)},n.\u0275cmp=t.VBU({type:n,selectors:[["angular-doc-page"]],standalone:!0,features:[t.aNF],decls:3,vars:0,consts:[["header","Angular","path","angular"],["pageTab","Overview"],["pageTab","Setup"],["appearance","warning","size","m",1,"tui-space_top-6"],[1,"tui-space_bottom-0"],["tuiLink","",3,"routerLink"],[1,"tui-space_top-12"],[1,"tui-list"],[1,"tui-list__item"],["filename","your.component.ts",3,"code"],["size","m"],["id","custom-input","description","See querying nested input in action","heading","Custom input",3,"content"],["size","m",1,"tui-space_bottom-3"],["href","https://github.com/taiga-family/taiga-ui","tuiLink",""],["example",""],["size","m",1,"tui-space_vertical-3"],[3,"maskito","maskitoElement"],["id","programmatically","heading","Set value programmatically",3,"content","description"],["programmaticallyDescription",""],["id","pipe","description","Format arbitrary value with the same options","heading","Pipe",3,"content"],["id","unmask","heading","Custom unmask handler",3,"content","description"],["customUnmaskHandlerDescription",""],["href","https://angular.dev/api/forms/ControlValueAccessor","target","_blank","tuiLink",""],[1,"tui-list","tui-list_ordered"],["code","npm install @maskito/{core,angular}","filename","/your/project/path>"],[1,"tui-list__item","tui-space_top-8"]],template:function(a,o){1&a&&(t.j41(0,"tui-doc-page",0),t.DNE(1,U,77,13,"ng-template",1),t.DNE(2,S,11,1,"ng-template",2),t.k0s())},dependencies:[r.u,v,y,C,x,h.Wk,d.MN,d.FS,d.e3,d.ic,E.Jc,f.wS,T],encapsulation:2,changeDetection:0}),s})()}}]);