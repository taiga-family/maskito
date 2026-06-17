import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiFlagPipe, TuiInput],
    template: `
        <tui-textfield
            filler="HH h MM min SS,MS"
            iconStart="@tui.clock"
            [style.max-width.rem]="20"
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
    protected value = '18 h 05 min 05,766';
}
