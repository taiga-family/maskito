import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoDateMode, MaskitoDateSegments} from '@maskito/kit';
import {maskitoDateRangeOptionsGenerator} from '@maskito/kit';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiLink} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import {DateRangeMaskDocExample1} from './examples/1-date-localization/component';
import {DateRangeMaskDocExample2} from './examples/2-min-max/component';
import {DateRangeMaskDocExample3} from './examples/3-min-max-length/component';
import {DateRangeMaskDocExample4} from './examples/4-range-separator/component';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoDateRangeOptionsGenerator>[0]>
>;

@Component({
    selector: 'date-range-mask-doc',
    imports: [
        DateRangeMaskDocExample1,
        DateRangeMaskDocExample2,
        DateRangeMaskDocExample3,
        DateRangeMaskDocExample4,
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInputModule,
        TuiLink,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './date-range-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateRangeMaskDocComponent implements GeneratorOptions {
    protected readonly dateLocalizationExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-date-localization/mask.ts?raw'
        ),
    };

    protected readonly minMaxExample2: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-min-max/mask.ts?raw'),
    };

    protected readonly minMaxLengthExample3: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-min-max-length/mask.ts?raw'
        ),
    };

    protected readonly customRangeExample4: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-range-separator/mask.ts?raw'
        ),
    };

    protected apiPageControl = new FormControl('');

    protected readonly modeOptions = [
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/mm/dd',
        'mm/yy',
        'mm/yyyy',
        'yyyy/mm',
        'yyyy',
    ] as const satisfies readonly MaskitoDateMode[];

    protected readonly minMaxOptions = [
        '0001-01-01',
        '9999-12-31',
        '2000-01-01',
        '2025-05-10',
    ] as const;

    protected readonly minLengthOptions: Array<Partial<MaskitoDateSegments<number>>> = [
        {day: 3},
        {day: 15},
    ];

    protected readonly maxLengthOptions: Array<Partial<MaskitoDateSegments<number>>> = [
        {day: 5},
        {month: 1},
        {year: 1},
    ];

    protected minStr: string = this.minMaxOptions[0];
    protected maxStr: string = this.minMaxOptions[1];
    public mode: MaskitoDateMode = this.modeOptions[0];
    public min = new Date(this.minStr);
    public max = new Date(this.maxStr);
    public minLength: Partial<MaskitoDateSegments<number>> = {};
    public maxLength: Partial<MaskitoDateSegments<number>> = {};
    public dateSeparator = '.';
    public rangeSeparator = ' – ';
    public maskitoOptions: MaskitoOptions = maskitoDateRangeOptionsGenerator(this);

    @tuiPure
    protected getPlaceholder(
        mode: MaskitoDateMode,
        dateSeparator: string,
        rangeSeparator: string,
    ): string {
        const datePlaceholder = mode.replaceAll('/', dateSeparator);

        return `${datePlaceholder}${rangeSeparator}${datePlaceholder}`;
    }

    protected updateOptions(): void {
        this.maskitoOptions = maskitoDateRangeOptionsGenerator(this);
    }

    protected updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }
}
