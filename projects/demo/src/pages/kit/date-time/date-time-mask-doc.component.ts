import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {
    type MaskitoDateMode,
    maskitoDateTime,
    type MaskitoDateTimeParams,
    type MaskitoTimeMode,
} from '@maskito/kit';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiInput, TuiLink, TuiNotification} from '@taiga-ui/core';

import Example1 from './examples/1-date-time-localization/component';
import Example2 from './examples/2-am-pm/component';
import Example3 from './examples/3-locale/component';
import Example4 from './examples/4-date-time-separator/component';
import Example5 from './examples/5-min-max/component';
import Example6 from './examples/6-time-step/component';
import Example7 from './examples/7-time-separators/component';

@Component({
    selector: 'date-time-mask-doc',
    imports: [
        Example1,
        Example2,
        Example3,
        Example4,
        Example5,
        Example6,
        Example7,
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInput,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './date-time-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateTimeMaskDocComponent implements Omit<
    Required<MaskitoDateTimeParams>,
    'locale'
> {
    protected readonly maskitoParseStringifyDateTimeDemo =
        import('./examples/maskito-parse-stringify-date-time-demo.md');

    protected readonly dateTimeLocalizationExample: Record<string, TuiRawLoaderContent> =
        {
            [DocExamplePrimaryTab.MaskitoOptions]: import(
                './examples/1-date-time-localization/mask.ts?raw',
                {with: {loader: 'text'}}
            ),
        };

    protected readonly amPmExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-am-pm/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly localeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-locale/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly dateTimeSeparatorExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-date-time-separator/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly timeSeparatorsExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/7-time-separators/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly dateTimeMinMaxExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/5-min-max/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly dateTimeTimeStepExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/6-time-step/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected apiPageControl = new FormControl('');

    protected readonly dateModeOptions = [
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/mm/dd',
    ] as const satisfies readonly MaskitoDateMode[];

    protected readonly timeModeOptions = [
        'HH:MM',
        'HH:MM AA',
        'HH:MM:SS',
        'HH:MM:SS AA',
        'HH:MM:SS.MSS',
        'HH:MM:SS.MSS AA',
    ] as const satisfies readonly MaskitoTimeMode[];

    protected readonly dayPeriodOptions = [
        ['', ''],
        ['AM', 'PM'],
        ['am', 'pm'],
        ['ص', 'م'],
        ['上午', '下午'],
    ] as const satisfies ReadonlyArray<NonNullable<MaskitoDateTimeParams['dayPeriod']>>;

    protected readonly timeSeparatorOptions = [
        [],
        ['.'],
        ['h'],
        [' h ', ' min '],
        [':', ':', ','],
    ] as const satisfies ReadonlyArray<
        NonNullable<MaskitoDateTimeParams['timeSeparators']>
    >;

    protected readonly minMaxOptions = [
        '0001-01-01T00:00:00',
        '9999-12-31T23:59:59',
        '2000-01-01T12:30',
        '2025-05-10T18:30',
    ] as const;

    protected minStr: string = this.minMaxOptions[0];
    protected maxStr: string = this.minMaxOptions[1];

    public dateMode: MaskitoDateMode = this.dateModeOptions[0];
    public timeMode: MaskitoTimeMode = this.timeModeOptions[0];
    public dayPeriod = this.dayPeriodOptions[0];
    public dateTimeSeparator = ', ';
    public timeSeparators: NonNullable<MaskitoDateTimeParams['timeSeparators']> =
        this.timeSeparatorOptions[0];

    public dateSeparator = '.';
    public min = new Date(this.minStr);
    public max = new Date(this.maxStr);
    public timeStep = 0;
    public maskitoOptions: MaskitoOptions = maskitoDateTime(this);

    protected get filler(): string {
        let separatorIndex = 0;
        const timeTemplate = this.timeMode.replaceAll(
            /[:.]/g,
            (char) => this.timeSeparators[separatorIndex++] ?? char,
        );

        return `${this.dateMode.replaceAll('/', this.dateSeparator)}${this.dateTimeSeparator}${timeTemplate} ${'A'.repeat(this.dayPeriod[0].length)}`;
    }

    protected updateOptions(): void {
        this.maskitoOptions = maskitoDateTime(this);
    }

    protected updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }
}
