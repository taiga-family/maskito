import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'card-doc-example-1',
    templateUrl: './template.html',
    styleUrls: ['./style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocExample1 {
    readonly cardMask: MaskitoOptions = {
        mask: [
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
        ],
    };

    readonly expiredMask = maskitoDateOptionsGenerator({mode: 'mm/yy', separator: '/'});

    readonly cvvMask: MaskitoOptions = {
        mask: [...Array(3).fill(/\d/)],
    };

    readonly form = new FormGroup({
        cardNumber: new FormControl(''),
        expire: new FormControl(''),
        cvv: new FormControl(''),
    });
}
