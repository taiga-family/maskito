import {APP_BASE_HREF} from '@angular/common';
import {TestBed} from '@angular/core/testing';
import {RouterTestingHarness} from '@angular/router/testing';
import {DemoPath} from '@demo/constants';
import {beforeEach, describe, expect, it} from '@jest/globals';

import {App} from './app.component';
import {APP_CONFIG} from './app.config';

describe('Ensure unit tests work for demo application', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [App],
            providers: [...APP_CONFIG.providers, {provide: APP_BASE_HREF, useValue: '/'}],
        });
    });

    it('appComponent compiles properly', () => {
        const fixture = TestBed.createComponent(App);

        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('Getting started');
        expect(fixture.nativeElement.textContent).toContain('Core concepts');
    });

    it('router works', async () => {
        const router = await RouterTestingHarness.create();

        await router.navigateByUrl(DemoPath.CoreConceptsOverview);

        expect(router.routeNativeElement?.textContent).toContain(
            'The main entity of Maskito core library is Maskito class which accepts 2 arguments in constructor',
        );
    });
});
