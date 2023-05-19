!function(){"use strict";function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(s=r.key,n=void 0,"symbol"==typeof(n=function(e,t){if("object"!=typeof e||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var r=o.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(s,"string"))?n:String(n)),r)}var s,n}function t(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[9380],{70997:function(e,r,s){s.d(r,{fV:function(){return c}});var n,i=s(74788),a=s(84800),c=((n=t(function e(){o(this,e)})).\u0275fac=function(e){return new(e||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[a.JF,a.mG,a.Lx,a.Lq,a.u4]}),n)},19380:function(e,r,s){s.r(r),s.d(r,{ProcessorsDocPageModule:function(){return f}});var n,i=s(12057),a=s(2586),c=s(70997),u=s(44427),p=s(82847),l=s(60885),d=s(13805),g=s(74788),Z=s(84800),h=s(56119),m=((n=t(function e(){o(this,e),this.preprocessorFirstArgDemo=s.e(2391).then(s.t.bind(s,62391,17)),this.preprocessorsSecondArgDemo=s.e(3245).then(s.t.bind(s,3245,17)),this.preprocessorInActionDemo=s.e(2092).then(s.t.bind(s,82092,17)),this.postprocessorInActionDemo=s.e(7681).then(s.t.bind(s,87681,17)),this.maskitoPipeDemo=s.e(9743).then(s.t.bind(s,99743,17)),this.elementStateDocPage="/core-concepts/element-state"})).\u0275fac=function(e){return new(e||n)},n.\u0275cmp=g.Xpm({type:n,selectors:[["processors-doc-page"]],decls:107,vars:6,consts:[["header","Processors"],[1,"tui-space_bottom-6"],[1,"tui-space_top-0"],["href","https://github.com/Tinkoff/maskito/blob/main/projects/core/src/lib/types/mask-options.ts","target","_blank","tuiLink",""],["href","https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event","target","_blank","tuiLink",""],["href","https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event","target","_blank","tuiLink",""],[1,"tui-list"],[1,"tui-list__item"],[1,"tui-space_bottom-12"],["tuiLink","",3,"routerLink"],[1,"tui-list","tui-list_ordered"],[1,"tui-space_top-1",3,"code"],[3,"code"],[1,"tui-space_bottom-0"],["status","warning",1,"tui-space_bottom-4"],[1,"tui-space_top-0","tui-space_bottom-0"]],template:function(e,t){1&e&&(g.TgZ(0,"tui-doc-page",0),g.TgZ(1,"section",1),g.TgZ(2,"p",2),g.TgZ(3,"a",3),g.TgZ(4,"code"),g._uU(5,"MaskitoOptions"),g.qZA(),g.qZA(),g._uU(6," have optional parameters "),g.TgZ(7,"code"),g._uU(8,"preprocessors"),g.qZA(),g._uU(9," and "),g.TgZ(10,"code"),g._uU(11,"postprocessors"),g.qZA(),g._uU(12," . These are functions triggered on every user's input ( "),g.TgZ(13,"a",4),g._uU(14," beforeinput "),g.qZA(),g._uU(15," and "),g.TgZ(16,"a",5),g._uU(17," input "),g.qZA(),g._uU(18," events). They provide an opportunity to modify value before\xa0/\xa0after the mask is applied. "),g.qZA(),g.TgZ(19,"section"),g.TgZ(20,"p"),g._uU(21," Preprocessors and postprocessors accept different types of arguments but they have two important similarities: "),g.qZA(),g.TgZ(22,"ul",6),g.TgZ(23,"li",7),g._uU(24," The first argument always contains object with information that you can change. Object with the same properties and updated values can be returned from the processor. It means that you can keep all properties untouched or you can change any or all of these properties. "),g.qZA(),g.TgZ(25,"li",7),g._uU(26," The rest arguments contain information that can be useful to build some complex logic, but you cannot change it. "),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.TgZ(27,"tui-notification",8),g._uU(28," Before you learn more about processors, you should learn a single prerequisite \u2014 meaning of the term "),g.TgZ(29,"a",9),g._uU(30,' "Element\xa0state" '),g.qZA(),g._uU(31," . "),g.qZA(),g.TgZ(32,"section",8),g.TgZ(33,"h2"),g._uU(34,"Preprocessor"),g.qZA(),g.TgZ(35,"p"),g._uU(36," It is a function that is called "),g.TgZ(37,"strong"),g._uU(38,"before"),g.qZA(),g._uU(39," mask is applied. "),g.qZA(),g.TgZ(40,"p"),g._uU(41," For example, if user types a new character, preprocessor will be called first, and only then value that it returned will be passed into the mask, and finally the mask will accept or reject new typed character and update actual value of the text field. "),g.qZA(),g.TgZ(42,"section",1),g.TgZ(43,"p"),g._uU(44,"Preprocessor accepts two arguments:"),g.qZA(),g.TgZ(45,"ol",10),g.TgZ(46,"li",7),g.TgZ(47,"strong"),g._uU(48," Object with two properties: "),g.TgZ(49,"code"),g._uU(50,"elementState"),g.qZA(),g._uU(51," and "),g.TgZ(52,"code"),g._uU(53,"data"),g.qZA(),g._uU(54," . "),g.qZA(),g._uU(55," Object of the same interface with updated or unchanged properties can be returned from the preprocessor. "),g._UZ(56,"tui-doc-code",11),g.qZA(),g.TgZ(57,"li",7),g._uU(58," Name of the action which triggers current execution. It can be one of the following possible values: "),g._UZ(59,"tui-doc-code",12),g.qZA(),g.qZA(),g.qZA(),g.TgZ(60,"p"),g._uU(61," Preprocessor returns an objects of the same interface as the first argument. "),g.qZA(),g._UZ(62,"tui-doc-code",12),g.qZA(),g.TgZ(63,"section",8),g.TgZ(64,"h2"),g._uU(65,"Postprocessor"),g.qZA(),g.TgZ(66,"p",13),g._uU(67," It is a function that is called "),g.TgZ(68,"strong"),g._uU(69,"after"),g.qZA(),g._uU(70," the mask is applied. When the preprocessor is already called, all mask operations happened and the input's value is about to be updated. You can change everything manually inside a postprocessor. "),g.qZA(),g.TgZ(71,"section",1),g.TgZ(72,"p"),g._uU(73,"Postprocessor accepts two arguments:"),g.qZA(),g.TgZ(74,"ol",10),g.TgZ(75,"li",7),g.TgZ(76,"strong"),g._uU(77,"Element state after mask had been applied."),g.qZA(),g._uU(78," Postprocessor can return updated element state which would then be reflected by the actual text field. "),g.qZA(),g.TgZ(79,"li",7),g.TgZ(80,"strong"),g._uU(81," Initial element state before preprocessors and mask execution. "),g.qZA(),g._uU(82," It is a readonly argument, the past cannot be changed... "),g.qZA(),g.qZA(),g.qZA(),g.TgZ(83,"p"),g._uU(84," Postprocessor returns an objects of the same interface as the first argument. "),g.qZA(),g.TgZ(85,"tui-notification",14),g.TgZ(86,"p",15),g.TgZ(87,"strong"),g._uU(88,"With great power comes great responsibility!"),g.qZA(),g.qZA(),g.TgZ(89,"p",13),g._uU(90," Postprocessor is the final step before input's value update which gives a lot of flexibility. Use postprocessor wisely and return a valid value! "),g.qZA(),g.qZA(),g._UZ(91,"tui-doc-code",12),g.qZA(),g.TgZ(92,"section",8),g.TgZ(93,"h2"),g._uU(94,"maskitoPipe"),g.qZA(),g.TgZ(95,"p"),g._uU(96," The "),g.TgZ(97,"strong"),g._uU(98,"Maskito"),g.qZA(),g._uU(99," team likes code decomposition and promotes it! Don't put all complex logic inside a single processor. Break it into the several independent processors so that each processor implements only a single task. "),g.qZA(),g.TgZ(100,"p"),g._uU(101," Use the built-in "),g.TgZ(102,"code"),g._uU(103,"maskitoPipe"),g.qZA(),g._uU(104," to stack multiple processors of the same type: "),g.qZA(),g._UZ(105,"tui-doc-code",12),g.qZA(),g._UZ(106,"next-steps"),g.qZA()),2&e&&(g.xp6(29),g.Q6J("routerLink",t.elementStateDocPage),g.xp6(27),g.Q6J("code",t.preprocessorFirstArgDemo),g.xp6(3),g.Q6J("code",t.preprocessorsSecondArgDemo),g.xp6(3),g.Q6J("code",t.preprocessorInActionDemo),g.xp6(29),g.Q6J("code",t.postprocessorInActionDemo),g.xp6(14),g.Q6J("code",t.maskitoPipeDemo))},directives:[Z.qo,p.V,l.Ls,a.yS,Z.c0,h.R],encapsulation:2,changeDetection:0}),n),f=function(){var e=t(function e(){o(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[i.ez,c.fV,p.j,l.Hi,d.L,a.Bz.forChild((0,u.Ve)(m))]]}),e}()}}])}();