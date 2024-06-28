import {isPlatformBrowser} from '@angular/common';
import {Component, ElementRef, inject, PLATFORM_ID} from '@angular/core';
import {createRoot} from 'react-dom/client';

import {App} from './use-maskito-basic-usage';

@Component({
    standalone: true,
    selector: 'react-example-1',
    template: '',
    host: {
        'comment-for-devtools': 'Everything inside this tag is really rendered by `react-dom` library',
    },
})
export class ReactExample1 {
    constructor() {
        if (isPlatformBrowser(inject(PLATFORM_ID))) {
            createRoot(inject(ElementRef).nativeElement).render(<App />);
        }
    }
}
