import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    ViewChild,
} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'placeholder-doc-example-1',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCreditCardLarge"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter CVC code
            <input
                #inputRef
                tuiTextfield
                inputmode="numeric"
                [maskito]="maskitoOptions"
                (focus)="onFocus()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDocExample1 {
    @ViewChild('inputRef', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    readonly maskitoOptions = mask;
    value = 'xxx';

    constructor(private readonly ngZone: NgZone) {}

    onFocus(): void {
        const beforePlaceholder = this.value.indexOf('x');

        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.inputRef.nativeElement.setSelectionRange(
                    beforePlaceholder,
                    beforePlaceholder,
                );
            });
        });
    }
}
