import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoDateMode} from '@maskito/kit';
import {maskitoDateOptionsGenerator} from '@maskito/kit';
import {TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';
import {TuiInputModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';

import {DateMaskDocExample1} from './examples/1-localization/component';
import {DateMaskDocExample2} from './examples/2-min-max/component';

type GeneratorOptions = Required<Parameters<typeof maskitoDateOptionsGenerator>[0]>;

@Component({
    standalone: true,
    selector: 'date-mask-doc',
    imports: [
        TuiAddonDocModule,
        TuiLink,
        DateMaskDocExample1,
        DateMaskDocExample2,
        TuiInputModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        MaskitoDirective,
    ],
    templateUrl: './date-mask-doc.template.html',
    styleUrls: ['./date-mask-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocComponent implements GeneratorOptions {
    protected apiPageControl = new FormControl('');

    protected readonly dateLocalization: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-localization/mask.ts?raw'
        ),
    };

    protected readonly dateMinMax: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-min-max/mask.ts?raw'),
    };

    protected readonly modeOptions: MaskitoDateMode[] = [
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/mm/dd',
        'mm/yy',
        'mm/yyyy',
        'yyyy/mm',
        'yyyy',
    ];

    protected readonly separatorOptions: string[] = ['.', '/', '-'];
    protected readonly minMaxOptions = [
        '0001-01-01',
        '9999-12-31',
        '2000-01-01',
        '2025-05-10',
    ];

    protected minStr = this.minMaxOptions[0];
    protected maxStr = this.minMaxOptions[1];

    public mode: MaskitoDateMode = this.modeOptions[0];
    public separator = this.separatorOptions[0];

    public min = new Date(this.minStr);
    public max = new Date(this.maxStr);

    protected maskitoOptions: MaskitoOptions = maskitoDateOptionsGenerator(this);

    protected updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }

    protected updateOptions(): void {
        this.maskitoOptions = maskitoDateOptionsGenerator(this);
    }
}
