import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {MaskitoDirective} from '../../../../../../angular/src/lib/maskito.directive';

@Component({
    standalone: true,
    selector: 'phone-doc-example-4',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        FormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconPhoneLarge"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Lazy metadata
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfield
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample4 implements OnInit {
    value = '+7 920 123-4567';
    mask = MASKITO_DEFAULT_OPTIONS;

    async ngOnInit(): Promise<void> {
        this.mask = maskitoPhoneOptionsGenerator({
            countryIsoCode: 'RU',
            metadata: await import('libphonenumber-js/min/metadata').then(m => m.default),
        });
    }
}
