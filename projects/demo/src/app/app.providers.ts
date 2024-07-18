import {isPlatformBrowser, LocationStrategy, PathLocationStrategy} from '@angular/common';
import type {Provider} from '@angular/core';
import {inject, PLATFORM_ID} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import type {TuiDocSourceCodePathOptions} from '@taiga-ui/addon-doc';
import {
    TUI_DOC_CODE_EDITOR,
    TUI_DOC_DEFAULT_TABS,
    TUI_DOC_EXAMPLE_CONTENT_PROCESSOR,
    TUI_DOC_LOGO,
    TUI_DOC_PAGES,
    TUI_DOC_SOURCE_CODE,
    TUI_DOC_TITLE,
    tuiDocExampleOptionsProvider,
} from '@taiga-ui/addon-doc';
import type {PolymorpheusContent} from '@taiga-ui/polymorpheus';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

import {DEMO_PAGES} from '../pages/pages';
import {StackblitzService} from '../pages/stackblitz';
import {
    ANGULAR_LOGO,
    JAVASCRIPT_LOGO,
    REACT_LOGO,
} from './modules/example-primary-tabs-icons';
import {VUE_LOGO} from './modules/example-primary-tabs-icons/vue-logo.component';
import {LOGO_CONTENT} from './modules/logo/logo.component';
import {addDefaultTabsProcessor} from './utils';

export const APP_PROVIDERS: Provider[] = [
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
    },
    {
        provide: TUI_DOC_TITLE,
        useValue: 'Maskito | ',
    },
    {
        provide: TUI_DOC_LOGO,
        useValue: LOGO_CONTENT,
    },
    {
        provide: TUI_DOC_DEFAULT_TABS,
        useValue: ['Description and examples', 'API'],
    },
    {
        provide: TUI_DOC_PAGES,
        useValue: DEMO_PAGES,
    },
    {
        provide: TUI_DOC_SOURCE_CODE,
        useValue: (context: TuiDocSourceCodePathOptions) => {
            const link = 'https://github.com/taiga-family/maskito/tree/main/projects';

            if (context.path) {
                return `${link}/${context.path}`;
            }

            if (!context.package || context.package.toLowerCase() !== 'kit') {
                return null;
            }

            return `${link}/${context.package.toLowerCase()}/src/lib/masks/${(
                context.header[0].toLowerCase() + context.header.slice(1)
            ).replaceAll(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
        },
    },
    {
        provide: TUI_DOC_CODE_EDITOR,
        useClass: StackblitzService,
    },
    {
        provide: TUI_DOC_EXAMPLE_CONTENT_PROCESSOR,
        useValue: addDefaultTabsProcessor,
    },
    tuiDocExampleOptionsProvider({
        codeEditorVisibilityHandler: (files) => {
            const fileNames = Object.keys(files);

            return (
                fileNames.includes(DocExamplePrimaryTab.MaskitoOptions) &&
                fileNames.includes(DocExamplePrimaryTab.JavaScript)
            );
        },
        tabTitles: new Map<string, PolymorpheusContent>([
            [DocExamplePrimaryTab.JavaScript, JAVASCRIPT_LOGO],
            [DocExamplePrimaryTab.Angular, ANGULAR_LOGO],
            [DocExamplePrimaryTab.React, REACT_LOGO],
            [DocExamplePrimaryTab.Vue, VUE_LOGO],
        ]),
    }),
    {
        provide: HIGHLIGHT_OPTIONS,
        useFactory: () => {
            const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

            return {
                coreLibraryLoader: async () => import('highlight.js/lib/core'),
                lineNumbersLoader: async () =>
                    // SSR ReferenceError: window is not defined
                    isBrowser
                        ? import('ngx-highlightjs/line-numbers')
                        : Promise.resolve(),
                languages: {
                    typescript: async () =>
                        import('highlight.js/lib/languages/typescript'),
                    less: async () => import('highlight.js/lib/languages/less'),
                    xml: async () => import('highlight.js/lib/languages/xml'),
                },
            };
        },
    },
];
