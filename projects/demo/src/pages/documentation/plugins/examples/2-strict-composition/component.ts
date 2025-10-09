import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'plugins-strict-composition-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [maskito]="maskitoOptions"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter number
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PluginsDocExample3 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
