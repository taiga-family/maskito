!function(){"use strict";function e(e){return function(e){if(Array.isArray(e))return t(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,r){if(!e)return;if("string"==typeof e)return t(e,r);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,r)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function r(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(i=n.key,o=void 0,"symbol"==typeof(o=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(i,"string"))?o:String(o)),n)}var i,o}function n(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[3198],{43198:function(t,r,o){o.r(r),o.d(r,{CardDocModule:function(){return x}});var a,c=o(12057),u=o(23738),s=o(55358),p=o(42905),l=o(7476),m=o(95974),f=o(82847),d=o(21673),g=o(74788),y=o(84278),k=o(81620),v=o(49510),Z=o(47258),b=((a=n(function t(){i(this,t),this.cardMask={mask:[].concat(e(Array(4).fill(/\d/)),[" "],e(Array(4).fill(/\d/)),[" "],e(Array(4).fill(/\d/)),[" "],e(Array(4).fill(/\d/)),[" "],e(Array(3).fill(/\d/)))},this.expiredMask=(0,y.tr)({mode:"mm/yy",separator:"/"}),this.cvvMask={mask:e(Array(3).fill(/\d/))},this.form=new u.cw({cardNumber:new u.NI(""),expire:new u.NI(""),cvv:new u.NI("")})})).\u0275fac=function(e){return new(e||a)},a.\u0275cmp=g.Xpm({type:a,selectors:[["card-doc-example-1"]],decls:10,vars:4,consts:[["tuiGroup","","autocomplete","on",1,"wrapper",3,"formGroup"],["formControlName","cardNumber",1,"number"],["tuiTextfield","","inputmode","numeric","placeholder","0000 0000 0000 0000","autocomplete","cc-number",3,"maskito"],["formControlName","expire",1,"expired"],["tuiTextfield","","inputmode","numeric","placeholder","mm/yy","autocomplete","cc-exp",3,"maskito"],["formControlName","cvv",1,"cvv"],["tuiTextfield","","inputmode","numeric","placeholder","000","autocomplete","cc-csc",3,"maskito"]],template:function(e,t){1&e&&(g.TgZ(0,"form",0),g.TgZ(1,"tui-input",1),g._uU(2," Card number "),g._UZ(3,"input",2),g.qZA(),g.TgZ(4,"tui-input",3),g._uU(5," EXP "),g._UZ(6,"input",4),g.qZA(),g.TgZ(7,"tui-input",5),g._uU(8," CVV "),g._UZ(9,"input",6),g.qZA(),g.qZA()),2&e&&(g.Q6J("formGroup",t.form),g.xp6(3),g.Q6J("maskito",t.cardMask),g.xp6(3),g.Q6J("maskito",t.expiredMask),g.xp6(3),g.Q6J("maskito",t.cvvMask))},directives:[u._Y,u.JL,m.gZ,u.sg,d.K3,d.wU,u.JJ,u.u,k.MB,v.F,Z.r],styles:[".wrapper[_ngcontent-%COMP%]{display:flex;max-width:30rem}.number[_ngcontent-%COMP%]{flex:1 1 11rem}.cvv[_ngcontent-%COMP%]{flex:1 0 4rem}.expired[_ngcontent-%COMP%]{flex:1 0 5rem}"],changeDetection:0}),a),h=function(){var e=n(function e(){i(this,e),this.maskExpressionDocPage="/core-concepts/mask-expression",this.dateMaskDocPage="/kit/date",this.cardExample1={TypeScript:o.e(1508).then(o.t.bind(o,51508,17)),HTML:o.e(2362).then(o.t.bind(o,92362,17))}});return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=g.Xpm({type:e,selectors:[["card-doc"]],decls:17,vars:5,consts:[["header","Card","package","Recipes"],[1,"tui-space_top-0"],[1,"tui-list"],[1,"tui-list__item"],["tuiLink","",3,"routerLink"],["id","Card",3,"content"]],template:function(e,t){1&e&&(g.TgZ(0,"tui-doc-page",0),g.TgZ(1,"section"),g.TgZ(2,"p",1),g._uU(3," Creating mask for credit card input requires basic understanding of the following topics: "),g.qZA(),g.TgZ(4,"ul",2),g.TgZ(5,"li",3),g.TgZ(6,"a",4),g._uU(7," Pattern\xa0mask\xa0expression "),g.qZA(),g.qZA(),g.TgZ(8,"li",3),g._uU(9," How to use "),g.TgZ(10,"a",4),g._uU(11," Date "),g.qZA(),g._uU(12," mask from "),g.TgZ(13,"code"),g._uU(14,"@maskito/kit"),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.TgZ(15,"tui-doc-example",5),g._UZ(16,"card-doc-example-1"),g.qZA(),g.qZA()),2&e&&(g.xp6(6),g.Q6J("routerLink",t.maskExpressionDocPage),g.xp6(4),g.Q6J("routerLink",t.dateMaskDocPage),g.xp6(5),g.Udp("padding",0,"px"),g.Q6J("content",t.cardExample1))},directives:[l.qo,f.V,s.yS,l.f2,b],encapsulation:2,changeDetection:0}),e}(),x=function(){var e=n(function e(){i(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[c.ez,u.UX,p.U5,l.fV,d.Qf,m.n6,f.j,s.Bz.forChild((0,l.Ve)(h))]]}),e}()}}])}();