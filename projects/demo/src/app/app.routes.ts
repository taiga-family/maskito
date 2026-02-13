import type {Routes} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {tuiProvideRoutePageTab} from '@taiga-ui/addon-doc';

/* eslint-disable @typescript-eslint/promise-function-async */

export const ROUTES: Routes = [
    // Getting started
    {
        path: '',
        loadComponent: () =>
            import('../pages/documentation/what-is-maskito/what-is-maskito.component'),
        title: 'What is Maskito?',
    },
    {
        path: DemoPath.WhatIsMaskito,
        loadComponent: () =>
            import('../pages/documentation/what-is-maskito/what-is-maskito.component'),
        title: 'What is Maskito?',
    },
    {
        path: DemoPath.MaskitoLibraries,
        loadComponent: () =>
            import('../pages/documentation/maskito-libraries/maskito-libraries.component'),
        title: 'Maskito libraries',
    },
    // Core concepts
    {
        path: DemoPath.CoreConceptsOverview,
        loadComponent: () =>
            import('../pages/documentation/core-concepts-overview/core-concepts-overview.component'),
        title: 'Core concepts',
    },
    {
        path: DemoPath.MaskExpression,
        loadComponent: () =>
            import('../pages/documentation/mask-expression/mask-expression.component'),
        title: 'Mask expression',
    },
    {
        path: DemoPath.ElementState,
        loadComponent: () =>
            import('../pages/documentation/element-state/element-state.component'),
        title: 'Element state',
    },
    {
        path: DemoPath.Processors,
        loadComponent: () =>
            import('../pages/documentation/processors/processors.component'),
        title: 'Processors',
    },
    {
        path: DemoPath.Plugins,
        loadComponent: () => import('../pages/documentation/plugins/plugins.component'),
        title: 'Plugins',
    },
    {
        path: DemoPath.OverwriteMode,
        loadComponent: () =>
            import('../pages/documentation/overwrite-mode/overwrite-mode.component'),
        title: 'Overwrite mode',
    },
    {
        path: DemoPath.Transformer,
        loadComponent: () =>
            import('../pages/documentation/transformer/transformer.component'),
        title: 'Transformer',
    },
    // Frameworks
    {
        path: DemoPath.Angular,
        loadComponent: () => import('../pages/frameworks/angular/angular-doc.component'),
        title: 'Angular',
    },
    {
        path: DemoPath.React,
        loadComponent: () => import('../pages/frameworks/react/react-doc.component'),
        title: 'React',
    },
    {
        path: DemoPath.Vue,
        loadComponent: () => import('../pages/frameworks/vue/vue-doc.component'),
        title: 'Vue',
    },
    // Kit
    {
        path: DemoPath.Number,
        loadComponent: () => import('../pages/kit/number/number-mask-doc.component'),
        title: 'Number',
    },
    {
        path: DemoPath.Time,
        loadComponent: () => import('../pages/kit/time/time-mask-doc.component'),
        title: 'Time',
    },
    {
        path: DemoPath.Date,
        loadComponent: () => import('../pages/kit/date/date-mask-doc.component'),
        title: 'Date',
    },
    {
        path: DemoPath.DateRange,
        loadComponent: () =>
            import('../pages/kit/date-range/date-range-mask-doc.component'),
        title: 'DateRange',
    },
    {
        path: DemoPath.KitPlugins,
        loadComponent: () => import('../pages/kit/plugins/kit-plugins-doc.component'),
        title: 'Plugins | @maskito/kit',
    },
    // Recipes
    {
        path: DemoPath.DateTime,
        loadComponent: () =>
            import('../pages/kit/date-time/date-time-mask-doc.component'),
        title: 'DateTime',
    },
    {
        path: DemoPath.Card,
        loadComponent: () => import('../pages/recipes/card/card-doc.component'),
        title: 'Card',
    },
    {
        path: DemoPath.Phone,
        loadComponent: () => import('../pages/recipes/phone/phone-doc.component'),
        title: 'Phone',
    },
    {
        path: DemoPath.PhonePackage,
        loadComponent: () => import('../pages/phone/phone-doc.component'),
        title: 'Phone',
    },
    {
        path: DemoPath.Textarea,
        loadComponent: () => import('../pages/recipes/textarea/textarea-doc.component'),
        title: 'Textarea',
    },
    {
        path: DemoPath.ContentEditable,
        loadComponent: () =>
            import('../pages/recipes/content-editable/content-editable-doc.component'),
        title: 'ContentEditable',
    },
    {
        path: DemoPath.Prefix,
        loadComponent: () => import('../pages/recipes/prefix/prefix-doc.component'),
        title: 'With prefix',
    },
    {
        path: DemoPath.Postfix,
        loadComponent: () => import('../pages/recipes/postfix/postfix-doc.component'),
        title: 'With postfix',
    },
    {
        path: DemoPath.Placeholder,
        loadComponent: () =>
            import('../pages/recipes/placeholder/placeholder-doc.component'),
        title: 'With placeholder',
    },
    {
        path: DemoPath.NetworkAddress,
        loadComponent: () =>
            import('../pages/recipes/network-address/network-address-doc.component'),
        title: 'Network address',
    },
    // Other
    {
        path: DemoPath.BrowserSupport,
        loadComponent: () =>
            import('../pages/documentation/browser-support/browser-support.component'),
        title: 'Browser support',
    },
    {
        path: DemoPath.SupportedInputTypes,
        loadComponent: () =>
            import('../pages/documentation/supported-input-types/supported-input-types.component'),
        title: 'Supported <input /> types',
    },
    {
        path: DemoPath.RealWorldForm,
        loadComponent: () => import('../pages/documentation/real-world-form'),
        title: 'Maskito in Real World Form',
    },
    {
        path: DemoPath.Stackblitz,
        loadComponent: () =>
            import('../pages/stackblitz').then((m) => m.StackblitzStarterComponent),
        title: 'Stackblitz Starter',
    },
]
    .map(tuiProvideRoutePageTab)
    .concat({
        path: '**',
        redirectTo: DemoPath.WhatIsMaskito,
    });
