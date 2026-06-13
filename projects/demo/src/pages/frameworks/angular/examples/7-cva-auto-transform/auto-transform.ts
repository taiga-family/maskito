import {Directive, inject} from '@angular/core';
import {NgControl} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoTransform} from '@maskito/core';

@Directive({selector: '[maskito]'})
export class MaskitoAutoTransform {
    private readonly maskito = inject(MaskitoDirective);
    private readonly control = inject(NgControl);

    constructor() {
        const accessor = this.control.valueAccessor!;
        const original = accessor.writeValue;

        accessor.writeValue = (value: unknown) => {
            const options = this.maskito.options();

            if (typeof value === 'string' && options) {
                original.call(accessor, maskitoTransform(value, options));
            } else {
                original.call(accessor, value);
            }
        };
    }
}
