import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiHintModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'date-range-mask-doc-example-1',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiHintModule,
        FormsModule,
        MaskitoDirective,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [style.max-width.rem]="30"
            [tuiHintContent]="hint"
            [tuiTextfieldFiller]="filler"
            [(ngModel)]="value"
        >
            US format
            <input
                inputmode="decimal"
                tuiTextfield
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocExample1 {
    private readonly usDateFormatter = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    value = '09/20/2020 – 02/06/2023';
    readonly filler = 'mm/dd/yyyy – mm/dd/yyyy';
    readonly mask = mask;

    get hint(): string {
        return this.value.length < this.filler.length
            ? 'Complete the date range!'
            : this.value
                  .split(' – ')
                  .map(date => this.usDateFormatter.format(new Date(date)))
                  .join(' – ');
    }
}
