!function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(r=i.key,o=void 0,"symbol"==typeof(o=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(r,"string"))?o:String(o)),i)}var r,o}function t(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}(self.webpackChunkmaskito=self.webpackChunkmaskito||[]).push([[5022],{25022:function(e,r,o){o.r(r),o.d(r,{PostfixDocModule:function(){return _}});var a,u=o(12057),s=o(23738),c=o(55358),p=o(42905),l=o(7476),m=o(82847),f=o(60885),d=o(21673),g=o(74788),h={mask:function(e){var t=e.value,n=Array.from(t.replace(/%/g,"")).map(function(){return/\d/});return n.length?[].concat(i(n),["%"]):[/\d/]}},v=o(81620),x=o(49510),k=o(47258),y=((a=t(function e(){n(this,e),this.maskitoOptions=h,this.value=""})).\u0275fac=function(e){return new(e||a)},a.\u0275cmp=g.Xpm({type:a,selectors:[["postfix-doc-example-1"]],decls:3,vars:4,consts:[[3,"ngModel","ngModelChange"],["tuiTextfield","","inputmode","tel",3,"maskito"]],template:function(e,t){1&e&&(g.TgZ(0,"tui-input",0),g.NdJ("ngModelChange",function(e){return t.value=e}),g._uU(1," Enter percentage amount "),g._UZ(2,"input",1),g.qZA()),2&e&&(g.Udp("max-width",20,"rem"),g.Q6J("ngModel",t.value),g.xp6(2),g.Q6J("maskito",t.maskitoOptions))},directives:[d.K3,d.wU,s.JJ,s.On,v.MB,x.F,k.r],encapsulation:2,changeDetection:0}),a),U={mask:[/\d/,/\d/,":",/\d/,/\d/].concat(i(" pm")),overwriteMode:"replace"},b=function(){var e=t(function e(){n(this,e),this.maskitoOptions=U,this.value=""});return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=g.Xpm({type:e,selectors:[["postfix-doc-example-2"]],decls:3,vars:4,consts:[[3,"ngModel","ngModelChange"],["tuiTextfield","","inputmode","tel",3,"maskito"]],template:function(e,t){1&e&&(g.TgZ(0,"tui-input",0),g.NdJ("ngModelChange",function(e){return t.value=e}),g._uU(1," Enter time "),g._UZ(2,"input",1),g.qZA()),2&e&&(g.Udp("max-width",20,"rem"),g.Q6J("ngModel",t.value),g.xp6(2),g.Q6J("maskito",t.maskitoOptions))},directives:[d.K3,d.wU,s.JJ,s.On,v.MB,x.F,k.r],encapsulation:2,changeDetection:0}),e}();function Z(e,t){if(1&e&&(g._uU(0," This example is just demonstration how "),g.TgZ(1,"strong"),g._uU(2,"Maskito"),g.qZA(),g._uU(3," manages trailing fixed characters. "),g._UZ(4,"br"),g._uU(5," Use ready-to-use "),g.TgZ(6,"a",2),g._uU(7," Time "),g.qZA(),g._uU(8," mask for more comprehensive UX. ")),2&e){var n=g.oxw();g.xp6(6),g.Q6J("routerLink",n.timeMaskDocPage)}}var w=function(){var e=t(function e(){n(this,e),this.maskExpressionDocPage="/core-concepts/mask-expression",this.timeMaskDocPage="/kit/time",this.percentageExample1={MaskitoOptions:o.e(6526).then(o.t.bind(o,46526,17))},this.timeExample2={MaskitoOptions:o.e(6015).then(o.t.bind(o,86015,17))}});return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=g.Xpm({type:e,selectors:[["postfix-doc"]],decls:20,vars:4,consts:[["header","With postfix","package","Recipes"],["status","warning"],["tuiLink","",3,"routerLink"],["id","percentage","heading","Percentage",3,"content"],["id","time","heading","Time",3,"content","description"],["timeExampleDescription",""]],template:function(e,t){if(1&e&&(g.TgZ(0,"tui-doc-page",0),g.TgZ(1,"tui-notification",1),g._uU(2," The recipe requires basic understanding of "),g.TgZ(3,"strong"),g._uU(4,"pattern\xa0mask\xa0expression"),g.qZA(),g._uU(5," with "),g.TgZ(6,"strong"),g._uU(7,"fixed\xa0characters"),g.qZA(),g._uU(8," . "),g._UZ(9,"br"),g._uU(10," Read more about it in "),g.TgZ(11,"a",2),g._uU(12,' "Mask\xa0expression" '),g.qZA(),g._uU(13," topic. "),g.qZA(),g.TgZ(14,"tui-doc-example",3),g._UZ(15,"postfix-doc-example-1"),g.qZA(),g.TgZ(16,"tui-doc-example",4),g.YNc(17,Z,9,1,"ng-template",null,5,g.W1O),g._UZ(19,"postfix-doc-example-2"),g.qZA(),g.qZA()),2&e){var n=g.MAs(18);g.xp6(11),g.Q6J("routerLink",t.maskExpressionDocPage),g.xp6(3),g.Q6J("content",t.percentageExample1),g.xp6(2),g.Q6J("content",t.timeExample2)("description",n)}},directives:[l.qo,f.Ls,m.V,c.yS,l.f2,y,b],encapsulation:2,changeDetection:0}),e}(),_=function(){var e=t(function e(){n(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[u.ez,s.u5,p.U5,l.fV,d.Qf,m.j,f.Hi,c.Bz.forChild((0,l.Ve)(w))]]}),e}()}}])}();