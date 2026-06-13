import {Directive, inject} from '@angular/core';
import {NgControl} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoTransform} from '@maskito/core';

@Directive({selector: '[maskitoAutoTransform]'})
export class MaskitoAutoTransformDirective {
    private readonly maskito = inject(MaskitoDirective);
    private readonly control = inject(NgControl);

    constructor() {
        const accessor = this.control.valueAccessor;
        const originalWriteValue = accessor?.writeValue.bind(accessor);

        if (!accessor || !originalWriteValue) {
            return;
        }

        accessor.writeValue = (value: unknown): void => {
            const options = this.maskito.options();

            originalWriteValue(
                options ? maskitoTransform(String(value ?? ''), options) : value,
            );
        };
    }
}
