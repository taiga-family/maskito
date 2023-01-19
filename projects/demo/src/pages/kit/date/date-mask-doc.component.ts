import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {MaskitoDateMode, maskitoDateOptionsGenerator} from '@maskito/kit';

type GeneratorOptions = Required<Parameters<typeof maskitoDateOptionsGenerator>[0]>;

@Component({
    selector: 'date-mask-doc',
    templateUrl: './date-mask-doc.template.html',
    styleUrls: ['./date-mask-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocComponent implements GeneratorOptions {
    apiPageControl = new FormControl('');

    readonly preparedMasks = {
        DMY: maskitoDateOptionsGenerator({mode: 'DMY'}),
        MDY: maskitoDateOptionsGenerator({mode: 'MDY', separator: '-'}),
        YMD: maskitoDateOptionsGenerator({mode: 'YMD', separator: '/'}),
    };

    readonly modeOptions: MaskitoDateMode[] = [`DMY`, `MDY`, `YMD`];
    readonly separatorOptions: string[] = [`.`, `/`, `-`];

    mode: MaskitoDateMode = this.modeOptions[0];
    separator = this.separatorOptions[0];

    maskitoOptions: MaskitoOptions = maskitoDateOptionsGenerator(this);

    updateOptions(): void {
        this.maskitoOptions = maskitoDateOptionsGenerator(this);
    }
}
