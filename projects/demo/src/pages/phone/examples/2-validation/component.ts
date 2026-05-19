import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
    type AbstractControl,
    FormControl,
    ReactiveFormsModule,
    type ValidationErrors,
    type ValidatorFn,
} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiValidationError} from '@taiga-ui/cdk';
import {TuiError, TuiInput} from '@taiga-ui/core';
import {type CountryCode, isValidPhoneNumber} from 'libphonenumber-js/max';

import mask from './mask';

function phoneValidator(countryCode: CountryCode): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = isValidPhoneNumber(control.value, countryCode);

        return valid ? null : new TuiValidationError('Invalid number');
    };
}

@Component({
    selector: 'phone-doc-example-2',
    imports: [MaskitoDirective, ReactiveFormsModule, TuiError, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.phone"
            [style.max-width.rem]="30"
        >
            <label tuiLabel>Basic</label>
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [maskito]="mask"
                [formControl]="control"
            />
        </tui-textfield>
        <tui-error [formControl]="control" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample2 {
    protected readonly control = new FormControl('+36 20 123-3122', phoneValidator('HU'));
    protected readonly mask = mask;
}
