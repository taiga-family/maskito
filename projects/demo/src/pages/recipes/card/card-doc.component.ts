import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {DemoPath} from '@demo/constants';
import {TuiAddonDoc} from '@taiga-ui/addon-doc';
import {TuiLink} from '@taiga-ui/core';

import {CardDocExample1} from './examples/1-basic/component';

@Component({
    standalone: true,
    selector: 'card-doc',
    imports: [TuiAddonDoc, TuiLink, RouterLink, CardDocExample1],
    templateUrl: './card-doc.template.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardDocComponent {
    protected readonly maskExpressionDocPage = `/${DemoPath.MaskExpression}`;
    protected readonly dateMaskDocPage = `/${DemoPath.Date}`;

    protected readonly cardExample1: Record<string, Promise<unknown> | string> = {
        TypeScript: import('./examples/1-basic/component.ts?raw'),
        HTML: import('./examples/1-basic/template.html?raw'),
    };
}
