import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'postfix-doc-example-2',
    template: `
        <tui-input
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter time
            <input
                tuiTextfield
                inputmode="tel"
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostfixDocExample2 {
    readonly maskitoOptions = mask;
    value = '';
}
