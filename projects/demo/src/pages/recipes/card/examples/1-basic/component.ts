import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoOptions} from '@maskito/core';
import {maskitoDateOptionsGenerator} from '@maskito/kit';

@Component({
    selector: 'card-doc-example-1',
    templateUrl: './template.html',
    styleUrls: ['./style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocExample1 {
    cardMask: MaskitoOptions = {
        mask: [
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(4).fill(/\d/),
            ' ',
            ...Array(3).fill(/\d/),
        ],
    };

    expiredMask = maskitoDateOptionsGenerator({mode: 'mm/yy', separator: '/'});

    cvvMask: MaskitoOptions = {
        mask: [...Array(3).fill(/\d/)],
    };
}
