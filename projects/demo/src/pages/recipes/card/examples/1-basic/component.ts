import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';
import {TuiGroupModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'card-doc-example-1',
    imports: [ReactiveFormsModule, TuiGroupModule, TuiInputModule, MaskitoDirective],
    templateUrl: './template.html',
    styleUrls: ['./style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocExample1 {
    readonly cardMask: MaskitoOptions = {
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

    readonly expiredMask = maskitoDateOptionsGenerator({mode: 'mm/yy', separator: '/'});

    readonly cvvMask: MaskitoOptions = {
        mask: [...new Array(3).fill(/\d/)],
    };

    readonly form = new FormGroup({
        cardNumber: new FormControl(''),
        expire: new FormControl(''),
        cvv: new FormControl(''),
    });
}
