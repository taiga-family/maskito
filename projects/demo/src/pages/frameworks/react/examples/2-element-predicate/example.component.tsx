import {isPlatformBrowser} from '@angular/common';
import {Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {createRoot} from 'react-dom/client';

import {App} from './index';

@Component({
    selector: 'react-example-2',
    template: '',
    host: {
        'comment-for-devtools': 'Everything inside this tag is really rendered by `react-dom` library',
    },
    standalone: true,
})
export class ReactExample2 {
    constructor(elementRef: ElementRef, @Inject(PLATFORM_ID) platformId: Record<string, unknown>) {
        if (isPlatformBrowser(platformId)) {
            createRoot(elementRef.nativeElement).render(<App />);
        }
    }
}
