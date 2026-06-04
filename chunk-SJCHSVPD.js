import"./chunk-TIC6Q35B.js";var l=`<form
    autocomplete="on"
    tuiGroup
    class="wrapper"
    [formGroup]="form"
>
    <tui-textfield class="number">
        <label tuiLabel>Card number</label>
        <input
            autocomplete="cc-number"
            formControlName="cardNumber"
            inputmode="numeric"
            placeholder="0000 0000 0000 0000"
            tuiInput
            [maskito]="cardMask"
        />
    </tui-textfield>
    <tui-textfield class="expired">
        <label tuiLabel>EXP</label>
        <input
            autocomplete="cc-exp"
            formControlName="expire"
            inputmode="numeric"
            placeholder="mm/yy"
            tuiInput
            [maskito]="expiredMask"
        />
    </tui-textfield>
    <tui-textfield class="cvv">
        <label tuiLabel>CVV</label>
        <input
            autocomplete="cc-csc"
            formControlName="cvv"
            inputmode="numeric"
            placeholder="000"
            tuiInput
            [maskito]="cvvMask"
        />
    </tui-textfield>
</form>
`;export{l as default};
