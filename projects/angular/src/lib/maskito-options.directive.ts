import {Directive, Input} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {ReplaySubject} from 'rxjs';

@Directive({
    selector: '[maskito]:not(input):not(textarea)',
})
export class MaskitoOptionsDirective extends ReplaySubject<MaskitoOptions> {
    constructor() {
        super(1);
    }

    /**
     * When native input element is hidden somewhere deep inside another component:
     * ```
     * @Component({
     *     template: `
     *         <your-custom-input [maskito]="options">
     *             <!-- <input maskito /> is somewhere inside -->
     *         </your-custom-input>
     *     `,
     * })
     * export class YourComponent {}
     * ```
     */
    @Input('maskito')
    set options(options: MaskitoOptions) {
        this.next(options);
    }
}
