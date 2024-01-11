import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiInputModule} from '@taiga-ui/kit';

import {MaskitoDirective} from '../../../../../../../angular/src/lib/maskito.directive';
import mask from './mask';

@Component({
    standalone: true,
    selector: 'plugins-strict-composition-doc-example-3',
    imports: [TuiInputModule, MaskitoDirective, ReactiveFormsModule, FormsModule],
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
    readonly maskitoOptions = mask;
    value = '';
}
