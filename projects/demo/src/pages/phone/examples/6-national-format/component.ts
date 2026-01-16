import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipe} from '@taiga-ui/core';
import {
    TUI_IS_APPLE,
    TuiInputModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-6',
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
            [tuiTextfieldCustomContent]="flag"
            [(ngModel)]="value"
        >
            National Format (US)
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
     */
    protected readonly pattern = inject(TUI_IS_APPLE) ? '[0-9()-]{1,20}' : '';
}
