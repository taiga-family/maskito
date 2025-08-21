import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoDateMode, MaskitoDateParams} from '@maskito/kit';
import {maskitoDateOptionsGenerator} from '@maskito/kit';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import {DateMaskDocExample1} from './examples/1-localization/component';
import {DateMaskDocExample2} from './examples/2-min-max/component';

@Component({
    standalone: true,
    selector: 'date-mask-doc',
    imports: [
        DateMaskDocExample1,
        DateMaskDocExample2,
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInputModule,
        TuiLink,
        TuiNotification,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './date-mask-doc.template.html',
    styleUrls: ['./date-mask-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateMaskDocComponent implements Required<MaskitoDateParams> {
    protected apiPageControl = new FormControl('');

    protected readonly maskitoParseStringifyDateDemo = import(
        './examples/maskito-parse-stringify-date-demo.md?raw'
    );

    protected readonly dateLocalization: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-localization/mask.ts?raw'
        ),
    };

    protected readonly dateMinMax: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-min-max/mask.ts?raw'),
    };

    protected readonly modeOptions = [
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/mm/dd',
        'dd/mm',
        'mm/dd',
        'mm/yy',
        'mm/yyyy',
        'yyyy/mm',
        'yyyy',
    ] as const satisfies readonly MaskitoDateMode[];

    protected readonly separatorOptions = ['.', '/', '-'] as const;
    protected readonly minMaxOptions = [
        '0001-01-01',
        '9999-12-31',
        '2000-01-01',
        '2025-05-10',
    ] as const;

    protected minStr: string = this.minMaxOptions[0];
    protected maxStr: string = this.minMaxOptions[1];
    public mode: MaskitoDateMode = this.modeOptions[0];
    public separator: string = this.separatorOptions[0];
    public min = new Date(this.minStr);
    public max = new Date(this.maxStr);
    public maskitoOptions: MaskitoOptions = maskitoDateOptionsGenerator(this);

    protected updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }

    protected updateOptions(): void {
        this.maskitoOptions = maskitoDateOptionsGenerator(this);
    }
}
