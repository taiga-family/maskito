import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiHintModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'date-range-mask-doc-example-3',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiHintModule,
        FormsModule,
        MaskitoDirective,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [style.max-width.rem]="30"
            [tuiHintContent]="hint"
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
export class DateRangeMaskDocExample3 {
    value = '01.01.2023 – 05.01.2023';
    readonly filler = 'dd.mm.yyyy – dd.mm.yyyy';
    readonly mask = mask;
    readonly hint =
        'The right date must be at least 3 days after the left one.\n' +
        'Also, the difference between the dates must not exceed 1 month.';
}
