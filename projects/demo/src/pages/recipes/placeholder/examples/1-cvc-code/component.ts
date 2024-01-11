import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import mask from './mask';

@Component({
    standalone: true,
    selector: 'placeholder-doc-example-1',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        FormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
    ],
    template: `
        <tui-input
            tuiTextfieldCustomContent="tuiIconCreditCardLarge"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter CVC code
            <input
                #inputRef
                inputmode="numeric"
                tuiTextfield
                [maskito]="maskitoOptions"
            />
        </tui-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderDocExample1 {
    @ViewChild('inputRef', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    readonly maskitoOptions = mask;
    value = 'xxx';
}
