import {ChangeDetectionStrategy, Component} from '@angular/core';
import {maskitoGetCountryFromNumber} from '@maskito/phone';
import metadata from 'libphonenumber-js/min/metadata';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-3',
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

        <div>Country code: {{ countryIsoCode }}</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample3 {
    value = '';
    readonly mask = mask;

    get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.value, metadata) || '';
    }
}
