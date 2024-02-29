import {
    Directive,
    ElementRef,
    inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
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
    private readonly elementRef: HTMLElement = inject(ElementRef).nativeElement;
    private readonly ngZone = inject(NgZone);
    private maskedElement: Maskito | null = null;

    @Input()
    public maskito: MaskitoOptions | null = null;

    @Input()
    public maskitoElement: MaskitoElementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE;

    constructor() {
        const accessor = inject(DefaultValueAccessor, {self: true, optional: true});

        if (accessor) {
            const original = accessor.writeValue.bind(accessor);

            accessor.writeValue = (value: unknown) => {
                original(maskitoTransform(String(value ?? ''), this.options));
            };
        }
    }

    private get options(): MaskitoOptions {
        return this.maskito ?? MASKITO_DEFAULT_OPTIONS;
    }

    public async ngOnChanges(): Promise<void> {
        this.maskedElement?.destroy();

        const predicate = this.maskitoElement;
        const predicateResult = await predicate(this.elementRef);

        if (this.maskitoElement !== predicate) {
            // Ignore the result of the predicate if the
            // maskito element has changed before the predicate was resolved.
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.maskedElement = new Maskito(predicateResult, this.options);
        });
    }

    public ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }
}
