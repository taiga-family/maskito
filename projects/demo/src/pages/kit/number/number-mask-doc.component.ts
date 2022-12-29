import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MaskitoOptions} from '@maskito/core';
import {maskitoNumberOptionsGenerator} from '@maskito/kit';
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
    apiPageControl = new FormControl('');

    maskitoOptions: MaskitoOptions = maskitoNumberOptionsGenerator(this);

    readonly decimalPseudoSeparatorsOptions = [['.', 'б', 'ю'], ['.']];

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
