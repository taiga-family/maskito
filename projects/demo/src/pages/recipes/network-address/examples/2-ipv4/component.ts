import { TuiInput } from "@taiga-ui/core";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'network-address-doc-example-2',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield [style.max-width.rem]="25">
        <label tuiLabel>Enter IPv4 address</label>
        <input
                inputmode="numeric"
                tuiInput
                [maskito]="maskitoOptions" [(ngModel)]="value"/>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkAddressDocExample2 {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
