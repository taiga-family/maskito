import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-1',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [tuiTextfieldFiller]="filler"
            [tuiHintContent]="hint"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            US format
            <input
                tuiTextfield
                inputmode="decimal"
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
        return this.value
            .split(' – ')
            .map(date => this.usDateFormatter.format(new Date(date)))
            .join(' – ');
    }
}
