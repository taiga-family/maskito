import { PolymorpheusOutlet } from "@taiga-ui/polymorpheus";
import { TuiInput, TuiIcon } from "@taiga-ui/core";
import { TuiFlagPipe } from "@taiga-ui/kit";
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import { isSafari, WA_IS_IOS } from '@ng-web-apis/platform';
import {tuiInjectElement} from '@taiga-ui/cdk';
import mask from './mask';

@Component({
    selector: 'phone-doc-example-6',
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
        <label tuiLabel>National Format (US)</label>
        <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [attr.pattern]="pattern"
                [maskito]="mask" [(ngModel)]="value"/>

        <tui-icon
            *polymorpheusOutlet="flag as src"
            [icon]="src"
        />
        </tui-textfield>

        <ng-template #flag>
            <img
                alt="US"
                width="28"
                [src]="'US' | tuiFlag"
                [style.border-radius.%]="50"
            />
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample6 {
    protected value = '';
    protected readonly mask = mask;

    /**
     * Pattern for iOS Safari to allow phone number input.
     * National format doesn't include '+', so pattern is different.
     * TODO: delete after bumping Safari support to 18+
     */
    protected readonly pattern =
        isSafari(tuiInjectElement()) || inject(WA_IS_IOS) ? '[0-9()-]{1,20}' : '';
}
