import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin} from '@maskito/kit';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import type {TuiRawLoaderContent} from '@taiga-ui/addon-doc';
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
import maxMetadata from 'libphonenumber-js/max/metadata';
import minMetadata from 'libphonenumber-js/min/metadata';
import mobileMetadata from 'libphonenumber-js/mobile/metadata';
import type {MetadataJson} from 'libphonenumber-js/types';

import {PhoneMaskDocExample1} from './examples/1-basic/component';
import {PhoneMaskDocExample2} from './examples/2-validation/component';
import {PhoneMaskDocExample3} from './examples/3-non-strict/component';
import {PhoneMaskDocExample4} from './examples/4-lazy-metadata/component';
import {PhoneMaskDocExample5} from './examples/5-focus-blur-events/component';

const metadataSets = {
    min: minMetadata,
    max: maxMetadata,
    mobile: mobileMetadata,
} as const satisfies Record<string, MetadataJson>;

type GeneratorOptions = Required<Parameters<typeof maskitoPhoneOptionsGenerator>[0]>;

type MetadataName = keyof typeof metadataSets;

@Component({
    selector: 'phone-doc',
    imports: [
        MaskitoDirective,
        PhoneMaskDocExample1,
        PhoneMaskDocExample2,
        PhoneMaskDocExample3,
        PhoneMaskDocExample4,
        PhoneMaskDocExample5,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInputModule,
        TuiLink,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './phone-doc.template.html',
    styleUrl: './phone-doc.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhoneDocComponent implements GeneratorOptions {
    private readonly isApple = inject(TUI_IS_APPLE);

    protected apiPageControl = new FormControl('');

    protected readonly basic: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-basic/mask.ts?raw', {
            with: {loader: 'text'},
        }),
    };

    protected readonly validation: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-validation/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/2-validation/component.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly nonStrict: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-non-strict/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/3-non-strict/component.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    protected readonly lazyMetadata: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.Angular]: import(
            './examples/4-lazy-metadata/component.ts?raw',
            {with: {loader: 'text'}}
        ),
        [DocExamplePrimaryTab.JavaScript]: import('./examples/4-lazy-metadata/simple.md'),
    };

    protected readonly focusBlurEvents: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/5-focus-blur-events/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    public strict = true;
    public countryIsoCode: CountryCode = 'RU';
    public separator = '-';
    public metadataVariants = Object.keys(metadataSets) as readonly MetadataName[];
    public selectedMetadata: MetadataName = this.metadataVariants[0]!;
    public countryCodeVariants = getCountries(this.metadata);
    public separatorVariants = ['-', ' '];
    public maskitoOptions = this.computeOptions();

    public get metadata(): MetadataJson {
        return metadataSets[this.selectedMetadata];
    }

    // TODO: delete after bumping Safari support to 18+
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
