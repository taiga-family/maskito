import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DemoPath} from '@demo/path';
import {TuiDocExample} from '@taiga-ui/addon-doc';

@Component({
    selector: 'postfix-doc',
    templateUrl: './postfix-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostfixDocComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly timeMaskDocPage = `/${DemoPath.Time}`;

    readonly percentageExample1: TuiDocExample = {
        MaskitoOptions: import('./examples/1-percentage/mask.ts?raw'),
    };

    readonly timeExample2: TuiDocExample = {
        MaskitoOptions: import('./examples/2-time-pm/mask.ts?raw'),
    };
}
