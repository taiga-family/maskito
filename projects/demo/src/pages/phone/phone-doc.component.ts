import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {TuiDocExample} from '@taiga-ui/addon-doc';
import {TUI_IS_APPLE} from '@taiga-ui/cdk';
import {CountryCode, getCountries} from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

type GeneratorOptions = Required<Parameters<typeof maskitoPhoneOptionsGenerator>[0]>;

@Component({
    selector: 'phone-doc',
    templateUrl: './phone-doc.template.html',
    styleUrls: ['./phone-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneDocComponent implements GeneratorOptions {
    apiPageControl = new FormControl('');

    readonly basic: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-basic/mask.ts?raw'),
    };

    readonly validation: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-validation/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/2-validation/component.ts?raw'
        ),
    };

    readonly nonStrict: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-non-strict/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/3-non-strict/component.ts?raw'
        ),
    };

    readonly lazyMetadata: TuiDocExample = {
        [DocExamplePrimaryTab.Angular]: import(
            './examples/4-lazy-metadata/component.ts?raw'
        ),
        [DocExamplePrimaryTab.JavaScript]: import(
            './examples/4-lazy-metadata/simple.md?raw'
        ),
    };

    metadata = metadata;

    strict = true;

    countryCodeVariants = getCountries(this.metadata);

    countryIsoCode: CountryCode = 'RU';

    maskitoOptions = maskitoPhoneOptionsGenerator(this);

    constructor(@Inject(TUI_IS_APPLE) private readonly isApple: boolean) {}

    get pattern(): string {
        return this.isApple ? '+{1}[0-9]{1,3} [0-9]{1,14}' : '';
    }

    updateOptions(): void {
        this.maskitoOptions = maskitoPhoneOptionsGenerator(this);
    }
}
