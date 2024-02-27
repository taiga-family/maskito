import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DocExamplePrimaryTab} from '@demo/constants';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TUI_IS_APPLE} from '@taiga-ui/cdk';
import {TuiLinkModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
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
        MaskitoDirective,
        ReactiveFormsModule,
        TuiAddonDocModule,
        TuiInputModule,
        TuiLinkModule,
        TuiTextfieldControllerModule,
        PhoneMaskDocExample1,
        PhoneMaskDocExample2,
        PhoneMaskDocExample3,
        PhoneMaskDocExample4,
    ],
    templateUrl: './phone-doc.template.html',
    styleUrls: ['./phone-doc.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneDocComponent implements GeneratorOptions {
    private readonly isApple = inject(TUI_IS_APPLE);

    protected apiPageControl = new FormControl('');

    protected readonly basic: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import('./examples/1-basic/mask.ts?raw'),
    };

    protected readonly validation: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/2-validation/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/2-validation/component.ts?raw'
        ),
    };

    protected readonly nonStrict: TuiDocExample = {
        [DocExamplePrimaryTab.MaskitoOptions]: import(
            './examples/3-non-strict/mask.ts?raw'
        ),
        [DocExamplePrimaryTab.Angular]: import(
            './examples/3-non-strict/component.ts?raw'
        ),
    };

    protected readonly lazyMetadata: TuiDocExample = {
        [DocExamplePrimaryTab.Angular]: import(
            './examples/4-lazy-metadata/component.ts?raw'
        ),
        [DocExamplePrimaryTab.JavaScript]: import(
            './examples/4-lazy-metadata/simple.md?raw'
        ),
    };

    protected metadata = metadata;

    protected strict = true;

    protected countryCodeVariants = getCountries(this.metadata);

    protected countryIsoCode: CountryCode = 'RU';

    protected separatorVariants = ['-', ' '];

    protected separator = '-';

    protected maskitoOptions = maskitoPhoneOptionsGenerator(this);

    protected get pattern(): string {
        return this.isApple ? '+[0-9-]{1,20}' : '';
    }

    protected updateOptions(): void {
        this.maskitoOptions = maskitoPhoneOptionsGenerator(this);
    }
}
