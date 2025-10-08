import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiTextfield} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'kit-plugins-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiIcon, TuiTextfield],
    template: `
        <tui-textfield
            filler="+1 (___) ___-____"
            [style.max-width.rem]="20"
            [tuiTextfieldCleaner]="false"
        >
            <input
                placeholder="Enter mobile phone"
                tuiTextfield
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />

            <tui-icon icon="@tui.phone"></tui-icon>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitPluginsDocExample3 {
    protected value = '';
    protected maskitoOptions = mask;
}
