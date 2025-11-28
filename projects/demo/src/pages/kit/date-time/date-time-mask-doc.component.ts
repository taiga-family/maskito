import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoDateMode, MaskitoDateTimeParams, MaskitoTimeMode} from '@maskito/kit';
import {maskitoDateTimeOptionsGenerator} from '@maskito/kit';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {tuiPure} from '@taiga-ui/cdk';
import {TuiLink, TuiNotification} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import {DateTimeMaskDocExample1} from './examples/1-date-time-localization/component';
import {DateTimeMaskDocExample2} from './examples/2-date-time-separator/component';
import {DateTimeMaskDocExample3} from './examples/3-min-max/component';
import {DateTimeMaskDocExample4} from './examples/4-time-step/component';
import {DateTimeMaskDocExample5} from './examples/5-am-pm/component';

@Component({
    selector: 'date-time-mask-doc',
    imports: [
        DateTimeMaskDocExample1,
        DateTimeMaskDocExample2,
        DateTimeMaskDocExample3,
        DateTimeMaskDocExample4,
        DateTimeMaskDocExample5,
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInputModule,
        TuiLink,
        TuiNotification,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './date-time-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateTimeMaskDocComponent implements Required<MaskitoDateTimeParams> {
    protected readonly maskitoParseStringifyDateTimeDemo =
        import('./examples/maskito-parse-stringify-date-time-demo.md');

    protected readonly dateTimeLocalizationExample: Record<string, TuiRawLoaderContent> =
        {
            [DocExamplePrimaryTab.MaskitoOptions]: import(
                './examples/1-date-time-localization/mask.ts?raw',
                {with: {loader: 'text'}}
            ),
        };

    protected readonly dateTimeSeparatorExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-date-time-separator/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly dateTimeMinMaxExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-min-max/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly dateTimeTimeStepExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-time-step/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly amPmExample: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/5-am-pm/mask.ts?raw', {
            with: {loader: 'text'},
        }),
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
    public dateTimeSeparator = ', ';
    public dateSeparator = '.';
    public min = new Date(this.minStr);
    public max = new Date(this.maxStr);
    public timeStep = 0;
    public maskitoOptions: MaskitoOptions = maskitoDateTimeOptionsGenerator(this);

    // eslint-disable-next-line @typescript-eslint/max-params
    @tuiPure
    protected getPlaceholder(
        dateMode: MaskitoDateMode,
        timeMode: MaskitoTimeMode,
        separator: string,
        dateTimeSeparator: string,
    ): string {
        return `${dateMode.replaceAll('/', separator)}${dateTimeSeparator}${timeMode}`;
    }

    protected updateOptions(): void {
        this.maskitoOptions = maskitoDateTimeOptionsGenerator(this);
    }

    protected updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }
}
