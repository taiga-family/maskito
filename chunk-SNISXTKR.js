import"./chunk-TIC6Q35B.js";var o=`import {ChangeDetectionStrategy, Component, resource} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoPhone} from '@maskito/phone';
import {TuiInput} from '@taiga-ui/core';

@Component({
    selector: 'phone-doc-example-4',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: \`
        <tui-textfield
            iconEnd="@tui.phone"
            [style.max-width.rem]="30"
        >
            <label tuiLabel>Lazy metadata</label>
            <input
                autocomplete="tel"
                inputmode="tel"
                tuiInput
                [maskito]="mask.value() ?? null"
                [(ngModel)]="value"
            />
        </tui-textfield>
    \`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneMaskDocExample4 {
    protected value = '+7 920 123-4567';

    protected readonly mask = resource({
        loader: async () =>
            import('libphonenumber-js/min/metadata').then(({default: metadata}) =>
                maskitoPhone({
                    countryIsoCode: 'RU',
                    metadata,
                }),
            ),
    });
}
`;export{o as default};
