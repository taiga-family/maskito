import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextareaModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'textarea-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiTextareaModule],
    template: `
        <tui-textarea [(ngModel)]="value">
            Enter address
            <textarea
                autocomplete="street-address"
                placeholder="Only latin letters and digits are allowed"
                tuiTextfield
                [maskito]="mask"
            ></textarea>
        </tui-textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDocExample1 {
    protected readonly mask = mask;
    protected value = '';
}
