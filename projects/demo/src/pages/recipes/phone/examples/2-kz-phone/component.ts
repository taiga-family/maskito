import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-2',
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
