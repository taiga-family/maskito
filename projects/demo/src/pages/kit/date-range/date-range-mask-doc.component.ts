import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {MaskitoDateMode, maskitoDateRangeOptionsGenerator} from '@maskito/kit';
import {CHAR_EN_DASH, CHAR_NO_BREAK_SPACE, tuiPure} from '@taiga-ui/cdk';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoDateRangeOptionsGenerator>[0]>
>;

@Component({
    selector: 'date-range-mask-doc',
    templateUrl: './date-range-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocComponent implements GeneratorOptions {
    apiPageControl = new FormControl('');

    readonly modeOptions: MaskitoDateMode[] = [`DMY`, `MDY`, `YMD`];
    mode: MaskitoDateMode = this.modeOptions[0];
    separator = '.';

    maskitoOptions: MaskitoOptions = maskitoDateRangeOptionsGenerator(this);

    @tuiPure
    getPlaceholder(mode: MaskitoDateMode, separator: string): string {
        const datesSep = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`;

        switch (mode) {
            case 'DMY':
                return `dd${separator}mm${separator}yyyy${datesSep}dd${separator}mm${separator}yyyy`;
            case 'MDY':
                return `mm${separator}dd${separator}yyyy${datesSep}mm${separator}dd${separator}yyyy`;
            case 'YMD':
                return `yyyy${separator}mm${separator}dd${datesSep}yyyy${separator}mm${separator}dd`;
        }
    }

    updateOptions(): void {
        this.maskitoOptions = maskitoDateRangeOptionsGenerator(this);
    }
}
