import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'date-time-mask-doc-example-7',
    imports: [FormsModule, MaskitoDirective, TuiFlagPipe, TuiInput],
    template: `
        <tui-textfield
            filler="yyyy-mm-dd HH h MM min SS"
            iconStart="@tui.calendar"
            [style.max-width.rem]="25"
        >
            <label tuiLabel>fr-CA locale</label>
            <input
                inputmode="numeric"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />

            <img
                width="28"
                [attr.alt]="'Canada flag'"
                [src]="'CA' | tuiFlag"
                [style.border-radius.%]="50"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected readonly mask = mask;
    protected value = '2025-05-10 18 h 30 min 05';
}
