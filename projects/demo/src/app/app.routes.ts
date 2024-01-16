import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoPath} from '@demo/constants';

/* eslint-disable @typescript-eslint/promise-function-async */

export const appRoutes: Routes = [
    // Getting started
    {
        path: DemoPath.WhatIsMaskito,
        loadChildren: () =>
            import('../pages/documentation/what-is-maskito/what-is-maskito.module').then(
                m => m.WhatIsMaskitoDocPageModule,
            ),
        data: {
            title: 'What is Maskito?',
        },
    },
    {
        path: DemoPath.MaskitoLibraries,
        loadChildren: () =>
            import(
                '../pages/documentation/maskito-libraries/maskito-libraries.module'
            ).then(m => m.MaskitoLibrariesDocPageModule),
        data: {
            title: 'Maskito libraries',
        },
    },
    // Core concepts
    {
        path: DemoPath.CoreConceptsOverview,
        loadChildren: () =>
            import(
                '../pages/documentation/core-concepts-overview/core-concepts-overview.module'
            ).then(m => m.CoreConceptsOverviewDocPageModule),
        data: {
            title: 'Core concepts',
        },
    },
    {
        path: DemoPath.MaskExpression,
        loadChildren: () =>
            import('../pages/documentation/mask-expression/mask-expression.module').then(
                m => m.MaskExpressionDocPageModule,
            ),
        data: {
            title: 'Mask expression',
        },
    },
    {
        path: DemoPath.ElementState,
        loadChildren: () =>
            import('../pages/documentation/element-state/element-state.module').then(
                m => m.ElementStateDocPageModule,
            ),
        data: {
            title: 'Element state',
        },
    },
    {
        path: DemoPath.Processors,
        loadChildren: () =>
            import('../pages/documentation/processors/processors.module').then(
                m => m.ProcessorsDocPageModule,
            ),
        data: {
            title: 'Processors',
        },
    },
    {
        path: DemoPath.Plugins,
        loadChildren: () =>
            import('../pages/documentation/plugins/plugins.module').then(
                m => m.PluginsDocPageModule,
            ),
        data: {
            title: 'Plugins',
        },
    },
    {
        path: DemoPath.OverwriteMode,
        loadChildren: () =>
            import('../pages/documentation/overwrite-mode/overwrite-mode.module').then(
                m => m.OverwriteModeDocPageModule,
            ),
        data: {
            title: 'Overwrite mode',
        },
    },
    {
        path: DemoPath.Transformer,
        loadChildren: () =>
            import('../pages/documentation/transformer/transformer.module').then(
                m => m.TransformerDocPageModule,
            ),
        data: {
            title: 'Transformer',
        },
    },
    // Frameworks
    {
        path: DemoPath.Angular,
        loadChildren: () =>
            import('../pages/frameworks/angular/angular-doc.module').then(
                m => m.AngularDocPageModule,
            ),
        data: {
            title: 'Angular',
        },
    },
    {
        path: DemoPath.React,
        loadChildren: () =>
            import('../pages/frameworks/react/react-doc.module').then(
                m => m.ReactDocPageModule,
            ),
        data: {
            title: 'React',
        },
    },
    {
        path: DemoPath.Vue,
        loadChildren: () =>
            import('../pages/frameworks/vue/vue-doc.module').then(
                m => m.VueDocPageModule,
            ),
        data: {
            title: 'Vue',
        },
    },
    // Kit
    {
        path: DemoPath.Number,
        loadChildren: () => import('../pages/kit/number'),
        data: {
            title: 'Number',
        },
    },
    {
        path: DemoPath.Time,
        loadChildren: () => import('../pages/kit/time'),
        data: {
            title: 'Time',
        },
    },
    {
        path: DemoPath.Date,
        loadChildren: () => import('../pages/kit/date'),
        data: {
            title: 'Date',
        },
    },
    {
        path: DemoPath.DateRange,
        loadChildren: () => import('../pages/kit/date-range'),
        data: {
            title: 'DateRange',
        },
    },
    // Recipes
    {
        path: DemoPath.DateTime,
        loadChildren: () => import('../pages/kit/date-time'),
        data: {
            title: 'DateTime',
        },
    },
    {
        path: DemoPath.Card,
        loadComponent: () => import('../pages/recipes/card/card-doc.component'),
        data: {
            title: 'Card',
        },
    },
    {
        path: DemoPath.Phone,
        loadComponent: () => import('../pages/recipes/phone/phone-doc.component'),
        data: {
            title: 'Phone',
        },
    },
    {
        path: DemoPath.PhonePackage,
        loadChildren: () =>
            import('../pages/phone/phone-doc.module').then(m => m.PhoneDocModule),
        data: {
            title: 'Phone',
        },
    },
    {
        path: DemoPath.Textarea,
        loadComponent: () => import('../pages/recipes/textarea/textarea-doc.component'),
        data: {
            title: 'Textarea',
        },
    },
    {
        path: DemoPath.Prefix,
        loadComponent: () => import('../pages/recipes/prefix/prefix-doc.component'),
        data: {
            title: 'With prefix',
        },
    },
    {
        path: DemoPath.Postfix,
        loadComponent: () => import('../pages/recipes/postfix/postfix-doc.component'),
        data: {
            title: 'With postfix',
        },
    },
    {
        path: DemoPath.Placeholder,
        loadComponent: () =>
            import('../pages/recipes/placeholder/placeholder-doc.component'),
        data: {
            title: 'With placeholder',
        },
    },
    // Other
    {
        path: DemoPath.BrowserSupport,
        loadChildren: () =>
            import('../pages/documentation/browser-support/browser-support.module').then(
                m => m.BrowserSupportModule,
            ),
        data: {
            title: 'Browser support',
        },
    },
    {
        path: DemoPath.Changelog,
        loadChildren: () =>
            import('../pages/documentation/changelog/changelog.module').then(
                m => m.ChangelogModule,
            ),
        data: {
            title: 'Changelog',
        },
    },
    {
        path: DemoPath.Stackblitz,
        loadChildren: () =>
            import('../pages/stackblitz').then(m => m.StackblitzStarterModule),
        data: {
            title: 'Stackblitz Starter',
        },
    },
    // TODO: replace this page with Cypress Component Testing after angular13+ update
    {
        path: DemoPath.Cypress,
        loadChildren: () =>
            import('../pages/cypress/cypress.module').then(m => m.CypressDocPageModule),
        data: {
            title: 'Cypress tests 🤫',
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
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
