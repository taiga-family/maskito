import { TuiInput, TuiIcon } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component, type OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MASKITO_DEFAULT_OPTIONS} from '@maskito/core';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';

@Component({
    selector: 'phone-doc-example-4',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiInput,
        TuiIcon
    ],
    template: `
        <tui-textfield [style.max-width.rem]="30">
        <label tuiLabel>Lazy metadata</label>
        <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [maskito]="mask" [(ngModel)]="value"/>

        <tui-icon icon="@tui.phone" />
        </tui-textfield>
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
