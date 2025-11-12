import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID} from '@angular/core';
import {createRoot} from 'react-dom/client';

import {App} from '.';

@Component({
    selector: 'react-example-2',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'comment-for-devtools': 'Everything inside this tag is really rendered by `react-dom` library',
    },
})
export class ReactExample2 {
    constructor() {
        if (isPlatformBrowser(inject(PLATFORM_ID))) {
            createRoot(inject(ElementRef).nativeElement).render(<App />);
        }
    }
}
