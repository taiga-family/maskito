import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'textarea-doc-example-1',
    template: `
        <tui-textarea [(ngModel)]="value">
            Enter address
            <textarea
                autocomplete="street-address"
                tuiTextfield
                placeholder="Only latin letters and digits are allowed"
                [maskito]="mask"
            ></textarea>
        </tui-textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaDocExample1 {
    readonly mask = mask;
    value = '';
}
