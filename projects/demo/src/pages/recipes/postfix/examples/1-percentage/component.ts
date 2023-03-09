import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'postfix-doc-example-1',
    template: `
        <tui-input
            ngModel=""
            [style.max-width.rem]="20"
        >
            Enter percentage amount
            <input
                tuiTextfield
                inputmode="tel"
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostfixDocExample1 {
    readonly maskitoOptions = mask;
}
