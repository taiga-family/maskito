import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'input-type-text-example',
    imports: [FormsModule, MaskitoDirective, TuiIcon, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="20">
            <label tuiLabel>Enter time</label>
            <input
                inputmode="decimal"
                tuiInput
                type="text"
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />

            <tui-icon icon="@tui.clock" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
