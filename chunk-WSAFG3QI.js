import"./chunk-TIC6Q35B.js";var o=`import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoGetCountryFromNumber} from '@maskito/phone';
import {TuiFlagPipe} from '@taiga-ui/core';
import {
    TUI_IS_APPLE,
    TuiInputModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
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
    template: \`
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
    \`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample3 {
    private readonly isApple = inject(TUI_IS_APPLE);

    protected value = '';
    protected readonly mask = mask;

    protected get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.value, metadata) ?? '';
    }

    protected get pattern(): string {
        return this.isApple ? '+[0-9-]{1,20}' : '';
    }
}
`;export{o as default};
