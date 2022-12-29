import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SandboxComponent} from './modules/sandbox/sandbox.component';

export const enum DemoPath {
    Number = 'kit/number',
    Time = 'kit/time',
    BrowserSupport = 'documentation/browser-support',
}

export const appRoutes: Routes = [
    {
        path: '',
        component: SandboxComponent,
        data: {
            title: `Sandbox`,
        },
    },
    // Documentation
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
        path: '**',
        redirectTo: '',
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
