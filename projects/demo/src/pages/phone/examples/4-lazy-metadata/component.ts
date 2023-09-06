import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';

@Component({
    selector: 'phone-doc-example-4',
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
        const metadata = await import('libphonenumber-js/min/metadata').then(
            m => m.default,
        );

        this.mask = maskitoPhoneOptionsGenerator({
            countryIsoCode: 'RU',
            metadata,
        });
    }
}
