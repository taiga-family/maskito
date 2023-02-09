import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {
    MaskitoTimeMode,
    maskitoTimeOptionsGenerator,
    MaskitoTimeSegments,
} from '@maskito/kit';
import {TuiDocExample} from '@taiga-ui/addon-doc';

type GeneratorOptions = Required<Parameters<typeof maskitoTimeOptionsGenerator>[0]>;

@Component({
    selector: 'time-mask-doc',
    templateUrl: './time-mask-doc.template.html',
    styleUrls: ['./time-mask-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeMaskDocComponent implements GeneratorOptions {
    readonly modeExample1: TuiDocExample = {
        MaskitoOptions: import('./examples/1-modes/mask.ts?raw'),
    };

    readonly modeExample2: TuiDocExample = {
        MaskitoOptions: import('./examples/2-twelve-hour-format/mask.ts?raw'),
    };

    apiPageControl = new FormControl('');

    readonly modeOptions: MaskitoTimeMode[] = [`HH:MM`, `HH:MM:SS`, `HH:MM:SS.MSS`];
    readonly timeSegmentMaxValuesOptions: Array<Partial<MaskitoTimeSegments<number>>> = [
        {hours: 23, minutes: 59, seconds: 59, milliseconds: 999},
        {hours: 11},
    ];

    mode: MaskitoTimeMode = this.modeOptions[0];
    timeSegmentMaxValues: Partial<MaskitoTimeSegments<number>> =
        this.timeSegmentMaxValuesOptions[0];

    maskitoOptions: MaskitoOptions = maskitoTimeOptionsGenerator(this);

    updateOptions(): void {
        this.maskitoOptions = maskitoTimeOptionsGenerator(this);
    }
}
