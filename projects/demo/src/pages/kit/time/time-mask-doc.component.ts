import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoTimeMode, MaskitoTimeSegments} from '@maskito/kit';
import {maskitoTimeOptionsGenerator} from '@maskito/kit';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiNotification} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import {TimeMaskDocExample1} from './examples/1-modes/component';
import {TimeMaskDocExample2} from './examples/2-twelve-hour-format/component';
import {TimeMaskDocExample3} from './examples/3-step/component';

type GeneratorOptions = Required<Parameters<typeof maskitoTimeOptionsGenerator>[0]>;

@Component({
    standalone: true,
    selector: 'time-mask-doc',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        TimeMaskDocExample1,
        TimeMaskDocExample2,
        TimeMaskDocExample3,
        TuiAddonDoc,
        TuiInputModule,
        TuiNotification,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './time-mask-doc.template.html',
    styleUrls: ['./time-mask-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimeMaskDocComponent implements GeneratorOptions {
    protected readonly maskitoParseStringifyTimeDemo = import(
        './examples/maskito-parse-stringify-time-demo.md?raw'
    );

    protected readonly modeExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-modes/mask.ts?raw'),
    };

    protected readonly modeExample2: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-twelve-hour-format/mask.ts?raw'
        ),
    };

    protected readonly stepExample3: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-step/mask.ts?raw'),
    };

    protected apiPageControl = new FormControl('');

    protected readonly modeOptions = [
        'HH:MM',
        'HH:MM:SS',
        'HH:MM:SS.MSS',
        'HH',
        'MM.SS.MSS',
        'SS.MSS',
    ] as const satisfies readonly MaskitoTimeMode[];

    protected readonly timeSegmentMaxValuesOptions = [
        {hours: 23, minutes: 59, seconds: 59, milliseconds: 999},
        {hours: 11},
        {hours: 5, minutes: 5, seconds: 5, milliseconds: 5},
    ] as const satisfies ReadonlyArray<Partial<MaskitoTimeSegments<number>>>;

    public mode: MaskitoTimeMode = this.modeOptions[0];
    public timeSegmentMaxValues: Partial<MaskitoTimeSegments<number>> =
        this.timeSegmentMaxValuesOptions[0];

    public step = 0;

    protected maskitoOptions: MaskitoOptions = maskitoTimeOptionsGenerator(this);

    protected updateOptions(): void {
        this.maskitoOptions = maskitoTimeOptionsGenerator(this);
    }
}
