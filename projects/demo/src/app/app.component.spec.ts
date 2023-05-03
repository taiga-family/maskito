import {APP_BASE_HREF} from '@angular/common';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {DemoPath} from '@demo/constants';

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
    });

    it('AppComponent compiles properly', async () => {
        await TestBed.inject(Router).navigate([`/${DemoPath.WhatIsMaskito}`]);

        expect(fixture.nativeElement.textContent).toContain('Why Maskito?');
    });
});
