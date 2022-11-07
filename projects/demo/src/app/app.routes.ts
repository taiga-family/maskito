import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StaticComponent} from './modules/static/static.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: StaticComponent,
    },
    {
        path: 'lazy',
        loadChildren: () => import(`./modules/lazy/lazy.module`).then(m => m.LazyModule),
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
