import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {TuiDocExample} from '@taiga-ui/addon-doc';
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

    metadata = metadata;

    countryCodeVariants = getCountries(this.metadata);

    countryIsoCode: CountryCode = 'RU';

    maskitoOptions = maskitoPhoneOptionsGenerator(this);

    updateOptions(): void {
        this.maskitoOptions = maskitoPhoneOptionsGenerator(this);
    }
}
