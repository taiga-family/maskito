import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoOptions} from '@maskito/core';
import {MaskitoDateMode, maskitoDateOptionsGenerator} from '@maskito/kit';
import {
    TuiDocDemoModule,
    TuiDocDocumentationModule,
    TuiDocExample,
    TuiDocExampleModule,
    TuiDocPageModule,
} from '@taiga-ui/addon-doc';
import {
    TuiLinkModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {MaskitoDirective} from '../../../../../angular/src/lib/maskito.directive';
import {DateMaskDocExample1} from './examples/1-localization/component';
import {DateMaskDocExample2} from './examples/2-min-max/component';

type GeneratorOptions = Required<Parameters<typeof maskitoDateOptionsGenerator>[0]>;

@Component({
    standalone: true,
    selector: 'date-mask-doc',
    imports: [
        TuiDocPageModule,
        TuiDocExampleModule,
        DateMaskDocExample1,
        TuiLinkModule,
        DateMaskDocExample2,
        TuiDocDemoModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
        TuiDocDocumentationModule,
    ],
    templateUrl: './date-mask-doc.template.html',
    styleUrls: ['./date-mask-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateMaskDocComponent implements GeneratorOptions {
    apiPageControl = new FormControl('');

    readonly dateLocalization: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-localization/mask.ts?raw'
        ),
    };

    readonly dateMinMax: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/2-min-max/mask.ts?raw'),
    };

    readonly modeOptions: MaskitoDateMode[] = [
        'dd/mm/yyyy',
        'mm/dd/yyyy',
        'yyyy/mm/dd',
        'mm/yy',
        'mm/yyyy',
        'yyyy/mm',
        'yyyy',
    ];

    readonly separatorOptions: string[] = ['.', '/', '-'];
    readonly minMaxOptions = ['0001-01-01', '9999-12-31', '2000-01-01', '2025-05-10'];
    minStr = this.minMaxOptions[0];
    maxStr = this.minMaxOptions[1];

    mode: MaskitoDateMode = this.modeOptions[0];
    separator = this.separatorOptions[0];

    min = new Date(this.minStr);
    max = new Date(this.maxStr);

    maskitoOptions: MaskitoOptions = maskitoDateOptionsGenerator(this);

    updateDate(): void {
        this.min = new Date(this.minStr);
        this.max = new Date(this.maxStr);
        this.updateOptions();
    }

    updateOptions(): void {
        this.maskitoOptions = maskitoDateOptionsGenerator(this);
    }
}
