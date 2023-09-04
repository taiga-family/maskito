import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-2',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [style.max-width.rem]="30"
            [tuiTextfieldFiller]="filler"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            <input
                inputmode="decimal"
                tuiTextfield
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocExample2 {
    value = '19.11.1711 – 15.04.1765';
    readonly filler = 'dd.mm.yyyy – dd.mm.yyyy';
    readonly mask = mask;
}
