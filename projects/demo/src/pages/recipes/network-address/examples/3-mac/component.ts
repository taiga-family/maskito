import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import mask from './mask';

@Component({
    selector: 'network-address-doc-example-3',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="25">
            <label tuiLabel>Enter MAC address</label>
            <input
                tuiInput
                [maskito]="maskitoOptions"
                [(ngModel)]="value"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkAddressDocExample3 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
