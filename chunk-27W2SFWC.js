import"./chunk-ENRHZQ2S.js";var i=`<!--
    Maskito can be applied on this component, given the predicate
    can properly target native input inside tui-input below
-->
<label
    tuiLabel
    class="tui-space_bottom-3"
>
    <input
        tuiCheckbox
        type="checkbox"
        [(ngModel)]="show"
    />
    Add card holder name
</label>

<tui-input
    [disabled]="!show"
    [(ngModel)]="value"
>
    Name on the card
</tui-input>
`;export{i as default};
