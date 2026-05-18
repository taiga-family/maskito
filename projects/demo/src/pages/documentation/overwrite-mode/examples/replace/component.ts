import { TuiTooltip } from "@taiga-ui/kit";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import { TuiHint, TuiInput, TuiIcon } from '@taiga-ui/core';
import mask from './mask';

@Component({
    selector: 'overwrite-mode-replace-doc-example-2',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiHint,
        TuiInput,
        TuiIcon,
        TuiTooltip
    ],
    template: `
        <tui-textfield [style.max-width.rem]="20">
        <input
                inputmode="decimal"
                tuiInput
                [maskito]="maskitoOptions" [(ngModel)]="value"/>
<tui-icon tuiTooltip="Insert character somewhere in the middle" />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample2 {
    protected readonly maskitoOptions = mask;
    protected value = '0000';
}
