import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoCaretGuard,
    maskitoNumberOptionsGenerator,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiNotificationModule} from '@taiga-ui/core';
import {tuiInputCountOptionsProvider, TuiInputModule} from '@taiga-ui/kit';
import {CHAR_MINUS} from 'projects/kit/src/lib/constants';

import {NumberMaskDocExample1} from './examples/1-high-precision/component';
import {NumberMaskDocExample2} from './examples/2-separators/component';
import {NumberMaskDocExample3} from './examples/3-postfix/component';
import {NumberMaskDocExample4} from './examples/4-decimal-zero-padding/component';
import {NumberMaskDocExample5} from './examples/5-dynamic-decimal-zero-padding/component';
import {NumberMaskDocExample6} from './examples/6-custom-minus-sign/components';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoNumberOptionsGenerator>[0]>
>;

@Component({
    standalone: true,
    selector: 'number-mask-doc',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiNotificationModule,
        NumberMaskDocExample1,
        NumberMaskDocExample2,
        NumberMaskDocExample3,
        NumberMaskDocExample4,
        NumberMaskDocExample5,
        NumberMaskDocExample6,
    ],
    templateUrl: './number-mask-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [tuiInputCountOptionsProvider({min: Number.MIN_SAFE_INTEGER})],
})
export class NumberMaskDocComponent implements GeneratorOptions {
    protected readonly maskitoParseNumberDemo = import(
        './examples/maskito-parse-number-demo.md?raw'
    );

    protected readonly highPrecisionExample1: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/1-high-precision/mask.ts?raw'
        ),
    };

    protected readonly separatorsExample2: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-separators/mask.ts?raw'
        ),
    };

    protected readonly postfixExample3: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/3-postfix/mask.ts?raw'),
    };

    protected readonly decimalZeroPaddingExample4: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/4-decimal-zero-padding/mask.ts?raw'
        ),
    };

    protected readonly dynamicDecimalZeroPaddingExample5: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/5-dynamic-decimal-zero-padding/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/5-dynamic-decimal-zero-padding/component.ts?raw'
        ),
    };

    protected readonly customMinusSignExample6: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/6-custom-minus-sign/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/6-custom-minus-sign/components.ts?raw'
        ),
    };

    protected apiPageControl = new FormControl('');

    protected readonly decimalPseudoSeparatorsOptions = [
        ['.', ',', 'б', 'ю'],
        ['.'],
        [','],
    ];

    protected readonly precisionOptions: number[] = [0, 1, 2, 5, 10, Infinity];

    public precision = 0;
    public max = Number.MAX_SAFE_INTEGER;
    public min = Number.MIN_SAFE_INTEGER;
    public decimalSeparator = '.';
    public decimalZeroPadding = false;
    public decimalPseudoSeparators = this.decimalPseudoSeparatorsOptions[0];
    public thousandSeparator = ' ';
    public prefix = '';
    public postfix = '';
    public minusSign = CHAR_MINUS;

    protected maskitoOptions: MaskitoOptions = this.calculateMask(this);

    protected updateOptions(): void {
        this.maskitoOptions = this.calculateMask(this);
    }

    private calculateMask(options: GeneratorOptions): MaskitoOptions {
        const {prefix, postfix} = options;
        const {plugins, ...numberOptions} = maskitoNumberOptionsGenerator(options);

        return {
            ...numberOptions,
            plugins: [
                ...plugins,
                maskitoAddOnFocusPlugin(prefix + postfix),
                maskitoRemoveOnBlurPlugin(prefix + postfix),
                maskitoCaretGuard(value => [
                    prefix.length,
                    value.length - postfix.length,
                ]),
            ],
        };
    }
}
