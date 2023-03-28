import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'prefix-doc-example-1',
    template: `
        <tui-input
            ngModel=""
            [style.max-width.rem]="20"
        >
            Enter price
            <input
                tuiTextfield
                inputmode="tel"
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrefixDocExample1 {
    readonly maskitoOptions = mask;
}
