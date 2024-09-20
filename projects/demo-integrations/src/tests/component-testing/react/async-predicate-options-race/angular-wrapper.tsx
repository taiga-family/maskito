import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID} from '@angular/core';
import {createRoot} from 'react-dom/client';

import {App} from './react-app';

@Component({standalone: true, selector: 'test-wrapper', template: '', changeDetection: ChangeDetectionStrategy.OnPush})
export class TestWrapper {
    constructor() {
        if (isPlatformBrowser(inject(PLATFORM_ID))) {
            createRoot(inject(ElementRef).nativeElement).render(<App />);
        }
    }
}
