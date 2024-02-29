import {AsyncPipe} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiValidationError} from '@taiga-ui/cdk';
import {TuiErrorModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiFieldErrorPipeModule, TuiInputModule} from '@taiga-ui/kit';
import {CountryCode, isValidPhoneNumber} from 'libphonenumber-js/max';

import mask from './mask';

function phoneValidator(countryCode: CountryCode): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = isValidPhoneNumber(control.value, countryCode);

        return valid ? null : new TuiValidationError('Invalid number');
    };
}

@Component({
    standalone: true,
    selector: 'phone-doc-example-2',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        MaskitoDirective,
        TuiErrorModule,
        AsyncPipe,
        TuiFieldErrorPipeModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconPhoneLarge"
            [formControl]="control"
            [style.max-width.rem]="30"
        >
            Basic
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfield
                [maskito]="mask"
            />
        </tui-input>
        <tui-error
            [error]="[] | tuiFieldError | async"
            [formControl]="control"
        ></tui-error>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample2 {
    protected readonly control = new FormControl('+36 20 123-3122', phoneValidator('HU'));
    protected readonly mask = mask;
}
