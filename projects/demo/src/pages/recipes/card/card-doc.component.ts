import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/constants';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'card-doc',
    templateUrl: './card-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDocComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly dateMaskDocPage = `/${DemoPath.Date}`;

    readonly cardExample1: TuiDocExample = {
        TypeScript: import('./examples/1-basic/component.ts?raw'),
        HTML: import('./examples/1-basic/template.html?raw'),
    };
}
