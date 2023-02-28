import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-time-mask-doc-example-2',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [tuiTextfieldFiller]="filler"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Min-max
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeMaskDocExample2 {
    value = '09-01-2018, 15:30';
    readonly filler = 'dd-mm-yyyy, hh:mm';
    readonly mask = mask;
}
