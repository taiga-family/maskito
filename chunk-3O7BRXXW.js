import"./chunk-ENRHZQ2S.js";var u=`<form
    autocomplete="on"
    tuiGroup
    class="wrapper"
    [formGroup]="form"
>
    <tui-input
        formControlName="cardNumber"
        class="number"
    >
        Card number
        <input
            autocomplete="cc-number"
            inputmode="numeric"
            placeholder="0000 0000 0000 0000"
            tuiTextfieldLegacy
            [maskito]="cardMask"
        />
    </tui-input>
    <tui-input
        formControlName="expire"
        class="expired"
    >
        EXP
        <input
            autocomplete="cc-exp"
            inputmode="numeric"
            placeholder="mm/yy"
            tuiTextfieldLegacy
            [maskito]="expiredMask"
        />
    </tui-input>
    <tui-input
        formControlName="cvv"
        class="cvv"
    >
        CVV
        <input
            autocomplete="cc-csc"
            inputmode="numeric"
            placeholder="000"
            tuiTextfieldLegacy
            [maskito]="cvvMask"
        />
    </tui-input>
</form>
`;export{u as default};
