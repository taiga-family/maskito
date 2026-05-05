import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'date-time-mask-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiIcon, TuiInput],
    template: `
        <tui-textfield
            [style.max-width.rem]="30"
            [filler]="filler"
        >
            <label tuiLabel>Custom date and time separator</label>
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
export class DateTimeMaskDocExample2 {
    protected value = '05.02.2004; 10:10';
    protected readonly filler = 'dd.mm.yyyy; hh:mm';
    protected readonly mask = mask;
}
