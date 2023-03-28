import {Directive, ElementRef, Inject, Input, Renderer2} from '@angular/core';
import {
    COMPOSITION_BUFFER_MODE,
    DefaultValueAccessor,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
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

    constructor(
        renderer: Renderer2,
        elementRef: ElementRef,
        @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean,
    ) {
        super(renderer, elementRef, _compositionMode);
    }

    override writeValue(value: unknown): void {
        super.writeValue(maskitoTransform(String(value ?? ''), this.maskito));
    }
}
