import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';
import {TuiGroup} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/legacy';

@Component({
    selector: 'card-doc-example-1',
    imports: [MaskitoDirective, ReactiveFormsModule, TuiGroup, TuiInputModule],
    templateUrl: './template.html',
    styleUrl: './style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocExample1 {
    protected readonly cardMask: MaskitoOptions = {
        mask: [
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(4).fill(/\d/),
            ' ',
            ...new Array(3).fill(/\d/),
        ],
    };

    protected readonly expiredMask = maskitoDateOptionsGenerator({
        mode: 'mm/yy',
        separator: '/',
    });

    protected readonly cvvMask: MaskitoOptions = {mask: [...new Array(3).fill(/\d/)]};

    protected readonly form = new FormGroup({
        cardNumber: new FormControl(''),
        expire: new FormControl(''),
        cvv: new FormControl(''),
    });
}
