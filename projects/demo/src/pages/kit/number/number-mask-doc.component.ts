import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoCaretGuard,
    maskitoNumber,
    type MaskitoNumberParams,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';
import {CHAR_MINUS} from '@maskito/kit/src/lib/constants';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiLink, TuiNotification} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/legacy';

import {NumberMaskDocExample1} from './examples/1-high-precision/component';
import {NumberMaskDocExample2} from './examples/2-separators/component';
import {NumberMaskDocExample3} from './examples/3-postfix/component';
import {NumberMaskDocExample4} from './examples/4-decimal-zero-padding/component';
import {NumberMaskDocExample5} from './examples/5-custom-minus-sign/components';
import {NumberMaskDocExample6} from './examples/6-minus-before-prefix/components';
import {NumberMaskDocExample7} from './examples/7-dynamic-decimal-zero-padding/component';
import {NumberMaskDocExample8} from './examples/8-thousand-separator-pattern/component';
import {NumberMaskDocExample9} from './examples/9-thousand-separator-pattern-intl/component';
import {NumberMaskDocExample10} from './examples/10-locale-number/component';

type GeneratorParams = Omit<
    Required<MaskitoNumberParams>,
    'locale' | 'minusPseudoSigns' | 'thousandSeparatorPattern'
> &
    Pick<MaskitoNumberParams, 'thousandSeparatorPattern'>;

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
        NumberMaskDocExample8,
        NumberMaskDocExample9,
        NumberMaskDocExample10,
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
    protected readonly parseNumberAsNumberTypeDemo =
        import('./helpers/parse-number-as-number-type.md');

    protected readonly parseNumberAsBigIntTypeDemo =
        import('./helpers/parse-number-as-bigint-type.md');

    protected readonly parseNumberInvalidUsageDemo =
        import('./helpers/parse-number-invalid-usage.md');

    protected readonly stringifyNumberDemo = import('./helpers/stringify-number.md');
    protected readonly localeNumberHelperDemo = import('./helpers/locale-number.md');

    protected readonly localeNumberExample10: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/10-locale-number/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

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

    protected readonly thousandSeparatorPatternExample8: Record<
        string,
        TuiRawLoaderContent
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/8-thousand-separator-pattern/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly thousandSeparatorPatternIntlExample9: Record<
        string,
        TuiRawLoaderContent
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/9-thousand-separator-pattern-intl/mask.ts?raw',
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
        ['.', ',', 'б', 'ю'],
        ['.'],
        [','],
    ];

    protected readonly maximumFractionDigitsOptions = [0, 1, 2, 5, 10, Infinity];

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

    public thousandSeparatorPattern: MaskitoNumberParams['thousandSeparatorPattern'];
    public maskitoOptions = this.calculateMask(this);

    protected updateOptions(): void {
        this.maskitoOptions = this.calculateMask(this);
    }

    private calculateMask(params: GeneratorParams): MaskitoOptions {
        const {prefix, postfix, negativePattern, minusSign} = params;
        const {plugins, ...numberOptions} = maskitoNumber(params);

        return {
            ...numberOptions,
            plugins: [
                ...plugins,
                maskitoAddOnFocusPlugin(`${prefix}${postfix}`),
                maskitoRemoveOnBlurPlugin(`${prefix}${postfix}`),
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
