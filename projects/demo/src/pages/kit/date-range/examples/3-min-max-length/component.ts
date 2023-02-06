import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-3',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [tuiHintContent]="hint"
            [tuiTextfieldLabelOutside]="true"
            [tuiTextfieldFiller]="filler"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocExample3 {
    value = '01.01.2023 – 05.01.2023';
    readonly filler = 'dd.mm.yyyy – dd.mm.yyyy';
    readonly mask = mask;
    readonly hint =
        'The right date must be at least 3 days after the left one.\n' +
        'Also, the difference between the dates must not exceed 1 month.';
}
