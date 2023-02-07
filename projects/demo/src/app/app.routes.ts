import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoPath} from './demo-path';
import {SandboxComponent} from './modules/sandbox/sandbox.component';

export const appRoutes: Routes = [
    // Documentation
    {
        path: DemoPath.WhatIsMaskito,
        loadChildren: async () =>
            import(`../pages/documentation/what-is-maskito/what-is-maskito.module`).then(
                m => m.WhatIsMaskitoDocPageModule,
            ),
        data: {
            title: `What is Maskito?`,
        },
    },
    {
        path: DemoPath.MaskitoLibraries,
        loadChildren: async () =>
            import(
                `../pages/documentation/maskito-libraries/maskito-libraries.module`
            ).then(m => m.MaskitoLibrariesDocPageModule),
        data: {
            title: `Maskito libraries`,
        },
    },
    {
        path: DemoPath.CoreConceptsOverview,
        loadChildren: async () =>
            import(
                `../pages/documentation/core-concepts-overview/core-concepts-overview.module`
            ).then(m => m.CoreConceptsOverviewDocPageModule),
        data: {
            title: `Core concepts`,
        },
    },
    {
        path: DemoPath.MaskExpression,
        loadChildren: async () =>
            import(`../pages/documentation/mask-expression/mask-expression.module`).then(
                m => m.MaskExpressionDocPageModule,
            ),
        data: {
            title: `Mask expression`,
        },
    },
    {
        path: DemoPath.Processors,
        loadChildren: async () =>
            import(`../pages/documentation/processors/processors.module`).then(
                m => m.ProcessorsDocPageModule,
            ),
        data: {
            title: `Processors`,
        },
    },
    {
        path: DemoPath.OverwriteMode,
        loadChildren: async () =>
            import(`../pages/documentation/overwrite-mode/overwrite-mode.module`).then(
                m => m.OverwriteModeDocPageModule,
            ),
        data: {
            title: `Overwrite mode`,
        },
    },
    {
        path: DemoPath.BrowserSupport,
        loadChildren: async () =>
            import(`../pages/documentation/browser-support/browser-support.module`).then(
                m => m.BrowserSupportModule,
            ),
        data: {
            title: `Browser support`,
        },
    },
    // Kit
    {
        path: DemoPath.Number,
        loadChildren: async () =>
            import(`../pages/kit/number/number-mask-doc.module`).then(
                m => m.NumberMaskDocModule,
            ),
        data: {
            title: `Number`,
        },
    },
    {
        path: DemoPath.Time,
        loadChildren: async () =>
            import(`../pages/kit/time/time-mask-doc.module`).then(
                m => m.TimeMaskDocModule,
            ),
        data: {
            title: `Time`,
        },
    },
    {
        path: DemoPath.Sandbox,
        component: SandboxComponent,
        data: {
            title: `Sandbox`,
        },
    },
    {
        path: DemoPath.Date,
        loadChildren: async () =>
            import(`../pages/kit/date/date-mask-doc.module`).then(
                m => m.DateMaskDocModule,
            ),
        data: {
            title: `Date`,
        },
    },
    {
        path: DemoPath.DateRange,
        loadChildren: async () =>
            import(`../pages/kit/date-range/date-range-mask-doc.module`).then(
                m => m.DateRangeMaskDocModule,
            ),
        data: {
            title: `DateRange`,
        },
    },
    {
        path: DemoPath.Card,
        loadChildren: async () =>
            import(`../pages/recipes/card/card-doc.module`).then(m => m.CardDocModule),
        data: {
            title: `Card`,
        },
    },
    {
        path: DemoPath.Phone,
        loadChildren: async () =>
            import(`../pages/recipes/phone/phone-doc.module`).then(m => m.PhoneDocModule),
        data: {
            title: `Phone`,
        },
    },
    {
        path: '**',
        redirectTo: DemoPath.WhatIsMaskito,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking',
            relativeLinkResolution: 'corrected',
            scrollPositionRestoration: `enabled`,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
