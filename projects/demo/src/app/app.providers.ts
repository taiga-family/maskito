import {isPlatformBrowser, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {inject, PLATFORM_ID, Provider} from '@angular/core';
import {DocExamplePrimaryTab} from '@demo/constants';
import {
    TUI_DOC_CODE_EDITOR,
    TUI_DOC_DEFAULT_TABS,
    TUI_DOC_EXAMPLE_CONTENT_PROCESSOR,
    TUI_DOC_LOGO,
    TUI_DOC_PAGES,
    TUI_DOC_SOURCE_CODE,
    TUI_DOC_TITLE,
    tuiDocExampleOptionsProvider,
    TuiDocSourceCodePathOptions,
} from '@taiga-ui/addon-doc';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

import {DEMO_PAGES} from '../pages/pages';
import {StackblitzService} from '../pages/stackblitz';
import {
    ANGULAR_LOGO,
    JAVASCRIPT_LOGO,
    REACT_LOGO,
} from './modules/example-primary-tabs-icons';
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
            const link = `https://github.com/tinkoff/maskito/tree/main/projects`;

            if (context.path) {
                return `${link}/${context.path}`;
            }

            if (!context.package || context.package.toLowerCase() !== 'kit') {
                return null;
            }

            return `${link}/${context.package.toLowerCase()}/src/lib/masks/${(
                context.header[0].toLowerCase() + context.header.slice(1)
            ).replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
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
        codeEditorVisibilityHandler: files => {
            const primaryTabs: string[] = Object.values(DocExamplePrimaryTab);

            return Object.keys(files).every(fileName => primaryTabs.includes(fileName));
        },
        // @ts-ignore TODO: update Taiga UI to 3.26.0 and drop ts-ignore
        tabTitles: new Map<string, PolymorpheusContent>([
            [DocExamplePrimaryTab.JavaScript, JAVASCRIPT_LOGO],
            [DocExamplePrimaryTab.Angular, ANGULAR_LOGO],
            [DocExamplePrimaryTab.React, REACT_LOGO],
        ]),
    }),
    {
        provide: HIGHLIGHT_OPTIONS,
        useFactory: () => {
            const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

            return {
                coreLibraryLoader: async () => import(`highlight.js/lib/core`),
                lineNumbersLoader: async () =>
                    // SSR ReferenceError: window is not defined
                    isBrowser
                        ? import(`highlightjs-line-numbers.js` as string)
                        : Promise.resolve(),
                languages: {
                    typescript: async () =>
                        import(`highlight.js/lib/languages/typescript`),
                    less: async () => import(`highlight.js/lib/languages/less`),
                    xml: async () => import(`highlight.js/lib/languages/xml`),
                },
            };
        },
    },
];
