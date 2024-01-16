import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDocModule, TuiDocExample} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {CardDocExample1} from './examples/1-basic/component';

@Component({
    standalone: true,
    selector: 'card-doc',
    imports: [TuiAddonDocModule, TuiLinkModule, RouterLink, CardDocExample1],
    templateUrl: './card-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardDocComponent {
    readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    readonly dateMaskDocPage = `/${DemoPath.Date}`;

    readonly cardExample1: TuiDocExample = {
        TypeScript: import('./examples/1-basic/component.ts?raw'),
        HTML: import('./examples/1-basic/template.html?raw'),
    };
}
