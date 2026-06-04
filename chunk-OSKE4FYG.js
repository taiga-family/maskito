import"./chunk-TIC6Q35B.js";var i=`<!--
    Maskito can be applied on this component, given the predicate
    can properly target native input inside tui-textfield below
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

<tui-textfield>
    <label tuiLabel>Name on the card</label>
    <input
        tuiInput
        [disabled]="!show"
        [(ngModel)]="value"
    />
</tui-textfield>
`;export{i as default};
