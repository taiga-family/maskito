import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import type {MaskitoNumberParams} from '@maskito/kit';
import {
    maskitoAddOnFocusPlugin,
    maskitoCaretGuard,
    maskitoNumberOptionsGenerator,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';
import {CHAR_MINUS} from '@maskito/kit/src/lib/constants';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/legacy';

import {NumberMaskDocExample1} from './examples/1-high-precision/component';
import {NumberMaskDocExample2} from './examples/2-separators/component';
import {NumberMaskDocExample3} from './examples/3-postfix/component';
import {NumberMaskDocExample4} from './examples/4-decimal-zero-padding/component';
import {NumberMaskDocExample5} from './examples/5-custom-minus-sign/components';
import {NumberMaskDocExample6} from './examples/6-dynamic-decimal-zero-padding/component';

@Component({
    standalone: true,
    selector: 'number-mask-doc',
    imports: [
        MaskitoDirective,
        NumberMaskDocExample1,
        NumberMaskDocExample2,
        NumberMaskDocExample3,
        NumberMaskDocExample4,
        NumberMaskDocExample5,
        NumberMaskDocExample6,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInputModule,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './number-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NumberMaskDocComponent implements Required<MaskitoNumberParams> {
    protected readonly maskitoParseNumberDemo = import(
        './examples/maskito-parse-stringify-number-demo.md?raw'
    );

    protected readonly highPrecisionExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-high-precision/mask.ts?raw'
        ),
    };

    protected readonly separatorsExample2: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-separators/mask.ts?raw'
        ),
    };

    protected readonly postfixExample3: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-postfix/mask.ts?raw'),
    };

    protected readonly decimalZeroPaddingExample4: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-decimal-zero-padding/mask.ts?raw'
        ),
    };

    protected readonly customMinusSignExample5: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/5-custom-minus-sign/mask.ts?raw'
        ),
    };

    protected readonly dynamicDecimalZeroPaddingExample6: Record<
        string,
        TuiRawLoaderContent
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/6-dynamic-decimal-zero-padding/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/6-dynamic-decimal-zero-padding/component.ts?raw'
        ),
    };

    protected apiPageControl = new FormControl('');

    protected readonly decimalPseudoSeparatorsOptions = [
        // eslint-disable-next-line i18n/no-russian-character
        ['.', ',', 'б', 'ю'],
        ['.'],
        [','],
    ];

    protected readonly maximumFractionDigitsOptions: number[] = [
        0,
        1,
        2,
        5,
        10,
        Infinity,
    ];

    public precision = 0; // TODO(v4): delete
    public max = Number.MAX_SAFE_INTEGER;
    public min = Number.MIN_SAFE_INTEGER;
    public decimalSeparator = '.';
    public decimalZeroPadding = false; // TODO(v4): delete
    public decimalPseudoSeparators = this.decimalPseudoSeparatorsOptions[0]!;
    public thousandSeparator = ' ';
    public prefix = '';
    public postfix = '';
    public minusSign = CHAR_MINUS;
    public minimumFractionDigits = 0;
    public maximumFractionDigits = 0;
    public maskitoOptions: MaskitoOptions = this.calculateMask(this);

    protected updateOptions(): void {
        this.maskitoOptions = this.calculateMask(this);
    }

    private calculateMask(options: Required<MaskitoNumberParams>): MaskitoOptions {
        const {prefix, postfix} = options;
        const {plugins, ...numberOptions} = maskitoNumberOptionsGenerator(options);

        return {
            ...numberOptions,
            plugins: [
                ...plugins,
                maskitoAddOnFocusPlugin(prefix + postfix),
                maskitoRemoveOnBlurPlugin(prefix + postfix),
                maskitoCaretGuard((value) => [
                    prefix.length,
                    value.length - postfix.length,
                ]),
            ],
        };
    }
}
