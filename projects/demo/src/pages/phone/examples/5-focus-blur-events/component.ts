import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';
import {TuiFlagPipe} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-5',
    imports: [FormsModule, MaskitoDirective, TuiFlagPipe, TuiInput],
    template: `
        <tui-textfield
            #textfield
            [style.max-width.rem]="30"
            [tuiTextfieldCleaner]="false"
        >
            <label tuiLabel>
                {{
                    textfield.focused()
                        ? 'Blur me to remove prefix'
                        : 'Focus me to see prefix'
                }}
            </label>
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [maskito]="mask"
                [(ngModel)]="value"
            />

            <img
                alt="Turkish flag"
                width="28"
                [src]="'TR' | tuiFlag"
                [style.border-radius.%]="50"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected value = '';
    protected readonly mask = mask;
}
