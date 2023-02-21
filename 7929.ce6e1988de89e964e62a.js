"use strict";(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[7929],{7929:(Z,c,o)=>{o.r(c),o.d(c,{AngularDocPageModule:()=>m});var p=o(6104),s=o(5358),a=o(6250),u=o(2847),l=o(885),t=o(4788);function d(e,i){if(1&e&&(t.TgZ(0,"code"),t._uU(1,"@maskito/angular"),t.qZA(),t._uU(2," is a light-weighted library to use Maskito in an Angular-way. "),t.TgZ(3,"tui-notification",3),t.TgZ(4,"h3",4),t._uU(5,"Prerequisites"),t.qZA(),t._uU(6," To get the most out of this guide, you should review the topic "),t.TgZ(7,"a",5),t._uU(8,' "Core\xa0Concepts" '),t.qZA(),t._uU(9," . "),t.qZA(),t.TgZ(10,"section",6),t.TgZ(11,"h2"),t._uU(12,"Write less code"),t.qZA(),t.TgZ(13,"ul",7),t.TgZ(14,"li",8),t.TgZ(15,"u"),t._uU(16,"No need to query element from DOM."),t.qZA(),t._uU(17," Just pass all required options to "),t.TgZ(18,"code"),t._uU(19,"[maskito]"),t.qZA(),t._uU(20," -directive. "),t.qZA(),t.TgZ(21,"li",8),t.TgZ(22,"u"),t._uU(23,"No need to worry about clean-ups."),t.qZA(),t._uU(24," All created event listeners are automatically removed after element is detached from DOM. "),t.qZA(),t.qZA(),t.qZA(),t.TgZ(25,"section",6),t.TgZ(26,"h2"),t._uU(27,"Basic directive approach"),t.qZA(),t.TgZ(28,"p"),t._uU(29," It is the most classic approach that every Angular-developer is used to. Use it when you have direct access to native input element. "),t.qZA(),t._UZ(30,"tui-doc-code",9),t.qZA(),t.TgZ(31,"section",6),t.TgZ(32,"h2"),t._uU(33,"Dependency Injection approach"),t.qZA(),t.TgZ(34,"p"),t._uU(35," It is a more advanced approach that can be useful for UI Kit developers. "),t.qZA(),t.TgZ(36,"p"),t._uU(37," Let's imagine that you have a fancy-looking input component that satisfies your design system: "),t.qZA(),t._UZ(38,"tui-doc-code",10),t.TgZ(39,"p"),t._uU(40," This solution causes props drilling. You should pass "),t.TgZ(41,"code"),t._uU(42,"maskitoOptions"),t.qZA(),t._uU(43," through all components (which don't even requires these options) until we reached native input. This example is very simple, but in real life you can have a lot of nested components inside custom input. "),t.qZA(),t.TgZ(44,"p"),t._uU(45," Use Dependency Injection approach for the such case. Just put empty "),t.TgZ(46,"code"),t._uU(47,"maskito"),t.qZA(),t._uU(48," -attribute on native input inside your custom input component. "),t.qZA(),t._UZ(49,"tui-doc-code",10),t.TgZ(50,"p"),t._uU(51," And now users of your UI Kit can put any options they want to your custom input: "),t._UZ(52,"tui-doc-code",11),t.qZA(),t.qZA()),2&e){const n=t.oxw();t.xp6(7),t.Q6J("routerLink",n.coreConceptsOverviewDocPage),t.xp6(23),t.Q6J("code",n.basicDirectiveApproach),t.xp6(8),t.Q6J("code",n.customInputExample),t.xp6(11),t.Q6J("code",n.customInputDiApproachExample),t.xp6(3),t.Q6J("code",n.diApproachInAction)}}function r(e,i){if(1&e&&(t.TgZ(0,"section"),t.TgZ(1,"ol",12),t.TgZ(2,"li",8),t._uU(3," Install libraries "),t._UZ(4,"tui-doc-code",13),t.qZA(),t.TgZ(5,"li",14),t._uU(6," Import "),t.TgZ(7,"code"),t._uU(8,"MaskitoModule"),t.qZA(),t._uU(9," to your module "),t._UZ(10,"tui-doc-code",15),t.qZA(),t.qZA(),t.qZA()),2&e){const n=t.oxw();t.xp6(10),t.Q6J("code",n.importMaskitoModuleExample)}}let g=(()=>{class e{constructor(){this.coreConceptsOverviewDocPage="/core-concepts/overview",this.importMaskitoModuleExample=o.e(9201).then(o.t.bind(o,9201,17)),this.basicDirectiveApproach=o.e(257).then(o.t.bind(o,257,17)),this.customInputExample=o.e(3953).then(o.t.bind(o,3953,17)),this.customInputDiApproachExample=o.e(1999).then(o.t.bind(o,1999,17)),this.diApproachInAction=o.e(6532).then(o.t.bind(o,6532,17))}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["angular-doc-page"]],decls:3,vars:0,consts:[["header","Angular"],["pageTab","Overview"],["pageTab","Setup"],["status","warning",1,"tui-space_top-6"],[1,"tui-space_top-0"],["tuiLink","",3,"routerLink"],[1,"tui-space_top-12"],[1,"tui-list"],[1,"tui-list__item"],["filename","your.component.ts",3,"code"],["filename","custom-input.component.ts",3,"code"],[3,"code"],[1,"tui-list","tui-list_ordered"],["code","npm install @maskito/{core,angular}","filename","/your/project/path>"],[1,"tui-list__item","tui-space_top-8"],["filename","your.module.ts",3,"code"]],template:function(n,h){1&n&&(t.TgZ(0,"tui-doc-page",0),t.YNc(1,d,53,5,"ng-template",1),t.YNc(2,r,11,1,"ng-template",2),t.qZA())},directives:[a.qo,a.nj,l.Ls,u.V,s.yS,a.c0],encapsulation:2,changeDetection:0}),e})(),m=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[p.ez,a.fV,u.j,l.Hi,s.Bz.forChild((0,a.Ve)(g))]]}),e})()}}]);