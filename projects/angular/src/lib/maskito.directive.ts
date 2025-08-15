import type {OnChanges, OnDestroy} from '@angular/core';
import {Directive, ElementRef, inject, Input, NgZone} from '@angular/core';
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

    private optionsInternal: MaskitoOptions | null = null;
    private elementPredicateInternal: MaskitoElementPredicate =
        MASKITO_DEFAULT_ELEMENT_PREDICATE;

    constructor() {
        const accessor = inject(DefaultValueAccessor, {self: true, optional: true});

        if (accessor) {
            const original = accessor.writeValue.bind(accessor);

            accessor.writeValue = (value: unknown) => {
                original(
                    this.optionsInternal
                        ? maskitoTransform(String(value ?? ''), this.optionsInternal)
                        : value,
                );
            };
        }
    }

    @Input('maskito')
    public get options(): MaskitoOptions | null {
        return this.optionsInternal;
    }

    @Input('maskitoElement')
    public get elementPredicate(): MaskitoElementPredicate {
        return this.elementPredicateInternal;
    }

    public set options(value: MaskitoOptions | null) {
        if (this.optionsInternal === value) {
            return;
        }

        this.optionsInternal = value;
        void this.setup();
    }

    public set elementPredicate(value: MaskitoElementPredicate) {
        if (this.elementPredicateInternal === value) {
            return;
        }

        this.elementPredicateInternal = value;
        void this.setup();
    }

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    public async ngOnChanges(): Promise<void> {
        /**
         * no-op for backwards compatibility.
         */
    }

    public ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }

    private async setup(): Promise<void> {
        const options = this.optionsInternal;
        const elementPredicate = this.elementPredicateInternal;

        this.maskedElement?.destroy();
        this.maskedElement = null;

        if (!options) {
            return;
        }

        const predicateResult = await elementPredicate(this.elementRef);

        if (
            this.elementPredicateInternal !== elementPredicate ||
            this.optionsInternal !== options
        ) {
            // Ignore the result of the predicate if the
            // maskito element (or its options) has changed before the predicate was resolved.
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.maskedElement = new Maskito(predicateResult, options);
        });
    }
}
