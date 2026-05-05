import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'input-type-search-example',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconStart="@tui.search"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter any english word</label>
            <input
                tuiInput
                type="search"
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
