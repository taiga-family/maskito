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

    @Input('maskito')
    public options: MaskitoOptions | null = null;

    @Input('maskitoElement')
    public elementPredicate: MaskitoElementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE;

    constructor() {
        const accessor = inject(DefaultValueAccessor, {self: true, optional: true});

        if (accessor) {
            const original = accessor.writeValue.bind(accessor);

            accessor.writeValue = (value: unknown) => {
                original(
                    this.options
                        ? maskitoTransform(String(value ?? ''), this.options)
                        : value,
                );
            };
        }
    }

    public async ngOnChanges(): Promise<void> {
        const {elementPredicate, options} = this;

        this.maskedElement?.destroy();

        if (!options) {
            return;
        }

        const predicateResult = await elementPredicate(this.elementRef);

        if (this.elementPredicate !== elementPredicate) {
            // Ignore the result of the predicate if the
            // maskito element has changed before the predicate was resolved.
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.maskedElement = new Maskito(predicateResult, options);
        });
    }

    public ngOnDestroy(): void {
        this.maskedElement?.destroy();
    }
}
