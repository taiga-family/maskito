import {ChangeDetectionStrategy, Component} from '@angular/core';

import mask from './mask';

@Component({
    selector: 'phone-doc-example-1',
    template: `
        <tui-input
            [tuiTextfieldCustomContent]="usFlag"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter a phone number
            <input
                tuiTextfield
                inputmode="tel"
                [maskito]="maskitoOptions"
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
export class PhoneUSDocExample1 {
    readonly maskitoOptions = mask;
    value = '+1 (212) 555-2368';
}
