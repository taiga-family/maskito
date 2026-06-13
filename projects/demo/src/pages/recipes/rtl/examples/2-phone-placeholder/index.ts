import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'rtl-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    templateUrl: './index.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RtlDocExample2 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
