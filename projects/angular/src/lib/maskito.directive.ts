import {
    Directive,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
} from '@angular/core';
import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
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

    @Input()
    maskitoElement: MaskitoElementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE;

    constructor(
        @Inject(NgZone) private readonly ngZone: NgZone,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    ) {}

    async ngOnChanges(): Promise<void> {
        this.maskedElement?.destroy();

        const predicate = this.maskitoElement;
        const predicateResult = await predicate(this.elementRef.nativeElement);

        if (this.maskitoElement !== predicate) {
            // Ignore the result of the predicate if the
            // maskito element has changed before the predicate was resolved.
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.maskedElement = new Maskito(predicateResult, this.maskito);
        });
    }

    ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }
}
