import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import type {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiValidationError} from '@taiga-ui/cdk';
import {TuiError} from '@taiga-ui/core';
import {TuiFieldErrorPipe} from '@taiga-ui/kit';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import type {CountryCode} from 'libphonenumber-js/max';
import {isValidPhoneNumber} from 'libphonenumber-js/max';

import mask from './mask';

function phoneValidator(countryCode: CountryCode): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = isValidPhoneNumber(control.value, countryCode);

        return valid ? null : new TuiValidationError('Invalid number');
    };
}

@Component({
    selector: 'phone-doc-example-2',
    imports: [
        AsyncPipe,
        MaskitoDirective,
        ReactiveFormsModule,
        TuiError,
        TuiFieldErrorPipe,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.phone"
            [formControl]="control"
            [style.max-width.rem]="30"
        >
            Basic
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
        <tui-error
            [error]="[] | tuiFieldError | async"
            [formControl]="control"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample2 {
    protected readonly control = new FormControl('+36 20 123-3122', phoneValidator('HU'));
    protected readonly mask = mask;
}
