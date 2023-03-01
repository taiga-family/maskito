import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-mask-doc-example-2',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [tuiTextfieldFiller]="filler"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Date
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocExample2 {
    value = '20.01.2023';
    readonly filler = 'dd.mm.yyyy';
    readonly mask = mask;
}
