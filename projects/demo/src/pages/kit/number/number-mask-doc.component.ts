import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
import {TuiDocExample} from '@taiga-ui/addon-doc';
import {tuiInputCountOptionsProvider} from '@taiga-ui/kit';

type GeneratorOptions = Required<
    NonNullable<Parameters<typeof maskitoNumberOptionsGenerator>[0]>
>;

@Component({
    selector: 'number-mask-doc',
    templateUrl: './number-mask-doc.template.html',
    providers: [tuiInputCountOptionsProvider({min: Number.MIN_SAFE_INTEGER})],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberMaskDocComponent implements GeneratorOptions {
    readonly maskitoParseNumberDemo = import(
        './examples/maskito-parse-number-demo.md?raw'
    );

    readonly highPrecisionExample1: TuiDocExample = {
        MaskitoOptions: import('./examples/1-high-precision/mask.ts?raw'),
    };

    readonly separatorsExample2: TuiDocExample = {
        MaskitoOptions: import('./examples/2-separators/mask.ts?raw'),
    };

    readonly decimalZeroPaddingExample3: TuiDocExample = {
        MaskitoOptions: import('./examples/3-decimal-zero-padding/mask.ts?raw'),
    };

    readonly decimalZeroPaddingExample4: TuiDocExample = {
        MaskitoOptions: import('./examples/4-dynamic-decimal-zero-padding/mask.ts?raw'),
        Component: import('./examples/4-dynamic-decimal-zero-padding/component.ts?raw'),
    };

    apiPageControl = new FormControl('');

    maskitoOptions: MaskitoOptions = maskitoNumberOptionsGenerator(this);

    readonly decimalPseudoSeparatorsOptions = [['.', 'б', 'ю'], ['.'], [',']];

    precision = 0;
    isNegativeAllowed = true;
    max = Number.MAX_SAFE_INTEGER;
    decimalSeparator = ',';
    decimalZeroPadding = false;
    decimalPseudoSeparators = this.decimalPseudoSeparatorsOptions[0];
    thousandSeparator = ' ';

    updateOptions(): void {
        this.maskitoOptions = maskitoNumberOptionsGenerator(this);
    }
}
