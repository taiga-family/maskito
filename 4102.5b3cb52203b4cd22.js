"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[4102],{4102:(h,i,t)=>{t.r(i),t.d(i,{default:()=>l});var c=t(9129),p=t(2942),g=t(120),d=t(4732),m=t(1294),e=t(755),n=t(7421);let l=(()=>{var o;class r{constructor(){this.elementStateDocPage="/".concat(p.x.ElementState),this.regExpMaskExpDemo=t.e(4992).then(t.t.bind(t,6429,17)),this.basicTimeDemo=t.e(7891).then(t.t.bind(t,7891,17)),this.dynamicMaskExpDemo=t.e(5539).then(t.t.bind(t,5539,17))}}return(o=r).\u0275fac=function(a){return new(a||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["mask-expression-doc-page"]],standalone:!0,features:[e.jDz],decls:100,vars:6,consts:[["header","Mask expression"],["href","https://github.com/taiga-family/maskito/blob/main/projects/core/src/lib/types/mask-options.ts","rel","noreferrer","target","_blank","tuiLink",""],[1,"tui-space_top-8"],[1,"tui-list"],[1,"tui-list__item"],[1,"tui-space_top-0"],["href","https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions","rel","noreferrer","target","_blank","tuiLink",""],[3,"code"],["status","warning",1,"tui-space_top-3"],["status","info"],["status","info",1,"tui-space_bottom-3"],["tuiLink","",3,"routerLink"],["status","warning",1,"tui-space_top-6"],[1,"tui-space_bottom-0"]],template:function(a,s){1&a&&(e.TgZ(0,"tui-doc-page",0)(1,"div")(2,"strong"),e._uU(3,"Mask expression"),e.qZA(),e._uU(4," is the the main concept of Maskito core library. It provides the developer with opportunity to predefine format of user's input. For example, you can set mask expression to accept only digits, only Latin letters or you can configure more complex patterns like a date string. "),e.qZA(),e.TgZ(5,"p"),e._uU(6," You can set mask expression using "),e.TgZ(7,"code"),e._uU(8,"mask"),e.qZA(),e._uU(9," parameter of "),e.TgZ(10,"a",1)(11,"code"),e._uU(12,"MaskitoOptions"),e.qZA()(),e._uU(13," . "),e.qZA(),e.TgZ(14,"section",2)(15,"h2"),e._uU(16,"Types of mask expression"),e.qZA(),e.TgZ(17,"ul",3)(18,"li",4)(19,"strong"),e._uU(20,"RegExp mask expression"),e.qZA(),e.TgZ(21,"p",5),e._uU(22," The most basic and comprehensible type. The only required knowledge is understanding of native JavaScript "),e.TgZ(23,"a",6),e._uU(24," Regular\xa0expression "),e.qZA(),e._uU(25," . "),e.qZA(),e.TgZ(26,"p"),e._uU(27,"See the following example:"),e.qZA(),e._UZ(28,"tui-doc-code",7),e.TgZ(29,"tui-notification",8),e._uU(30," Make sure that mask expression works with any of intermediate states, not just the final value. "),e.TgZ(31,"p"),e._uU(32,"For example, imagine that you have to create mask for 4-digits PIN code."),e.qZA(),e.TgZ(33,"p")(34,"code"),e._uU(35),e.qZA(),e._uU(36," is a wrong mask expression. It does not match intermediate states (you cannot complete 4-digit string without possibility to type 1-, 2- or 3-digit string). "),e.qZA(),e.TgZ(37,"p")(38,"code"),e._uU(39),e.qZA(),e._uU(40," is the right solution for our example. "),e.qZA()()(),e.TgZ(41,"li",4)(42,"strong"),e._uU(43,"Pattern mask expression"),e.qZA(),e.TgZ(44,"p",5),e._uU(45," It is a good choice for more complex masks that are fixed in size. This type of mask expression is presented as array. Each element in the array has to be either a string or a regular expression. Each string is a "),e.TgZ(46,"em"),e._uU(47,"fixed character"),e.qZA(),e._uU(48," and each regular expression is validator of character at the same index. "),e.qZA(),e.TgZ(49,"tui-notification",9)(50,"strong"),e._uU(51,"Fixed character"),e.qZA(),e._uU(52," \u2014 a predefined character at a certain position (the same as its index inside mask expression array). It is automatically added when user forgets to type it. It cannot be erased or replaced with another character. "),e.qZA(),e.TgZ(53,"p"),e._uU(54," For example, imagine that you have to create mask for a time-string with "),e.TgZ(55,"code"),e._uU(56,"HH:MM"),e.qZA(),e._uU(57," format. It consists of 4 digits and 1 fixed-character separator "),e.TgZ(58,"code"),e._uU(59,":"),e.qZA(),e._uU(60," . "),e.qZA(),e._UZ(61,"tui-doc-code",7),e.TgZ(62,"p"),e._uU(63," This mask expression forbids anything excepts digits and limits length of the value to 5 characters. "),e.qZA(),e.TgZ(64,"p"),e._uU(65,"Also, it manages user interactions with fixed character."),e.qZA(),e.TgZ(66,"p"),e._uU(67," For example, user can just type four digits "),e.TgZ(68,"code"),e._uU(69,"1159"),e.qZA(),e._uU(70," and the value becomes "),e.TgZ(71,"code"),e._uU(72,"11:59"),e.qZA()(),e.TgZ(73,"p"),e._uU(74," Another example, if caret position is after the colon and user presses "),e.TgZ(75,"kbd"),e._uU(76,"Backspace"),e.qZA(),e._uU(77," , the input's value will not change but caret will be moved to the left of the colon. "),e.qZA()(),e.TgZ(78,"li",4)(79,"strong"),e._uU(80,"Dynamic mask expression"),e.qZA(),e.TgZ(81,"p",5)(82,"code"),e._uU(83,"mask"),e.qZA(),e._uU(84," parameter can also accepts function which generates mask expression. This function will be called "),e.TgZ(85,"strong"),e._uU(86,"every\xa0time\xa0before"),e.qZA(),e._uU(87," input changes to generate a new version of mask expression. "),e.qZA(),e.TgZ(88,"tui-notification",10),e._uU(89," An "),e.TgZ(90,"a",11),e._uU(91,' "Element\xa0state" '),e.qZA(),e._uU(92," object with raw value and current selection is passed as an argument to the function. "),e.qZA(),e._UZ(93,"tui-doc-code",7),e.TgZ(94,"tui-notification",12)(95,"div"),e._uU(96," Be careful! It can be not performance-friendly to generate new mask expression on every input change. "),e.qZA(),e.TgZ(97,"p",13),e._uU(98,"Think about optimization and memoization of the such function."),e.qZA()()()()(),e._UZ(99,"next-steps"),e.qZA()),2&a&&(e.xp6(28),e.Q6J("code",s.regExpMaskExpDemo),e.xp6(7),e.Oqu("/^\\d{4}$/"),e.xp6(4),e.Oqu("/^\\d{0,4}$/"),e.xp6(22),e.Q6J("code",s.basicTimeDemo),e.xp6(29),e.Q6J("routerLink",s.elementStateDocPage),e.xp6(3),e.Q6J("code",s.dynamicMaskExpDemo))},dependencies:[n.D_,n.xR,g.lI,d.tK,c.rH,m.R],encapsulation:2,changeDetection:0}),r})()}}]);