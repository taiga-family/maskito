import {Component, Input} from '@angular/core';
import {MaskitoDirective} from '@maskito/angular';
import {MaskitoOptions} from '@maskito/core';

@Component({
    standalone: true,
    imports: [MaskitoDirective],
    template: `
        <input [maskito]="maskitoOptions" />
    `,
})
export class TestInput {
    @Input()
    maskitoOptions: MaskitoOptions | null = null;
}
