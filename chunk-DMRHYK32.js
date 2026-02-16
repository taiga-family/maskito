import"./chunk-TIC6Q35B.js";var o=`import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoPattern} from '@maskito/angular';

@Component({
    selector: 'pattern-doc-example-6',
    imports: [FormsModule, MaskitoPattern],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatternDocExample6 {
    protected name = '';
    protected cvc = '';

    protected regExp = /^[a-z\\s]+$/i;
}
`;export{o as default};
