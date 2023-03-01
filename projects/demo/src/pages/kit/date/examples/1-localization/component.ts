import {ChangeDetectionStrategy, Component} from '@angular/core';

import {mask} from './mask';

@Component({
    selector: 'date-mask-doc-example-1',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [tuiTextfieldFiller]="filler"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Localization
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocExample1 {
    value = '2005/10/21';
    readonly filler = 'yyyy/mm/dd';
    readonly mask = mask;
}
