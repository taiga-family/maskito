import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {
    maskitoAddOnFocusPlugin,
    maskitoDateOptionsGenerator,
    maskitoNumberOptionsGenerator,
    maskitoRemoveOnBlurPlugin,
} from '@maskito/kit';
import {maskitoGetCountryFromNumber, maskitoPhoneOptionsGenerator} from '@maskito/phone';
import {TuiButton, TuiFlagPipe, TuiIcon} from '@taiga-ui/core';
import {
    TUI_IS_APPLE,
    TuiInputModule,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';
import metadata from 'libphonenumber-js/min/metadata';

const MONEY_AMOUNT_MASK = maskitoNumberOptionsGenerator({
    min: 0,
    prefix: '$ ',
    maximumFractionDigits: 2,
});

const ONLY_LATIN_LETTERS_RE = /^[a-z]+$/i;

@Component({
    selector: 'real-world-form',
    imports: [
        MaskitoDirective,
        ReactiveFormsModule,
        TuiButton,
        TuiFlagPipe,
        TuiIcon,
        TuiInputModule,
        TuiTextareaModule,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './index.html',
    styleUrl: './index.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RealWorldForm {
    private readonly isApple = inject(TUI_IS_APPLE);

    protected readonly form = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
        phone: new FormControl(''),
        password: new FormControl(''),
        repeatedPassword: new FormControl(''),
        transactionDate: new FormControl(''),
        transactionAmount: new FormControl(''),
        address: new FormControl(''),
    });

    protected nameMask: MaskitoOptions = {mask: ONLY_LATIN_LETTERS_RE};

    protected surnameMask: MaskitoOptions = {
        mask: ONLY_LATIN_LETTERS_RE,
        postprocessors: [
            ({value, selection}) => ({selection, value: value.toUpperCase()}),
        ],
    };

    protected readonly phoneMask = maskitoPhoneOptionsGenerator({
        metadata,
        strict: false,
    });

    protected passwordMask: MaskitoOptions = {mask: /^\d*(?:[a-z]\d*)?$/i};

    protected readonly transactionDateMask = maskitoDateOptionsGenerator({
        mode: 'dd/mm/yyyy',
    });

    protected readonly transactionAmountMask: MaskitoOptions = {
        ...MONEY_AMOUNT_MASK,
        plugins: [
            ...MONEY_AMOUNT_MASK.plugins,
            maskitoAddOnFocusPlugin('$ '),
            maskitoRemoveOnBlurPlugin('$ '),
        ],
    };

    protected readonly addressMask: MaskitoOptions = {mask: /^[a-z1-9\s.,/]+$/i};

    protected showPassword = false;

    protected get countryIsoCode(): string {
        return maskitoGetCountryFromNumber(this.form.value.phone ?? '', metadata) ?? '';
    }

    // TODO: delete after bumping Safari support to 18+
    protected get phoneTextfieldPattern(): string {
        return this.isApple ? '+[0-9-]{1,20}' : '';
    }

    protected log(something: any): void {
        console.info(something);
    }
}
