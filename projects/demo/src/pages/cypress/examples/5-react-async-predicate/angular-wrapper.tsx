import {isPlatformBrowser} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {createRoot} from 'react-dom/client';

import {App} from './react-app';

@Component({
    selector: 'test-doc-example-5',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDocExample5 {
    constructor(elementRef: ElementRef, @Inject(PLATFORM_ID) platformId: Record<string, unknown>) {
        if (isPlatformBrowser(platformId)) {
            createRoot(elementRef.nativeElement).render(<App />);
        }
    }
}
