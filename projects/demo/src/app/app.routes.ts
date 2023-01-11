import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SandboxComponent} from './modules/sandbox/sandbox.component';

export const enum DemoPath {
    Number = 'kit/number',
    Time = 'kit/time',
    BrowserSupport = 'documentation/browser-support',
    WhatIsMaskito = 'getting-started/what-is-maskito',
    MaskitoLibraries = 'getting-started/maskito-libraries',
    CoreConceptsOverview = 'core-concepts/overview',
}

export const appRoutes: Routes = [
    // Documentation
    {
        path: DemoPath.WhatIsMaskito,
        loadChildren: () =>
            import(`../pages/documentation/what-is-maskito/what-is-maskito.module`).then(
                m => m.WhatIsMaskitoDocPageModule,
            ),
        data: {
            title: `What is Maskito?`,
        },
    },
    {
        path: DemoPath.MaskitoLibraries,
        loadChildren: () =>
            import(
                `../pages/documentation/maskito-libraries/maskito-libraries.module`
            ).then(m => m.MaskitoLibrariesDocPageModule),
        data: {
            title: `Maskito libraries`,
        },
    },
    {
        path: DemoPath.CoreConceptsOverview,
        loadChildren: () =>
            import(
                `../pages/documentation/core-concepts-overview/core-concepts-overview.module`
            ).then(m => m.CoreConceptsOverviewDocPageModule),
        data: {
            title: `Core concepts`,
        },
    },
    {
        path: DemoPath.BrowserSupport,
        loadChildren: () =>
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
        loadChildren: () =>
            import(`../pages/kit/number/number-mask-doc.module`).then(
                m => m.NumberMaskDocModule,
            ),
        data: {
            title: `Number`,
        },
    },
    {
        path: DemoPath.Time,
        loadChildren: () =>
            import(`../pages/kit/time/time-mask-doc.module`).then(
                m => m.TimeMaskDocModule,
            ),
        data: {
            title: `Time`,
        },
    },
    {
        path: 'sandbox',
        component: SandboxComponent,
        data: {
            title: `Sandbox`,
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
            initialNavigation: 'enabled',
            relativeLinkResolution: 'corrected',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
