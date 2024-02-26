import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

@Component({
    standalone: true,
    imports: [MaskitoDirective],
    template: `
        <input
            #inputElemnt
            [attr.value]="initialValue"
            [maskito]="maskitoOptions"
            (input)="input.emit($event)"
        />
    `,
})
export class TestInput implements AfterViewInit {
    @ViewChild('inputElemnt')
    inputElement!: ElementRef;

    @Input()
    initialValue = '';

    @Input()
    maskitoOptions: MaskitoOptions | null = null;

    @Output()
    input = new EventEmitter();

    @Input()
    maxLength?: number;

    ngAfterViewInit(): void {
        if (this.maxLength) {
            this.inputElement.nativeElement.maxLength = this.maxLength;
        }
    }
}
