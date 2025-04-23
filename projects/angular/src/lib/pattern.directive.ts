import type {OnChanges} from '@angular/core';
import {Directive, inject, Input} from '@angular/core';

import {MaskitoDirective} from './maskito.directive';

@Directive({
    standalone: true,
    selector: '[maskitoPattern]',
    hostDirectives: [MaskitoDirective],
})
export class MaskitoPatternDirective implements OnChanges {
    private readonly maskitoDirective = inject(MaskitoDirective, {self: true});
    private regex: RegExp | null = null;
    @Input('maskitoPattern')
    public set regExpStr(pattern: RegExp | string) {
        if (!pattern) {
            this.regex = null;

            return;
        }

        if (typeof pattern === 'string') {
            pattern = new RegExp(pattern);
        }

        this.regex = pattern;
    }

    public ngOnChanges(): void {
        const pattern = this.regex;

        if (pattern) {
            this.maskitoDirective.options = {
                mask: pattern,
            };
            this.maskitoDirective.ngOnChanges();
        }
    }
}
