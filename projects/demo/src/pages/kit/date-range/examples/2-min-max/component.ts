import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'date-range-mask-doc-example-2',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        FormsModule,
        MaskitoDirective,
    ],
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
    protected value = '19.11.1711 – 15.04.1765';
    protected readonly filler = 'dd.mm.yyyy – dd.mm.yyyy';
    protected readonly mask = mask;
}
