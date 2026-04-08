import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoGetCountryFromNumber} from '@maskito/phone';
import {isSafari} from '@ng-web-apis/platform';
import {TUI_IS_IOS, tuiInjectElement} from '@taiga-ui/cdk';
import {TuiFlagPipe} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import metadata from 'libphonenumber-js/min/metadata';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-3',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiFlagPipe,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [tuiTextfieldCustomContent]="countryIsoCode ? flag : '@tui.phone'"
            [(ngModel)]="value"
        >
            Non-strict
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfieldLegacy
                [attr.pattern]="pattern"
                [maskito]="mask"
            />
        </tui-input>

        <ng-template #flag>
            <img
                width="28"
                [attr.alt]="countryIsoCode"
                [src]="countryIsoCode | tuiFlag"
                [style.border-radius.%]="50"
            />
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample3 {
    /**
     * https://github.com/taiga-family/maskito/pull/2165
     * TODO: delete after bumping Safari support to 18+
     */
    protected readonly pattern =
        isSafari(tuiInjectElement()) || inject(TUI_IS_IOS) ? '+[0-9-]{1,20}' : '';

    protected value = '';
    protected readonly mask = mask;

    protected get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.value, metadata) ?? '';
    }
}
