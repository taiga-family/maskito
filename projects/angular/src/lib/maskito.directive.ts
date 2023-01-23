import {Directive, ElementRef, Inject, Input, OnDestroy, Optional} from '@angular/core';
import {Maskito, MaskitoOptions} from '@maskito/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MaskitoOptionsDirective} from './maskito-options.directive';

@Directive({
    selector: 'input[maskito], textarea[maskito]',
})
export class MaskitoDirective implements OnDestroy {
    private readonly destroy$ = new Subject();
    private maskedElement: Maskito | null = null;

    constructor(
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
        @Optional()
        @Inject(MaskitoOptionsDirective)
        private readonly externalOptions$: Observable<MaskitoOptions> | null,
    ) {}

    /**
     * When developer has direct access to native input element:
     * ```
     * <input [maskito]="options" />
     * ```
     */
    @Input('maskito')
    set options(options: MaskitoOptions | '') {
        this.destroy$.next();

        if (options) {
            this.setup(options);
        } else {
            this.externalOptions$
                ?.pipe(takeUntil(this.destroy$))
                .subscribe(options => this.setup(options));
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.maskedElement?.destroy();
    }

    private setup(options: MaskitoOptions): void {
        this.maskedElement?.destroy();
        this.maskedElement = new Maskito(this.elementRef.nativeElement, options);
    }
}
