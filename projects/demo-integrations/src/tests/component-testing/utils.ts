import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {
    MASKITO_DEFAULT_ELEMENT_PREDICATE,
    MaskitoElementPredicate,
    MaskitoOptions,
} from '@maskito/core';

@Component({
    standalone: true,
    imports: [MaskitoDirective],
    template: `
        <input
            [attr.value]="initialValue"
            [maskito]="maskitoOptions"
            [maskitoElement]="maskitoElementPredicate"
            (input)="input.emit($event)"
        />
    `,
})
export class TestInput {
    @Input()
    initialValue = '';

    @Input()
    maskitoOptions: MaskitoOptions | null = null;

    @Input()
    maskitoElementPredicate: MaskitoElementPredicate = MASKITO_DEFAULT_ELEMENT_PREDICATE;

    @Output()
    input = new EventEmitter();
}
