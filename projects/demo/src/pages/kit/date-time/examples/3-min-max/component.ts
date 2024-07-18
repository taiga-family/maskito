import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'date-time-mask-doc-example-3',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        FormsModule,
        MaskitoDirective,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.calendar"
            [style.max-width.rem]="30"
            [tuiTextfieldFiller]="filler"
            [(ngModel)]="value"
        >
            Min-max
            <input
                inputmode="decimal"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeMaskDocExample3 {
    protected value = '09-01-2018, 15:30';
    protected readonly filler = 'dd-mm-yyyy, hh:mm';
    protected readonly mask = mask;
}
