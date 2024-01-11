import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {MaskitoDirective} from '../../../../../../../angular/src/lib/maskito.directive';
import mask from './mask';

@Component({
    standalone: true,
    selector: 'placeholder-doc-example-3',
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
            tuiTextfieldCustomContent="tuiIconCalendarLarge"
            [style.max-width.rem]="20"
            [(ngModel)]="value"
        >
            Enter date
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
export class PlaceholderDocExample3 {
    @ViewChild('inputRef', {read: ElementRef})
    inputRef!: ElementRef<HTMLInputElement>;

    readonly maskitoOptions = mask;

    value = '';
}
