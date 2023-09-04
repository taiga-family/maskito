import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-time-mask-doc-example-1',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [style.max-width.rem]="30"
            [tuiTextfieldFiller]="filler"
            [(ngModel)]="value"
        >
            Localization
            <input
                inputmode="decimal"
                tuiTextfield
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeMaskDocExample1 {
    value = '09/20/2020, 15:30';
    readonly filler = 'mm/dd/yyyy, hh:mm';
    readonly mask = mask;
}
