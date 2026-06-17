import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {DemoPath, DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoTime,
    type MaskitoTimeMode,
    type MaskitoTimeParams,
    type MaskitoTimeSegments,
} from '@maskito/kit';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiInput, TuiLink, TuiNotification} from '@taiga-ui/core';

import Example1 from './examples/1-modes/component';
import Example2 from './examples/2-am-pm/component';
import Example3 from './examples/3-separators/component';
import Example4 from './examples/4-locale/component';
import Example5 from './examples/5-step/component';
import Example6 from './examples/6-affixes/component';
import Example7 from './examples/7-time-segments-min-max/component';

@Component({
    selector: 'time-mask-doc',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        RouterLink,
        Example1,
        Example2,
        Example3,
        Example4,
        Example5,
        Example6,
        Example7,
        TuiAddonDoc,
        TuiInput,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './time-mask-doc.template.html',
    styleUrl: './time-mask-doc.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimeMaskDocComponent implements Required<MaskitoTimeParams> {
    protected pages = DemoPath;

    protected readonly maskitoParseStringifyTimeDemo =
        import('./examples/maskito-parse-stringify-time-demo.md');

    protected readonly modeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-modes/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly amPmExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-am-pm/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly separatorsExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-separators/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly localeExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/4-locale/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly stepExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/5-step/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly affixesExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/6-affixes/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly timeSegmentsMinMaxExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/7-time-segments-min-max/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected apiPageControl = new FormControl('');

    protected readonly modeOptions = [
        'HH:MM',
        'HH:MM AA',
        'HH:MM:SS',
        'HH:MM:SS AA',
        'HH:MM:SS.MSS',
        'HH:MM:SS.MSS AA',
        'HH',
        'HH AA',
        'MM:SS.MSS',
        'SS.MSS',
        'MM:SS',
    ] as const satisfies readonly MaskitoTimeMode[];

    protected readonly dayPeriodOptions = [
        ['', ''],
        ['AM', 'PM'],
        ['am', 'pm'],
        ['ص', 'م'],
        ['上午', '下午'],
    ] as const satisfies ReadonlyArray<MaskitoTimeParams['dayPeriod']>;

    protected readonly timeSegmentMaxValuesOptions = [
        {},
        {hours: 23, minutes: 59, seconds: 59, milliseconds: 999},
        {hours: 11},
        {hours: 5, minutes: 5, seconds: 5, milliseconds: 5},
    ] as const satisfies ReadonlyArray<Partial<MaskitoTimeSegments<number>>>;

    protected readonly timeSegmentMinValuesOptions = [
        {},
        {hours: 1},
    ] as const satisfies ReadonlyArray<Partial<MaskitoTimeSegments<number>>>;

    protected readonly separatorOptions = [
        [],
        ['.'],
        ['h'],
        ['/'],
        [':', ':', ','],
    ] as const satisfies ReadonlyArray<readonly string[]>;

    public mode: MaskitoTimeMode = this.modeOptions[0];
    public separators: readonly string[] = [];
    public timeSegmentMinValues = this.timeSegmentMinValuesOptions[0];
    public timeSegmentMaxValues = this.timeSegmentMaxValuesOptions[0];
    public prefix = '';
    public postfix = '';
    public step = 0;
    public locale = '';

    public dayPeriod: NonNullable<MaskitoTimeParams['dayPeriod']> =
        this.dayPeriodOptions[0];

    public maskitoOptions: MaskitoOptions = maskitoTime(this);

    protected get filler(): string {
        return `${this.mode.toLowerCase()} ${'a'.repeat(this.dayPeriod[0].length)}`;
    }

    protected updateOptions(): void {
        this.maskitoOptions = maskitoTime(this);
    }
}
