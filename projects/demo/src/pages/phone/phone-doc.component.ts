import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {
    TuiDocDemoModule,
    TuiDocDocumentationModule,
    TuiDocExample,
    TuiDocExampleModule,
    TuiDocPageModule,
} from '@taiga-ui/addon-doc';
import {TUI_IS_APPLE} from '@taiga-ui/cdk';
import {
    TuiLinkModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';
import {CountryCode, getCountries} from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

import {PhoneMaskDocExample1} from './examples/1-basic/component';
import {PhoneMaskDocExample2} from './examples/2-validation/component';
import {PhoneMaskDocExample3} from './examples/3-non-strict/component';
import {PhoneMaskDocExample4} from './examples/4-lazy-metadata/component';

type GeneratorOptions = Required<Parameters<typeof maskitoPhoneOptionsGenerator>[0]>;

@Component({
    standalone: true,
    selector: 'phone-doc',
    imports: [
        TuiDocPageModule,
        TuiLinkModule,
        TuiDocExampleModule,
        PhoneMaskDocExample1,
        PhoneMaskDocExample2,
        PhoneMaskDocExample3,
        PhoneMaskDocExample4,
        TuiDocDemoModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        ReactiveFormsModule,
        TuiPrimitiveTextfieldModule,
        MaskitoDirective,
        TuiDocDocumentationModule,
    ],
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

    separatorVariants = ['-', ' '];

    separator = '-';

    maskitoOptions = maskitoPhoneOptionsGenerator(this);

    constructor(@Inject(TUI_IS_APPLE) private readonly isApple: boolean) {}

    get pattern(): string {
        return this.isApple ? '+[0-9-]{1,20}' : '';
    }

    updateOptions(): void {
        this.maskitoOptions = maskitoPhoneOptionsGenerator(this);
    }
}
