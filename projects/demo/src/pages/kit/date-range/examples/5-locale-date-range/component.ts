import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-5',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.calendar"
            [style.max-width.rem]="30"
            [tuiTextfieldFiller]="filler"
            [(ngModel)]="value"
        >
            Lithuanian locale (lt-LT)
            <input
                inputmode="numeric"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocExample5 {
    protected value = '2005-10-21 – 2023-02-06';
    protected readonly filler = 'yyyy-mm-dd – yyyy-mm-dd';
    protected readonly mask = mask;
}
