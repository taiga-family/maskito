import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextfield} from '@taiga-ui/core';
import {TuiSegmented} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'time-mask-doc-example-5',
    imports: [FormsModule, MaskitoDirective, TuiSegmented, TuiTextfield],
    template: `
        <tui-textfield
            filler="HH:MM"
            [style.max-width.rem]="20"
            [tuiTextfieldCleaner]="false"
        >
            <input
                inputmode="decimal"
                tuiTextfield
                [maskito]="mask"
                [(ngModel)]="value"
            />

            <tui-segmented>
                <button type="button">AM</button>
                <button type="button">PM</button>
            </tui-segmented>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample5 {
    protected value = '03:30';
    protected readonly mask = mask;
}
