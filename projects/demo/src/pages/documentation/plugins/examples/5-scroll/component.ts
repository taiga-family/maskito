import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextfield} from '@taiga-ui/core';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'plugins-scroll-doc-example-5',
    imports: [FormsModule, MaskitoDirective, TuiTextfield],
    template: `
        <tui-textfield
            [style.max-width.rem]="5"
            [tuiTextfieldCleaner]="false"
        >
            <label tuiLabel>Price</label>

            <input
                tuiTextfield
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocExample5 {
    protected readonly maskitoOptions = mask;
    protected value = '$1 234';
}
