import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {maskitoCaretGuard, maskitoNumberOptionsGenerator} from '@maskito/kit';
import {
    TuiDocCodeModule,
    TuiDocDemoModule,
    TuiDocDocumentationModule,
    TuiDocExample,
    TuiDocExampleModule,
    TuiDocPageModule,
} from '@taiga-ui/addon-doc';
import {TuiNotificationModule, TuiPrimitiveTextfieldModule} from '@taiga-ui/core';
import {tuiInputCountOptionsProvider, TuiInputModule} from '@taiga-ui/kit';

import {NumberMaskDocExample1} from './examples/1-high-precision/component';
import {NumberMaskDocExample2} from './examples/2-separators/component';
import {NumberMaskDocExample3} from './examples/3-postfix/component';
import {NumberMaskDocExample4} from './examples/4-decimal-zero-padding/component';
import {NumberMaskDocExample5} from './examples/5-dynamic-decimal-zero-padding/component';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoNumberOptionsGenerator>[0]>
>;

@Component({
    standalone: true,
    selector: 'number-mask-doc',
    imports: [
        TuiDocPageModule,
        TuiNotificationModule,
        TuiDocCodeModule,
        TuiDocExampleModule,
        NumberMaskDocExample1,
        NumberMaskDocExample2,
        NumberMaskDocExample3,
        NumberMaskDocExample4,
        NumberMaskDocExample5,
        TuiDocDemoModule,
        TuiInputModule,
        ReactiveFormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
        TuiDocDocumentationModule,
    ],
    templateUrl: './number-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [tuiInputCountOptionsProvider({min: Number.MIN_SAFE_INTEGER})],
})
export class NumberMaskDocComponent implements GeneratorOptions {
    @ViewChild('apiPageInput', {read: ElementRef})
    apiPageInput!: ElementRef<HTMLInputElement>;

    readonly maskitoParseNumberDemo = import(
        './examples/maskito-parse-number-demo.md?raw'
    );

    readonly highPrecisionExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-high-precision/mask.ts?raw'
        ),
    };

    readonly separatorsExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-separators/mask.ts?raw'
        ),
    };

    readonly postfixExample3: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-postfix/mask.ts?raw'),
    };

    readonly decimalZeroPaddingExample4: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-decimal-zero-padding/mask.ts?raw'
        ),
    };

    readonly dynamicDecimalZeroPaddingExample5: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/5-dynamic-decimal-zero-padding/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/5-dynamic-decimal-zero-padding/component.ts?raw'
        ),
    };

    apiPageControl = new FormControl('');

    readonly decimalPseudoSeparatorsOptions = [['.', ',', 'б', 'ю'], ['.'], [',']];
    readonly precisionOptions: number[] = [0, 1, 2, 5, 10, Infinity];

    precision = 0;
    max = Number.MAX_SAFE_INTEGER;
    min = Number.MIN_SAFE_INTEGER;
    decimalSeparator = '.';
    decimalZeroPadding = false;
    decimalPseudoSeparators = this.decimalPseudoSeparatorsOptions[0];
    thousandSeparator = ' ';
    prefix = '';
    postfix = '';

    maskitoOptions: MaskitoOptions = this.calculateMask(this);

    updateOptions(): void {
        this.maskitoOptions = this.calculateMask(this);
    }

    onFocus(): void {
        if (!this.apiPageControl.value) {
            this.apiPageControl.patchValue(this.prefix + this.postfix);
        }
    }

    onBlur(): void {
        const value = this.apiPageControl.value;

        if (value && value === this.prefix + this.postfix) {
            this.apiPageControl.patchValue('');
        }
    }

    private calculateMask(options: GeneratorOptions): MaskitoOptions {
        const {prefix, postfix} = options;
        const {plugins, ...numberOptions} = maskitoNumberOptionsGenerator(options);

        return {
            ...numberOptions,
            plugins: [
                ...plugins,
                maskitoCaretGuard(value => [
                    prefix.length,
                    value.length - postfix.length,
                ]),
            ],
        };
    }
}
