import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    ViewChild,
} from '@angular/core';

import mask, {PLACEHOLDER, removePlaceholder} from './mask';

@Component({
    selector: 'placeholder-doc-example-3',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter date
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
export class PlaceholderDocExample3 {
    @ViewChild('inputRef', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    readonly maskitoOptions = mask;
    value = '';

    constructor(private readonly ngZone: NgZone) {}

    onBlur(): void {
        this.value = removePlaceholder(this.value);
    }

    onFocus(): void {
        const initialValue = this.value;

        this.value = initialValue + PLACEHOLDER.slice(this.value.length);

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
