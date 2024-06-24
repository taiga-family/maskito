import {NgModule} from '@angular/core';
import type {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {DemoPath} from '@demo/constants';

/* eslint-disable @typescript-eslint/promise-function-async */

export const appRoutes: Routes = [
    // Getting started
    {
        path: DemoPath.WhatIsMaskito,
        loadComponent: () =>
            import('../pages/documentation/what-is-maskito/what-is-maskito.component'),
        data: {
            title: 'What is Maskito?',
        },
    },
    {
        path: DemoPath.MaskitoLibraries,
        loadComponent: () =>
            import(
                '../pages/documentation/maskito-libraries/maskito-libraries.component'
            ),
        data: {
            title: 'Maskito libraries',
        },
    },
    // Core concepts
    {
        path: DemoPath.CoreConceptsOverview,
        loadComponent: () =>
            import(
                '../pages/documentation/core-concepts-overview/core-concepts-overview.component'
            ),
        data: {
            title: 'Core concepts',
        },
    },
    {
        path: DemoPath.MaskExpression,
        loadComponent: () =>
            import('../pages/documentation/mask-expression/mask-expression.component'),
        data: {
            title: 'Mask expression',
        },
    },
    {
        path: DemoPath.ElementState,
        loadComponent: () =>
            import('../pages/documentation/element-state/element-state.component'),
        data: {
            title: 'Element state',
        },
    },
    {
        path: DemoPath.Processors,
        loadComponent: () =>
            import('../pages/documentation/processors/processors.component'),
        data: {
            title: 'Processors',
        },
    },
    {
        path: DemoPath.Plugins,
        loadComponent: () => import('../pages/documentation/plugins/plugins.component'),
        data: {
            title: 'Plugins',
        },
    },
    {
        path: DemoPath.OverwriteMode,
        loadComponent: () =>
            import('../pages/documentation/overwrite-mode/overwrite-mode.component'),
        data: {
            title: 'Overwrite mode',
        },
    },
    {
        path: DemoPath.Transformer,
        loadComponent: () =>
            import('../pages/documentation/transformer/transformer.component'),
        data: {
            title: 'Transformer',
        },
    },
    // Frameworks
    {
        path: DemoPath.Angular,
        loadChildren: () => import('../pages/frameworks/angular'),
        data: {
            title: 'Angular',
        },
    },
    {
        path: DemoPath.React,
        loadComponent: () => import('../pages/frameworks/react/react-doc.component'),
        data: {
            title: 'React',
        },
    },
    {
        path: DemoPath.Vue,
        loadComponent: () => import('../pages/frameworks/vue/vue-doc.component'),
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
        loadChildren: () => import('../pages/phone'),
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
        path: DemoPath.ContentEditable,
        loadComponent: () =>
            import('../pages/recipes/content-editable/content-editable-doc.component'),
        data: {
            title: 'ContentEditable',
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
        loadComponent: () =>
            import('../pages/documentation/browser-support/browser-support.component'),
        data: {
            title: 'Browser support',
        },
    },
    {
        path: DemoPath.SupportedInputTypes,
        loadComponent: () =>
            import(
                '../pages/documentation/supported-input-types/supported-input-types.component'
            ),
        data: {
            title: 'Supported <input /> types',
        },
    },
    {
        path: DemoPath.RealWorldForm,
        loadComponent: () => import('../pages/documentation/real-world-form'),
        data: {
            title: 'Maskito in Real World Form',
        },
    },
    {
        path: DemoPath.Changelog,
        loadComponent: () =>
            import('../pages/documentation/changelog/changelog.component'),
        data: {
            title: 'Changelog',
        },
    },
    {
        path: DemoPath.Stackblitz,
        loadComponent: () =>
            import('../pages/stackblitz').then(m => m.StackblitzStarterComponent),
        data: {
            title: 'Stackblitz Starter',
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
