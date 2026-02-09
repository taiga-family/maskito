import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInputModule} from '@taiga-ui/legacy';

import mask from './mask';

@Component({
    selector: 'network-address-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInputModule],
    template: `
        <tui-input
            [style.max-width.rem]="25"
            [(ngModel)]="value"
        >
            Enter IPv6 address
            <input
                tuiTextfieldLegacy
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkAddressDocExample1 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
