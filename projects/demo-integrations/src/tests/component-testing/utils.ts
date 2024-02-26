import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';

@Component({
    standalone: true,
    imports: [MaskitoDirective],
    template: `
        <input
            [attr.value]="initialValue"
            [maskito]="maskitoOptions"
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
    maskitoElementPredicate: MaskitoElementPredicate | null = null;

    @Output()
    input = new EventEmitter();
}
