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
    MASKITO_DEFAULT_OPTIONS,
    MASKITO_DEFAULT_PREDICATE,
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
    maskitoElement = MASKITO_DEFAULT_PREDICATE;

    constructor(
        @Inject(NgZone) private readonly ngZone: NgZone,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    ) {}

    ngOnChanges(): void {
        this.maskedElement?.destroy();
        this.ngZone.runOutsideAngular(() => {
            this.maskedElement = new Maskito(
                this.maskitoElement(this.elementRef.nativeElement),
                this.maskito,
            );
        });
    }

    ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }
}
