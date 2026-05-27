import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-4',
    imports: [FormsModule, MaskitoDirective, TuiFlagPipe, TuiInput],
    template: `
        <tui-textfield
            iconStart="@tui.clock"
            [style.max-width.rem]="20"
            [tuiTextfieldCleaner]="false"
        >
            <label tuiLabel>Greek locale</label>
            <input
                inputmode="numeric"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />

            <img
                width="28"
                [attr.alt]="'Greek flag'"
                [src]="'GR' | tuiFlag"
                [style.border-radius.%]="50"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample4 {
    protected readonly mask = mask;
    protected value = '12:34 π.μ.';
}
