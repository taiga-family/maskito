import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoPath} from '@demo/constants';

export const appRoutes: Routes = [
    // Getting started
    {
        path: DemoPath.WhatIsMaskito,
        loadChildren: async () =>
            import('../pages/documentation/what-is-maskito/what-is-maskito.module').then(
                m => m.WhatIsMaskitoDocPageModule,
            ),
        data: {
            title: 'What is Maskito?',
        },
    },
    {
        path: DemoPath.MaskitoLibraries,
        loadChildren: async () =>
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
        loadChildren: async () =>
            import(
                '../pages/documentation/core-concepts-overview/core-concepts-overview.module'
            ).then(m => m.CoreConceptsOverviewDocPageModule),
        data: {
            title: 'Core concepts',
        },
    },
    {
        path: DemoPath.MaskExpression,
        loadChildren: async () =>
            import('../pages/documentation/mask-expression/mask-expression.module').then(
                m => m.MaskExpressionDocPageModule,
            ),
        data: {
            title: 'Mask expression',
        },
    },
    {
        path: DemoPath.ElementState,
        loadChildren: async () =>
            import('../pages/documentation/element-state/element-state.module').then(
                m => m.ElementStateDocPageModule,
            ),
        data: {
            title: 'Element state',
        },
    },
    {
        path: DemoPath.Processors,
        loadChildren: async () =>
            import('../pages/documentation/processors/processors.module').then(
                m => m.ProcessorsDocPageModule,
            ),
        data: {
            title: 'Processors',
        },
    },
    {
        path: DemoPath.Plugins,
        loadChildren: async () =>
            import('../pages/documentation/plugins/plugins.module').then(
                m => m.PluginsDocPageModule,
            ),
        data: {
            title: 'Plugins',
        },
    },
    {
        path: DemoPath.OverwriteMode,
        loadChildren: async () =>
            import('../pages/documentation/overwrite-mode/overwrite-mode.module').then(
                m => m.OverwriteModeDocPageModule,
            ),
        data: {
            title: 'Overwrite mode',
        },
    },
    {
        path: DemoPath.Transformer,
        loadChildren: async () =>
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
        loadChildren: async () =>
            import('../pages/frameworks/angular/angular-doc.module').then(
                m => m.AngularDocPageModule,
            ),
        data: {
            title: 'Angular',
        },
    },
    {
        path: DemoPath.React,
        loadChildren: async () =>
            import('../pages/frameworks/react/react-doc.module').then(
                m => m.ReactDocPageModule,
            ),
        data: {
            title: 'React',
        },
    },
    {
        path: DemoPath.Vue,
        loadChildren: async () =>
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
        loadChildren: async () =>
            import('../pages/kit/number/number-mask-doc.module').then(
                m => m.NumberMaskDocModule,
            ),
        data: {
            title: 'Number',
        },
    },
    {
        path: DemoPath.Time,
        loadChildren: async () =>
            import('../pages/kit/time/time-mask-doc.module').then(
                m => m.TimeMaskDocModule,
            ),
        data: {
            title: 'Time',
        },
    },
    {
        path: DemoPath.Date,
        loadChildren: async () =>
            import('../pages/kit/date/date-mask-doc.module').then(
                m => m.DateMaskDocModule,
            ),
        data: {
            title: 'Date',
        },
    },
    {
        path: DemoPath.DateRange,
        loadChildren: async () =>
            import('../pages/kit/date-range/date-range-mask-doc.module').then(
                m => m.DateRangeMaskDocModule,
            ),
        data: {
            title: 'DateRange',
        },
    },
    // Recipes
    {
        path: DemoPath.DateTime,
        loadChildren: async () =>
            import('../pages/kit/date-time/date-time-mask-doc.module').then(
                m => m.DateTimeMaskDocModule,
            ),
        data: {
            title: 'DateTime',
        },
    },
    {
        path: DemoPath.Card,
        loadChildren: async () =>
            import('../pages/recipes/card/card-doc.module').then(m => m.CardDocModule),
        data: {
            title: 'Card',
        },
    },
    {
        path: DemoPath.Phone,
        loadChildren: async () =>
            import('../pages/recipes/phone/phone-doc.module').then(m => m.PhoneDocModule),
        data: {
            title: 'Phone',
        },
    },
    {
        path: DemoPath.PhonePackage,
        loadChildren: async () =>
            import('../pages/phone/phone-doc.module').then(m => m.PhoneDocModule),
        data: {
            title: 'Phone',
        },
    },
    {
        path: DemoPath.Textarea,
        loadChildren: async () =>
            import('../pages/recipes/textarea/textarea-doc.module').then(
                m => m.TextareaDocModule,
            ),
        data: {
            title: 'Textarea',
        },
    },
    {
        path: DemoPath.Prefix,
        loadChildren: async () =>
            import('../pages/recipes/prefix/prefix-doc.module').then(
                m => m.PrefixDocModule,
            ),
        data: {
            title: 'With prefix',
        },
    },
    {
        path: DemoPath.Postfix,
        loadChildren: async () =>
            import('../pages/recipes/postfix/postfix-doc.module').then(
                m => m.PostfixDocModule,
            ),
        data: {
            title: 'With postfix',
        },
    },
    {
        path: DemoPath.Placeholder,
        loadChildren: async () =>
            import('../pages/recipes/placeholder/placeholder-doc.module').then(
                m => m.PlaceholderDocModule,
            ),
        data: {
            title: 'With placeholder',
        },
    },
    // Other
    {
        path: DemoPath.BrowserSupport,
        loadChildren: async () =>
            import('../pages/documentation/browser-support/browser-support.module').then(
                m => m.BrowserSupportModule,
            ),
        data: {
            title: 'Browser support',
        },
    },
    {
        path: DemoPath.Changelog,
        loadChildren: async () =>
            import('../pages/documentation/changelog/changelog.module').then(
                m => m.ChangelogModule,
            ),
        data: {
            title: 'Changelog',
        },
    },
    {
        path: DemoPath.Stackblitz,
        loadChildren: async () =>
            import('../pages/stackblitz').then(m => m.StackblitzStarterModule),
        data: {
            title: 'Stackblitz Starter',
        },
    },
    // TODO: replace this page with Cypress Component Testing after angular13+ update
    {
        path: DemoPath.Cypress,
        loadChildren: async () =>
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
            relativeLinkResolution: 'corrected',
            scrollPositionRestoration: 'enabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
