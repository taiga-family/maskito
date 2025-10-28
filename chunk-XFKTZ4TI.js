import"./chunk-6M32EY24.js";var a=`import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';

import mask from './mask';

@Component({
    selector: 'content-editable-doc-example-1',
    imports: [MaskitoDirective],
    template: \`
        Meeting time:
        <span
            contenteditable="true"
            [maskito]="mask"
            [textContent]="initialValue"
        ></span>
    \`,
    styles: [
        ':host {font-size: 1.75rem}',
        '[contenteditable] {border: 3px dashed lightgrey}',
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentEditableDocExample1 {
    protected initialValue = '12:00';
    protected readonly mask = mask;
}
`;export{a as default};
