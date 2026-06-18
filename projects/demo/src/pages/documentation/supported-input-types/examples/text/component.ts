import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'input-type-text-example',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.clock"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter time</label>
            <input
                inputmode="decimal"
                tuiInput
                type="text"
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
