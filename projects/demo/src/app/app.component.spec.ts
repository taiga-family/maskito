import {APP_BASE_HREF} from '@angular/common';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {beforeEach, describe, expect, it, xit} from '@jest/globals';

import {AppBrowserModule} from './app.browser.module';
import {AppComponent} from './app.component';

describe('Test dummy', () => {
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AppBrowserModule],
            declarations: [AppComponent],
            providers: [{provide: APP_BASE_HREF, useValue: '/'}],
        });

        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it('AppComponent compiles properly', () => {
        expect(fixture.nativeElement.textContent).toContain('Getting started');
        expect(fixture.nativeElement.textContent).toContain('Core concepts');
    });

    xit('Router works', async () => {
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
