import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {
    MaskitoTimeMode,
    maskitoTimeOptionsGenerator,
    MaskitoTimeSegments,
} from '@maskito/kit';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {TimeMaskDocExample1} from './examples/1-modes/component';
import {TimeMaskDocExample2} from './examples/2-twelve-hour-format/component';

type GeneratorOptions = Required<Parameters<typeof maskitoTimeOptionsGenerator>[0]>;

@Component({
    standalone: true,
    selector: 'time-mask-doc',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TimeMaskDocExample1,
        TimeMaskDocExample2,
    ],
    templateUrl: './time-mask-doc.template.html',
    styleUrls: ['./time-mask-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocComponent implements GeneratorOptions {
    protected readonly modeExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-modes/mask.ts?raw'),
    };

    protected readonly modeExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-twelve-hour-format/mask.ts?raw'
        ),
    };

    protected apiPageControl = new FormControl('');

    protected readonly modeOptions: MaskitoTimeMode[] = [
        'HH:MM',
        'HH:MM:SS',
        'HH:MM:SS.MSS',
        'HH',
    ];

    protected readonly timeSegmentMaxValuesOptions: Array<
        Partial<MaskitoTimeSegments<number>>
    > = [{hours: 23, minutes: 59, seconds: 59, milliseconds: 999}, {hours: 11}];

    protected mode: MaskitoTimeMode = this.modeOptions[0];
    protected timeSegmentMaxValues: Partial<MaskitoTimeSegments<number>> =
        this.timeSegmentMaxValuesOptions[0];

    protected maskitoOptions: MaskitoOptions = maskitoTimeOptionsGenerator(this);

    protected updateOptions(): void {
        this.maskitoOptions = maskitoTimeOptionsGenerator(this);
    }
}
