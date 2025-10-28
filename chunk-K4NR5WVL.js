import"./chunk-6M32EY24.js";var a=`import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';

import mask from './mask';

@Component({
    selector: 'content-editable-doc-example-2',
    imports: [MaskitoDirective],
    template: \`
        <i>Enter message:</i>
        <p
            contenteditable="true"
            [innerHTML]="initialText"
            [maskito]="mask"
        ></p>
    \`,
    styles: [
        \`
            [contenteditable] {
                white-space: pre;
                border: 3px dashed lightgrey;
                max-width: 30rem;
                padding: 1rem;
            }
        \`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentEditableDocExample2 {
    protected readonly mask = mask;
    protected initialText = \`Hello, world!
How are you today?
Read description of this example!\`;
}
`;export{a as default};
