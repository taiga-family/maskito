import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiIcon, TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'kit-plugins-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiIcon, TuiInput],
    template: `
        <tui-textfield
            filler="HH:MM AA"
            [style.max-width.rem]="20"
        >
            <label tuiLabel>Enter 12-hour time format</label>

            <input
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />

            <tui-icon icon="@tui.clock" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KitPluginsDocExample1 {
    protected value = '05:00 PM';
    protected maskitoOptions = mask;
}
