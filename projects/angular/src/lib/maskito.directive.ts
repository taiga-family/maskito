import {
    Directive,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Optional,
    Self,
} from '@angular/core';
import {DefaultValueAccessor} from '@angular/forms';
import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MASKITO_DEFAULT_OPTIONS,
    MaskitoElementPredicate,
    MaskitoOptions,
    maskitoTransform,
} from '@maskito/core';

@Directive({standalone: true, selector: '[maskito]'})
export class MaskitoDirective implements OnDestroy, OnChanges {
    private maskedElement: Maskito | null = null;

    @Input()
    maskito: MaskitoOptions | null = null;

    @Input()
    maskitoElement: MaskitoElementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE;

    constructor(
        @Inject(NgZone) private readonly ngZone: NgZone,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(DefaultValueAccessor)
        @Self()
        @Optional()
        accessor: DefaultValueAccessor | null,
    ) {
        if (accessor !== null) {
            const original = accessor.writeValue.bind(accessor);

            accessor.writeValue = (value: unknown) => {
                original(maskitoTransform(String(value ?? ''), this.options));
            };
        }
    }

    private get options(): MaskitoOptions {
        return this.maskito ?? MASKITO_DEFAULT_OPTIONS;
    }

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
            this.maskedElement = new Maskito(predicateResult, this.options);
        });
    }

    ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }
}
