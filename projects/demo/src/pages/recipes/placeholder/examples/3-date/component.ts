import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'placeholder-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.calendar"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter date</label>
            <input
                inputmode="numeric"
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDocExample3 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
