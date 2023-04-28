import {Directive, ElementRef, Inject, Input, OnChanges, OnDestroy} from '@angular/core';
import {
    Maskito,
    MASKITO_DEFAULT_OPTIONS,
    MaskitoElementPredicate,
    MaskitoOptions,
} from '@maskito/core';

@Directive({
    selector: '[maskito]',
})
export class MaskitoDirective implements OnDestroy, OnChanges {
    private maskedElement: Maskito | null = null;

    @Input()
    maskito: MaskitoOptions = MASKITO_DEFAULT_OPTIONS;

    constructor(
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    ) {}

    @Input()
    maskitoElement: MaskitoElementPredicate = e =>
        e.querySelector('input,textarea') ||
        (e as HTMLInputElement | HTMLTextAreaElement);

    ngOnChanges(): void {
        this.maskedElement?.destroy();
        this.maskedElement = new Maskito(
            this.maskitoElement(this.elementRef.nativeElement),
            this.maskito,
        );
    }

    ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }
}
