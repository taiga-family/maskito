import {isPlatformBrowser, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {provideHttpClient} from '@angular/common/http';
import type {ApplicationConfig} from '@angular/core';
import {inject, PLATFORM_ID} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, withInMemoryScrolling} from '@angular/router';
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
    TUI_DOC_TYPE_REFERENCE_HANDLER,
    tuiDocExampleOptionsProvider,
} from '@taiga-ui/addon-doc';
import {NG_EVENT_PLUGINS} from '@taiga-ui/event-plugins';
import type {PolymorpheusContent} from '@taiga-ui/polymorpheus';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

import {DEMO_PAGES} from '../pages/pages';
import {StackblitzService} from '../pages/stackblitz';
import {ROUTES} from './app.routes';
import {
    ANGULAR_LOGO,
    JAVASCRIPT_LOGO,
    REACT_LOGO,
} from './modules/example-primary-tabs-icons';
import {VUE_LOGO} from './modules/example-primary-tabs-icons/vue-logo.component';
import {LOGO_CONTENT} from './modules/logo/logo.component';
import {addDefaultTabsProcessor} from './utils';

export const APP_CONFIG: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(
            ROUTES,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
        ),
        NG_EVENT_PLUGINS,
        provideHttpClient(),
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
                    context.header.slice(0, 1).toLowerCase() + context.header.slice(1)
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
                [DocExamplePrimaryTab.Angular, ANGULAR_LOGO],
                [DocExamplePrimaryTab.JavaScript, JAVASCRIPT_LOGO],
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
        {
            provide: TUI_DOC_TYPE_REFERENCE_HANDLER,
            useValue: (type: string) => {
                if (type.toLowerCase().startsWith('maskito')) {
                    return `https://github.com/search?q=%2F%28enum%7Ctype%7Cinterface%7Cclass%7Cfunction%7Cconst%29+${type}%28%3C%7C%5Cs%29%2F+language%3ATypeScript+repo%3Ataiga-family%2Fmaskito+&type=code`;
                }

                switch (type) {
                    case 'Date':
                        return 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date';
                    case 'MetadataJson':
                        return 'https://github.com/catamphetamine/libphonenumber-js?tab=readme-ov-file#min-vs-max-vs-mobile-vs-core';
                    default:
                        return null;
                }
            },
        },
    ],
};
