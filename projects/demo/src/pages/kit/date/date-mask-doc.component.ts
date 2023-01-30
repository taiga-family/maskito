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
        DMY: maskitoDateOptionsGenerator({mode: 'dd/mm/yyyy'}),
        MDY: maskitoDateOptionsGenerator({mode: 'mm/dd/yyyy', separator: '-'}),
        YMD: maskitoDateOptionsGenerator({mode: 'yyyy/mm/dd', separator: '/'}),
    };

    minMask = maskitoDateOptionsGenerator({
        mode: 'dd/mm/yyyy',
        min: new Date(2010, 5, 1),
    });

    minMaxMask = maskitoDateOptionsGenerator({
        mode: 'dd/mm/yyyy',
        min: new Date(2000, 0, 1),
        max: new Date(2025, 4, 10),
    });

    readonly modeOptions: MaskitoDateMode[] = [
        `dd/mm/yyyy`,
        `mm/dd/yyyy`,
        `yyyy/mm/dd`,
        'mm/yy',
    ];

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
