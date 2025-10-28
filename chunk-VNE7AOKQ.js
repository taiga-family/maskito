import"./chunk-6M32EY24.js";var r=`import type {AfterViewInit} from '@angular/core';
import {Directive, inject} from '@angular/core';
import {DefaultValueAccessor} from '@angular/forms';
import {MaskitoDirective} from '@maskito/angular';
import {maskitoTransform} from '@maskito/core';
import {identity} from 'rxjs';

@Directive({
    standalone: true,
    selector: '[maskito][unmaskHandler]',
    inputs: ['unmaskHandler', 'stringifyHandler'],
})
export class UnmaskDirective implements AfterViewInit {
    private readonly accessor = inject(DefaultValueAccessor);
    private readonly maskitoDirective = inject(MaskitoDirective);

    public unmaskHandler: (value: string) => any = identity;

    public stringifyHandler: (value: any) => string = (value) => {
        const options = this.maskitoDirective.options();

        return options ? maskitoTransform(String(value), options) : value;
    };

    public ngAfterViewInit(): void {
        const originalOnChange = this.accessor.onChange.bind(this.accessor);
        const originalWriteValue = this.accessor.writeValue.bind(this.accessor);

        this.accessor.onChange = (value) => originalOnChange(this.unmaskHandler(value));
        this.accessor.writeValue = (value) =>
            originalWriteValue(this.stringifyHandler(value));
    }
}
`;export{r as default};
