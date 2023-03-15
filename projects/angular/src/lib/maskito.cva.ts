import {Directive, Input} from '@angular/core';
import {DefaultValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MASKITO_DEFAULT_OPTIONS, MaskitoOptions, maskitoTransform} from '@maskito/core';

@Directive({
    selector: 'input[maskito], textarea[maskito]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: MaskitoCva,
        },
    ],
    host: {
        '(input)': '$any(this)._handleInput($event.target.value)',
        '(blur)': 'onTouched()',
        '(compositionstart)': '$any(this)._compositionStart()',
        '(compositionend)': '$any(this)._compositionEnd($event.target.value)',
    },
})
export class MaskitoCva extends DefaultValueAccessor {
    @Input()
    maskito: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

    override writeValue(value: unknown): void {
        super.writeValue(maskitoTransform(String(value ?? ''), this.maskito));
    }
}
