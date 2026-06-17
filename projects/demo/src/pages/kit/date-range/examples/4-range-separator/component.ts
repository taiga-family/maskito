import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'date-range-mask-doc-example-4',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.calendar"
            [style.max-width.rem]="30"
            [filler]="filler"
        >
            <input
                inputmode="decimal"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected value = '01.01.2023 ~ 05.01.2023';
    protected readonly filler = 'dd.mm.yyyy ~ dd.mm.yyyy';
    protected readonly mask = mask;
}
