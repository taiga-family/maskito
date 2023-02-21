import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-2',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconClockLarge"
            tuiTextfieldFiller="hh:mm"
            [tuiTextfieldLabelOutside]="true"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="mask"
                (blur)="onBlur()"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample2 {
    value = '11:59';
    readonly mask = mask;

    onBlur(): void {
        const [hours, minutes = ''] = this.value.split(':');

        this.value = [hours, minutes].map(segment => segment.padEnd(2, '0')).join(':');
    }
}
