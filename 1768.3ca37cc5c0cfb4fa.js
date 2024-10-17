"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[1768],{1768:(se,x,a)=>{a.r(x),a.d(x,{default:()=>oe});var u=a(8832),k=a(4768),g=a(1760),h=a(8844),c=a(7922),S=a(7355),V=a(9738),l=a(6801),d=a(4225);const j=(0,c.d5)({mode:"HH:MM:SS"});var e=a(2978),v=a(5014);let N=(()=>{var t;class s{constructor(){this.mask=j,this.value="23:59:59"}}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["time-mask-doc-example-1"]],standalone:!0,features:[e.aNF],decls:3,vars:4,consts:[["tuiTextfieldCustomContent","@tui.clock","tuiTextfieldFiller","hh:mm:ss",3,"ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(n,o){1&n&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(m){return o.value=m}),e.EFF(1," Enter 24-hour time format "),e.nrm(2,"input",1),e.k0s()),2&n&&(e.xc7("max-width",20,"rem"),e.Y8G("ngModel",o.value),e.R7$(2),e.Y8G("maskito",o.mask))},dependencies:[u.YN,u.BC,u.vS,h.u,l.zi,l.mp,l.Ws,v.Bw,d.CN,d.Rd,d.V4],encapsulation:2,changeDetection:0}),s})();var E=a(1860);const y=(0,c.d5)({mode:"HH:MM AA"}),B={...y,plugins:[...y.plugins,(0,c.hK)("blur",t=>{t.value.length>=5&&!t.value.endsWith("M")&&(0,E.Gq)(t,"".concat(t.value,"\xa0AM"))})]};let O=(()=>{var t;class s{constructor(){this.mask=B,this.value="03:30\xa0PM"}}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["time-mask-doc-example-2"]],standalone:!0,features:[e.aNF],decls:3,vars:4,consts:[["tuiTextfieldCustomContent","@tui.clock","tuiTextfieldFiller","HH:MM AA",3,"ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(n,o){1&n&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(m){return o.value=m}),e.EFF(1," Enter 12-hour time format "),e.nrm(2,"input",1),e.k0s()),2&n&&(e.xc7("max-width",20,"rem"),e.Y8G("ngModel",o.value),e.R7$(2),e.Y8G("maskito",o.mask))},dependencies:[u.YN,u.BC,u.vS,h.u,l.zi,l.mp,l.Ws,v.Bw,d.CN,d.Rd,d.V4],encapsulation:2,changeDetection:0}),s})();const C=(0,c.d5)({mode:"HH:MM:SS",step:1}),A={...C,plugins:[...C.plugins,(0,c.hK)("blur",t=>{const[s="",i="",n=""]=t.value.split(":");(0,E.Gq)(t,[s,i,n].map(o=>o.padEnd(2,"0")).join(":"))})]};let I=(()=>{var t;class s{constructor(){this.value="11:59:59",this.mask=A}}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["time-mask-doc-example-3"]],standalone:!0,features:[e.aNF],decls:2,vars:5,consts:[["tuiTextfieldCustomContent","@tui.clock","tuiTextfieldFiller","hh:mm:ss",3,"tuiTextfieldLabelOutside","ngModel","ngModelChange"],["inputmode","decimal","tuiTextfieldLegacy","",3,"maskito"]],template:function(n,o){1&n&&(e.j41(0,"tui-input",0),e.bIt("ngModelChange",function(m){return o.value=m}),e.nrm(1,"input",1),e.k0s()),2&n&&(e.xc7("max-width",20,"rem"),e.Y8G("tuiTextfieldLabelOutside",!0)("ngModel",o.value),e.R7$(1),e.Y8G("maskito",o.mask))},dependencies:[u.YN,u.BC,u.vS,h.u,l.zi,l.mp,l.Ws,v.Bw,d.CN,d.Rd,d.kf,d.V4],encapsulation:2,changeDetection:0}),s})();var z=a(7212),b=a(5851),_=a(4976),T=a(4822),f=a(4314);const D={size:"m"},G=(0,f.gc)(D);function H(t){return(0,f.eC)(G,t,D)}var M=a(9141),R=a(2831),w=a(3527);const Y=["*"];let U=(()=>{var t;class s{constructor(){this.controls=M.xQ,this.radios=M.xQ,this.links=M.xQ,this.elements=M.xQ,this.component=(0,e.WQX)(P),this.el=(0,T.qW)()}ngAfterContentInit(){(0,_.MJ)(this.controls).pipe((0,R.n)(()=>(0,_.lD)(this.controls.first)),(0,w.T)(n=>this.radios.toArray().findIndex(o=>o.value===n))).subscribe(n=>{this.component.update(n)})}ngAfterContentChecked(){var n;this.links.length&&this.update((null===(n=this.elements.get(this.linkIndex))||void 0===n?void 0:n.nativeElement)||null)}update(n){this.component.update(this.getIndex(n))}get linkIndex(){return this.links.toArray().findIndex(n=>n.isActive)}getIndex(n){return Array.from(this.el.children).findIndex(o=>o.contains(n))}}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275dir=e.FsC({type:t,contentQueries:function(n,o,r){if(1&n&&(e.wni(r,u.vO,5),e.wni(r,u.Fm,5),e.wni(r,k.wQ,4),e.wni(r,k.wQ,4,e.aKT)),2&n){let m;e.mGM(m=e.lsd())&&(o.controls=m),e.mGM(m=e.lsd())&&(o.radios=m),e.mGM(m=e.lsd())&&(o.links=m),e.mGM(m=e.lsd())&&(o.elements=m)}},hostBindings:function(n,o){1&n&&e.bIt("click",function(m){return o.update(m.target)})},standalone:!0}),s})(),P=(()=>{var t;class s{constructor(){this.el=(0,T.qW)(),this.sub=(0,e.WQX)(b.ke,{self:!0}).pipe((0,_.rB)(),(0,z.pQ)()).subscribe(()=>this.refresh()),this.size="s",this.activeItemIndex=0,this.activeItemIndexChange=new e.bkB}ngOnChanges(){this.refresh()}update(n){n===this.activeItemIndex||n<0||(this.activeItemIndex=n,this.activeItemIndexChange.emit(n),this.refresh())}get activeElement(){return this.el.children.item(this.activeItemIndex)}refresh(){const n=this.activeElement;if(!(0,T.Ki)(n))return;Array.from(this.el.children).forEach(ae=>ae.classList.remove("tui-segmented_active")),n.classList.add("tui-segmented_active");const{offsetWidth:o=0,offsetLeft:r=0,offsetTop:m=0}=n;this.el.style.setProperty("--t-top",(0,f.Pp)(m)),this.el.style.setProperty("--t-left",(0,f.Pp)(r)),this.el.style.setProperty("--t-width",(0,f.Pp)(o))}}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["tui-segmented"]],hostVars:1,hostBindings:function(n,o){2&n&&e.BMQ("data-size",o.size)},inputs:{size:"size",activeItemIndex:"activeItemIndex"},outputs:{activeItemIndexChange:"activeItemIndexChange"},standalone:!0,features:[e.Jv_([b.ke,H({size:"s"})]),e.OA$,e.aNF,e.nM4([U])],ngContentSelectors:Y,decls:1,vars:0,template:function(n,o){1&n&&(e.NAR(),e.SdG(0))},styles:['tui-segmented{position:relative;display:flex;color:var(--tui-background-base);background:var(--tui-background-neutral-1);overflow:hidden}tui-segmented[data-size=s]{--t-padding: .5rem;--t-gap: .5rem;--t-margin: -.125rem;--t-height: var(--tui-height-s);font:var(--tui-font-text-s);border-radius:var(--tui-radius-m)}tui-segmented[data-size=s] tui-icon{font-size:1rem}tui-segmented[data-size=m]{--t-padding: .875rem;--t-gap: 1rem;--t-margin: -.375rem;--t-height: var(--tui-height-m);font:var(--tui-font-text-m);border-radius:var(--tui-radius-m)}tui-segmented[data-size=l]{--t-padding: 1.25rem;--t-gap: 1rem;--t-margin: -.375rem;--t-height: var(--tui-height-l);font:var(--tui-font-text-l);border-radius:var(--tui-radius-l)}tui-segmented[data-size=l]>*:before{block-size:1.25rem}tui-segmented>a,tui-segmented>button,tui-segmented>label,tui-segmented>label>input:not([tuiRadio]){transition-property:color,background,opacity,border-image;transition-duration:var(--tui-duration, .3s);transition-timing-function:ease-in-out;-webkit-appearance:none;appearance:none;padding:0;border:0;background:none;font-size:inherit;line-height:inherit;text-decoration:none;position:relative;display:flex;align-items:center;justify-content:center;block-size:var(--t-height);white-space:nowrap;gap:var(--t-gap);margin:0;padding:0 var(--t-padding);color:var(--tui-text-primary);overflow:hidden;cursor:pointer;font:inherit;border-radius:inherit;border:.125rem solid transparent;background-clip:padding-box;box-sizing:border-box;border-image:linear-gradient(var(--tui-border-normal),transparent) 1 / 0 0 25% .5 / 0 0 100 .5;clip-path:polygon(-1rem calc(50% - .5rem),1px calc(50% - .5rem),1px 0,100% 0,100% 100%,1px 100%,1px calc(50% + .5rem),-1rem calc(50% + .5rem))}tui-segmented>a>*,tui-segmented>button>*,tui-segmented>label>*,tui-segmented>label>input:not([tuiRadio])>*{margin:0 var(--t-margin)}tui-segmented>a:focus-visible,tui-segmented>button:focus-visible,tui-segmented>label:focus-visible,tui-segmented>label>input:not([tuiRadio]):focus-visible{outline:.125rem solid var(--tui-border-focus);outline-offset:-.25rem}@media (hover: hover){tui-segmented>a:not(.tui-segmented_active):not(:active):hover,tui-segmented>button:not(.tui-segmented_active):not(:active):hover,tui-segmented>label:not(.tui-segmented_active):not(:active):hover,tui-segmented>label>input:not([tuiRadio]):not(.tui-segmented_active):not(:active):hover{background-color:var(--tui-background-neutral-1-hover)}tui-segmented>a:not(.tui-segmented_active):not(:active):hover,tui-segmented>button:not(.tui-segmented_active):not(:active):hover,tui-segmented>label:not(.tui-segmented_active):not(:active):hover,tui-segmented>label>input:not([tuiRadio]):not(.tui-segmented_active):not(:active):hover,tui-segmented>a:not(.tui-segmented_active):not(:active):hover+*,tui-segmented>button:not(.tui-segmented_active):not(:active):hover+*,tui-segmented>label:not(.tui-segmented_active):not(:active):hover+*,tui-segmented>label>input:not([tuiRadio]):not(.tui-segmented_active):not(:active):hover+*{border-image:linear-gradient(var(--tui-border-normal),transparent) 1 / 0 0 25% .5 / 100 0 0 .5}tui-segmented>a.tui-segmented_active:hover,tui-segmented>button.tui-segmented_active:hover,tui-segmented>label.tui-segmented_active:hover,tui-segmented>label>input:not([tuiRadio]).tui-segmented_active:hover{opacity:var(--tui-disabled-opacity)}}tui-segmented>a:active,tui-segmented>button:active,tui-segmented>label:active,tui-segmented>label>input:not([tuiRadio]):active,tui-segmented>a:active+*,tui-segmented>button:active+*,tui-segmented>label:active+*,tui-segmented>label>input:not([tuiRadio]):active+*,tui-segmented>a.tui-segmented_active,tui-segmented>button.tui-segmented_active,tui-segmented>label.tui-segmented_active,tui-segmented>label>input:not([tuiRadio]).tui-segmented_active,tui-segmented>a.tui-segmented_active+*,tui-segmented>button.tui-segmented_active+*,tui-segmented>label.tui-segmented_active+*,tui-segmented>label>input:not([tuiRadio]).tui-segmented_active+*{border-image:linear-gradient(var(--tui-border-normal),transparent) 1 / 0 0 25% .5 / 100 0 0 .5}tui-segmented>label>input:not([tuiRadio]){position:absolute;top:-.125rem;left:-.125rem;right:-.125rem;bottom:-.125rem;background:transparent!important}tui-segmented:before{transition-property:top,left,width;transition-duration:var(--tui-duration, .3s);transition-timing-function:ease-in-out;content:"";position:absolute;left:var(--t-left);top:var(--t-top);block-size:var(--t-height);inline-size:var(--t-width);border-radius:inherit;background:currentColor;background-clip:padding-box;border:.125rem solid transparent;box-sizing:border-box;filter:drop-shadow(0 .25rem 1.25rem rgba(0,0,0,.1))}[tuiTheme=dark] tui-segmented,tui-segmented[tuiTheme=dark]{--tui-background-base: var(--tui-background-neutral-1-hover)}\n'],encapsulation:2,changeDetection:0}),s})();const X=(0,c.d5)({mode:"HH:MM",timeSegmentMaxValues:{hours:12},timeSegmentMinValues:{hours:1}});var F=a(2734);let L=(()=>{var t;class s{constructor(){this.value="03:30",this.mask=X}}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["time-mask-doc-example-4"]],standalone:!0,features:[e.aNF],decls:7,vars:5,consts:[["filler","HH:MM",3,"tuiTextfieldCleaner"],["inputmode","decimal","tuiTextfield","",3,"maskito","ngModel","ngModelChange"],["type","button"]],template:function(n,o){1&n&&(e.j41(0,"tui-textfield",0)(1,"input",1),e.bIt("ngModelChange",function(m){return o.value=m}),e.k0s(),e.j41(2,"tui-segmented")(3,"button",2),e.EFF(4,"AM"),e.k0s(),e.j41(5,"button",2),e.EFF(6,"PM"),e.k0s()()()),2&n&&(e.xc7("max-width",20,"rem"),e.Y8G("tuiTextfieldCleaner",!1),e.R7$(1),e.Y8G("maskito",o.mask)("ngModel",o.value))},dependencies:[u.YN,u.me,u.BC,u.vS,h.u,P,F.Bw,F.j8,F.TB],encapsulation:2,changeDetection:0}),s})();var p=a(9239);function $(t,s){if(1&t&&(e.j41(0,"p",12),e.EFF(1," Use "),e.j41(2,"code"),e.EFF(3,"mode"),e.k0s(),e.EFF(4," property to set time format. See the full list of available mode on "),e.j41(5,"a",13),e.EFF(6," API\xa0page "),e.k0s(),e.EFF(7," of the documentation. "),e.k0s()),2&t){const i=e.XpG(2);e.R7$(5),e.Mz_("routerLink","/",i.pages.Time,"/API")}}function Q(t,s){1&t&&(e.EFF(0," Any "),e.j41(1,"code"),e.EFF(2,"mode"),e.k0s(),e.EFF(3," ending with "),e.j41(4,"code"),e.EFF(5,"AA"),e.k0s(),e.EFF(6," is 12-hour time format with meridiem part. "))}function W(t,s){1&t&&(e.j41(0,"p",12),e.EFF(1," Property "),e.j41(2,"code"),e.EFF(3,"step"),e.k0s(),e.EFF(4," allows you to increment/decrement time segments by pressing "),e.j41(5,"code"),e.EFF(6,"ArrowUp"),e.k0s(),e.EFF(7," / "),e.j41(8,"code"),e.EFF(9,"ArrowDown"),e.k0s(),e.EFF(10," . "),e.k0s(),e.j41(11,"p",14),e.EFF(12," Use "),e.j41(13,"code"),e.EFF(14,"step === 0"),e.k0s(),e.EFF(15," (default value) to disable this feature. "),e.k0s())}function K(t,s){1&t&&(e.j41(0,"p",12),e.EFF(1," Property "),e.j41(2,"code"),e.EFF(3,"timeSegmentMinValues"),e.k0s(),e.EFF(4," / "),e.j41(5,"code"),e.EFF(6,"timeSegmentMaxValues"),e.k0s(),e.EFF(7," allows you to set min/max value for every time segment. "),e.k0s(),e.j41(8,"p",14)(9,"strong"),e.EFF(10,"Time segments"),e.k0s(),e.EFF(11," are units of the time which form time string. For example, "),e.j41(12,"code"),e.EFF(13,"HH:MM"),e.k0s(),e.EFF(14," consists of two time segments: hours and minutes. "),e.k0s())}function J(t,s){if(1&t&&(e.EFF(0," Use "),e.j41(1,"code"),e.EFF(2,"maskitoTimeOptionsGenerator"),e.k0s(),e.EFF(3," to create a mask for time input. "),e.j41(4,"tui-notification",2)(5,"div"),e.EFF(6," Despite the name of the mask, element's raw value is still string. "),e.j41(7,"p"),e.EFF(8," Use "),e.j41(9,"code"),e.EFF(10,"maskitoParseTime"),e.k0s(),e.EFF(11," to get milliseconds from masked string. "),e.k0s(),e.j41(12,"p"),e.EFF(13," Use "),e.j41(14,"code"),e.EFF(15,"maskitoStringifyTime"),e.k0s(),e.EFF(16," to get the masked string from milliseconds. "),e.k0s(),e.nrm(17,"tui-doc-code",3),e.k0s()(),e.j41(18,"tui-doc-example",4),e.DNE(19,$,8,1,"ng-template",null,5,e.C5r),e.nrm(21,"time-mask-doc-example-1"),e.k0s(),e.j41(22,"tui-doc-example",6),e.DNE(23,Q,7,0,"ng-template",null,7,e.C5r),e.nrm(25,"time-mask-doc-example-2"),e.k0s(),e.j41(26,"tui-doc-example",8),e.DNE(27,W,16,0,"ng-template",null,9,e.C5r),e.nrm(29,"time-mask-doc-example-3"),e.k0s(),e.j41(30,"tui-doc-example",10),e.DNE(31,K,15,0,"ng-template",null,11,e.C5r),e.nrm(33,"time-mask-doc-example-4"),e.k0s()),2&t){const i=e.sdS(20),n=e.sdS(24),o=e.sdS(28),r=e.sdS(32),m=e.XpG();e.R7$(17),e.Y8G("code",m.maskitoParseStringifyTimeDemo),e.R7$(1),e.Y8G("content",m.modeExample1)("description",i),e.R7$(4),e.Y8G("content",m.amPmExample2)("description",n),e.R7$(4),e.Y8G("content",m.stepExample3)("description",o),e.R7$(4),e.Y8G("content",m.timeSegmentsMinMaxExample4)("description",r)}}function Z(t,s){if(1&t&&(e.j41(0,"tui-input",20),e.EFF(1," Enter time "),e.nrm(2,"input",21),e.k0s()),2&t){const i=e.XpG(2);e.Y8G("formControl",i.apiPageControl)("tuiTextfieldFiller",i.mode.toLowerCase()),e.R7$(2),e.Y8G("maskito",i.maskitoOptions)}}function q(t,s){1&t&&e.EFF(0," Time format mode ")}function ee(t,s){1&t&&(e.EFF(0," Minimum value for each time segment "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.nrm(4,"br"),e.j41(5,"code"),e.EFF(6,"{hours: 0}"),e.k0s(),e.EFF(7," \xa0/\xa0 "),e.j41(8,"code"),e.EFF(9,"{hours: 1}"),e.k0s(),e.EFF(10," for "),e.j41(11,"code"),e.EFF(12,"mode"),e.k0s(),e.EFF(13," without\xa0/\xa0with meridiem period "),e.k0s())}function te(t,s){1&t&&(e.EFF(0," Maximum value for each time segment "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.nrm(4,"br"),e.j41(5,"code"),e.EFF(6,"{hours: 24}"),e.k0s(),e.EFF(7," \xa0/\xa0 "),e.j41(8,"code"),e.EFF(9,"{hours: 12}"),e.k0s(),e.EFF(10," for "),e.j41(11,"code"),e.EFF(12,"mode"),e.k0s(),e.EFF(13," without\xa0/\xa0with meridiem period "),e.k0s())}function ne(t,s){1&t&&(e.EFF(0," The value by which the keyboard arrows increment/decrement time segments "),e.j41(1,"p")(2,"strong"),e.EFF(3,"Default:"),e.k0s(),e.j41(4,"code"),e.EFF(5,"0"),e.k0s(),e.EFF(6," (disable stepping) "),e.k0s())}function ie(t,s){if(1&t){const i=e.RV6();e.j41(0,"tui-doc-demo",15),e.DNE(1,Z,3,3,"ng-template"),e.k0s(),e.j41(2,"tui-doc-documentation"),e.DNE(3,q,1,0,"ng-template",16),e.bIt("documentationPropertyValueChange",function(o){e.eBV(i);const r=e.XpG();return e.Njj(r.mode=o)})("documentationPropertyValueChange",function(){e.eBV(i);const o=e.XpG();return e.Njj(o.updateOptions())}),e.DNE(4,ee,14,0,"ng-template",17),e.bIt("documentationPropertyValueChange",function(o){e.eBV(i);const r=e.XpG();return e.Njj(r.timeSegmentMinValues=o)})("documentationPropertyValueChange",function(){e.eBV(i);const o=e.XpG();return e.Njj(o.updateOptions())}),e.DNE(5,te,14,0,"ng-template",18),e.bIt("documentationPropertyValueChange",function(o){e.eBV(i);const r=e.XpG();return e.Njj(r.timeSegmentMaxValues=o)})("documentationPropertyValueChange",function(){e.eBV(i);const o=e.XpG();return e.Njj(o.updateOptions())}),e.DNE(6,ne,7,0,"ng-template",19),e.bIt("documentationPropertyValueChange",function(o){e.eBV(i);const r=e.XpG();return e.Njj(r.step=o)})("documentationPropertyValueChange",function(){e.eBV(i);const o=e.XpG();return e.Njj(o.updateOptions())}),e.k0s()}if(2&t){const i=e.XpG();e.Y8G("control",i.apiPageControl),e.R7$(3),e.Y8G("documentationPropertyValues",i.modeOptions)("documentationPropertyValue",i.mode),e.R7$(1),e.Y8G("documentationPropertyValues",i.timeSegmentMinValuesOptions)("documentationPropertyValue",i.timeSegmentMinValues),e.R7$(1),e.Y8G("documentationPropertyValues",i.timeSegmentMaxValuesOptions)("documentationPropertyValue",i.timeSegmentMaxValues),e.R7$(1),e.Y8G("documentationPropertyValue",i.step)}}const oe=(()=>{var t;class s{constructor(){this.pages=g.$,this.maskitoParseStringifyTimeDemo=a.e(8468).then(a.t.bind(a,8468,17)),this.modeExample1={[g.w.MaskitoOptions]:a.e(3493).then(a.t.bind(a,3493,17))},this.amPmExample2={[g.w.MaskitoOptions]:a.e(5152).then(a.t.bind(a,5152,17))},this.stepExample3={[g.w.MaskitoOptions]:a.e(1981).then(a.t.bind(a,1981,17))},this.timeSegmentsMinMaxExample4={[g.w.MaskitoOptions]:a.e(9188).then(a.t.bind(a,9188,17))},this.apiPageControl=new u.MJ(""),this.modeOptions=["HH:MM","HH:MM AA","HH:MM:SS","HH:MM:SS AA","HH:MM:SS.MSS","HH:MM:SS.MSS AA","HH","HH AA","MM:SS.MSS","SS.MSS"],this.timeSegmentMaxValuesOptions=[{},{hours:23,minutes:59,seconds:59,milliseconds:999},{hours:11},{hours:5,minutes:5,seconds:5,milliseconds:5}],this.timeSegmentMinValuesOptions=[{},{hours:1}],this.mode=this.modeOptions[0],this.timeSegmentMinValues=this.timeSegmentMinValuesOptions[0],this.timeSegmentMaxValues=this.timeSegmentMaxValuesOptions[0],this.step=0,this.maskitoOptions=(0,c.d5)(this)}updateOptions(){this.maskitoOptions=(0,c.d5)(this)}}return(t=s).\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.VBU({type:t,selectors:[["time-mask-doc"]],standalone:!0,features:[e.aNF],decls:3,vars:0,consts:[["header","Time","package","KIT"],["pageTab",""],["size","m",1,"tui-space_top-4"],[3,"code"],["id","mode","heading","Mode",3,"content","description"],["modeDescription",""],["id","am-pm","heading","AM / PM",3,"content","description"],["amPmDescription",""],["id","step","heading","Arrows stepping",3,"content","description"],["stepDescription",""],["id","time-segment-min-max","heading","Min / max value for every time segment",3,"content","description"],["timeSegmentMinMaxDescription",""],[1,"tui-space_top-0","tui-space_bottom-1"],["tuiLink","",3,"routerLink"],[1,"tui-space_top-0"],[3,"control"],["documentationPropertyMode","input","documentationPropertyName","mode","documentationPropertyType","MaskitoTimeMode",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","timeSegmentMinValues","documentationPropertyType","MaskitoTimeSegments<number>",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","timeSegmentMaxValues","documentationPropertyType","MaskitoTimeSegments<number>",3,"documentationPropertyValues","documentationPropertyValue","documentationPropertyValueChange"],["documentationPropertyMode","input","documentationPropertyName","step","documentationPropertyType","number",3,"documentationPropertyValue","documentationPropertyValueChange"],["tuiTextfieldCustomContent","@tui.clock",1,"input-time",3,"formControl","tuiTextfieldFiller"],["inputmode","numeric","tuiTextfieldLegacy","",3,"maskito"]],template:function(n,o){1&n&&(e.j41(0,"tui-doc-page",0),e.DNE(1,J,34,9,"ng-template",1),e.DNE(2,ie,7,8,"ng-template",1),e.k0s())},dependencies:[h.u,u.X1,u.BC,u.l_,k.Wk,N,O,I,L,p.aD,p.MN,p.FS,p.FC,p.df,p.e3,p.ic,l.zi,l.mp,l.Ws,v.Bw,S.Jc,V.wS,d.CN,d.Rd,d.V4],styles:[".input-time[_ngcontent-%COMP%]{max-inline-size:25rem}.input-time[_ngcontent-%COMP%]:not(:last-child){margin-bottom:1rem}"],changeDetection:0}),s})()}}]);