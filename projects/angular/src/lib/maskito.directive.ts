import {Directive, ElementRef, Inject, Input, OnDestroy} from '@angular/core';
import {Maskito, MaskitoOptions} from '@maskito/core';
import {MASKITO_OPTIONS} from './maskito-options';

@Directive({
    selector: 'input[maskito], textarea[maskito]',
})
export class MaskitoDirective implements OnDestroy {
    private maskedElement: Maskito | null = null;

    /**
     * When developer has direct access to native input element:
     * ```
     * <input [maskito]="options" />
     * ```
     * ___
     * When native input element is hidden somewhere deep inside another component:
     * ```
     * @Component({
     *     template: `
     *         <your-custom-input>
     *             <!-- <input maskito /> is somewhere inside -->
     *         </your-custom-input>
     *     `,
     *     providers: [{provide: MASKITO_OPTIONS, useValue: {mask: /^\d+$/}}],
     * })
     * export class YourComponent {}
     * ```
     * WARNING! This approach is acceptable only for the static mask (no mask option changes).
     */
    @Input('maskito')
    set options(options: MaskitoOptions | '') {
        this.maskedElement?.destroy();

        this.maskedElement = new Maskito(
            this.elementRef.nativeElement,
            options || this.defaultOptions,
        );
    }

    constructor(
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
        @Inject(MASKITO_OPTIONS)
        private readonly defaultOptions: MaskitoOptions,
    ) {}

    ngOnDestroy() {
        this.maskedElement?.destroy();
    }
}
