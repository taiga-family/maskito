import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'time-mask-doc-example-2',
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconTimeLarge"
            tuiTextfieldFiller="hh:mm"
            ngModel="11:59"
            [tuiTextfieldLabelOutside]="true"
            [style.max-width.rem]="20"
        >
            <input
                tuiTextfield
                inputmode="decimal"
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocExample2 {
    readonly mask = mask;
}
