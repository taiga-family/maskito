import { PolymorpheusOutlet } from "@taiga-ui/polymorpheus";
import { TuiInput, TuiIcon } from "@taiga-ui/core";
import { TuiFlagPipe } from "@taiga-ui/kit";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoGetCountryFromNumber} from '@maskito/phone';
import { isSafari, WA_IS_IOS } from '@ng-web-apis/platform';
import {tuiInjectElement} from '@taiga-ui/cdk';
import metadata from 'libphonenumber-js/min/metadata';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-3',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiFlagPipe,
        TuiInput,
        TuiIcon,
        PolymorpheusOutlet
    ],
    template: `
        <tui-textfield [style.max-width.rem]="30">
        <label tuiLabel>Non-strict</label>
        <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [attr.pattern]="pattern"
                [maskito]="mask" [(ngModel)]="value"/>

        <tui-icon
            *polymorpheusOutlet="countryIsoCode ? flag : '@tui.phone' as src"
            [icon]="src"
        />
        </tui-textfield>

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
        isSafari(tuiInjectElement()) || inject(WA_IS_IOS) ? '+[0-9-]{1,20}' : '';

    protected value = '';
    protected readonly mask = mask;

    protected get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.value, metadata) ?? '';
    }
}
