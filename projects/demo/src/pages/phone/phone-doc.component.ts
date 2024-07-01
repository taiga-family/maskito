import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin} from '@maskito/kit';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {CHAR_PLUS} from '@taiga-ui/cdk';
import {TuiLink} from '@taiga-ui/core';
import {
    TUI_IS_APPLE,
    TuiInputModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import type {CountryCode} from 'libphonenumber-js/core';
import {getCountries, getCountryCallingCode} from 'libphonenumber-js/core';
import metadata from 'libphonenumber-js/min/metadata';

import {PhoneMaskDocExample1} from './examples/1-basic/component';
import {PhoneMaskDocExample2} from './examples/2-validation/component';
import {PhoneMaskDocExample3} from './examples/3-non-strict/component';
import {PhoneMaskDocExample4} from './examples/4-lazy-metadata/component';
import {PhoneMaskDocExample5} from './examples/5-focus-blur-events/component';

type GeneratorOptions = Required<Parameters<typeof maskitoPhoneOptionsGenerator>[0]>;

@Component({
    standalone: true,
    selector: 'phone-doc',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInputModule,
        TuiLink,
        TuiTextfieldControllerModule,
        PhoneMaskDocExample1,
        PhoneMaskDocExample2,
        PhoneMaskDocExample3,
        PhoneMaskDocExample4,
        PhoneMaskDocExample5,
    ],
    templateUrl: './phone-doc.template.html',
    styleUrls: ['./phone-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhoneDocComponent implements GeneratorOptions {
    private readonly isApple = inject(TUI_IS_APPLE);

    protected apiPageControl = new FormControl('');

    protected readonly basic: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-basic/mask.ts?raw'),
    };

    protected readonly validation: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-validation/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/2-validation/component.ts?raw'
        ),
    };

    protected readonly nonStrict: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-non-strict/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/3-non-strict/component.ts?raw'
        ),
    };

    protected readonly lazyMetadata: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.Angular]: import(
            './examples/4-lazy-metadata/component.ts?raw'
        ),
        [DocExamplePrimaryTab.JavaScript]: import(
            './examples/4-lazy-metadata/simple.md?raw'
        ),
    };

    protected readonly focusBlurEvents: Record<string, Promise<unknown> | string> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/5-focus-blur-events/mask.ts?raw'
        ),
    };

    public metadata = metadata;
    public strict = true;
    public countryIsoCode: CountryCode = 'RU';
    public separator = '-';

    protected countryCodeVariants = getCountries(this.metadata);

    protected separatorVariants = ['-', ' '];

    protected maskitoOptions = this.computeOptions();

    protected get pattern(): string {
        return this.isApple ? '+[0-9-]{1,20}' : '';
    }

    protected updateOptions(): void {
        this.maskitoOptions = this.computeOptions();
    }

    private computeOptions(): Required<MaskitoOptions> {
        const options = maskitoPhoneOptionsGenerator(this);
        const code = getCountryCallingCode(this.countryIsoCode, this.metadata);
        const prefix = `${CHAR_PLUS}${code} `;

        return this.strict
            ? {
                  ...options,
                  plugins: [
                      ...options.plugins,
                      maskitoRemoveOnBlurPlugin(prefix),
                      maskitoAddOnFocusPlugin(prefix),
                  ],
              }
            : options;
    }
}
