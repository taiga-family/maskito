import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiFlagPipeModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'phone-doc-example-2',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        TuiFlagPipeModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneKZDocExample2 {
    readonly maskitoOptions = mask;

    readonly control = new FormControl('');

    onFocus(): void {
        if (!this.control.value) {
            this.control.patchValue('+7 ');
        }
    }

    onBlur(): void {
        if (this.control.value === '+7 ') {
            this.control.patchValue('');
        }
    }
}
