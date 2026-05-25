import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-6',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            filler="HH h MM min SS,MS"
            iconEnd="@tui.clock"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>fr-CA locale</label>
            <input
                inputmode="numeric"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample6 {
    protected readonly mask = mask;
    protected value = '18 h 05 min 05,766';
}
