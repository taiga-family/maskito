import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiTextarea} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    selector: 'overwrite-mode-dynamic-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiTextarea],
    template: `
        <tui-textfield [style.max-width.rem]="20">
            <textarea
                tuiTextarea
                [maskito]="maskitoOptions"
                [ngModel]="initialValue"
                [min]="6"
            ></textarea>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample3 {
    protected maskitoOptions = mask;

    protected initialValue =
        'This artificial example demonstrates the usage of dynamic mode. If this textarea contains only digits — "replace" mode is enabled. Otherwise, "shift" mode is enabled.';
}
