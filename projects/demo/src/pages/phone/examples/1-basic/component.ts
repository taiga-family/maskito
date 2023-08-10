import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
    AbstractControl,
    FormControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import {TuiValidationError} from '@taiga-ui/cdk';
import {CountryCode, isValidPhoneNumber} from 'libphonenumber-js/max';

import mask from './mask';

function phoneValidator(countryCode: CountryCode): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = isValidPhoneNumber(control.value, countryCode);

        return valid ? null : new TuiValidationError('Invalid number');
    };
}

@Component({
    selector: 'phone-doc-example-1',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconPhoneLarge"
            [style.max-width.rem]="30"
            [formControl]="value"
        >
            Basic
            <input
                tuiTextfield
                [maskito]="mask"
            />
        </tui-input>
        <tui-error
            [formControl]="value"
            [error]="[] | tuiFieldError | async"
        ></tui-error>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocExample1 {
    value = new FormControl('+7 771 931-1111', phoneValidator('KZ'));
    readonly mask = mask;
}
