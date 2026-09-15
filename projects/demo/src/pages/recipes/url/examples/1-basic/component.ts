import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiInput} from '@taiga-ui/core';

import {maskitoUrl} from './mask';

@Component({
    selector: 'url-doc-example-1',
    imports: [FormsModule, MaskitoDirective, TuiInput],
    template: `
        <tui-textfield
            class="tui-space_bottom-4"
            [style.max-width.rem]="30"
        >
            <label tuiLabel>Absolute URL</label>
            <input
                autocomplete="url"
                inputmode="url"
                type="url"
                tuiInput
                [maskito]="absoluteOptions"
                [(ngModel)]="absoluteValue"
            />
        </tui-textfield>

        <tui-textfield
            class="tui-space_bottom-4"
            [style.max-width.rem]="30"
        >
            <label tuiLabel>HTTPS only</label>
            <input
                autocomplete="url"
                inputmode="url"
                type="url"
                tuiInput
                [maskito]="httpsOnlyOptions"
                [(ngModel)]="httpsOnlyValue"
            />
        </tui-textfield>

        <tui-textfield [style.max-width.rem]="30">
            <label tuiLabel>Absolute or relative URL</label>
            <input
                inputmode="url"
                type="text"
                tuiInput
                [maskito]="relativeOptions"
                [(ngModel)]="relativeValue"
            />
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Example {
    protected readonly absoluteOptions = maskitoUrl();
    protected readonly httpsOnlyOptions = maskitoUrl({httpsOnly: true});
    protected readonly relativeOptions = maskitoUrl({allowRelative: true});

    protected absoluteValue = '';
    protected httpsOnlyValue = '';
    protected relativeValue = '';
}
