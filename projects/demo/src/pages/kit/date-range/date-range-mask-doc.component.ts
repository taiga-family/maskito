import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {
    MaskitoDateMode,
    maskitoDateRangeOptionsGenerator,
    MaskitoDateSegments,
} from '@maskito/kit';
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

    readonly modeOptions: MaskitoDateMode[] = [`dd/mm/yyyy`, `mm/dd/yyyy`, `yyyy/mm/dd`];
    readonly minMaxOptions = ['0001-01-01', '9999-12-31', '2000-01-01', '2025-05-10'];
    readonly minLengthOptions: Array<Partial<MaskitoDateSegments<number>>> = [
        {day: 3},
        {day: 15},
    ];

    readonly maxLengthOptions: Array<Partial<MaskitoDateSegments<number>>> = [
        {day: 5},
        {month: 1},
        {year: 1},
    ];

    mode: MaskitoDateMode = this.modeOptions[0];
    separator = '.';
    minStr = this.minMaxOptions[0];
    maxStr = this.minMaxOptions[1];
    min = new Date(this.minStr);
    max = new Date(this.maxStr);
    minLength: Partial<MaskitoDateSegments<number>> = {};
    maxLength: Partial<MaskitoDateSegments<number>> = {};

    maskitoOptions: MaskitoOptions = maskitoDateRangeOptionsGenerator(this);

    @tuiPure
    getPlaceholder(mode: MaskitoDateMode, separator: string): string {
        const datesSep = `${CHAR_NO_BREAK_SPACE}${CHAR_EN_DASH}${CHAR_NO_BREAK_SPACE}`;

        return `${mode.replace(/\//g, separator)}${datesSep}${mode.replace(
            /\//g,
            separator,
        )}`;
    }

    updateOptions(): void {
        this.maskitoOptions = maskitoDateRangeOptionsGenerator(this);
    }

    updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }
}
