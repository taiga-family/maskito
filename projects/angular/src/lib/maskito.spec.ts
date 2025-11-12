import {ChangeDetectionStrategy, Component} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {MaskitoDirective, MaskitoPipe} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';

describe('Maskito Angular package', () => {
    @Component({
        imports: [MaskitoDirective, MaskitoPipe, ReactiveFormsModule],
        template: `
            <div id="pipe">{{ control.value | maskito: options }}</div>
            <input
                id="input"
                [formControl]="control"
                [maskito]="options"
            />
        `,
        // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
        changeDetection: ChangeDetectionStrategy.Default,
    })
    class TestComponent {
        public readonly control = new FormControl();
        public options: MaskitoOptions | null = {
            mask: /^\d+(,\d{0,2})?$/,
            preprocessors: [
                ({elementState, data}) => {
                    const {value, selection} = elementState;

                    return {
                        elementState: {
                            selection,
                            value: value.replace('.', ','),
                        },
                        data: data.replace('.', ','),
                    };
                },
            ],
        };
    }

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('null is treated as empty string', () => {
        expect(getText()).toBe('');
        expect(getValue()).toBe('');
    });

    it('formats new control value', () => {
        fixture.componentInstance.control.setValue(12345.6789);
        fixture.detectChanges();

        expect(getText()).toBe('12345,67');
        expect(getValue()).toBe('12345,67');
    });

    it('disable mask formatting if options is null', () => {
        fixture.componentInstance.options = null;
        fixture.detectChanges();

        fixture.componentInstance.control.setValue(123456.9999);
        fixture.detectChanges();

        expect(getText()).toBe('123456.9999');
        expect(getValue()).toBe('123456.9999');
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
