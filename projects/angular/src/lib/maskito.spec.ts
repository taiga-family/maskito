import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoModule} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

describe('Maskito Angular package', () => {
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
        readonly options: MaskitoOptions = {
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
            imports: [MaskitoModule, ReactiveFormsModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('Null is treated as empty string', () => {
        expect(getText()).toBe('');
        expect(getValue()).toBe('');
    });

    it('Formats new control value', () => {
        fixture.componentInstance.control.setValue(12345.6789);
        fixture.detectChanges();

        expect(getText()).toBe('12345,67');
        expect(getValue()).toBe('12345,67');
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
