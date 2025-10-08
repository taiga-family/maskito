import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiHint} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-3',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiHint,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.calendar"
            [style.max-width.rem]="30"
            [tuiHintContent]="hint"
            [tuiTextfieldFiller]="filler"
            [tuiTextfieldLabelOutside]="true"
            [(ngModel)]="value"
        >
            <input
                inputmode="decimal"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocExample3 {
    protected value = '01.01.2023 – 05.01.2023';
    protected readonly filler = 'dd.mm.yyyy – dd.mm.yyyy';
    protected readonly mask = mask;
    protected readonly hint =
        'The right date must be at least 3 days after the left one.\n' +
        'Also, the difference between the dates must not exceed 1 month.';
}
