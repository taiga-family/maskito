import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {maskitoGetCountryFromNumber} from '@maskito/phone';
import {TUI_IS_APPLE} from '@taiga-ui/cdk';
import metadata from 'libphonenumber-js/min/metadata';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-3',
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [tuiTextfieldCustomContent]="countryIsoCode ? flag : 'tuiIconPhoneLarge'"
            [(ngModel)]="value"
        >
            Non-strict
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfield
                [attr.pattern]="pattern"
                [maskito]="mask"
            />
        </tui-input>

        <ng-template #flag>
            <img
                width="28"
                [attr.alt]="countryIsoCode"
                [src]="countryIsoCode | tuiFlag"
            />
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample3 {
    value = '';
    readonly mask = mask;

    get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.value, metadata) || '';
    }

    constructor(@Inject(TUI_IS_APPLE) private readonly isApple: boolean) {}

    get pattern(): string {
        return this.isApple ? '+{1}[0-9]{1,3} [0-9]{1,14}' : '';
    }
}
