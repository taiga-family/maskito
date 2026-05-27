import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiFlagPipe, TuiInput],
    template: `
        <tui-textfield
            filler="HH:MM AA"
            iconStart="@tui.clock"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter 12-hour time format</label>
            <input
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />

            <img
                width="28"
                [attr.alt]="'USA flag'"
                [src]="'US' | tuiFlag"
                [style.border-radius.%]="50"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample2 {
    protected readonly mask = mask;
    protected value = '03:30 PM';
}
