import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'date-mask-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiIcon, TuiInput],
    template: `
        <tui-textfield
            [style.max-width.rem]="30"
            [filler]="filler"
        >
            <label tuiLabel>Date</label>
            <input
                inputmode="decimal"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />

            <tui-icon icon="@tui.calendar" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocExample2 {
    protected value = '20.01.2023';
    protected readonly filler = 'dd.mm.yyyy';
    protected readonly mask = mask;
}
