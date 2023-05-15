import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    ViewChild,
} from '@angular/core';

import mask, {GUIDE, removeGuide} from './mask';

@Component({
    selector: 'guide-doc-example-1',
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
                (blur)="onBlur()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideDocExample1 {
    @ViewChild('inputRef', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    readonly maskitoOptions = mask;
    value = '';

    constructor(private readonly ngZone: NgZone) {}

    onBlur(): void {
        this.value = removeGuide(this.value);
    }

    onFocus(): void {
        const initialValue = this.value;

        this.value = initialValue + GUIDE.slice(this.value.length);

        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.inputRef.nativeElement.setSelectionRange(
                    initialValue.length,
                    initialValue.length,
                );
            });
        });
    }
}
