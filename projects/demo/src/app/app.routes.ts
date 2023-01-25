import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SandboxComponent} from './modules/sandbox/sandbox.component';

export const enum DemoPath {
    BrowserSupport = 'documentation/browser-support',
    WhatIsMaskito = 'getting-started/what-is-maskito',
    MaskitoLibraries = 'getting-started/maskito-libraries',
    CoreConceptsOverview = 'core-concepts/overview',
    MaskExpression = 'core-concepts/mask-expression',
    Processors = 'core-concepts/processors',
    OverwriteMode = 'core-concepts/overwrite-mode',
    Number = 'kit/number',
    Time = 'kit/time',
    Date = 'kit/date',
    DateRange = 'kit/date-range',
    Sandbox = 'sandbox',
}

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
