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
    public initialValue = '';

    @Input()
    public maskitoOptions: MaskitoOptions | null = null;

    @Output()
    public input = new EventEmitter();

    @Input()
    public maxLength = Infinity;
}
