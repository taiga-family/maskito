import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {
    MaskitoDateMode,
    maskitoDateTimeOptionsGenerator,
    MaskitoTimeMode,
} from '@maskito/kit';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {CHAR_NO_BREAK_SPACE, tuiPure} from '@taiga-ui/cdk';
import {TuiLinkModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {DateTimeMaskDocExample1} from './examples/1-date-time-localization/component';
import {DateTimeMaskDocExample2} from './examples/2-min-max/component';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoDateTimeOptionsGenerator>[0]>
>;

@Component({
    standalone: true,
    selector: 'date-time-mask-doc',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiLinkModule,
        TuiTextfieldControllerModule,
        DateTimeMaskDocExample1,
        DateTimeMaskDocExample2,
    ],
    templateUrl: './date-time-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeMaskDocComponent implements GeneratorOptions {
    readonly dateTimeLocalization: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-date-time-localization/mask.ts?raw'
        ),
    };

    readonly dateTimeMinMax: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-min-max/mask.ts?raw'),
    };

    apiPageControl = new FormControl('');

    readonly dateModeOptions: MaskitoDateMode[] = [
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/mm/dd',
    ];

    readonly timeModeOptions: MaskitoTimeMode[] = ['HH:MM', 'HH:MM:SS', 'HH:MM:SS.MSS'];
    readonly minMaxOptions = [
        '0001-01-01T00:00:00',
        '9999-12-31T23:59:59',
        '2000-01-01T12:30',
        '2025-05-10T18:30',
    ];

    dateMode: MaskitoDateMode = this.dateModeOptions[0];
    timeMode: MaskitoTimeMode = this.timeModeOptions[0];
    dateSeparator = '.';
    minStr = this.minMaxOptions[0];
    maxStr = this.minMaxOptions[1];
    min = new Date(this.minStr);
    max = new Date(this.maxStr);

    maskitoOptions: MaskitoOptions = maskitoDateTimeOptionsGenerator(this);

    @tuiPure
    getPlaceholder(
        dateMode: MaskitoDateMode,
        timeMode: MaskitoTimeMode,
        separator: string,
    ): string {
        const dateTimeSep = `,${CHAR_NO_BREAK_SPACE}`;

        return `${dateMode.replace(/\//g, separator)}${dateTimeSep}${timeMode}`;
    }

    updateOptions(): void {
        this.maskitoOptions = maskitoDateTimeOptionsGenerator(this);
    }

    updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }
}
