import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiHint, TuiIcon, TuiInput} from '@taiga-ui/core';
import {TuiTooltip} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiHint, TuiIcon, TuiInput, TuiTooltip],
    template: `
        <tui-textfield
            [style.max-width.rem]="30"
            [filler]="filler"
        >
            <label tuiLabel>US format</label>
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
export class DateRangeMaskDocExample1 {
    private readonly usDateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    protected value = '09/20/2020 – 02/06/2023';
    protected readonly filler = 'mm/dd/yyyy – mm/dd/yyyy';
    protected readonly mask = mask;

    protected get hint(): string {
        return this.value.length < this.filler.length
            ? 'Complete the date range!'
            : this.value
                  .split(' – ')
                  .map((date) => this.usDateFormatter.format(new Date(date)))
                  .join(' – ');
    }
}
