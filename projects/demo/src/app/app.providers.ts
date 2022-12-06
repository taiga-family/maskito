import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Provider} from '@angular/core';
import {TUI_DOC_DEFAULT_TABS, TUI_DOC_LOGO, TUI_DOC_TITLE} from '@taiga-ui/addon-doc';
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
];
