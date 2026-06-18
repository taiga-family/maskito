import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.phone"
            [style.max-width.rem]="30"
        >
            <label tuiLabel>Basic</label>
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected value = '+7 771 931-1111';
    protected readonly mask = mask;
}
