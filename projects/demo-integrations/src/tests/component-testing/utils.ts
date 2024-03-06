import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_ELEMENT_PREDICATE} from '@maskito/core';

@Component({
    standalone: true,
    imports: [MaskitoDirective],
    template: `
        <input
            [attr.maxlength]="maxLength"
            [attr.type]="type"
            [attr.value]="initialValue"
            [maskito]="maskitoOptions"
            [maskitoElement]="maskitoElementPredicate"
            (input)="input.emit($event)"
        />
    `,
})
export class TestInput {
    @Input()
    public initialValue = '';

    @Input()
    public maskitoOptions: MaskitoOptions | null = null;

    @Input()
    public maskitoElementPredicate: MaskitoElementPredicate =
        MASKITO_DEFAULT_ELEMENT_PREDICATE;

    @Output()
    public input = new EventEmitter();

    @Input()
    public maxLength = Infinity;

    @Input()
    public type: HTMLInputElement['type'] = 'text';
}
