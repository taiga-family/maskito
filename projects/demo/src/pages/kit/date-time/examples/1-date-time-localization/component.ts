import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'date-time-mask-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiIcon, TuiInput],
    template: `
        <tui-textfield
            [style.max-width.rem]="30"
            [filler]="filler"
        >
            <label tuiLabel>Localization</label>
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
export class DateTimeMaskDocExample1 {
    protected value = '09/20/2020, 15:30';
    protected readonly filler = 'mm/dd/yyyy, hh:mm';
    protected readonly mask = mask;
}
