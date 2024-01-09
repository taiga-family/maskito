import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'plugins-composition-validation-doc-example-3',
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
    maskitoOptions = mask;
    value = '';
}
