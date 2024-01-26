import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'number-mask-doc-example-4',
    imports: [TuiInputModule, FormsModule, MaskitoDirective],
    template: `
        <tui-input
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Cost
            <input
                inputmode="decimal"
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample4 {
    value = '$100.00';
    maskitoOptions = mask;
}
