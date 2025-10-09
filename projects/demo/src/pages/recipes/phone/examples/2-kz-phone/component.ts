import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipe, TuiTextfield} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-2',
    imports: [MaskitoDirective, ReactiveFormsModule, TuiFlagPipe, TuiTextfield],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneKZDocExample2 {
    protected readonly maskitoOptions = mask;
    protected readonly control = new FormControl('');
}
