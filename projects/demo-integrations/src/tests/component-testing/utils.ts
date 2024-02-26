import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

@Component({
    standalone: true,
    imports: [MaskitoDirective],
    template: `
        <input
            [attr.maxlength]="maxLength"
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

    @Output()
    input = new EventEmitter();

    @Input()
    maxLength: number = Infinity;
}
