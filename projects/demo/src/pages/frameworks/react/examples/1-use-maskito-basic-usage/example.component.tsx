import {isPlatformBrowser} from '@angular/common';
import {Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {createRoot} from 'react-dom/client';

import {App} from './use-maskito-basic-usage';

@Component({
    selector: 'react-example-1',
    template: '',
    host: {
        'comment-for-devtools': 'Everything inside this tag is really rendered by `react-dom` library',
    },
    standalone: true,
})
export class ReactExample1 {
    constructor(elementRef: ElementRef, @Inject(PLATFORM_ID) platformId: Record<string, unknown>) {
        if (isPlatformBrowser(platformId)) {
            createRoot(elementRef.nativeElement).render(<App />);
        }
    }
}
