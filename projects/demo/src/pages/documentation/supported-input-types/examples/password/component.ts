import { TuiPassword, TuiTooltip } from "@taiga-ui/kit";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import { TuiHint, TuiIcon, TuiInput } from '@taiga-ui/core';
import mask from './mask';

@Component({
    selector: 'input-type-password-example',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiHint,
        TuiIcon, TuiPassword, TuiInput, TuiTooltip],
    template: `
        <tui-textfield
            [style.max-width.rem]="20"
            
            
        ><input
                tuiInput [(ngModel)]="value" placeholder="Enter password"
                type="password"
                [maskito]="maskitoOptions"
            />
<tui-icon tuiTooltip="Only 3 digits are allowed" />
<tui-icon tuiPassword />

        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordDocExample {
    protected readonly maskitoOptions = mask;
    protected value = '';
}
