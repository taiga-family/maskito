import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';

import mask from './mask';

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
                autocomplete="tel"
                inputmode="tel"
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
export class PhoneMaskDocExample1 {
    value = new FormControl('+7 771 931-1111');
    readonly mask = mask;
}
