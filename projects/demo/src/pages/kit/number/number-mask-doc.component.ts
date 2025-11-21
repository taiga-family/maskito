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
import {NumberMaskDocExample6} from './examples/6-minus-before-prefix/components';
import {NumberMaskDocExample7} from './examples/7-dynamic-decimal-zero-padding/component';

type GeneratorParams = Omit<Required<MaskitoNumberParams>, 'minusPseudoSigns'>;

@Component({
    selector: 'number-mask-doc',
    imports: [
        MaskitoDirective,
        NumberMaskDocExample1,
        NumberMaskDocExample2,
        NumberMaskDocExample3,
        NumberMaskDocExample4,
        NumberMaskDocExample5,
        NumberMaskDocExample6,
        NumberMaskDocExample7,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInputModule,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './number-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NumberMaskDocComponent implements GeneratorParams {
    protected readonly maskitoParseNumberDemo =
        import('./examples/maskito-parse-stringify-number-demo.md');

    protected readonly highPrecisionExample1: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-high-precision/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly separatorsExample2: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-separators/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly postfixExample3: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-postfix/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly decimalZeroPaddingExample4: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-decimal-zero-padding/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly customMinusSignExample5: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/5-custom-minus-sign/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly minusBeforePrefixExample6: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/6-minus-before-prefix/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly dynamicDecimalZeroPaddingExample7: Record<
        string,
        TuiRawLoaderContent
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/7-dynamic-decimal-zero-padding/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/7-dynamic-decimal-zero-padding/component.ts?raw',
            {with: {loader: 'text'}}
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

    protected readonly negativePatternOptions = [
        'prefixFirst',
        'minusFirst',
    ] as const satisfies ReadonlyArray<Required<MaskitoNumberParams>['negativePattern']>;

    protected readonly minOptions: ReadonlyArray<bigint | number> = [
        -Infinity,
        BigInt(`-${'987654321'.repeat(3)}`),
        Number.MIN_SAFE_INTEGER,
        -123,
        -100,
        0,
        0.1,
        5,
    ];

    protected readonly maxOptions: ReadonlyArray<bigint | number> = [
        Infinity,
        BigInt('987654321'.repeat(3)),
        Number.MAX_SAFE_INTEGER,
        777,
        3,
        0,
        -0.1,
        -5,
    ];

    public max = Infinity;
    public min = -Infinity;
    public decimalSeparator = '.';
    public decimalPseudoSeparators = this.decimalPseudoSeparatorsOptions[0]!;
    public thousandSeparator = ' ';
    public prefix = '';
    public postfix = '';
    public minusSign = CHAR_MINUS;
    public minimumFractionDigits = 0;
    public maximumFractionDigits = 0;
    public negativePattern: Required<MaskitoNumberParams>['negativePattern'] =
        this.negativePatternOptions[0];

    public maskitoOptions: MaskitoOptions = this.calculateMask(this);

    protected updateOptions(): void {
        this.maskitoOptions = this.calculateMask(this);
    }

    private calculateMask(params: GeneratorParams): MaskitoOptions {
        const {prefix, postfix, negativePattern, minusSign} = params;
        const {plugins, ...numberOptions} = maskitoNumberOptionsGenerator(params);

        return {
            ...numberOptions,
            plugins: [
                ...plugins,
                maskitoAddOnFocusPlugin(prefix + postfix),
                maskitoRemoveOnBlurPlugin(prefix + postfix),
                maskitoCaretGuard((value) => [
                    negativePattern === 'minusFirst' && value.includes(minusSign)
                        ? minusSign.length + prefix.length
                        : prefix.length,
                    value.length - postfix.length,
                ]),
            ],
        };
    }
}
