import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoNumberOptionsGenerator, maskitoParseNumber} from '@maskito/kit';

import {UnmaskDirective} from './unmask.directive';

@Component({
    selector: 'custom-unmask-handler-doc-example-5',
    imports: [FormsModule, MaskitoDirective, UnmaskDirective],
    templateUrl: './index.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnmaskDocExample5 {
    /**
     * Pay attention, this variable (form control value) always contains only NUMBER-type values.
     * Despite it, textfield's value is always prettified formatted STRING.
     */
    protected value = 1000.42;

    protected readonly maskito = maskitoNumberOptionsGenerator({
        maximumFractionDigits: 2,
        thousandSeparator: ',',
        decimalSeparator: '.',
    });

    /**
     * `maskitoParseNumber` is built-in utility to convert
     * entered number (as prettified formatted STRING) to number-type value
     */
    protected readonly unmaskHandler = maskitoParseNumber;
}
