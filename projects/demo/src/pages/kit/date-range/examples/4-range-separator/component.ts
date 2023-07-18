import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-4',
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
export class DateRangeMaskDocExample4 {
    value = '01.01.2023 ~ 05.01.2023';
    readonly filler = 'dd.mm.yyyy ~ dd.mm.yyyy';
    readonly mask = mask;
}
