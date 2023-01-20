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

    minMask = maskitoDateOptionsGenerator({mode: 'DMY', min: new Date(2010, 5, 1)});
    minMaxMask = maskitoDateOptionsGenerator({
        mode: 'DMY',
        min: new Date(2000, 0, 1),
        max: new Date(2025, 4, 10),
    });

    readonly modeOptions: MaskitoDateMode[] = [`DMY`, `MDY`, `YMD`];
    readonly separatorOptions: string[] = [`.`, `/`, `-`];
    readonly minMaxOptions = ['0001-01-01', '9999-12-31', '2000-01-01', '2025-05-10'];
    minStr = this.minMaxOptions[0];
    maxStr = this.minMaxOptions[1];

    mode: MaskitoDateMode = this.modeOptions[0];
    separator = this.separatorOptions[0];

    min = new Date(this.minStr);
    max = new Date(this.maxStr);

    maskitoOptions: MaskitoOptions = maskitoDateOptionsGenerator(this);

    updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }

    updateOptions(): void {
        this.maskitoOptions = maskitoDateOptionsGenerator(this);
    }
}
