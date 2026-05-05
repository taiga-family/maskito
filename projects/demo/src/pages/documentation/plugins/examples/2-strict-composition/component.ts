import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'plugins-strict-composition-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <!-- TODO: (Taiga UI migration) tui-input migration (see https://taiga-ui.dev/components/input):
     - "[maskito]" is an unrecognized attribute and was placed on <tui-textfield>. Move it to <input tuiInput> if it targets the native element.
-->
        <tui-textfield
            [maskito]="maskitoOptions"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter number</label>
            <input
                tuiInput
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocExample3 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
