import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SandboxComponent} from './modules/sandbox/sandbox.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: SandboxComponent,
        data: {
            title: `Sandbox`,
        },
    },
    {
        path: 'lazy',
        loadChildren: () => import(`./modules/lazy/lazy.module`).then(m => m.LazyModule),
    },
    {
        path: `kit/template`,
        loadChildren: () =>
            import(`../pages/kit/template/kit-template.module`).then(
                m => m.KitTemplateModule,
            ),
        data: {
            title: `KIT template`,
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
