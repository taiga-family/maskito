import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'number-mask-doc-example-6',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="30">
            <input
                tuiInput
                [maskito]="options"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocExample6 {
    protected value = '-$777';
    protected readonly options = mask;
}
