import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoModule} from '@maskito/angular';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';

describe(`Maskito Angular package`, () => {
    @Component({
        template: `
            <div id="pipe">{{ control.value | maskito: options }}</div>
            <input
                id="input"
                [formControl]="control"
                [maskito]="options"
            />
        `,
    })
    class TestComponent {
        readonly control = new FormControl();
        readonly options = maskitoNumberOptionsGenerator({precision: 2});
    }

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaskitoModule, ReactiveFormsModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it(`Null is treated as empty string`, () => {
        expect(getText()).toBe(``);
        expect(getValue()).toBe(``);
    });

    it(`Formats new control value`, () => {
        fixture.componentInstance.control.setValue(12345.67);
        fixture.detectChanges();

        expect(getText()).toBe(`12 345.67`);
        expect(getValue()).toBe(`12 345.67`);
    });

    function getText(): string {
        return fixture.debugElement.nativeElement
            .querySelector('#pipe')
            .textContent.trim();
    }

    function getValue(): string {
        return fixture.debugElement.nativeElement.querySelector('#input').value;
    }
});
