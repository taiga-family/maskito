import {Directive, Input} from '@angular/core';
import {DefaultValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoTransform} from '@maskito/core';

import {MaskitoDirective} from './maskito.directive';

@Directive({
    standalone: true,
    selector: '[maskito]:is(input, textarea)',
    providers: [
        DefaultValueAccessor,
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: DefaultValueAccessor,
        },
    ],
    hostDirectives: [
        {
            directive: MaskitoDirective,
            inputs: ['maskito', 'maskitoElement'],
        },
    ],
    host: {
        '(input)': '$any(this.accessor)._handleInput($event.target.value)',
        '(blur)': 'accessor.onTouched()',
        '(compositionstart)': '$any(this.accessor)._compositionStart()',
        '(compositionend)': '$any(this.accessor)._compositionEnd($event.target.value)',
    },
})
export class MaskitoCVA {
    @Input()
    maskito: MaskitoOptions | null = MASKITO_DEFAULT_OPTIONS;

    constructor(readonly accessor: DefaultValueAccessor) {
        const original = accessor.writeValue.bind(accessor);

        accessor.writeValue = (value: unknown) => {
            original(
                maskitoTransform(
                    String(value ?? ''),
                    this.maskito ?? MASKITO_DEFAULT_OPTIONS,
                ),
            );
        };
    }
}
