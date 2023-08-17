import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-1',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconPhoneLarge"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Basic
            <input
                tuiTextfield
                autocomplete="tel"
                inputmode="tel"
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample1 {
    value = '+7 771 931-1111';
    readonly mask = mask;
}
