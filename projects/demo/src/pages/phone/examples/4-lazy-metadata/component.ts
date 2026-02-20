import type {OnInit} from '@angular/core';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

@Component({
    selector: 'phone-doc-example-4',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInputModule,
        TuiTextfieldControllerModule,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="@tui.phone"
            [style.max-width.rem]="30"
            [(ngModel)]="value"
        >
            Lazy metadata
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiTextfieldLegacy
                [maskito]="mask"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample4 implements OnInit {
    protected value = '+7 920 123-4567';
    protected mask = MASKITO_DEFAULT_OPTIONS;

    public ngOnInit(): void {
        import('libphonenumber-js/min/metadata').then(({default: metadata}) => () => {
            this.mask = maskitoPhoneOptionsGenerator({countryIsoCode: 'RU', metadata});
        });
    }
}
