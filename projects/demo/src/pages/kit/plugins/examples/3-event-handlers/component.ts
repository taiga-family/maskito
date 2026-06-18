import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'kit-plugins-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            iconEnd="@tui.phone"
            filler="+1 (___) ___-____"
            [style.max-width.rem]="20"
            [tuiTextfieldCleaner]="false"
        >
            <input
                placeholder="Enter mobile phone"
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected value = '';
    protected maskitoOptions = mask;
}
