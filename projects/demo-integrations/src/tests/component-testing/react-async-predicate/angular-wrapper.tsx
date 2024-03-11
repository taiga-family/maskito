import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {createRoot} from 'react-dom/client';

import {App} from './react-app';

@Component({
    selector: 'test-wrapper',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TestWrapper {
    constructor(elementRef: ElementRef, @Inject(PLATFORM_ID) platformId: Record<string, unknown>) {
        if (isPlatformBrowser(platformId)) {
            createRoot(elementRef.nativeElement).render(<App />);
        }
    }
}
