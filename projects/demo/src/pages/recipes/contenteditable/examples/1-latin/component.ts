import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'contenteditable-doc-example-1',
    imports: [FormsModule, MaskitoDirective],
    template: `
        Enter address
        <div
            contenteditable="true"
            name="asdf"
            [maskito]="mask"
        ></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentEditableDocExample1 {
    readonly mask = mask;
    value = '';
}
