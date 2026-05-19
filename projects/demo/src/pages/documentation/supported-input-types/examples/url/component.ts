import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'input-type-url-example',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.globe"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter url</label>
            <input
                tuiInput
                type="url"
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputURLDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
