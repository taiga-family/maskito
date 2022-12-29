import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Provider} from '@angular/core';
import {
    TUI_DOC_DEFAULT_TABS,
    TUI_DOC_LOGO,
    TUI_DOC_PAGES,
    TUI_DOC_SOURCE_CODE,
    TUI_DOC_TITLE,
    TuiDocSourceCodePathOptions,
} from '@taiga-ui/addon-doc';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {DEMO_PAGES} from '../pages/pages';
import {LOGO_CONTENT} from './modules/logo/logo.component';

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

            if (!context.package) {
                return null;
            }

            if (context.path) {
                return `${link}/${context.path}`;
            }

            return `${link}/${context.package.toLowerCase()}/src/lib/${(
                context.header[0].toLowerCase() + context.header.slice(1)
            ).replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`;
        },
    },
    {
        provide: HIGHLIGHT_OPTIONS,
        useValue: {
            coreLibraryLoader: async () => import(`highlight.js/lib/core`),
            lineNumbersLoader: () => import('highlightjs-line-numbers.js' as string),
            languages: {
                typescript: async () => import(`highlight.js/lib/languages/typescript`),
                less: async () => import(`highlight.js/lib/languages/less`),
                xml: async () => import(`highlight.js/lib/languages/xml`),
            },
        },
    },
];
