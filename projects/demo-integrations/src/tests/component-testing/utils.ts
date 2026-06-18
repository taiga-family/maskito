import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MASKITO_DEFAULT_ELEMENT_PREDICATE, type MaskitoOptions} from '@maskito/core';

@Component({
    selector: 'test-input',
    imports: [MaskitoDirective],
    template: `
        <input
            [attr.maxlength]="maxLength()"
            [attr.type]="type()"
            [attr.value]="initialValue()"
            [maskito]="maskitoOptions()"
            [maskitoElement]="maskitoElementPredicate()"
            (beforeinput)="beforeinput.emit($event)"
            (change)="change.emit($event)"
            (input)="input.emit($event)"
        />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInput {
    public readonly initialValue = input<string>('');
    public readonly maskitoOptions = input<MaskitoOptions | null>(null);
    public readonly maskitoElementPredicate = input(MASKITO_DEFAULT_ELEMENT_PREDICATE);
    public readonly beforeinput = output<Event>();
    public readonly input = output<Event>();
    public readonly change = output<Event>();
    public readonly maxLength = input(Infinity);
    public readonly type = input<HTMLInputElement['type']>('text');
}
