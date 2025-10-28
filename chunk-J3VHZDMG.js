import"./chunk-6M32EY24.js";var n=`<input
    [maskito]="maskito"
    [stringifyHandler]="stringify"
    [unmaskHandler]="unmaskHandler"
    [(ngModel)]="value"
/>

<p>
    <strong>Control value:</strong>
    <code>{{ value }}</code>
</p>

<button
    type="button"
    (click)="value = 1234567.89"
>
    Programmatically patch value
</button>
`;export{n as default};
