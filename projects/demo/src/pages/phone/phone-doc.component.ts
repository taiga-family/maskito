import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {maskitoAddOnFocusPlugin, maskitoRemoveOnBlurPlugin} from '@maskito/kit';
import {maskitoPhone, type MaskitoPhoneParams} from '@maskito/phone';
import {isSafari, WA_IS_IOS} from '@ng-web-apis/platform';
import {TuiAddonDoc, type TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {CHAR_PLUS, tuiInjectElement} from '@taiga-ui/cdk';
import {TuiInput, TuiLink, TuiNotification} from '@taiga-ui/core';
import type {MetadataJson} from 'libphonenumber-js';
import {
    type CountryCode,
    getCountries,
    getCountryCallingCode,
} from 'libphonenumber-js/core';
import maxMetadata from 'libphonenumber-js/max/metadata';
import minMetadata from 'libphonenumber-js/min/metadata';
import mobileMetadata from 'libphonenumber-js/mobile/metadata';

import Example1 from './examples/1-basic/component';
import Example2 from './examples/2-validation/component';
import Example3 from './examples/3-non-strict/component';
import Example4 from './examples/4-lazy-metadata/component';
import Example5 from './examples/5-focus-blur-events/component';
import Example6 from './examples/6-national-format/component';

const metadataSets = {
    min: minMetadata,
    max: maxMetadata,
    mobile: mobileMetadata,
} as const satisfies Record<string, MetadataJson>;

type GeneratorOptions = Required<Parameters<typeof maskitoPhone>[0]>;

type MetadataName = keyof typeof metadataSets;

@Component({
    selector: 'phone-doc',
    imports: [
        Example1,
        Example2,
        Example3,
        Example4,
        Example5,
        Example6,
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDoc,
        TuiInput,
        TuiLink,
        TuiNotification,
    ],
    templateUrl: './phone-doc.template.html',
    styleUrl: './phone-doc.style.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PhoneDocComponent implements GeneratorOptions {
    private readonly isApple = isSafari(tuiInjectElement()) || inject(WA_IS_IOS);

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

    protected readonly nationalFormat: Record<string, TuiRawLoaderContent> = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/6-national-format/mask.ts?raw',
            {with: {loader: 'text'}}
        ),
    };

    public strict = true;
    public countryIsoCode: CountryCode = 'RU';
    public separator = '-';
    public format: NonNullable<MaskitoPhoneParams['format']> = 'INTERNATIONAL';
    public metadataVariants = Object.keys(metadataSets) as readonly MetadataName[];
    public selectedMetadata = this.metadataVariants[0]!;
    public countryCodeVariants = getCountries(this.metadata);
    public separatorVariants = ['-', ' '];

    public formatVariants: Array<NonNullable<MaskitoPhoneParams['format']>> = [
        'INTERNATIONAL',
        'NATIONAL',
    ];

    public maskitoOptions = this.computeOptions();

    public get metadata(): MetadataJson {
        return metadataSets[this.selectedMetadata];
    }

    /**
     * Pattern for iOS Safari to allow phone number input.
     * Different patterns for international vs national format.
     * TODO: delete after bumping Safari support to 18+
     */
    protected get pattern(): string {
        if (!this.isApple) {
            return '';
        }

        return this.format === 'NATIONAL' ? '[0-9()-]{1,20}' : '+[0-9-]{1,20}';
    }

    protected updateOptions(): void {
        this.maskitoOptions = this.computeOptions();
    }

    private computeOptions(): Required<MaskitoOptions> {
        const options = maskitoPhone(this);
        const code = getCountryCallingCode(this.countryIsoCode, this.metadata);
        const prefix = `${CHAR_PLUS}${code} `;

        return this.strict && this.format === 'INTERNATIONAL'
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
