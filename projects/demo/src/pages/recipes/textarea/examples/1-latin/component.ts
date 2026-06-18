import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextarea} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'textarea-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiTextarea],
    template: `
        <tui-textfield>
            <label tuiLabel>Enter address</label>
            <textarea
                autocomplete="street-address"
                placeholder="Only latin letters and digits are allowed"
                tuiTextarea
                [min]="3"
                [maskito]="mask"
                [(ngModel)]="value"
            ></textarea>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected readonly mask = mask;
    protected value = '';
}
