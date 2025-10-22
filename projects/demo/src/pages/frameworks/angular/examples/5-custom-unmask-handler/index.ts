import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoNumberParams} from '@maskito/kit';
import {
    maskitoNumberOptionsGenerator,
    maskitoParseNumber,
    maskitoStringifyNumber,
} from '@maskito/kit';

import {UnmaskDirective} from './unmask.directive';

const NUMBER_PARAMS: MaskitoNumberParams = {
    maximumFractionDigits: 2,
    thousandSeparator: '.',
    decimalSeparator: ',',
};

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

    protected readonly maskito = maskitoNumberOptionsGenerator(NUMBER_PARAMS);

    /**
     * `maskitoParseNumber` is built-in utility to convert
     * entered number (as prettified formatted STRING) to number-type value
     */
    protected readonly unmaskHandler = (x: string): number =>
        maskitoParseNumber(x, NUMBER_PARAMS);

    protected readonly stringify = (x: number): string =>
        maskitoStringifyNumber(x, NUMBER_PARAMS);
}
