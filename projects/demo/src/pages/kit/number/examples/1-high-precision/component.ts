import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="30">
            <label tuiLabel>
                <strong>&pi;</strong>
                -value
            </label>
            <input
                inputmode="decimal"
                placeholder="3,141..."
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample1 {
    protected value = '';
    protected maskitoOptions = mask;
}
