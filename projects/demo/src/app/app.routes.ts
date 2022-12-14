import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SandboxComponent} from './modules/sandbox/sandbox.component';

export const enum DemoPath {
    Time = 'kit/time',
}

export const appRoutes: Routes = [
    {
        path: '',
        component: SandboxComponent,
        data: {
            title: `Sandbox`,
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
