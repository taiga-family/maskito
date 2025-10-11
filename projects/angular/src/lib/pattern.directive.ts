import {Directive, inject, Input} from '@angular/core';

import {MaskitoDirective} from './maskito.directive';

@Directive({
    standalone: true,
    selector: '[maskitoPattern]',
    hostDirectives: [MaskitoDirective],
})
export class MaskitoPattern {
    private readonly maskitoDirective = inject(MaskitoDirective, {self: true});

    @Input()
    public set maskitoPattern(pattern: RegExp | string) {
        this.maskitoDirective.options.set({
            mask: typeof pattern === 'string' ? new RegExp(`^${pattern}$`) : pattern,
        });
    }
}
