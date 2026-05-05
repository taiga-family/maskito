import { TuiTextarea } from "@taiga-ui/kit";
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import mask from './mask';

@Component({
    selector: 'overwrite-mode-dynamic-doc-example-3',
    imports: [
        FormsModule,
        MaskitoDirective,
        TuiTextarea
    ],
    template: `
        <!-- TODO: (Taiga UI migration) tui-textarea migration (see https://taiga-ui.dev/components/textarea):
     - [expandable] was removed. New component always auto-resizes between [min] (default: 1) and [max] (default: 3) rows.
     - Unrecognized attribute "[style.max-width.rem]="20"" was placed on <tui-textfield>. Move it to <textarea tuiTextarea> if it targets the native element.
-->
        <tui-textfield [style.max-width.rem]="20">
        <textarea
                tuiTextarea
                [maskito]="maskitoOptions" [ngModel]="initialValue"></textarea>
        </tui-textfield>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverwriteModeDocExample3 {
    protected maskitoOptions = mask;

    protected initialValue =
        'This artificial example demonstrates the usage of dynamic mode. If this textarea contains only digits — "replace" mode is enabled. Otherwise, "shift" mode is enabled.';
}
