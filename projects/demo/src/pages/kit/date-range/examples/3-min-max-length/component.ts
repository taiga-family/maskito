import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiHint, TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiHint, TuiIcon, TuiInput, TuiTooltip],
    template: `
        <tui-textfield
            [style.max-width.rem]="30"
            [filler]="filler"
        >
            <input
                inputmode="decimal"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />
            <tui-icon [tuiTooltip]="hint" />

            <tui-icon icon="@tui.calendar" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocExample3 {
    protected value = '01.01.2023 – 05.01.2023';
    protected readonly filler = 'dd.mm.yyyy – dd.mm.yyyy';
    protected readonly mask = mask;

    protected readonly hint =
        'The right date must be at least 3 days after the left one.\nAlso, the difference between the dates must not exceed 1 month.';
}
