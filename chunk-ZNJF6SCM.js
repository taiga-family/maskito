import"./chunk-TIC6Q35B.js";var r=`import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoNumber} from '@maskito/kit';

import {MaskitoAutoTransform} from './auto-transform';
import {CustomInput} from './custom-input';

@Component({
    selector: 'cva-auto-transform-doc-example-7',
    imports: [CustomInput, MaskitoAutoTransform, MaskitoDirective, ReactiveFormsModule],
    templateUrl: './index.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvaAutoTransformDocExample7 {
    protected readonly control = new FormControl('');
    protected readonly maskito = maskitoNumber({maximumFractionDigits: 2});

    protected setValue(): void {
        this.control.setValue('12345.6789');
    }
}
`;export{r as default};
