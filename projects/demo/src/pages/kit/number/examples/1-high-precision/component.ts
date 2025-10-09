import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            <strong>&pi;</strong>
            -value
            <input
                inputmode="decimal"
                placeholder="3,141..."
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample1 {
    protected value = '';
    protected maskitoOptions = mask;
}
