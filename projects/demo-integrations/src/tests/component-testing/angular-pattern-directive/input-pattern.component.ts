import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MaskitoPatternDirective} from '@maskito/angular';

@Component({
    standalone: true,
    imports: [MaskitoPatternDirective],
    template: `
        <input [maskitoPattern]="pattern" />
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputWithPattern {
    public pattern: RegExp | string = '';
}
