import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextarea} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'textarea-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiTextarea],
    template: `
        <!-- TODO: (Taiga UI migration) tui-textarea migration (see https://taiga-ui.dev/components/textarea):
     - Legacy tui-textarea had a fixed height of 20 rows by default. New component auto-resizes between [min] (default: 1) and [max] (default: 3) rows. Set min and max explicitly if the previous layout needs to be preserved.
-->
        <tui-textfield>
            <label tuiLabel>Enter address</label>
            <textarea
                autocomplete="street-address"
                placeholder="Only latin letters and digits are allowed"
                tuiTextarea
                [maskito]="mask"
                [(ngModel)]="value"
            ></textarea>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDocExample1 {
    protected readonly mask = mask;
    protected value = '';
}
