import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'date-mask-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.calendar"
            [style.max-width.rem]="30"
            [filler]="filler"
        >
            <label tuiLabel>Lithuanian locale (lt-LT)</label>
            <input
                inputmode="numeric"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected value = '2005-10-21';
    protected readonly filler = 'yyyy-mm-dd';
    protected readonly mask = mask;
}
