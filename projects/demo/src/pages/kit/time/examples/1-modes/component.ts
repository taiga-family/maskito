import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            filler="hh:mm:ss"
            iconEnd="@tui.clock"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter 24-hour time format</label>
            <input
                inputmode="decimal"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample1 {
    protected readonly mask = mask;
    protected value = '23:59:59';
}
