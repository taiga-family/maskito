import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoOptions} from '@maskito/core';
import {
    MaskitoDateMode,
    maskitoDateRangeOptionsGenerator,
    MaskitoDateSegments,
} from '@maskito/kit';
import {TuiDocExample} from '@taiga-ui/addon-doc';
import {tuiPure} from '@taiga-ui/cdk';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoDateRangeOptionsGenerator>[0]>
>;

@Component({
    selector: 'date-range-mask-doc',
    templateUrl: './date-range-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeMaskDocComponent implements GeneratorOptions {
    readonly dateLocalizationExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-date-localization/mask.ts?raw'
        ),
    };

    readonly minMaxExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-min-max/mask.ts?raw'),
    };

    readonly minMaxLengthExample3: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-min-max-length/mask.ts?raw'
        ),
    };

    readonly customRangeExample4: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-range-separator/mask.ts?raw'
        ),
    };

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
    // TODO: drop in v2.0
    separator = '.';
    minStr = this.minMaxOptions[0];
    maxStr = this.minMaxOptions[1];
    min = new Date(this.minStr);
    max = new Date(this.maxStr);
    minLength: Partial<MaskitoDateSegments<number>> = {};
    maxLength: Partial<MaskitoDateSegments<number>> = {};
    dateSeparator = '.';
    rangeSeparator = ' – ';

    maskitoOptions: MaskitoOptions = maskitoDateRangeOptionsGenerator(this);

    @tuiPure
    getPlaceholder(
        mode: MaskitoDateMode,
        dateSeparator: string,
        rangeSeparator: string,
    ): string {
        const datePlaceholder = mode.replace(/\//g, dateSeparator);

        return `${datePlaceholder}${rangeSeparator}${datePlaceholder}`;
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
