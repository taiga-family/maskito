import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoGetCountryFromNumber} from '@maskito/phone';
import {TUI_IS_APPLE} from '@taiga-ui/cdk';
import {TuiFlagPipe} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
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
        TuiFlagPipe,
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

    protected value = '';
    protected readonly mask = mask;

    protected get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.value, metadata) || '';
    }

    protected get pattern(): string {
        return this.isApple ? '+[0-9-]{1,20}' : '';
    }
}
