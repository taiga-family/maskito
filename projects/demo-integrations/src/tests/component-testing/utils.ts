import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoElementPredicate, MaskitoOptions} from '@maskito/core';
import {MASKITO_DEFAULT_ELEMENT_PREDICATE} from '@maskito/core';

@Component({
    standalone: true,
    selector: 'test-input',
    imports: [MaskitoDirective],
    template: `
        <input
            [attr.maxlength]="maxLength"
            [attr.type]="type"
            [attr.value]="initialValue"
            [maskito]="maskitoOptions"
            [maskitoElement]="maskitoElementPredicate"
            (beforeinput)="beforeinput.emit($event)"
            (change)="change.emit($event)"
            (input)="input.emit($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    public readonly beforeinput = new EventEmitter();

    @Output()
    public readonly input = new EventEmitter();

    @Output()
    public readonly change = new EventEmitter();

    @Input()
    public maxLength = Infinity;

    @Input()
    public type: HTMLInputElement['type'] = 'text';
}
