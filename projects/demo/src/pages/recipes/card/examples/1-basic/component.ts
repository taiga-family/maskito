import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoDate} from '@maskito/kit';
import {TuiGroup, TuiInput} from '@taiga-ui/core';

@Component({
    selector: 'card-doc-example-1',
    imports: [MaskitoDirective, ReactiveFormsModule, TuiGroup, TuiInput],
    templateUrl: './template.html',
    styleUrl: './style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocExample1 {
    protected readonly cardMask: MaskitoOptions = {
        mask: [
            ...Array.from<RegExp>({length: 4}).fill(/\d/),
            ' ',
            ...Array.from<RegExp>({length: 4}).fill(/\d/),
            ' ',
            ...Array.from<RegExp>({length: 4}).fill(/\d/),
            ' ',
            ...Array.from<RegExp>({length: 4}).fill(/\d/),
            ' ',
            ...Array.from<RegExp>({length: 3}).fill(/\d/),
        ],
    };

    protected readonly expiredMask = maskitoDate({
        mode: 'mm/yy',
        separator: '/',
    });

    protected readonly cvvMask: MaskitoOptions = {
        mask: Array.from<RegExp>({length: 3}).fill(/\d/),
    };

    protected readonly form = new FormGroup({
        cardNumber: new FormControl(''),
        expire: new FormControl(''),
        cvv: new FormControl(''),
    });
}
