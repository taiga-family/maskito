import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoGetCountryFromNumber} from '@maskito/phone';
import {TUI_IS_APPLE} from '@taiga-ui/cdk';
import {TuiFlagPipeModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';
import metadata from 'libphonenumber-js/min/metadata';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'phone-doc-example-3',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        FormsModule,
        MaskitoDirective,
        TuiFlagPipeModule,
    ],
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
    private readonly isApple = inject(TUI_IS_APPLE);

    value = '';
    readonly mask = mask;

    get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.value, metadata) || '';
    }

    get pattern(): string {
        return this.isApple ? '+[0-9-]{1,20}' : '';
    }
}
