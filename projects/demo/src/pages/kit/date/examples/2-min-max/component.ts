import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-mask-doc-example-2',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [style.max-width.rem]="30"
            [tuiTextfieldFiller]="filler"
            [(ngModel)]="value"
        >
            Date
            <input
                inputmode="decimal"
                tuiTextfield
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
