import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-1',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconClockLarge"
            tuiTextfieldFiller="hh:mm:ss"
            ngModel="23:59:59"
            [style.max-width.rem]="20"
        >
            HH:MM:SS
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample1 {
    readonly mask = mask;
}
