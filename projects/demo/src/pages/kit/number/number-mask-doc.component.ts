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
import {DEFAULT_PSEUDO_MINUSES} from '@maskito/kit/src/lib/masks/number';
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

    protected readonly minusBeforePrefixExample6: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/6-minus-before-prefix/mask.ts?raw'
        ),
    };

    protected readonly dynamicDecimalZeroPaddingExample7: Record<
        string,
        TuiRawLoaderContent
    > = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/7-dynamic-decimal-zero-padding/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/7-dynamic-decimal-zero-padding/component.ts?raw'
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

    protected readonly prefixOptions: Array<string | readonly [string, string]> = [
        '$',
        '€',
        '£',
        '>',
        [CHAR_MINUS, '$'],
    ];

    public precision = 0; // TODO(v4): delete
    public max = Number.MAX_SAFE_INTEGER;
    public min = Number.MIN_SAFE_INTEGER;
    public decimalSeparator = '.';
    public decimalZeroPadding = false; // TODO(v4): delete
    public decimalPseudoSeparators = this.decimalPseudoSeparatorsOptions[0]!;
    public thousandSeparator = ' ';
    public prefix: string | readonly [string, string] = '';
    public postfix = '';
    public minusSign = CHAR_MINUS;
    public minimumFractionDigits = 0;
    public maximumFractionDigits = 0;
    public maskitoOptions: MaskitoOptions = this.calculateMask(this);
    public minusPseudoSigns = DEFAULT_PSEUDO_MINUSES;

    protected updateOptions(): void {
        this.maskitoOptions = this.calculateMask(this);
    }

    private get computedPrefix(): string | readonly [string, string] {
        return typeof this.prefix === 'string'
            ? this.prefix
            : (this.prefix.map((x) =>
                  this.minusPseudoSigns.includes(x) ? this.minusSign : x,
              ) as unknown as readonly [string, string]);
    }

    private calculateMask(params: Required<MaskitoNumberParams>): MaskitoOptions {
        const {
            postfix,
            minusSign,
            thousandSeparator,
            decimalSeparator,
            minusPseudoSigns,
        } = params;
        const {plugins, ...numberOptions} = maskitoNumberOptionsGenerator({
            ...params,
            minusPseudoSigns: minusPseudoSigns?.filter(
                (char) =>
                    char !== thousandSeparator &&
                    char !== decimalSeparator &&
                    char !== minusSign,
            ),
            prefix: this.computedPrefix,
        });
        const prefix =
            typeof this.computedPrefix === 'string'
                ? this.computedPrefix
                : (this.computedPrefix.find((x) => x !== minusSign) ?? '');

        return {
            ...numberOptions,
            plugins: [
                ...plugins,
                maskitoAddOnFocusPlugin(prefix + postfix),
                maskitoRemoveOnBlurPlugin(prefix + postfix),
                maskitoCaretGuard((value) => [
                    typeof this.computedPrefix === 'string' || !value.includes(minusSign)
                        ? prefix.length
                        : this.computedPrefix.join('').length,
                    value.length - postfix.length,
                ]),
            ],
        };
    }
}
