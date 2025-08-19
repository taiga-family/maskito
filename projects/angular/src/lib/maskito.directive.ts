import type {OnChanges, OnDestroy} from '@angular/core';
import {
    Directive,
    effect,
    ElementRef,
    inject,
    Input,
    NgZone,
    signal,
    untracked,
} from '@angular/core';
import {DefaultValueAccessor} from '@angular/forms';
import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {
    Maskito,
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    maskitoTransform,
} from '@maskito/core';

@Directive({standalone: true, selector: '[maskito]'})
export class MaskitoDirective implements OnDestroy, OnChanges {
    private readonly elementRef: HTMLElement = inject(ElementRef).nativeElement;
    private readonly ngZone = inject(NgZone);
    private maskedElement: Maskito | null = null;

    // TODO(v4): delete excessive setters/getters
    private readonly optionsInternal = signal<MaskitoOptions | null>(null);
    private readonly elementPredicateInternal = signal<MaskitoElementPredicate>(
        MASKITO_DEFAULT_ELEMENT_PREDICATE,
    );

    protected readonly initEffect = effect(async () => {
        const elementPredicate = this.elementPredicateInternal();
        const options = this.optionsInternal();
        const {maskedElement, elementRef, ngZone} = this;

        maskedElement?.destroy();

        if (!options) {
            return;
        }

        const predicateResult = await elementPredicate(elementRef);

        if (this.elementPredicate !== elementPredicate || this.options !== options) {
            // Ignore the result of the predicate if the
            // maskito element (or its options) has changed before the predicate was resolved.
            return;
        }

        ngZone.runOutsideAngular(() => {
            this.maskedElement = new Maskito(predicateResult, options);
        });
    });

    constructor() {
        const accessor = inject(DefaultValueAccessor, {self: true, optional: true});

        if (accessor) {
            const original = accessor.writeValue.bind(accessor);

            accessor.writeValue = (value: unknown) => {
                const options = untracked(this.optionsInternal);

                original(
                    options ? maskitoTransform(String(value ?? ''), options) : value,
                );
            };
        }
    }

    @Input('maskito')
    public set options(value: MaskitoOptions | null) {
        this.optionsInternal.set(value);
    }

    @Input('maskitoElement')
    public set elementPredicate(value: MaskitoElementPredicate) {
        this.elementPredicateInternal.set(value);
    }

    public get options(): MaskitoOptions | null {
        return this.optionsInternal();
    }

    public get elementPredicate(): MaskitoElementPredicate {
        return this.elementPredicateInternal();
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    public async ngOnChanges(): Promise<void> {
        // TODO(v4): delete
    }

    public ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }
}
