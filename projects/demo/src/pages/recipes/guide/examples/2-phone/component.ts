import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
    ViewChild,
} from '@angular/core';

import mask, {GUIDE, removeGuide} from './mask';

@Component({
    selector: 'guide-doc-example-2',
    template: `
        <tui-input
            [tuiTextfieldCustomContent]="usFlag"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter US phone number
            <input
                #inputRef
                tuiTextfield
                inputmode="tel"
                [maskito]="maskitoOptions"
                (focus)="onFocus()"
                (blur)="onBlur()"
            />

            <ng-template #usFlag>
                <img
                    width="28"
                    alt="Flag of the United States"
                    [src]="'US' | tuiFlag"
                />
            </ng-template>
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideDocExample2 {
    @ViewChild('inputRef', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    readonly maskitoOptions = mask;
    value = '';

    constructor(private readonly ngZone: NgZone) {}

    onBlur(): void {
        const cleanValue = removeGuide(this.value);

        this.value = cleanValue === '+1' ? '' : cleanValue;
    }

    onFocus(): void {
        const initialValue = this.value || '+1 (';

        this.value = initialValue + GUIDE.slice(initialValue.length);

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
