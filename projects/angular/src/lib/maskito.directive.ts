import {
    Directive,
    effect,
    ElementRef,
    inject,
    model,
    NgZone,
    type OnDestroy,
    untracked,
} from '@angular/core';
import {DefaultValueAccessor} from '@angular/forms';
import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    type MaskitoOptions,
    maskitoTransform,
} from '@maskito/core';

@Directive({selector: '[maskito]'})
export class MaskitoDirective implements OnDestroy {
    private readonly elementRef: HTMLElement = inject(ElementRef).nativeElement;
    private readonly ngZone = inject(NgZone);
    private maskedElement: Maskito | null = null;

    protected readonly initEffect = effect(async (onCleanup) => {
        const options = this.options();
        const elementPredicate = this.elementPredicate();
        const {elementRef, ngZone} = this;

        if (!options) {
            return;
        }

        const state = {cancelled: false};

        onCleanup(() => {
            state.cancelled = true;
            this.ngOnDestroy();
        });

        const predicateResult = await elementPredicate(elementRef);

        if (state.cancelled) {
            // Ignore the result of the predicate if the
            // maskito element (or its options) has changed before the predicate was resolved.
            return;
        }

        ngZone.runOutsideAngular(() => {
            this.maskedElement = new Maskito(predicateResult, options);
        });
    });

    public readonly options = model<MaskitoOptions | null>(null, {alias: 'maskito'});
    public readonly elementPredicate = model(MASKITO_DEFAULT_ELEMENT_PREDICATE, {
        alias: 'maskitoElement',
    });

    constructor() {
        const accessor = inject(DefaultValueAccessor, {self: true, optional: true});

        if (accessor) {
            const original = accessor.writeValue.bind(accessor);

            accessor.writeValue = (value: unknown) => {
                const options = untracked(() => this.options());

                original(
                    options ? maskitoTransform(String(value ?? ''), options) : value,
                );
            };
        }
    }

    public ngOnDestroy(): void {
        this.maskedElement?.destroy();
        this.maskedElement = null;
    }
}
