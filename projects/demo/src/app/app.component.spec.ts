import {APP_BASE_HREF} from '@angular/common';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {beforeEach, describe, expect, it} from '@jest/globals';

import {App} from './app.component';
import {APP_CONFIG} from './app.config';

describe('Test dummy', () => {
    let fixture: ComponentFixture<App>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [App],
            providers: [...APP_CONFIG.providers, {provide: APP_BASE_HREF, useValue: '/'}],
        });

        fixture = TestBed.createComponent(App);
        fixture.detectChanges();
    });

    it('appComponent compiles properly', () => {
        expect(fixture.nativeElement.textContent).toContain('Getting started');
        expect(fixture.nativeElement.textContent).toContain('Core concepts');
    });

    it.skip('router works', async () => {
        /**
         * Angular 14 regression
         * ___
         * TODO: In Angular 15.2.0 use `RouterTestingHarness`:
         * ```ts
         * import {RouterTestingHarness} from '@angular/router/testing';
         * // [...]
         * const router = await RouterTestingHarness.create();
         * const activatedComponent = await harness.navigateByUrl('/${DemoPath.WhatIsMaskito}', AppComponent);
         * ```
         *
         * Learn more:
         * - https://github.com/angular/angular/commit/dedac8d3f73ebf4f05b773454e2a22ab5fa4bf7c
         * - https://blog.angular.io/write-better-tests-without-router-mocks-stubs-bf5fc95c1c57
         */
        await TestBed.inject(Router).navigate([`/${DemoPath.WhatIsMaskito}`]);

        expect(fixture.nativeElement.textContent).toContain('Why Maskito?');
    });
});
